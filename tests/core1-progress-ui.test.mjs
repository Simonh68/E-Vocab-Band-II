import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const require = createRequire(import.meta.url);
const progressApi = require('../core1-progress.js');
const groupsApi = require('../core1-progress-groups.js');
const uiApi = require('../core1-progress-ui.js');

class MemoryStorage {
  constructor() { this.values = new Map(); }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
}

function dataKey(attribute) {
  return attribute.replace(/^data-/, '').replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
}

function matches(element, selector) {
  const classMatch = selector.match(/^\.([\w-]+)$/);
  if (classMatch) return element.className.split(/\s+/).includes(classMatch[1]);
  const linkMatch = selector.match(/^a\[href="([^"]+)"\]$/);
  if (linkMatch) return element.tagName === 'A' && element.attributes.href === linkMatch[1];
  const attributes = [...selector.matchAll(/\[([^=\]]+)(?:="([^"]*)")?\]/g)];
  if (attributes.length) {
    return attributes.every(([, name, expected]) => {
      const actual = name.startsWith('data-') ? element.dataset[dataKey(name)] : element.attributes[name];
      return expected === undefined ? actual !== undefined : String(actual) === expected;
    });
  }
  return false;
}

class FakeElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.dataset = {};
    this.attributes = {};
    this.className = '';
    this.textContent = '';
    this.parentElement = null;
    this.hidden = false;
    this.listeners = {};
  }

  append(...children) { children.forEach(child => this.appendChild(child)); }
  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }
  insertBefore(child, reference) {
    child.parentElement = this;
    const index = this.children.indexOf(reference);
    if (index < 0) this.children.push(child);
    else this.children.splice(index, 0, child);
    return child;
  }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(type, listener) { this.listeners[type] = listener; }
  focus() { this.focused = true; }
  closest(selector) {
    if (matches(this, selector)) return this;
    return this.parentElement?.closest(selector) || null;
  }
  descendants() { return this.children.flatMap(child => [child, ...child.descendants()]); }
  querySelector(selector) { return this.descendants().find(element => matches(element, selector)) || null; }
  querySelectorAll(selector) { return this.descendants().filter(element => matches(element, selector)); }
}

class FakeDocument extends FakeElement {
  constructor() { super('document'); }
  createElement(tagName) { return new FakeElement(tagName); }
}

test('all Core I manifests exactly match their current activity serials', async () => {
  assert.deepEqual(Object.keys(groupsApi.groups).map(Number), Array.from({ length: 20 }, (_, index) => index + 1));
  for (let group = 1; group <= 20; group += 1) {
    const id = String(group).padStart(2, '0');
    const html = await readFile(new URL(`../groups/group-${id}.html`, import.meta.url), 'utf8');
    const match = html.match(/const words=(\[.*?\]);let currentIndex=/s);
    assert.ok(match, `Group ${id} vocabulary payload was not found`);
    const serials = JSON.parse(match[1]).map(word => word.serial);
    assert.ok(serials.length >= 54 && serials.length <= 55);
    assert.deepEqual(groupsApi.expectedSerials(group), serials);
  }
  assert.equal(groupsApi.expectedSerials(21), null);
});

test('visible progress states use ○, ◐ with percentage, and ✓', () => {
  assert.deepEqual(uiApi.viewFor({ status: 'not_started', percentage: 0, storage: 'device' }), {
    status: 'not_started',
    symbol: '○',
    compact: '○',
    label: 'טרם התחיל',
    detail: '0% · נשמר במכשיר הזה',
    accessible: 'הקבוצה טרם התחילה. 0 אחוז. נשמר במכשיר הזה.'
  });
  assert.equal(uiApi.viewFor({ status: 'in_progress', percentage: 27, storage: 'device' }).compact, '◐ 27%');
  assert.equal(uiApi.viewFor({ status: 'mastered', percentage: 100, storage: 'session' }).compact, '✓');
  assert.match(uiApi.viewFor({ status: 'mastered', percentage: 100, storage: 'session' }).detail, /לביקור הזה בלבד/);
});

test('the group list injects and updates all twenty Core I badges', () => {
  const document = new FakeDocument();
  const containers = [];
  for (let group = 1; group <= 20; group += 1) {
    const container = new FakeElement('div');
    container.className = 'group';
    const link = new FakeElement('a');
    link.setAttribute('href', `groups/group-${String(group).padStart(2, '0')}.html`);
    const copy = new FakeElement('button');
    copy.className = 'copy';
    container.append(link, copy);
    document.append(container);
    containers.push(container);
  }

  const storage = new MemoryStorage();
  const root = { document, localStorage: storage, location: { pathname: '/E-Vocab-Band-II/' } };
  uiApi.mount(root, { progressApi, groupsApi });
  assert.equal(document.querySelectorAll('[data-core1-progress-list][data-group]').length, 20);
  containers.forEach((container, index) => {
    assert.equal(container.children[1].dataset.group, String(index + 1));
    assert.equal(container.children[1].textContent, '○');
    assert.match(container.className, /group--with-progress/);
    assert.equal(container.children[2].className, 'copy');
  });

  progressApi.createProgressStore(storage).recordCorrect({
    group: 20,
    serial: groupsApi.expectedSerials(20)[0],
    signal: 'meaning',
    expectedSerials: groupsApi.expectedSerials(20)
  });
  uiApi.mount(root, { progressApi, groupsApi });
  assert.equal(containers[0].children[1].textContent, '○');
  assert.equal(containers[19].children[1].textContent, '◐ 1%');
  assert.equal(document.querySelectorAll('[data-core1-progress-list][data-group]').length, 20);
});

test('a Core I activity page uses all page words, explains local storage, and can reset only that group', () => {
  const document = new FakeDocument();
  const header = new FakeElement('header');
  header.className = 'activity-head';
  const title = new FakeElement('h1');
  const counter = new FakeElement('div');
  counter.className = 'counter';
  header.append(title, counter);
  document.append(header);

  const expectedSerials = groupsApi.expectedSerials(20);
  const storage = new MemoryStorage();
  progressApi.createProgressStore(storage).recordCorrect({
    group: 20,
    serial: expectedSerials[0],
    signal: 'meaning',
    expectedSerials
  });
  const root = {
    document,
    localStorage: storage,
    location: { pathname: '/E-Vocab-Band-II/groups/group-20.html' },
    EFN_PAGE_WORDS: expectedSerials.map(serial => ({ serial })),
    confirm: () => true
  };
  uiApi.mount(root, { progressApi, groupsApi });

  const badge = header.children[1];
  assert.equal(badge.dataset.group, '20');
  assert.equal(badge.dataset.status, 'in_progress');
  assert.equal(badge.querySelector('[data-progress-symbol]').textContent, '◐');
  assert.equal(badge.querySelector('[data-progress-label]').textContent, 'בתהליך');
  assert.equal(badge.querySelector('[data-progress-detail]').textContent, '1% · נשמר במכשיר הזה');
  const reset = badge.querySelector('[data-progress-reset]');
  assert.equal(reset.hidden, false);
  reset.listeners.click();
  assert.equal(badge.dataset.status, 'not_started');
  assert.equal(badge.querySelector('[data-progress-detail]').textContent, '0% · נשמר במכשיר הזה');
  assert.equal(reset.hidden, true);
  assert.equal(badge.querySelector('[data-progress-status]').focused, true);
  assert.equal(progressApi.createProgressStore(storage).getGroupProgress({ group: 20, expectedSerials }).started, 0);
  assert.equal(header.children[2], counter);
});

test('stage 4 assets cover Core I groups 01–20 and exclude Core II and Arabic pages', async () => {
  const [home, coreTwo, arabicHome, styles] = await Promise.all([
    readFile(new URL('../index.html', import.meta.url), 'utf8'),
    readFile(new URL('../groups/group-21.html', import.meta.url), 'utf8'),
    readFile(new URL('../AR/index.html', import.meta.url), 'utf8'),
    readFile(new URL('../core1-progress-ui.css', import.meta.url), 'utf8')
  ]);
  for (let group = 1; group <= 20; group += 1) {
    const id = String(group).padStart(2, '0');
    const source = await readFile(new URL(`../groups/group-${id}.html`, import.meta.url), 'utf8');
    assert.match(source, /core1-progress\.js\?v=20260826-stage4/);
    assert.match(source, /core1-progress-groups\.js\?v=20260826-stage4/);
    assert.match(source, /core1-progress-ui\.js\?v=20260826-stage4/);
    assert.match(source, /core1-progress-ui\.css\?v=20260826-stage4/);
  }
  assert.match(home, /core1-progress-ui\.css\?v=20260826-stage4/);
  assert.match(styles, /\.group-progress/);
  assert.match(styles, /\.activity-progress/);
  assert.doesNotMatch(coreTwo, /core1-progress-ui\.js/);
  assert.doesNotMatch(arabicHome, /core1-progress-ui\.js/);
});

test('the progress interface adds no network calls or learner content fields', async () => {
  const source = (await Promise.all([
    readFile(new URL('../core1-progress-groups.js', import.meta.url), 'utf8'),
    readFile(new URL('../core1-progress-ui.js', import.meta.url), 'utf8')
  ])).join('\n');
  assert.doesNotMatch(source, /\bfetch\s*\(|sendBeacon|XMLHttpRequest|indexedDB|document\.cookie/);
  assert.doesNotMatch(source, /student|learner|email|answer|translation|voice|analytics/i);
});
