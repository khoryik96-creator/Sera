import { describe, it, expect, beforeAll } from 'vitest';
import data from '../src/data.json';
import { setDB } from '../src/db';
import { legendsForCharacter, charOrder } from '../src/characters';
import type { Database } from '../src/types';

beforeAll(() => setDB(data as unknown as Database));

describe('legendsForCharacter', () => {
  it('returns no legends for characters without a label (regression: Mo/Yun once showed all 58)', () => {
    expect(legendsForCharacter('mo')).toHaveLength(0);
    expect(legendsForCharacter('yun')).toHaveLength(0);
  });

  it('returns matching legends for labelled characters', () => {
    expect(legendsForCharacter('rui').length).toBeGreaterThan(0);
    expect(legendsForCharacter('sera').length).toBeGreaterThan(0);
  });

  it('never returns the entire legend set for any character', () => {
    const total = (data as unknown as Database).legends.length;
    for (const key of charOrder) {
      expect(legendsForCharacter(key).length, key).toBeLessThan(total);
    }
  });
});
