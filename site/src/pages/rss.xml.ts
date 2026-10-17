import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getLibrary, url } from '../lib/library';

export function GET(context: APIContext) {
  const lib = getLibrary();
  const items = [...lib.daily, ...lib.weekly]
    .filter((page) => /^\d{4}-\d{2}-\d{2}$/.test(page.date))
    .sort((a, b) => b.date.localeCompare(a.date) || b.file.localeCompare(a.file))
    .slice(0, 50)
    .map((page) => ({
      title: page.title,
      link: url(page.route),
      pubDate: new Date(`${page.date}T06:30:00Z`),
      description: page.description,
      content: page.html.replace(/(href|src)="\//g, `$1="${context.site!.origin}/`),
    }));
  return rss({
    title: 'AI library digest',
    description: 'Daily digests and weekly summaries of what was added to the AI library.',
    site: new URL(url('/'), context.site).href,
    items,
  });
}
