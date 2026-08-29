import { describe, expect, it } from 'vitest';
import { restoredCanonReferences } from '../src/canonReference';

describe('restored React canon references', () => {
  it('restores the stable legacy world and reveal rules without duplicate titles', () => {
    const titles = restoredCanonReferences.map((rule) => rule.title);
    expect(new Set(titles).size).toBe(titles.length);
    expect(titles).toContain('Season 1 Lock');
    expect(titles).toContain('Murim Power System');
    expect(titles).toContain('Formal Technique Tier Hierarchy');
    expect(titles).toContain('Rhen Recognition Rule');
    expect(titles).toContain('Sera + Rhen Center Rule');
    expect(titles).toContain('Duke / Marquis Structure');
  });

  it('keeps the Murim setting and technique ladder explicit', () => {
    const murim = restoredCanonReferences.find((rule) => rule.title === 'Murim Power System');
    const tiers = restoredCanonReferences.find((rule) => rule.title === 'Formal Technique Tier Hierarchy');
    expect(murim?.text).toContain('No Western magic or spellcasting');
    expect(tiers?.text).toContain('Named Technique < Transcended Skill < Supreme Art < Ultimate Art');
  });
});
