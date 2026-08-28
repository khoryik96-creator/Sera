import { rankForStory } from '../../characterRegistry';

export type PreviewRankStatus = 'current' | 'former' | 'retired' | 'deceased';

/** Remove the legacy display prefix stored in some character records. */
export function cleanCharacterName(name: string): string {
  return name.replace(/^(?:Former\s+)?#\d+\s*-\s*/i, '').trim();
}

export function previewRankStatus(name: string, season?: number): PreviewRankStatus {
  const clean = cleanCharacterName(name);
  const rank = rankForStory(clean, season);
  if (clean === 'Han Myeong' || clean === 'Han') return season !== undefined && season <= 23 ? 'current' : 'deceased';
  if (clean === 'Qin Luo' || clean === 'Qin') return season !== undefined && season <= 23 ? 'current' : 'retired';
  if (rank.startsWith('Former ')) return 'former';
  return 'current';
}

export function previewRank(name: string, season?: number): string {
  return rankForStory(cleanCharacterName(name), season);
}
