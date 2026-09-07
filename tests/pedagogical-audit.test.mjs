import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import test from 'node:test';
const require = createRequire(import.meta.url);
const api = require('../vocab-practice.js');
const source = JSON.parse(await readFile(new URL('../data/pedagogical-content.json', import.meta.url), 'utf8'));
const records = source.records.map(record => ({
  serial: record.serial, en: record.entry, mean_he: record.translation, ex_en: record.example
}));

test('context practice actually displays an approved English sentence for every record', () => {
  for (const record of records) {
    assert.ok(record.ex_en?.trim(), `Missing approved example for ${record.serial}`);
    const question = api.questionFactory(record, { records: records.slice(0, 12), mode: 'context', seed: 3 });
    assert.equal(question.clue, record.ex_en.trim());
    assert.equal(question.clueLang, 'en');
    assert.equal(question.clueDir, 'ltr');
    assert.equal(question.prompt, record.en.trim());
    assert.equal(question.answer, record.mean_he.trim());
    assert.equal(question.speakText, `${record.en.trim()}. ${record.ex_en.trim()}`);
    assert.equal(question.choices.filter(choice => choice === question.answer).length, 1);
  }
});

test('initial and delayed recognition retain the bare headword and Hebrew choices', () => {
  const record = { en: 'lift', mean_he: 'להרים', ex_en: 'Help me lift this chair.' };
  const alternatives = [record, { mean_he: 'להוריד' }, { mean_he: 'ללכת' }, { mean_he: 'לאכול' }];
  for (const mode of ['primary', 'review']) {
    const question = api.questionFactory(record, { records: alternatives, mode, seed: 4 });
    assert.equal(question.prompt, 'lift');
    assert.equal(question.clue, '');
    assert.equal(question.speakText, 'lift');
    assert.equal(question.choices.length, 4);
    assert.equal(new Set(question.choices).size, 4);
  }
});

test('the contextual clue contains no Hebrew translation or generated replacement sentence', () => {
  const record = { en: 'lift', mean_he: 'להרים', ex_en: 'Help me lift this chair.', ex_he: 'עזור לי להרים את הכיסא.' };
  const question = api.questionFactory(record, { records: [record], mode: 'context', phase: 'review', seed: 3 });
  assert.equal(question.clue, record.ex_en);
  assert.doesNotMatch(question.clue, /[\u0590-\u05ff]/);
  assert.equal(question.modeLabel, 'שער ההקשר');
});
