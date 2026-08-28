import { rankForStory } from '../../characterRegistry';

export type PreviewRankStatus = 'current' | 'former' | 'retired' | 'deceased';

export function previewRankStatus(name: string, season?: number): PreviewRankStatus {
  const rank = rankForStory(name, season);
  if (name === 'Han Myeong' || name === 'Han') return season !== undefined && season <= 23 ? 'current' : 'deceased';
  if (name === 'Qin Luo' || name === 'Qin') return season !== undefined && season <= 23 ? 'current' : 'retired';
  if (rank.startsWith('Former ')) return 'former';
  return 'current';
}
