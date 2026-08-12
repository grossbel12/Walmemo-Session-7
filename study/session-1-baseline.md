# Session 1 — Original Prompt Baseline

## Purpose

Generate real mistakes using the unmodified original prompt and observe how it handles durable writes, deduplication language, correct-answer streaks, and session closure.

## Setup

1. Start a fresh Codex task after Walrus Memory tools are available.
2. Use the [original prompt](https://github.com/EAZITECH1/exam-mistake-memory/blob/main/prompts/exam-mistake-memory.md).
3. Configure:
   - Exam/program: `Sui and Walrus Fundamentals`
   - Subject tag: `sui-walrus`
   - Exam date: blank
4. Say: `Run a 10-question diagnostic quiz on Sui, Walrus, and Walrus Memory. Ask one question at a time. Do not give hints before I answer.`
5. Answer naturally without consulting the answer key.

## Diagnostic questions

The agent may paraphrase these, but should test the same concepts.

1. Are ordinary Walrus blobs confidential by default? Explain who can retrieve one.
2. What is the practical difference between a Walrus blob ID and its Sui object ID?
3. Why does uploading identical content twice produce the same blob ID?
4. What changes when a Walrus blob is permanent rather than deletable?
5. What does a Walrus certificate of availability prove?
6. How can a blob remain readable when only one third of storage nodes are available?
7. In Walrus Memory, what is the durable source of truth and what provides fast semantic search?
8. What three values define a Walrus Memory space?
9. Why might recall immediately after a successful remember call return nothing?
10. Which component can see plaintext in the managed Walrus Memory path, and how can a user reduce that trust?

## Evidence to capture

- First health/login result.
- Every wrong or partially wrong answer and the associated memory call.
- Any claim that an older memory was “updated” or a miss count was incremented.
- Any correct answer on a failed topic and whether cross-session progress evidence was stored.
- Timeout, indexing delay, or duplicate behavior.
- The explicit `done` interaction and session summary.

## End command

Say: `Done. Wrap up this session and tell me exactly what you stored, including identifiers and namespaces.`

Complete `evidence/session-1.md` immediately afterward.

