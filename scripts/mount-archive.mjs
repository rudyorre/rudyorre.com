import fs from 'node:fs';
import { execSync } from 'node:child_process';

const targetDir = process.argv[2] || 'dist';
const REPO_GIT_URL = 'https://github.com/rudyorre/rudyorre.com.git';
const REPO_TARBALL_URL =
  'https://codeload.github.com/rudyorre/rudyorre.com/tar.gz/refs/heads/archive';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function hasRef(ref) {
  try {
    execSync(`git rev-parse --verify --quiet ${ref}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

let archiveRef = null;
if (hasRef('refs/heads/archive')) {
  archiveRef = 'archive';
} else if (hasRef('refs/remotes/origin/archive')) {
  archiveRef = 'origin/archive';
} else {
  // 1. Try fetching from origin if configured
  try {
    execSync('git fetch origin archive:refs/remotes/origin/archive --depth=1', {
      stdio: 'ignore',
    });
    if (hasRef('refs/remotes/origin/archive')) {
      archiveRef = 'origin/archive';
    }
  } catch {
    // 2. Fallback: fetch directly from the public GitHub repository URL (e.g., on Vercel where `origin` may not be set)
    try {
      execSync(
        `git fetch ${REPO_GIT_URL} archive:refs/remotes/origin/archive --depth=1`,
        { stdio: 'ignore' }
      );
      if (hasRef('refs/remotes/origin/archive')) {
        archiveRef = 'origin/archive';
      } else if (hasRef('FETCH_HEAD')) {
        archiveRef = 'FETCH_HEAD';
      }
    } catch {
      // git not available or no .git directory
    }
  }
}

if (archiveRef) {
  execSync(`git archive ${archiveRef} | tar -x -C ${targetDir}`, {
    stdio: 'inherit',
  });
  console.log(
    `Mounted archived site versions from ${archiveRef} into ./${targetDir}`
  );
} else {
  // 3. Final fallback for environments without .git (e.g., Vercel tarball builds): stream GitHub's archive tarball directly
  try {
    execSync(
      `curl -fsSL "${REPO_TARBALL_URL}" | tar -xz --strip-components=1 -C "${targetDir}"`,
      { stdio: 'inherit' }
    );
    console.log(
      `Mounted archived site versions from GitHub tarball into ./${targetDir}`
    );
  } catch (err) {
    console.warn(
      'Warning: archive branch could not be fetched; skipping archived site mount.',
      err?.message || ''
    );
  }
}
