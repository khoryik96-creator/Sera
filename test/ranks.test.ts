import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { rankColorKey } from '../src/ranks';
import type { Database } from '../src/types';

const data = rawData as unknown as Database;

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
      const key = rankColorKey(r[1]);
      if (r[1] === 'Rhen') expect(key).toBe('rhen');
      else expect(key, r[1]).not.toBe('rhen');
    }
  });
});
