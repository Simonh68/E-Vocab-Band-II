import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const source = fs.readFileSync(new URL('../analytics.js', import.meta.url), 'utf8');

test('legacy Band II and Read Along routes migrate to the primary domain', () => {
  assert.match(source, /\/band-ii\//);
  assert.match(source, /\/read-along\//);
  assert.match(source, /efn\.band2\.core1\.progress\.v1/);
  assert.match(source, /ra-last-story/);
  assert.match(source, /window\.name = `efn-domain-migration:/);
});
