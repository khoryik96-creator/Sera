import type { Database, RawDatabase } from './types';

/**
 * The lore database. Populated by `loadDB()` before any rendering runs, so
 * render code reads a stable, normalized object shape rather than positional
 * JSON rows.
 */
export let DB: Database;

function isRawDatabase(data: Database | RawDatabase): data is RawDatabase {
  const firstRank = data.ranks[0] as unknown;
  return Array.isArray(firstRank);
}

/** Convert the persisted compact JSON rows into named runtime objects. */
export function normalizeDatabase(raw: RawDatabase): Database {
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

  return { ...raw, topSkills, ranks, seasonCast } as unknown as Database;
}

/** Replace the active database. Raw JSON is normalized automatically for tests. */
export function setDB(data: Database | RawDatabase): void {
  DB = isRawDatabase(data) ? normalizeDatabase(data) : data;
}

/**
 * Install the lore database. Two strategies, chosen at build time so the unused
 * branch is dropped by dead-code elimination:
 *  - web build (`__SINGLEFILE__` false): fetch data.json as a separate cacheable
 *    asset, keeping it out of the JS bundle;
 *  - single-file build (`__SINGLEFILE__` true): import it so it is inlined into
 *    the one self-contained HTML (works over file://, no fetch).
 */
export async function loadDB(): Promise<void> {
  if (__SINGLEFILE__) {
    const mod = await import('./data.json');
    setDB(mod.default as unknown as RawDatabase);
  } else {
    const { default: dataUrl } = await import('./data.json?url');
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error(`Failed to load lore data: ${res.status} ${res.statusText}`);
    setDB(await res.json() as RawDatabase);
  }
}

/** Maps a character/speaker key to its CSS colour class suffix. */
export const colorKeyMap: Record<string, string> = {
  rhen: 'rhen', sera: 'sera', kael: 'kael', liang: 'liang', jin: 'jin', lei: 'lei', rui: 'rui', qin: 'qin', han: 'han', arin: 'arin', wen: 'luo', luo: 'luo',
  mo: 'mo', yun: 'yun', mu: 'mu', seo: 'seo', tae: 'tae', gu: 'gu', huo: 'huo',
  wei: 'wei', ji: 'ji', cao: 'cao', ye: 'ye', zhao: 'zhao', lin: 'lin', yan: 'yan', meizhen: 'meizhen', yunke: 'yunke', gaoren: 'gaoren', shufen: 'shufen', baotien: 'baotien',
  meilin: 'meilin', song: 'song', shiyue: 'shiyue', nam: 'nam', chun: 'chun', haejin: 'haejin', gwon: 'gwon', daemun: 'daemun', baek: 'baek', gong: 'gong',
  jiang: 'jiang', duan: 'duan', mi: 'mi', qiu: 'qiu', zhao_renkai: 'zhao_renkai',
  ren: 'ren', qiao: 'qiao', miri: 'miri',
  flowerseller: 'neutral', girl: 'neutral', novice: 'neutral', covenant: 'neutral', duchess: 'neutral', soldier: 'neutral', opponent: 'neutral', captain: 'neutral', lieutenant: 'neutral', attacker: 'neutral', messenger: 'neutral', grandmaster: 'neutral',
  sorin: 'sorin', valeria: 'valeria', draven: 'draven', ilyra: 'ilyra', aurel: 'aurel', vaelor: 'vaelor',
  orun: 'orun', iscaryn: 'iscaryn', rhavenn: 'rhavenn', tor: 'tor', caedros: 'caedros', varesh: 'varesh', amon: 'amon', aethon: 'aethon',
};
