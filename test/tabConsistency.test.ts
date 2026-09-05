import { describe, expect, it } from 'vitest';
import rawData from '../src/data.json';
import type { RawDatabase } from '../src/types';
import { orchidHierarchy } from '../src/react/features/teahouse/teahouseData';

const data = rawData as unknown as RawDatabase;

// Rhen and Sera are the two characters whose signature arts are authored in
// TWO independent places: the Characters / Arts & Techniques tabs read
// data.json (rhenSkills / seraSkills), while the Quaint Teahouse tab reads
// teahouseData.ts (orchidHierarchy). Nothing structurally forces the two
// lists to agree, so a skill added to one tab can silently go missing on the
// other (this is exactly how "Monarch's Winter Law" first shipped on the
// Characters tab but not the Teahouse tab). These guards fail CI on that drift.

function teahouseMember(key: string) {
  const member = orchidHierarchy.find((m) => m.key === key);
  expect(member, `${key} is present in orchidHierarchy`).toBeTruthy();
  return member!;
}

describe('cross-tab skill consistency (data.json ⇄ teahouseData)', () => {
  it('shows every one of Rhen’s rhenSkills arts on the Teahouse tab', () => {
    const rhenArtNames = new Set((teahouseMember('rhen').arts ?? []).map((a) => a.name.trim()));
    const missing = data.rhenSkills.map((s) => s.name.trim()).filter((name) => !rhenArtNames.has(name));
    expect(missing, `rhenSkills missing from the Teahouse tab: ${missing.join(', ')}`).toEqual([]);
  });

  it('covers every one of Sera’s seraSkills arts on the Teahouse tab (as an art card or in the named-techniques line)', () => {
    const sera = teahouseMember('sera');
    const artNames = new Set((sera.arts ?? []).map((a) => a.name.trim()));
    const prose = (sera.skills ?? []).join(' ');
    const missing = data.seraSkills
      .map((s) => s.name.trim())
      .filter((name) => !artNames.has(name) && !prose.includes(name));
    expect(missing, `seraSkills not represented on the Teahouse tab: ${missing.join(', ')}`).toEqual([]);
  });
});
