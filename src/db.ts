import type { Database } from './types';

/**
 * The lore database. Populated by `loadDB()` before any rendering runs, so
 * render code (which only reads `DB` inside functions) can treat it as present.
 */
export let DB: Database;

/** Replace the active database (used by loadDB and by tests). */
export function setDB(data: Database): void {
  DB = data;
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
    setDB(mod.default as unknown as Database);
  } else {
    const { default: dataUrl } = await import('./data.json?url');
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error(`Failed to load lore data: ${res.status} ${res.statusText}`);
    setDB(await res.json() as Database);
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
  flowerseller: 'neutral', girl: 'neutral', novice: 'neutral', covenant: 'neutral', duchess: 'neutral', soldier: 'neutral', opponent: 'neutral', captain: 'neutral', lieutenant: 'neutral', attacker: 'neutral', messenger: 'neutral',
  sorin: 'sorin', valeria: 'valeria', draven: 'draven', ilyra: 'ilyra', aurel: 'aurel', vaelor: 'vaelor',
  orun: 'orun', iscaryn: 'iscaryn', rhavenn: 'rhavenn', tor: 'tor', caedros: 'caedros', varesh: 'varesh', amon: 'amon', aethon: 'aethon',
};
