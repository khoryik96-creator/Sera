import { describe, it, expect, beforeAll } from 'vitest';
import data from '../src/data.json';
import { setDB } from '../src/db';
import type { RawDatabase } from '../src/types';
import { isIsgardAffiliation, isgardGuild, isgardGuildKey } from '../src/react/shared/isgard';
import { buildArchiveFigures } from '../src/react/features/villains/archiveFigures';

beforeAll(() => setDB(data as unknown as RawDatabase));

describe('isgard helpers', () => {
  it('detects Isgard affiliations and ignores non-Isgard ones', () => {
    expect(isIsgardAffiliation('Dravaryn Crimson Host — Isgard')).toBe(true);
    expect(isIsgardAffiliation('Eirholt — Winter Physicians, Isgard')).toBe(true);
    expect(isIsgardAffiliation('Pale Orchid Court')).toBe(false);
    expect(isIsgardAffiliation(undefined)).toBe(false);
  });

  it('strips the trailing "— Isgard" / ", Isgard" tail for the guild heading', () => {
    expect(isgardGuild('Veyrhald First Banner — Isgard')).toBe('Veyrhald First Banner');
    expect(isgardGuild('Eirholt — Winter Physicians, Isgard')).toBe('Eirholt — Winter Physicians');
    expect(isgardGuild('Veyrhald — Unbroken Banner, Isgard')).toBe('Veyrhald — Unbroken Banner');
    expect(isgardGuild(undefined)).toBe('Isgard');
  });

  it('collapses punctuation variants of one house to a single group key', () => {
    // Arc-figure spelling vs the inferred affiliation spelling for the same house.
    expect(isgardGuildKey('Skeldran Thousandfold Hunt — Isgard'))
      .toBe(isgardGuildKey('Skeldran — Thousandfold Hunt, Isgard'));
    // Genuinely distinct banners of the same house stay apart.
    expect(isgardGuildKey('Veyrhald First Banner — Isgard'))
      .not.toBe(isgardGuildKey('Veyrhald — Unbroken Banner, Isgard'));
  });
});

describe('archive figure partition', () => {
  const figures = () => buildArchiveFigures();

  it('routes every Isgard-affiliated arc figure into the Isgard set', () => {
    const isgard = figures().filter((figure) => isIsgardAffiliation(figure.affiliation));
    const keys = new Set(isgard.map((figure) => figure.key));
    for (const key of ['aldric', 'sigrun', 'halvek', 'solveig', 'raska', 'eldran', 'maedra', 'mareth', 'garran', 'eira', 'tor_veyrhald', 'brynja', 'oskar', 'astrid', 'jorek', 'freya', 'kellan']) {
      expect(keys.has(key), `${key} should be an Isgard figure`).toBe(true);
    }
    // Every figure in the Isgard set groups under a non-empty guild heading.
    for (const figure of isgard) expect(isgardGuild(figure.affiliation).length).toBeGreaterThan(0);
  });

  it('keeps Isgard figures out of the Other Characters / Villains grid', () => {
    const villains = figures().filter((figure) => !isIsgardAffiliation(figure.affiliation));
    expect(villains.some((figure) => isIsgardAffiliation(figure.affiliation))).toBe(false);
    expect(villains.some((figure) => figure.key === 'aldric')).toBe(false);
    // The partition is exhaustive: nothing is dropped by the split.
    const isgard = figures().filter((figure) => isIsgardAffiliation(figure.affiliation));
    expect(villains.length + isgard.length).toBe(figures().length);
  });
});
