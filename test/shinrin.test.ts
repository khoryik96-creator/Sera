import { describe, expect, it } from 'vitest';
import { SHINRIN_TIER_ORDER, shinrinParagons } from '../src/react/features/shinrin/shinrinData';

describe('Shinsei Guild roster', () => {
  it('locks exactly the ten official Paragons in canonical order', () => {
    expect(shinrinParagons).toHaveLength(10);
    expect(shinrinParagons.map((f) => f.name)).toEqual([
      'Tsubasa Kurokawa', 'Shunto Takamori', 'Haru Ishikawa', 'Hana Arakawa', 'Kai Moriyama',
      'Aya Katsuragi', 'Kenji Narukami', 'Jun Kajihara', 'Eirik Voss', 'Nao Shibasaki',
    ]);
  });

  it('gives each Paragon a locked tier, the Shinsei Guild affiliation and a named Paragon Domain', () => {
    for (const figure of shinrinParagons) {
      expect(SHINRIN_TIER_ORDER, `${figure.key} tier`).toContain(figure.strength);
      expect(figure.affiliation).toBe('Shinsei Guild');
      const domain = figure.skills?.find((skill) => skill[1] === 'Paragon Domain');
      expect(domain, `${figure.key} domain`).toBeTruthy();
      expect(domain?.[0].endsWith('Dominion'), `${figure.key} domain name`).toBe(true);
      // Three signature skills plus the Domain (Tsubasa also carries his Ultimate).
      expect(figure.skills?.length, `${figure.key} skills`).toBeGreaterThanOrEqual(4);
    }
  });

  it('gives Tsubasa the locked One Chain Binds Heaven Ultimate', () => {
    const tsubasa = shinrinParagons.find((f) => f.key === 'tsubasa');
    expect(tsubasa?.skills?.some((s) => s[0] === 'One Chain Binds Heaven')).toBe(true);
  });

  it('matches the locked tier assignments', () => {
    const tierByName = Object.fromEntries(shinrinParagons.map((f) => [f.name, f.strength]));
    expect(tierByName['Tsubasa Kurokawa']).toBe('Peak Paragon');
    for (const n of ['Shunto Takamori', 'Haru Ishikawa', 'Hana Arakawa', 'Kai Moriyama']) expect(tierByName[n]).toBe('Established Paragon');
    for (const n of ['Aya Katsuragi', 'Kenji Narukami', 'Jun Kajihara', 'Eirik Voss', 'Nao Shibasaki']) expect(tierByName[n]).toBe('Stable Paragon');
  });
});
