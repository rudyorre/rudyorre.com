/**
 * Zero-dependency test suite using Node's built-in `node:test` and `node:assert`.
 * Validates:
 *   1. Deterministic hashing, avalanche bit-mixing, and SplitMix32 PRNG invariants
 *   2. All 640 combinations (10 motif families × 8 palettes × 4 grids × 2 sizes)
 *   3. Static Astro build output (`./dist`) routes, search index, and RSS feed
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// Transpile and import `src/lib/glyph-engine.ts` in-memory with zero extra packages
const enginePath = path.resolve('src/lib/glyph-engine.ts');
const tsSource = fs.readFileSync(enginePath, 'utf8');
const jsOutput = ts.transpileModule(tsSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const glyphEngine = await import(
  `data:text/javascript;base64,${Buffer.from(jsOutput).toString('base64')}`
);

const {
  hashSeed,
  makeRng,
  familyLabel,
  renderProceduralGlyph,
  GLYPH_FAMILIES,
  GLYPH_ACCENTS,
  GLYPH_GRIDS,
} = glyphEngine;

describe('glyph-engine: hashing & PRNG', () => {
  test('hashSeed is deterministic and returns unsigned 32-bit integer', () => {
    const h1 = hashSeed('post:procedural-glyphs');
    const h2 = hashSeed('post:procedural-glyphs');
    assert.equal(h1, h2);
    assert.equal(typeof h1, 'number');
    assert.ok(h1 >= 0 && h1 <= 0xffffffff);
  });

  test('hashSeed exhibits strong bit avalanche on 1-char edits', () => {
    const hBase = hashSeed('post:raft-leases');
    const hNext = hashSeed('post:raft-leaset');
    const xor = (hBase ^ hNext) >>> 0;
    const flippedBits = xor.toString(2).replace(/0/g, '').length;
    // A good avalanche mixer flips roughly ~16 of 32 bits; ensure at least 8 bits differ
    assert.ok(
      flippedBits >= 8,
      `Expected >=8 flipped bits on 1-char edit, got ${flippedBits}`
    );
  });

  test('makeRng produces repeatable floats in [0, 1)', () => {
    const r1 = makeRng(123456789);
    const r2 = makeRng(123456789);
    for (let i = 0; i < 50; i++) {
      const v1 = r1();
      const v2 = r2();
      assert.equal(v1, v2);
      assert.ok(v1 >= 0 && v1 < 1, `Out of range PRNG value: ${v1}`);
    }
  });

  test('familyLabel returns clean non-versioned shortLabel', () => {
    const label = familyLabel('post:procedural-glyphs');
    assert.ok(!/^v\d/.test(label), `Unexpected version prefix in label: ${label}`);
    assert.ok(GLYPH_FAMILIES.some((f) => f.shortLabel === label));
  });
});

describe('glyph-engine: SVG synthesis & overrides', () => {
  test('all 640 combinations (10 families × 8 accents × 4 grids × 2 sizes) render valid SVG', () => {
    assert.equal(GLYPH_FAMILIES.length, 10);
    assert.equal(GLYPH_ACCENTS.length, 8);
    assert.equal(GLYPH_GRIDS.length, 4);

    for (const fam of GLYPH_FAMILIES) {
      for (const acc of GLYPH_ACCENTS) {
        for (const grid of GLYPH_GRIDS) {
          for (const size of ['md', 'banner']) {
            const res = renderProceduralGlyph({
              seed: 'test:matrix-seed',
              size,
              familyOverride: fam.id,
              accentOverride: acc.id,
              gridOverride: grid.id,
            });

            const expectedW = size === 'banner' ? 640 : 64;
            const expectedH = size === 'banner' ? 140 : 64;
            assert.equal(res.width, expectedW);
            assert.equal(res.height, expectedH);
            assert.equal(res.diagnostics.familyId, fam.id);
            assert.equal(res.diagnostics.accentId, acc.id);
            assert.equal(res.diagnostics.gridId, grid.id);

            assert.ok(res.svg.startsWith(`<svg viewBox="0 0 ${expectedW} ${expectedH}"`));
            assert.ok(res.svg.endsWith('</svg>'));
            assert.ok(
              res.svg.includes(`--glyph-accent: ${acc.cssVar}`),
              `Missing ${acc.cssVar} on family ${fam.slug}`
            );
            assert.ok(
              res.svg.includes('var(--glyph-accent)'),
              `Family ${fam.slug} did not reference var(--glyph-accent)`
            );
            assert.ok(
              !res.svg.includes('NaN') && !res.svg.includes('undefined'),
              `SVG for ${fam.slug} contained NaN or undefined`
            );
          }
        }
      }
    }
  });
});

describe('dist: static build verification', () => {
  const distDir = path.resolve('dist');

  test('expected static HTML pages and endpoints exist in ./dist', () => {
    if (!fs.existsSync(distDir)) {
      // Skip dist checks if running unit tests before `npm run build`
      return;
    }

    const requiredFiles = [
      'index.html',
      '404.html',
      'writing/index.html',
      'writing/procedural-glyphs/index.html',
      'writing/rebuilding-this-site/index.html',
      'projects/index.html',
      'lab/index.html',
      'lab/glyphs/index.html',
      'versions/index.html',
      'v3/index.html',
      'v3/projects/index.html',
      'search-index.json',
      'rss.xml',
    ];

    for (const rel of requiredFiles) {
      const full = path.join(distDir, rel);
      assert.ok(fs.existsSync(full), `Missing built file: dist/${rel}`);
    }

    // Verify archived v3 snapshot includes noindex and Time Machine return banner
    const v3Html = fs.readFileSync(path.join(distDir, 'v3/index.html'), 'utf8');
    assert.ok(
      v3Html.includes('name="robots" content="noindex'),
      'v3/index.html should contain noindex meta tag'
    );
    assert.ok(
      v3Html.includes('Return to current site'),
      'v3/index.html should contain the Time Machine return banner'
    );

    // Verify search-index.json includes /lab/glyphs, /versions, and /v3/
    const searchIndex = JSON.parse(
      fs.readFileSync(path.join(distDir, 'search-index.json'), 'utf8')
    );
    assert.ok(Array.isArray(searchIndex) && searchIndex.length > 0);
    assert.ok(
      searchIndex.some((d) => d.url === '/lab/glyphs'),
      'search-index.json should include /lab/glyphs'
    );
    assert.ok(
      searchIndex.some((d) => d.url === '/versions'),
      'search-index.json should include /versions'
    );
    assert.ok(
      searchIndex.some((d) => d.url === '/v3/'),
      'search-index.json should include /v3/'
    );
  });
});

