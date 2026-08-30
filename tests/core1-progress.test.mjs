import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const progressApi = require('../core1-progress.js');

class MemoryStorage {
  constructor(initial = {}) { this.values = new Map(Object.entries(initial)); }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
}

const expectedSerials = [570, 935, 999];
const fixedNow = () => '2026-08-26T09:00:00.000Z';

test('a new Core I group starts without a completion checkmark', () => {
  const store = progressApi.createProgressStore(new MemoryStorage(), { now: fixedNow });
  assert.deepEqual(store.getGroupProgress({ group: 1, expectedSerials }), {
    group: 1,
    status: 'not_started',
    started: 0,
    mastered: 0,
    total: 3,
    percentage: 0,
    checked: false,
    storage: 'device',
    updatedAt: null,
    completedAt: null
  });
});

test('one successful signal shows partial progress but not mastery', () => {
  const store = progressApi.createProgressStore(new MemoryStorage(), { now: fixedNow });
  const progress = store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  assert.equal(progress.status, 'in_progress');
  assert.equal(progress.started, 1);
  assert.equal(progress.mastered, 0);
  assert.equal(progress.percentage, 17);
  assert.equal(progress.checked, false);
});

test('the practice plan sends unseen words first and chooses a new depth for partial words', () => {
  const storage = new MemoryStorage();
  const store = progressApi.createProgressStore(storage, { now: fixedNow });
  store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  store.recordCorrect({ group: 1, serial: 935, signal: 'meaning', expectedSerials });
  store.recordCorrect({ group: 1, serial: 935, signal: 'recall', expectedSerials });
  const plan = store.getGroupPracticePlan({ group: 1, expectedSerials });
  assert.equal(plan.total, 3);
  assert.equal(plan.remaining, 2);
  assert.deepEqual(plan.items.map(item => ({ serial: item.serial, signalCount: item.signalCount, mastered: item.mastered, nextMode: item.nextMode })), [
    { serial: 570, signalCount: 1, mastered: false, nextMode: 'review' },
    { serial: 935, signalCount: 2, mastered: true, nextMode: 'context' },
    { serial: 999, signalCount: 0, mastered: false, nextMode: 'primary' }
  ]);
});

test('repeating the same signal does not count as a second mastery signal', () => {
  const store = progressApi.createProgressStore(new MemoryStorage(), { now: fixedNow });
  store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  const progress = store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  assert.equal(progress.mastered, 0);
  assert.equal(progress.percentage, 17);
});

test('a word becomes mastered only after two distinct successful signals', () => {
  const store = progressApi.createProgressStore(new MemoryStorage(), { now: fixedNow });
  store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  const progress = store.recordCorrect({ group: 1, serial: 570, signal: 'recall', expectedSerials });
  assert.equal(progress.mastered, 1);
  assert.equal(progress.percentage, 33);
  assert.equal(progress.checked, false);
});

test('the group checkmark appears only after every expected word is mastered', () => {
  const storage = new MemoryStorage();
  const store = progressApi.createProgressStore(storage, { now: fixedNow });
  for (const serial of expectedSerials) {
    store.recordCorrect({ group: 1, serial, signal: 'meaning', expectedSerials });
    store.recordCorrect({ group: 1, serial, signal: 'context', expectedSerials });
  }
  const progress = store.getGroupProgress({ group: 1, expectedSerials });
  assert.equal(progress.status, 'mastered');
  assert.equal(progress.mastered, 3);
  assert.equal(progress.percentage, 100);
  assert.equal(progress.checked, true);
  assert.equal(progress.completedAt, fixedNow());
});

test('device progress survives a new store instance', () => {
  const storage = new MemoryStorage();
  progressApi.createProgressStore(storage, { now: fixedNow })
    .recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  const restored = progressApi.createProgressStore(storage, { now: fixedNow })
    .getGroupProgress({ group: 1, expectedSerials });
  assert.equal(restored.started, 1);
  assert.equal(restored.storage, 'device');
});

test('an existing version 1 payload remains readable and preserves mastered progress', () => {
  const legacy = {
    version: 1,
    groups: {
      '02': {
        fingerprint: 'core1:12.456.887',
        words: {
          '12': { signals: ['meaning'] },
          '456': {
            signals: ['meaning', 'recall'],
            masteredAt: '2026-08-27T08:00:00.000Z'
          }
        },
        updatedAt: '2026-08-27T08:00:00.000Z',
        completedAt: null
      }
    }
  };
  const serialized = JSON.stringify(legacy);
  const storage = new MemoryStorage({ [progressApi.STORAGE_KEY]: serialized });
  const store = progressApi.createProgressStore(storage, { now: fixedNow });

  assert.deepEqual(store.getGroupProgress({ group: 2, expectedSerials: [456, 12, 887] }), {
    group: 2,
    status: 'in_progress',
    started: 2,
    mastered: 1,
    total: 3,
    percentage: 50,
    checked: false,
    storage: 'device',
    updatedAt: '2026-08-27T08:00:00.000Z',
    completedAt: null
  });
  assert.equal(storage.getItem(progressApi.STORAGE_KEY), serialized);

  store.recordCorrect({ group: 2, serial: 12, signal: 'recall', expectedSerials: [456, 12, 887] });
  const updated = JSON.parse(storage.getItem(progressApi.STORAGE_KEY));
  assert.deepEqual(updated.groups['02'].words['456'], legacy.groups['02'].words['456']);
  assert.deepEqual(updated.groups['02'].words['12'].signals, ['meaning', 'recall']);
});

test('a changed group membership cannot inherit a false completion checkmark', () => {
  const storage = new MemoryStorage();
  const store = progressApi.createProgressStore(storage, { now: fixedNow });
  store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials: [570] });
  store.recordCorrect({ group: 1, serial: 570, signal: 'recall', expectedSerials: [570] });
  assert.equal(store.getGroupProgress({ group: 1, expectedSerials: [570] }).checked, true);
  const changed = store.getGroupProgress({ group: 1, expectedSerials: [570, 935] });
  assert.equal(changed.checked, false);
  assert.equal(changed.status, 'in_progress');
});

test('progress is isolated by Core I group and reset affects only its target', () => {
  const storage = new MemoryStorage();
  const store = progressApi.createProgressStore(storage, { now: fixedNow });
  store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials: [570] });
  store.recordCorrect({ group: 2, serial: 935, signal: 'meaning', expectedSerials: [935] });
  store.resetGroup(1);
  assert.equal(store.getGroupProgress({ group: 1, expectedSerials: [570] }).started, 0);
  assert.equal(store.getGroupProgress({ group: 2, expectedSerials: [935] }).started, 1);
});

test('corrupt storage is treated as empty instead of breaking the activity', () => {
  const storage = new MemoryStorage({ [progressApi.STORAGE_KEY]: '{not-json' });
  const store = progressApi.createProgressStore(storage, { now: fixedNow });
  assert.equal(store.getGroupProgress({ group: 1, expectedSerials }).status, 'not_started');
});

test('blocked device storage falls back to session-only progress', () => {
  const blocked = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); }
  };
  const store = progressApi.createProgressStore(blocked, { now: fixedNow });
  const progress = store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  assert.equal(progress.storage, 'session');
  assert.equal(store.getGroupProgress({ group: 1, expectedSerials }).started, 1);
});

test('the browser helper safely handles an inaccessible storage property', () => {
  const host = {};
  Object.defineProperty(host, 'localStorage', {
    get() { throw new Error('blocked'); }
  });
  const store = progressApi.createBrowserProgressStore(host, { now: fixedNow });
  const progress = store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  assert.equal(progress.storage, 'session');
  assert.equal(store.storageMode(), 'session');
});

test('the contract rejects Core II groups, unknown signals and foreign serials', () => {
  const store = progressApi.createProgressStore(new MemoryStorage(), { now: fixedNow });
  assert.throws(() => store.getGroupProgress({ group: 21, expectedSerials }), RangeError);
  assert.throws(() => store.recordCorrect({ group: 1, serial: 570, signal: 'audio', expectedSerials }), TypeError);
  assert.throws(() => store.recordCorrect({ group: 1, serial: 1, signal: 'meaning', expectedSerials }), RangeError);
});

test('stored progress contains no names, answers, translations or analytics identifiers', () => {
  const storage = new MemoryStorage();
  const store = progressApi.createProgressStore(storage, { now: fixedNow });
  store.recordCorrect({ group: 1, serial: 570, signal: 'meaning', expectedSerials });
  const raw = storage.getItem(progressApi.STORAGE_KEY);
  assert.doesNotMatch(raw, /name|email|answer|translation|analytics|lift|להרים/i);
});
