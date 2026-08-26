import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("all forty vocabulary groups load the shared Hebrew typography layer", async () => {
  for (let group = 1; group <= 40; group += 1) {
    const name = `group-${String(group).padStart(2, "0")}.html`;
    const source = await readFile(path.join(root, "groups", name), "utf8");
    assert.match(source, /hebrew-typography\.css\?v=20260826-1/, name);
  }
});

test("Hebrew text uses real Heebo weights without compressed letters or shadows", async () => {
  const source = await readFile(path.join(root, "hebrew-typography.css"), "utf8");
  assert.match(source, /family=Heebo:wght@400;500;600;700/);
  assert.match(source, /:lang\(he\)/);
  assert.match(source, /font-family:\s*"Heebo"/);
  assert.match(source, /font-synthesis:\s*none/);
  assert.match(source, /letter-spacing:\s*0/);
  assert.match(source, /text-shadow:\s*none/);
  assert.match(source, /\.translation\[lang="he"\][^{]*\{[^}]*font-weight:\s*700/s);
  assert.match(source, /\.example-he\[lang="he"\][^{]*\{[^}]*font-weight:\s*500/s);
});

test("the Hebrew copyright page shares the same typography layer", async () => {
  const source = await readFile(path.join(root, "copyright.html"), "utf8");
  assert.match(source, /hebrew-typography\.css\?v=20260826-1/);
});
