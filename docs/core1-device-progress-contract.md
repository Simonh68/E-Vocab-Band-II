# Core I device progress — stage 1 contract

## Goal

Store enough evidence on the learner's own device to show whether each Band II Core I group is not started, in progress or mastered. Stage 1 defines and tests the contract only. It does not connect the store to the game or change the public interface.

## Pedagogical rule

A word is mastered only after correct performance in two distinct signal types:

- `meaning` — English word to Hebrew meaning.
- `recall` — Hebrew cue to English retrieval.
- `context` — English retrieval inside a sentence.

Repeating the same signal does not create mastery. A group receives a completion checkmark only when every current word serial in that group has mastered evidence. Completing a ten-word sample cannot mark a 55-word group as mastered.

## Visible states reserved for later stages

- `not_started` → ○
- `in_progress` → ◐ with a percentage
- `mastered` → ✓

The interface must say that the state is saved on this device. A reset control will be added before rollout.

## Storage and privacy

- Storage key: `efn.band2.core1.progress.v1`.
- Scope: Core I groups 01–20 only.
- Stored values: group number, word serials, successful signal types and timestamps.
- Not stored: name, email, typed answer, Hebrew translation, English word, voice, score, analytics id or permanent learner id.
- If browser storage is blocked, the module falls back to session memory and must not claim that progress was saved to the device.
- Data remains browser- and device-specific and can disappear when site data is cleared.

## Content safety

Every call supplies the current complete list of serials for the group. Progress is calculated only against that list, so a changed group cannot inherit a false completion checkmark from an older or partial list.

## Stage boundary

Stage 1 exports the isolated `core1-progress.js` module and unit tests. No HTML page loads the module yet. The first write from a real activity belongs to stage 2.
