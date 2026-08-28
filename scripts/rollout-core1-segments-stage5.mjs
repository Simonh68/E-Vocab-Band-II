import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const sharedAssets = [
  '<script src="../practice-segments.js?v=20260827-stage2"></script>',
  '<script src="../practice-session.js?v=20260827-segments-stage2"></script>',
  '<script src="../practice-panel.js?v=20260828-bidi1"></script>',
  '<script src="../stage8-rollout.js?v=20260828-core1-segments-stage5"></script>',
  '<script src="../vocab-practice.js?v=20260828-bidi1"></script>'
].join('');

const currentAssets = /(?:<script src="\.\.\/practice-segments\.js\?v=[^"]+"><\/script>)?<script src="\.\.\/practice-session\.js\?v=[^"]+"><\/script><script src="\.\.\/practice-panel\.js\?v=[^"]+"><\/script><script src="\.\.\/stage8-rollout\.js\?v=[^"]+"><\/script><script src="\.\.\/vocab-practice\.js\?v=[^"]+"><\/script>/g;

for (let group = 1; group <= 20; group += 1) {
  const name = `group-${String(group).padStart(2, '0')}.html`;
  const path = join(root, 'groups', name);
  const source = await readFile(path, 'utf8');
  const matches = source.match(currentAssets) || [];
  if (matches.length !== 1) {
    throw new Error(`Expected one Core I practice asset block in ${name}; found ${matches.length}`);
  }
  await writeFile(path, source.replace(currentAssets, sharedAssets));
}
