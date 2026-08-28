import { describe, it, expect } from 'vitest';
import { EPISODE_ARCS } from '../src/episodeMeta';

const seasons = EPISODE_ARCS.flatMap((arc) => arc.seasons);

describe('episode archive metadata', () => {
  it('declares every season exactly once', () => {
    expect(seasons.map((s) => s.season)).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
  });

  it('preserves the Season 1 lock and final epilogue heading', () => {
    expect(seasons.find((s) => s.season === 1)?.badge).toMatch(/LOCKED/);
    expect(seasons.find((s) => s.season === 64)?.title).toMatch(/Epilogue: Two Years Later/);
  });

  it('preserves arc grouping instead of flattening the story', () => {
    expect(EPISODE_ARCS).toHaveLength(13);
    expect(EPISODE_ARCS[0].title).toMatch(/Quiet Regular/);
    expect(EPISODE_ARCS[EPISODE_ARCS.length - 1]?.title).toMatch(/Second Spring/);
  });

  it('adds cast-guide slots only from Season 4 onward', () => {
    expect(seasons.filter((s) => s.season <= 3).every((s) => !s.hasCast)).toBe(true);
    expect(seasons.filter((s) => s.season >= 4).every((s) => s.hasCast)).toBe(true);
  });
});
