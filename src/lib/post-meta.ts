/**
 * Pure, zero-dependency metadata inference helpers for Markdown/MDX blog posts.
 * Allows dropping bare `.md` files into `src/content/blog/` with zero or partial
 * YAML frontmatter while keeping full explicit frontmatter override support.
 */

export interface RawPostFrontmatter {
  title?: string;
  date?: Date;
  description?: string;
  draft?: boolean;
  canonical?: string;
  image?: string;
  tags?: string[];
}

export interface ResolvedPostMeta {
  id: string;
  title: string;
  date: Date;
  description: string;
  draft: boolean;
  canonical?: string;
  image?: string;
  tags: string[];
}

const DATE_PREFIX_RE = /^_?(\d{4}-\d{2}-\d{2})-(.+)$/;

/**
 * Strips inline Markdown formatting (`code`, [links](url), **bold**, *italic*)
 * down to plain readable text for titles and meta descriptions.
 */
export function stripInlineMarkdown(input: string): string {
  return input
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Derives a clean URL slug from an entry path relative to `src/content/blog`:
 *   - `rebuilding-this-site.md`           -> `rebuilding-this-site`
 *   - `2026-11-16-writing-without-ai.md`  -> `writing-without-ai`
 *   - `_writing-without-ai.md`            -> `writing-without-ai`
 *   - `_drafts/some-notes.md`             -> `some-notes`
 */
export function deriveSlugFromEntry(entry: string, explicitSlug?: unknown): string {
  if (typeof explicitSlug === 'string' && explicitSlug.trim().length > 0) {
    return explicitSlug.trim().replace(/^\/+|\/+$/g, '');
  }

  const normalized = entry.replace(/\\/g, '/').replace(/\.(mdx|md)$/i, '');
  const rawSegments = normalized.split('/').filter(Boolean);

  // Drop leading `_drafts` / `_wip` folder segments from the public URL slug
  const keptSegments = rawSegments.filter(
    (seg, idx) => !(idx < rawSegments.length - 1 && seg.startsWith('_'))
  );

  const lastIdx = keptSegments.length - 1;
  if (lastIdx >= 0) {
    let base = keptSegments[lastIdx].replace(/^_+/, '');
    const dateMatch = base.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    if (dateMatch) {
      base = dateMatch[2].replace(/^_+/, '');
    }
    keptSegments[lastIdx] = base;
  }

  return keptSegments
    .map((seg) =>
      seg
        .trim()
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    )
    .filter(Boolean)
    .join('/');
}

/**
 * Treats any file or parent folder inside `src/content/blog/` starting with `_`
 * (e.g. `_my-draft.md` or `_drafts/post.md`) as a draft automatically.
 */
export function isUnderscoreDraft(filePathOrEntry?: string): boolean {
  if (!filePathOrEntry) return false;
  const normalized = filePathOrEntry.replace(/\\/g, '/');
  const marker = '/content/blog/';
  const idx = normalized.indexOf(marker);
  const rel = idx !== -1 ? normalized.slice(idx + marker.length) : normalized;
  return rel.split('/').some((seg) => seg.startsWith('_'));
}

/**
 * Parses an optional `YYYY-MM-DD-` prefix from the filename (e.g. `2026-11-16-notes.md`).
 */
export function extractDateFromFilename(filePathOrEntry?: string): Date | null {
  if (!filePathOrEntry) return null;
  const base = filePathOrEntry
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    ?.replace(/\.(mdx|md)$/i, '');
  if (!base) return null;

  const match = base.match(DATE_PREFIX_RE);
  if (!match) return null;

  const parsed = new Date(`${match[1]}T00:00:00.000Z`);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

/**
 * Turns a slug like `writing-without-a-chatbot` into `"Writing without a chatbot"`.
 */
export function humanizeSlug(slug: string): string {
  const leaf = slug.split('/').pop() || slug;
  const spaced = leaf.replace(/[-_]+/g, ' ').trim();
  if (!spaced) return 'Untitled';
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Extracts the first top-level `# Heading` from a Markdown/MDX body, skipping
 * leading blank lines and MDX `import`/`export` statements.
 */
export function extractTitleFromBody(body?: string): string | null {
  if (!body) return null;
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  let inFence = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (/^(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (/^(import|export)\s+/.test(line)) {
      continue;
    }

    const h1Match = line.match(/^#\s+(.+?)\s*#*\s*$/);
    if (h1Match) {
      const cleaned = stripInlineMarkdown(h1Match[1]);
      return cleaned || null;
    }

    // Stop once prose or a deeper heading begins so a later `#` isn't mistaken for the title
    break;
  }

  return null;
}

/**
 * Extracts a clean ~155-char one-sentence/first-paragraph summary from raw Markdown/MDX
 * when `description` is omitted from frontmatter.
 */
export function extractDescriptionFromBody(body?: string, maxLength = 155): string {
  if (!body) return '';

  // Remove fenced code blocks first
  const withoutFences = body
    .replace(/\r\n/g, '\n')
    .replace(/```[\s\S]*?```/g, '\n\n')
    .replace(/~~~[\s\S]*?~~~/g, '\n\n');

  const blocks = withoutFences.split(/\n\s*\n/);
  let fallbackCandidate = '';

  for (const rawBlock of blocks) {
    const lines = rawBlock
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) continue;

    // Skip MDX import/export blocks, headings, JSX/HTML blocks, horizontal rules, images, and tables
    if (
      lines.every(
        (l) =>
          /^(import|export)\s+/.test(l) ||
          /^#{1,6}\s+/.test(l) ||
          /^<[^>]+>$/.test(l) ||
          /^([-*_]\s*){3,}$/.test(l) ||
          /^!\[[^\]]*\]\([^)]*\)$/.test(l) ||
          /^\|/.test(l)
      )
    ) {
      continue;
    }

    const proseLines = lines.filter(
      (l) => !/^(import|export)\s+/.test(l) && !/^#{1,6}\s+/.test(l) && !/^<[^>]+>/.test(l)
    );
    if (proseLines.length === 0) continue;

    const isListOrQuote = proseLines.every((l) => /^([-*+]|\d+\.|>)\s+/.test(l));
    const joined = stripInlineMarkdown(
      proseLines.map((l) => l.replace(/^([-*+]|\d+\.|>)\s+/, '')).join(' ')
    );

    if (!joined) continue;

    if (!isListOrQuote) {
      return truncateSummary(joined, maxLength);
    }
    if (!fallbackCandidate) {
      fallbackCandidate = joined;
    }
  }

  return fallbackCandidate ? truncateSummary(fallbackCandidate, maxLength) : '';
}

function truncateSummary(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = (lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced).replace(
    /[.,;:—–-]+$/,
    ''
  );
  return `${base}…`;
}

export function resolvePostMetadata(opts: {
  id: string;
  data: RawPostFrontmatter;
  body?: string;
  filePath?: string;
  gitDate?: Date | null;
  mtimeDate?: Date | null;
  now?: Date;
}): ResolvedPostMeta {
  const { id, data, body, filePath, gitDate, mtimeDate, now = new Date() } = opts;

  const title =
    data.title?.trim() || extractTitleFromBody(body) || humanizeSlug(id);

  const description =
    data.description?.trim() || extractDescriptionFromBody(body) || title;

  const date =
    data.date ??
    extractDateFromFilename(filePath) ??
    gitDate ??
    mtimeDate ??
    now;

  const draft = Boolean(data.draft) || isUnderscoreDraft(filePath);

  return {
    id,
    title,
    date,
    description,
    draft,
    canonical: data.canonical,
    image: data.image,
    tags: data.tags ?? [],
  };
}
