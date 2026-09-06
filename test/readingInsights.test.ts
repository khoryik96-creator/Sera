import { describe, expect, it } from 'vitest';
import { readingJourneySummary, readingSessions } from '../src/readingInsights';
import type { ReadingJourneyEntry } from '../src/readerJourney';

function journeyEntry(id: string, season: number, openedAt: number): ReadingJourneyEntry {
  return { id, season, title: id, openedAt };
}

describe('reading insights', () => {
  it('reconstructs sessions with a thirty-minute inactivity gap', () => {
    const base = new Date(2026, 7, 28, 9).getTime();
    const visits = [
      journeyEntry('ep-s1-e1', 1, base),
      journeyEntry('ep-s1-e2', 1, base + 10 * 60_000),
      journeyEntry('ep-s1-e3', 1, base + 20 * 60_000),
      journeyEntry('ep-s2-e1', 2, base + 80 * 60_000),
    ];
    const sessions = readingSessions(visits);
    expect(sessions).toHaveLength(2);
    expect(sessions[1]?.visits).toBe(3);
    expect(sessions[0]?.last.id).toBe('ep-s2-e1');
  });

  it('counts revisits and identifies the busiest season', () => {
    const visits = [
      journeyEntry('ep-s1-e1', 1, 1000),
      journeyEntry('ep-s1-e2', 1, 3000),
      journeyEntry('ep-s1-e1', 1, 5000),
      journeyEntry('ep-s2-e1', 2, 7000),
    ];
    const summary = readingJourneySummary(visits);
    expect(summary.totalVisits).toBe(4);
    expect(summary.uniqueEpisodes).toBe(3);
    expect(summary.revisits).toBe(1);
    expect(summary.busiestSeason).toEqual({ season: 1, visits: 3 });
    expect(summary.busiestArc?.title).toContain('Arc I');
  });

});
