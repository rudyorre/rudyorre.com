import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { renderProceduralGlyph } from '../../lib/glyph-engine';

interface OgCardProps {
  title: string;
  description: string;
  eyebrow: string;
  seed: string;
  tags?: string[];
}

const DARK_ACCENT_HEX: string[] = [
  '#60a5fa',
  '#2dd4bf',
  '#fbbf24',
  '#fb7185',
  '#818cf8',
  '#34d399',
  '#f59e0b',
  '#22d3ee',
];

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapLines(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  const consumedWords = lines.join(' ').split(/\s+/).filter(Boolean).length;
  if (consumedWords < words.length && lines.length > 0) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] =
      last.length > maxChars - 1 ? `${last.slice(0, maxChars - 1).trimEnd()}…` : `${last}…`;
  }
  return lines;
}

function resolveGlyphSvgForSharp(rawSvg: string, primaryId: number, secondaryId: number): string {
  const primaryHex = DARK_ACCENT_HEX[primaryId] ?? '#60a5fa';
  const secondaryHex = DARK_ACCENT_HEX[secondaryId] ?? '#2dd4bf';

  const inner = rawSvg
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>$/, '')
    .replace(/var\(--glyph-accent-alt\)/g, secondaryHex)
    .replace(/var\(--glyph-accent\)/g, primaryHex)
    .replace(/var\(--glyph-bg\)/g, '#161613')
    .replace(/var\(--glyph-grid\)/g, '#22221e')
    .replace(/var\(--glyph-ink\)/g, '#8a8982');

  return inner;
}

function buildOgSvg(props: OgCardProps): string {
  const glyph = renderProceduralGlyph({ seed: props.seed, size: 'md' });
  const primaryHex = DARK_ACCENT_HEX[glyph.diagnostics.accentId] ?? '#60a5fa';
  const glyphInner = resolveGlyphSvgForSharp(
    glyph.svg,
    glyph.diagnostics.accentId,
    glyph.diagnostics.accentSecondaryId
  );

  const titleLines = wrapLines(props.title, 22, 3);
  const descLines = wrapLines(props.description, 44, 3);
  const titleFontSize = titleLines.length >= 3 ? 38 : 44;
  const titleLineHeight = titleLines.length >= 3 ? 48 : 54;
  const titleStartY = 200;
  const descStartY = titleStartY + titleLines.length * titleLineHeight + 18;

  const tags = (props.tags && props.tags.length > 0
    ? props.tags
    : [glyph.diagnostics.family.shortLabel, glyph.diagnostics.subMode, glyph.diagnostics.hashHex]
  ).slice(0, 4);

  let tagX = 72;
  const tagPills = tags
    .map((tag) => {
      const label = tag.slice(0, 22);
      const pillW = Math.max(68, label.length * 10.5 + 28);
      const x = tagX;
      tagX += pillW + 12;
      return `
        <g transform="translate(${x}, 516)">
          <rect width="${pillW}" height="34" rx="5" fill="#1d1d1a" stroke="#2e2e29" stroke-width="1" />
          <text x="${pillW / 2}" y="22" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-size="14" fill="#9e9d97">${escapeXml(label)}</text>
        </g>
      `;
    })
    .join('');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#10100e" />
    <g stroke="#1b1b18" stroke-width="1">
      <line x1="0" y1="72" x2="1200" y2="72" />
      <line x1="0" y1="558" x2="1200" y2="558" />
      <line x1="72" y1="0" x2="72" y2="630" />
      <line x1="1128" y1="0" x2="1128" y2="630" />
    </g>
    <rect x="36" y="36" width="1128" height="558" rx="12" fill="#141412" stroke="#2c2c27" stroke-width="1.5" />
    <line x1="36" y1="38" x2="1164" y2="38" stroke="${primaryHex}" stroke-width="3" opacity="0.85" />

    <!-- Top header metadata -->
    <text x="72" y="106" font-family="DejaVu Sans Mono, monospace" font-size="17" font-weight="700" fill="#ecebe6" letter-spacing="0.5">rudyorre<tspan fill="#6c6b66" font-weight="400">.com</tspan></text>
    <text x="220" y="106" font-family="DejaVu Sans Mono, monospace" font-size="15" fill="#6c6b66">·  ${escapeXml(props.eyebrow)}</text>

    <!-- Title -->
    ${titleLines
      .map(
        (line, idx) =>
          `<text x="72" y="${titleStartY + idx * titleLineHeight}" font-family="DejaVu Sans, sans-serif" font-size="${titleFontSize}" font-weight="700" fill="#ecebe6">${escapeXml(line)}</text>`
      )
      .join('')}

    <!-- Description -->
    ${descLines
      .map(
        (line, idx) =>
          `<text x="72" y="${descStartY + idx * 34}" font-family="DejaVu Sans, sans-serif" font-size="22" fill="#9e9d97">${escapeXml(line)}</text>`
      )
      .join('')}

    <!-- Bottom tags -->
    ${tagPills}

    <!-- Procedural SVG Glyph Frame (360x360) on right -->
    <g transform="translate(764, 114)">
      <rect x="-8" y="-8" width="376" height="376" rx="12" fill="#10100e" stroke="#262622" stroke-width="1" />
      <rect width="360" height="360" rx="8" fill="#161613" stroke="#3b3b35" stroke-width="1.5" />
      <svg width="360" height="360" viewBox="0 0 64 64">
        ${glyphInner}
      </svg>
      <text x="0" y="394" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="#6c6b66">${escapeXml(glyph.diagnostics.hashHex)} · ${escapeXml(glyph.diagnostics.family.shortLabel)}</text>
      <text x="360" y="394" text-anchor="end" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="${primaryHex}">${escapeXml(glyph.diagnostics.subMode)}</text>
    </g>
  </svg>`;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);

  const staticPages: Array<{ slug: string; props: OgCardProps }> = [
    {
      slug: 'default',
      props: {
        title: 'Rudy Orre',
        description:
          'Software engineer at Google working on the SecOps Detections Platform—building distributed systems for security event detection at scale.',
        eyebrow: 'software engineer · google secops',
        seed: 'post:rebuilding-this-site',
        tags: ['distributed-systems', 'secops', 'backend', 'google'],
      },
    },
    {
      slug: 'blog',
      props: {
        title: 'Blog',
        description:
          'Notes on distributed systems, infrastructure, and software engineering by Rudy Orre.',
        eyebrow: '/blog',
        seed: 'post:procedural-glyphs',
        tags: ['systems', 'infrastructure', 'engineering'],
      },
    },
    {
      slug: 'projects',
      props: {
        title: 'Projects',
        description: 'Selected open-source libraries, systems projects, and research by Rudy Orre.',
        eyebrow: '/projects',
        seed: 'proj:Brewin Language Interpreter',
        tags: ['open-source', 'systems', 'compilers', 'ml'],
      },
    },
    {
      slug: 'lab',
      props: {
        title: 'Lab',
        description:
          'Interactive visualizers, sandboxes, and browser-native companions to technical essays.',
        eyebrow: '/lab',
        seed: 'post:procedural-glyphs',
        tags: ['lab', 'visualizers', 'svg', 'systems'],
      },
    },
    {
      slug: 'lab/glyphs',
      props: {
        title: 'Procedural SVG Glyph Workbench',
        description:
          'Interactive FNV-1a + SplitMix32 SVG glyph synthesizer across 10 geometric motif families.',
        eyebrow: '/lab/glyphs',
        seed: 'post:procedural-glyphs',
        tags: ['fnv-1a', 'splitmix32', 'svg', '10-families'],
      },
    },
    {
      slug: 'versions',
      props: {
        title: 'Time Machine',
        description:
          'Six years of rudyorre.com across five architectural eras (v0-alpha through v4) mounted into the static deployment tree.',
        eyebrow: '/versions · archive',
        seed: 'version:v3',
        tags: ['v0-alpha', 'v1', 'v2', 'v3', 'v4'],
      },
    },
  ];

  const postPages = posts.map((post) => ({
    slug: `blog/${post.id}`,
    props: {
      title: post.data.title,
      description: post.data.description,
      eyebrow: `blog · ${post.data.date.toISOString().slice(0, 10)}`,
      seed: `post:${post.id}`,
      tags: post.data.tags,
    },
  }));

  return [...staticPages, ...postPages].map((entry) => ({
    params: { slug: entry.slug },
    props: entry.props,
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const svg = buildOgSvg(props as OgCardProps);
  const pngBuffer = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
