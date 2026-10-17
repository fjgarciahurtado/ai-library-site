// Loads the library's Markdown (../digest, ../topics, ../sources) at build time.
// Files are read in place, never copied. Any problem (missing file, bad frontmatter,
// broken link) is reported with console.warn and the build carries on.
//
// The rules mirror scripts/build_index.py: same frontmatter regex, required fields,
// topic areas, and link resolution (a link is relative to the file that contains it).

import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

export const ROOT = process.env.LIBRARY_ROOT ?? path.resolve(process.cwd(), '..');

export const TOPIC_AREAS: Record<string, string> = {
  fundamentals: 'Fundamentals',
  models: 'Models',
  agents: 'Agents',
  tooling: 'Tooling',
  frameworks: 'Frameworks',
  practices: 'Practices',
};
const SOURCE_FIELDS = ['title', 'url', 'type', 'date_added', 'tags', 'topics'];
const TOPIC_FIELDS = ['title', 'tags', 'last_reviewed'];
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;
const DAILY_NAME = /^\d{4}-\d{2}-\d{2}\.md$/;
const WEEKLY_NAME = /^\d{4}-W\d{2}\.md$/;
const SOURCE_NAME = /^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;

export type Kind = 'daily' | 'weekly' | 'topic' | 'source';

export interface Page {
  kind: Kind;
  file: string; // repo-relative path, e.g. topics/tooling/mcp.md
  route: string; // web path, e.g. /topics/tooling/mcp/
  key: string; // file without extension below its folder, e.g. tooling/mcp
  meta: Record<string, any>;
  title: string;
  date: string; // digest date, source date_added, topic last_reviewed
  description: string;
  html: string;
  links: Set<string>; // routes of other pages this page links to
}

export interface Library {
  daily: Page[]; // newest first
  weekly: Page[]; // newest first
  topics: Page[];
  sources: Page[]; // newest first
  byRoute: Map<string, Page>;
  tags: { group: string; tags: { tag: string; description: string }[] }[];
  tagDescriptions: Map<string, string>;
}

const warned = new Set<string>();
export function warn(message: string) {
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(`[library] WARNING ${message}`);
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Adds the site's base path to a root-relative route: `/topics/` -> `/ai-library-site/topics/`. */
export function url(route: string): string {
  return BASE + route;
}

/** Web route for a repo-relative Markdown path: `a/b.md` -> `/a/b/`, `a/README.md` -> `/a/`. */
export function routeFor(file: string): string {
  const stem = file.replace(/\.md$/, '').replace(/(^|\/)README$/, '');
  return '/' + (stem ? stem.replace(/\/$/, '') + '/' : '');
}

function listMarkdown(dir: string): string[] {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) {
    warn(`folder ${dir}/ not found; no pages generated from it`);
    return [];
  }
  return fs
    .readdirSync(abs, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md')
    .map((e) => path.posix.join(dir, path.relative(abs, path.join(e.parentPath, e.name)).split(path.sep).join('/')))
    .sort();
}

function parseFile(file: string): { meta: Record<string, any>; body: string } | null {
  let text: string;
  try {
    text = fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n');
  } catch (err) {
    warn(`${file}: cannot be read (${(err as Error).message}); skipped`);
    return null;
  }
  const match = text.match(FRONTMATTER);
  if (!match) {
    warn(`${file}: missing frontmatter`);
    return { meta: {}, body: text };
  }
  let meta: unknown = {};
  try {
    meta = yaml.load(match[1]);
  } catch (err) {
    warn(`${file}: invalid frontmatter (${(err as Error).message.split('\n')[0]})`);
  }
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) {
    if (meta) warn(`${file}: frontmatter is not a mapping`);
    meta = {};
  }
  return { meta: meta as Record<string, any>, body: text.slice(match[0].length) };
}

function asString(value: unknown): string {
  return value == null ? '' : String(value).trim();
}

export function asList(value: unknown): string[] {
  if (value == null || value === '') return [];
  return (Array.isArray(value) ? value : [value]).map(asString).filter(Boolean);
}

/** Split off a leading `# Heading` so the layout can show it as the page title. */
function takeH1(body: string): { h1: string; body: string } {
  const match = body.match(/^\s*# (.+)\n/);
  return match ? { h1: match[1].trim(), body: body.slice(match[0].length) } : { h1: '', body };
}

function plainText(markdown: string): string {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/^\s*-\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** First paragraph under the preferred section heading, or the first paragraph at all. */
function describe(body: string, headings: string[]): string {
  const sections = body.split(/^## /m);
  const preferred = sections.find((s) => headings.some((h) => s.startsWith(h + '\n')));
  const text = preferred ? preferred.slice(preferred.indexOf('\n') + 1) : body;
  const paragraph = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#'));
  const plain = plainText(paragraph ?? '');
  return plain.length > 200 ? plain.slice(0, 197).replace(/\s+\S*$/, '') + '…' : plain;
}

// ---------------------------------------------------------------------------
// Link resolution

const ASSET_PREFIX = 'assets/';

/**
 * Rewrites relative links in rendered HTML: `.md` targets become web routes, files in
 * assets/ become /assets/..., anything else is reported and left as plain text.
 */
function rehypeLibraryLinks(options: { file: string; routes: Set<string>; links: Set<string> }) {
  const { file, routes, links } = options;
  const dir = path.posix.dirname(file);

  function resolve(href: string): string | null {
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('#') || href.startsWith('/')) return href;
    const [target, hash = ''] = href.split(/#(.*)/s, 2);
    const fragment = hash ? `#${hash}` : '';
    let decoded = target;
    try {
      decoded = decodeURI(target);
    } catch {
      // keep the raw target
    }
    const repoPath = path.posix.normalize(path.posix.join(dir, decoded));
    if (repoPath.startsWith('..')) {
      warn(`${file}: link '${href}' points outside the repository`);
      return null;
    }
    const exists = fs.existsSync(path.join(ROOT, repoPath));
    if (repoPath.startsWith(ASSET_PREFIX)) {
      if (!exists) warn(`${file}: broken link '${href}'`);
      return url('/' + repoPath.split('/').map(encodeURIComponent).join('/'));
    }
    const route = routeFor(repoPath.endsWith('.md') ? repoPath : repoPath.replace(/\/?$/, '/'));
    if (routes.has(route)) {
      links.add(route);
      return url(route) + fragment;
    }
    warn(exists ? `${file}: link '${href}' targets a file that is not published` : `${file}: broken link '${href}'`);
    return null;
  }

  function walk(node: any) {
    if (node.type === 'element') {
      const attr = node.tagName === 'a' ? 'href' : node.tagName === 'img' ? 'src' : null;
      const value = attr && node.properties?.[attr];
      if (typeof value === 'string') {
        const resolved = resolve(value);
        if (resolved === null) {
          if (node.tagName === 'a') {
            node.tagName = 'span';
            node.properties = { className: ['broken-link'], title: `Link not available: ${value}` };
          }
        } else {
          node.properties[attr] = resolved;
          if (node.tagName === 'a' && /^https?:/.test(resolved)) {
            node.properties.rel = ['noopener'];
          }
        }
      }
    }
    for (const child of node.children ?? []) walk(child);
  }

  return (tree: any) => walk(tree);
}

function render(file: string, markdown: string, routes: Set<string>, links: Set<string>): string {
  try {
    return String(
      unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeLibraryLinks, { file, routes, links })
        .use(rehypeStringify)
        .processSync(markdown),
    );
  } catch (err) {
    warn(`${file}: could not be rendered (${(err as Error).message})`);
    return '<p class="broken-link">This page could not be rendered.</p>';
  }
}

// ---------------------------------------------------------------------------
// Loading

function loadTags(): Pick<Library, 'tags' | 'tagDescriptions'> {
  const tags: Library['tags'] = [];
  const tagDescriptions = new Map<string, string>();
  try {
    const groups = yaml.load(fs.readFileSync(path.join(ROOT, 'meta/tags.yml'), 'utf8')) as Record<string, any>;
    for (const [group, entries] of Object.entries(groups ?? {})) {
      const list = Object.entries(entries ?? {}).map(([tag, description]) => ({ tag, description: asString(description) }));
      list.forEach(({ tag, description }) => tagDescriptions.set(tag, description));
      tags.push({ group, tags: list });
    }
  } catch (err) {
    warn(`meta/tags.yml: cannot be read (${(err as Error).message.split('\n')[0]}); tag descriptions omitted`);
  }
  return { tags, tagDescriptions };
}

function requireFields(page: Page, fields: string[]) {
  for (const field of fields) {
    const value = page.meta[field];
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
      warn(`${page.file}: missing '${field}'`);
    }
  }
}

function load(): Library {
  const pending: { page: Page; body: string }[] = [];

  function add(kind: Kind, file: string, base: string) {
    const parsed = parseFile(file);
    if (!parsed) return;
    const { h1, body } = takeH1(parsed.body);
    const name = path.posix.basename(file);
    const key = file.slice(base.length + 1).replace(/\.md$/, '');
    const meta = parsed.meta;
    const page: Page = {
      kind, file, key, meta, route: routeFor(file),
      title: asString(meta.title) || h1 || name.replace(/\.md$/, ''),
      date: '', description: '', html: '', links: new Set(),
    };
    if (kind === 'daily') {
      page.date = name.slice(0, 10);
      if (meta.date && asString(meta.date) !== page.date) warn(`${file}: 'date' ${meta.date} differs from the file name`);
      page.description = describe(body, ['Highlights']);
    } else if (kind === 'weekly') {
      page.date = asString(meta.date) || '';
      if (!page.date) warn(`${file}: missing 'date'`);
      page.title = h1 || `Week ${name.replace(/\.md$/, '')}`;
      page.description = describe(body, ['The week in AI']);
    } else if (kind === 'topic') {
      page.date = asString(meta.last_reviewed);
      page.description = describe(body, ['Overview']);
      requireFields(page, TOPIC_FIELDS);
      if (!(key.split('/')[0] in TOPIC_AREAS)) warn(`${file}: unknown topic area`);
    } else {
      page.date = asString(meta.date_added) || name.slice(0, 10);
      page.description = describe(body, ['Summary']);
      requireFields(page, SOURCE_FIELDS);
    }
    pending.push({ page, body });
  }

  for (const file of listMarkdown('digest')) {
    const name = path.posix.basename(file);
    if (file.startsWith('digest/weekly/')) {
      if (!WEEKLY_NAME.test(name)) warn(`${file}: name must be YYYY-Www.md; skipped`);
      else add('weekly', file, 'digest/weekly');
    } else if (!DAILY_NAME.test(name)) {
      warn(`${file}: name must be YYYY-MM-DD.md; skipped`);
    } else {
      add('daily', file, 'digest');
    }
  }
  for (const file of listMarkdown('topics')) add('topic', file, 'topics');
  for (const file of listMarkdown('sources')) {
    if (!SOURCE_NAME.test(path.posix.basename(file))) warn(`${file}: name must be YYYY-MM-DD-slug.md`);
    add('source', file, 'sources');
  }

  const pages = pending.map((p) => p.page);
  const byRoute = new Map(pages.map((p) => [p.route, p]));
  // Index pages the site generates, so links to folders and READMEs resolve too.
  const routes = new Set([...byRoute.keys(), '/', '/digest/', '/topics/', '/sources/', '/tags/']);
  for (const page of pages) {
    if (page.kind === 'topic') routes.add(`/topics/${page.key.split('/')[0]}/`);
  }
  for (const { page, body } of pending) page.html = render(page.file, body, routes, page.links);

  const { tags, tagDescriptions } = loadTags();
  const topicKeys = new Set(pages.filter((p) => p.kind === 'topic').map((p) => p.key));
  for (const page of pages) {
    for (const tag of asList(page.meta.tags)) {
      if (tagDescriptions.size && !tagDescriptions.has(tag)) warn(`${page.file}: tag '${tag}' not in meta/tags.yml`);
    }
    for (const field of ['topics', 'related']) {
      for (const ref of asList(page.meta[field])) {
        if (!topicKeys.has(ref)) warn(`${page.file}: ${field} '${ref}' has no topic page`);
      }
    }
  }

  const newest = (a: Page, b: Page) => b.date.localeCompare(a.date) || b.file.localeCompare(a.file);
  return {
    daily: pages.filter((p) => p.kind === 'daily').sort(newest),
    weekly: pages.filter((p) => p.kind === 'weekly').sort((a, b) => b.file.localeCompare(a.file)),
    topics: pages.filter((p) => p.kind === 'topic').sort((a, b) => a.title.localeCompare(b.title)),
    sources: pages.filter((p) => p.kind === 'source').sort((a, b) => b.file.localeCompare(a.file)),
    byRoute,
    tags,
    tagDescriptions,
  };
}

let cached: Library | undefined;
export function getLibrary(): Library {
  return (cached ??= load());
}

// ---------------------------------------------------------------------------
// Helpers for pages

export function topicRoute(key: string): string {
  return `/topics/${key}/`;
}

export function topicArea(page: Page): string {
  return page.key.split('/')[0];
}

export function areaTitle(area: string): string {
  return TOPIC_AREAS[area] ?? area.charAt(0).toUpperCase() + area.slice(1);
}

/** Pages that link to `route`, grouped by kind. */
export function backlinks(route: string, kind: Kind): Page[] {
  const lib = getLibrary();
  const all = [...lib.daily, ...lib.weekly, ...lib.topics, ...lib.sources];
  return all.filter((p) => p.kind === kind && p.route !== route && p.links.has(route));
}

/** Every tag in use, with the pages that carry it. */
export function pagesByTag(): Map<string, Page[]> {
  const lib = getLibrary();
  const map = new Map<string, Page[]>();
  for (const page of [...lib.topics, ...lib.sources]) {
    for (const tag of asList(page.meta.tags)) {
      if (!map.has(tag)) map.set(tag, []);
      map.get(tag)!.push(page);
    }
  }
  return map;
}

export function formatDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
