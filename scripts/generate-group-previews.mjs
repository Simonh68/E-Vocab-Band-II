import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const baseUrl = "https://simonh68.github.io/E-Vocab-Band-II";
const font = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf";
const bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function metaBlock({ group, core, count, language, previewUrl, pageUrl }) {
  const groupNo = String(group).padStart(2, "0");
  const support = language === "he" ? "Hebrew support" : "Arabic support";
  const title = `Core ${core} · Group ${groupNo} | E-Vocab Band II`;
  const description = `${count} Band II vocabulary words with ${support.toLowerCase()}, examples, audio and spelling practice.`;
  const alt = `E-Vocab Band II, Core ${core}, Group ${groupNo}, ${support}`;
  return `\n<meta name="description" content="${escapeHtml(description)}">\n<link rel="canonical" href="${pageUrl}">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="English for Noar">\n<meta property="og:title" content="${escapeHtml(title)}">\n<meta property="og:description" content="${escapeHtml(description)}">\n<meta property="og:url" content="${pageUrl}">\n<meta property="og:image" content="${previewUrl}">\n<meta property="og:image:secure_url" content="${previewUrl}">\n<meta property="og:image:type" content="image/jpeg">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="${escapeHtml(alt)}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${escapeHtml(title)}">\n<meta name="twitter:description" content="${escapeHtml(description)}">\n<meta name="twitter:image" content="${previewUrl}">`;
}

function renderCard({ output, group, core, count, language, samples }) {
  mkdirSync(path.dirname(output), { recursive: true });
  const groupNo = String(group).padStart(2, "0");
  const support = language === "he" ? "HEBREW SUPPORT" : "ARABIC SUPPORT";
  const accent = core === "II" ? "#ffcf38" : "#33e6ff";
  const secondary = language === "he" ? "#8b5cf6" : "#19d3ae";
  const sampleLine = samples.join("   •   ");
  const draw = [
    "fill '#07132f' rectangle 0,0 1200,630",
    "fill '#0e2b68' circle 1050,80 760,80",
    "fill '#35177d' circle 1130,620 830,620",
    "fill '#0a1533' stroke '#2563eb' stroke-width 4 roundrectangle 690,70 1125,560 42,42",
    `fill '#252255' fill-opacity 1 stroke '${secondary}' stroke-opacity 0.7 stroke-width 3 roundrectangle 730,110 1085,520 34,34`,
    `fill-opacity 1 stroke-opacity 1 fill '${accent}' stroke none roundrectangle 86,185 410,258 34,34`,
    "fill '#172542' fill-opacity 1 stroke '#4cc9ff' stroke-opacity 0.55 stroke-width 2 roundrectangle 82,282 610,430 34,34",
    "fill '#202e4c' fill-opacity 1 stroke '#5865f2' stroke-width 2 roundrectangle 82,466 610,542 26,26",
    "fill-opacity 1 stroke-opacity 1",
    "fill '#ffffff' circle 111,91 105,91",
    `fill '${accent}' circle 132,91 126,91`,
  ].join(" ");
  const args = [
    "-size", "1200x630", "xc:#07132f",
    "-draw", draw,
    "-font", bold, "-fill", "white", "-pointsize", "37", "-draw", "text 155,104 'ENGLISH FOR NOAR'",
    "-font", bold, "-fill", "#061029", "-pointsize", "48", "-draw", `text 130,239 'CORE ${core}'`,
    "-font", bold, "-fill", "white", "-pointsize", "82", "-draw", "text 116,388 'GROUP'",
    "-font", bold, "-fill", "white", "-pointsize", "250", "-gravity", "center", "-draw", `text 305,0 '${groupNo}'`, "-gravity", "northwest",
    "-font", bold, "-fill", "white", "-pointsize", "29", "-draw", `text 115,514 '${count} WORDS   ·   ${support}'`,
    "-font", font, "-fill", "#bed5ff", "-pointsize", "25", "-draw", `text 86,590 '${sampleLine.replaceAll("'", "’")}'`,
    "-quality", "88", "-sampling-factor", "4:2:0", output,
  ];
  const result = spawnSync("convert", args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || `convert failed for ${output}`);
}

for (const language of ["he", "ar"]) {
  for (let group = 1; group <= 40; group += 1) {
    const groupNo = String(group).padStart(2, "0");
    const relativePage = language === "he" ? `groups/group-${groupNo}.html` : `AR/groups/group-${groupNo}.html`;
    const pagePath = path.join(root, relativePage);
    let html = readFileSync(pagePath, "utf8");
    const match = html.match(/const words=(\[.*?\]);<\/script>/s);
    if (!match) throw new Error(`Vocabulary data not found in ${relativePage}`);
    const words = JSON.parse(match[1]);
    const samples = [...new Set(words.map((word) => word.en).filter((word) => word.length <= 15))].slice(0, 3);
    const core = group <= 20 ? "I" : "II";
    const previewRelative = `assets/group-previews/${language}/group-${groupNo}.jpg`;
    const previewUrl = `${baseUrl}/${previewRelative}`;
    const pageUrl = `${baseUrl}/${relativePage}`;
    renderCard({ output: path.join(root, previewRelative), group, core, count: words.length, language, samples });
    html = html.replace(/\n?<meta name="description"[\s\S]*?<meta name="twitter:image"[^>]*>/, "");
    html = html.replace(/\n?<link rel="canonical"[^>]*>/, "");
    const titleEnd = html.indexOf("</title>") + "</title>".length;
    if (titleEnd < "</title>".length) throw new Error(`Title not found in ${relativePage}`);
    html = `${html.slice(0, titleEnd)}${metaBlock({ group, core, count: words.length, language, previewUrl, pageUrl })}${html.slice(titleEnd)}`;
    writeFileSync(pagePath, html);
  }
}

console.log("Generated and wired 80 unique group preview cards.");
