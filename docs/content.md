# Content Guide

How to add or update blog posts, projects, experience, links, and search commands.

## 1. Writing a new blog post

Drop a `.md` (or `.mdx` if you need an interactive component) file into [`src/content/blog/`](../src/content/blog/)—**frontmatter is completely optional**:

```markdown
# Writing without a chatbot

First paragraph automatically becomes the summary for /blog, RSS, OpenGraph cards, and search...
```

Or run `npm run new "Post title"` to scaffold a pre-dated draft file.

If you want explicit overrides, any YAML frontmatter field is supported:

```markdown
---
title: "Post title"
date: 2026-11-15
description: "Custom summary used in lists, RSS, OpenGraph, and search."
tags: ["systems", "go"]
draft: false
# image: "/images/my-diagram.png"
# canonical: "https://..."
---

Post body in standard Markdown.
```

- **Automatic metadata fallbacks** (implemented in [`src/lib/posts.ts`](../src/lib/posts.ts)):
  - `title` → frontmatter `title` → first `# Heading` in body (automatically deduplicated from prose) → humanized filename slug.
  - `description` → frontmatter `description` → first prose paragraph (~155 chars).
  - `date` → frontmatter `date` → `YYYY-MM-DD-` filename prefix (e.g. `2026-11-15-my-post.md` still routes to `/blog/my-post`) → first `git` commit date → file `mtime`.
- **Drafts & local testing:** prefix the filename with `_` (e.g. `_my-post.md`) or set `draft: true`. Run `npm run dev` to preview drafts live at `http://localhost:4321` with a `[draft]` badge; `npm run build` automatically excludes all drafts from `/`, `/blog`, `/og/blog/*`, `/rss.xml`, sitemap, and `/search-index.json`.
- **Thumbnails, OG cards & search:** automatically generated at build time (`seed="post:<slug>"` SVG badge/banner, `1200×630` `/og/blog/<slug>.png`, RSS, and `⌘K` search index).
- **Syndication (Substack / Medium):** `/rss.xml` outputs full post content. Publish on `rudyorre.com` first, then use Medium's *Import a story* or Substack's RSS/URL import so `rudyorre.com` stays the canonical URL.

## 2. Adding or updating a project

Edit the `projects` array in [`src/data/site.ts`](../src/data/site.ts):

```ts
{
  title: 'Project Name',
  description: 'Concise one-line technical summary.',
  year: '2026',
  tags: ['Go', 'gRPC'],
  source: 'https://github.com/rudyorre/...',
  visit: 'https://...', // optional live link
  icon: 'brewin',       // optional bespoke SVG mark (see docs/design.md)
  featured: true,       // true = shown on home page (/) as well as /projects
}
```

If you omit both `icon` and `image`, the project automatically gets a deterministic square SVG glyph generated from `proj:<title>`.

## 3. Updating experience or external links

Both live in [`src/data/site.ts`](../src/data/site.ts):

- **`jobs`**: rendered on `/` and indexed in site search.
- **`links`**: controls external social/contact links (`github`, `linkedin`, `twitter`, `email`).

## 4. Adding a command to the `⌘K` palette

 Palette commands are defined in `getCommands()` inside [`src/layouts/BaseLayout.astro`](../src/layouts/BaseLayout.astro):

```js
{
  title: 'Command Name',
  snippet: 'Short description shown under the title',
  kind: 'command',
  body: 'space separated search keywords',
  run: function () { /* action */ },
}
```
