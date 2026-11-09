# rudyorre.com

Personal site and writing archive for Rudy Orre, built with [Astro](https://astro.build), plain CSS, and Markdown.

## Commands

```bash
npm install       # install dependencies
npm run dev       # local dev server at http://localhost:4321
npm run build     # static production build into ./dist
npm run preview   # preview ./dist locally
```

## Architecture & Constraints

1. **Zero required client JS.** Pages are static HTML + CSS. The only inline scripts in [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro) are the synchronous `<head>` theme/font restorer and the `⌘K` search/command modal + toggles.
2. **Single stylesheet.** All styling lives in [`src/styles/global.css`](./src/styles/global.css) using CSS custom properties. No CSS frameworks or UI component libraries.
3. **Performance budget.** `/` HTML + CSS stays well under 50 KB gzipped (~7 KB gzipped today).

## Key Files

| Path | Purpose |
| --- | --- |
| [`src/content/writing/`](./src/content/writing/) | Blog posts in `.md` or `.mdx` (schema in [`src/content.config.ts`](./src/content.config.ts)) |
| [`src/data/site.ts`](./src/data/site.ts) | Projects, experience (`jobs`), and external `links` |
| [`src/components/ProceduralGlyph.astro`](./src/components/ProceduralGlyph.astro) | 3-tier square thumbnail/banner component (`image` → `icon` → procedural SVG fallback) |
| [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro) | Header, footer font switcher, `<dialog>` search/command palette |
| [`src/pages/versions.astro`](./src/pages/versions.astro) | Time Machine version archive (`/versions`) linking to `/v3/` and historical iterations |
| [`scripts/mount-archive.mjs`](./scripts/mount-archive.mjs) | Overlays pre-built static snapshots from the orphan `archive` branch into `./dist` |
| [`src/pages/search-index.json.ts`](./src/pages/search-index.json.ts) | Build-time JSON search index |
| [`src/styles/global.css`](./src/styles/global.css) | Theme tokens, typography, layout, and component styles |

## Docs

- [`docs/content.md`](./docs/content.md) — Adding blog posts, projects, experience, redirect links, and `⌘K` commands
- [`docs/design.md`](./docs/design.md) — Visual principles, 3-tier square icon/glyph system, and typography
