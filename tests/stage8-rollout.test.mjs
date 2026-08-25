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

const records = Array.from({ length: 8 }, (_, index) => ({
  id: `word-${index}`,
  serial: index + 1,
  en: `word${index}`,
  mean_he: `פירוש ${index}`,
  ex_en: `This is word${index}.`,
  ex_he: `זהו פירוש ${index}.`
}));

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

test('filler feedback does not promise an unscheduled return', () => {
  const result = {
    correct: false,
    entry: { filler: true },
    question: { meta: { record: records[0] } }
  };
  const feedback = vocabApi.formatFeedback(result);
  assert.doesNotMatch(feedback.text, /נחזור/);
  assert.match(feedback.text, /חיזוק ביניים/);
  assert.ok(feedback.parts.some(part => part.lang === 'en'));
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
  assert.deepEqual(primary.promptParts.map(part => part.lang), ['he', 'en', 'he']);
  assert.equal(primary.promptParts[1].text, records[0].en);
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

test('wave one activates only Band II group 01 and Read Along RA-001', async () => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(await readFile(new URL('../stage8-rollout.js', import.meta.url), 'utf8'), context);
  const rollout = context.window.EFN_STAGE8_ROLLOUT;
  assert.deepEqual(Object.keys(rollout.vocabulary), ['groups/group-01.html']);
  assert.equal(rollout.vocabulary['groups/group-01.html'].limit, 12);
  assert.equal(rollout.vocabulary['groups/group-01.html'].analyticsActivity, 'band-ii-core-i-group-01');
  assert.deepEqual(Object.keys(rollout.stories), ['l1-a1-new-student']);
  assert.equal(rollout.stories['l1-a1-new-student'].analyticsActivity, 'read-along-ra-001');
  assert.equal(vocabApi.rolloutFor('/E-Vocab-Band-II/groups/group-01.html', rollout.vocabulary).limit, 12);
  assert.equal(vocabApi.rolloutFor('/E-Vocab-Band-II/groups/group-02.html', rollout.vocabulary), null);
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
  const files = ['learning-loop.js', 'practice-session.js', 'practice-panel.js', 'vocab-practice.js', 'Read-Along/story-practice.js'];
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
  assert.match(styles, /\.efn-practice\{[^}]*box-sizing:border-box/);
  assert.match(styles, /overflow-wrap:anywhere/);
  assert.match(styles, /@media\(max-width:320px\)/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(styles, /@media\(forced-colors:active\)/);
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

test('practice assets and the analytics privacy guard are cache-busted on rollout pages', async () => {
  const activeGroup = await readFile(new URL('../groups/group-01.html', import.meta.url), 'utf8');
  const reader = await readFile(new URL('../Read-Along/reader.html', import.meta.url), 'utf8');
  assert.match(activeGroup, /vocab-practice\.js\?v=20260825-stage9/);
  assert.match(activeGroup, /analytics\.js\?v=20260825-stage9/);
  assert.match(reader, /story-practice\.js\?v=20260825-stage9/);
  assert.match(reader, /analytics\.js\?v=20260825-stage9/);
});
