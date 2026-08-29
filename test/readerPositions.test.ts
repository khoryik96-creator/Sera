// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { CHAPTER_POSITIONS_KEY, getChapterPosition, getChapterPositions, persistChapterPositions, saveChapterPosition, validChapterPosition } from '../src/readerPositions';

beforeEach(() => localStorage.clear());

describe('chapter position memory', () => {
  it('stores one validated resume position per episode', () => {
    saveChapterPosition({ id: 'ep-s1-e1', season: 1, episode: 1, progress: 0.25 }, 100);
    saveChapterPosition({ id: 'ep-s1-e1', season: 1, episode: 1, progress: 0.61 }, 200);
    expect(getChapterPositions()).toEqual([{ id: 'ep-s1-e1', season: 1, episode: 1, progress: 0.61, updatedAt: 200 }]);
    expect(getChapterPosition('ep-s1-e1')?.progress).toBe(0.61);
  });

  it('clamps progress and rejects phantom episode metadata', () => {
    saveChapterPosition({ id: 'ep-s2-e1', season: 2, episode: 1, progress: 2 }, 100);
    expect(getChapterPosition('ep-s2-e1')?.progress).toBe(1);
    saveChapterPosition({ id: 'ep-s64-e99', season: 64, episode: 99, progress: 0.5 }, 200);
    expect(getChapterPosition('ep-s64-e99')).toBeNull();
  });

  it('filters malformed imported positions before persistence', () => {
    persistChapterPositions([
      { id: 'ep-s3-e2', season: 3, episode: 2, progress: 0.4, updatedAt: 10 },
      { id: 'ep-s3-e2', season: 9, episode: 2, progress: 0.8, updatedAt: 20 },
    ]);
    expect(JSON.parse(localStorage.getItem(CHAPTER_POSITIONS_KEY) || '[]')).toEqual([
      { id: 'ep-s3-e2', season: 3, episode: 2, progress: 0.4, updatedAt: 10 },
    ]);
  });

  it('validates only real season and episode coordinates', () => {
    expect(validChapterPosition({ id: 'ep-s64-e3', season: 64, episode: 3, progress: 0.5, updatedAt: 1 })).toBe(true);
    expect(validChapterPosition({ id: 'ep-s64-e4', season: 64, episode: 4, progress: 0.5, updatedAt: 1 })).toBe(false);
    expect(validChapterPosition({ id: 'ep-s1-e1', season: 1, episode: 1, progress: -0.1, updatedAt: 1 })).toBe(false);
  });
});
