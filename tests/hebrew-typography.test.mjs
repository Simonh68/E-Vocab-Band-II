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

test("long vocabulary remains inside phone-width flashcards", async () => {
  const source = await readFile(path.join(root, "design-system.css"), "utf8");
  assert.match(source, /\.word \{[^}]*max-width: 100%;[^}]*overflow-wrap: anywhere;/s);
  assert.match(source, /\.translation \{[^}]*max-width: 100%;[^}]*overflow-wrap: anywhere;/s);
  assert.match(source, /@media \(max-width: 560px\) \{[\s\S]*\.word \{[^}]*font-size: clamp\(1\.7rem, 9\.5vw, 3\.2rem\);/);
  assert.match(source, /\.example-en,[\s\S]*\.family-word,[\s\S]*overflow-wrap: anywhere;/);
});

test("all vocabulary groups load the mobile layout revision", async () => {
  for (const directory of ["groups", "AR/groups"]) {
    for (let group = 1; group <= 40; group += 1) {
      const name = `group-${String(group).padStart(2, "0")}.html`;
      const source = await readFile(path.join(root, directory, name), "utf8");
      assert.match(source, /design-system\.css\?v=20260831-mobile1/, `${directory}/${name}`);
    }
  }
});
