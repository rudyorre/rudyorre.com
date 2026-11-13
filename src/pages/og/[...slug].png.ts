import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';

type OgCardProps = {
  title: string;
  subtitle?: string;
  meta?: string;
  isHome?: boolean;
};

const FONT_SANS =
  "-apple-system, BlinkMacSystemFont, Inter, Helvetica, 'Nimbus Sans', 'Liberation Sans', Arial, sans-serif";

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function estimateEmWidth(text: string): number {
  let width = 0;
  for (const ch of text) {
    if ('ilI1|.,:;\'!` '.includes(ch)) width += 0.3;
    else if ('fjt()[]{}'.includes(ch)) width += 0.38;
    else if ('r-–'.includes(ch)) width += 0.42;
    else if ('mwMW@%—'.includes(ch)) width += 0.86;
    else if (ch >= 'A' && ch <= 'Z') width += 0.68;
    else width += 0.55;
  }
  return width;
}

function wrapByPixelWidth(
  text: string,
  fontSize: number,
  maxWidthPx: number,
  maxLines: number
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const maxEm = maxWidthPx / fontSize;
  const fullText = words.join(' ');
  if (estimateEmWidth(fullText) <= maxEm) {
    return [fullText];
  }

  // When text fits cleanly in 2 lines without truncation, pick the most balanced top-wider split
  if (maxLines >= 2 && words.length >= 2) {
    let bestSplit: [string, string] | null = null;
    let bestScore = Infinity;

    for (let k = 1; k < words.length; k++) {
      const l1 = words.slice(0, k).join(' ');
      const l2 = words.slice(k).join(' ');
      const w1 = estimateEmWidth(l1);
      const w2 = estimateEmWidth(l2);
      if (w1 <= maxEm && w2 <= maxEm) {
        const penalty = w1 >= w2 ? w1 - w2 : (w2 - w1) * 1.6 + 2;
        if (penalty < bestScore) {
          bestScore = penalty;
          bestSplit = [l1, l2];
        }
      }
    }

    if (bestSplit) {
      return bestSplit;
    }
  }

  const lines: string[] = [];
  let current = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const candidate = current ? `${current} ${word}` : word;
    if (!current || estimateEmWidth(candidate) <= maxEm) {
      current = candidate;
    } else {
      if (lines.length === maxLines - 1) {
        let truncated = current;
        while (truncated.includes(' ') && estimateEmWidth(`${truncated}…`) > maxEm) {
          truncated = truncated.replace(/\s+\S+$/, '');
        }
        while (truncated.length > 1 && estimateEmWidth(`${truncated}…`) > maxEm) {
          truncated = truncated.slice(0, -1).trimEnd();
        }
        lines.push(`${truncated.replace(/[.,;:—–-]+$/, '')}…`);
        return lines;
      }
      lines.push(current);
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }
  return lines;
}

function buildOrbitalMotif(fadeStartPct: number): string {
  // Center sits off the right edge so rings sweep across the frame as cropped orbital arcs
  const cx = 1300;
  const cy = 295;

  // Compute two subtle orbital node positions directly on r=325 and r=445
  const degToRad = (deg: number) => (deg * Math.PI) / 180;
  const n1Angle = degToRad(164);
  const n1x = (cx + 325 * Math.cos(n1Angle)).toFixed(1);
  const n1y = (cy + 325 * Math.sin(n1Angle)).toFixed(1);

  const n2Angle = degToRad(196);
  const n2x = (cx + 445 * Math.cos(n2Angle)).toFixed(1);
  const n2y = (cy + 445 * Math.sin(n2Angle)).toFixed(1);

  return `<defs>
    <linearGradient id="orbit-fade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" />
      <stop offset="${fadeStartPct}%" stop-color="#000000" />
      <stop offset="${Math.min(94, fadeStartPct + 30)}%" stop-color="#969696" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <mask id="orbit-mask">
      <rect width="1200" height="630" fill="url(#orbit-fade)" />
    </mask>
  </defs>
  <g mask="url(#orbit-mask)" fill="none">
    <!-- Concentric monochrome orbital hairlines cropped off the right edge -->
    <circle cx="${cx}" cy="${cy}" r="215" stroke="#52514a" stroke-width="1.6" />
    <circle cx="${cx}" cy="${cy}" r="325" stroke="#46453e" stroke-width="1.5" />
    <circle cx="${cx}" cy="${cy}" r="445" stroke="#3c3b35" stroke-width="1.4" stroke-dasharray="5 7" />
    <circle cx="${cx}" cy="${cy}" r="575" stroke="#33322d" stroke-width="1.35" />
    <circle cx="${cx}" cy="${cy}" r="715" stroke="#292824" stroke-width="1.25" />

    <!-- Secondary inclined orbital arc for subtle geometric depth -->
    <ellipse cx="1270" cy="340" rx="490" ry="290" transform="rotate(-22 1270 340)" stroke="#383731" stroke-width="1.3" />

    <!-- Minimal orbital nodes -->
    <circle cx="${n1x}" cy="${n1y}" r="7.5" fill="#10100e" stroke="#57564e" stroke-width="1.4" />
    <circle cx="${n1x}" cy="${n1y}" r="2.8" fill="#7d7c74" />
    <circle cx="${n2x}" cy="${n2y}" r="3.2" fill="#63625b" />
  </g>`;
}

function buildOgSvg(props: OgCardProps): string {
  const padX = 120;

  if (props.isHome) {
    const titleSize = 84;
    const titleY = 342;

    return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#10100e" />
  ${buildOrbitalMotif(40)}
  <text x="${padX}" y="${titleY}" font-family="${FONT_SANS}" font-size="${titleSize}" font-weight="700" letter-spacing="-2.5" fill="#ecebe6">${escapeXml(props.title)}</text>
</svg>`;
  }

  const maxTextWidth = 960;
  let titleSize = 62;
  let titleLineHeight = 74;
  let titleLines = wrapByPixelWidth(props.title, titleSize, maxTextWidth, 3);
  if (titleLines.length === 2) {
    titleSize = 56;
    titleLineHeight = 68;
    titleLines = wrapByPixelWidth(props.title, titleSize, maxTextWidth, 3);
  }
  if (titleLines.length >= 3) {
    titleSize = 48;
    titleLineHeight = 58;
    titleLines = wrapByPixelWidth(props.title, titleSize, maxTextWidth, 3);
  }

  const subtitleSize = 28;
  const subtitleLineHeight = 41;
  const subtitleLines = props.subtitle
    ? wrapByPixelWidth(props.subtitle, subtitleSize, maxTextWidth - 20, 2)
    : [];

  const metaCapHeight = props.meta ? 17 : 0;
  const metaToTitleGap = props.meta ? 34 : 0;
  const titleBlockHeight =
    titleSize * 0.74 + Math.max(0, titleLines.length - 1) * titleLineHeight;
  const titleToSubGap = subtitleLines.length > 0 ? 30 : 0;
  const subBlockHeight =
    subtitleLines.length > 0
      ? subtitleSize * 0.72 + (subtitleLines.length - 1) * subtitleLineHeight
      : 0;

  const totalOpticalHeight =
    metaCapHeight + metaToTitleGap + titleBlockHeight + titleToSubGap + subBlockHeight;

  const blockTop = Math.round(304 - totalOpticalHeight / 2);
  const metaBaselineY = blockTop + metaCapHeight;
  const firstTitleBaselineY =
    blockTop + metaCapHeight + metaToTitleGap + Math.round(titleSize * 0.74);
  const lastTitleBaselineY =
    firstTitleBaselineY + Math.max(0, titleLines.length - 1) * titleLineHeight;
  const firstSubtitleBaselineY =
    lastTitleBaselineY + titleToSubGap + Math.round(subtitleSize * 0.72);

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#10100e" />
  ${buildOrbitalMotif(54)}
  ${
    props.meta
      ? `<text x="${padX}" y="${metaBaselineY}" font-family="${FONT_SANS}" font-size="23" font-weight="400" letter-spacing="-0.1" fill="#787771">${escapeXml(props.meta)}</text>`
      : ''
  }
  ${titleLines
    .map(
      (line, idx) =>
        `<text x="${padX}" y="${firstTitleBaselineY + idx * titleLineHeight}" font-family="${FONT_SANS}" font-size="${titleSize}" font-weight="700" letter-spacing="-1.6" fill="#ecebe6">${escapeXml(line)}</text>`
    )
    .join('\n  ')}
  ${subtitleLines
    .map(
      (line, idx) =>
        `<text x="${padX}" y="${firstSubtitleBaselineY + idx * subtitleLineHeight}" font-family="${FONT_SANS}" font-size="${subtitleSize}" font-weight="400" letter-spacing="-0.2" fill="#9e9d97">${escapeXml(line)}</text>`
    )
    .join('\n  ')}
</svg>`;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);

  const staticPages: Array<{ slug: string; props: OgCardProps }> = [
    {
      slug: 'default',
      props: {
        title: 'Rudy Orre',
        isHome: true,
      },
    },
    {
      slug: 'blog',
      props: {
        title: 'Blog',
        subtitle: 'Essays, notes, and technical write-ups.',
        meta: 'Rudy Orre',
      },
    },
    {
      slug: 'projects',
      props: {
        title: 'Projects',
        subtitle: 'Open-source libraries, tools, and software projects.',
        meta: 'Rudy Orre',
      },
    },
    {
      slug: 'lab',
      props: {
        title: 'Lab',
        subtitle: 'Interactive visualizers, sandboxes, and experiments.',
        meta: 'Rudy Orre',
      },
    },
    {
      slug: 'lab/glyphs',
      props: {
        title: 'Procedural SVG Glyph Workbench',
        subtitle: 'Deterministic SVG synthesizer across 10 geometric motif families.',
        meta: 'Rudy Orre',
      },
    },
    {
      slug: 'versions',
      props: {
        title: 'Time Machine',
        subtitle: 'Archived iterations of rudyorre.com across five architectural eras.',
        meta: 'Rudy Orre',
      },
    },
  ];

  const postPages = posts.map((post) => ({
    slug: `blog/${post.id}`,
    props: {
      title: post.data.title,
      subtitle: post.data.description,
      meta: `Rudy Orre · ${post.data.date.toISOString().slice(0, 10)}`,
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
