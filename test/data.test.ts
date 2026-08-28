import { describe, it, expect } from 'vitest';
import rawData from '../src/data.json';
import { charOrder } from '../src/characters';
import { characterImageMap } from '../src/images';
import { normalizeDatabase } from '../src/db';
import type { RawDatabase } from '../src/types';

const raw = rawData as unknown as RawDatabase;
const data = normalizeDatabase(raw);

describe('data integrity', () => {
  it('has all 64 canonical seasons as non-empty arrays', () => {
    for (let season = 1; season <= 64; season++) {
      const episodes = raw[`season${season}` as `season${number}`];
      expect(Array.isArray(episodes), `season${season}`).toBe(true);
      expect(episodes.length, `season${season}`).toBeGreaterThan(0);
    }
  });

  it('every character in charOrder exists in the database', () => {
    for (const key of charOrder) expect(data.characters[key], key).toBeDefined();
  });

  it('every portrait key maps to a real character', () => {
    for (const key of Object.keys(characterImageMap)) expect(data.characters[key], key).toBeDefined();
  });

  it('normalizes ranking rows into named objects', () => {
    for (const rank of data.ranks) {
      expect(rank.rank).toBeTruthy();
      expect(rank.name).toBeTruthy();
      expect(rank.className).toBeTypeOf('string');
      expect(rank.description).toBeTypeOf('string');
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
