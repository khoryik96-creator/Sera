import { describe, expect, it } from 'vitest';
import { SHINRIN_TIER_ORDER, shinrinParagons } from '../src/react/features/shinrin/shinrinData';

describe('Shinsei Guild roster', () => {
  it('locks the revised official #1–#10 order (Phase I/II continuity lock)', () => {
    expect(shinrinParagons).toHaveLength(10);
    expect(shinrinParagons.map((f) => f.name)).toEqual([
      'Tsubasa Kurokawa', 'Shunto Takamori', 'Kai Moriyama', 'Haru Ishikawa', 'Eirik Voss',
      'Hana Arakawa', 'Aya Katsuragi', 'Kenji Narukami', 'Jun Kajihara', 'Nao Shibasaki',
    ]);
  });

  it('gives each Paragon the Shinsei Guild affiliation and a named Paragon Domain', () => {
    for (const figure of shinrinParagons) {
      expect(SHINRIN_TIER_ORDER, `${figure.key} tier`).toContain(figure.strength);
      expect(figure.affiliation).toBe('Shinsei Guild');
      const domain = figure.skills?.find((skill) => skill[1] === 'Paragon Domain');
      expect(domain, `${figure.key} domain`).toBeTruthy();
      expect(domain?.[0].endsWith('Dominion'), `${figure.key} domain name`).toBe(true);
      expect(figure.skills?.length, `${figure.key} skills`).toBeGreaterThanOrEqual(4);
    }
  });

  it('matches the revised locked tier assignments', () => {
    const tierByName = Object.fromEntries(shinrinParagons.map((f) => [f.name, f.strength]));
    expect(tierByName['Tsubasa Kurokawa']).toBe('Peak Paragon');
    for (const n of ['Shunto Takamori', 'Kai Moriyama', 'Haru Ishikawa', 'Eirik Voss']) expect(tierByName[n], n).toBe('High Paragon');
    for (const n of ['Hana Arakawa', 'Aya Katsuragi', 'Kenji Narukami']) expect(tierByName[n], n).toBe('Established Paragon');
    for (const n of ['Jun Kajihara', 'Nao Shibasaki']) expect(tierByName[n], n).toBe('Stable Paragon');
  });

  it('keeps subtitles numbered to match the official order', () => {
    shinrinParagons.forEach((f, i) => {
      expect(f.subtitle.startsWith(`Shinsei #${i + 1} `), `${f.name} subtitle #${i + 1}`).toBe(true);
    });
  });

  it('gives Tsubasa the locked One Chain Binds Heaven Ultimate', () => {
    const tsubasa = shinrinParagons.find((f) => f.key === 'tsubasa');
    expect(tsubasa?.skills?.some((s) => s[0] === 'One Chain Binds Heaven')).toBe(true);
  });

  it('gives Tsubasa his new Heaven Returns What It Receives counter-passive', () => {
    const tsubasa = shinrinParagons.find((f) => f.key === 'tsubasa');
    const art = tsubasa?.skills?.find((s) => s[0] === 'Heaven Returns What It Receives');
    expect(art, 'Heaven Returns What It Receives present').toBeTruthy();
    expect(art?.[1]).toMatch(/Passive|Counter/i);
    // Locked identity: received force fuels the next attack without negating the injury.
    expect(art?.[2]).toMatch(/next committed attack/i);
    expect(art?.[2]).toMatch(/stop feeding him/i);
  });

  it('marks Haru as the youngest High Paragon', () => {
    const haru = shinrinParagons.find((f) => f.key === 'haru');
    expect(haru?.strength).toBe('High Paragon');
    expect(haru?.details).toMatch(/youngest High Paragon/i);
  });
});
