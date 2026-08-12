# Before/after metrics

| Metric | Original prompt | V2 | Evidence |
|---|---:|---:|---|
| Previously failed topics recalled at a new session boundary | n/a | 10 | Session 2 recall output |
| Repeat errors on recalled topics | n/a | not tested | User requested assisted answers |
| Duplicate or near-duplicate memory events | 0 observed | 1 excess duplicate | Session 3 returned two blobs for one event key |
| Correct streaks durable across sessions | Not representable under original no-correct-answer rule | not tested | No unassisted answers were supplied |
| Topics reaching evidenced mastery | 0 | 0 | Sessions 1–3 |
| Weakness rankings with visible rationale | 0 | 5 | Session 2 briefing |
| Indexed exact-key duplicate stopped | n/a | 1 | Session 2 duplicate check |
| Pre-index duplicate safely prevented | n/a | no | Session 3 race evidence |
| Ambiguous write results safely handled | 0 by prompt; operational SDK fallback recovered baseline records | not proven | No true timeout; race exposed instead |

## Interpretation

- The sample is reported as counts, not percentages.
- All ten recalled topics came from Walrus Memory; the user did not restate them in Session 2.
- Assistant-provided answers are not counted as PROGRESS.
- No mastery, relapse, 24-hour retention, or timeout-safety claim is made.
- The duplicate result is empirical: two distinct blob IDs contain the same exact Session 3 event key.
