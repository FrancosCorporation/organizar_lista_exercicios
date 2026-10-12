import assert from 'node:assert/strict';
import { readdir, readFile, realpath, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ARCADE_ROOT = join(ROOT, 'arcade');

function isInside(root, candidate) {
  const fromRoot = relative(root, candidate);
  return fromRoot === '' || (!fromRoot.startsWith(`..${sep}`) && fromRoot !== '..' && !isAbsolute(fromRoot));
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.isFile()) files.push(path);
  }

  return files;
}

const manifest = JSON.parse(await readFile(join(ARCADE_ROOT, 'manifest.json'), 'utf8'));
const readme = await readFile(join(ROOT, 'README.md'), 'utf8');
const packageJson = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));
const menu = await readFile(join(ARCADE_ROOT, 'menu.js'), 'utf8');

assert(Array.isArray(manifest.apps), 'manifest.apps precisa ser uma lista.');
assert.equal(manifest.total, manifest.apps.length, 'manifest.total precisa corresponder ao tamanho da lista.');
assert.match(packageJson.engines?.node ?? '', /^>=22\.12(?:\.0)?$/, 'package.json precisa exigir Node.js 22.12+.');

const sources = new Set();
const bySource = new Map();
const mappedRooms = new Map();
let pending = 0;
let ported = 0;

for (const entry of manifest.apps) {
  assert(entry && typeof entry === 'object', 'Cada entrada precisa ser um objeto.');
  assert.equal(typeof entry.arquivo, 'string', 'Cada entrada precisa ter uma origem Java.');
  assert(['portado', 'pendente'].includes(entry.status), `Status inválido em ${entry.arquivo}.`);
  assert(!sources.has(entry.arquivo), `Origem duplicada no manifesto: ${entry.arquivo}.`);
  sources.add(entry.arquivo);
  bySource.set(entry.arquivo, entry);

  const sourcePath = resolve(ROOT, entry.arquivo);
  assert(isInside(ROOT, sourcePath), `Origem fora do repositório: ${entry.arquivo}.`);
  assert((await stat(sourcePath)).isFile(), `Arquivo Java não encontrado: ${entry.arquivo}.`);

  if (entry.status === 'pendente') {
    pending += 1;
    assert.equal(entry.portadoEm, null, `Item pendente não pode apontar para uma conversão: ${entry.arquivo}.`);
    continue;
  }

  ported += 1;
  assert.equal(typeof entry.portadoEm, 'string', `Item portado precisa indicar o destino: ${entry.arquivo}.`);
}

assert.equal(manifest.pendentes, pending, 'manifest.pendentes precisa corresponder aos itens pendentes.');
assert.equal(manifest.total - manifest.pendentes, ported, 'Total de itens portados inconsistente.');
assert.match(readme, new RegExp(`\\*\\*${manifest.total} programas únicos\\*\\*`), 'README precisa informar o total do manifesto.');
assert.match(readme, new RegExp(`\\*\\*${manifest.pendentes} programas\\*\\*`), 'README precisa informar o total pendente.');

for (const match of menu.matchAll(/\['([^']+)',\s*'([^']+)'\]/g)) {
  const [, source, room] = match;
  assert(!mappedRooms.has(source), `Origem duplicada no mapa do arcade: ${source}.`);
  const entry = bySource.get(source);
  assert(entry, `Origem do mapa ausente no manifesto: ${source}.`);
  assert.equal(entry.status, 'portado', `Origem do mapa não está marcada como portada: ${source}.`);
  assert.equal(entry.portadoEm, `arcade/${room}`, `Destino não coincide entre manifesto e menu: ${source}.`);

  const roomPath = resolve(ARCADE_ROOT, room, 'index.html');
  assert(isInside(ARCADE_ROOT, roomPath), `Sala fora de arcade/: ${room}.`);
  assert((await stat(roomPath)).isFile(), `Página da sala não encontrada: ${room}.`);
  mappedRooms.set(source, room);
}

for (const entry of manifest.apps.filter((item) => item.status === 'portado' && item.portadoEm.startsWith('arcade/'))) {
  assert(mappedRooms.has(entry.arquivo), `Conversão local ausente do mapa: ${entry.arquivo}.`);
}

const jsFiles = [join(ROOT, 'server.js'), ...(await walk(ARCADE_ROOT)).filter((path) => extname(path) === '.js')];
for (const path of jsFiles) {
  const syntax = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, `Sintaxe JavaScript inválida em ${relative(ROOT, path)}:\n${syntax.stderr}`);
}

const realArcadeRoot = await realpath(ARCADE_ROOT);
assert.equal(realArcadeRoot, ARCADE_ROOT, 'arcade/ não deve resolver para fora da árvore do projeto.');

console.log(`Catálogo consistente: ${manifest.total} programas, ${ported} portados, ${pending} pendentes, ${mappedRooms.size} origens ligadas a salas; ${jsFiles.length} arquivos JavaScript válidos.`);
