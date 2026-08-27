import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
require('../learning-loop.js');
const sessionApi = require('../practice-session.js');
const panelApi = require('../practice-panel.js');
const vocabApi = require('../vocab-practice.js');
const progressApi = require('../core1-progress.js');

const records = Array.from({ length: 8 }, (_, index) => ({
  id: `word-${index}`,
  serial: index + 1,
  en: `word${index}`,
  mean_he: `פירוש ${index}`,
  ex_en: `This is word${index}.`,
  ex_he: `זהו פירוש ${index}.`
}));

class MemoryStorage {
  constructor() { this.values = new Map(); }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
}

function basicQuestionFactory(record, context) {
  const reverse = context.mode === 'review';
  const answer = reverse ? record.en : record.mean_he;
  const pool = context.records.map(item => reverse ? item.en : item.mean_he);
  return {
    prompt: record.en,
    choices: pool.slice(0, 4).includes(answer) ? pool.slice(0, 4) : [answer, ...pool.slice(0, 3)],
    answer,
    meta: { record, context }
  };
}

class FakeElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.listeners = {};
    this.dataset = {};
    this.attributes = {};
    this.className = '';
    this.hidden = false;
    this.textContent = '';
    this.style = {};
    this.classList = {
      values: new Set(),
      add: (...names) => names.forEach(name => this.classList.values.add(name)),
      remove: (...names) => names.forEach(name => this.classList.values.delete(name))
    };
  }

  append(...children) { this.children.push(...children); }
  appendChild(child) { this.children.push(child); return child; }
  replaceChildren(...children) { this.children = [...children]; this.textContent = ''; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(type, listener) { this.listeners[type] = listener; }
  insertAdjacentElement(_position, node) { this.insertedAfter = node; return node; }
  focus() { this.focused = true; }
  scrollIntoView(options) { this.scrollOptions = options; }
  cloneNode() {
    const clone = new FakeElement(this.tagName);
    clone.className = this.className;
    clone.textContent = this.textContent;
    return clone;
  }

  descendants() { return this.children.flatMap(child => [child, ...child.descendants()]); }
  querySelectorAll(selector) {
    if (selector === 'button') return this.descendants().filter(node => node.tagName === 'BUTTON');
    return [];
  }
  querySelector(selector) {
    if (selector === '[data-first-choice="true"]') {
      return this.descendants().find(node => node.dataset.firstChoice === 'true') || null;
    }
    return null;
  }
}

function byClass(root, name) {
  return [root, ...root.descendants()].find(node => node.className.split(/\s+/).includes(name));
}

test('the accessible panel mounts and completes a question without a browser dependency', () => {
  const head = new FakeElement('head');
  const document = {
    head,
    createElement: tag => new FakeElement(tag),
    querySelector: () => null
  };
  const anchor = new FakeElement('div');
  const measurements = [];
  const question = {
    prompt: 'מה פירוש המילה proof?',
    promptParts: [
      { text: 'מה פירוש המילה ', lang: 'he', dir: 'rtl' },
      { text: 'proof', lang: 'en', dir: 'ltr' },
      { text: '?', lang: 'he', dir: 'rtl' }
    ],
    choices: ['הוכחה', 'טעות'],
    answer: 'הוכחה',
    choiceLang: 'he',
    meta: { record: records[0] }
  };
  let answered = false;
  const controller = panelApi.mount({
    document,
    anchor,
    stylesheetHref: 'practice-shell.css',
    exitLabel: 'חזרה לסיפור',
    analyticsActivity: 'read-along-ra-001',
    analytics: { send: (event, context) => measurements.push({ event, context }) },
    createSession: () => ({
      next: () => answered ? null : question,
      answer: selectedAnswer => {
        answered = true;
        return { correct: selectedAnswer === question.answer, question, entry: { filler: false }, state: {}, willReturn: false, mastered: false };
      },
      progress: () => ({ mastered: 0, total: 1 }),
      summary: () => ({ firstTry: 0, corrected: 0, unresolved: 1 })
    }),
    formatFeedback: () => ({
      title: 'כמעט — הנה ההסבר.',
      text: 'proof פירושו הוכחה.',
      parts: [
        { text: 'proof', lang: 'en', dir: 'ltr' },
        { text: ' פירושו הוכחה.', lang: 'he', dir: 'rtl' }
      ]
    })
  });

  assert.equal(controller.section.lang, 'he');
  assert.equal(controller.section.dir, 'rtl');
  assert.equal(controller.section.dataset.analyticsIgnore, 'true');
  assert.equal(byClass(controller.section, 'efn-practice__quiet').textContent, 'חזרה לסיפור');
  assert.equal(byClass(controller.section, 'efn-practice__speak').textContent, '🔊 שמיעה');
  assert.equal(byClass(controller.section, 'efn-practice__speak').attributes['aria-label'], 'השמעת המילה באנגלית');
  byClass(controller.section, 'efn-practice__primary').listeners.click();
  assert.deepEqual(measurements[0], {
    event: 'button_click',
    context: {
      activity: 'read-along-ra-001',
      target: 'practice-start',
      label: 'practice-start'
    }
  });
  const choices = byClass(controller.section, 'efn-practice__choices').querySelectorAll('button');
  assert.equal(choices[0].focused, true);
  choices[1].listeners.click();
  const feedback = byClass(controller.section, 'efn-practice__feedback');
  assert.equal(feedback.attributes['aria-live'], 'polite');
  assert.equal(feedback.focused, true);
  const feedbackText = byClass(controller.section, 'efn-practice__feedback-text');
  assert.deepEqual(feedbackText.children.map(node => node.lang), ['en', 'he']);
  byClass(controller.section, 'efn-practice__next').listeners.click();
  assert.equal(byClass(controller.section, 'efn-practice__summary').hidden, false);
  assert.deepEqual(measurements[1], {
    event: 'activity_complete',
    context: {
      activity: 'read-along-ra-001',
      outcome: 'read-along-ra-001'
    }
  });
});

test('a correct Band II answer shows a build transition and advances after 1500 ms', () => {
  const head = new FakeElement('head');
  const document = {
    head,
    createElement: tag => new FakeElement(tag),
    querySelector: () => null
  };
  const anchor = new FakeElement('div');
  const questions = [
    { prompt: 'word0', choices: ['פירוש 0', 'פירוש 1'], answer: 'פירוש 0', meta: { record: records[0] } },
    { prompt: 'word1', choices: ['פירוש 1', 'פירוש 0'], answer: 'פירוש 1', meta: { record: records[1] } }
  ];
  let nextIndex = 0;
  let correctSignals = 0;
  let scheduled = null;
  let cancelled = null;
  const controller = panelApi.mount({
    document,
    anchor,
    stylesheetHref: 'practice-shell.css',
    autoAdvanceCorrectMs: 1500,
    correctNextLabel: 'הבא עכשיו',
    showProgressPercent: true,
    setTimeout(callback, delay) {
      scheduled = { callback, delay };
      return 17;
    },
    clearTimeout(id) { cancelled = id; },
    createSession: () => ({
      next: () => questions[nextIndex++] || null,
      answer: selectedAnswer => {
        const correct = selectedAnswer === questions[nextIndex - 1].answer;
        if (correct) correctSignals += 1;
        return {
          correct,
          question: questions[nextIndex - 1],
          entry: { filler: false },
          state: { initialCorrect: true },
          willReturn: true,
          mastered: false
        };
      },
      progress: () => ({ mastered: 0, total: 2, progressPercent: correctSignals * 25 }),
      summary: () => ({ firstTry: 0, corrected: 0, unresolved: 2 })
    }),
    formatFeedback: vocabApi.formatFeedback
  });

  byClass(controller.section, 'efn-practice__primary').listeners.click();
  const choices = byClass(controller.section, 'efn-practice__choices').querySelectorAll('button');
  choices[0].listeners.click();
  assert.equal(byClass(controller.section, 'efn-practice__feedback-title').textContent, 'מעולה! ✓');
  assert.equal(byClass(controller.section, 'efn-practice__next').textContent, 'הבא עכשיו');
  assert.equal(byClass(controller.section, 'efn-practice__progress').attributes['aria-valuenow'], '25');
  assert.equal(byClass(controller.section, 'efn-practice__progress-fill').style.width, '25%');
  const transition = byClass(controller.section, 'efn-practice__transition');
  assert.equal(transition.hidden, false);
  assert.equal(transition.style['--advance-duration'], '1500ms');
  assert.equal(scheduled.delay, 1500);
  scheduled.callback();
  assert.equal(nextIndex, 2);
  assert.equal(cancelled, null);
  assert.equal(byClass(controller.section, 'efn-practice__feedback').hidden, true);
  assert.equal(transition.hidden, true);
  assert.equal(byClass(controller.section, 'efn-practice__choices').querySelectorAll('button')[0].focused, true);
});

test('the correct answer never repeats the same display position twice in a row', () => {
  const first = panelApi.avoidRepeatedAnswerPosition(['נכון', 'א', 'ב', 'ג'], 'נכון', -1, () => 0);
  const second = panelApi.avoidRepeatedAnswerPosition(['נכון', 'א', 'ב', 'ג'], 'נכון', first.answerIndex, () => 0);
  const third = panelApi.avoidRepeatedAnswerPosition(['א', 'נכון', 'ב', 'ג'], 'נכון', second.answerIndex, () => .99);
  assert.equal(first.answerIndex, 0);
  assert.notEqual(second.answerIndex, first.answerIndex);
  assert.notEqual(third.answerIndex, second.answerIndex);
  assert.equal(second.choices[second.answerIndex], 'נכון');
  assert.equal(third.choices[third.answerIndex], 'נכון');
});

test('Block Quest audio starts only after play and can be muted without affecting gameplay', () => {
  const events = [];
  const audioParam = {
    value: 0,
    setValueAtTime() {},
    exponentialRampToValueAtTime() {},
    cancelScheduledValues() {},
    setTargetAtTime() {}
  };
  class FakeAudioContext {
    constructor() { this.currentTime = 0; this.destination = {}; this.state = 'running'; }
    createGain() { return { gain: { ...audioParam }, connect() {} }; }
    createOscillator() {
      return {
        frequency: { ...audioParam },
        connect() {},
        start() { events.push('tone'); },
        stop() {}
      };
    }
  }
  const host = {
    AudioContext: FakeAudioContext,
    setInterval(callback, delay) { events.push(`loop:${delay}`); return { callback }; },
    clearInterval() { events.push('loop:off'); }
  };
  const audio = panelApi.createQuestAudio(host);
  assert.equal(audio.supported, true);
  assert.deepEqual(events, []);
  audio.start();
  assert.ok(events.includes('loop:3200'));
  assert.ok(events.includes('tone'));
  audio.setMuted(true);
  assert.equal(audio.isMuted(), true);
  assert.ok(events.includes('loop:off'));
  audio.setMuted(false);
  assert.equal(audio.isMuted(), false);
});

test('Block Quest rewards grow exponentially and open three milestone chests', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 8].map(panelApi.multiplierForStreak), [1, 1, 2, 4, 8, 8]);
  assert.deepEqual([1, 2, 3, 4].map(streak => panelApi.rewardForStreak(streak)), [10, 20, 40, 80]);
  assert.deepEqual([0, 24, 25, 49, 50, 99, 100].map(percent => panelApi.chestCountForPercent(percent)), [0, 0, 1, 1, 2, 2, 3]);
  assert.match(panelApi.questFeedback({ streak: 4, multiplier: 8, reward: 80, chestOpened: true }), /×8/);
  assert.match(panelApi.questFeedback({ streak: 4, multiplier: 8, reward: 80, chestOpened: true }), /אוצר/);
  assert.doesNotMatch(panelApi.questFeedback({ streak: 1, multiplier: 1, reward: 10, chestOpened: false }), /מטבעות/);
});

test('the Core I panel enters a full-screen Block Quest and keeps rewards session-only', () => {
  const head = new FakeElement('head');
  const body = new FakeElement('body');
  const document = {
    head,
    body,
    createElement: tag => new FakeElement(tag),
    querySelector: () => null
  };
  const anchor = new FakeElement('div');
  const question = { prompt: 'word0', choices: ['פירוש 0', 'פירוש 1'], answer: 'פירוש 0', meta: { record: records[0] } };
  let answered = false;
  const controller = panelApi.mount({
    document,
    anchor,
    stylesheetHref: 'practice-shell.css?v=20260826-stage5',
    treasureAssetHref: 'assets/game/treasure-chest-coins-3d.png',
    blockQuest: true,
    immersive: true,
    exponentialFeedback: true,
    showProgressPercent: true,
    showProgressCount: true,
    treasureChests: [25, 50, 100],
    previousGroupHref: 'group-01.html',
    previousGroupLabel: 'לקבוצה הקודמת: 01',
    nextGroupHref: 'group-03.html',
    nextGroupLabel: 'לקבוצה הבאה: 03',
    createSession: () => ({
      next: () => answered ? null : question,
      answer: selectedAnswer => {
        answered = true;
        return { correct: selectedAnswer === question.answer, question, entry: { filler: false }, state: {}, willReturn: false, mastered: false };
      },
      progress: () => ({ mastered: 0, total: 1, progressPercent: 25 }),
      summary: () => ({ firstTry: 1, corrected: 0, unresolved: 0 })
    }),
    formatFeedback: vocabApi.formatFeedback
  });

  const iconActions = controller.section.descendants()
    .filter(node => node.className.split(/\s+/).includes('efn-practice__icon-action'));
  assert.deepEqual(iconActions.map(node => node.textContent), ['▶', '⏮', '⏭', '🎵', '↩', '🔊', '▶', '↻', '⏭', '↩']);
  assert.ok(
    iconActions.every(node => node.attributes['aria-label'] && node.attributes.title)
  );
  const groupLinks = iconActions.filter(node => node.tagName === 'A');
  assert.deepEqual(groupLinks.map(node => node.attributes.href), ['group-01.html', 'group-03.html', 'group-03.html']);
  assert.equal(byClass(controller.section, 'efn-practice__lost-chest').tagName, 'IMG');
  assert.equal(byClass(controller.section, 'efn-practice__lost-chest').attributes.src, 'assets/game/treasure-chest-coins-3d.png');
  assert.equal(byClass(controller.section, 'efn-practice__lost-map-route'), undefined);
  assert.equal(byClass(controller.section, 'efn-practice__lost-map-target'), undefined);
  assert.ok(byClass(controller.section, 'efn-practice__question-bar'));
  byClass(controller.section, 'efn-practice__primary').listeners.click();
  assert.equal(byClass(controller.section, 'efn-practice__mode').textContent, 'ניסיון עצמאי');
  assert.equal(byClass(controller.section, 'efn-practice__progress-text').textContent, '0/1');
  assert.ok(controller.section.classList.values.has('is-playing'));
  assert.ok(body.classList.values.has('efn-practice-is-playing'));
  byClass(controller.section, 'efn-practice__choices').querySelectorAll('button')[0].listeners.click();
  assert.equal(byClass(controller.section, 'efn-practice__next').textContent, '▶');
  assert.equal(byClass(controller.section, 'efn-practice__next').attributes['aria-label'], 'לשאלה הבאה');
  assert.deepEqual(controller.getQuestState(), { score: 10, streak: 1, multiplier: 1, chests: 1 });
  assert.equal(byClass(controller.section, 'efn-practice__score').textContent, '');
  assert.equal(byClass(controller.section, 'efn-practice__score-value').textContent, '10');
  assert.equal(byClass(controller.section, 'efn-practice__coin').attributes['aria-hidden'], 'true');
  assert.equal(byClass(controller.section, 'efn-practice__coin').tagName, 'IMG');
  assert.equal(byClass(controller.section, 'efn-practice__coin').attributes.src, 'assets/game/treasure-chest-coins-3d.png');
  assert.equal(byClass(controller.section, 'efn-practice__score').attributes['aria-label'], 'נאספו 10 מטבעות');
  assert.match(byClass(controller.section, 'efn-practice__feedback-title').textContent, /אוצר/);
  assert.equal(byClass(controller.section, 'efn-practice__treasure-map').attributes['aria-label'], '1 מתוך 3 תיבות אוצר נפתחו');
  byClass(controller.section, 'efn-practice__next').listeners.click();
  assert.equal(byClass(controller.section, 'efn-practice__summary').hidden, false);
  const exitButtons = controller.section.descendants().filter(node => node.className.split(/\s+/).includes('efn-practice__quiet'));
  exitButtons.at(-1).listeners.click();
  assert.ok(!controller.section.classList.values.has('is-playing'));
  assert.ok(!body.classList.values.has('efn-practice-is-playing'));
});

test('a wrong answer schedules the same item after exactly two intervening entries', () => {
  const session = sessionApi.createSession(records, { limit: 6, questionFactory: basicQuestionFactory });
  const question = session.next();
  session.answer(question.choices.find(choice => choice !== question.answer));
  const queue = session.debugQueue();
  assert.equal(queue[2].phase, 'retry');
  assert.match(queue[2].key, /word-0-retry/);
  assert.doesNotMatch(queue[0].key, /word-0-retry/);
  assert.doesNotMatch(queue[1].key, /word-0-retry/);
});

test('a correct answer schedules review after four to six entries', () => {
  const session = sessionApi.createSession(records, { limit: 8, questionFactory: basicQuestionFactory });
  const question = session.next();
  session.answer(question.answer);
  assert.equal(session.progress().progressPercent, 6);
  const reviewIndex = session.debugQueue().findIndex(entry => /word-0-review/.test(entry.key));
  assert.ok(reviewIndex >= 4);
  assert.ok(reviewIndex <= 6);
});

test('a full session terminates and reports first-try learning accurately', () => {
  const session = sessionApi.createSession(records, { limit: 8, questionFactory: basicQuestionFactory });
  let question;
  let answers = 0;
  while ((question = session.next())) {
    session.answer(question.answer);
    answers += 1;
    assert.ok(answers < 100, 'practice queue did not terminate');
  }
  assert.deepEqual(session.summary(), {
    firstTry: 8,
    corrected: 0,
    unresolved: 0,
    total: 8,
    answered: answers
  });
});

test('a corrected initial error is distinguished in the final summary', () => {
  const session = sessionApi.createSession(records, { limit: 8, questionFactory: basicQuestionFactory });
  let question = session.next();
  session.answer(question.choices.find(choice => choice !== question.answer));
  let answers = 1;
  while ((question = session.next())) {
    session.answer(question.answer);
    answers += 1;
    assert.ok(answers < 100, 'practice queue did not terminate');
  }
  assert.equal(session.summary().corrected, 1);
  assert.equal(session.summary().unresolved, 0);
});

test('short queues receive filler questions so spacing is preserved', () => {
  const session = sessionApi.createSession(records.slice(0, 2), { limit: 2, questionFactory: basicQuestionFactory });
  const first = session.next();
  session.answer(first.answer);
  const queue = session.debugQueue();
  const reviewIndex = queue.findIndex(entry => /word-0-review/.test(entry.key));
  assert.ok(reviewIndex >= 4);
  assert.ok(queue.filter(entry => entry.filler).length >= 3);
});

test('wrong feedback explains the answer without exposing scheduling language', () => {
  const result = {
    correct: false,
    entry: { filler: true },
    question: { meta: { record: records[0] } }
  };
  const feedback = vocabApi.formatFeedback(result);
  assert.doesNotMatch(feedback.text, /נחזור|נבדוק|שאלות|חיזוק ביניים/);
  assert.match(feedback.text, /פירושו/);
  assert.ok(feedback.parts.some(part => part.lang === 'en'));
});

test('correct feedback is brief, positive and contains no pedagogical scheduling text', () => {
  const feedback = vocabApi.formatFeedback({
    correct: true,
    entry: { filler: false },
    mastered: false,
    state: { initialCorrect: true },
    question: { meta: { record: records[0] } }
  });
  assert.match(feedback.title, /מעולה/);
  assert.match(feedback.text, /תשובה נכונה/);
  assert.doesNotMatch(`${feedback.title} ${feedback.text}`, /נחזור|נבדוק|שאלות/);
});

test('vocabulary questions switch direction and keep the answer among unique choices', () => {
  const primary = vocabApi.questionFactory(records[0], { records, mode: 'primary', phase: 'initial', filler: false, seed: 5 });
  const review = vocabApi.questionFactory(records[0], { records, mode: 'review', phase: 'review', filler: false, seed: 8 });
  assert.equal(primary.answer, records[0].mean_he);
  assert.equal(review.answer, records[0].en);
  assert.ok(primary.choices.includes(primary.answer));
  assert.ok(review.choices.includes(review.answer));
  assert.equal(new Set(primary.choices).size, primary.choices.length);
  assert.equal(new Set(review.choices).size, review.choices.length);
  assert.equal(primary.prompt, records[0].en);
  assert.deepEqual(primary.promptParts, [{ text: records[0].en, lang: 'en', dir: 'ltr' }]);
  assert.equal(primary.promptLang, 'en');
  assert.equal(primary.promptDir, 'ltr');
  assert.equal(review.prompt, records[0].mean_he);
  assert.deepEqual(review.promptParts, [{ text: records[0].mean_he, lang: 'he', dir: 'rtl' }]);
  assert.equal(review.clue, '');
});

test('context questions use a cloze when possible and a real sentence for inflected expressions', () => {
  assert.equal(vocabApi.contextPrompt({ en: 'lift', ex_en: 'Help me lift this chair.' }), 'Help me _____ this chair.');
  assert.equal(
    vocabApi.contextPrompt({ en: 'break down', ex_en: 'Our school bus broke down.' }),
    'Our school bus broke down.'
  );
});

test('all forty group pages load the dormant rollout bundle', async () => {
  const names = (await readdir(new URL('../groups/', import.meta.url))).filter(name => /^group-\d{2}\.html$/.test(name));
  assert.equal(names.length, 40);
  for (const name of names) {
    const html = await readFile(new URL(`../groups/${name}`, import.meta.url), 'utf8');
    assert.match(html, /window\.EFN_PAGE_WORDS=words/);
    assert.match(html, /learning-loop\.js/);
    assert.match(html, /practice-session\.js/);
    assert.match(html, /practice-panel\.js/);
    assert.match(html, /stage8-rollout\.js/);
    assert.match(html, /vocab-practice\.js/);
  }
});

test('the coverage-first route activates across every Core I group', async () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(await readFile(new URL('../stage8-rollout.js', import.meta.url), 'utf8'), context);
  const rollout = context.window.EFN_STAGE8_ROLLOUT;
  assert.equal(rollout.version, '2026-08-27-segmented-pilot-stage2');
  assert.equal(Object.keys(rollout.vocabulary).length, 20);
  for (let group = 1; group <= 20; group += 1) {
    const id = String(group).padStart(2, '0');
    const config = rollout.vocabulary[`groups/group-${id}.html`];
    assert.equal(config.limit, 55);
    assert.equal(config.sourceLimit, 55);
    assert.equal(config.missionSize, 55);
    assert.equal(config.adaptive, true);
    assert.equal(config.coverageFirst, true);
    assert.equal(config.segmented, group === 2 || group === 20);
    assert.equal(config.analyticsActivity, `band-ii-core-i-group-${id}`);
    assert.equal(config.progressGroup, group);
  }
  assert.deepEqual(Object.keys(rollout.stories), ['l1-a1-new-student']);
  assert.equal(rollout.stories['l1-a1-new-student'].analyticsActivity, 'read-along-ra-001');
  assert.equal(vocabApi.rolloutFor('/E-Vocab-Band-II/groups/group-01.html', rollout.vocabulary).sourceLimit, 55);
  assert.equal(vocabApi.rolloutFor('/E-Vocab-Band-II/groups/group-20.html', rollout.vocabulary).progressGroup, 20);
  assert.equal(vocabApi.rolloutFor('/E-Vocab-Band-II/groups/group-21.html', rollout.vocabulary), null);
});

test('each Core I coverage mission includes every unfinished authentic item', async () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(await readFile(new URL('../stage8-rollout.js', import.meta.url), 'utf8'), context);
  const rollout = context.window.EFN_STAGE8_ROLLOUT;

  for (let group = 1; group <= 20; group += 1) {
    const id = String(group).padStart(2, '0');
    const html = await readFile(new URL(`../groups/group-${id}.html`, import.meta.url), 'utf8');
    const match = html.match(/const words=(\[.*?\]);let currentIndex=/s);
    assert.ok(match, `Group ${id} vocabulary payload was not found`);
    const words = JSON.parse(match[1]);
    const config = rollout.vocabulary[`groups/group-${id}.html`];
    const mission = vocabApi.createCoverageMission(words, null, config.sourceLimit);
    assert.equal(mission.records.length, words.length);
    assert.equal(new Set(mission.records.map(record => record.serial)).size, words.length);
    assert.ok(mission.records.every(record => mission.modes.get(String(record.serial)) === 'primary'));
  }
});

test('local progress loading stays gated by the Core I rollout configuration', async () => {
  const source = await readFile(new URL('../vocab-practice.js', import.meta.url), 'utf8');
  assert.match(source, /core1-progress\.js\?v=20260826-coverage1/);
  assert.match(source, /config\.progressGroup/);
  assert.match(source, /root\.EFN_CORE1_PROGRESS/);
});

test('stage 7 preserves Block Quest rewards and adds paced audiovisual feedback', async () => {
  const source = await readFile(new URL('../vocab-practice.js', import.meta.url), 'utf8');
  const panel = await readFile(new URL('../practice-panel.js', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../practice-shell.css', import.meta.url), 'utf8');
  const treasureAsset = await readFile(new URL('../assets/game/treasure-chest-coins-3d.png', import.meta.url));
  assert.match(source, /blockQuest: true/);
  assert.match(source, /immersive: true/);
  assert.match(source, /exponentialFeedback: true/);
  assert.match(source, /treasureChests: \[25, 50, 100\]/);
  assert.match(source, /practice-shell\.css\?v=20260826-coverage1/);
  assert.match(source, /treasure-chest-coins-3d\.png\?v=20260826-stage8-fix1/);
  assert.equal(treasureAsset.subarray(1, 4).toString(), 'PNG');
  assert.equal(treasureAsset.readUInt32BE(16), 768);
  assert.equal(treasureAsset.readUInt32BE(20), 768);
  assert.equal(treasureAsset[25], 6);
  assert.match(source, /autoAdvanceCorrectMs: 650/);
  assert.match(source, /badge: 'CORE I'/);
  assert.match(source, /האוצר האבוד/);
  assert.match(source, /description: `\$\{sourcePool\.length\} מילים`/);
  assert.match(source, /נשאר במכשיר/);
  assert.match(source, /מתחילים לשחק/);
  assert.doesNotMatch(source, /מסע עומק אדפטיבי|לצלול|לדוג מילים/);
  assert.doesNotMatch(source, /איזו מילה מתאימה למשמעות|Which vocabulary item matches/);
  assert.match(source, /config\.adaptive/);
  assert.match(panel, /avoidRepeatedAnswerPosition/);
  assert.match(panel, /createQuestAudio/);
  assert.match(panel, /efn-practice__coin/);
  assert.match(panel, /efn-practice__lost-chest/);
  assert.match(panel, /efn-practice__question-bar/);
  assert.match(styles, /\.efn-practice__coin\s*\{/);
  assert.match(styles, /\.efn-practice__lost-chest\s*\{/);
  assert.match(panel, /בונה את השאלה הבאה/);
  assert.match(styles, /Noto Sans Hebrew/);
  assert.match(styles, /\.efn-practice--block-quest \.efn-practice__title\s*\{[^}]*font-weight: 700;[^}]*text-shadow: none;/s);
  assert.match(styles, /quest-transition-fill/);
  assert.match(styles, /\.efn-practice--block-quest \.efn-practice__prompt\s*\{[^}]*display: grid/s);
  assert.doesNotMatch(styles, /font-weight:\s*950/);
  assert.doesNotMatch(source, /ניסיון חוזר אחרי שתי שאלות אחרות|בדיקת זכירה בהקשר חדש|חיזוק ביניים/);
});

test('the Group 01 mission selector exposes every one of the 55 source records across six short rounds', () => {
  const group = Array.from({ length: 55 }, (_, index) => ({ serial: index + 1 }));
  const nextMission = vocabApi.createMissionSelector(group, 10, 55);
  const rounds = Array.from({ length: 6 }, () => nextMission());
  assert.ok(rounds.every(round => round.length === 10));
  assert.equal(new Set(rounds.flat().map(record => record.serial)).size, 55);
  assert.deepEqual(rounds[5].map(record => record.serial), [51, 52, 53, 54, 55, 1, 2, 3, 4, 5]);
});

test('coverage planning prioritizes unseen words and leaves mastered words out of the next run', () => {
  const plan = {
    items: [
      { serial: 1, signalCount: 1, mastered: false, nextMode: 'review' },
      { serial: 2, signalCount: 2, mastered: true, nextMode: 'context' },
      { serial: 3, signalCount: 0, mastered: false, nextMode: 'primary' }
    ]
  };
  const mission = vocabApi.createCoverageMission(records.slice(0, 3), plan, 3);
  assert.deepEqual(mission.records.map(record => record.serial), [3, 1]);
  assert.equal(mission.modes.get('3'), 'primary');
  assert.equal(mission.modes.get('1'), 'review');
  assert.equal(mission.signalCounts.get('3'), 0);
  assert.equal(mission.signalCounts.get('1'), 1);
});

test('a perfect coverage-first run asks every word once without scheduled repetition', () => {
  const session = sessionApi.createSession(records, {
    limit: records.length,
    choiceRecords: records,
    coverageFirst: true,
    adaptive: true,
    initialModeFor: record => record.serial === 1 ? 'review' : 'primary',
    questionFactory: basicQuestionFactory
  });
  const seen = [];
  let question;
  while ((question = session.next())) {
    seen.push(question.meta.record.serial);
    session.answer(question.answer, { responseTimeMs: 900 });
  }
  assert.deepEqual(seen, records.map(record => record.serial));
  assert.equal(new Set(seen).size, records.length);
  assert.deepEqual(session.summary(), {
    firstTry: records.length,
    corrected: 0,
    unresolved: 0,
    total: records.length,
    answered: records.length
  });
});

test('coverage-first repeats only a missed word and keeps the two-item correction gap', () => {
  const session = sessionApi.createSession(records.slice(0, 4), {
    limit: 4,
    choiceRecords: records,
    coverageFirst: true,
    adaptive: true,
    questionFactory: basicQuestionFactory
  });
  const first = session.next();
  session.answer(first.choices.find(choice => choice !== first.answer));
  assert.match(session.debugQueue()[2].key, /word-0-retry/);
  assert.ok(session.debugQueue().every(entry => !entry.filler));
});

test('group navigation is always available and wraps inside the twenty game groups', () => {
  assert.deepEqual(vocabApi.groupNavigationFor(1), {
    previous: 20,
    previousHref: 'group-20.html',
    previousLabel: 'לקבוצה הקודמת: 20',
    next: 2,
    nextHref: 'group-02.html',
    nextLabel: 'לקבוצה הבאה: 02'
  });
  assert.equal(vocabApi.groupNavigationFor(20).nextHref, 'group-01.html');
});

test('adaptive routing opens retrieval after fast consecutive success and context otherwise', () => {
  const session = sessionApi.createSession(records.slice(0, 4), {
    limit: 4,
    adaptive: true,
    questionFactory: vocabApi.questionFactory
  });
  let question = session.next();
  session.answer(question.answer, { responseTimeMs: 1800 });
  assert.equal(session.debugQueue().find(entry => /word-0-review/.test(entry.key)).mode, 'context');
  question = session.next();
  session.answer(question.answer, { responseTimeMs: 1600 });
  assert.equal(session.debugQueue().find(entry => /word-1-review/.test(entry.key)).mode, 'review');
});

test('adaptive support temporarily reduces the answer set after two recent errors', () => {
  const session = sessionApi.createSession(records.slice(0, 5), {
    limit: 5,
    adaptive: true,
    questionFactory: vocabApi.questionFactory
  });
  let question = session.next();
  session.answer(question.choices.find(choice => choice !== question.answer));
  question = session.next();
  session.answer(question.choices.find(choice => choice !== question.answer));
  question = session.next();
  assert.equal(question.choices.length, 2);
});

test('an adaptive word is mastered only through two different learning depths', () => {
  const session = sessionApi.createSession(records.slice(0, 3), {
    limit: 3,
    adaptive: true,
    questionFactory: vocabApi.questionFactory
  });
  let question;
  let answers = 0;
  while ((question = session.next())) {
    session.answer(question.answer, { responseTimeMs: 2400 });
    answers += 1;
    assert.ok(answers < 80, 'adaptive queue did not terminate');
  }
  assert.deepEqual(session.summary(), {
    firstTry: 3,
    corrected: 0,
    unresolved: 0,
    total: 3,
    answered: answers
  });
});

test('the Core I loader resolves the progress module from the local site root', async () => {
  let appended = null;
  const listeners = {};
  const script = {
    dataset: {},
    addEventListener(type, listener) { listeners[type] = listener; }
  };
  const root = {
    document: {
      querySelector: () => null,
      createElement: () => script,
      head: {
        appendChild(node) {
          appended = node;
          root.EFN_CORE1_PROGRESS = { loaded: true };
          listeners.load();
        }
      }
    },
    location: { href: 'https://example.test/E-Vocab-Band-II/groups/group-01.html' }
  };
  const loaded = await vocabApi.loadProgressModule(
    root,
    'https://example.test/E-Vocab-Band-II/vocab-practice.js?v=20260825-stage9'
  );
  assert.equal(appended.src, 'https://example.test/E-Vocab-Band-II/core1-progress.js?v=20260826-coverage1');
  assert.equal(appended.dataset.efnCore1Progress, 'true');
  assert.deepEqual(loaded, { loaded: true });
});

test('progress tracking records only successful target signals', () => {
  const calls = [];
  const rendered = [];
  const document = {};
  const tracker = vocabApi.createProgressTracker({
    createBrowserProgressStore: () => ({
      recordCorrect: input => { calls.push(input); return input; },
      getGroupProgress: () => ({ status: 'in_progress' }),
      storageMode: () => 'device'
    })
  }, {
    document,
    localStorage: new MemoryStorage(),
    EFN_CORE1_PROGRESS_UI: {
      renderProgress(target, progress) { rendered.push({ target, progress }); }
    }
  }, { group: 1, expectedSerials: [1, 2] });

  tracker.record({ correct: false, entry: { mode: 'primary', filler: false }, question: { meta: { record: { serial: 1 } } } });
  tracker.record({ correct: true, entry: { mode: 'primary', filler: true }, question: { meta: { record: { serial: 1 } } } });
  tracker.record({ correct: true, entry: { mode: 'primary', filler: false }, question: { meta: { record: { serial: 1 } } } });
  tracker.record({ correct: true, entry: { mode: 'review', filler: false }, question: { meta: { record: { serial: 1 } } } });

  assert.deepEqual(calls.map(call => call.signal), ['meaning', 'recall']);
  assert.ok(calls.every(call => call.group === 1));
  assert.ok(calls.every(call => call.expectedSerials.length === 2));
  assert.equal(rendered.length, 2);
  assert.ok(rendered.every(entry => entry.target === document));
  assert.deepEqual(rendered.map(entry => entry.progress.signal), ['meaning', 'recall']);
});

test('progress tracking preserves response timing for adaptive routing', () => {
  const calls = [];
  const session = {
    answer(value, answerContext) {
      calls.push({ value, answerContext });
      return { correct: true, entry: { mode: 'primary', filler: false }, question: { meta: { record: { serial: 1 } } } };
    }
  };
  const tracked = vocabApi.withProgressTracking(session, { record() {} });
  tracked.answer('נכון', { responseTimeMs: 1800 });
  assert.deepEqual(calls, [{ value: 'נכון', answerContext: { responseTimeMs: 1800 } }]);
});

test('a 12-word Core I round writes evidence against the full group manifest', async () => {
  const html = await readFile(new URL('../groups/group-01.html', import.meta.url), 'utf8');
  const match = html.match(/const words=(\[.*?\]);let currentIndex=/s);
  assert.ok(match, 'Group 01 vocabulary payload was not found');
  const groupWords = JSON.parse(match[1]);
  assert.equal(groupWords.length, 55);

  const storage = new MemoryStorage();
  const tracker = vocabApi.createProgressTracker(progressApi, { localStorage: storage }, {
    group: 1,
    expectedSerials: groupWords.map(word => word.serial)
  });
  const session = vocabApi.withProgressTracking(
    sessionApi.createSession(groupWords, { limit: 12, questionFactory: vocabApi.questionFactory }),
    tracker
  );
  let question;
  let answers = 0;
  while ((question = session.next())) {
    session.answer(question.answer);
    answers += 1;
    assert.ok(answers < 200, 'tracked practice queue did not terminate');
  }
  const progress = tracker.getProgress();
  assert.equal(progress.mastered, 12);
  assert.equal(progress.total, 55);
  assert.equal(progress.checked, false);
  assert.equal(progress.status, 'in_progress');
  assert.equal(progress.storage, 'device');
});

test('RA-001 has five evidence-backed questions and the reader loads the story practice', async () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(await readFile(new URL('../Read-Along/story-practice-data.js', import.meta.url), 'utf8'), context);
  const questions = context.window.EFN_STORY_PRACTICE_DATA['ra-001'];
  assert.equal(questions.length, 5);
  for (const question of questions) {
    assert.ok(question.choices.includes(question.answer));
    assert.ok(question.evidence.length > 12);
    assert.ok(question.explanationHe.length > 12);
  }
  const reader = await readFile(new URL('../Read-Along/reader.html', import.meta.url), 'utf8');
  const storyPractice = await readFile(new URL('../Read-Along/story-practice.js', import.meta.url), 'utf8');
  assert.match(reader, /window\.EFN_ACTIVE_STORY=story/);
  assert.match(reader, /story-practice-data\.js/);
  assert.match(reader, /story-practice\.js/);
  assert.match(reader, /function completeTranslation\(scene\)/);
  assert.match(reader, /translationText\.textContent=completeTranslation\(story\.scenes\[index\]\)/);
  assert.match(reader, /\.parents-link\{/);
  assert.match(storyPractice, /exitLabel: 'חזרה לסיפור'/);
});

test('practice code preserves accessibility and sends only start/completion measurements', async () => {
  const files = ['learning-loop.js', 'practice-segments.js', 'practice-session.js', 'practice-panel.js', 'vocab-practice.js', 'Read-Along/story-practice.js'];
  const source = (await Promise.all(files.map(file => readFile(new URL(`../${file}`, import.meta.url), 'utf8')))).join('\n');
  const styles = await readFile(new URL('../practice-shell.css', import.meta.url), 'utf8');
  const analytics = await readFile(new URL('../analytics.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /\bfetch\s*\(|\bsendBeacon\b|localStorage|sessionStorage|indexedDB|document\.cookie/);
  assert.match(source, /aria-live/);
  assert.match(source, /dataset\.analyticsIgnore/);
  assert.match(source, /activity_complete/);
  assert.match(source, /practice-start/);
  assert.match(source, /setTextParts/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(styles, /\.efn-practice\s*\{[^}]*box-sizing:\s*border-box/);
  assert.match(styles, /overflow-wrap:\s*anywhere/);
  assert.match(styles, /@media\s*\(max-width:\s*320px\)/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /@media\s*\(forced-colors:\s*active\)/);
  assert.match(analytics, /data-analytics-ignore/);
  assert.match(analytics, /EFNAnalyticsIgnoreNextAudio/);
});

test('analytics ignores practice clicks and practice audio at runtime', async () => {
  const listeners = new Map();
  const payloads = [];
  const spoken = [];
  class Element {}
  class MutationObserver { observe() {} }
  const document = {
    visibilityState: 'visible',
    referrer: '',
    documentElement: {},
    addEventListener(type, listener) { listeners.set(type, listener); }
  };
  const window = {
    addEventListener() {},
    speechSynthesis: { speak(utterance) { spoken.push(utterance); } }
  };
  const context = {
    Element,
    MutationObserver,
    URL,
    URLSearchParams,
    crypto: { randomUUID: () => 'test-visit' },
    document,
    fetch: () => Promise.resolve(),
    location: {
      hostname: 'simonh68.github.io',
      pathname: '/E-Vocab-Band-II/groups/group-01.html',
      href: 'https://simonh68.github.io/E-Vocab-Band-II/groups/group-01.html',
      origin: 'https://simonh68.github.io',
      search: ''
    },
    navigator: { sendBeacon(_endpoint, payload) { payloads.push(JSON.parse(payload)); return true; } },
    sessionStorage: { getItem: () => null, setItem() {} },
    setTimeout(callback) { callback(); return 1; },
    window
  };
  vm.createContext(context);
  vm.runInContext(await readFile(new URL('../analytics.js', import.meta.url), 'utf8'), context);
  payloads.length = 0;

  const practiceButton = {
    tagName: 'BUTTON',
    closest(selector) { return selector === '[data-analytics-ignore="true"]' ? {} : this; },
    getAttribute: () => 'practice-answer'
  };
  listeners.get('click')({ target: practiceButton });
  assert.equal(payloads.length, 0);

  const regularButton = {
    tagName: 'BUTTON',
    closest(selector) { return selector === '[data-analytics-ignore="true"]' ? null : this; },
    getAttribute: name => name === 'data-analytics-label' ? 'regular-action' : ''
  };
  listeners.get('click')({ target: regularButton });
  assert.equal(payloads.at(-1).event, 'button_click');

  payloads.length = 0;
  window.EFNAnalyticsIgnoreNextAudio = true;
  window.speechSynthesis.speak({ text: 'proof' });
  assert.equal(spoken.length, 1);
  assert.equal(payloads.length, 0);
  window.speechSynthesis.speak({ text: 'regular audio' });
  assert.equal(payloads.at(-1).event, 'audio_play');
});

test('segment assets are cache-busted only in the two Core I pilots while preserving the analytics privacy guard', async () => {
  const reader = await readFile(new URL('../Read-Along/reader.html', import.meta.url), 'utf8');
  for (let group = 1; group <= 20; group += 1) {
    const id = String(group).padStart(2, '0');
    const activeGroup = await readFile(new URL(`../groups/group-${id}.html`, import.meta.url), 'utf8');
    const pilot = group === 2 || group === 20;
    if (pilot) {
      assert.match(activeGroup, /practice-segments\.js\?v=20260827-stage2/);
      assert.match(activeGroup, /practice-session\.js\?v=20260827-segments-stage2/);
      assert.match(activeGroup, /stage8-rollout\.js\?v=20260827-segments-stage2/);
      assert.match(activeGroup, /vocab-practice\.js\?v=20260827-segments-stage2/);
    } else {
      assert.doesNotMatch(activeGroup, /practice-segments\.js/);
      assert.match(activeGroup, /practice-session\.js\?v=20260826-coverage1/);
      assert.match(activeGroup, /stage8-rollout\.js\?v=20260826-coverage1/);
      assert.match(activeGroup, /vocab-practice\.js\?v=20260826-coverage1/);
    }
    assert.match(activeGroup, /practice-panel\.js\?v=20260826-coverage1/);
    assert.match(activeGroup, /analytics\.js\?v=[^"<]+/);
  }
  assert.match(reader, /story-practice\.js\?v=20260825-stage9/);
  assert.match(reader, /analytics\.js\?v=20260825-stage9/);
});
