# WalForm submission draft

## Prompt chosen and why

**Exam Mistake Memory — Education & Personalised Learning.** I chose it because recurring mistakes are more valuable than generic study notes, and its multi-session behavior can be tested objectively.

## What I changed

I replaced in-place update language with an append-only event model using stable topic IDs and event keys. The revised prompt stores MISTAKE, RETRY, PROGRESS, MASTERED, and RELAPSE events; reconstructs topic state across sessions; verifies uncertain writes before retrying; and makes weakness scoring transparent.

## Why

Walrus Memory's documented MCP tools do not expose a general update operation. The original mastery rule also needed correct-answer evidence across sessions while simultaneously prohibiting its storage. V2 records minimal positive evidence only for previously failed topics.

## What happened

The baseline produced 10 real weak-topic records: 0 fully correct answers, 1 partially correct answer, and 9 wrong answers. A single bulk request completed 10/10 jobs, semantic recall returned all 10 records, and a separate session-summary blob was confirmed. Multi-day V2 results will be added after Sessions 2 and 3.

## Evidence of use

- Session 1 baseline: [LINK]
- Session 2 cold recall: [LINK]
- Session 3 mastery/duplicate test: [LINK]
- Improved prompt: [LINK]

## Bug or friction point

After successful wallet authorization, the MCP transport closed for credential handoff, but fresh Codex/stdio bridges repeatedly received `HTTP 429: ip_active_cap`, including after the suggested delay. On Windows, the process then hit a libuv `UV_HANDLE_CLOSING` assertion. The official REST SDK worked with the same credentials and relayer, isolating the issue to MCP SSE session recovery.

## Improvement idea for Walrus Memory

Add first-class idempotency keys or native content-based deduplication to remember jobs, plus an authenticated status/close operation that lets a reconnecting MCP client replace its stale SSE session and safely resolve ambiguous writes.

## Required links

- Issue on original prompt repository: [LINK]
- Published Medium article: [LINK]
- X post: [LINK]
- Optional MemWal bug report: [LINK OR NOT FILED]

## Submission route

WalForm, so the entry remains eligible for positions 8–10 as described on the hackathon page.
