# I Turned My AI Tutor’s Memory into an Append-Only Learning Ledger

*Draft: replace every bracketed field with verified evidence before publication.*

I chose Exam Mistake Memory because it focuses on the most valuable part of studying with an AI tutor: not the material it can explain, but the mistakes I personally keep making. I tested it while learning Sui, Walrus, and Walrus Memory across three short sessions in Codex.

The original prompt has a sharp idea. Wrong answers become durable memories, every new session begins with a weakness briefing, and quizzes focus on recurring misconceptions instead of restarting from generic material. In my first session, I answered ten diagnostic questions about blob IDs, availability certificates, encryption, memory spaces, and the Walrus Memory relayer. **[BASELINE RESULT AND EVIDENCE]**

The test exposed a state-management mismatch. The prompt tells the agent to find an existing mistake and “update” its miss count. But the current Walrus Memory MCP tools are append-oriented: they remember and recall durable blobs, without a normal in-place update operation. The prompt also defines mastery as three correct answers across two sessions while telling the agent not to store correct answers. That makes the streak impossible to prove after the conversation ends.

My rewrite treats memory as an append-only learning ledger. Each durable event has a stable topic ID and event key. A failed answer becomes `MISTAKE` or `RETRY`. A correct answer becomes `PROGRESS` only if that topic was previously failed, so first-attempt correct answers still do not pollute memory. Three unassisted progress events across two sessions create a `MASTERED` event. A later failed spot check creates `RELAPSE` instead of silently rewriting history.

The event key also provides a practical duplicate guard. If a write times out, the agent waits and recalls that exact key before retrying. This matters because Walrus Memory writes are asynchronous: an accepted write can still be indexing when immediate recall returns empty.

In a fresh Codex task on the second session, **[COLD-RECALL RESULT]**. The improved weakness briefing showed **[SCORE EXAMPLE]** and explained its ranking instead of presenting an unexplained “top five.” In the final session, **[MASTERY OR DUPLICATE-TEST RESULT]**.

The most useful surprise was **[HONEST SURPRISE]**. The main friction point was **[REPRODUCIBLE FRICTION]**. My improvement idea for Walrus Memory is native idempotency support for remember jobs, so agents do not have to implement exact-key recall around uncertain writes.

Would I use it again? **[YES/NO AND WHY]**. The experiment changed the tutor from a collection of remembered notes into an auditable model of how my understanding changed over time. That is a better fit for immutable storage—and a much more honest definition of learning.

