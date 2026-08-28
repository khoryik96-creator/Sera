import type { Database, RawCoreDatabase } from './types';
import { colorKeyMap } from './characterRegistry';

/** Stable normalized core lore. Episode prose is loaded separately per season. */
export let DB: Database;

function isRawDatabase(data: Database | RawCoreDatabase): data is RawCoreDatabase {
  const firstRank = data.ranks[0] as unknown;
  return Array.isArray(firstRank);
}

/** Convert persisted compact rows into named runtime objects. */
export function normalizeDatabase(raw: RawCoreDatabase): Database {
  const topSkills = Object.fromEntries(
    Object.entries(raw.topSkills).map(([key, rows]) => [
      key,
      rows.map(([name, category, signature, rating, description]) => ({ name, category, signature, rating, description })),
    ]),
  );
  const ranks = raw.ranks.map(([rank, name, className, description]) => ({ rank, name, className, description }));
  const seasonCast = Object.fromEntries(
    Object.entries(raw.seasonCast).map(([season, rows]) => [
      season,
      rows.map(([name, role, description]) => ({ name, role, description })),
    ]),
  );

  return { ...raw, topSkills, ranks, seasonCast } as Database;
}

export function setDB(data: Database | RawCoreDatabase): void {
  DB = isRawDatabase(data) ? normalizeDatabase(data) : data;
}

async function fetchJsonWithTimeout(url: string, timeoutMs = 12000): Promise<RawCoreDatabase> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'default' });
    if (!response.ok) throw new Error(`Failed to load lore data: ${response.status} ${response.statusText}`);
    return await response.json() as RawCoreDatabase;
  } finally {
    window.clearTimeout(timer);
  }
}

/**
 * Load only core lore at startup. The normal web build keeps all 64 season
 * payloads out of this request; seasonStore.ts imports them on demand. The
 * single-file build still inlines generated core + season modules.
 */
export async function loadDB(): Promise<void> {
  if (__SINGLEFILE__) {
    const mod = await import('./generated/core.json');
    setDB(mod.default as unknown as RawCoreDatabase);
    return;
  }

  const { default: dataUrl } = await import('./generated/core.json?url');
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      setDB(await fetchJsonWithTimeout(dataUrl));
      return;
    } catch (error) {
      lastError = error;
      if (attempt === 0) await new Promise((resolve) => window.setTimeout(resolve, 350));
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Failed to load lore data');
}

/** Backwards-compatible export. The canonical map now lives in characterRegistry.ts. */
export { colorKeyMap };
