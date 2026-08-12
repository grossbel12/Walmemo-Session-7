# Session 2 — Cold Recall with V2

Run at least one calendar day after Session 1 in a completely new Codex task.

## Purpose

Test whether the improved prompt can recover baseline mistakes, avoid pretending to mutate old blobs, and create durable progress evidence.

## Setup

1. Use `prompts/exam-mistake-memory-v2.md` as the system/task instructions.
2. Say: `Prep me for Sui and Walrus. Start with the Weakness Briefing, then give me five questions one at a time.`
3. Do not tell the agent what went wrong in Session 1.

## Required checks

- The briefing is produced from recall before questions are generated.
- It distinguishes recalled counts from guaranteed lifetime totals.
- It exposes score components and recall coverage.
- Previously failed topics are prioritized.
- Correct unassisted answers on previously failed topics create PROGRESS events.
- Duplicate protection uses exact `event_key` recall.
- No response says that an immutable memory was edited or updated.

## Evidence to capture

- The cold-start briefing.
- At least one exact recalled misconception from Session 1.
- One new failure event and one PROGRESS event.
- Event keys and confirmation states.
- Any friction, unexpected behavior, or failed tool call.

## End command

Say: `Done. Wrap up and show the append-only event ledger for this session.`

Complete `evidence/session-2.md` immediately afterward.

