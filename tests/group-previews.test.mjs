import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

test("all 80 group pages have unique, complete preview metadata and valid images", () => {
  const images = new Set();
  for (const language of ["he", "ar"]) {
    for (let group = 1; group <= 40; group += 1) {
      const groupNo = String(group).padStart(2, "0");
      const relativePage = language === "he" ? `groups/group-${groupNo}.html` : `AR/groups/group-${groupNo}.html`;
      const html = readFileSync(path.join(root, relativePage), "utf8");
      const expectedImage = `https://simonh68.github.io/E-Vocab-Band-II/assets/group-previews/${language}/group-${groupNo}.jpg`;
      assert.match(html, new RegExp(`<meta property="og:title" content="Core (I|II) · Group ${groupNo} \\| E-Vocab Band II">`));
      assert.match(html, new RegExp(`<meta property="og:image" content="${expectedImage}">`));
      assert.match(html, /<meta property="og:image:width" content="1200">/);
      assert.match(html, /<meta property="og:image:height" content="630">/);
      assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
      assert.equal((html.match(/<meta property="og:image"/g) || []).length, 1);
      images.add(expectedImage);
      const imagePath = path.join(root, `assets/group-previews/${language}/group-${groupNo}.jpg`);
      assert.ok(existsSync(imagePath), imagePath);
      const identify = spawnSync("identify", ["-format", "%wx%h", imagePath], { encoding: "utf8" });
      assert.equal(identify.status, 0, identify.stderr);
      assert.equal(identify.stdout, "1200x630");
    }
  }
  assert.equal(images.size, 80);
});
