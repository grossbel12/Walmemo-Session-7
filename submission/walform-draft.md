# WalForm submission draft

## Prompt chosen and why

**Exam Mistake Memory — Education & Personalised Learning.** Recurring personal mistakes are more valuable than generic study notes, and the prompt’s cross-session behavior is objectively testable.

## What I changed

I replaced in-place update language with an append-only event model using stable topic IDs and event keys. V2 defines MISTAKE, RETRY, PROGRESS, MASTERED, RELAPSE, and SESSION_SUMMARY events; reconstructs state from recall; stores minimal positive evidence only for previously failed topics; makes weakness scores transparent; and checks exact keys before retrying uncertain writes.

## Verified results

- Baseline: 10 real questions, 0 fully correct, 1 partially correct, 9 wrong.
- Storage: 10/10 bulk jobs completed; all ten mistake records were recalled; summary stored separately.
- V2 session-boundary recall: 10/10 prior mistake records recovered without restating them.
- Weakness Briefing: five topics ranked with visible score components.
- Assisted-answer integrity: the user delegated the answers, so V2 created 0 PROGRESS and 0 MASTERED events instead of inventing learning evidence.
- Indexed duplicate check: one exact match found and the write was skipped.
- Pre-index race: two different blob IDs were created for one identical event key, proving recall-before-write is not atomic.
- Second calendar day: health remained OK and all ten baseline weaknesses were recalled again; the assisted review correctly created zero PROGRESS events.

The prompt was used on 2026-08-12 and 2026-08-13. This submission does not describe that as “a few days” and does not claim multi-day mastery, relapse, or timeout safety.

## Bug or friction point

After successful wallet authorization, fresh MCP SSE bridges repeatedly received `HTTP 429: ip_active_cap`; on Windows, the client then hit a libuv `UV_HANDLE_CLOSING` assertion. The official REST SDK worked with the same credentials and relayer, isolating the failure to MCP connection lifecycle recovery.

## Improvement idea for Walrus Memory

Add first-class server-side idempotency keys for remember jobs. The empirical duplicate pair shows that a semantic recall check cannot guarantee uniqueness during asynchronous indexing. Also add an authenticated status/close operation so a reconnecting MCP client can replace a stale SSE session.

## Required links

- Improved prompt and evidence: https://github.com/grossbel12/Walmemo-Session-7
- Issue on original prompt repository: https://github.com/EAZITECH1/exam-mistake-memory/issues/1
- Published Medium article: https://grossbelbir.medium.com/i-turned-my-ai-tutors-memory-into-an-append-only-learning-ledger-e4c22e6f8029
- X reply under the Session 7 announcement: https://x.com/grossbel12/status/2087832093795500334
- Optional MemWal bug report: [LINK]

## Submission route

WalForm, retaining eligibility for positions 8–10 as described on the hackathon page.
