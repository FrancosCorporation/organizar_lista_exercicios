import http from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT || 3000);
if (!Number.isInteger(PORT) || PORT < 0 || PORT > 65_535) throw new Error('PORT precisa ser um número entre 0 e 65535.');
const ROOT = fileURLToPath(new URL('.', import.meta.url));
const ARCADE_ROOT = await realpath(resolve(ROOT, 'arcade'));
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};
const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff'
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...SECURITY_HEADERS, ...headers });
  res.end(body);
}

function isInside(root, file) {
  return file === root || file.startsWith(`${root}${sep}`);
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    req.resume();
    send(res, 405, 'Método não permitido', { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    send(res, 400, 'Endereço inválido', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  if (pathname === '/') pathname = '/arcade/';
  if (pathname === '/arcade') {
    send(res, 308, '', { Location: '/arcade/' });
    return;
  }
  if (!pathname.startsWith('/arcade/')) {
    send(res, 404, 'Não encontrado', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  const relativePath = pathname.slice('/arcade/'.length).replace(/\/+$/, '');
  const segments = relativePath.split('/').filter(Boolean);
  if (segments.some((segment) => segment.startsWith('.') || segment.includes('\\'))) {
    send(res, 404, 'Não encontrado', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  try {
    let file = resolve(ARCADE_ROOT, relativePath || 'index.html');
    if (!isInside(ARCADE_ROOT, file)) {
      send(res, 404, 'Não encontrado', { 'Content-Type': 'text/plain; charset=utf-8' });
      return;
    }

    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    file = await realpath(file);
    if (!isInside(ARCADE_ROOT, file) || !(await stat(file)).isFile()) {
      send(res, 404, 'Não encontrado', { 'Content-Type': 'text/plain; charset=utf-8' });
      return;
    }

    const data = await readFile(file);
    send(res, 200, req.method === 'HEAD' ? undefined : data, {
      'Cache-Control': 'no-cache',
      'Content-Length': data.length,
      'Content-Type': MIME[extname(file)] || 'application/octet-stream'
    });
  } catch {
    send(res, 404, 'Não encontrado', { 'Content-Type': 'text/plain; charset=utf-8' });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  const address = server.address();
  const actualPort = address && typeof address === 'object' ? address.port : PORT;
  console.log(`Arcade local em http://127.0.0.1:${actualPort}/arcade/`);
});
