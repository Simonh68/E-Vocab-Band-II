import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const navigation = require('../flashcard-navigation.js');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetVersion = '20260830-answer-flash1';

async function groupPages(directory) {
  return (await readdir(path.join(root, directory)))
    .filter(name => /^group-\d{2}\.html$/.test(name))
    .sort()
    .map(name => path.join(root, directory, name));
}

test('navigation resets a flipped card before the next answer is written', () => {
  const events = [];
  let flipped = true;
  const card = {
    style: { transition: '' },
    classList: {
      contains: name => name === 'flipped' && flipped,
      remove: name => {
        if (name === 'flipped') flipped = false;
        events.push(`remove:${card.style.transition}`);
      }
    },
    get offsetWidth() {
      events.push('layout');
      return 680;
    }
  };
  const browserRoot = {
    document: { getElementById: id => id === 'flashcard' ? card : null },
    updateCard() {
      events.push('write-next-answer');
      return 'updated';
    }
  };

  assert.equal(navigation.install(browserRoot), true);
  assert.equal(browserRoot.updateCard(), 'updated');
  assert.deepEqual(events, ['remove:none', 'layout', 'write-next-answer']);
  assert.equal(card.style.transition, '');
  assert.equal(flipped, false);
  assert.equal(navigation.install(browserRoot), false);
});

test('navigation leaves an already-front-facing card unchanged', () => {
  const events = [];
  const card = {
    style: { transition: '' },
    classList: {
      contains: () => false,
      remove: () => events.push('unexpected-remove')
    },
    get offsetWidth() {
      events.push('unexpected-layout');
      return 680;
    }
  };
  const browserRoot = {
    document: { getElementById: () => card },
    updateCard: () => events.push('write-next-answer')
  };

  navigation.install(browserRoot);
  browserRoot.updateCard();
  assert.deepEqual(events, ['write-next-answer']);
});

test('the browser guard survives the later spelling-layer wrapper', async () => {
  const events = [];
  let flipped = true;
  const card = {
    style: { transition: '' },
    classList: {
      contains: name => name === 'flipped' && flipped,
      remove: () => {
        flipped = false;
        events.push(`remove:${card.style.transition}`);
      }
    },
    get offsetWidth() {
      events.push('layout');
      return 680;
    }
  };
  const context = vm.createContext({
    card,
    events,
    document: { getElementById: () => card }
  });
  context.window = context;
  vm.runInContext(
    'function updateCard(){events.push("write-next-answer")} function nextCard(){updateCard()}',
    context
  );
  vm.runInContext(await readFile(path.join(root, 'flashcard-navigation.js'), 'utf8'), context);
  vm.runInContext(`
    const guardedUpdateCard = updateCard;
    updateCard = function () {
      events.push('spelling-before');
      guardedUpdateCard();
      events.push('spelling-after');
    };
    nextCard();
  `, context);

  assert.deepEqual(events, [
    'spelling-before',
    'remove:none',
    'layout',
    'write-next-answer',
    'spelling-after'
  ]);
});

test('all 80 English and Arabic group pages load the answer-flash guard', async () => {
  const english = await groupPages('groups');
  const arabic = await groupPages(path.join('AR', 'groups'));
  assert.equal(english.length, 40);
  assert.equal(arabic.length, 40);

  for (const [files, expectedPath] of [
    [english, `../flashcard-navigation.js?v=${assetVersion}`],
    [arabic, `../../flashcard-navigation.js?v=${assetVersion}`]
  ]) {
    for (const file of files) {
      const source = await readFile(file, 'utf8');
      const label = path.relative(root, file);
      const runtimeMatch = source.match(/<script src="([^"?]*flashcard-runtime-en\.js)(?:\?[^"?]*)?"><\/script>/);
      const styleMatch = source.match(/<link rel="stylesheet" href="([^"?]*flashcard-common-en\.css)(?:\?[^"?]*)?">/);
      const runtimeSource = runtimeMatch
        ? await readFile(path.resolve(path.dirname(file), runtimeMatch[1]), 'utf8')
        : source;
      const styleSource = styleMatch
        ? await readFile(path.resolve(path.dirname(file), styleMatch[1]), 'utf8')
        : source;
      assert.match(styleSource, /transition:transform \.6s cubic-bezier/, label);
      assert.match(runtimeSource, /function updateCard\(\)/, label);
      assert.equal(source.split(expectedPath).length - 1, 1, label);
      const runtimePosition = runtimeMatch ? source.indexOf(runtimeMatch[0]) : source.indexOf('function updateCard()');
      assert.ok(source.indexOf(expectedPath) > runtimePosition, label);
    }
  }
});
