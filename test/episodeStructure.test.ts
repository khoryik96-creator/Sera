import { describe, it, expect } from 'vitest';
import { EPISODE_ARCS } from '../src/episodeMeta';

const seasons = EPISODE_ARCS.flatMap((arc) => arc.seasons);

describe('episode archive metadata', () => {
  it('declares every season exactly once', () => {
    expect(seasons.map((s) => s.season)).toEqual(Array.from({ length: 74 }, (_, i) => i + 1));
  });

  it('preserves the Season 1 lock, Season 64 epilogue and continuation heading', () => {
    expect(seasons.find((s) => s.season === 1)?.badge).toMatch(/LOCKED/);
    expect(seasons.find((s) => s.season === 64)?.title).toMatch(/Epilogue: Two Years Later/);
    expect(seasons.find((s) => s.season === 74)?.title).toMatch(/Last Cup Before North/);
  });

  it('preserves arc grouping instead of flattening the story', () => {
    expect(EPISODE_ARCS).toHaveLength(14);
    expect(EPISODE_ARCS[0].title).toMatch(/Quiet Regular/);
    expect(EPISODE_ARCS[EPISODE_ARCS.length - 1]?.title).toMatch(/Beneath the Crooked Sign/);
  });

  it('adds cast-guide slots only from Season 4 onward', () => {
    expect(seasons.filter((s) => s.season <= 3).every((s) => !s.hasCast)).toBe(true);
    expect(seasons.filter((s) => s.season >= 4).every((s) => s.hasCast)).toBe(true);
  });
});
