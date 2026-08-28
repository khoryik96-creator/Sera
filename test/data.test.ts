import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { charOrder } from '../src/characters';
import { characterImageMap } from '../src/images';
import { normalizeDatabase } from '../src/db';
import type { RawDatabase } from '../src/types';

const data = normalizeDatabase(rawData as unknown as RawDatabase);

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

  it('normalizes ranking rows into named objects', () => {
    for (const r of data.ranks) {
      expect(r.rank).toBeTruthy();
      expect(r.name).toBeTruthy();
      expect(r.className).toBeTypeOf('string');
      expect(r.description).toBeTypeOf('string');
    }
  });

  it('normalizes signature-art rows into named objects', () => {
    for (const rows of Object.values(data.topSkills)) {
      for (const row of rows) {
        expect(row.name).toBeTruthy();
        expect(row.category).toBeTypeOf('string');
        expect(row.signature).toBeTypeOf('string');
        expect(row.rating).toBeTypeOf('string');
        expect(row.description).toBeTypeOf('string');
      }
    }
  });
});
