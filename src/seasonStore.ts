import type { Episode } from './types';

interface JsonModule<T> { default: T }

const seasonModules = import.meta.glob<JsonModule<Episode[]>>('./generated/season-*.json');
const cache = new Map<number, Episode[]>();
const inflight = new Map<number, Promise<Episode[]>>();

function moduleKey(season: number): string {
  return `./generated/season-${season}.json`;
}

export function cachedSeason(season: number): Episode[] | undefined {
  return cache.get(season);
}

export async function loadSeason(season: number): Promise<Episode[]> {
  const cached = cache.get(season);
  if (cached) return cached;
  const pending = inflight.get(season);
  if (pending) return pending;

  const loader = seasonModules[moduleKey(season)];
  if (!loader) throw new Error(`No generated data module for season ${season}`);

  const request = loader().then((mod) => {
    const episodes = mod.default;
    if (!Array.isArray(episodes)) throw new Error(`Invalid data for season ${season}`);
    cache.set(season, episodes);
    inflight.delete(season);
    return episodes;
  }).catch((error) => {
    inflight.delete(season);
    throw error;
  });

  inflight.set(season, request);
  return request;
}

export async function loadSeasons(seasons: number[]): Promise<Map<number, Episode[]>> {
  const pairs = await Promise.all(seasons.map(async (season) => [season, await loadSeason(season)] as const));
  return new Map(pairs);
}

export function clearSeasonCache(): void {
  cache.clear();
  inflight.clear();
}
