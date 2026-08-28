import { describe, expect, it } from 'vitest';
import { arcReadingInsights, furthestOpenedTarget, inProgressSeasonInsights, readingActivity } from '../src/readingInsights';
import type { ReadingHistoryEntry } from '../src/readerLibrary';

function historyEntry(id: string, season: number, openedAt: number): ReadingHistoryEntry {
  return { id, season, title: id, openedAt };
}

describe('reading insights', () => {
  it('summarizes recent activity and a consecutive-day streak', () => {
    const now = new Date(2026, 7, 28, 12).getTime();
    const history = [
      historyEntry('ep-s1-e1', 1, new Date(2026, 7, 28, 9).getTime()),
      historyEntry('ep-s1-e2', 1, new Date(2026, 7, 27, 9).getTime()),
      historyEntry('ep-s1-e3', 1, new Date(2026, 7, 26, 9).getTime()),
      historyEntry('ep-s1-e4', 1, new Date(2026, 7, 23, 9).getTime()),
    ];
    const summary = readingActivity(history, 14, now);
    expect(summary.streak).toBe(3);
    expect(summary.activeDays).toBe(4);
    expect(summary.recentSeven).toBe(4);
    expect(summary.days).toHaveLength(14);
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
