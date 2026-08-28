import { describe, it, expect, beforeAll } from 'vitest';
import data from '../src/data.json';
import { setDB } from '../src/db';
import { legendsForCharacter, charOrder } from '../src/characters';
import type { RawDatabase } from '../src/types';

const raw = data as unknown as RawDatabase;
beforeAll(() => setDB(raw));

describe('legendsForCharacter', () => {
  it('surfaces the dedicated legends for Mo and Yun (were wrongly showing 0)', () => {
    const mo = legendsForCharacter('mo');
    const yun = legendsForCharacter('yun');
    expect(mo.length).toBeGreaterThan(0);
    expect(yun.length).toBeGreaterThan(0);
    expect(mo.every((l) => /\bMo\b/i.test(l.rank))).toBe(true);
    expect(yun.every((l) => /\bYun\b/i.test(l.rank))).toBe(true);
  });

  it('returns matching legends for labelled characters', () => {
    expect(legendsForCharacter('rui').length).toBeGreaterThan(0);
    expect(legendsForCharacter('sera').length).toBeGreaterThan(0);
  });

  it('matches whole words only — Sera does not pick up "Ilyra Serath"', () => {
    for (const l of legendsForCharacter('sera')) {
      expect(/\bSera\b/i.test(l.rank), l.rank).toBe(true);
    }
    expect(legendsForCharacter('ilyra')).toHaveLength(0);
  });

  it('never returns the entire legend set for any character', () => {
    const total = raw.legends.length;
    for (const key of charOrder) {
      expect(legendsForCharacter(key).length, key).toBeLessThan(total);
    }
  });
});
