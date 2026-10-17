# Website

A static site built with [Astro](https://astro.build) from the library's Markdown. It
reads `../digest`, `../topics`, `../sources`, `../assets`, and `../meta/tags.yml` at
build time. Nothing is copied into `site/`, and the Markdown format is not changed.

## Pages

| Route | Content |
|---|---|
| `/` | Latest daily digest, earlier digests, weekly summaries |
| `/digest/` | Archive by month; each digest has previous/next links |
| `/digest/YYYY/MM/YYYY-MM-DD/`, `/digest/weekly/YYYY-Www/` | One digest |
| `/topics/`, `/topics/<area>/`, `/topics/<area>/<page>/` | Topic pages grouped by area |
| `/sources/`, `/sources/YYYY/MM/<file>/` | Source notes |
| `/tags/`, `/tags/<tag>/` | Pages by tag, with descriptions from `meta/tags.yml` |
| `/rss.xml`, `/sitemap-index.xml`, `/robots.txt` | Feed of digests, sitemap, robots |

Routes mirror the repository paths (`topics/tooling/mcp.md` becomes
`/topics/tooling/mcp/`), so relative links between `.md` files resolve directly. Links
into `assets/` become `/assets/...`, and that folder is published as-is.

All reading and rendering happens in `src/lib/library.ts`. It mirrors the rules of
`scripts/build_index.py`: frontmatter, required fields, topic areas, file names, and link
resolution. A missing file, invalid frontmatter, or broken link prints a
`[library] WARNING` line, and the build continues. Broken links are rendered as plain
text marked with a wavy underline.

## Run locally

Requires Node 22.12 or later (see `.nvmrc`). The Pi does not need Node for the daily job.

```bash
cd site
npm install
npm run dev       # http://localhost:4321, rebuild on save
npm run build     # writes site/dist
npm run preview   # serves site/dist
```

The dev server reads the Markdown when it starts. Restart it to pick up content changes.
To build from another copy of the library, set `LIBRARY_ROOT=/path/to/library`.

## Deployment

The library repo is private, so the site is published through a public mirror,
[ai-library-site](https://github.com/fjgarciahurtado/ai-library-site), on GitHub Pages:
<https://fjgarciahurtado.github.io/ai-library-site/>.

1. After each push, `scripts/update.sh` runs `scripts/publish_site.sh`. It copies the
   committed `digest/`, `topics/`, `sources/`, `assets/`, `meta/tags.yml`, and `site/` into
   a local clone of the public repo (`SITE_REPO_DIR`, default `~/source/ai-library-site`),
   adds `scripts/publish/README.md` and `scripts/publish/pages.yml` (as
   `.github/workflows/pages.yml`), and pushes if anything changed.
2. The workflow in the public repo builds with Node from `.nvmrc` and deploys to Pages.

`SITE_URL` sets the public address for canonical links, the sitemap, and RSS. Its path
becomes Astro's `base`, so every internal link goes through `url()` in `src/lib/library.ts`
(for example `url('/topics/')` gives `/ai-library-site/topics/`). Use it for any new link.
The workflow sets `SITE_URL` from the Pages configuration; locally it defaults to
`http://localhost:4321/`.

The daily job on the Pi only pushes Markdown. It never builds or touches `site/`.
