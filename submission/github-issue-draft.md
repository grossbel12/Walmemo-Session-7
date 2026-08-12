# GitHub Issue draft for the original prompt repository

## Title

Replace in-place “updates” with append-only learning events and make mastery reconstructable

## Body

I used Exam Mistake Memory for a real Sui and Walrus study experiment with three logical session boundaries. Two related prompt rules created a state-management gap:

1. The dedup rule tells the agent to “update” a matching entry and increment `misses`, but the documented Walrus Memory MCP surface exposes remember/recall/analyze/restore operations rather than a general in-place update tool.
2. Mastery requires three correct answers across at least two sessions, while the prompt also says not to store correct answers. A new session therefore lacks durable evidence needed to reconstruct the streak reliably.

### Suggested change

Treat the memory space as an append-only event log:

- use stable `topic_id` and `event_key` values;
- append `MISTAKE`, `RETRY`, `PROGRESS`, `MASTERED`, and `RELAPSE` events;
- save PROGRESS only for previously failed topics, preserving the low-noise goal;
- derive current state from recalled events instead of claiming that an older blob was updated;
- when a write times out, recall the exact event key before retrying to reduce duplicates.

I implemented and tested this approach in an improved prompt here: **[PUBLIC REPOSITORY OR GIST LINK]**.

### Before/after evidence

- Original behavior: 10 baseline mistakes stored and recalled: **[EVIDENCE LINK]**
- V2 recovered all 10 at the next session boundary and ranked five with visible score components: **[EVIDENCE LINK]**
- An indexed exact-key check skipped a duplicate, but a pre-index race produced two blobs for one key: **[EVIDENCE LINK]**
- The user delegated the review answers, so V2 correctly created zero PROGRESS or MASTERED events: **[EVIDENCE LINK]**

### Why this matters

The change aligns the prompt with immutable durable storage, makes mastery auditable when qualifying evidence exists, and avoids presenting a new blob as an in-place mutation. It also preserves the original prompt's strongest design choice: correct first-attempt answers remain noise-free and are not stored.

The duplicate result also shows the limit of a prompt-only guard: recall-before-write is useful after indexing, but native server-side idempotency is needed for atomic protection during index lag.

I would be happy to adapt the format to the repository's preferred style.
