# Record-level sense metadata

The same displayed English entry may occur more than once in Lexical Band II. Each occurrence is an independent Ministry-derived record and must keep its own meaning, example, ID, group, order and supplied POS classification.

## Required fields

Every row in the two private source workbooks, every object in `pedagogical-content.json`, and every English activity record carries these fields:

| Field | Meaning |
|---|---|
| `Record sense (source English)` / `record_sense_en` | The record-specific English meaning documented in the source. It is blank when the Ministry-derived row has no explicit English definition. |
| `Record sense (Hebrew)` / `record_sense_he` | The simplest natural Hebrew gloss for this record only. |
| `Repeated entry` / `repeated_entry` | Whether the same normalized English spelling occurs in another record. |
| `Same-entry record IDs` / `same_entry_record_ids` | The serial numbers of the other occurrences. |
| `Sense evidence` / `sense_evidence` | Which source field supports the record sense, or an explicit note that only the gloss and example are available. |
| `Sense scope` / `record_sense_scope` | `record-specific` for repeated spelling and `single-entry` otherwise. |

Repeated spelling is not a conflict and records must never be merged by spelling or POS alone. A different meaning is represented inside each record by its own English/Hebrew sense fields and its links to sibling record IDs. If the available source evidence does not distinguish two plausible meanings, the record requires a teacher decision rather than an automatic change.

## Live example

`degree` occurs in two independent records:

| Serial | Record sense (source English) | Record sense (Hebrew) | Same-entry record IDs |
|---:|---|---|---|
| 262 | temperature | מעלה; טמפרטורה | 1408 |
| 1408 | amount | מידה; דרגה; תואר | 262 |

The displayed word remains `degree` in both records; the record-level metadata prevents one meaning from replacing the other.
