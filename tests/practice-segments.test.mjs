import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { extractWords } from './helpers/band2-compatibility.mjs';

const require = createRequire(import.meta.url);
require('../learning-loop.js');
const segmentsApi = require('../practice-segments.js');
const sessionApi = require('../practice-session.js');

function practiceRecords(total) {
  return Array.from({ length: total }, (_, index) => ({
    id: `word-${index + 1}`,
    serial: index + 1,
    en: `word${index + 1}`,
    mean_he: `פירוש ${index + 1}`
  }));
}

function questionFactory(record, context) {
  const answer = record.mean_he;
  const choices = [answer, ...context.records
    .filter(candidate => candidate.serial !== record.serial)
    .slice(0, 3)
    .map(candidate => candidate.mean_he)];
  return { prompt: record.en, choices, answer, meta: { record, context } };
}

async function groupWords(root, group) {
  const id = String(group).padStart(2, '0');
  const html = await readFile(new URL(`group-${id}.html`, root), 'utf8');
  return extractWords(html, `Group ${id}`);
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

test('Stage 5 loads the segment engine across Hebrew Core I and nowhere else', async () => {
  const HebrewRoot = new URL('../groups/', import.meta.url);
  const ArabicRoot = new URL('../AR/groups/', import.meta.url);
  const HebrewNames = (await readdir(HebrewRoot)).filter(name => /^group-\d{2}\.html$/.test(name));
  const ArabicNames = (await readdir(ArabicRoot)).filter(name => /^group-\d{2}\.html$/.test(name));
  assert.equal(HebrewNames.length, 40);
  assert.equal(ArabicNames.length, 40);

  for (const name of HebrewNames) {
    const html = await readFile(new URL(name, HebrewRoot), 'utf8');
    const group = Number(name.slice(6, 8));
    const coreI = group >= 1 && group <= 20;
    assert.equal(/practice-segments\.js\?v=20260827-stage2/.test(html), coreI, name);
    if (coreI) {
      assert.ok(
        html.indexOf('practice-segments.js') < html.indexOf('practice-session.js'),
        `${name} must load the segment engine before the session engine`
      );
    }
  }

  for (const name of ArabicNames) {
    const html = await readFile(new URL(name, ArabicRoot), 'utf8');
    assert.doesNotMatch(html, /practice-segments\.js/, name);
  }
});

test('the wired session keeps the perfect 54/55 routes inside their six segment plans', () => {
  for (const total of [54, 55]) {
    const records = practiceRecords(total);
    const session = sessionApi.createSession(records, {
      coverageFirst: true,
      segmented: true,
      segmentTotalItems: total,
      choiceRecords: records,
      questionFactory
    });
    const seen = [];
    let question;
    while ((question = session.next())) {
      seen.push(question.meta.record.serial);
      session.answer(question.answer);
    }

    const expectedTargets = total === 54 ? [9, 9, 9, 9, 9, 9] : [9, 9, 9, 9, 9, 10];
    const history = session.debugSegments().history;
    assert.deepEqual(seen, records.map(record => record.serial));
    assert.deepEqual(history.map(segment => segment.target), expectedTargets);
    assert.deepEqual(history.map(segment => segment.answered), expectedTargets);
    assert.deepEqual(history.map(segment => segment.coverage.current),
      total === 54 ? [9, 18, 27, 36, 45, 54] : [9, 18, 27, 36, 45, 55]);
    assert.ok(history.every(segment => segment.target <= segmentsApi.MAX_QUESTIONS_PER_SEGMENT));
    assert.ok(history.every(segment => segment.mastery.current === 0));
  }
});

test('a tail error crosses the checkpoint and still returns after exactly two other questions', () => {
  const records = practiceRecords(55);
  const session = sessionApi.createSession(records, {
    coverageFirst: true,
    segmented: true,
    segmentTotalItems: 55,
    choiceRecords: records,
    questionFactory
  });
  const seen = [];
  let question;
  let answerIndex = 0;
  while ((question = session.next())) {
    seen.push(question.meta.record.serial);
    const wrong = answerIndex === 7;
    session.answer(wrong ? '__wrong__' : question.answer);
    answerIndex += 1;
    assert.ok(answerIndex < 100, 'segmented queue did not terminate');
  }

  const firstAttempt = seen.indexOf(8);
  const retry = seen.indexOf(8, firstAttempt + 1);
  assert.equal(retry - firstAttempt, segmentsApi.RETRY_GAP + 1);
  assert.deepEqual(seen.slice(firstAttempt + 1, retry), [9, 10]);
  const history = session.debugSegments().history;
  assert.equal(history[0].carriedRetries, 1);
  assert.ok(history.every(segment => segment.target <= segmentsApi.MAX_QUESTIONS_PER_SEGMENT));
});

test('a one-item resumed mission uses two non-persisted depth gaps before its carried retry', () => {
  const group = practiceRecords(55);
  const session = sessionApi.createSession(group.slice(0, 1), {
    coverageFirst: true,
    segmented: true,
    segmentTotalItems: 55,
    choiceRecords: group,
    initialCoveredItems: 55,
    initialMasteredItems: 54,
    initialSignalCountFor: () => 1,
    initialModeFor: () => 'review',
    questionFactory
  });
  const seen = [];
  const entries = [];
  let question;
  let answerIndex = 0;
  while ((question = session.next())) {
    seen.push(question.meta.record.serial);
    const result = session.answer(answerIndex === 0 ? '__wrong__' : question.answer);
    entries.push(result.entry);
    answerIndex += 1;
    assert.ok(answerIndex < 20, 'single-item carry did not terminate');
  }

  assert.equal(seen.at(0), 1);
  assert.equal(seen.at(-1), 1);
  assert.equal(seen.length, 4);
  assert.ok(entries.slice(1, 3).every(entry => entry.phase === 'depth-gap' && entry.filler));
  assert.deepEqual(session.debugSegments().history.map(segment => segment.target), [1, 3]);
  assert.equal(session.debugSegments().history.at(-1).mastery.current, 55);
  assert.deepEqual(session.summary(), {
    firstTry: 0,
    corrected: 1,
    unresolved: 0,
    total: 1,
    answered: 4
  });
});
