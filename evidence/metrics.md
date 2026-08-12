# Before/after metrics

Complete only from the three session logs.

| Metric | Original prompt | V2 | Evidence |
|---|---:|---:|---|
| Previously failed topics recalled on cold start | TBD | TBD | TBD |
| Repeat errors on recalled topics | TBD | TBD | TBD |
| Duplicate or near-duplicate memory events | TBD | TBD | TBD |
| Correct streaks durable across sessions | TBD | TBD | TBD |
| Topics reaching evidenced mastery | 0 | TBD | Session 1 baseline |
| Weakness rankings with visible rationale | 0 (no prior history) | TBD | Session 1 baseline |
| Ambiguous write results safely handled | 0 by prompt; operational SDK fallback recovered the records | TBD | Session 1 log + blob IDs |

## Interpretation rules

- Use counts, not percentages, when the sample is smaller than 20 questions.
- Do not count a memory as recalled if the user restated it in the new task.
- Do not count prompted or hinted answers as PROGRESS.
- Do not claim timeout safety was empirically proven unless a real timeout occurred.
- Report both successes and failures.
