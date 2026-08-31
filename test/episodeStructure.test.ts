import { describe, it, expect } from 'vitest';
import { EPISODE_ARCS, TOTAL_ARCS, TOTAL_SEASONS } from '../src/episodeMeta';

const seasons = EPISODE_ARCS.flatMap((arc) => arc.seasons);

describe('episode archive metadata', () => {
  it('declares every season exactly once', () => {
    expect(seasons.map((s) => s.season)).toEqual(Array.from({ length: TOTAL_SEASONS }, (_, i) => i + 1));
  });

  it('preserves the Season 1 lock, Season 64 epilogue and continuation headings', () => {
    expect(seasons.find((s) => s.season === 1)?.badge).toMatch(/LOCKED/);
    expect(seasons.find((s) => s.season === 64)?.title).toMatch(/Epilogue: Two Years Later/);
    expect(seasons.find((s) => s.season === 74)?.title).toMatch(/Last Cup Before North/);
    expect(seasons.find((s) => s.season === TOTAL_SEASONS)?.title).toMatch(/The Black Current Turns South/);
  });

  it('preserves arc grouping instead of flattening the story', () => {
    expect(EPISODE_ARCS).toHaveLength(TOTAL_ARCS);
    expect(EPISODE_ARCS[0].title).toMatch(/Quiet Regular/);
    expect(EPISODE_ARCS[EPISODE_ARCS.length - 1]?.title).toMatch(/Where the Black Wick Leads/);
  });

  it('adds cast-guide slots only from Season 4 onward', () => {
    expect(seasons.filter((s) => s.season <= 3).every((s) => !s.hasCast)).toBe(true);
    expect(seasons.filter((s) => s.season >= 4).every((s) => s.hasCast)).toBe(true);
  });
});
