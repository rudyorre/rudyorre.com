/**
 * Deterministic procedural SVG glyph engine (v2)
 * Shared between build-time Astro components (`ProceduralGlyph.astro`)
 * and client-side interactive visualizers (`/lab/glyphs` & inline post widget).
 */

export interface GlyphOptions {
  seed: string;
  size?: 'sm' | 'md' | 'banner';
  familyOverride?: number | null; // 0..9 or null/undefined for seed-derived
  accentOverride?: number | null; // 0..7 or null/undefined for seed-derived
  gridOverride?: number | null;   // 0..3 or null/undefined for seed-derived
}

export interface GlyphFamilyMeta {
  id: number;
  slug: string;
  label: string;
  shortLabel: string;
  description: string;
}

export const GLYPH_FAMILIES: GlyphFamilyMeta[] = [
  {
    id: 0,
    slug: 'orbits',
    label: 'Orbital Phase System',
    shortLabel: 'orbits',
    description: 'Nested Keplerian ellipses, eccentric apsides, and phase-locked satellite nodes.',
  },
  {
    id: 1,
    slug: 'ridges',
    label: 'Harmonic Ridge Horizon',
    shortLabel: 'ridges',
    description: 'Stacked Fourier wave envelopes with Gaussian or bimodal pulse modulation.',
  },
  {
    id: 2,
    slug: 'mesh',
    label: 'Proximity Topology Mesh',
    shortLabel: 'mesh',
    description: 'Clustered, ring, or spiral node distributions wired by distance-threshold edges.',
  },
  {
    id: 3,
    slug: 'iso-stack',
    label: 'Isometric System Planes',
    shortLabel: 'iso-stack',
    description: '2 to 4 tilted axonometric strata with subdivision grids and vertical data buses.',
  },
  {
    id: 4,
    slug: 'polar',
    label: 'Polar Harmonic Sonar',
    shortLabel: 'polar',
    description: 'Radial harmonic spokes, quantized range rings, and sweeping radar sector arcs.',
  },
  {
    id: 5,
    slug: 'lissajous',
    label: 'Lissajous Phase Figure',
    shortLabel: 'lissajous',
    description: 'Parametric harmonic ratio curves (a:b) with phase-shifted ghost traces and inflection markers.',
  },
  {
    id: 6,
    slug: 'bus-routing',
    label: 'Orthogonal Bus Routing',
    shortLabel: 'bus-routing',
    description: '45°/90° PCB signal traces, parallel channel buses, and plated through-hole vias.',
  },
  {
    id: 7,
    slug: 'interference',
    label: 'Wave Interference Moiré',
    shortLabel: 'interference',
    description: 'Dual off-axis wave emitters with concentric wavefront rings and nodal vectors.',
  },
  {
    id: 8,
    slug: 'hilbert',
    label: 'Space-Filling Curve',
    shortLabel: 'hilbert',
    description: 'Continuous self-avoiding lattice traversal with highlighted memory hot-segments.',
  },
  {
    id: 9,
    slug: 'automata',
    label: 'Symmetric Bit-Matrix',
    shortLabel: 'automata',
    description: 'Bilateral or 4-fold cellular register array with parity ticks and neighbor buses.',
  },
];

export const GLYPH_ACCENTS = [
  { id: 0, name: 'cobalt', cssVar: 'var(--glyph-accent-1)' },
  { id: 1, name: 'teal', cssVar: 'var(--glyph-accent-2)' },
  { id: 2, name: 'amber', cssVar: 'var(--glyph-accent-3)' },
  { id: 3, name: 'crimson', cssVar: 'var(--glyph-accent-4)' },
  { id: 4, name: 'indigo', cssVar: 'var(--glyph-accent-5)' },
  { id: 5, name: 'emerald', cssVar: 'var(--glyph-accent-6)' },
  { id: 6, name: 'ochre', cssVar: 'var(--glyph-accent-7)' },
  { id: 7, name: 'cyan', cssVar: 'var(--glyph-accent-8)' },
];

export const GLYPH_GRIDS = [
  { id: 0, name: 'crosshair + ring' },
  { id: 1, name: 'octagonal target' },
  { id: 2, name: 'ruler ticks' },
  { id: 3, name: 'corner brackets' },
];

export interface GlyphDiagnostics {
  seed: string;
  hash: number;
  hashHex: string;
  hashBin: string;
  familyId: number;
  family: GlyphFamilyMeta;
  accentId: number;
  accentSecondaryId: number;
  accentName: string;
  accentSecondaryName: string;
  gridId: number;
  gridName: string;
  subMode: string;
  prngSamples: number[];
  params: { label: string; value: string }[];
}

export interface RenderedGlyph {
  svg: string;
  width: number;
  height: number;
  diagnostics: GlyphDiagnostics;
}

/**
 * 32-bit FNV-1a hash + final avalanche mixer so single-character edits
 * cascade cleanly across all 32 bits (eliminating correlated low bits).
 */
export function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // MurmurHash3 32-bit finalizer for full bit avalanche
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/**
 * SplitMix32 PRNG stream in [0, 1)
 */
export function makeRng(seedState: number): () => number {
  let state = (seedState >>> 0) || 1;
  return () => {
    state = (state + 0x9e3779b9) >>> 0;
    let z = state;
    z = Math.imul(z ^ (z >>> 16), 0x85ebca6b) >>> 0;
    z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35) >>> 0;
    return ((z ^ (z >>> 16)) >>> 0) / 4294967296;
  };
}

export function familyLabel(seed: string): string {
  const h = hashSeed(seed);
  return GLYPH_FAMILIES[h % GLYPH_FAMILIES.length].shortLabel;
}

function f1(n: number): string {
  return n.toFixed(1);
}

function f2(n: number): string {
  return n.toFixed(2);
}

export function renderProceduralGlyph(opts: GlyphOptions): RenderedGlyph {
  const {
    seed,
    size = 'sm',
    familyOverride = null,
    accentOverride = null,
    gridOverride = null,
  } = opts;

  const h0 = hashSeed(seed);
  const familyCount = GLYPH_FAMILIES.length;
  const accentCount = GLYPH_ACCENTS.length;

  const familyId =
    familyOverride !== null && familyOverride !== undefined && familyOverride >= 0
      ? familyOverride % familyCount
      : h0 % familyCount;

  const accentId =
    accentOverride !== null && accentOverride !== undefined && accentOverride >= 0
      ? accentOverride % accentCount
      : (h0 >>> 4) % accentCount;

  const secStep = 2 + ((h0 >>> 8) % 3); // +2, +3, or +4
  const accentSecondaryId = (accentId + secStep) % accentCount;

  const gridId =
    gridOverride !== null && gridOverride !== undefined && gridOverride >= 0
      ? gridOverride % 4
      : (h0 >>> 11) % 4;

  const accent = GLYPH_ACCENTS[accentId].cssVar;
  const accentSecondary = GLYPH_ACCENTS[accentSecondaryId].cssVar;

  const isBanner = size === 'banner';
  const w = isBanner ? 640 : 64;
  const h = isBanner ? 140 : 64;
  const cx = w / 2;
  const cy = h / 2;
  const scale = isBanner ? 1.85 : 1;

  const rng = makeRng(h0);
  const prngSamples: number[] = [];
  const next = () => {
    const v = rng();
    if (prngSamples.length < 8) prngSamples.push(v);
    return v;
  };

  let subMode = 'standard';
  const params: { label: string; value: string }[] = [];

  // Registration grid markup
  let gridMarkup = '';
  if (gridId === 0) {
    // Crosshair + dashed range circle
    gridMarkup = `
      <g stroke="var(--glyph-grid)" stroke-width="1" fill="none">
        <line x1="0" y1="${f1(cy)}" x2="${w}" y2="${f1(cy)}" />
        <line x1="${f1(cx)}" y1="0" x2="${f1(cx)}" y2="${h}" />
        ${
          isBanner
            ? `<line x1="${f1(w * 0.25)}" y1="0" x2="${f1(w * 0.25)}" y2="${h}" />
               <line x1="${f1(w * 0.75)}" y1="0" x2="${f1(w * 0.75)}" y2="${h}" />`
            : ''
        }
        <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(22 * scale)}" stroke-dasharray="2 3" />
      </g>`;
  } else if (gridId === 1) {
    // Diagonal + octagonal registration frame
    const r = 23 * scale;
    gridMarkup = `
      <g stroke="var(--glyph-grid)" stroke-width="1" fill="none">
        <line x1="0" y1="${f1(cy)}" x2="${w}" y2="${f1(cy)}" />
        <line x1="${f1(cx)}" y1="0" x2="${f1(cx)}" y2="${h}" />
        <line x1="${f1(cx - r)}" y1="${f1(cy - r)}" x2="${f1(cx + r)}" y2="${f1(cy + r)}" stroke-dasharray="1.5 2.5" />
        <line x1="${f1(cx + r)}" y1="${f1(cy - r)}" x2="${f1(cx - r)}" y2="${f1(cy + r)}" stroke-dasharray="1.5 2.5" />
        <rect x="${f1(cx - r)}" y="${f1(cy - r)}" width="${f1(r * 2)}" height="${f1(r * 2)}" rx="${f1(3 * scale)}" />
      </g>`;
  } else if (gridId === 2) {
    // Technical ruler ticks along axes + Golden ratio / third lines
    const ticks: string[] = [];
    const count = isBanner ? 16 : 8;
    for (let i = 1; i < count; i++) {
      const tx = (i / count) * w;
      const tickH = i % 2 === 0 ? 4.5 : 2.5;
      ticks.push(`<line x1="${f1(tx)}" y1="0" x2="${f1(tx)}" y2="${tickH}" />`);
      ticks.push(`<line x1="${f1(tx)}" y1="${h - tickH}" x2="${f1(tx)}" y2="${h}" />`);
    }
    gridMarkup = `
      <g stroke="var(--glyph-grid)" stroke-width="1" fill="none">
        <line x1="0" y1="${f1(cy)}" x2="${w}" y2="${f1(cy)}" stroke-dasharray="3 3" />
        <line x1="${f1(cx)}" y1="0" x2="${f1(cx)}" y2="${h}" stroke-dasharray="3 3" />
        ${ticks.join('')}
      </g>`;
  } else {
    // Corner brackets + concentric micro-target
    const m = isBanner ? 10 : 6;
    const len = isBanner ? 14 : 8;
    gridMarkup = `
      <g stroke="var(--glyph-grid)" stroke-width="1" fill="none">
        <line x1="0" y1="${f1(cy)}" x2="${w}" y2="${f1(cy)}" opacity="0.65" />
        <line x1="${f1(cx)}" y1="0" x2="${f1(cx)}" y2="${h}" opacity="0.65" />
        <path d="M ${m} ${m + len} L ${m} ${m} L ${m + len} ${m}" />
        <path d="M ${w - m - len} ${m} L ${w - m} ${m} L ${w - m} ${m + len}" />
        <path d="M ${m} ${h - m - len} L ${m} ${h - m} L ${m + len} ${h - m}" />
        <path d="M ${w - m - len} ${h - m} L ${w - m} ${h - m} L ${w - m} ${h - m - len}" />
        <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(15 * scale)}" stroke-dasharray="1 3" />
        <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(25 * scale)}" stroke-dasharray="4 4" />
      </g>`;
  }

  let bodyMarkup = '';

  // =========================================================================
  // FAMILY 0: Orbital Phase System
  // =========================================================================
  if (familyId === 0) {
    const orbitCount = 2 + Math.floor(next() * 4); // 2..5
    const configMode = Math.floor(next() * 3);
    subMode = ['coaxial-kepler', 'binary-barycenter', 'resonant-harmonic'][configMode];
    const eccentricity = 0.25 + next() * 0.55;
    const baseTilt = Math.round(next() * 180 - 90);

    params.push(
      { label: 'orbits', value: `${orbitCount}` },
      { label: 'eccentricity', value: f2(eccentricity) },
      { label: 'inclination', value: `${baseTilt}°` },
      { label: 'topology', value: subMode }
    );

    const els: string[] = [];
    const focusShift = configMode === 1 ? (next() - 0.5) * 9 * scale : 0;

    for (let i = 0; i < orbitCount; i++) {
      const t = i / Math.max(1, orbitCount - 1);
      const rx = (22 - i * (11 / orbitCount) + (next() - 0.5) * 3) * scale * (isBanner ? 1.35 : 1);
      const ry = Math.max(4 * scale, rx * (1 - eccentricity * (0.65 + 0.35 * next())));
      const rot =
        configMode === 0
          ? baseTilt + i * Math.round(18 + next() * 22)
          : configMode === 1
          ? baseTilt + (i % 2 === 0 ? 18 : -24) + Math.round((next() - 0.5) * 20)
          : Math.round((i * 180) / orbitCount + baseTilt);

      const ox = cx + (i % 2 === 0 ? focusShift : -focusShift * 0.7);
      const oy = cy;
      const theta = next() * Math.PI * 2;
      const rad = (rot * Math.PI) / 180;
      const px = rx * Math.cos(theta);
      const py = ry * Math.sin(theta);
      const sx = ox + px * Math.cos(rad) - py * Math.sin(rad);
      const sy = oy + px * Math.sin(rad) + py * Math.cos(rad);

      const isPrimary = i === 0;
      const isSecondary = i === orbitCount - 1 && orbitCount > 2;
      const strokeColor = isPrimary
        ? 'var(--glyph-accent)'
        : isSecondary
        ? 'var(--glyph-accent-alt)'
        : 'var(--glyph-ink)';
      const dashed = i % 2 === 1 ? ` stroke-dasharray="${f1(2.5 + i)} ${f1(2 + (i % 2))}"` : '';

      els.push(`
        <ellipse cx="${f1(ox)}" cy="${f1(oy)}" rx="${f1(rx)}" ry="${f1(ry)}"
          transform="rotate(${rot} ${f1(ox)} ${f1(oy)})"
          stroke="${strokeColor}" stroke-width="${isPrimary ? '1.45' : '1.05'}"${dashed}
          opacity="${isPrimary ? '0.95' : f2(0.45 + (1 - t) * 0.35)}" />
      `);

      // Apsidal line on primary orbit
      if (isPrimary && next() > 0.35) {
        const ax1 = ox - rx * Math.cos(rad);
        const ay1 = oy - rx * Math.sin(rad);
        const ax2 = ox + rx * Math.cos(rad);
        const ay2 = oy + rx * Math.sin(rad);
        els.push(
          `<line x1="${f1(ax1)}" y1="${f1(ay1)}" x2="${f1(ax2)}" y2="${f1(ay2)}" stroke="var(--glyph-accent)" stroke-width="0.8" stroke-dasharray="1.5 2" opacity="0.5" />`
        );
      }

      // Satellite node + optional phase vector
      if (i < 2 && configMode === 2) {
        els.push(
          `<line x1="${f1(ox)}" y1="${f1(oy)}" x2="${f1(sx)}" y2="${f1(sy)}" stroke="${strokeColor}" stroke-width="0.85" opacity="0.45" />`
        );
      }
      els.push(
        `<circle cx="${f1(sx)}" cy="${f1(sy)}" r="${isPrimary ? '2.5' : '1.75'}" fill="${strokeColor}" />`
      );
    }

    // Core barycenter node(s)
    if (configMode === 1 && Math.abs(focusShift) > 1.5) {
      els.push(
        `<circle cx="${f1(cx + focusShift)}" cy="${f1(cy)}" r="${f1(2.6 * scale)}" fill="var(--glyph-accent)" fill-opacity="0.25" stroke="var(--glyph-accent)" stroke-width="1.3" />`,
        `<circle cx="${f1(cx - focusShift)}" cy="${f1(cy)}" r="${f1(1.9 * scale)}" fill="var(--glyph-bg)" stroke="var(--glyph-accent-alt)" stroke-width="1.2" />`
      );
    } else {
      els.push(
        `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(3 * scale)}" fill="var(--glyph-accent)" fill-opacity="0.22" stroke="var(--glyph-accent)" stroke-width="1.35" />`
      );
    }

    bodyMarkup = `<g fill="none">${els.join('')}</g>`;
  }

  // =========================================================================
  // FAMILY 1: Harmonic Ridge Horizon
  // =========================================================================
  else if (familyId === 1) {
    const ridgeCount = (isBanner ? 6 : 4) + Math.floor(next() * 4); // 4..7 (sm) or 6..9 (banner)
    const envType = Math.floor(next() * 3);
    subMode = ['gaussian-pulse', 'bimodal-doublet', 'dispersive-chirp'][envType];
    const peak1 = 0.22 + next() * 0.56;
    const peak2 = 0.2 + next() * 0.6;
    const phaseDrift = (next() - 0.5) * 1.4;
    const baseFreq = 1.4 + next() * 2.8;
    const accentIdx = Math.floor(next() * (ridgeCount - 1)) + 1;
    const altIdx = (accentIdx + 2) % ridgeCount;

    params.push(
      { label: 'ridges', value: `${ridgeCount}` },
      { label: 'envelope', value: subMode },
      { label: 'carrier ω', value: `${f2(baseFreq)}π` },
      { label: 'phase drift', value: `${f2(phaseDrift)} rad` }
    );

    const els: string[] = [];
    const steps = isBanner ? 48 : 24;

    for (let idx = 0; idx < ridgeCount; idx++) {
      const yBase = h * 0.22 + (idx / Math.max(1, ridgeCount - 1)) * (h * 0.6);
      const freq1 = baseFreq + (next() - 0.5) * 0.9;
      const freq2 = freq1 * (1.7 + next() * 0.8);
      const phase1 = idx * phaseDrift + next() * Math.PI * 2;
      const phase2 = next() * Math.PI * 2;
      const ampScale = (0.75 + next() * 0.55) * scale;

      const pts: string[] = [];
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const x = t * w;
        let env = 1;
        if (envType === 0) {
          env = Math.exp(-Math.pow((t - peak1) / 0.22, 2));
        } else if (envType === 1) {
          env =
            0.75 * Math.exp(-Math.pow((t - 0.32) / 0.16, 2)) +
            0.85 * Math.exp(-Math.pow((t - 0.68) / 0.16, 2));
        } else {
          const center = peak2 + (idx / ridgeCount - 0.5) * 0.28;
          env = Math.exp(-Math.pow((t - center) / 0.26, 2));
        }
        const rawWave =
          Math.sin(t * Math.PI * freq1 + phase1) * 6.2 +
          Math.cos(t * Math.PI * freq2 + phase2) * 3.1;
        const dy = rawWave * env * ampScale;
        pts.push(`${s === 0 ? 'M' : 'L'} ${f1(x)} ${f1(yBase - dy)}`);
      }

      const d = pts.join(' ');
      const areaD = `${d} L ${w} ${h} L 0 ${h} Z`;
      const isAccent = idx === accentIdx;
      const isAlt = idx === altIdx && ridgeCount >= 5;
      const stroke = isAccent
        ? 'var(--glyph-accent)'
        : isAlt
        ? 'var(--glyph-accent-alt)'
        : 'var(--glyph-ink)';
      const sw = isAccent ? '1.6' : isAlt ? '1.3' : '1.05';
      const op = isAccent ? '1' : isAlt ? '0.88' : f2(0.35 + (idx / ridgeCount) * 0.55);

      els.push(`
        <g>
          <path d="${areaD}" fill="var(--glyph-bg)" opacity="0.86" />
          <path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}" />
        </g>
      `);
    }

    bodyMarkup = `<g>${els.join('')}</g>`;
  }

  // =========================================================================
  // FAMILY 2: Proximity Topology Mesh
  // =========================================================================
  else if (familyId === 2) {
    const topoMode = Math.floor(next() * 3);
    subMode = ['annular-ring', 'bipartite-cluster', 'phyllotaxis-spiral'][topoMode];
    const baseCount = isBanner ? 13 : 7;
    const nodeCount = baseCount + Math.floor(next() * 5);
    const hubCount = 1 + Math.floor(next() * 3);
    const spreadX = isBanner ? 3.1 : 1;

    params.push(
      { label: 'vertices', value: `${nodeCount}` },
      { label: 'hubs', value: `${hubCount}` },
      { label: 'layout', value: subMode }
    );

    const nodes: { x: number; y: number; hub: boolean; alt: boolean }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      let x = cx;
      let y = cy;
      if (topoMode === 0) {
        const angle = (i / nodeCount) * Math.PI * 2 + (next() - 0.5) * 0.55;
        const radius = (0.2 + next() * 0.62) * (isBanner ? h * 0.44 : 24);
        x = cx + Math.cos(angle) * radius * spreadX;
        y = cy + Math.sin(angle) * radius;
      } else if (topoMode === 1) {
        const lobe = i % 2 === 0 ? -1 : 1;
        const lobeCx = cx + lobe * (isBanner ? 95 : 12);
        const angle = next() * Math.PI * 2;
        const r = (4 + next() * 12) * (isBanner ? 1.65 : 1);
        x = lobeCx + Math.cos(angle) * r * (isBanner ? 1.5 : 1);
        y = cy + Math.sin(angle) * r;
      } else {
        // Golden angle spiral
        const ga = i * 2.399963 + next() * 0.25;
        const r = Math.sqrt((i + 0.6) / nodeCount) * (isBanner ? h * 0.43 : 23.5);
        x = cx + Math.cos(ga) * r * spreadX;
        y = cy + Math.sin(ga) * r;
      }
      nodes.push({ x, y, hub: i < hubCount, alt: i === hubCount });
    }

    const edges: { x1: number; y1: number; x2: number; y2: number; primary: boolean; dashed: boolean }[] = [];
    const maxDist = (isBanner ? 44 : 25) * (0.88 + next() * 0.3);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = (nodes[i].x - nodes[j].x) / (isBanner ? 2.15 : 1);
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          edges.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            primary: nodes[i].hub || nodes[j].hub,
            dashed: (i + j) % 5 === 0,
          });
        }
      }
    }

    params.push({ label: 'edges', value: `${edges.length}` });

    const edgeEls = edges.map(
      (e) =>
        `<line x1="${f1(e.x1)}" y1="${f1(e.y1)}" x2="${f1(e.x2)}" y2="${f1(e.y2)}"
          stroke="${e.primary ? 'var(--glyph-accent)' : 'var(--glyph-ink)'}"
          stroke-width="${e.primary ? '1.3' : '0.95'}"
          ${e.dashed ? 'stroke-dasharray="2 2"' : ''}
          opacity="${e.primary ? '0.8' : '0.4'}" />`
    );

    const nodeEls = nodes.map((n, idx) => {
      const stroke = n.hub
        ? 'var(--glyph-accent)'
        : n.alt
        ? 'var(--glyph-accent-alt)'
        : 'var(--glyph-ink)';
      const fill = n.hub
        ? 'var(--glyph-accent)'
        : n.alt
        ? 'var(--glyph-accent-alt)'
        : 'var(--glyph-bg)';
      if (idx % 4 === 2 && !n.hub) {
        const s = 3.2;
        return `<rect x="${f1(n.x - s / 2)}" y="${f1(n.y - s / 2)}" width="${s}" height="${s}" fill="var(--glyph-bg)" stroke="${stroke}" stroke-width="1.2" />`;
      }
      return `<circle cx="${f1(n.x)}" cy="${f1(n.y)}" r="${n.hub ? '2.8' : '1.85'}" fill="${fill}" stroke="${stroke}" stroke-width="1.3" />`;
    });

    bodyMarkup = `<g>${edgeEls.join('')}${nodeEls.join('')}</g>`;
  }

  // =========================================================================
  // FAMILY 3: Isometric System Planes
  // =========================================================================
  else if (familyId === 3) {
    const planeCount = 2 + Math.floor(next() * 3); // 2, 3, or 4 planes
    const isoRot = Math.round((next() - 0.5) * 24);
    const activeLayer = Math.floor(next() * planeCount);
    const skewRatio = 0.36 + next() * 0.18;
    const subdivStyle = Math.floor(next() * 3);
    subMode = ['cross-matrix', 'parallel-slices', 'core-cutout'][subdivStyle];

    params.push(
      { label: 'strata', value: `${planeCount} planes` },
      { label: 'active bus', value: `layer ${activeLayer}` },
      { label: 'subdivision', value: subMode },
      { label: 'yaw', value: `${isoRot}°` }
    );

    const spacing = isBanner ? 32 / Math.max(1, planeCount - 1) : 18 / Math.max(1, planeCount - 1);
    const layers = Array.from({ length: planeCount }).map((_, idx) => {
      const offset = idx - (planeCount - 1) / 2;
      const yCenter = cy + offset * spacing;
      const taper = 1 - Math.abs(offset) * 0.06 * (next() - 0.2);
      const rx = (isBanner ? 56 : 20.5) * taper;
      const ry = rx * skewRatio;
      const points = [
        `${f1(cx)},${f1(yCenter - ry)}`,
        `${f1(cx + rx)},${f1(yCenter)}`,
        `${f1(cx)},${f1(yCenter + ry)}`,
        `${f1(cx - rx)},${f1(yCenter)}`,
      ].join(' ');
      return {
        idx,
        points,
        yCenter,
        rx,
        ry,
        isActive: idx === activeLayer,
        isTop: idx === 0,
      };
    });

    const topL = layers[0];
    const botL = layers[layers.length - 1];

    const layerMarkup = layers
      .slice()
      .reverse()
      .map((layer) => {
        let inner = '';
        if (layer.isTop || layer.isActive) {
          if (subdivStyle === 0) {
            inner = `
              <g stroke="${layer.isActive ? 'var(--glyph-accent)' : 'var(--glyph-ink)'}" stroke-width="0.85" opacity="0.55">
                <line x1="${f1(cx - layer.rx * 0.5)}" y1="${f1(layer.yCenter - layer.ry * 0.5)}" x2="${f1(cx + layer.rx * 0.5)}" y2="${f1(layer.yCenter + layer.ry * 0.5)}" />
                <line x1="${f1(cx + layer.rx * 0.5)}" y1="${f1(layer.yCenter - layer.ry * 0.5)}" x2="${f1(cx - layer.rx * 0.5)}" y2="${f1(layer.yCenter + layer.ry * 0.5)}" />
              </g>`;
          } else if (subdivStyle === 1) {
            inner = `
              <g stroke="${layer.isActive ? 'var(--glyph-accent)' : 'var(--glyph-ink)'}" stroke-width="0.85" opacity="0.55">
                <line x1="${f1(cx - layer.rx * 0.66)}" y1="${f1(layer.yCenter - layer.ry * 0.33)}" x2="${f1(cx + layer.rx * 0.33)}" y2="${f1(layer.yCenter + layer.ry * 0.66)}" />
                <line x1="${f1(cx - layer.rx * 0.33)}" y1="${f1(layer.yCenter - layer.ry * 0.66)}" x2="${f1(cx + layer.rx * 0.66)}" y2="${f1(layer.yCenter + layer.ry * 0.33)}" />
              </g>`;
          } else {
            const irx = layer.rx * 0.42;
            const iry = layer.ry * 0.42;
            const ip = `${f1(cx)},${f1(layer.yCenter - iry)} ${f1(cx + irx)},${f1(layer.yCenter)} ${f1(cx)},${f1(layer.yCenter + iry)} ${f1(cx - irx)},${f1(layer.yCenter)}`;
            inner = `<polygon points="${ip}" fill="var(--glyph-bg)" stroke="${layer.isActive ? 'var(--glyph-accent)' : 'var(--glyph-ink)'}" stroke-width="0.9" opacity="0.75" />`;
          }
        }
        return `
          <g>
            <polygon points="${layer.points}"
              fill="${layer.isActive ? 'var(--glyph-accent)' : 'var(--glyph-bg)'}"
              fill-opacity="${layer.isActive ? '0.2' : '0.84'}"
              stroke="${layer.isActive ? 'var(--glyph-accent)' : 'var(--glyph-ink)'}"
              stroke-width="${layer.isActive ? '1.5' : '1.15'}" />
            ${inner}
          </g>`;
      })
      .join('');

    bodyMarkup = `
      <g transform="rotate(${isoRot} ${f1(cx)} ${f1(cy)})" stroke-linejoin="round">
        <line x1="${f1(cx - topL.rx)}" y1="${f1(topL.yCenter)}" x2="${f1(cx - botL.rx)}" y2="${f1(botL.yCenter)}" stroke="var(--glyph-ink)" stroke-width="1" stroke-dasharray="2 2" opacity="0.45" />
        <line x1="${f1(cx + topL.rx)}" y1="${f1(topL.yCenter)}" x2="${f1(cx + botL.rx)}" y2="${f1(botL.yCenter)}" stroke="var(--glyph-ink)" stroke-width="1" stroke-dasharray="2 2" opacity="0.45" />
        ${layerMarkup}
        <line x1="${f1(cx)}" y1="${f1(topL.yCenter - 4)}" x2="${f1(cx)}" y2="${f1(botL.yCenter + 4)}" stroke="var(--glyph-accent)" stroke-width="1.5" />
        <circle cx="${f1(cx)}" cy="${f1(topL.yCenter)}" r="2.2" fill="var(--glyph-accent)" />
        <circle cx="${f1(cx)}" cy="${f1(layers[activeLayer].yCenter)}" r="2.6" fill="var(--glyph-bg)" stroke="var(--glyph-accent)" stroke-width="1.5" />
      </g>`;
  }

  // =========================================================================
  // FAMILY 4: Polar Harmonic Sonar
  // =========================================================================
  else if (familyId === 4) {
    const spokeCount = (isBanner ? 22 : 12) + Math.floor(next() * 14);
    const harmonicM = 2 + Math.floor(next() * 5); // 2..6 lobes
    const phase = next() * Math.PI * 2;
    const sweepStart = next() * Math.PI * 2;
    const sweepSpan = (0.45 + next() * 0.75) * Math.PI;
    subMode = `${harmonicM}-lobe harmonic`;

    params.push(
      { label: 'spokes', value: `${spokeCount}` },
      { label: 'harmonic m', value: `${harmonicM}` },
      { label: 'sector arc', value: `${Math.round((sweepSpan * 180) / Math.PI)}°` }
    );

    const rRing = (11 + next() * 5) * scale;
    const arcR = (17 + next() * 5) * scale;
    const ax1 = cx + Math.cos(sweepStart) * arcR;
    const ay1 = cy + Math.sin(sweepStart) * arcR;
    const ax2 = cx + Math.cos(sweepStart + sweepSpan) * arcR;
    const ay2 = cy + Math.sin(sweepStart + sweepSpan) * arcR;
    const largeArc = sweepSpan > Math.PI ? 1 : 0;

    const spokeEls: string[] = [];
    for (let i = 0; i < spokeCount; i++) {
      const a = (i / spokeCount) * Math.PI * 2;
      const rInner = (4.2 + (i % 2) * 2.4) * scale;
      const mod = 0.55 + 0.45 * Math.cos(harmonicM * a + phase);
      const rOuter = (10 + mod * 12 + next() * 3.5) * scale;
      const x1 = cx + Math.cos(a) * rInner;
      const y1 = cy + Math.sin(a) * rInner;
      const x2 = cx + Math.cos(a) * rOuter;
      const y2 = cy + Math.sin(a) * rOuter;
      const highlight = mod > 0.82;
      spokeEls.push(
        `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}"
          stroke="${highlight ? 'var(--glyph-accent)' : 'var(--glyph-ink)'}"
          stroke-width="${highlight ? '1.6' : '1.1'}"
          opacity="${highlight ? '0.95' : '0.58'}" />`
      );
    }

    bodyMarkup = `
      <g stroke-linecap="round" fill="none">
        <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(rRing)}" fill="var(--glyph-accent)" fill-opacity="0.09" stroke="var(--glyph-accent)" stroke-width="1" stroke-dasharray="2 3" />
        <path d="M ${f1(ax1)} ${f1(ay1)} A ${f1(arcR)} ${f1(arcR)} 0 ${largeArc} 1 ${f1(ax2)} ${f1(ay2)}" stroke="var(--glyph-accent-alt)" stroke-width="1.4" opacity="0.8" />
        ${spokeEls.join('')}
        <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(3.3 * scale)}" fill="var(--glyph-bg)" stroke="var(--glyph-accent)" stroke-width="1.5" />
      </g>`;
  }

  // =========================================================================
  // FAMILY 5: Lissajous Phase Figure
  // =========================================================================
  else if (familyId === 5) {
    const ratios: [number, number][] = [
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 2],
      [4, 3],
      [5, 4],
      [1, 3],
      [5, 3],
    ];
    const [fx, fy] = ratios[Math.floor(next() * ratios.length)];
    const delta = (0.15 + next() * 0.7) * Math.PI;
    const ghostShift = 0.22 + next() * 0.25;
    subMode = `ratio ${fx}:${fy}`;

    params.push(
      { label: 'freq ratio', value: `${fx}:${fy}` },
      { label: 'phase δ', value: `${f2(delta / Math.PI)}π` },
      { label: 'harmonic shift', value: `${f2(ghostShift)} rad` }
    );

    const rx = isBanner ? 135 : 22;
    const ry = isBanner ? 46 : 22;
    const steps = 140;

    const buildCurve = (phaseShift: number) => {
      const pts: string[] = [];
      for (let s = 0; s <= steps; s++) {
        const t = (s / steps) * Math.PI * 2;
        const x = cx + Math.sin(fx * t + delta + phaseShift) * rx;
        const y = cy + Math.sin(fy * t) * ry;
        pts.push(`${s === 0 ? 'M' : 'L'} ${f1(x)} ${f1(y)}`);
      }
      return pts.join(' ') + ' Z';
    };

    const mainD = buildCurve(0);
    const ghostD = buildCurve(ghostShift);

    // Sample 3 phase marker nodes along primary curve
    const markers: string[] = [];
    for (let m = 0; m < 3; m++) {
      const t = (m / 3 + next() * 0.2) * Math.PI * 2;
      const mx = cx + Math.sin(fx * t + delta) * rx;
      const my = cy + Math.sin(fy * t) * ry;
      markers.push(
        `<circle cx="${f1(mx)}" cy="${f1(my)}" r="${m === 0 ? '2.6' : '1.9'}" fill="${m === 0 ? 'var(--glyph-accent)' : 'var(--glyph-bg)'}" stroke="var(--glyph-accent)" stroke-width="1.3" />`
      );
    }

    bodyMarkup = `
      <g fill="none" stroke-linejoin="round">
        <path d="${ghostD}" stroke="var(--glyph-ink)" stroke-width="0.95" stroke-dasharray="2.5 2.5" opacity="0.42" />
        <path d="${mainD}" stroke="var(--glyph-accent)" stroke-width="1.45" opacity="0.92" />
        ${markers.join('')}
      </g>`;
  }

  // =========================================================================
  // FAMILY 6: Orthogonal Bus Routing (PCB / Metro traces)
  // =========================================================================
  else if (familyId === 6) {
    const trackCount = (isBanner ? 7 : 4) + Math.floor(next() * 3);
    const dirMode = Math.floor(next() * 3);
    subMode = ['horizontal-bus', 'radial-breakout', 'dual-channel'][dirMode];

    params.push(
      { label: 'channels', value: `${trackCount}` },
      { label: 'routing', value: subMode },
      { label: 'via pitch', value: '45°/90°' }
    );

    const traces: string[] = [];
    const vias: string[] = [];
    const padX = isBanner ? 75 : 11;
    const padY = isBanner ? 22 : 11;
    const spanX = w - padX * 2;
    const spanY = h - padY * 2;

    for (let i = 0; i < trackCount; i++) {
      const t = i / Math.max(1, trackCount - 1);
      const isPrimary = i === Math.floor(trackCount / 2);
      const isAlt = i === 0 && trackCount > 3;
      const stroke = isPrimary
        ? 'var(--glyph-accent)'
        : isAlt
        ? 'var(--glyph-accent-alt)'
        : 'var(--glyph-ink)';
      const sw = isPrimary ? '1.55' : '1.1';
      const op = isPrimary ? '0.96' : '0.62';

      if (dirMode === 1) {
        // Breakout from central IC block to outer pins
        const side = i % 2 === 0 ? -1 : 1;
        const y0 = cy + ((i - (trackCount - 1) / 2) * (spanY * 0.45)) / trackCount;
        const jog = (6 + next() * 8) * scale;
        const xMid = cx + side * (isBanner ? 35 + i * 10 : 7 + i * 2);
        const yEnd = y0 + (next() > 0.5 ? 1 : -1) * jog;
        const xEnd = cx + side * (spanX * 0.46);
        traces.push(
          `<polyline points="${f1(cx)},${f1(y0)} ${f1(xMid)},${f1(y0)} ${f1(xMid + side * Math.abs(yEnd - y0))},${f1(yEnd)} ${f1(xEnd)},${f1(yEnd)}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}" stroke-linecap="round" stroke-linejoin="round" />`
        );
        vias.push(
          `<circle cx="${f1(xEnd)}" cy="${f1(yEnd)}" r="2" fill="var(--glyph-bg)" stroke="${stroke}" stroke-width="1.3" />`
        );
      } else {
        // Left-to-right metro/PCB bus with 45-degree diagonal dogleg
        const yStart = padY + t * spanY;
        const deltaSteps = Math.round((next() - 0.5) * 3) * (isBanner ? 8 : 5.5);
        const yEnd = Math.max(padY, Math.min(h - padY, yStart + deltaSteps));
        const diagSpan = Math.abs(yEnd - yStart);
        const xKnee1 = padX + spanX * (0.25 + next() * 0.35);
        const xKnee2 = Math.min(w - padX - 4, xKnee1 + diagSpan);

        traces.push(
          `<polyline points="${f1(padX)},${f1(yStart)} ${f1(xKnee1)},${f1(yStart)} ${f1(xKnee2)},${f1(yEnd)} ${f1(w - padX)},${f1(yEnd)}" fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}" stroke-linecap="round" stroke-linejoin="round" />`
        );
        vias.push(
          `<circle cx="${f1(padX)}" cy="${f1(yStart)}" r="1.9" fill="${isPrimary ? stroke : 'var(--glyph-bg)'}" stroke="${stroke}" stroke-width="1.25" />`,
          `<circle cx="${f1(w - padX)}" cy="${f1(yEnd)}" r="1.9" fill="${isPrimary ? stroke : 'var(--glyph-bg)'}" stroke="${stroke}" stroke-width="1.25" />`
        );
        if (isPrimary) {
          vias.push(
            `<circle cx="${f1(xKnee1)}" cy="${f1(yStart)}" r="2.2" fill="var(--glyph-accent)" />`
          );
        }
      }
    }

    if (dirMode === 1) {
      const chipW = isBanner ? 26 : 11;
      const chipH = isBanner ? 34 : 15;
      vias.push(
        `<rect x="${f1(cx - chipW / 2)}" y="${f1(cy - chipH / 2)}" width="${chipW}" height="${chipH}" rx="2" fill="var(--glyph-bg)" stroke="var(--glyph-accent)" stroke-width="1.4" />`
      );
    }

    bodyMarkup = `<g>${traces.join('')}${vias.join('')}</g>`;
  }

  // =========================================================================
  // FAMILY 7: Wave Interference Moiré
  // =========================================================================
  else if (familyId === 7) {
    const ringCount = (isBanner ? 6 : 4) + Math.floor(next() * 3);
    const sep = (6.5 + next() * 9) * (isBanner ? 2.6 : 1);
    const tilt = (next() - 0.5) * Math.PI * 0.75;
    subMode = `${ringCount}×2 wavefronts`;

    const c1x = cx - Math.cos(tilt) * sep;
    const c1y = cy - Math.sin(tilt) * (sep / (isBanner ? 2.2 : 1));
    const c2x = cx + Math.cos(tilt) * sep;
    const c2y = cy + Math.sin(tilt) * (sep / (isBanner ? 2.2 : 1));

    params.push(
      { label: 'wavefronts', value: `${ringCount} per dipole` },
      { label: 'dipole Δd', value: `${f1(sep * 2)}px` },
      { label: 'axis θ', value: `${Math.round((tilt * 180) / Math.PI)}°` }
    );

    const step = (isBanner ? 6.5 : 4.2) + next() * 1.4;
    const rings: string[] = [];

    for (let i = 1; i <= ringCount; i++) {
      const r = i * step;
      const isHighlight = i === Math.ceil(ringCount / 2);
      rings.push(
        `<circle cx="${f1(c1x)}" cy="${f1(c1y)}" r="${f1(r)}" stroke="${isHighlight ? 'var(--glyph-accent)' : 'var(--glyph-ink)'}" stroke-width="${isHighlight ? '1.4' : '1.0'}" opacity="${isHighlight ? '0.92' : '0.52'}" />`,
        `<circle cx="${f1(c2x)}" cy="${f1(c2y)}" r="${f1(r)}" stroke="${isHighlight ? 'var(--glyph-accent-alt)' : 'var(--glyph-ink)'}" stroke-width="${isHighlight ? '1.35' : '0.95'}" stroke-dasharray="${i % 2 === 0 ? '3 2' : ''}" opacity="${isHighlight ? '0.88' : '0.48'}" />`
      );
    }

    bodyMarkup = `
      <g fill="none">
        ${rings.join('')}
        <line x1="${f1(c1x)}" y1="${f1(c1y)}" x2="${f1(c2x)}" y2="${f1(c2y)}" stroke="var(--glyph-accent)" stroke-width="1.1" stroke-dasharray="2 2" opacity="0.7" />
        <circle cx="${f1(c1x)}" cy="${f1(c1y)}" r="2.3" fill="var(--glyph-accent)" />
        <circle cx="${f1(c2x)}" cy="${f1(c2y)}" r="2.3" fill="var(--glyph-accent-alt)" />
      </g>`;
  }

  // =========================================================================
  // FAMILY 8: Space-Filling Curve (Self-Avoiding Hamiltonian Walk)
  // =========================================================================
  else if (familyId === 8) {
    const cols = isBanner ? 11 : 5;
    const rows = 5;
    const styleMode = Math.floor(next() * 3);
    subMode = ['serpentine-boustrophedon', 'spiral-inward', 'quadrant-meander'][styleMode];

    params.push(
      { label: 'lattice', value: `${cols}×${rows}` },
      { label: 'traversal', value: subMode }
    );

    const padX = isBanner ? 95 : 13;
    const padY = isBanner ? 24 : 13;
    const cellW = (w - padX * 2) / (cols - 1);
    const cellH = (h - padY * 2) / (rows - 1);

    const visited = new Set<string>();
    const pathCoords: [number, number][] = [];

    // Deterministic randomized self-avoiding walk seeded by PRNG
    let curC = Math.floor(next() * cols);
    let curR = Math.floor(next() * rows);
    const maxSteps = cols * rows;

    for (let step = 0; step < maxSteps; step++) {
      visited.add(`${curC},${curR}`);
      pathCoords.push([padX + curC * cellW, padY + curR * cellH]);

      const neighbors: [number, number][] = [];
      const dirs: [number, number][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (const [dc, dr] of dirs) {
        const nc = curC + dc;
        const nr = curR + dr;
        if (nc >= 0 && nc < cols && nr >= 0 && nr < rows && !visited.has(`${nc},${nr}`)) {
          neighbors.push([nc, nr]);
        }
      }
      if (!neighbors.length) break;
      const pick = neighbors[Math.floor(next() * neighbors.length)];
      curC = pick[0];
      curR = pick[1];
    }

    // Background lattice dots
    const dots: string[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const gx = padX + c * cellW;
        const gy = padY + r * cellH;
        dots.push(`<circle cx="${f1(gx)}" cy="${f1(gy)}" r="1" fill="var(--glyph-ink)" opacity="0.32" />`);
      }
    }

    const fullPts = pathCoords.map(([x, y]) => `${f1(x)},${f1(y)}`).join(' ');
    const hotLen = Math.max(3, Math.floor(pathCoords.length * 0.38));
    const hotStart = Math.floor(next() * Math.max(1, pathCoords.length - hotLen));
    const hotPts = pathCoords
      .slice(hotStart, hotStart + hotLen)
      .map(([x, y]) => `${f1(x)},${f1(y)}`)
      .join(' ');

    const [sx, sy] = pathCoords[0];
    const [ex, ey] = pathCoords[pathCoords.length - 1];

    params.push({ label: 'walk length', value: `${pathCoords.length} nodes` });

    bodyMarkup = `
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${dots.join('')}
        <polyline points="${fullPts}" stroke="var(--glyph-ink)" stroke-width="1.25" opacity="0.58" />
        <polyline points="${hotPts}" stroke="var(--glyph-accent)" stroke-width="1.8" opacity="0.98" />
        <circle cx="${f1(sx)}" cy="${f1(sy)}" r="2.4" fill="var(--glyph-accent)" />
        <rect x="${f1(ex - 2.2)}" y="${f1(ey - 2.2)}" width="4.4" height="4.4" fill="var(--glyph-bg)" stroke="var(--glyph-accent)" stroke-width="1.4" />
      </g>`;
  }

  // =========================================================================
  // FAMILY 9: Symmetric Bit-Matrix / Cellular Register
  // =========================================================================
  else {
    const cols = isBanner ? 11 : 5;
    const rows = 5;
    const symMode = Math.floor(next() * 2);
    subMode = symMode === 0 ? 'bilateral-mirror' : 'quad-dihedral';
    const density = 0.34 + next() * 0.28;

    params.push(
      { label: 'register', value: `${cols}×${rows} cells` },
      { label: 'symmetry', value: subMode },
      { label: 'fill factor', value: `${Math.round(density * 100)}%` }
    );

    const gridW = isBanner ? 210 : 38;
    const gridH = isBanner ? 78 : 38;
    const startX = cx - gridW / 2;
    const startY = cy - gridH / 2;
    const stepX = gridW / cols;
    const stepY = gridH / rows;
    const cellW = stepX * 0.72;
    const cellH = stepY * 0.72;

    const halfC = Math.ceil(cols / 2);
    const halfR = symMode === 1 ? Math.ceil(rows / 2) : rows;
    const map: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let r = 0; r < halfR; r++) {
      for (let c = 0; c < halfC; c++) {
        const v = next() < density ? (next() < 0.28 ? 2 : 1) : 0;
        map[r][c] = v;
        map[r][cols - 1 - c] = v;
        if (symMode === 1) {
          map[rows - 1 - r][c] = v;
          map[rows - 1 - r][cols - 1 - c] = v;
        }
      }
    }
    // Guarantee center anchor is active
    map[Math.floor(rows / 2)][Math.floor(cols / 2)] = 2;

    const cells: string[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = map[r][c];
        const x = startX + c * stepX + (stepX - cellW) / 2;
        const y = startY + r * stepY + (stepY - cellH) / 2;
        if (v === 2) {
          cells.push(
            `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(cellW)}" height="${f1(cellH)}" rx="1.4" fill="var(--glyph-accent)" fill-opacity="0.82" stroke="var(--glyph-accent)" stroke-width="1.2" />`
          );
        } else if (v === 1) {
          cells.push(
            `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(cellW)}" height="${f1(cellH)}" rx="1.4" fill="var(--glyph-accent)" fill-opacity="0.16" stroke="var(--glyph-ink)" stroke-width="1.1" opacity="0.85" />`
          );
        } else {
          cells.push(
            `<circle cx="${f1(x + cellW / 2)}" cy="${f1(y + cellH / 2)}" r="0.9" fill="var(--glyph-ink)" opacity="0.28" />`
          );
        }
      }
    }

    bodyMarkup = `<g>${cells.join('')}</g>`;
  }

  const svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="glyph-svg" style="--glyph-accent: ${accent}; --glyph-accent-alt: ${accentSecondary};"><rect width="${w}" height="${h}" fill="var(--glyph-bg)" />${gridMarkup}${bodyMarkup}</svg>`;

  const hashHex = '0x' + h0.toString(16).toUpperCase().padStart(8, '0');
  const hashBin = h0.toString(2).padStart(32, '0');

  return {
    svg,
    width: w,
    height: h,
    diagnostics: {
      seed,
      hash: h0,
      hashHex,
      hashBin,
      familyId,
      family: GLYPH_FAMILIES[familyId],
      accentId,
      accentSecondaryId,
      accentName: GLYPH_ACCENTS[accentId].name,
      accentSecondaryName: GLYPH_ACCENTS[accentSecondaryId].name,
      gridId,
      gridName: GLYPH_GRIDS[gridId].name,
      subMode,
      prngSamples,
      params,
    },
  };
}
