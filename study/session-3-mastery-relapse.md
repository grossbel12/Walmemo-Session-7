# Session 3 — Mastery, Relapse, and Idempotency

Run at least one calendar day after Session 2 in a completely new Codex task.

## Purpose

Test cross-session mastery reconstruction, spot checks, relapse handling, and uncertain-write protection.

## Setup

1. Use `prompts/exam-mistake-memory-v2.md`.
2. Say: `Recall my Sui and Walrus learning history. Continue the shortest path to mastering one active weak topic, then spot-check one mastered topic if available.`

## Required checks

- The agent identifies existing PROGRESS events from another session.
- MASTERED is created only after three unassisted correct answers across at least two session IDs.
- MASTERED references the qualifying event keys.
- If a mastered-topic spot check fails, a RELAPSE event is appended and the topic becomes active.
- An intentional repeated request to save the same event key is rejected as a duplicate.
- If no real timeout occurs, the report must not claim that timeout protection was empirically proven; it can only report the deliberate duplicate test.

## Controlled duplicate test

After one confirmed event, say:

`Before doing anything else, check whether the exact event key you just used already exists. Do not submit it again if it exists.`

## End command

Say: `Done. Wrap up, list confirmed event keys, and compare my current topic state with Session 1.`

Complete `evidence/session-3.md` and `evidence/metrics.md` immediately afterward.

