---
title: "Notes on rebuilding this site"
date: 2026-11-08
description: "Why I stripped out the client-side React runtime, six themes, and animation libraries in favor of plain HTML, CSS, and markdown."
tags: ["meta", "systems", "web"]
draft: false
---

Every couple of years I look at my personal site and realize it has accumulated more dependencies than the services I work on during the day.

The previous iteration shipped a full React runtime, two component libraries, an animation engine, and six color themes just to render a single page of text. None of that helped anyone read a paragraph or click a link.

## What matters for a site like this

As a backend engineer, the qualities I care about in software are pretty simple:

1. **Predictable latency.** Static text over the wire should arrive and paint in a single round-trip.
2. **Few moving parts.** Every dependency is a future build failure when you come back six months later just to publish a 500-word note.
3. **Clear failure modes.** Plain `<a href>` links, semantic HTML, and zero required client JavaScript mean the page works everywhere.

```go
// Keep the critical path boring.
func serve(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Cache-Control", "public, max-age=3600")
    http.ServeFile(w, r, "index.html")
}
```

## The new setup

This version is built with [Astro](https://astro.build), authored in Markdown, and styled with a single CSS file using custom properties. Search runs against a small precomputed JSON index that only loads when you press `⌘K` or `/`.

Now there is nothing left to configure—just a folder of `.md` files to write in.
