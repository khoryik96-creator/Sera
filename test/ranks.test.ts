import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { normalizeDatabase } from '../src/db';
import { rankColorKey, rankBadgeTone, rankBadgeLabel } from '../src/ranks';
import type { RawDatabase } from '../src/types';

const data = normalizeDatabase(rawData as unknown as RawDatabase);

describe('rankColorKey', () => {
  it('maps each current ranked character to its own colour', () => {
    const expected: Record<string, string> = {
      'Kael Veyran': 'kael',
      'Liang Yue': 'liang',
      'Jin Seoryu': 'jin',
      'Lei Zhen': 'lei',
      'Shen Rui': 'rui',
      'Ilyra Serath — The Mirror Queen': 'ilyra',
      'Mo Qingzhao — The Paper Emperor': 'mo',
      'Arin Vale — The Silver Sword Saint': 'arin',
      'Luo Wen — The Laughing Undertaker': 'luo',
      'Yun Shizhen — The Pale Venom': 'yun',
      'Sera — The Pale Orchid': 'sera',
      Rhen: 'rhen',
    };
    for (const [name, key] of Object.entries(expected)) expect(rankColorKey(name), name).toBe(key);
  });

  it('does not mistake "Ilyra Serath" for Sera (substring collision)', () => {
    expect(rankColorKey('Ilyra Serath — The Mirror Queen')).toBe('ilyra');
  });

  it('gives every ranking row its own colour, never the rhen fallback except Rhen', () => {
    for (const r of data.ranks) {
      const key = rankColorKey(r.name);
      if (r.name === 'Rhen') expect(key).toBe('rhen');
      else expect(key, r.name).not.toBe('rhen');
    }
  });

  it('uses explicit unranked/former/retired/deceased tones', () => {
    expect(rankBadgeTone({ rank: 'UNR', name: 'Rhen', className: 'Unranked', description: '' })).toBe('unranked');
    expect(rankBadgeTone({ rank: 'Former #6', name: 'Sera', className: 'Former Marquis', description: '' })).toBe('former');
    expect(rankBadgeTone({ rank: 'Former #6', name: 'Qin Luo', className: 'Semi-retired', description: '' })).toBe('retired');
    expect(rankBadgeTone({ rank: 'Former #8', name: 'Han Myeong', className: 'Deceased', description: '' })).toBe('deceased');
  });

  it('formats state indicators like the Lucy reader', () => {
    expect(rankBadgeLabel({ rank: '#2', name: 'Liang Yue', className: 'Duke', description: '' })).toBe('#2');
    expect(rankBadgeLabel({ rank: 'Former #6', name: 'Sera', className: 'Former Marquis', description: '' })).toBe('#6 · FORMER');
    expect(rankBadgeLabel({ rank: 'Former #6', name: 'Qin Luo', className: 'Retired', description: '' })).toBe('#6 · RET');
    expect(rankBadgeLabel({ rank: 'Former #8', name: 'Han Myeong', className: 'Deceased', description: '' })).toBe('#8 †');
  });

  it('does not demote a current rank merely because its biography mentions a former rank', () => {
    expect(rankBadgeTone({ rank: '#2', name: 'Liang Yue', className: 'Duke', description: 'Former World #1.' })).toBe('current');
  });
});
