import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const guide = readFileSync(new URL('../teacher-guide.html', import.meta.url), 'utf8');
const home = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const arabicHome = readFileSync(new URL('../AR/index.html', import.meta.url), 'utf8');

test('Band II activity menus link to the real teacher guide', () => {
  assert.match(home, /<a class="btn" href="teacher-guide\.html">Open guide →<\/a>/);
  assert.match(arabicHome, /<a class="btn" href="\.\.\/teacher-guide\.html">Open guide →<\/a>/);
  assert.match(home, /Curriculum, teaching method, privacy and direct-link previews/);
  assert.match(arabicHome, /Curriculum, teaching method, privacy and direct-link previews/);
});

test('teacher guide has a complete, accessible table of contents', () => {
  assert.match(guide, /<nav class="toc" aria-labelledby="toc-title">/);
  for (const id of [
    'curriculum-structure',
    'official-sources',
    'record-meanings',
    'group-method',
    'learner-support',
    'sharing-previews',
    'privacy-progress',
    'classroom-use',
    'available-now',
    'future-resources',
    'about-editor'
  ]) {
    assert.match(guide, new RegExp(`href="#${id}"`));
    assert.match(guide, new RegExp(`id="${id}"`));
  }
});

test('teacher guide documents privacy and local-progress boundaries', () => {
  assert.match(guide, /Students do not need an account/);
  assert.match(guide, /does not collect names, email addresses, IP addresses, typed answers, voice recordings, student profiles or browser fingerprints/);
  assert.match(guide, /explicitly choose to save mastery progress in local storage on the current device/);
  assert.match(guide, /progress is not sent automatically to a teacher or to the server/);
  assert.match(guide, /random anonymous browser identifier that rotates after 30 days/);
  assert.match(guide, /href="privacy\.html"/);
});

test('teacher guide explains all unique group-link previews', () => {
  assert.match(guide, /There are 80 preview-enabled links: 40 Hebrew-support group links and 40 matching Arabic-support group links/);
  assert.match(guide, /Each 1200 × 630 preview identifies the core, group number, support language, number of records and representative examples/);
  assert.match(guide, /links to different groups do not collapse into one generic Band II card/);
});

test('teacher guide separates current resources from non-committed future ideas', () => {
  assert.match(guide, /<h2>9\. Resources available now<\/h2>/);
  assert.match(guide, /<h2>10\. Possible future complementary resources<\/h2>/);
  assert.match(guide, /not currently available/);
  assert.match(guide, /not promises/);
  assert.match(guide, /Automatic teacher monitoring, automatic result delivery and silent cross-device tracking are not current features/);
});

test('teacher guide has complete sharing metadata and healthy return links', () => {
  assert.match(guide, /<link rel="canonical" href="https:\/\/simonh68\.github\.io\/E-Vocab-Band-II\/teacher-guide\.html">/);
  assert.match(guide, /<meta property="og:image:width" content="1200">/);
  assert.match(guide, /<meta property="og:image:height" content="630">/);
  assert.match(guide, /<meta name="twitter:card" content="summary_large_image">/);
  assert.match(guide, /href="index\.html">← Back to the activities<\/a>/);
  assert.match(guide, /href="AR\/">Arabic-support activities<\/a>/);
  assert.doesNotMatch(guide, /href="#"/);
});
