import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

import { extractWords } from './helpers/band2-compatibility.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function fakeElement(tagName) {
  const listeners = new Map();
  return {
    tagName,
    children: [],
    dataset: {},
    classList: { add() {}, remove() {} },
    setAttribute() {},
    querySelector() { return null; },
    addEventListener(name, listener) { listeners.set(name, listener); },
    append(...children) { this.children.push(...children); },
    appendChild(child) { this.children.push(child); },
    get offsetWidth() { return 44; },
    listeners,
  };
}

test('Band II feedback identifies the exact card and word in all 40 groups', async () => {
  const runtime = await readFile(path.join(root, 'flashcard-runtime-en.js'), 'utf8');
  const groups = await Promise.all(Array.from({ length: 40 }, async (_, index) => {
    const groupId = String(index + 1).padStart(2, '0');
    const relativePath = `groups/group-${groupId}.html`;
    return {
      groupId,
      relativePath,
      html: await readFile(path.join(root, relativePath), 'utf8'),
    };
  }));

  assert.match(runtime, /event:"button_click"/);
  assert.match(runtime, /context:\{target,outcome\}/);
  assert.match(runtime, /groupMatch=window\.location\.pathname\.match/);
  assert.match(runtime, /groupId=groupMatch\[1\]/);
  assert.match(runtime, /const item=words\[currentIndex\]/);
  assert.match(runtime, /vf1\|\$\{groupId\}\|\$\{String\(item\.serial\)\}\|translation-answer\|\$\{encodeURIComponent\(String\(item\.en\|\|""\)\)\}/);
  assert.match(runtime, /wrap\.dataset\.analyticsIgnore="true"/);
  assert.match(runtime, /ack\.textContent="💬"/);
  assert.doesNotMatch(runtime, /✓ תודה/);
  assert.doesNotMatch(runtime, /band2-core1-group01-card-answer-feedback/);
  assert.doesNotMatch(runtime, /vf1\|01\|/);

  const targets = [];
  for (const { groupId, relativePath, html } of groups) {
    assert.match(html, /flashcard-runtime-en\.js\?v=20260905-feedback-all1/, relativePath);
    const words = extractWords(html, relativePath);
    const groupTargets = words.map((word) => [
      'vf1',
      groupId,
      word.serial,
      'translation-answer',
      encodeURIComponent(String(word.en || '')),
    ].join('|'));
    assert.equal(new Set(groupTargets).size, words.length, relativePath);
    targets.push(...groupTargets);
  }
  assert.equal(new Set(targets).size, targets.length);
  assert.ok(targets.every((target) => target.length <= 120));
});

test('Band II precise feedback adds no personal or answer fields', async () => {
  const runtime = await readFile(path.join(root, 'flashcard-runtime-en.js'), 'utf8');
  const feedbackSource = runtime.slice(runtime.indexOf('[data-efn-binary-feedback]'));

  assert.doesNotMatch(feedbackSource, /visitId|visitorId|email|studentId|fingerprint|referrer|freeText|answerText|recording/i);
});

test('Band II feedback click emits one precise payload for the visible card and group', async () => {
  const runtime = await readFile(path.join(root, 'flashcard-runtime-en.js'), 'utf8');
  const feedbackSource = runtime.slice(runtime.lastIndexOf('(()=>{if(typeof window'));
  const back = fakeElement('section');
  const requests = [];
  const context = vm.createContext({
    words: [{ serial: 570, en: 'lift' }, { serial: 935, en: 'take something out' }],
    currentIndex: 1,
    document: {
      head: fakeElement('head'),
      getElementById: (id) => id === 'cardBack' ? back : null,
      createElement: fakeElement,
    },
    location: { pathname: '/E-Vocab-Band-II/groups/group-40.html' },
    fetch: (url, options) => {
      requests.push({ url, options });
      return Promise.resolve(new Response(null, { status: 204 }));
    },
    setTimeout: (callback) => { callback(); return 1; },
  });
  context.window = context;

  vm.runInContext(feedbackSource, context);
  const wrap = back.children[0];
  const positive = wrap.children[0];
  positive.listeners.get('click')({ stopPropagation() {} });

  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, 'https://englishfornoar.co.il/api/analytics');
  assert.deepEqual(JSON.parse(requests[0].options.body), {
    site: 'band-ii',
    path: '/E-Vocab-Band-II/groups/group-40.html',
    pageKind: 'group',
    event: 'button_click',
    context: {
      target: 'vf1|40|935|translation-answer|take%20something%20out',
      outcome: 'positive',
    },
  });
  assert.equal(wrap.dataset.analyticsIgnore, 'true');
});

test('Band II uses the approved youth feedback graphics in all 40 groups', async () => {
  const ui = await readFile(path.join(root, 'feedback-youth-ui.js'), 'utf8');

  assert.match(ui, /gap:44px/);
  assert.match(ui, /data-feedback-tone="positive"/);
  assert.match(ui, /data-feedback-tone="negative"/);
  assert.match(ui, /#176b45/);
  assert.match(ui, /#a33d4c/);
  assert.match(ui, /ack\.textContent = '✓'/);
  assert.match(ui, /2000/);
  assert.doesNotMatch(ui, /💬|תודה/);
  assert.doesNotMatch(ui, /fetch\(|api\/analytics|button_click/);

  for (let index = 1; index <= 40; index += 1) {
    const groupId = String(index).padStart(2, '0');
    const html = await readFile(path.join(root, `groups/group-${groupId}.html`), 'utf8');
    assert.match(
      html,
      /flashcard-runtime-en\.js\?v=20260905-feedback-all1"><\/script><script src="\.\.\/feedback-youth-ui\.js\?v=20260905-1"/,
      `group-${groupId}`,
    );
  }
});
