# I Turned My AI Tutor’s Memory into an Append-Only Learning Ledger

I chose **Exam Mistake Memory** for Walrus Session 7 because a tutor that remembers recurring misconceptions is more useful than one producing generic explanations. I tested it while studying Sui, Walrus, and Walrus Memory in Codex on August 12–13.

The original prompt saves wrong answers, begins later sessions with a weakness briefing, and builds revision around the learner’s history. For my baseline, I attempted ten diagnostic questions about blob IDs, availability, encryption, memory spaces, and the relayer. I answered zero fully correctly, one partially correctly, and nine incorrectly. All ten mistake records completed in one bulk operation and returned in a later recall; a session summary was stored separately.

Two state-management problems appeared. The tutor is told to “update” an existing mistake’s miss count, although Walrus Memory’s workflow is append-oriented. The prompt also defines mastery as three correct answers across two sessions while forbidding storage of correct answers, leaving a later session without durable streak evidence.

My improved prompt treats memory as an **append-only learning ledger**. Each event has a stable topic ID and event key. Failures become `MISTAKE` or `RETRY`; an unassisted correct answer on a failed topic becomes `PROGRESS`. Three qualifying events across two sessions may create `MASTERED`; a later failure becomes `RELAPSE`. Current state is reconstructed from history rather than by pretending to mutate blobs.

The before/after difference was visible immediately. V2 recalled all ten baseline weaknesses without the user restating them. It ranked five high-severity topics and displayed the calculation for each: severity 3 × one recalled failure + recency 3 = weakness score 6. It also warned that semantic recall may be incomplete rather than presenting the result as guaranteed lifetime history.

The review produced an important negative result. I asked the assistant to supply the answers. V2 labelled the session `ASSISTED` and created zero `PROGRESS` and zero `MASTERED` events. On August 13, another recall again recovered the baseline weaknesses, but the assisted review was not counted as learning. The experiment spans two calendar days, so I do not describe it as “a few days” or claim mastery.

The biggest surprise came from duplicate protection. After indexing, exact-key recall found one match and skipped a repeat write. Yet two close requests produced distinct blobs with the same key before indexing exposed the first. Recall-before-write is not atomic. My main improvement idea is server-side idempotency for remember jobs.

I also encountered MCP connection friction. Wallet authorization succeeded, but fresh SSE bridges returned `ip_active_cap`; on Windows, the client then hit a libuv assertion. The TypeScript SDK remained healthy with the same credentials. A session-status and stale-connection close endpoint would make recovery clearer.

Would I use the improved prompt again? Yes. It made weaknesses explainable, preserved an auditable history, and—most importantly—refused to invent progress when the evidence did not support it. That is a better match for immutable storage and a more honest model of learning.

**Prompt and evidence:** https://github.com/grossbel12/Walmemo-Session-7

**Suggested improvement on the original repository:** https://github.com/EAZITECH1/exam-mistake-memory/issues/1
