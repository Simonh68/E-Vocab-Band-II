import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const progress = require('../core1-progress.js');

function memoryStorage(seed = {}) {
  const values = new Map(Object.entries(seed));
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
    values
  };
}

test('device progress consent is absent by default and saved only after acceptance', () => {
  const storage = memoryStorage();
  const root = { localStorage: storage };
  assert.equal(progress.hasLocalProgressConsent(root), false);
  assert.equal(storage.values.size, 0);
  assert.equal(progress.acceptLocalProgressConsent(root), true);
  assert.equal(storage.getItem(progress.CONSENT_KEY), progress.CONSENT_ACCEPTED);
  assert.equal(progress.hasLocalProgressConsent(root), true);
});

test('progress stays session-only before consent and becomes device-backed after consent', () => {
  const storage = memoryStorage();
  const root = { localStorage: storage };
  const before = progress.createBrowserProgressStore(root, { now: () => '2026-08-27T20:52:00.000Z' });
  assert.equal(before.storageMode(), 'session');
  before.recordCorrect({ group: 1, serial: 1, signal: 'meaning', expectedSerials: [1, 2] });
  assert.equal(storage.getItem(progress.STORAGE_KEY), null);
  progress.acceptLocalProgressConsent(root);
  const after = progress.createBrowserProgressStore(root, { now: () => '2026-08-27T20:53:00.000Z' });
  assert.equal(after.storageMode(), 'device');
  after.recordCorrect({ group: 1, serial: 1, signal: 'meaning', expectedSerials: [1, 2] });
  assert.ok(storage.getItem(progress.STORAGE_KEY));
});

test('blocked storage never creates false consent or false persistence', () => {
  const root = { localStorage: { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } } };
  assert.equal(progress.hasLocalProgressConsent(root), false);
  assert.equal(progress.acceptLocalProgressConsent(root), false);
  assert.equal(progress.createBrowserProgressStore(root).storageMode(), 'session');
});

test('consent dialog copy is explicit, accessible and privacy-minimal', () => {
  const source = fs.readFileSync(new URL('../core1-progress.js', import.meta.url), 'utf8');
  assert.match(source, /לשמור את ההתקדמות במכשיר/);
  assert.match(source, /רק במכשיר הזה/);
  assert.match(source, /איננו שומרים שם, אימייל, תשובות שהוקלדו או הקלטות/);
  assert.match(source, /איננו שולחים את ההתקדמות למורה או לשרת/);
  assert.match(source, /role="dialog"/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /prefers-reduced-motion|forced-colors/);
});
