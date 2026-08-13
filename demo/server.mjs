import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const videoPath = path.join(here, "exam-mistake-memory-demo.webm");

const server = http.createServer(async (request, response) => {
  if (request.method === "GET" && (request.url === "/" || request.url === "/index.html")) {
    const html = await fs.readFile(path.join(here, "index.html"));
    response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    response.end(html);
    return;
  }

  if (request.method === "GET" && request.url === "/video.webm") {
    const video = await fs.readFile(videoPath);
    response.writeHead(200, {
      "content-type": "video/webm",
      "content-length": video.length,
      "cache-control": "no-store",
    });
    response.end(video);
    return;
  }

  if (request.method === "GET" && request.url === "/verify.html") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    response.end(`<!doctype html><html><title>Verify Demo</title><body style="margin:0;background:#02070d;color:white;font-family:Segoe UI"><video id="video" controls autoplay muted style="width:100vw;height:calc(100vh - 44px);background:black"><source src="/video.webm" type="video/webm"></video><div id="meta" style="padding:10px 18px"></div><script>const v=document.querySelector('#video');v.addEventListener('loadedmetadata',()=>{document.querySelector('#meta').textContent='READY · '+v.videoWidth+'×'+v.videoHeight+' · '+v.duration.toFixed(1)+' seconds';document.title='Video Verified';});v.addEventListener('error',()=>{document.title='Video Failed';});</script></body></html>`);
    return;
  }

  if (request.method === "GET" && request.url === "/fix-webm-duration.js") {
    const script = await fs.readFile(path.join(here, "..", ".video-runtime", "node_modules", "fix-webm-duration", "fix-webm-duration.js"));
    response.writeHead(200, { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-store" });
    response.end(script);
    return;
  }

  if (request.method === "GET" && request.url === "/fix.html") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    response.end(`<!doctype html><html><title>Fixing Demo Duration</title><body style="background:#02070d;color:white;font:20px Segoe UI;padding:40px"><div id="status">Fixing WebM duration…</div><script src="/fix-webm-duration.js"></script><script>(async()=>{const status=document.querySelector('#status');const source=await fetch('/video.webm').then(r=>r.blob());const fixed=await ysFixWebmDuration(source,41800,{logger:false});const result=await fetch('/upload',{method:'POST',headers:{'content-type':'video/webm'},body:fixed}).then(r=>r.json());status.textContent=result.ok?'READY · duration metadata fixed':'FAILED';document.title=result.ok?'Duration Fixed':'Duration Fix Failed';})().catch(error=>{status.textContent='FAILED · '+error.message;document.title='Duration Fix Failed';});</script></body></html>`);
    return;
  }

  if (request.method === "POST" && request.url === "/upload") {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const video = Buffer.concat(chunks);
    await fs.writeFile(videoPath, video);
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ ok: true, bytes: video.length, file: videoPath }));
    return;
  }

  if (request.method === "GET" && request.url === "/status") {
    try {
      const stats = await fs.stat(videoPath);
      response.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
      response.end(JSON.stringify({ ready: true, bytes: stats.size, file: videoPath }));
    } catch {
      response.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
      response.end(JSON.stringify({ ready: false }));
    }
    return;
  }

  response.writeHead(404);
  response.end("Not found");
});

server.listen(4317, "127.0.0.1", () => {
  process.stdout.write("Demo renderer ready at http://127.0.0.1:4317\n");
});
