# Read Along — AI maintenance guide

> Internal document. Do not link this file from any public page.
>
> Last verified: 2026-08-21 against the runtime produced by `catalog.js`, `additional-stories.js`, and `story-rewrites.js` on commit `6a2237127cb21c6b7e424aba8a870f43e0ee03f4`.

## 1. Purpose and non-negotiable principles

Read Along is a static, mobile-first collection of illustrated English stories for Israeli students in grades 7–10. It combines graded narrative writing, browser text-to-speech, tappable meaning units, Hebrew or Simple English support, and a visual anchor.

The main goal is not to make every text equally easy. The goal is to control linguistic load while keeping a real event, conflict, emotional movement, choice, consequence, and implicit value. The lesson must grow from action and result; it must not sound like a sermon.

The current group names `A1` and `A2` are site labels for two school groupings. Do not describe them as formal CEFR certification. Do not claim that all stories inside one group are identical in difficulty.

Current runtime totals:

| Age layer | A1 | A2 | English Speakers | Total | Scene range |
|---|---:|---:|---:|---:|---:|
| Level 1 · grades 7–8 | 12 | 12 | 12 | 36 | 8–17 |
| Level 2 · grades 8–9 | 12 | 12 | 12 | 36 | 10–20 |
| Level 3 · grades 9–10 | 12 | 13 | 14 | 39 | 12–23 |
| **Total** | **36** | **37** | **38** | **111** | **8–23** |

Language and support:

- `A1`: the support group. Relatively direct syntax, useful Band II vocabulary, explicit sequence, and natural repetition. Tappable help is Hebrew.
- `A2`: the more independent group. Longer texts, controlled complex sentences, time links, cause and consequence, and inference. Tappable help is Hebrew.
- `ES`: English Speakers. More demanding vocabulary and syntax, implicit motive, and more complex chronology. Support is Simple English, not Hebrew.
- The collection is still under review. Update language, meaning units, support, and images when classroom feedback or pedagogical review justifies a change.

## 2. Runtime architecture and load order

The site has no build step and no backend. GitHub Pages serves static HTML, JavaScript, and image files.

Both `index.html` and `reader.html` load the data in this exact order:

```html
<script src="catalog.js?v=17"></script>
<script src="additional-stories.js?v=17"></script>
<script src="story-rewrites.js?v=18"></script>
```

The order is part of the data model:

1. `catalog.js` creates `window.STORIES`, `window.LEVELS`, and `window.GROUPS`.
2. `additional-stories.js` pushes more stories into `window.STORIES`, adds the three newcomer stories, and supplies initial parent guidance where needed.
3. `story-rewrites.js` mutates the complete array. It assigns narrative structures, replaces or rebuilds story scenes, applies corrections, splits scenes into pedagogical units, selects active covers, and writes final parent-facing metadata.

Never inspect only one source file and assume it represents the published story. The source of truth for the live catalogue is the final in-memory `window.STORIES` after all three files have executed.

## 3. Complete file map

```text
Read-Along/
├── index.html                    Public story chooser and public teacher-guide link
├── reader.html                   Story reader, TTS, unit interaction, support, navigation
├── about.html                    Older public overview; not a current story-count source
├── teacher-guide.html            Public English teacher guide and format/language hub
├── teacher-guide-he.html         Public Hebrew translation of the teacher guide
├── teacher-guide.pdf             Public printable English teacher guide
├── AI-MAINTENANCE-GUIDE.md       This internal maintenance guide; never link publicly
├── STORY-CATALOG.md              Internal stable-number catalogue of all 111 stories
├── catalog.js                    Original story definitions, base constructors, levels/groups
├── additional-stories.js         Added story bank, newcomer stories, initial parent metadata
├── story-rewrites.js             Final narrative rewrites, phrase splitting, cover overrides
├── favicon.svg                   Browser icon
├── preview-read-along.jpg        1200×630 social sharing image
├── generate-simple-covers.mjs    Legacy SVG cover generator; not the target image pipeline
├── covers/                       54 older 1600×900 cover files; currently not active at runtime
├── images/                       10 images used by the standalone `start/` prototype
├── scenes/                       12 generic square WebP files; 30 stories still point here
├── story-covers-v2/              57 legacy portrait SVG covers; currently not active at runtime
├── story-covers-v3/              78 upgraded 1200×800 WebP covers; mapped by `upgradedCovers`
├── story-scenes/                 Per-story legacy episode folders; three first frames remain active
├── scene-specs/                  Four internal visual continuity/specification documents
└── start/index.html              Standalone early road-safety prototype, not the main reader
```

Important current image facts:

- 78 active stories use `story-covers-v3/*.webp`, all verified as 1200×800.
- 30 stories use 12 shared `scenes/*.webp` files, currently 362×362.
- 3 stories use a first frame in `story-scenes/`: two files are 480×540 and one is 627×627.
- There are 92 unique active cover paths and no missing active cover file at the verification date.
- The target rule for every new or upgraded cover is 1200×800 WebP. Do not claim that all current legacy covers already meet it.
- `about.html` still contains an older count. Do not use it as a catalogue source. Updating it is a separate scoped task.

## 4. Story object after all scripts load

A final story normally has this shape:

```js
{
  id: 'new-2-a2-community-survey', // complete unique runtime ID
  level: 2,                        // 1, 2, or 3
  group: 'A2',                     // 'A1', 'A2', or 'ES'
  en: 'The Community Survey',      // English title
  he: 'הסקר הקהילתי',              // Hebrew title
  descEn: '...',                   // short English premise; avoid spoilers
  descHe: '...',                   // short Hebrew premise
  image: 'story-covers-v3/community-survey.webp', // final active cover
  sceneImages: null,               // currently normalized to one visual anchor
  simple: false,                   // true only for ES/Simple English support
  vocabularyTrack: 'Lists A–D',    // vocabulary source label
  scenes: [/* final scenes, each made of tappable units */],
  parentSummary: '...',            // Hebrew for A1/A2; empty for ES after rewrite
  parentLesson: '...',             // Hebrew for A1/A2; empty for ES after rewrite
  parentPedagogy: '...',            // Hebrew or English group-specific goals
  parentSummaryEn: '...',          // English parent summary, used for ES
  parentLessonEn: '...',           // English parent message, used for ES
  plotStructureEn: 'Discovery',    // one of the narrative structures
  plotStructureHe: 'גילוי בעקבות רמזים',
  imageContext: 'Cover anchored to the original story event: ...',
  parentLevel: '...'               // final level explanation shown in parent modal
}
```

Fields may be present earlier and then replaced. Always check the final runtime object before editing documentation or publishing.

### Constructors and helpers

- `catalog.js` uses `C(...)` to construct a story, `S(...)` to create two initial English/support pairs, and `P(...)` for one pair.
- `additional-stories.js` uses `A(...)` and `padScenes(...)` to create the added bank.
- `story-rewrites.js` is the final transformation layer. Its `pedagogicalScene(...)` output is what `reader.html` expects.

## 5. Scene and reading-unit structure

After `story-rewrites.js`, the shape is:

```js
scenes: [
  [ // one scene / one displayed sentence
    [englishUnit, unitSupport, fullSceneMeaning],
    [englishUnit, unitSupport, fullSceneMeaning]
  ]
]
```

Meaning of each element:

1. `englishUnit`: the exact tappable and spoken English constituent.
2. `unitSupport`:
   - A1/A2: Hebrew support aligned to that English unit.
   - ES: the full Simple English explanation. It is intentionally repeated for each unit, because ES support explains the meaning of the sentence rather than translating each fragment.
3. `fullSceneMeaning`:
   - A1/A2: full Hebrew meaning for the displayed sentence.
   - ES: full Simple English explanation.

Example for A1/A2:

```js
[
  ['Noam arrived at a new school,', 'נועם הגיע לבית ספר חדש,', 'נועם הגיע לבית ספר חדש, והשאיר את התיק על גבו בזמן ההפסקה.'],
  ['and kept his backpack on', 'והשאיר את התיק על גבו', 'נועם הגיע לבית ספר חדש, והשאיר את התיק על גבו בזמן ההפסקה.'],
  ['during break.', 'בזמן ההפסקה.', 'נועם הגיע לבית ספר חדש, והשאיר את התיק על גבו בזמן ההפסקה.']
]
```

The same full meaning is stored in every unit so `reader.html` can take `scene[0][2]` when the scene opens and can take `p[1]` when a particular unit is tapped.

## 6. IDs and stable catalogue numbers

### Runtime story ID

Every story must have one complete unique `id`. Use the full value everywhere:

- URL: `reader.html?id=<full-id>`
- `localStorage`: `ra-last-story`
- `narrativeRevisions`, `narrativeMetadata`, `sceneCorrections`, `upgradedCovers`
- image directories, scene specifications, tests, and internal catalogue

Never use a title, slug fragment, array position, or the visible number on a filtered home-page card as an identifier. Added stories use full IDs such as `new-3-es-winter-stage`. Older stories use IDs such as `l2-a1-wallet`.

### Stable internal number

`STORY-CATALOG.md` preserves `RA-001` through `RA-111`. These numbers came from the existing audit index and must not change because of sorting, filtering, new titles, or array order. New stories added later must receive new numbers after the current maximum; never renumber the existing 111.

## 7. Pedagogical phrase splitting

The final unit boundary must follow meaning, syntax, and spoken rhythm. It is not an equal-size word split.

### Current implementation

`story-rewrites.js` contains:

- `splitEnglishConstituents(text, 6)`: dynamic-programming splitter with a maximum of six English words per unit.
- `chunkBoundaryScore(...)`: rewards punctuation and natural starts such as coordinators, subordinators, prepositions, determiners, and pronouns.
- `alignSupportToChunks(...)`: aligns Hebrew or Simple English support to the English boundaries.
- `pedagogicalScene(...)`: creates the final three-element reading units and repairs accidental one-word fragments.

The splitter should prefer complete constituents such as:

- noun phrases: `the quiet student`
- verb phrases: `did not answer`
- prepositional phrases: `after the lesson`
- clauses: `when the bell rang`
- collocations: `make a choice`
- formulaic language: `No problem`

### Grammar glue that must stay attached

Do not end a unit after a word that makes the phrase incomplete. In particular, keep these with the relevant phrase whenever possible:

- determiners: `a`, `an`, `the`, `this`, `that`, `my`, `their`, `each`, `every`, and similar items
- auxiliaries: forms of `be`, `have`, and `do`, plus `will`, `would`, `can`, `could`, `should`, `must`, `may`, `might`
- negation: keep `not` with the auxiliary or verb phrase
- infinitive marker: keep `to` with the infinitive
- prepositions: keep a preposition with its complement
- incomplete quantifiers or modifiers: do not leave `both`, `all`, `only`, `most`, or a possessive at a unit edge when their head follows

### Selective focus-word isolation

The only words intentionally allowed to stand alone are:

```text
yet · still · already · again · together
```

Isolate one only at a natural sentence edge where it carries useful focus or nuclear stress. Its Hebrew gloss must be exact and aligned (`עדיין`, `כבר`, `שוב`, `יחד`). Do not isolate other accidental one-word fragments.

### Support alignment

- A1/A2: align the Hebrew help to the same syntactic boundary. Use Hebrew cue words and punctuation where helpful. Do not cut the Hebrew mechanically by proportional word count when a meaningful boundary is available.
- ES: use a clear Simple English explanation for the whole sentence. The explanation should normally stay at A2 English or below except for necessary professional terms, which must be explained.
- The full-scene meaning must preserve the complete event. A unit gloss must not contradict or silently change it.

## 8. Reader behavior

`reader.html` performs the following sequence:

1. Reads the `id` query parameter and finds the exact story. If it is missing or invalid, it falls back to the first story.
2. Shows an intro screen with title, cover, premise, and scene count.
3. `Start Story` moves from index `-1` to scene `0`.
4. The displayed sentence is built from clickable `.sentence-part` spans.
5. Tapping the whole sentence runs `all()`, which speaks each unit in order with a 150 ms gap.
6. Tapping one unit runs `part(i)`, speaks only that unit, highlights it, and changes the support panel to `p[1]`.
7. Opening a scene shows `scene[0][2]`, the full meaning.
8. Previous/Next buttons move between scenes. A horizontal swipe on the image also moves between scenes on touch devices.
9. Browser `speechSynthesis` uses `en-US`, rate `0.8`, and prefers a natural US English voice when available.
10. `localStorage` remembers the full ID in `ra-last-story`, so the home page can offer Continue Reading inside the same level/group.

Do not describe the sentence playback as a single full-sentence utterance. It is a sequential playback of the pedagogical units.

## 9. Literary writing rules

Every story needs:

- a concrete opening event, not an abstract topic statement
- a real problem, surprise, mistake, need, or disagreement
- emotional movement shown through action, dialogue, silence, body language, or a concrete detail
- a decision or change in behavior
- a consequence that does not erase the difficult moment
- a value or lesson that emerges from actions and results
- an ending that shows continuing change, responsibility, repair, or a new choice

Use first person, second person, plural forms, and dialogue where they make the language feel close to teenage life. Dialogue must sound natural, short, and purposeful. Do not force every story into third-person institutional language.

Keep the tone respectful and age-appropriate, but do not make the plot childish. Avoid distant phrases such as “the students understood the importance of…” when a later action can show the change instead.

### Narrative structures

The rewrite layer currently varies stories among 12 structures:

1. Unwelcome surprise
2. Help from a friend
3. Mistake and repair
4. Misunderstanding
5. Discovery
6. Race against time
7. Second attempt
8. Unexpected ability
9. Promise under pressure
10. False appearance
11. Chain reaction
12. Role reversal

Do not assign the same arc repeatedly inside one group when another structure fits. Story variety is a content requirement, not decoration.

### Level control

- Control vocabulary, syntax, sentence length, inference, and story length separately. Do not simplify only by shortening.
- Repeat useful words in new contexts, not through isolated drills inside the story.
- Advanced grammar may appear only when it clarifies chronology, cause, contrast, or emphasis. Do not add Past Perfect or inversion as decoration.
- Keep `descEn`/`descHe` spoiler-light: state the premise, not the decisive moment or outcome.
- Preserve one central narrative and value. Remove attractive details that create a second unrelated plot.

## 10. Image production and review

### Target technical specification

Every new or upgraded cover must meet all of these requirements:

- WebP
- exactly 1200×800 pixels
- 3:2 landscape ratio
- export quality 82
- file name in lowercase kebab-case
- location normally `Read-Along/story-covers-v3/`
- one final active mapping in `upgradedCovers`

Do not stretch, crop blindly, or wrap a portrait image to fake 3:2. Regenerate or recompose it.

### Visual style

- Cinematic storybook realism for teenagers: warm, natural, and serious enough for grades 7–10; never infantile.
- Natural human proportions, expressions, hands, and gaze.
- A clear story event, decision, tension, object, or relationship; the image is a comprehension anchor, not generic decoration.
- Contemporary Israeli school or community setting when the story calls for it.
- Modest winter clothing as the default project wardrobe: long sleeves, long trousers or long skirts, and realistic layers. Preserve any stricter continuity sheet.
- Every visible boy or man must wear a clearly visible colored knitted kippah. Keep its color and placement consistent across a sequence.
- When sky is visible, include a clearly white cloud as a recurring style cue. Do not invent a large empty sky only to add the cloud.
- Preserve faces, age, build, hairstyle, clothing, kippah, glasses, bags, phones, tools, and key objects across a multi-scene sequence.
- A later scene may change light or body language only when time or the emotional arc justifies it.

### Visual prohibitions

Never publish an image with:

- written text, captions, speech bubbles, readable signs, readable phone posts, usernames, labels, or generated lettering
- logos, trademarks, watermarks, branded products, or a platform-specific social-media interface
- distorted hands or fingers, missing or extra fingers, duplicated limbs, impossible anatomy, fused objects, or broken perspective
- unexplained duplicate people, duplicate bags, duplicate phones, or objects that jump between positions
- changed faces, apparent ages, clothes, kippot, glasses, hair, or body shape inside one sequence
- a missing kippah on a visible boy or man, a barely visible kippah, or unexplained kippah-color changes
- summer or immodest clothing when the required project brief is winter/modest clothing
- childish cartoon styling, exaggerated comedy faces, fantasy transformations, or a glossy advertising pose
- physical violence, humiliation, panic, police activity, trophies, victory celebrations, excessive hugging, or public spectacle unless the exact story event requires it and the depiction is pedagogically appropriate
- an event from a different story, a decorative scene unrelated to the narrative, or an image that reveals the final outcome before the reader reaches it
- hostile bullying when the text shows quiet isolation, instant happiness when trust is still rebuilding, or a perfect result when the ending remains mixed
- unsafe tool use, unsafe traffic behavior, unsafe interaction with animals, or an adult/child role that contradicts the story

Add story-specific prohibitions to the prompt. The four files in `scene-specs/` show the expected level of continuity detail.

### `upgradedCovers`

`story-rewrites.js` contains:

```js
const upgradedCovers = {
  '<full-story-id>': 'story-covers-v3/<cover-file>.webp'
};
```

Use the full story ID. A file existing in `story-covers-v3/` does nothing until the mapping is active. Conversely, a mapping to a missing file breaks both the chooser and reader.

### Cover check before publication

For each changed cover:

1. Load the final runtime story and confirm `story.image` is the intended path.
2. Confirm the file exists, is WebP, and is exactly 1200×800.
3. Compare the image with the final rewritten story, not an earlier catalogue premise.
4. Check event, characters, age, gaze, hands, fingers, clothing, colored kippot, continuity, white cloud when sky is visible, and all prohibited content.
5. View the cover in the home-page 3:2 crop and in the reader.
6. Update `STORY-CATALOG.md` without changing the stable RA number.

## 11. Desktop and mobile UX

### Home chooser (`index.html`)

- The chooser stores `ra-level` and `ra-group` in `localStorage`.
- Level tabs show the three overlapping grade bands.
- Group tabs show A1, A2, and English Speakers.
- Cards are filtered from the final `STORIES` array.
- The visible `Story 1`, `Story 2`, and so on are numbers inside the current filter only. They are not stable IDs.
- Desktop uses a three-column card grid. Mobile uses two compact columns and keeps level/group selection near the top.
- The teacher guide link must remain clear but secondary, and visible on both phone and desktop.

### Reader (`reader.html`)

- Desktop and mobile both show the sentence, visual, support, progress, and navigation.
- Mobile uses a touch-friendly stacked layout and swipe navigation on the visual.
- The cover is currently a single visual anchor because `story-rewrites.js` clears legacy `sceneImages` after taking the first frame. Do not claim that each scene has a distinct active illustration.
- The parent panel is Hebrew/RTL for A1/A2 and English/LTR for ES.

## 12. Accessibility and directionality

Preserve or improve all of the following:

- semantic links and native buttons for navigation and controls
- visible `:focus-visible` outlines
- meaningful `aria-label` text for icon-only controls and images
- live support updates through `aria-live="polite"`
- keyboard activation of every `.sentence-part` with Enter or Space
- keyboard operation of native Previous/Next, Home, Help, Parent, and close controls
- sufficient target size for touch controls
- useful image alternative text based on the displayed sentence or story
- `prefers-reduced-motion` support for nonessential motion
- English story text and Simple English in LTR
- Hebrew support and Hebrew parent content in RTL
- no visual order that changes the logical reading or keyboard order

Current limitation: the main reader does not implement global Left/Right arrow shortcuts or Escape-to-close. Do not claim that it does. If adding them later, test that arrows do not conflict with screen readers, text selection, or focused buttons.

TTS is browser-dependent. Test with at least one current desktop browser and one phone. If no preferred US voice exists, the code falls back to another English voice.

## 13. Safe GitHub workflow

The remote repository is the source of truth. Never begin by assuming the local checkout is current.

### Before editing

```bash
git status --short --branch
git remote -v
git fetch --prune origin
git rev-parse HEAD
git rev-parse origin/main
git log --oneline --left-right HEAD...origin/main
```

Rules:

- If the worktree is dirty, inspect every changed path. Do not reset, clean, checkout, stash, delete, or overwrite user work without understanding it.
- If local and remote diverge, preserve local work on a named branch before integrating remote changes.
- Work on a scoped feature branch. Do not create the first task commit directly on the default branch.
- Reuse and update an existing relevant document or audit file rather than creating a duplicate.
- Edit only requested paths. Stage explicit paths with `git add -- <path>...`; never use `git add .`, `git add -A`, or `git add --all`.

### Before publishing

```bash
git diff --check
git diff --stat
git diff -- Read-Along/index.html Read-Along/teacher-guide.html \
  Read-Along/teacher-guide-he.html Read-Along/teacher-guide.pdf \
  Read-Along/AI-MAINTENANCE-GUIDE.md Read-Along/STORY-CATALOG.md
git status --short
git fetch --prune origin
git log --oneline --left-right HEAD...origin/main
```

If the remote moved, integrate it safely and rerun all tests. Never make a blind push.

When ordinary `git push` is rejected because the environment does not allow it, use an authorized GitHub publishing tool only after checking the current remote SHA. Send targeted file updates or a scoped commit/branch, verify the returned commit SHA, and confirm that no unrelated path changed. Never use a tool call to overwrite the whole repository from a stale local snapshot.

## 14. Image commit rule

Every image batch commit must contain exactly:

- five image files; and
- `Read-Along/story-rewrites.js`.

That is exactly six changed paths. The JavaScript change must update the relevant `upgradedCovers` entries for those five full story IDs. Do not mix documentation, HTML, other images, or unrelated code into an image batch commit. If fewer than five images are ready, do not publish that image batch yet unless the project owner explicitly changes this rule.

Before committing an image batch:

```bash
git diff --name-only --cached
```

Count the paths and inspect each one. A commit message should identify the batch without claiming visual review that was not performed.

## 15. Mandatory checks

Always run at least:

```bash
node --check Read-Along/story-rewrites.js
git diff --check
```

Also run a runtime catalogue validation that loads all three data files and checks:

- exactly 111 stories for the current catalogue task
- 111 unique full IDs
- 111 unique stable RA numbers in `STORY-CATALOG.md`
- every story has a nonempty title, level, group, scenes array, and active image path
- every active image exists
- every scene has at least one unit
- every final unit has exactly three string values
- every English unit has 1–6 words, and a one-word unit is one of the allowed focus words
- `simple === true` only for ES stories
- A1/A2 use Hebrew support and ES uses Simple English

If the catalogue later grows beyond 111, update the expected count intentionally in code, documentation, and tests. Do not weaken the uniqueness checks.

## 16. QA checklists

### Content and literary review

- [ ] One concrete central event
- [ ] Conflict or difficulty is visible
- [ ] Emotional movement is shown, not merely named
- [ ] Dialogue sounds like teenagers and serves the plot
- [ ] Choice has a consequence
- [ ] Ending shows the message through action
- [ ] No sermon, generic moral paragraph, or institutional voice
- [ ] Plot structure differs appropriately from nearby stories
- [ ] Premise/summary does not spoil the decisive moment

### Language and level review

- [ ] Vocabulary fits the group and age layer
- [ ] Syntax is controlled but natural
- [ ] A1 is not made childish
- [ ] A2 adds challenge for a reason
- [ ] ES language is demanding but the help is genuinely simple
- [ ] Advanced grammar clarifies meaning rather than displaying complexity
- [ ] Pronouns and names have clear reference
- [ ] Punctuation and quotation marks are consistent

### Phrase and support review

- [ ] Each unit is a meaningful constituent
- [ ] No mechanical equal-word split
- [ ] Determiners remain with noun phrases
- [ ] Auxiliaries and negation remain with verb phrases
- [ ] `to` remains with an infinitive
- [ ] Prepositions remain with complements
- [ ] Only allowed focus words stand alone
- [ ] Hebrew unit support matches the English boundary
- [ ] Full Hebrew/Simple English meaning matches the complete sentence
- [ ] ES support is LTR and contains no accidental Hebrew

### Visual review

- [ ] Final rewritten event matches the image
- [ ] WebP, 1200×800, 3:2, quality 82 for every new/upgraded cover
- [ ] Active path exists and is mapped by full ID
- [ ] Natural hands, fingers, limbs, gaze, and scale
- [ ] Modest winter clothing
- [ ] Every visible boy/man has a consistent colored kippah
- [ ] White cloud appears when sky is visible
- [ ] Faces, clothes, props, and setting remain continuous
- [ ] No text, logo, watermark, readable screen, or prohibited content
- [ ] Home-card crop and reader display are both acceptable

### Technical and link review

- [ ] Home cards use complete IDs in `reader.html?id=...`
- [ ] The English `Teacher guide` link works on phone and desktop
- [ ] The English guide links to `teacher-guide.pdf` and `teacher-guide-he.html`
- [ ] Both HTML teacher guides return to `index.html`
- [ ] No public link points to `AI-MAINTENANCE-GUIDE.md` or `STORY-CATALOG.md`
- [ ] Keyboard activation works on reading units and native controls
- [ ] TTS reads the exact visible English unit
- [ ] Hebrew is RTL; English/Simple English is LTR
- [ ] No active image or local link is missing
- [ ] No unrelated file changed

## 17. Building a similar site from scratch

Use this sequence:

1. **Define the audience.** Name the grades, language background, group labels, device use, and what help each group receives.
2. **Define the pedagogical contract.** Decide vocabulary sources, syntax limits, scene ranges, support language, TTS rate, and what is not being claimed as an official standard.
3. **Choose a data model.** Give every story a permanent full ID. Separate title, premise, active image, scenes, support mode, and parent/teacher metadata.
4. **Design several plot structures.** Include surprise, help, repair, misunderstanding, discovery, second attempts, pressure, and role reversal. Avoid one repeated template.
5. **Write the story event first.** Establish conflict, emotional movement, choice, result, and an implicit value before grading the language.
6. **Grade language by group.** Control vocabulary, syntax, length, inference, and repetition. Keep teen subject matter even at the supported level.
7. **Write support separately.** Produce full Hebrew meaning or Simple English first; then align unit help without changing the event.
8. **Split into constituents.** Use linguistic boundaries, a short maximum, grammar-glue safeguards, and selective focus isolation.
9. **Create the illustration brief.** State the exact event, continuity bible, required objects, expressions, clothing, colored kippot, white-cloud rule, composition, and prohibitions.
10. **Generate and normalize images.** Review visually, then export 1200×800 WebP at quality 82. Never publish generation output without hands, text, continuity, and event checks.
11. **Build the chooser.** Filter by age layer and group; store the learner’s choice locally; use complete IDs in links.
12. **Build the reader.** Show an intro, one sentence/scene at a time, tappable units, sequential TTS, full meaning, unit support, progress, buttons, and touch navigation.
13. **Add accessibility from the start.** Semantic controls, focus visibility, keyboard activation, alternative text, live support, reduced motion, RTL/LTR, and screen-reader testing.
14. **Create internal catalogue and QA scripts.** Stable serials, unique-ID checks, active-image checks, scene-shape checks, and review statuses must exist before release.
15. **Test representative stories.** At minimum, test one story from every age/group cell, the shortest and longest stories, Hebrew and Simple English, desktop and phone, keyboard, swipe, and TTS.
16. **Publish from a synchronized branch.** Fetch, inspect, stage exact paths, test, commit a coherent unit, publish without overwriting remote work, and verify the public URLs.
17. **Collect classroom feedback.** Treat the first release as reviewable. Record the exact story, scene, device, and issue before changing content.

## 18. Final release record

For every maintenance task, record in the commit or internal notes:

- base remote commit
- exact changed files
- story IDs affected
- whether language review was manual or only structural
- whether visual review was manual or only file/dimension validation
- tests run and their results
- final commit SHA and public URL when applicable

Never turn an automated existence or syntax check into a claim of completed pedagogical, linguistic, or visual review.
