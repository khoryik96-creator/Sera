import { describe, expect, it } from 'vitest';
import { allReadingTargets, completedSeasonCount, episodeCountForSeason, episodeId, nextUnreadInSeason, nextUnreadTarget, overallReadingProgress, progressForSeason } from '../src/readingProgress';

describe('reading progress', () => {
  it('maps the complete 683-chapter archive', () => {
    expect(episodeCountForSeason(1)).toBe(10);
    expect(episodeCountForSeason(63)).toBe(10);
    expect(episodeCountForSeason(64)).toBe(3);
    expect(episodeCountForSeason(69)).toBe(10);
    expect(allReadingTargets()).toHaveLength(683);
  });

  it('calculates season and overall progress from opened episode ids', () => {
    const read = [episodeId(1, 1), episodeId(1, 2), episodeId(64, 1)];
    expect(progressForSeason(read, 1)).toMatchObject({ read: 2, total: 10, percent: 20, complete: false });
    expect(progressForSeason(read, 64)).toMatchObject({ read: 1, total: 3, percent: 33, complete: false });
    expect(overallReadingProgress(read)).toMatchObject({ read: 3, total: 683 });
  });

  it('counts a season complete only after every episode is opened', () => {
    const seasonOne = Array.from({ length: 10 }, (_, index) => episodeId(1, index + 1));
    expect(progressForSeason(seasonOne, 1).complete).toBe(true);
    expect(completedSeasonCount(seasonOne)).toBe(1);
  });

  it('finds the next unread episode after the current reading position', () => {
    const read = [episodeId(1, 1), episodeId(1, 2), episodeId(1, 4)];
    expect(nextUnreadTarget(read, { season: 1, episode: 2 })).toMatchObject({ season: 1, episode: 3 });
    expect(nextUnreadInSeason(read, 1, 2)).toMatchObject({ season: 1, episode: 3 });
  });

  it('wraps to an earlier unread gap after later episodes have been opened', () => {
    const read = allReadingTargets().filter((target) => target.id !== episodeId(1, 2)).map((target) => target.id);
    expect(nextUnreadTarget(read, { season: 69, episode: 10 })).toMatchObject({ season: 1, episode: 2 });
  });
});
