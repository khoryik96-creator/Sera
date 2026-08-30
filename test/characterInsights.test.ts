import { beforeAll, describe, expect, it } from 'vitest';
import rawData from '../src/data.json';
import { normalizeDatabase, setDB } from '../src/db';
import { characterAliases, characterAppearanceSeasons, rankJourney, relatedCharacters } from '../src/react/shared/characterInsights';
import type { RawDatabase } from '../src/types';

beforeAll(() => {
  setDB(normalizeDatabase(rawData as unknown as RawDatabase));
});

describe('Characters v2 insights', () => {
  it('compresses Sera seasonal rank history into the canonical three states', () => {
    const steps = rankJourney('Sera');
    expect(steps.map((step) => [step.rank, step.fromSeason, step.toSeason])).toEqual([
      ['#7', 1, 22],
      ['#6', 23, 43],
      ['Former #6', 44, 64],
    ]);
    const last = steps[steps.length - 1];
    expect(last?.status).toBe('former');
    expect(last?.current).toBe(true);
  });

  it('keeps Rhen explicitly unranked across the story', () => {
    expect(rankJourney('Rhen')).toEqual([
      expect.objectContaining({ rank: 'Unranked', status: 'unranked', fromSeason: 1, toSeason: 64, current: true }),
    ]);
  });

  it('uses canonical aliases and distinctive titles without mutating profile data', () => {
    const aliases = characterAliases('sera', 'Sera');
    expect(aliases).toContain('Sera');
    expect(aliases.some((alias) => /Pale Orchid/i.test(alias))).toBe(true);
  });

  it('derives story footprint from the existing season cast index', () => {
    const seasons = characterAppearanceSeasons('sera', 'Sera');
    expect(seasons.length).toBeGreaterThan(0);
    expect(seasons.every((season) => season >= 1 && season <= 69)).toBe(true);
  });

  it('derives relationship links only from existing character records', () => {
    const links = relatedCharacters('sera', 'Sera');
    expect(new Set(links.map((link) => link.key)).size).toBe(links.length);
    expect(links.every((link) => link.key !== 'sera')).toBe(true);
  });
});
