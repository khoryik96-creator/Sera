// The authoring sources are split so the two workflows that edit them stop
// sharing one file: structured lore lives in src/data/lore.json, and each
// season's prose in src/data/seasons/season-NNN.json. This recomposes them into
// the single object the tooling has always consumed.
import { readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lorePath = resolve(root, 'src/data/lore.json');
const seasonsDir = resolve(root, 'src/data/seasons');
const SEASON_FILE = /^season-(\d+)\.json$/;

/** Season prose keyed by season number, in ascending order. */
export async function loadSeasonSources() {
  const entries = (await readdir(seasonsDir))
    .map((name) => ({ name, match: SEASON_FILE.exec(name) }))
    .filter(({ match }) => match)
    .map(({ name, match }) => ({ name, season: Number(match[1]) }))
    .sort((a, b) => a.season - b.season);

  const seasons = [];
  for (const { name, season } of entries) {
    const episodes = JSON.parse(await readFile(resolve(seasonsDir, name), 'utf8'));
    if (!Array.isArray(episodes)) throw new Error(`${name}: expected an array of episodes`);
    seasons.push({ season, episodes });
  }
  return seasons;
}

/** Structured lore only — characters, skills, ranks, arc figures and so on. */
export async function loadLore() {
  return JSON.parse(await readFile(lorePath, 'utf8'));
}

/** Lore plus every season, in the historical `{ ...lore, season1: [...] }` shape. */
export async function loadAuthoringData() {
  const data = await loadLore();
  for (const { season, episodes } of await loadSeasonSources()) data[`season${season}`] = episodes;
  return data;
}
