# WalForm submission draft

## Prompt chosen and why

**Exam Mistake Memory — Education & Personalised Learning.** I chose it because recurring mistakes are more valuable than generic study notes, and its multi-session behavior can be tested objectively.

## What I changed

I replaced in-place update language with an append-only event model using stable topic IDs and event keys. The revised prompt stores MISTAKE, RETRY, PROGRESS, MASTERED, and RELAPSE events; reconstructs topic state across sessions; verifies uncertain writes before retrying; and makes weakness scoring transparent.

## Why

Walrus Memory's documented MCP tools do not expose a general update operation. The original mastery rule also needed correct-answer evidence across sessions while simultaneously prohibiting its storage. V2 records minimal positive evidence only for previously failed topics.

## What happened

**[COMPLETE FROM VERIFIED METRICS]**

## Evidence of use

- Session 1 baseline: [LINK]
- Session 2 cold recall: [LINK]
- Session 3 mastery/duplicate test: [LINK]
- Improved prompt: [LINK]

## Bug or friction point

**[REPRODUCIBLE OBSERVATION ONLY]**

## Improvement idea for Walrus Memory

Add first-class idempotency keys or native content-based deduplication to remember jobs, with a status lookup that lets MCP agents safely resolve ambiguous timeouts.

## Required links

- Issue on original prompt repository: [LINK]
- Published Medium article: [LINK]
- X post: [LINK]
- Optional MemWal bug report: [LINK OR NOT FILED]

## Submission route

WalForm, so the entry remains eligible for positions 8–10 as described on the hackathon page.

