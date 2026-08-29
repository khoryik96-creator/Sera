import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const assetsDir = resolve('dist/assets');
const files = await readdir(assetsDir);

const limits = {
  entryJs: 220 * 1024,
  entryCss: 48 * 1024,
  coreJson: 210 * 1024,
  lazyRouteJs: 180 * 1024,
};

const requiredLazyRoutes = [
  'ReaderRoute', 'ChaptersRoute', 'OverviewRoute', 'CharactersRoute', 'VillainsRoute', 'TechniquesRoute',
  'RankingsRoute', 'BookmarksRoute', 'InsightsRoute', 'LegendsRoute', 'FormerRoute', 'TimelineRoute', 'CanonRoute', 'SearchRoute',
];

async function sizeOf(pattern, label) {
  const matches = files.filter((file) => pattern.test(file));
  if (matches.length !== 1) throw new Error(`${label}: expected one matching asset, found ${matches.length}: ${matches.join(', ')}`);
  const file = matches[0];
  const { size } = await stat(resolve(assetsDir, file));
  return { file, size };
}

function kb(bytes) { return `${(bytes / 1024).toFixed(1)} KiB`; }
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

for (const route of requiredLazyRoutes) {
  const asset = await sizeOf(new RegExp(`^${route}-[^.]+\\.js$`), `${route} lazy JS`);
  assertLimit(asset, limits.lazyRouteJs, `${route} lazy JS`);
}

console.log(`✓ route boundaries + sizes: ${requiredLazyRoutes.length} production chunks guarded`);