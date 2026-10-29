// Dev server sederhana (tanpa dependency) + fallback SPA.  npm run dev  →  http://localhost:3000
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public');
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};

const send = async (res, file, status = 200) => {
  const body = await readFile(file);
  res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  res.end(body);
};

http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://x');
      const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
      const file = join(root, rel);
      if (!file.startsWith(root)) return res.writeHead(403).end();
      const s = await stat(file).catch(() => null);
      if (s?.isFile()) return await send(res, file);
      if (extname(rel)) return res.writeHead(404).end('Not found'); // file aset yang tidak ada → 404 sungguhan
      if (url.pathname.startsWith('/api/')) return res.writeHead(404, { 'Content-Type': 'application/json' }).end('{"ok":false}');
      return await send(res, join(root, 'index.html'));
    } catch (e) {
      res.writeHead(500).end(String(e));
    }
  })
  .listen(port, () => console.log(`IMTI FTUI dev server → http://localhost:${port}`));
