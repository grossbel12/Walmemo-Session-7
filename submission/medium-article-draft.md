# I Turned My AI Tutor’s Memory into an Append-Only Learning Ledger

I chose Exam Mistake Memory because the most useful thing an AI tutor can remember is not generic course material, but the mistakes I personally repeat. I tested the prompt while learning Sui, Walrus, and Walrus Memory in Codex.

The original prompt has a strong premise. Wrong answers become durable memories, each later session begins with a weakness briefing, and revision targets recurring misconceptions. In my baseline, I answered ten diagnostic questions about blob IDs, availability certificates, erasure coding, encryption, memory spaces, and the managed relayer. I got zero fully correct, one partially correct, and nine wrong. All ten records completed on Walrus in one bulk request. A later semantic recall returned all ten, and the session summary was stored separately.

The experiment exposed a state-management mismatch. The prompt tells the tutor to find an existing mistake and “update” its miss count, but Walrus Memory’s current remember/recall workflow is append-oriented rather than a normal in-place database update. The prompt also defines mastery as three correct answers across at least two sessions while saying not to store correct answers. Once the conversation ends, the next session cannot prove the streak.

My rewrite treats memory as an append-only learning ledger. Every event has a stable topic ID and event key. A failed answer becomes `MISTAKE` or `RETRY`. A correct answer becomes `PROGRESS` only when the topic was previously failed. Three unassisted progress events across two sessions can create `MASTERED`; a later failure becomes `RELAPSE`. The current topic state is reconstructed from events instead of pretending an immutable blob was edited.

At the next logical session boundary, V2 recalled all ten baseline mistakes without the user restating them. It ranked five high-severity topics and showed the calculation for each: severity 3 × one recalled failure + recency 3 = weakness score 6. It also disclosed recall coverage instead of presenting the ranking as guaranteed lifetime history.

The user asked the assistant to provide all five review answers. I therefore labelled the review `ASSISTED` and recorded zero `PROGRESS` events. This is an important result: the new prompt did not manufacture mastery from tutor-supplied answers. All sessions were completed on the same day at the user’s request, so I make no 24-hour retention claim.

The duplicate experiment produced the biggest surprise. Once an event was indexed, recalling its exact key found one match and correctly skipped the repeated write. But two close invocations for a new Session 3 summary created two different blobs containing the same exact event key before indexing made the first write reliably discoverable. Client-side recall-before-write reduces duplicates, but it is not atomic. Native idempotency keys or a server-side uniqueness guarantee would solve this cleanly.

There was also MCP lifecycle friction. After successful wallet authorization, new SSE bridges repeatedly received `ip_active_cap`, and the Windows client hit a libuv assertion after the 429. The official TypeScript SDK remained healthy with the same credentials, completing storage and recall successfully.

Would I use this approach again? Yes. It produced an auditable weakness model and refused to overstate learning. The remaining work is clear: real unassisted answers across time for mastery, and service-level idempotency for asynchronous writes. Immutable storage fits education well when the prompt models learning as evidence, not mutable counters.

Improved prompt and evidence: **[PUBLIC REPOSITORY LINK]**
