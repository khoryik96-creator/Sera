import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const assetsDir = resolve('dist/assets');
const files = await readdir(assetsDir);

const limits = {
  entryJs: 220 * 1024,
  entryCss: 48 * 1024,
  coreJson: 210 * 1024,
};

async function sizeOf(pattern, label) {
  const matches = files.filter((file) => pattern.test(file));
  if (matches.length !== 1) throw new Error(`${label}: expected one matching asset, found ${matches.length}: ${matches.join(', ')}`);
  const file = matches[0];
  const { size } = await stat(resolve(assetsDir, file));
  return { file, size };
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

function assertLimit(asset, limit, label) {
  if (asset.size > limit) throw new Error(`${label} ${asset.file} is ${kb(asset.size)}; budget is ${kb(limit)}.`);
  console.log(`✓ ${label}: ${asset.file} · ${kb(asset.size)} / ${kb(limit)}`);
}

const entryJs = await sizeOf(/^main-[^.]+\.js$/, 'Initial JS');
const entryCss = await sizeOf(/^main-[^.]+\.css$/, 'Initial CSS');
const coreJson = await sizeOf(/^core-[^.]+\.json$/, 'Core lore JSON');

assertLimit(entryJs, limits.entryJs, 'Initial JS');
assertLimit(entryCss, limits.entryCss, 'Initial CSS');
assertLimit(coreJson, limits.coreJson, 'Core lore JSON');

for (const route of ['ReaderRoute', 'ChaptersRoute', 'OverviewRoute', 'CharactersRoute', 'SearchRoute']) {
  const exists = files.some((file) => new RegExp(`^${route}-[^.]+\\.js$`).test(file));
  if (!exists) throw new Error(`Expected lazy route chunk ${route}-*.js; route splitting may have regressed.`);
  console.log(`✓ lazy chunk: ${route}`);
}
