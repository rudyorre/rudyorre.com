# Content Guide

How to add or update writing, projects, experience, links, and search commands.

## 1. Writing a new blog post

Create a `.md` (or `.mdx` if you need an interactive component) file in [`src/content/writing/`](../src/content/writing/):

```markdown
---
title: "Post title"
date: 2026-11-08
description: "One-sentence summary used in lists, RSS, OpenGraph, and search."
tags: ["systems", "go"]
draft: false
# Optional overrides:
# image: "/images/my-diagram.png"
# canonical: "https://..."
---

Post body in standard Markdown.
```

- **Slug:** derived from the filename (e.g. `src/content/writing/my-post.md` → `/writing/my-post`).
- **Drafts:** set `draft: true` while writing; drafts are excluded from `/`, `/writing`, `/rss.xml`, and `/search-index.json`.
- **Thumbnails & banners:** automatically generated from `seed="post:<slug>"` unless `image` is provided in frontmatter.
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
