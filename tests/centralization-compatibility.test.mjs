import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  GROUP_PATHS,
  pageSnapshot,
  sha256
} from './helpers/band2-compatibility.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(
  await readFile(new URL('./fixtures/band2-compatibility-manifest.json', import.meta.url), 'utf8')
);

test('the compatibility manifest freezes all 80 group URLs and their word payloads', async () => {
  assert.deepEqual(manifest.pages.map(page => page.path), GROUP_PATHS);
  for (const expected of manifest.pages) {
    const actual = await pageSnapshot(root, expected.path);
    assert.deepEqual(actual, expected, expected.path);
  }
});

test('both indexes retain links to all 40 group addresses', async () => {
  for (const [file, prefix] of [['index.html', 'groups/'], ['AR/index.html', 'groups/']]) {
    const source = await readFile(path.join(root, file), 'utf8');
    for (let group = 1; group <= 40; group += 1) {
      const href = `${prefix}group-${String(group).padStart(2, '0')}.html`;
      assert.equal(source.split(`href="${href}"`).length - 1, 1, `${file}: ${href}`);
    }
  }
});

test('the Group 02 pilot assets preserve the extracted baseline blocks exactly', async () => {
  const assets = {
    spelling: 'flashcard-spelling-en.js',
    style: 'flashcard-common-en.css',
    runtime: 'flashcard-runtime-en.js'
  };
  for (const [name, file] of Object.entries(assets)) {
    const content = await readFile(path.join(root, file), 'utf8');
    const normalized = content.endsWith('\n') ? content.slice(0, -1) : content;
    assert.equal(sha256(normalized), manifest.pilotBaseline[`${name}Sha256`], file);
  }
});

test('Group 02 preserves blocking execution order and isolates the pilot to one URL', async () => {
  const pilotPath = 'groups/group-02.html';
  const source = await readFile(path.join(root, pilotPath), 'utf8');
  const orderedMarkers = [
    'flashcard-spelling-en.js?v=20260830-central-pilot1',
    'core1-progress.js?v=20260826-coverage1',
    'flashcard-common-en.css?v=20260830-central-pilot1',
    '<script>const words=',
    'flashcard-runtime-en.js?v=20260830-central-pilot1',
    'flashcard-navigation.js?v=20260830-answer-flash1',
    'window.EFN_PAGE_WORDS=words;',
    'learning-loop.js?v=20260825-stage8'
  ];
  let cursor = -1;
  for (const marker of orderedMarkers) {
    const index = source.indexOf(marker);
    assert.ok(index > cursor, `Group 02 order: ${marker}`);
    cursor = index;
  }
  assert.doesNotMatch(source, /flashcard-(?:spelling-en|runtime-en)\.js[^>]+(?:async|defer|type="module")/);

  for (const relativePath of GROUP_PATHS.filter(file => file !== pilotPath)) {
    const other = await readFile(path.join(root, relativePath), 'utf8');
    assert.doesNotMatch(other, /20260830-central-pilot1/, relativePath);
  }
});

test('the existing local-storage and session-storage contracts remain named exactly', async () => {
  const sources = Object.fromEntries(await Promise.all([
    'core1-progress.js',
    'vocab-practice.js',
    'flashcard-runtime-en.js',
    'index.html',
    'AR/index.html',
    'Read-Along/index.html',
    'Read-Along/reader.html',
    'analytics.js'
  ].map(async file => [file, await readFile(path.join(root, file), 'utf8')])));

  assert.match(sources['core1-progress.js'], /efn\.band2\.core1\.progress\.v1/);
  assert.match(sources['core1-progress.js'], /efn\.band2\.local-progress-consent\.v1/);
  assert.match(sources['vocab-practice.js'], /efn\.band2\.auto-pronounce\.v1/);
  assert.match(sources['vocab-practice.js'], /efn\.band2\.resume\.v1\.\$\{config\.progressGroup\}/);
  assert.match(sources['flashcard-runtime-en.js'], /evocab-band-ii-auto-audio/);
  assert.match(sources['index.html'], /evocab-band-ii-core/);
  assert.match(sources['AR/index.html'], /evocab-band-ii-core/);
  assert.match(sources['Read-Along/index.html'], /ra-level/);
  assert.match(sources['Read-Along/index.html'], /ra-group/);
  assert.match(sources['Read-Along/index.html'], /ra-last-story/);
  assert.match(sources['Read-Along/reader.html'], /ra-last-story/);
  assert.match(sources['analytics.js'], /efn-anonymous-browser-v1/);
  assert.match(sources['analytics.js'], /efn-traffic-role-v1/);
  assert.match(sources['analytics.js'], /efn-visit-id-v1/);
});

test('all relative asset references in the 80 group pages still resolve', async () => {
  for (const relativePath of GROUP_PATHS) {
    const file = path.join(root, relativePath);
    const source = await readFile(file, 'utf8');
    const references = [...source.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)]
      .map(match => match[1])
      .filter(value => !/^(?:https?:|data:|mailto:|tel:)/.test(value));
    for (const reference of references) {
      await assert.doesNotReject(stat(path.resolve(path.dirname(file), reference)), `${relativePath}: ${reference}`);
    }
  }
});
