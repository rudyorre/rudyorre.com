import { getCollection, type CollectionEntry } from 'astro:content';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  extractDateFromFilename,
  resolvePostMetadata,
  type ResolvedPostMeta,
} from './post-meta';

export interface BlogPost extends ResolvedPostMeta {
  body: string;
  filePath: string;
  entry: CollectionEntry<'blog'>;
}

const gitDateCache = new Map<string, Date | null>();

function lookupGitFirstCommitDate(relFilePath?: string): Date | null {
  if (!relFilePath) return null;
  if (gitDateCache.has(relFilePath)) {
    return gitDateCache.get(relFilePath) ?? null;
  }

  try {
    const out = execFileSync(
      'git',
      ['log', '--follow', '--format=%cI', '--', relFilePath],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();

    if (!out) {
      gitDateCache.set(relFilePath, null);
      return null;
    }

    const lines = out.split(/\r?\n/).filter(Boolean);
    const oldestIso = lines[lines.length - 1];
    const parsed = new Date(oldestIso);
    const result = Number.isNaN(parsed.valueOf()) ? null : parsed;
    gitDateCache.set(relFilePath, result);
    return result;
  } catch {
    gitDateCache.set(relFilePath, null);
    return null;
  }
}

function lookupFileMtime(relFilePath?: string): Date | null {
  if (!relFilePath) return null;
  try {
    const stat = fs.statSync(path.resolve(relFilePath));
    return stat.mtime;
  } catch {
    return null;
  }
}

/**
 * Returns resolved, newest-first blog posts.
 * - In local `astro dev` (`import.meta.env.DEV`), drafts are included by default so
 *   in-progress posts can be previewed live at `localhost:4321`.
 * - In `astro build` (`import.meta.env.PROD`), drafts (`draft: true` or `_*.md`)
 *   are strictly excluded everywhere.
 */
export async function getBlogPosts(options?: {
  includeDrafts?: boolean;
}): Promise<BlogPost[]> {
  const includeDrafts = options?.includeDrafts ?? import.meta.env.DEV;
  const entries = await getCollection('blog');

  const resolved: BlogPost[] = entries.map((entry) => {
    const filePath = entry.filePath ?? `src/content/blog/${entry.id}.md`;
    const needsFallbackDate =
      !entry.data.date && !extractDateFromFilename(filePath);

    const meta = resolvePostMetadata({
      id: entry.id,
      data: entry.data,
      body: entry.body,
      filePath,
      gitDate: needsFallbackDate ? lookupGitFirstCommitDate(filePath) : null,
      mtimeDate: needsFallbackDate ? lookupFileMtime(filePath) : null,
    });

    return {
      ...meta,
      body: entry.body ?? '',
      filePath,
      entry,
    };
  });

  return resolved
    .filter((post) => includeDrafts || !post.draft)
    .sort(
      (a, b) =>
        b.date.valueOf() - a.date.valueOf() || a.id.localeCompare(b.id)
    );
}
