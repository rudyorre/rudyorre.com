import fs from 'node:fs';
import { execSync } from 'node:child_process';

const targetDir = process.argv[2] || 'dist';

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
  try {
    execSync('git fetch origin archive --depth=1', { stdio: 'ignore' });
    if (hasRef('refs/remotes/origin/archive') || hasRef('FETCH_HEAD')) {
      archiveRef = hasRef('refs/remotes/origin/archive')
        ? 'origin/archive'
        : 'FETCH_HEAD';
    }
  } catch {
    // Archive branch not available locally or on remote
  }
}

if (archiveRef) {
  execSync(`git archive ${archiveRef} | tar -x -C ${targetDir}`, {
    stdio: 'inherit',
  });
  console.log(`Mounted archived site versions from ${archiveRef} into ./${targetDir}`);
} else {
  console.warn('Warning: archive branch not found; skipping archived site mount.');
}
