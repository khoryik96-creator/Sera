import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

const season107 = read('docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT.md');
const season101 = read('docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT_2.md');
const season114 = read('docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT_2.md');
const endingLock = read('docs/FINAL_ARC_TOP_TEN_THIRD_SHOP_ENDING_LOCK.md');
const season7 = read('src/data/seasons/season-007.json');

const chapter421 = season107.slice(
  season107.indexOf('## Chapter 421 —'),
  season107.indexOf('## Chapter 422 —'),
);

describe('Liang Yue gender canon', () => {
  it('preserves the established female canon', () => {
    expect(season7).toContain('Liang Yue arrived because the released records named her victory');
    expect(season7).toContain('She did not bring attendants');
  });

  it('keeps the Liang/Nao Season 107 duel free of male pronouns', () => {
    expect(chapter421).not.toMatch(/\b(?:he|him|his|himself)\b/i);
    expect(chapter421).toContain('Liang did not need to beat Nao.');
    expect(chapter421).toContain('Nao looked past her.');
    expect(chapter421).toContain('Liang smiled and withdrew.');
  });

  it('guards the later final-arc and epilogue regressions', () => {
    expect(season101).toContain('Liang Yue adjusted one of her unnecessary cloaks.');
    expect(season101).toContain('Kael looked at her.');
    expect(season114).toContain('Kael looked at her.');
    expect(season114).toContain('Liang adjusted one of her three cloaks.');
    expect(endingLock).toContain('Liang Yue when one of her "coincidental" excursions overlaps Kael');

    const combined = [season101, season107, season114, endingLock].join('\n');
    expect(combined).not.toContain('Liang Yue adjusted one of his');
    expect(combined).not.toContain('Liang adjusted one of his three cloaks');
    expect(combined).not.toContain('Liang Yue when one of his "coincidental" excursions');
  });
});
