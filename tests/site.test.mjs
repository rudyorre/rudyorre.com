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
      'robots.txt',
      'blog/index.html',
      'blog/procedural-glyphs/index.html',
      'blog/rebuilding-this-site/index.html',
      'projects/index.html',
      'lab/index.html',
      'lab/glyphs/index.html',
      'versions/index.html',
      'og/default.png',
      'og/blog.png',
      'og/projects.png',
      'og/lab.png',
      'og/lab/glyphs.png',
      'og/versions.png',
      'og/blog/procedural-glyphs.png',
      'og/blog/rebuilding-this-site.png',
      'v0-alpha/index.html',
      'v0/index.html',
      'v0/projects.html',
      'v1/index.html',
      'v2/index.html',
      'v3/index.html',
      'v3/projects/index.html',
      'search-index.json',
      'rss.xml',
    ];

    for (const rel of requiredFiles) {
      const full = path.join(distDir, rel);
      assert.ok(fs.existsSync(full), `Missing built file: dist/${rel}`);
    }

    // Verify all generated OG images are valid 1200×630 PNGs
    for (const rel of requiredFiles.filter((f) => f.startsWith('og/') && f.endsWith('.png'))) {
      const buf = fs.readFileSync(path.join(distDir, rel));
      assert.equal(buf.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${rel} should be a valid PNG`);
      assert.equal(buf.readUInt32BE(16), 1200, `${rel} width should be 1200`);
      assert.equal(buf.readUInt32BE(20), 630, `${rel} height should be 630`);
    }

    // Verify homepage includes JSON-LD Person schema, og:image, and twitter:card
    const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
    assert.ok(homeHtml.includes('application/ld+json'), 'index.html should contain JSON-LD');
    assert.ok(homeHtml.includes('"@type":"Person"'), 'index.html should contain Person schema');
    assert.ok(
      homeHtml.includes('property="og:image" content="https://rudyorre.com/og/default.png"'),
      'index.html should reference /og/default.png'
    );
    assert.ok(
      homeHtml.includes('name="twitter:card" content="summary_large_image"'),
      'index.html should include summary_large_image twitter card'
    );
    assert.ok(
      homeHtml.includes('working on the <strong>SecOps Detections Platform</strong>'),
      'index.html should have a space before <strong>SecOps Detections Platform</strong>'
    );

    // Verify blog post includes BlogPosting JSON-LD, article meta, reading time, edit link, and post navigation
    const postHtml = fs.readFileSync(
      path.join(distDir, 'blog/procedural-glyphs/index.html'),
      'utf8'
    );
    assert.ok(postHtml.includes('"@type":"BlogPosting"'), 'Blog post should include BlogPosting JSON-LD');
    assert.ok(
      postHtml.includes('property="og:image" content="https://rudyorre.com/og/blog/procedural-glyphs.png"'),
      'Blog post should reference its generated OG image'
    );
    assert.ok(postHtml.includes('min read'), 'Blog post should display reading time');
    assert.ok(postHtml.includes('class="post-nav"'), 'Blog post should include prev/next navigation');
    assert.ok(
      postHtml.includes(
        'https://github.com/rudyorre/rudyorre.com/edit/master/src/content/blog/procedural-glyphs.mdx'
      ),
      'Blog post should link directly to its Markdown source file on GitHub'
    );
    assert.ok(
      homeHtml.includes('href="https://github.com/rudyorre/rudyorre.com"'),
      'Footer should include a link to the site GitHub repository'
    );

    // Verify all archived snapshots include noindex and Time Machine return banner
    for (const verDir of ['v0-alpha', 'v0', 'v1', 'v2', 'v3']) {
      const snapHtml = fs.readFileSync(path.join(distDir, `${verDir}/index.html`), 'utf8');
      assert.ok(
        snapHtml.includes('name="robots" content="noindex'),
        `${verDir}/index.html should contain noindex meta tag`
      );
      assert.ok(
        snapHtml.includes('Return to current site'),
        `${verDir}/index.html should contain the Time Machine return banner`
      );
    }

    // Verify search-index.json includes /blog, post permalinks, /lab/glyphs, /versions, and archived snapshots
    const searchIndex = JSON.parse(
      fs.readFileSync(path.join(distDir, 'search-index.json'), 'utf8')
    );
    assert.ok(Array.isArray(searchIndex) && searchIndex.length > 0);
    for (const expectedUrl of [
      '/blog',
      '/blog/procedural-glyphs',
      '/blog/rebuilding-this-site',
      '/lab/glyphs',
      '/versions',
      '/v0-alpha/',
      '/v0/',
      '/v1/',
      '/v2/',
      '/v3/',
    ]) {
      assert.ok(
        searchIndex.some((d) => d.url === expectedUrl),
        `search-index.json should include ${expectedUrl}`
      );
    }

    // Verify rss.xml uses /blog/ permalinks
    const rssXml = fs.readFileSync(path.join(distDir, 'rss.xml'), 'utf8');
    assert.ok(
      rssXml.includes('/blog/procedural-glyphs/'),
      'rss.xml should include /blog/procedural-glyphs/'
    );
    assert.ok(
      rssXml.includes('/blog/rebuilding-this-site/'),
      'rss.xml should include /blog/rebuilding-this-site/'
    );
    assert.ok(
      !rssXml.includes('/writing/'),
      'rss.xml should not contain legacy /writing/ links'
    );
  });
});

