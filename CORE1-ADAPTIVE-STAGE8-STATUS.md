# English for Noar — Core I adaptive Stage 8

## Scope

- Property: E‑Vocab Band II, Core I, Groups 01–20.
- Branch: `codex/core1-adaptive-stage8-rollout-20260826`.
- Base: `940b3bce2756fed47f01bd07e0940b14c637c07f`.
- Publication state: published to `main` by fast-forward at `1d8816d468d8255e3a8b4afb96d2991f66423dd2`.
- Exclusions: Core II, Arabic pages and Read Along behavior are unchanged.

## Adaptive rollout

- Every Core I group uses ten-word missions drawn from its complete authentic 54- or 55-record source pool.
- Consecutive missions rotate through the full pool before wrapping.
- Every group uses the Stage 6 adaptive route: meaning recognition, retrieval or context, temporary two-choice support after repeated errors, and two distinct successful depths for mastery.
- Response timing now passes through the local-progress wrapper, so fast success can open retrieval during real tracked play.
- Existing local ○ / ◐ / ✓ progress, reset behavior and complete-group mastery rules are preserved.

## Icon-only controls

- Block Quest action buttons use icons only: start and next `▶`, replay `↻`, back `↩`, word audio `🔊`, and game sound `🎵` / `🔇`.
- Answer choices remain textual because they are learning content.
- Every icon-only control retains a Hebrew `aria-label` and matching tooltip.

## Treasure visuals

- The launch screen uses a graphical lost-treasure scene with an island, route, target and glowing gold chest.
- Introductory copy is reduced to one short title, one short instruction line and one local-privacy line.
- The score marker shows a clear stack of three gold coins instead of one ambiguous coin.

## Privacy and boundaries

- No learner identity, answer text, translation, voice, cookie, server storage or new network request was added.
- Existing analytics continues to ignore answer choices and practice audio.
- Only the existing start and completion measurements remain available.

## Verification

- Repository tests: 53/53 passed.
- JavaScript syntax checks passed.
- `git diff --check` passed.
- All 20 Core I pages load the Stage 8 cache-busted practice assets.
- All 20 full source pools are covered across consecutive ten-word missions.
- No Core II or Arabic page loads the new Stage 8 asset versions.
- Visual browser verification passed on the immutable branch preview for Group 02 launch/play and Group 20 launch.
- The lost chest, three-coin score icon and icon-only controls rendered correctly with no horizontal overflow at 1363 × 936.
- All visible icon-only controls retained Hebrew accessibility labels and tooltips; answer choices remained textual.
- GitHub Pages deployment and Jekyll site CI completed successfully for the published commit.
- The public Group 02 page passed live launch, gameplay, reward and next-icon verification.

## Post-release layout fixes

- The layout and PNG asset fix was published to `main` at `2d13e694a04077c769750af27b657dbac1dbd908`.
- Primary and reverse questions now show only the target word or meaning; the long reverse prompt, visible phase label and redundant example clue were removed.
- The prompt and audio control now share one compact question row; answer choices remain the dominant area instead of being pushed below an empty region.
- Launch, score and milestone visuals now reuse a transparent 768 × 768 PNG 3D cartoon treasure chest overflowing with gold coins.
- Visible progress is reduced to the percentage, correct feedback removes redundant text, and the transition keeps only its animated visual bar.
- The follow-up branch `codex/stage8-chest-only-20260826` removes the decorative map, route, target, island and frame from the launch illustration; only the transparent treasure chest remains.
- Repository tests: 53/53 passed; JavaScript syntax and `git diff --check` passed.
- Browser visual verification of the chest-only follow-up remains pending because the branch is still local. Nothing from that follow-up has been uploaded or republished.

## Next action

Upload the chest-only follow-up branch for visual review only after explicit approval. Publishing to `main` requires a separate explicit approval.
