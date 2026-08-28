import type { Database, RawCoreDatabase } from './types';
import { colorKeyMap } from './characterRegistry';

/** Stable normalized core lore. Episode prose is loaded separately per season. */
export let DB: Database;

export type ReactDataFeature = 'ranks' | 'legends' | 'seasonCast' | 'villains' | 'techniques' | 'former' | 'timeline' | 'canon';

interface ReactCorePayload {
  characters: Database['characters'];
}

const loadedReactFeatures = new Set<ReactDataFeature>();
const inflightReactFeatures = new Map<ReactDataFeature, Promise<void>>();

function normalizeRanks(rows: RawCoreDatabase['ranks']): Database['ranks'] {
  return rows.map(([rank, name, className, description]) => ({ rank, name, className, description }));
}

function normalizeSeasonCast(rows: RawCoreDatabase['seasonCast']): Database['seasonCast'] {
  return Object.fromEntries(
    Object.entries(rows).map(([season, entries]) => [
      season,
      entries.map(([name, role, description]) => ({ name, role, description })),
    ]),
  );
}

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
  const ranks = normalizeRanks(raw.ranks);
  const seasonCast = normalizeSeasonCast(raw.seasonCast);

  return { ...raw, topSkills, ranks, seasonCast } as Database;
}

function reactDatabase(core: ReactCorePayload): Database {
  return {
    characters: core.characters,
    legends: [],
    arcFigures: [],
    former: [],
    seraTimeline: [],
    rhenSkills: [],
    seraSkills: [],
    canonRules: [],
    topSkills: {},
    ranks: [],
    seasonCast: {},
  };
}

export function setDB(data: Database | RawCoreDatabase): void {
  DB = isRawDatabase(data) ? normalizeDatabase(data) : data;
}

async function fetchJsonWithTimeout<T>(url: string, timeoutMs = 12000): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'default' });
    if (!response.ok) throw new Error(`Failed to load lore data: ${response.status} ${response.statusText}`);
    return await response.json() as T;
  } finally {
    window.clearTimeout(timer);
  }
}

async function fetchWithRetry<T>(url: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await fetchJsonWithTimeout<T>(url);
    } catch (error) {
      lastError = error;
      if (attempt === 0) await new Promise((resolve) => window.setTimeout(resolve, 350));
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Failed to load lore data');
}

/**
 * Full compatibility loader used by the legacy reader and the self-contained
 * build. Normal React web startup uses loadReactDB() instead.
 */
export async function loadDB(): Promise<void> {
  if (__SINGLEFILE__) {
    const mod = await import('./generated/core.json');
    setDB(mod.default as unknown as RawCoreDatabase);
    return;
  }

  const { default: dataUrl } = await import('./generated/core.json?url');
  setDB(await fetchWithRetry<RawCoreDatabase>(dataUrl));
}

/**
 * Small web-React bootstrap. Character records are the only lore records that
 * must exist synchronously for deep-link routing and contextual chapter lore.
 * Everything else is attached by ensureReactData() when a lazy feature opens.
 */
export async function loadReactDB(): Promise<void> {
  if (__SINGLEFILE__) {
    await loadDB();
    return;
  }

  loadedReactFeatures.clear();
  inflightReactFeatures.clear();
  const { default: dataUrl } = await import('./generated/react-core.json?url');
  DB = reactDatabase(await fetchWithRetry<ReactCorePayload>(dataUrl));
}

async function attachReactFeature(feature: ReactDataFeature): Promise<void> {
  switch (feature) {
    case 'ranks': {
      const { default: payload } = await import('./generated/react-ranks.json');
      DB.ranks = normalizeRanks((payload as unknown as Pick<RawCoreDatabase, 'ranks'>).ranks);
      return;
    }
    case 'legends': {
      const { default: payload } = await import('./generated/react-legends.json');
      DB.legends = (payload as unknown as Pick<Database, 'legends'>).legends;
      return;
    }
    case 'seasonCast': {
      const { default: payload } = await import('./generated/react-season-cast.json');
      DB.seasonCast = normalizeSeasonCast((payload as unknown as Pick<RawCoreDatabase, 'seasonCast'>).seasonCast);
      return;
    }
    case 'villains': {
      const { default: payload } = await import('./generated/react-villains.json');
      DB.arcFigures = (payload as unknown as Pick<Database, 'arcFigures'>).arcFigures;
      return;
    }
    case 'techniques': {
      const { default: payload } = await import('./generated/react-techniques.json');
      const data = payload as unknown as Pick<Database, 'rhenSkills' | 'seraSkills'>;
      DB.rhenSkills = data.rhenSkills;
      DB.seraSkills = data.seraSkills;
      return;
    }
    case 'former': {
      const { default: payload } = await import('./generated/react-former.json');
      DB.former = (payload as unknown as Pick<Database, 'former'>).former;
      return;
    }
    case 'timeline': {
      const { default: payload } = await import('./generated/react-timeline.json');
      DB.seraTimeline = (payload as unknown as Pick<Database, 'seraTimeline'>).seraTimeline;
      return;
    }
    case 'canon': {
      const { default: payload } = await import('./generated/react-canon.json');
      DB.canonRules = (payload as unknown as Pick<Database, 'canonRules'>).canonRules || [];
      return;
    }
  }
}

export function ensureReactData(...features: ReactDataFeature[]): Promise<void> {
  if (__SINGLEFILE__) return Promise.resolve();

  return Promise.all(features.map((feature) => {
    if (loadedReactFeatures.has(feature)) return Promise.resolve();
    const pending = inflightReactFeatures.get(feature);
    if (pending) return pending;

    const request = attachReactFeature(feature)
      .then(() => {
        loadedReactFeatures.add(feature);
        inflightReactFeatures.delete(feature);
      })
      .catch((error) => {
        inflightReactFeatures.delete(feature);
        throw error;
      });
    inflightReactFeatures.set(feature, request);
    return request;
  })).then(() => undefined);
}

/** Backwards-compatible export. The canonical map now lives in characterRegistry.ts. */
export { colorKeyMap };
