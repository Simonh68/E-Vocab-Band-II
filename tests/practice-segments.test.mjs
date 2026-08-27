import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const require = createRequire(import.meta.url);
const segmentsApi = require('../practice-segments.js');

async function groupWords(root, group) {
  const id = String(group).padStart(2, '0');
  const html = await readFile(new URL(`group-${id}.html`, root), 'utf8');
  const match = html.match(/const words=(\[.*?\]);let currentIndex=/s);
  assert.ok(match, `Group ${id} vocabulary payload was not found`);
  return JSON.parse(match[1]);
}

test('a perfect 54-item group is six nine-question segments', () => {
  const plan = segmentsApi.buildSegmentPlan(54);
  assert.equal(plan.segmentCount, 6);
  assert.equal(plan.perfectQuestionScreens, 54);
  assert.deepEqual(plan.segments.map(segment => segment.plannedQuestions), [9, 9, 9, 9, 9, 9]);
  assert.deepEqual(plan.celebrationCheckpoints, [9, 18, 27, 36, 45, 54]);
  assert.deepEqual(plan.chestCheckpoints, [18, 36, 54]);
});

test('a perfect 55-item group is five nine-question segments and one ten-question segment', () => {
  const plan = segmentsApi.buildSegmentPlan(55);
  assert.equal(plan.segmentCount, 6);
  assert.equal(plan.perfectQuestionScreens, 55);
  assert.deepEqual(plan.segments.map(segment => segment.plannedQuestions), [9, 9, 9, 9, 9, 10]);
  assert.deepEqual(plan.celebrationCheckpoints, [9, 18, 27, 36, 45, 55]);
  assert.deepEqual(plan.chestCheckpoints, [18, 36, 55]);
  assert.equal(plan.segments.at(-1).completionBoundary, 'group');
});

test('a retry stays in the segment only when two intervening questions and the screen cap both fit', () => {
  assert.deepEqual(segmentsApi.retryPlacement({ answeredScreens: 7, remainingQueueEntries: 20 }), {
    disposition: 'schedule',
    insertAt: 2,
    interveningQuestions: 2,
    maxQuestionScreens: 10
  });
  assert.equal(
    segmentsApi.retryPlacement({ answeredScreens: 8, remainingQueueEntries: 20 }).disposition,
    'carry'
  );
  assert.equal(
    segmentsApi.retryPlacement({ answeredScreens: 3, remainingQueueEntries: 1 }).disposition,
    'carry'
  );
});

test('segment, group coverage and group mastery counters remain separate', () => {
  const counters = segmentsApi.progressCounters({
    totalItems: 55,
    segmentNumber: 4,
    answeredInSegment: 7,
    segmentQuestionTarget: 10,
    coveredItems: 34,
    masteredItems: 12
  });
  assert.deepEqual(counters, {
    segment: { number: 4, total: 6, answered: 7, target: 10, maxQuestionScreens: 10 },
    coverage: { current: 34, total: 55 },
    mastery: { current: 12, total: 55, requiredEvidence: 2 }
  });
});

test('coverage completion is not reported as full group mastery', () => {
  assert.deepEqual(segmentsApi.completionState({ totalItems: 55, coveredItems: 55, masteredItems: 0 }), {
    coverageComplete: true,
    groupMastered: false,
    state: 'coverage_complete'
  });
  assert.deepEqual(segmentsApi.completionState({ totalItems: 55, coveredItems: 55, masteredItems: 55 }), {
    coverageComplete: true,
    groupMastered: true,
    state: 'mastered'
  });
  assert.throws(
    () => segmentsApi.completionState({ totalItems: 55, coveredItems: 20, masteredItems: 21 }),
    /mastery cannot exceed coverage/
  );
});

test('the segmented contract rejects incomplete 53-item manifests', () => {
  assert.throws(() => segmentsApi.buildSegmentPlan(53), /54 or 55 items/);
});

test('all forty Hebrew group manifests satisfy the 54/55-item segment contract', async () => {
  const root = new URL('../groups/', import.meta.url);
  for (let group = 1; group <= 40; group += 1) {
    const words = await groupWords(root, group);
    assert.doesNotThrow(() => segmentsApi.buildSegmentPlan(words.length), `Hebrew Group ${group}`);
  }
});

test('the Arabic rollout guard exposes only the two known incomplete manifests', async () => {
  const root = new URL('../AR/groups/', import.meta.url);
  const blockers = [];
  for (let group = 1; group <= 40; group += 1) {
    const words = await groupWords(root, group);
    try {
      segmentsApi.buildSegmentPlan(words.length);
    } catch {
      blockers.push({ group, items: words.length });
    }
  }
  assert.deepEqual(blockers, [
    { group: 32, items: 53 },
    { group: 36, items: 53 }
  ]);
});

test('Stage 1 is dormant and does not alter any vocabulary page', async () => {
  const roots = [new URL('../groups/', import.meta.url), new URL('../AR/groups/', import.meta.url)];
  for (const root of roots) {
    const names = (await readdir(root)).filter(name => /^group-\d{2}\.html$/.test(name));
    assert.equal(names.length, 40);
    for (const name of names) {
      const html = await readFile(new URL(name, root), 'utf8');
      assert.doesNotMatch(html, /practice-segments\.js/);
    }
  }
});
