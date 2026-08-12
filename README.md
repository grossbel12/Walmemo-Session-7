# Exam Mistake Memory — Prompt Evolution Entry

Working package for the **Walrus Session 7 — Prompt Evolution** hackathon.

The experiment improves [Exam Mistake Memory](https://github.com/EAZITECH1/exam-mistake-memory/blob/main/prompts/exam-mistake-memory.md) and tests it on a real learning goal: **Sui and Walrus Fundamentals**.

## Central improvement

The original prompt describes memories as if they can be updated in place and asks the agent to carry a three-correct-answer mastery streak across sessions while also forbidding storage of correct answers. The current Walrus Memory MCP tool surface is append-oriented: it provides remember, recall, bulk remember, analyze, restore, and health, but no general update operation.

Version 2 therefore treats the memory space as an **append-only learning event log**:

- mistakes, retries, progress, mastery, and relapse are immutable events;
- each event has a stable topic ID and idempotency key;
- progress events are stored only for previously missed topics;
- mastery can be reconstructed across sessions;
- uncertain writes are verified by recall before retrying;
- weakness scores are reproducible and disclose incomplete recall.

## Repository map

- `prompts/exam-mistake-memory-v2.md` — improved copy-pasteable system prompt.
- `study/` — three-session protocol and answer key.
- `evidence/` — experiment log and metric templates.
- `submission/` — GitHub Issue, Medium, X, and WalForm drafts.
- `SOURCES.md` — primary documentation used for the prompt and quizzes.

## Experiment sequence

1. **Session 1 / baseline:** use the original prompt and answer the diagnostic quiz.
2. **Session 2 / cold recall:** start a fresh Codex task with V2, reconstruct prior mistakes, and retest them.
3. **Session 3 / mastery and relapse:** prove cross-session progress, mastery, spot-check behavior, and duplicate protection.

Public claims remain marked as placeholders until supported by actual session evidence. No result should be published merely because it was expected by the protocol.

## Local setup

Walrus Memory MCP was initially registered in Codex through the documented `npx` configuration. On this Windows host, sandboxed access to the system npm cache made repeated startup unreliable, so the official package is installed into ignored local directory `.memwal-runtime/` and Codex launches its entry point directly with Node.js.

Documented configuration:

```toml
[mcp_servers.memwal]
command = "npx.cmd"
args = ["-y", "@mysten-incubation/memwal-mcp"]
```

After restarting Codex, run `memwal_login`, approve the wallet connection, then verify `memwal_health`. Never paste a seed phrase, private key, password, or verification code into the task.

For the experiment, the official TypeScript SDK is also installed in the ignored runtime directory. It provides a REST fallback when the MCP SSE bridge hits the managed relayer's active-connection cap; it reads the same local credentials and never prints the delegate private key.
