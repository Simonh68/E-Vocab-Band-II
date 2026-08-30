import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const GROUP_PATHS = Object.freeze([
  ...Array.from({ length: 40 }, (_, index) => `groups/group-${String(index + 1).padStart(2, '0')}.html`),
  ...Array.from({ length: 40 }, (_, index) => `AR/groups/group-${String(index + 1).padStart(2, '0')}.html`)
]);

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function extractWordsJson(source, label = 'group page') {
  const marker = '<script>const words=';
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Missing words payload in ${label}`);
  const start = markerIndex + marker.length;
  if (source[start] !== '[') throw new Error(`Invalid words payload start in ${label}`);

  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') quoted = false;
      continue;
    }
    if (character === '"') quoted = true;
    else if (character === '[') depth += 1;
    else if (character === ']') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`Unterminated words payload in ${label}`);
}

export function extractWords(source, label) {
  return JSON.parse(extractWordsJson(source, label));
}

export function extractBodyMarkup(source, label = 'group page') {
  const start = source.indexOf('<body>');
  const end = source.indexOf('<script>const words=');
  if (start < 0 || end < start) throw new Error(`Missing static body boundary in ${label}`);
  return source.slice(start, end);
}

export function extractPilotBlocks(source) {
  const spellingMatch = source.match(/<script>\n(window\.addEventListener\("DOMContentLoaded",[\s\S]*?)\n<\/script>/);
  const styleMatch = source.match(/<style>\n([\s\S]*?)\n<\/style><link rel="stylesheet" href="\.\.\/hebrew-typography\.css/);
  const wordsJson = extractWordsJson(source, 'Group 02');
  const runtimeStart = source.indexOf(';let currentIndex=0;', source.indexOf(wordsJson));
  const runtimeEnd = source.indexOf('</script>', runtimeStart);
  if (!spellingMatch || !styleMatch || runtimeStart < 0 || runtimeEnd < 0) {
    throw new Error('Could not isolate all Group 02 pilot blocks');
  }
  return {
    spelling: spellingMatch[1],
    style: styleMatch[1],
    runtime: source.slice(runtimeStart + 1, runtimeEnd)
  };
}

export async function pageSnapshot(root, relativePath) {
  const source = await readFile(path.join(root, relativePath), 'utf8');
  const wordsJson = extractWordsJson(source, relativePath);
  const words = JSON.parse(wordsJson);
  return {
    path: relativePath,
    wordCount: words.length,
    wordsSha256: sha256(wordsJson),
    bodyMarkupSha256: sha256(extractBodyMarkup(source, relativePath))
  };
}
