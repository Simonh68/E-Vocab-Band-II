import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const version = '20260826-stage4';

function groupName(group) {
  return `group-${String(group).padStart(2, '0')}.html`;
}

function extractSerials(source, name) {
  const match = source.match(/const words=(\[.*?\]);let currentIndex=/s);
  if (!match) throw new Error(`Vocabulary payload not found in ${name}`);
  const serials = JSON.parse(match[1]).map(word => Number(word.serial));
  if (serials.length === 0 || serials.some(serial => !Number.isInteger(serial))) {
    throw new Error(`Invalid serial manifest in ${name}`);
  }
  if (new Set(serials).size !== serials.length) {
    throw new Error(`Duplicate serial found in ${name}`);
  }
  return serials;
}

function groupAssets() {
  return [
    `<script src="../core1-progress.js?v=${version}"></script>`,
    `<script src="../core1-progress-groups.js?v=${version}"></script>`,
    `<script src="../core1-progress-ui.js?v=${version}"></script>`,
    `<link rel="stylesheet" href="../core1-progress-ui.css?v=${version}">`
  ].join('');
}

function updateGroupHead(source, name) {
  const titleAndAssets = /(<title>[^<]+<\/title>)(?:<script src="\.\.\/core1-progress(?:-groups|-ui)?\.js\?v=[^"]+"><\/script>)*(?:<link rel="stylesheet" href="\.\.\/core1-progress-ui\.css\?v=[^"]+">)?<style>/;
  if (!titleAndAssets.test(source)) throw new Error(`Head insertion point not found in ${name}`);
  return source
    .replace(titleAndAssets, `$1${groupAssets()}<style>`)
    .replace(/stage8-rollout\.js\?v=[^"]+/, `stage8-rollout.js?v=${version}`)
    .replace(/vocab-practice\.js\?v=[^"]+/, `vocab-practice.js?v=${version}`);
}

function formatGroups(groups) {
  const lines = [];
  for (const [group, serials] of Object.entries(groups)) {
    lines.push(`    ${group}: Object.freeze([`);
    for (let index = 0; index < serials.length; index += 11) {
      const chunk = serials.slice(index, index + 11).join(', ');
      lines.push(`      ${chunk}${index + 11 < serials.length ? ',' : ''}`);
    }
    lines.push(`    ])${Number(group) < 20 ? ',' : ''}`);
  }
  return lines.join('\n');
}

function manifestSource(groups) {
  return `((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.EFN_CORE1_PROGRESS_GROUPS = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  const groups = Object.freeze({
${formatGroups(groups)}
  });

  function expectedSerials(group) {
    const serials = groups[Number(group)];
    return serials ? [...serials] : null;
  }

  return Object.freeze({
    version: '${version}',
    groups,
    expectedSerials
  });
});
`;
}

async function updateHome() {
  const path = join(root, 'index.html');
  let source = await readFile(path, 'utf8');
  const marker = /(<meta name="twitter:image:alt"[^>]+>)(?:<script src="core1-progress(?:-groups|-ui)?\.js\?v=[^"]+"><\/script>)*(?:<link rel="stylesheet" href="core1-progress-ui\.css\?v=[^"]+">)?<style>/;
  if (!marker.test(source)) throw new Error('Home head insertion point not found');
  const assets = [
    `<script src="core1-progress.js?v=${version}"></script>`,
    `<script src="core1-progress-groups.js?v=${version}"></script>`,
    `<script src="core1-progress-ui.js?v=${version}"></script>`,
    `<link rel="stylesheet" href="core1-progress-ui.css?v=${version}">`
  ].join('');
  source = source.replace(marker, `$1${assets}<style>`);
  await writeFile(path, source);
}

const groups = {};
for (let group = 1; group <= 20; group += 1) {
  const name = groupName(group);
  const path = join(root, 'groups', name);
  const source = await readFile(path, 'utf8');
  groups[group] = extractSerials(source, name);
  await writeFile(path, updateGroupHead(source, name));
}

await writeFile(join(root, 'core1-progress-groups.js'), manifestSource(groups));
await updateHome();
