import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const owner = "שמעון הרצל הלוי גובני";

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git") continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(target));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(target);
  }
  return files;
}

test("declares the exact owner and third-party boundary", async () => {
  const [notice, policy, runtime] = await Promise.all([
    readFile(path.join(root, "COPYRIGHT.md"), "utf8"),
    readFile(path.join(root, "copyright.html"), "utf8"),
    readFile(path.join(root, "ownership.js"), "utf8"),
  ]);
  for (const source of [notice, policy, runtime]) assert.match(source, new RegExp(owner));
  assert.match(notice, /All rights reserved/i);
  assert.match(policy, /משרד החינוך/);
  assert.match(policy, /תכני צד שלישי/);
});

test("limits project-owned material to learning through the live site", async () => {
  const [notice, policy, runtime, guide] = await Promise.all([
    readFile(path.join(root, "COPYRIGHT.md"), "utf8"),
    readFile(path.join(root, "copyright.html"), "utf8"),
    readFile(path.join(root, "ownership.js"), "utf8"),
    readFile(path.join(root, "teacher-guide.html"), "utf8"),
  ]);
  for (const source of [notice, policy, guide]) {
    assert.match(source, /only through the live|רק באמצעות הממשק החי/);
    assert.match(source, /learning|למידה/);
  }
  assert.match(policy, /לא ניתן רישיון להוריד, לחלץ, להעתיק, לבצע איסוף אוטומטי/);
  assert.match(policy, /another database, application, service or product/);
  assert.match(runtime, /learning through the live site only/);
  assert.match(runtime, /No downloading, extraction, copying or redistribution/);
});

test("every HTML page loads the shared ownership layer through analytics", async () => {
  const analytics = await readFile(path.join(root, "analytics.js"), "utf8");
  assert.match(analytics, /ownership\.js\?v=4/);
  for (const file of await htmlFiles(root)) {
    assert.match(await readFile(file, "utf8"), /analytics\.js/, path.relative(root, file));
  }
});

test("documents the pedagogically enhanced database and Hebrew precedence", async () => {
  const [policy, guide, runtime, about] = await Promise.all([
    readFile(path.join(root, "copyright.html"), "utf8"),
    readFile(path.join(root, "teacher-guide.html"), "utf8"),
    readFile(path.join(root, "ownership.js"), "utf8"),
    readFile(path.join(root, "Read-Along", "about.html"), "utf8"),
  ]);
  assert.match(policy, /הגהה לשונית והשבחה פדגוגית מקיפה/);
  assert.match(policy, /הבחנה בין משמעויות של ערכים זהים/);
  assert.match(policy, /הבחירה, הסידור, הסיווג, הארגון, ההצגה והמבנה הפדגוגי/);
  assert.match(policy, /אין להעתיק, לחלץ, לשחזר, לאסוף, להפיץ או לפרסם/);
  for (const source of [policy, guide, runtime, about]) {
    assert.match(source, /הנוסח העברי.*(?:קובע|הקובע)/);
    assert.match(source, /אין להעתיק|No licence is granted/);
  }
  assert.match(about, /גרסת מסד הנתונים של E‑Vocab Band II/);
  assert.match(about, /הגהה לשונית והשבחה פדגוגית מקיפה/);
  assert.match(about, /השימוש מותר ללמידה בלבד ורק באמצעות האתר החי/);
  assert.match(about, /href="\.\.\/copyright\.html"/);
});
