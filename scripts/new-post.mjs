#!/usr/bin/env node
/**
 * Zero-dependency helper to scaffold a new Markdown blog post in `src/content/blog/`.
 * Usage:
 *   npm run new "Writing without a chatbot"
 *   npm run new -- --publish "Quick note"
 */

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const publishFlag = args.includes('--publish');
const titleParts = args.filter((arg) => !arg.startsWith('--'));
const rawTitle = titleParts.join(' ').trim();

if (!rawTitle) {
  console.error('Usage: npm run new "Post title" [-- --publish]');
  process.exit(1);
}

const slug = rawTitle
  .toLowerCase()
  .replace(/['’]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!slug) {
  console.error(`Could not derive a valid slug from "${rawTitle}".`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const blogDir = path.resolve('src/content/blog');
fs.mkdirSync(blogDir, { recursive: true });

const targetPath = path.join(blogDir, `${slug}.md`);
if (fs.existsSync(targetPath)) {
  console.error(`Already exists: src/content/blog/${slug}.md`);
  process.exit(1);
}

const escapedTitle = rawTitle.replace(/"/g, '\\"');
const draftLine = publishFlag ? '' : 'draft: true\n';
const template = `---
title: "${escapedTitle}"
date: ${today}
${draftLine}---

`;

fs.writeFileSync(targetPath, template, 'utf8');
console.log(`Created src/content/blog/${slug}.md`);
console.log(`Preview locally: npm run dev -> http://localhost:4321/blog/${slug}`);
