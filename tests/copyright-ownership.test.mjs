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

test("every HTML page loads the shared ownership layer through analytics", async () => {
  const analytics = await readFile(path.join(root, "analytics.js"), "utf8");
  assert.match(analytics, /ownership\.js\?v=1/);
  for (const file of await htmlFiles(root)) {
    assert.match(await readFile(file, "utf8"), /analytics\.js/, path.relative(root, file));
  }
});
