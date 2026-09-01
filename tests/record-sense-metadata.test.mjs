import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { extractWords } from './helpers/band2-compatibility.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function normalizedEntry(value) {
  return String(value || '').normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en');
}

test('every source and activity record carries symmetric record-sense metadata', async () => {
  const source = JSON.parse(
    await readFile(path.join(root, 'data/pedagogical-content.json'), 'utf8')
  );
  assert.equal(source.records.length, 2176);
  const bySerial = new Map(source.records.map((record) => [record.serial, record]));
  assert.equal(bySerial.size, source.records.length);

  for (const record of source.records) {
    const context = `${record.serial} ${record.entry}`;
    assert.equal(record.record_sense_he, record.translation, `Hebrew record sense: ${context}`);
    assert.equal(typeof record.record_sense_en, 'string', `English record sense: ${context}`);
    assert.equal(typeof record.sense_evidence, 'string', `Sense evidence: ${context}`);
    assert.ok(record.sense_evidence, `Empty sense evidence: ${context}`);
    assert.equal(typeof record.repeated_entry, 'boolean', `Repeated-entry flag: ${context}`);
    assert.ok(Array.isArray(record.same_entry_record_ids), `Sibling list: ${context}`);
    assert.equal(
      record.repeated_entry,
      record.same_entry_record_ids.length > 0,
      `Repeated-entry flag and links disagree: ${context}`
    );
    assert.equal(
      record.record_sense_scope,
      record.repeated_entry ? 'record-specific' : 'single-entry',
      `Sense scope: ${context}`
    );
    assert.equal(
      new Set(record.same_entry_record_ids).size,
      record.same_entry_record_ids.length,
      `Duplicate sibling link: ${context}`
    );
    assert.ok(!record.same_entry_record_ids.includes(record.serial), `Self link: ${context}`);
    for (const siblingId of record.same_entry_record_ids) {
      const sibling = bySerial.get(siblingId);
      assert.ok(sibling, `Unknown sibling ${siblingId}: ${context}`);
      assert.equal(normalizedEntry(sibling.entry), normalizedEntry(record.entry), `Spelling link: ${context}`);
      assert.ok(sibling.same_entry_record_ids.includes(record.serial), `Asymmetric link: ${context}`);
    }
  }

  assert.equal(source.records.filter((record) => record.repeated_entry).length, 606);

  const activityRecords = [];
  for (let number = 1; number <= 40; number += 1) {
    const relativePath = `groups/group-${String(number).padStart(2, '0')}.html`;
    const html = await readFile(path.join(root, relativePath), 'utf8');
    activityRecords.push(...extractWords(html, relativePath));
  }
  assert.equal(activityRecords.length, source.records.length);
  for (const activity of activityRecords) {
    const record = bySerial.get(activity.serial);
    assert.ok(record, `Unknown activity serial ${activity.serial}`);
    assert.equal(activity.mean_he, record.translation, `Activity Hebrew ${activity.serial}`);
    assert.equal(activity.ex_en, record.example, `Activity example ${activity.serial}`);
    assert.equal(activity.ex_he, record.example_he, `Activity Hebrew example ${activity.serial}`);
    for (const field of [
      'record_sense_en',
      'record_sense_he',
      'repeated_entry',
      'same_entry_record_ids',
      'sense_evidence',
      'record_sense_scope',
    ]) {
      assert.deepEqual(activity[field], record[field], `Activity metadata ${activity.serial}: ${field}`);
    }
  }
});
