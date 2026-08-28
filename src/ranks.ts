import { DB } from './db';
import { getEl } from './dom';
import type { RankEntry } from './types';

/**
 * Colour-class key for a ranking row's name. Order matters: `Ilyra` must be
 * checked before `Sera` because "Ilyra Serath" contains the substring "Sera".
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

export type RankBadgeTone = 'current' | 'former' | 'retired' | 'deceased' | 'unranked';

export function rankBadgeTone(entry: RankEntry): RankBadgeTone {
  const explicit = `${entry.rank} ${entry.name} ${entry.className}`;
  if (entry.name.trim() === 'Rhen' || /unranked/i.test(explicit)) return 'unranked';
  if (/deceased|dead|†/i.test(explicit)) return 'deceased';
  if (/semi[- ]?retired|retired/i.test(explicit)) return 'retired';
  if (/former/i.test(explicit)) return 'former';
  return 'current';
}

export function rankBadgeLabel(entry: RankEntry): string {
  const tone = rankBadgeTone(entry);
  const base = entry.rank.replace(/^Former\s+/i, '').trim() || 'UNR';
  if (tone === 'deceased') return `${base} †`;
  if (tone === 'retired') return `${base} · RET`;
  if (tone === 'former') return `${base} · FORMER`;
  return base;
}

export function renderRanks(q = ''): void {
  const lower = q.toLowerCase();
  getEl('rankList').innerHTML = DB.ranks
    .filter((entry) => JSON.stringify(entry).toLowerCase().includes(lower))
    .map((entry) => {
      const key = rankColorKey(entry.name);
      const tone = rankBadgeTone(entry);
      const label = rankBadgeLabel(entry);
      return `<div class="rank-row"><div><span class="rank-badge rank-badge--${tone}">${label}</span></div><div class="character-${key}"><strong>${entry.name}</strong><div class="rank-class">${entry.className}</div></div><div>${entry.description}</div></div>`;
    }).join('');
}
