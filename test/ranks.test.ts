import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { normalizeDatabase } from '../src/db';
import { rankColorKey, rankBadgeTone } from '../src/ranks';
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

  it('uses an unranked pill only for Rhen and distinguishes former/retired rows', () => {
    for (const r of data.ranks) {
      const tone = rankBadgeTone(r);
      if (r.name === 'Rhen') expect(tone).toBe('unranked');
      if (/former|retired/i.test(`${r.rank} ${r.className} ${r.description}`)) expect(tone).toBe('former');
    }
  });
});
