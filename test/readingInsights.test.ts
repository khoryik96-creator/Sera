import { describe, expect, it } from 'vitest';
import { arcReadingInsights, furthestOpenedTarget, inProgressSeasonInsights, readingActivity, readingJourneySummary, readingSessions } from '../src/readingInsights';
import type { ReadingJourneyEntry } from '../src/readerJourney';

function journeyEntry(id: string, season: number, openedAt: number): ReadingJourneyEntry {
  return { id, season, title: id, openedAt };
}

describe('reading insights', () => {
  it('summarizes recent activity and a consecutive-day streak', () => {
    const now = new Date(2026, 7, 28, 12).getTime();
    const history = [
      journeyEntry('ep-s1-e1', 1, new Date(2026, 7, 28, 9).getTime()),
      journeyEntry('ep-s1-e2', 1, new Date(2026, 7, 27, 9).getTime()),
      journeyEntry('ep-s1-e3', 1, new Date(2026, 7, 26, 9).getTime()),
      journeyEntry('ep-s1-e4', 1, new Date(2026, 7, 23, 9).getTime()),
    ];
    const summary = readingActivity(history, 14, now);
    expect(summary.streak).toBe(3);
    expect(summary.activeDays).toBe(4);
    expect(summary.recentSeven).toBe(4);
    expect(summary.days).toHaveLength(14);
  });

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

  it('recognizes partial and complete season progress inside arc insights', () => {
    const seasonOne = Array.from({ length: 10 }, (_, index) => `ep-s1-e${index + 1}`);
    const insights = arcReadingInsights(seasonOne);
    expect(insights[0]?.read).toBeGreaterThanOrEqual(10);
    expect(insights[0]?.nextUnread).not.toBeNull();

    const partial = inProgressSeasonInsights(['ep-s2-e1', 'ep-s2-e2']);
    expect(partial.some((row) => row.season === 2 && row.read === 2)).toBe(true);
  });

  it('finds the furthest opened episode in story order', () => {
    expect(furthestOpenedTarget(['ep-s1-e9', 'ep-s12-e3', 'ep-s7-e10'])).toEqual({ id: 'ep-s12-e3', season: 12, episode: 3 });
    expect(furthestOpenedTarget([])).toBeNull();
  });
});
