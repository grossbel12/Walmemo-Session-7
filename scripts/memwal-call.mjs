import { Client } from "../.memwal-runtime/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js";
import { StdioClientTransport } from "../.memwal-runtime/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js";

const serverEntry = new URL(
  "../.memwal-runtime/node_modules/@mysten-incubation/memwal-mcp/dist/bin/memwal-mcp.js",
  import.meta.url,
);

const [operation = "list", rawArgs = "{}"] = process.argv.slice(2);
const decodedArgs = rawArgs.startsWith("base64:")
  ? Buffer.from(rawArgs.slice(7), "base64").toString("utf8")
  : rawArgs;
const args = JSON.parse(decodedArgs);

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [decodeURIComponent(serverEntry.pathname.replace(/^\/(?:[A-Za-z]:)/, (m) => m.slice(1)))],
  stderr: "inherit",
});

const client = new Client({ name: "exam-mistake-memory-runner", version: "1.0.0" });

try {
  await client.connect(transport);
  let result;
  if (operation === "list") {
    result = await client.listTools();
  } else if (operation === "sequence") {
    result = [];
    for (const call of args.calls) {
      result.push({
        name: call.name,
        result: await client.callTool({ name: call.name, arguments: call.arguments ?? {} }),
      });
    }
  } else {
    result = await client.callTool({ name: operation, arguments: args });
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} finally {
  await client.close();
}
