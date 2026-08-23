import dataUrl from './data.json?url';
import type { Database } from './types';

/**
 * The lore database. Populated by `loadDB()` before any rendering runs, so
 * render code (which only reads `DB` inside functions) can treat it as present.
 * Loaded as a fetched static asset rather than inlined into the JS bundle.
 */
export let DB: Database;

/** Replace the active database (used by loadDB and by tests). */
export function setDB(data: Database): void {
  DB = data;
}

/** Fetch and install the lore database. Call once before the first render. */
export async function loadDB(): Promise<void> {
  const res = await fetch(dataUrl);
  if (!res.ok) throw new Error(`Failed to load lore data: ${res.status} ${res.statusText}`);
  setDB(await res.json() as Database);
}

/** Main portrait per character key. */
export const characterImageMap: Record<string, string> = {
  sera: '/assets/sera.jpg',
  rhen: '/assets/rhen.jpg',
  arin: '/assets/arin.jpg',
  liang: '/assets/liang.jpg',
  kael: '/assets/kael.jpg',
  jin: '/assets/jin.jpg',
  lei: '/assets/lei.jpg',
  rui: '/assets/rui.jpg',
  qin: '/assets/qin.jpg',
  han: '/assets/han.jpg',
  ilyra: '/assets/ilyra.jpg',
  mo: '/assets/mo.jpg',
  yun: '/assets/yun.jpg',
  wen: '/assets/wen.jpg',
};

/** Additional gallery portraits per character key. */
export const characterExtraImages: Record<string, string[]> = {
  sera: ['/assets/sera-extra-1.jpg', '/assets/sera-extra-2.jpg', '/assets/sera-extra-3.jpg'],
};

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
