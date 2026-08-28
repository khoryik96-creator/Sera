import { rankForStory } from '../../characterRegistry';

export type RankStatus = 'current' | 'former' | 'retired' | 'deceased' | 'unranked';

/** Remove legacy numeric prefixes stored in older character records. */
export function cleanCharacterName(name: string): string {
  return name.replace(/^(?:Former\s+)?#\d+\s*-\s*/i, '').trim();
}

export function rankLabel(name: string, season?: number): string {
  return rankForStory(cleanCharacterName(name), season);
}

export function rankStatusFromText(rank: string, statusText = ''): RankStatus {
  const text = `${rank} ${statusText}`;
  if (/deceased|dead|killed/i.test(text)) return 'deceased';
  if (/retired|semi[- ]?retired/i.test(text)) return 'retired';
  if (/unranked|\bUNR\b/i.test(text)) return 'unranked';
  if (/former/i.test(text)) return 'former';
  return 'current';
}

export function rankStatus(name: string, season?: number): RankStatus {
  const clean = cleanCharacterName(name);
  const rank = rankLabel(clean, season);
  if (/unranked|\bUNR\b/i.test(rank)) return 'unranked';
  if (clean === 'Han Myeong' || clean === 'Han') return season !== undefined && season <= 23 ? 'current' : 'deceased';
  if (clean === 'Qin Luo' || clean === 'Qin') return season !== undefined && season <= 23 ? 'current' : 'retired';
  if (rank.startsWith('Former ')) return 'former';
  return 'current';
}

export function rankStatusForEntry(name: string, rank: string, statusText = ''): RankStatus {
  const named = rankStatus(name);
  if (named !== 'current') return named;
  return rankStatusFromText(rank, statusText);
}

export function parseRankBadge(text: string): { rank: string; status: RankStatus } | null {
  const match = text.match(/(?:Former\s+)?#\d+|Unranked|\bUNR\b/i);
  if (!match) return null;
  const raw = match[0];
  const rank = /unranked|\bUNR\b/i.test(raw) ? 'Unranked' : raw;
  return { rank, status: rankStatusFromText(rank, text) };
}
