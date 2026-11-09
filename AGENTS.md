# AGENTS.md — Instructions for AI Coding Agents & Contributors

This repository powers **rudyorre.com** (v4). It is intentionally minimal, static, and dependency-light. Read this file and [`docs/`](./docs/) before making changes.

## Core Principles

1. **Zero required client JS.** Pages are static HTML + CSS. The only inline scripts allowed in [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro) are:
   - The synchronous `<head>` theme/font restorer (prevents flash).
   - The command palette (`⌘K` / `/`), theme toggle, and footer font switcher.
2. **Single stylesheet.** All styling lives in [`src/styles/global.css`](./src/styles/global.css) using CSS custom properties. Do not add Tailwind, CSS-in-JS, or UI component libraries.
3. **Performance budget.**
   - `/` HTML + CSS must stay under **50 KB gzipped** (currently ~7 KB gzipped).
   - Do not bundle large raster images for thumbnails. Use the 3-tier glyph system in [`src/components/ProceduralGlyph.astro`](./src/components/ProceduralGlyph.astro) (see [`docs/design.md`](./docs/design.md)).
4. **Preserve redirects.** `/resume`, `/meet`, and `/zoom` are actively shared external links and must always redirect to the targets in [`src/data/site.ts`](./src/data/site.ts).

## Key Files

| Path | Purpose |
| --- | --- |
| [`src/content/writing/`](./src/content/writing/) | Blog posts in `.md` or `.mdx` (validated by [`src/content.config.ts`](./src/content.config.ts)) |
| [`src/data/site.ts`](./src/data/site.ts) | Projects, experience (`jobs`), and external/redirect `links` |
| [`src/components/ProceduralGlyph.astro`](./src/components/ProceduralGlyph.astro) | 3-tier square thumbnail/banner component (`image` → `icon` → deterministic SVG generator) |
| [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro) | Header, footer font switcher, `<dialog>` search/command palette |
| [`src/pages/search-index.json.ts`](./src/pages/search-index.json.ts) | Build-time JSON search index |
| [`src/styles/global.css`](./src/styles/global.css) | Theme tokens, typography, layout, and component styles |

## Detailed Guides

- **Adding/editing posts, projects, jobs, or commands:** see [`docs/content.md`](./docs/content.md).
- **Adding project SVG icons or iterating on the procedural glyph generator:** see [`docs/design.md`](./docs/design.md).
