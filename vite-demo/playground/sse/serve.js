import http from "node:http";
import url from "node:url";
import { serveStatic } from "./static.js";

const port = 8000,
  root = "./client/";

// start server
http
  .createServer(async (req, res) => {
    // get URI path
    const uri = url.parse(req.url).pathname;

    // return response
    switch (uri) {
      case "/random":
        sseStart(res);
        sseRandom(res);
        break;

      default:
        await serveStatic(res, uri, root);
    }
  })
  .listen(port);

console.log(`server running: http://localhost:${port}\n\n`);

// SSE head
function sseStart(res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
}

// SSE random number
function sseRandom(res) {
  res.write("data: " + (Math.floor(Math.random() * 1000) + 1) + "\n\n");
  setTimeout(() => sseRandom(res), Math.random() * 3000);
}
