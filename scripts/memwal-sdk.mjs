import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MemWal } from "../.memwal-runtime/node_modules/@mysten-incubation/memwal/dist/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.dirname(here);
const credentialsPath = path.join(process.env.USERPROFILE ?? process.env.HOME, ".memwal", "credentials.json");
const credentials = JSON.parse(await fs.readFile(credentialsPath, "utf8"));

const memwal = MemWal.create({
  key: credentials.delegatePrivateKey,
  accountId: credentials.accountId,
  serverUrl: credentials.relayerUrl,
  namespace: "sui-walrus",
});

function field(section, name) {
  return section.match(new RegExp(`^- ${name}: (.+)$`, "m"))?.[1]?.trim() ?? "unknown";
}

function sessionOneItems(markdown) {
  return markdown
    .split(/^## Event /m)
    .slice(1)
    .map((section) => {
      const eventNo = section.match(/^(\d+)/)?.[1] ?? "unknown";
      return {
        namespace: "sui-walrus",
        text: [
          "Exam Mistake Memory original-prompt baseline",
          `record_key=baseline-2026-08-12-01/${eventNo}`,
          `topic=${field(section, "Topic")}`,
          `question=${field(section, "Question")}`,
          `my_error=${field(section, "Misconception")}`,
          `correct=${field(section, "Correct")}`,
          `severity=${field(section, "Severity")}`,
          "misses=1",
          "session_id=2026-08-12-01",
        ].join(" | "),
      };
    });
}

const [action = "health", rawArg = ""] = process.argv.slice(2);

try {
  if (action === "health") {
    const result = await memwal.health();
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else if (action === "recall") {
    const result = await memwal.recall({
      query: rawArg || "Exam Mistake Memory original-prompt baseline record_key",
      namespace: "sui-walrus",
      limit: 50,
    });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else if (action === "bulk-session-1") {
    const ledger = await fs.readFile(path.join(workspace, "evidence", "session-1-events.md"), "utf8");
    const items = sessionOneItems(ledger);
    const existing = await memwal.recall({
      query: "Exam Mistake Memory original-prompt baseline record_key baseline-2026-08-12-01",
      namespace: "sui-walrus",
      limit: 50,
    });
    const existingText = existing.results.map((item) => item.text).join("\n");
    const pending = items.filter((item) => !existingText.includes(item.text.match(/record_key=[^ |]+/)?.[0] ?? "no-key"));
    if (pending.length === 0) {
      process.stdout.write(`${JSON.stringify({ status: "already-confirmed", total: items.length }, null, 2)}\n`);
    } else {
      const accepted = await memwal.rememberBulk(pending);
      const final = await memwal.waitForRememberJobs(
        accepted.job_ids,
        pending.map((item) => item.namespace),
        { pollIntervalMs: 2000, timeoutMs: 180000 },
      );
      process.stdout.write(`${JSON.stringify({ accepted, final }, null, 2)}\n`);
    }
  } else if (action === "summary-session-1") {
    const summaryKey = "record_key=baseline-2026-08-12-01/summary";
    const existing = await memwal.recall({
      query: summaryKey,
      namespace: "sui-walrus",
      limit: 20,
    });
    const found = existing.results.find((item) => item.text.includes(summaryKey));
    if (found) {
      process.stdout.write(`${JSON.stringify({ status: "already-confirmed", blob_id: found.blob_id }, null, 2)}\n`);
    } else {
      const text = [
        "Exam Mistake Memory original-prompt baseline session summary",
        summaryKey,
        "session_id=2026-08-12-01",
        "questions=10",
        "correct=0",
        "partially_correct=1",
        "wrong=9",
        "weak_topics=Walrus blob confidentiality; blob ID versus Sui object ID; deterministic blob IDs; permanent versus deletable blobs; certificate of availability; erasure-coded read availability; Walrus Memory durable and indexed layers; memory space identity; asynchronous indexing; relayer trust boundary",
        "next_session=prioritize the first three weak topics, then availability and Walrus Memory architecture",
      ].join(" | ");
      const result = await memwal.rememberAndWait(text, "sui-walrus", { pollIntervalMs: 2000, timeoutMs: 180000 });
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    }
  } else {
    throw new Error(`Unknown action: ${action}`);
  }
} finally {
  memwal.destroy();
}
