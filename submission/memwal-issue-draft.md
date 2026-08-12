# Walrus Memory bug/friction report draft

## Title

`memwal-mcp` 0.0.6 crashes on Windows after `ip_active_cap` and cannot recover the active bridge

## Environment

- Windows 11
- Codex desktop 26.803.x
- Node.js 24.14.0
- `@mysten-incubation/memwal-mcp` 0.0.6
- `@mysten-incubation/memwal` SDK 0.1.1
- Managed production relayer 0.1.0 / API 1.0.0

## Summary

After a successful `memwal_login`, the MCP transport closed as documented for credential handoff. Subsequent Codex restarts did not expose working `memwal_*` tools to the task. Starting a fresh official stdio client repeatedly failed at the relayer SSE handshake with `HTTP 429` / `MCP rate limit: ip_active_cap`, including after waiting the instructed 30 seconds. On Windows, the MCP process then terminated with a libuv assertion.

The same credentials and relayer remained healthy: the official TypeScript SDK returned `health: ok`, completed a ten-item `rememberBulk` request with 10 successes and 0 failures, and recalled all ten records. The failure therefore appears isolated to SSE MCP session lifecycle/recovery, rather than wallet authorization or the underlying memory APIs.

## Steps to reproduce

1. Configure Codex with the documented stdio server:

   ```toml
   [mcp_servers.memwal]
   command = "npx.cmd"
   args = ["-y", "@mysten-incubation/memwal-mcp"]
   ```

2. Run `memwal_login`, open the returned URL, connect a Sui wallet, and approve `add_delegate_key`.
3. Confirm the browser says `MCP client connected` and that `~/.memwal/credentials.json` was written.
4. Restart Codex as instructed.
5. Attempt `memwal_health` or `memwal_recall`; the original tool transport is closed/not available.
6. Start a fresh `memwal-mcp` stdio client. The bridge reports `ip_active_cap`. Wait 30 seconds and retry; the response persists.

## Observed output

```text
[memwal-mcp] Connecting to https://relayer.memory.walrus.xyz...
[memwal-mcp] fatal: Walrus Memory relayer SSE handshake failed: HTTP 429
{"jsonrpc":"2.0","error":{"code":-32000,"message":"MCP rate limit: ip_active_cap. Try again in 30s."},"id":null}
Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), file src\win\async.c, line 76
```

Account, delegate, and connection-state values are redacted.

## Expected behavior

- Credential handoff should restart/reconnect the same MCP server cleanly, or the next Codex restart should replace the old active SSE session.
- If the per-IP active cap is reached, the client should either reuse/close the existing session or expose a deterministic recovery path.
- A handled 429 must not trigger a native libuv assertion on Windows.

## Impact

- A first-time user can complete wallet authorization successfully yet have no usable memory tools afterward.
- Repeated restarts and the suggested delay do not identify or release the active slot.
- The generic `Transport closed` error hides the actionable 429 from Codex unless debug output is collected manually.

## Workaround

Using the same local credentials with `@mysten-incubation/memwal` 0.1.1 over the REST SDK worked immediately. Health, bulk remember, job polling, and recall all succeeded. This confirms the account and relayer memory APIs were operational while the MCP SSE bridge was blocked.

## Improvement idea

Add an authenticated session-status/close endpoint and have `memwal-mcp` include a client instance ID. On reconnect, the relayer could replace the prior session for that instance instead of consuming another IP slot. Also return the 429 reason through the local MCP transport before shutdown and close Windows async handles gracefully.

## Separate empirical idempotency observation

During the same experiment, an exact-key recall correctly stopped a repeat after the first event was indexed. However, two close invocations for a new event produced two distinct blobs containing the same `event_key` while indexing was still catching up:

- `4ZQ1JEhlvq8GHBwCpYSlU6KwQqTJTr0DiriVXfxiOvo`
- `K01rf-xKlAEqhMzjn8pxIs5tKSc3_SFpbPcIcuv60rQ`

This is expected from an eventually indexed semantic read path, but it means client-side recall-before-write cannot provide atomic idempotency. A native `idempotency_key` accepted by remember endpoints would make uncertain-write recovery deterministic.
