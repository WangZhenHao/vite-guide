// serve static file from root directory
import path from "node:path";
import { access, stat, readFile, constants } from "node:fs/promises";

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  err: "text/plain",
};

export async function serveStatic(res, uri, root) {
  // get filename
  let filename = path.join(root, uri);

  // is file readable?
  let isReadable;

  try {
    await access(filename, constants.R_OK);
    isReadable = true;
  } catch {}

  if (!isReadable) {
    serve(404, "404 Not Found\n");
    return;
  }

  // is a directory?
  const fileInfo = await stat(filename);
  if (fileInfo.isDirectory()) filename = path.join(filename, "./index.html");

  // read file contents
  try {
    const content = await readFile(filename);
    serve(200, content, path.extname(filename));
  } catch (err) {
    serve(500, err.message);
  }

  // return content
  function serve(code, content, type) {
    res.writeHead(code, {
      "Content-Type": mime[type] || mime["err"],
      "Cache-Control": "must-revalidate, max-age=0",
      "Content-Length": Buffer.byteLength(content),
    });
    res.write(content);
    res.end();
  }
}
