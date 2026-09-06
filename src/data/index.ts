// Test-facing view of the split authoring sources. Structured lore lives in
// lore.json and each season's prose in seasons/season-NNN.json; this recomposes
// them into the `{ ...lore, season1: [...] }` shape the suite has always used.
// Nothing in the running app imports this — the reader loads src/generated.
import lore from './lore.json';
import type { Episode, RawDatabase } from '../types';

const seasonModules = import.meta.glob<Episode[]>('./seasons/season-*.json', {
  eager: true,
  import: 'default',
});

const seasons: Record<string, Episode[]> = {};
for (const [path, episodes] of Object.entries(seasonModules)) {
  const match = /season-(\d+)\.json$/.exec(path);
  if (match) seasons[`season${Number(match[1])}`] = episodes;
}

export const authoringData = { ...lore, ...seasons } as unknown as RawDatabase;
export default authoringData;
