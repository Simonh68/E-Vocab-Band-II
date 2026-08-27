# Band II segmented practice contract

## Scope and release state

- Branch: `codex/band2-segments-stage1-20260827`.
- Base: published `main` commit `d40b93447be88d043bb9d8a0e0fc297399018757`.
- This stage defines and tests the segment model only. No HTML page imports `practice-segments.js`, so the public or local learner experience is unchanged.
- No push, merge or publication is part of Stage 1.

## Stage 2 pilot delta

- Branch: `codex/band2-segments-stage2-20260827`.
- Base: local Stage 1 contract commit `65611208a781e91e586bb92c59f39523fef93d65`.
- The shared session engine now consumes this contract only when `segmented: true` and `coverageFirst: true`.
- Activation is restricted to Hebrew Core I Groups 02 and 20. The other 18 Core I groups, all Core II groups and all Arabic groups keep their existing route and do not import `practice-segments.js`.
- A retry that cannot preserve the two-question gap inside the current ten-screen budget is carried across the checkpoint. When a resumed mission has fewer than two remaining authentic screens, non-persisted `depth-gap` questions provide the required spacing; they cannot add progress evidence.
- The session exposes separate segment, group-coverage and group-mastery counters without changing the current checkpoint presentation. Celebration UI belongs to a later stage.
- No answer content, identity, network request, analytics field, cookie or new persistent state is added.
- No push, merge or publication is part of Stage 2.

## Stage 3 pilot delta

- Branch: `codex/band2-segments-stage3-ui-20260827`.
- Base: published Stage 2 pilot commit `2c392dcb48132bb646483946e55302c1c830c6e0`.
- The learner interface now presents the segment number and screen count separately from full-group coverage and mastery in Hebrew Core I Groups 02 and 20 only.
- Every completed segment pauses at a short graphical checkpoint. A direct icon-only action continues to the next segment or the final summary, and group navigation remains available at the checkpoint and final summary.
- Treasure chests open by completed segment, after segments 2, 4 and 6. The former percentage thresholds remain unchanged outside the segmented pilot.
- The checkpoint adds no answer content, persistence, identity, network request or analytics field. The session engine and coverage-first scheduling rules are unchanged.
- No push, merge or publication is part of Stage 3.

## Canonical segment model

- A complete Band II vocabulary group contains 54 or 55 authentic items. A 53-item manifest is invalid and blocks rollout until its source data is repaired.
- A perfect 54-item route contains six segments of nine question screens: `9 + 9 + 9 + 9 + 9 + 9`.
- A perfect 55-item route contains five segments of nine screens and a final segment of ten: `9 + 9 + 9 + 9 + 9 + 10`.
- Each segment ends with a short graphical checkpoint. Perfect-route checkpoints occur after overall coverage counts `9, 18, 27, 36, 45, 54/55`.
- Treasure chests open after segments 2, 4 and 6: overall perfect-route coverage `18, 36, 54/55`.
- A segment never exceeds ten actual question screens. If a missed item cannot return after two other questions within that budget, it is carried into the next segment instead of returning too soon.
- A checkpoint does not reset group coverage, mastery evidence, score, pending corrections or navigation state.

## Coverage, retry and mastery invariants

- Every unfinished item is presented before any already-correct item can repeat.
- A correct item does not repeat during the same coverage pass.
- Only a missed item returns, with exactly two intervening questions whenever it returns within a segment.
- A tail error is never retried immediately or after only one intervening question; it crosses the checkpoint when necessary.
- Errors may add question screens to the overall route without a finite total cap, but they may not extend one segment beyond ten screens.
- Mastered words do not enter a required future mission. An explicit optional replay may be offered only after the group is already complete.
- Full mastery still requires two distinct successful evidence types for every item. Repeating one evidence type does not satisfy the second depth.

## Progress and completion language

- The learner interface must expose three different facts rather than one overloaded percentage:
  - short segment progress: segment number, questions answered and current segment target;
  - full-group coverage: authentic items covered out of 54/55;
  - full-group mastery: items with two distinct evidence types out of 54/55.
- Finishing the first complete coverage pass is `coverage_complete`; it is not `mastered`.
- Only two-depth completion of every group item may display the group mastery checkmark or the final mastery celebration.

## Exit, resume and privacy

- Successful evidence is saved locally immediately, not only at a segment boundary.
- Leaving during a segment must not discard successful evidence. On return, unseen and unfinished items remain ahead of mastered items, and the learner can continue within one clear action.
- Pending corrections and the short-segment position may be stored locally or reconstructed deterministically, but no answer content is sent anywhere.
- No learner identity, answer text, translation, voice, new cookie, server record, analytics field or network request may be added.

## Interface contract for later stages

- Intermediate celebrations are brief, graphical and low-text. They keep a direct continue action into the next segment.
- Action controls use icons only. Every icon-only control has both an `aria-label` and a matching tooltip.
- Group navigation remains available in play, at intermediate checkpoints and at final completion.
- Core I is the first pilot surface. Core II and Arabic receive the same shared behavior only after the pilot passes; Arabic Groups 32 and 36 must first regain their missing authentic items.
- Read Along and irregular-verbs routes remain separate decisions and are not silently converted by the Core vocabulary rollout.

## Stage 1 automated acceptance

- The pure contract produces the exact six-segment plans and celebration/chest checkpoints for both supported group sizes.
- Retry placement enforces a two-question gap and the ten-screen segment cap.
- Segment, group-coverage and group-mastery counters are structurally separate.
- Coverage completion and mastery completion are distinct states.
- A 53-item manifest is rejected.
- All 80 vocabulary pages remain untouched and do not load the dormant segment module.

## Stage 2 automated acceptance

- Only Hebrew Core I Groups 02 and 20 import the segment engine, before the session engine; the other 78 vocabulary pages remain outside the pilot.
- Perfect 54- and 55-item sessions preserve the exact six-segment plans and present every authentic item once.
- In-segment and cross-checkpoint corrections retain two intervening question screens, and no segment exceeds ten screens.
- A one-item resumed mission preserves the correction gap without recording its two `depth-gap` screens as learning evidence.
- Fresh, partial and repeated-error simulations for both pilot manifests terminate with no pending correction and valid separated counters.

## Stage 3 automated acceptance

- Only Groups 02 and 20 load the Stage 3 panel, rollout and practice assets; the other 78 vocabulary pages keep their prior asset route.
- The pilot panel displays segment, coverage and mastery as three separate facts and pauses after each completed segment.
- A perfect route shows six checkpoints, uses a ten-screen final segment only for a 55-item group, and opens exactly three chests after segments 2, 4 and 6.
- Icon-only controls at checkpoints and final completion expose matching `aria-label` and `title` text, with previous/next group navigation in both places.
- Reduced-motion, forced-colors and analytics privacy safeguards continue to cover the segmented interface.
