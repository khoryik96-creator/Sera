// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { createReaderBackup, getReadingHistory, parseReaderBackup, persistReaderBackup, recordReadingHistory } from '../src/readerLibrary';

const preferences = { scale: 1, font: 'serif' as const, spacing: 'comfortable' as const, width: 'standard' as const };

beforeEach(() => localStorage.clear());

describe('reader library', () => {
  it('records newest reading history once per episode', () => {
    recordReadingHistory({ id: 'ep-s1-e1', season: 1, title: 'Opening' }, 100);
    recordReadingHistory({ id: 'ep-s1-e2', season: 1, title: 'Second' }, 200);
    recordReadingHistory({ id: 'ep-s1-e1', season: 1, title: 'Opening again' }, 300);
    expect(getReadingHistory()).toEqual([
      { id: 'ep-s1-e1', season: 1, title: 'Opening again', openedAt: 300 },
      { id: 'ep-s1-e2', season: 1, title: 'Second', openedAt: 200 },
    ]);
  });

  it('creates and restores only known reader-state fields', () => {
    const backup = createReaderBackup({
      bookmarks: [{ id: 'ep-s2-e1', season: 2, title: 'Saved' }],
      lastRead: { id: 'ep-s2-e2', season: 2, title: 'Continue' },
      readEpisodes: ['ep-s2-e1', 'ep-s2-e2'],
      history: [{ id: 'ep-s2-e2', season: 2, title: 'Continue', openedAt: 1234 }],
      preferences,
    });
    const parsed = parseReaderBackup(JSON.stringify(backup));
    persistReaderBackup(parsed);
    expect(JSON.parse(localStorage.getItem('tqr:bookmarks') || '[]')).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('tqr:readEpisodes:v1') || '[]')).toEqual(['ep-s2-e1', 'ep-s2-e2']);
    expect(JSON.parse(localStorage.getItem('tqr:readingHistory:v1') || '[]')[0].id).toBe('ep-s2-e2');
    expect(JSON.parse(localStorage.getItem('tqr:react-reader-prefs-v2') || '{}')).toEqual(preferences);
  });

  it('rejects malformed or phantom episode progress', () => {
    expect(() => parseReaderBackup('not json')).toThrow(/valid JSON/i);
    expect(() => parseReaderBackup(JSON.stringify({ product: 'Other', version: 1 }))).toThrow(/Unsupported/i);
    expect(() => parseReaderBackup(JSON.stringify({
      product: 'The Quiet Regular',
      version: 1,
      bookmarks: [],
      lastRead: null,
      readEpisodes: ['ep-s64-e99'],
      history: [],
      preferences,
    }))).toThrow(/reading progress/i);
  });

  it('rejects bookmarks whose season metadata conflicts with the episode id', () => {
    expect(() => parseReaderBackup(JSON.stringify({
      product: 'The Quiet Regular',
      version: 1,
      bookmarks: [{ id: 'ep-s1-e1', season: 2, title: 'Mismatch' }],
      lastRead: null,
      readEpisodes: [],
      history: [],
      preferences,
    }))).toThrow(/bookmarks/i);
  });
});
