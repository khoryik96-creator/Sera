import type { Database, RawCoreDatabase } from './types';
import { colorKeyMap } from './characterRegistry';

/** Stable normalized core lore. Episode prose is loaded separately per season. */
export let DB: Database;

/**
 * Adopt loaded core lore as the runtime Database. Rows are stored as named
 * objects in src/data.json, so this is an identity bridge; it remains the
 * single entry point the app and tests call when taking on freshly loaded data.
 */
export function normalizeDatabase(raw: RawCoreDatabase): Database {
  return raw;
}

export function setDB(data: RawCoreDatabase): void {
  DB = normalizeDatabase(data);
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
