import { DB } from './db';
import { getEl } from './dom';

/**
 * Colour-class key for a ranking row's name. Order matters: `Ilyra` must be
 * checked before `Sera` because "Ilyra Serath" contains the substring "Sera".
 * Current top-ten holders (Ilyra, Mo, Yun, Arin, Luo) each need an entry;
 * anything unmatched falls back to Rhen.
 */
export function rankColorKey(name: string): string {
  if (name.includes('Kael')) return 'kael';
  if (name.includes('Liang')) return 'liang';
  if (name.includes('Jin')) return 'jin';
  if (name.includes('Lei')) return 'lei';
  if (name.includes('Rui')) return 'rui';
  if (name.includes('Ilyra')) return 'ilyra';
  if (name.includes('Mo')) return 'mo';
  if (name.includes('Arin')) return 'arin';
  if (name.includes('Luo')) return 'luo';
  if (name.includes('Yun')) return 'yun';
  if (name.includes('Qin')) return 'qin';
  if (name.includes('Sera')) return 'sera';
  if (name.includes('Han')) return 'han';
  return 'rhen';
}

export function renderRanks(q = ''): void {
  const lower = q.toLowerCase();
  getEl('rankList').innerHTML = DB.ranks.filter((r) => r.join(' ').toLowerCase().includes(lower)).map((r) => {
    const key = rankColorKey(r[1]);
    return `<div class="rank-row"><div><span class="badge">${r[0]}</span></div><div class="character-${key}"><strong>${r[1]}</strong></div><div>${r[3]}</div></div>`;
  }).join('');
}
