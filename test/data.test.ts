import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { charOrder } from '../src/characters';
import { characterImageMap } from '../src/images';
import type { Database } from '../src/types';

const data = rawData as unknown as Database;

describe('data integrity', () => {
  it('has all 64 seasons as non-empty arrays', () => {
    for (let s = 1; s <= 64; s++) {
      const arr = data[`season${s}` as `season${number}`];
      expect(Array.isArray(arr), `season${s}`).toBe(true);
      expect(arr.length, `season${s}`).toBeGreaterThan(0);
    }
  });

  it('every character in charOrder exists in the database', () => {
    for (const k of charOrder) expect(data.characters[k], k).toBeDefined();
  });

  it('every portrait key maps to a real character', () => {
    for (const k of Object.keys(characterImageMap)) expect(data.characters[k], k).toBeDefined();
  });

  it('ranking rows have four columns', () => {
    for (const r of data.ranks) expect(r).toHaveLength(4);
  });

  it('signature-art rows have five columns', () => {
    for (const rows of Object.values(data.topSkills)) {
      for (const row of rows) expect(row).toHaveLength(5);
    }
  });
});
