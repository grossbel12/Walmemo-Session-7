# Session 1 evidence log

- Date: 2026-08-12
- Codex task: Current Season 7 task
- Session duration: approximately 15 minutes
- Prompt commit/source:
- Namespace: `sui-walrus`
- Health result: BLOCKED — relayer returned HTTP 429 `MCP rate limit: ip_active_cap`; retry requested after 30 seconds also failed because another connection remained active.
- Login result: SUCCESS — MCP client connected; credentials stored locally for account `0x517d28bb932674604aa0cd629b979e81705ac03f001d2225f2a751a3c1bed88a`.

## Outcome

- Questions attempted: 10
- Correct: 0
- Partially correct: 1
- Wrong: 9
- Distinct weak topics: 10
- Memory writes accepted: 10 via the official TypeScript SDK bulk endpoint after the MCP SSE bridge hit `ip_active_cap`
- Writes confirmed by recall: 10
- Suspected duplicates: 0

## Observed original-prompt behavior

- Did it claim to update an immutable memory?
- Did it preserve positive streak evidence?
- Did it expose recall/indexing uncertainty?
- Did explicit session closure work? Yes — the user's instruction to record all remaining answers as `не знаю` completed the diagnostic and triggered this summary.

## Evidence references

| Claim | Screenshot/output | Tool result or blob/job ID | Notes |
|---|---|---|---|
| Ten baseline mistakes reached durable storage | `evidence/session-1-blobs.md` | 10 job IDs and 10 blob IDs | Bulk result: 10 succeeded, 0 failed |
| Cold recall returned all ten baseline records | SDK recall output | `total: 10` | Query included stable baseline record key prefix |
| Session summary stored | `evidence/session-1-blobs.md` | `2gC39GRgghDkmlQumEdxGFWq4gtctskt9N0mRu-VrAI` | Separate summary blob |

## Honest narrative notes

- What surprised me:
- What surprised me: Wallet authorization succeeded, but a connected/stale MCP session could consume the managed relayer's per-IP active connection allowance without exposing usable tools to the current Codex task.
- Biggest friction: After successful wallet login and multiple Codex restarts, the MCP tool transport was not exposed to the active task. Direct health/recall attempts were rejected by the managed relayer's `ip_active_cap`, even after its suggested 30-second delay. The baseline continued with a local pending-write ledger; no queued event will be described as stored until confirmed.
- What I would change:
- What I would change: Expose active-session diagnostics and a clean reconnect/terminate path, and support a lightweight health check that does not require opening another rate-limited SSE bridge.

## Session summary

- 10 questions attempted: 0 correct, 1 partially correct, 9 wrong.
- 10 weak concepts recorded in the local pending ledger.
- First misconception: ordinary Walrus blobs are public, but the user thought a private key was required to retrieve them.
- Remaining nine topics had no current mental model and were answered `не знаю`.
- All ten mistake events completed successfully on Walrus and were returned by a subsequent recall query. The session summary is stored separately.
- Next session should begin with blob confidentiality, the two Walrus identifiers, and deterministic blob IDs before moving to availability and Walrus Memory architecture.
