# Core I device progress — staged implementation status

- Track ID: `EFN-BAND2-CORE1-DEVICE-PROGRESS-20260826`
- Release branch: `codex/core1-device-progress-stage4-20260826`
- Scope: Band II, Core I, groups 01–20
- Publication: approved for `main` in conversation 51
- Public site: `https://simonh68.github.io/E-Vocab-Band-II/`

## Six-stage route

1. [x] Data contract, mastery rules, isolated local-storage module and unit tests.
2. [x] Connect progress writes to a Core I / Group 01 game pilot.
3. [x] Show ○ / ◐ / ✓ for Group 01 on the group list and activity page.
4. [x] Roll out the tested integration to all Core I groups 01–20.
5. [x] Accessibility, privacy, recovery and automated device/browser-fallback QA.
6. [x] Simon review and explicit publication approval.

## Stage 1 decisions

- A word requires two distinct successful signal types; duplicate success in one type is insufficient.
- A group checkmark requires mastery evidence for every current word serial in the full group.
- A ten-word sample never marks a 55-word group as mastered.
- Device storage contains no student identity, word text, answer text, voice or analytics identifier.
- Blocked storage falls back to the current session and is reported as session-only.
- No existing HTML page imports the new module in stage 1.

## Stage 2 decisions

- Only the existing Core I / Group 01 twelve-word pilot activates progress writing.
- A correct English-to-Hebrew target answer records `meaning`; a correct Hebrew-to-English review records `recall`.
- Wrong answers and filler questions do not write evidence.
- Every write is evaluated against all 55 current Group 01 serials, so the twelve-word pilot can show partial progress but can never mark the full group as mastered.
- The progress module loads from the same site only for the enabled pilot. If it cannot load or device storage is blocked, the practice continues without a false persistence claim.
- No ○ / ◐ / ✓ state is visible yet; that interface belongs to stage 3.
- Existing flashcards, Core II, analytics events and public pages remain unchanged. Stage 2 is local and unpublished.

## Stage 3 decisions

- The main group list shows a compact state for Group 01 only: `○`, `◐` with the current percentage, or `✓`.
- The Group 01 activity page shows the same state with a short Hebrew label and an explicit device-local or session-only storage message.
- The display is calculated against a checked manifest of all 55 current Group 01 serials; the manifest is tested against the activity payload so a partial twelve-word round cannot create a false checkmark.
- The activity badge updates immediately after a successful target signal. Wrong answers and filler questions still do not change progress.
- If the progress data or module is unavailable, the interface says that progress is unavailable while practice continues normally; it does not make a false persistence claim.
- Group 02–20, the Arabic-language pages and Core II remain unchanged until stage 4. No network request, analytics event or learner-content field was added.

## Stages 4–6 decisions

- The twelve-word practice and local progress integration are active for all Core I groups 01–20. Core II, Arabic pages and Read Along behavior remain unchanged.
- Every group uses a checked manifest of its complete current serial list. A twelve-word round can show partial progress but cannot create a false completion checkmark.
- The group list and each Core I activity page show ○ / ◐ / ✓. Activity pages explain whether progress is stored on the device or only for the current visit.
- Each Core I activity page provides a keyboard-accessible reset control. Reset requires confirmation, clears only the current group and moves focus to the updated live status.
- No learner identity, answer text, translation, voice, analytics identifier, cookie, network request or server storage was added. Existing analytics continues to ignore practice answers and practice audio.
- Automated checks cover all 20 manifests, the 40 group-page rollout boundary, recovery from blocked/corrupt storage, reset isolation, accessibility markup, forced-colors rules and privacy guards.

## Next conversation

Collect feedback from the published Core I groups; make further changes only by explicit instruction.
