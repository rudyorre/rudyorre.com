# Design & Glyph System

## Visual Rules

- **Aesthetic:** backend-engineer minimalism—high-contrast typography, ~65ch measure, crisp `1px` borders, no decorative animations or client-side UI bloat.
- **Themes:** `light` and `dark` via CSS custom properties on `:root` (`data-theme="light" | "dark"`), defaulting to OS `prefers-color-scheme`.
- **Typography (`data-font`):** user-switchable via the footer (`sans / mono / serif`) or `⌘K` command palette, persisted under `localStorage['ro-font']`.

## 3-Tier Square Glyph & Icon System

Implemented in [`src/components/ProceduralGlyph.astro`](../src/components/ProceduralGlyph.astro). Every post and project has a square (`1:1`) visual badge in list views (`sm` = `44×44`, `md` = `52×52`) and a wide `banner` (`640×140`) at the top of individual blog posts.

Resolution order:

### Tier 1: `image` (Option B — Custom raster/SVG file)
- Pass `image="/images/foo.webp"` on a project or blog post frontmatter.
- **When to use:** Only when you have a real **1:1 square icon without tiny text** (for list thumbnails) or an **architectural diagram / benchmark chart** for a blog post's `banner`.
- **Avoid:** 16:9 wordmark banners or full-screen IDE screenshots in square thumbnails—they crop poorly or become unreadable at `48×48`.

### Tier 2: `icon` (Option A — Bespoke 1:1 SVG mark)
- Named vector icons inside [`ProceduralGlyph.astro`](../src/components/ProceduralGlyph.astro) drawn on a `64×64` viewBox over the shared coordinate grid (`--glyph-bg`, `--glyph-grid`, `--glyph-ink`, plus a per-project `--glyph-accent`).
- **How to add a new project icon:**
  1. Add the icon name to the `icon` union in [`ProceduralGlyph.astro`](../src/components/ProceduralGlyph.astro) and [`src/data/site.ts`](../src/data/site.ts).
  2. Add an `{icon === 'myicon' && (<g style="--glyph-accent: #...">...</g>)}` block inside the `64×64` SVG in `ProceduralGlyph.astro`.
  3. Keep geometry centered between `x,y ∈ [14, 50]`, stroke width `1.3–1.8`, and never include text inside the `64×64` box.

### Tier 3: `seed` (Fallback — Deterministic procedural generator)
- Automatically used whenever neither `image` nor `icon` is set.
- Hashes `seed` (`post:<slug>` or `proj:<title>`) with 32-bit FNV-1a into one of 5 geometric motifs (phase rings, harmonic signal traces, bitfield lattice, recursive partitions, vector field ticks) and 5 theme-aware accent tokens (`--glyph-accent-1` through `--glyph-accent-5`).
- Zero network requests, ~0.5 KB inline SVG, adapts automatically to light and dark mode.
