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

  it('creates and restores known reader-state fields including journey, organization, notes, passages, and exact positions', () => {
    const backup = createReaderBackup({
      bookmarks: [{ id: 'ep-s2-e1', season: 2, title: 'Saved' }],
      lastRead: { id: 'ep-s2-e2', season: 2, title: 'Continue' },
      readEpisodes: ['ep-s2-e1', 'ep-s2-e2'],
      history: [{ id: 'ep-s2-e2', season: 2, title: 'Continue', openedAt: 1234 }],
      journey: {
        visits: [
          { id: 'ep-s2-e2', season: 2, title: 'Continue', openedAt: 2234 },
          { id: 'ep-s2-e1', season: 2, title: 'Saved', openedAt: 1234 },
        ],
        seasonCompletions: [{ season: 2, completedAt: 3333 }],
      },
      notes: [{ id: 'ep-s2-e2', season: 2, title: 'Continue', text: 'Remember the callback.', updatedAt: 2222 }],
      passages: [{ key: 'ep-s2-e2:3333', id: 'ep-s2-e2', season: 2, title: 'Continue', text: 'A line worth keeping.', createdAt: 3333 }],
      positions: [{ id: 'ep-s2-e2', season: 2, episode: 2, progress: 0.57, updatedAt: 4444 }],
      organization: {
        collections: [{ id: 'collection-abc', name: 'Rhen moments', createdAt: 5000, updatedAt: 5000 }],
        items: [{ key: 'bookmark:ep-s2-e1', favorite: true, collectionIds: ['collection-abc'], tags: ['Rhen'] }],
      },
      preferences,
    });
    const parsed = parseReaderBackup(JSON.stringify(backup));
    persistReaderBackup(parsed);
    expect(JSON.parse(localStorage.getItem('tqr:bookmarks') || '[]')).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('tqr:readEpisodes:v1') || '[]')).toEqual(['ep-s2-e1', 'ep-s2-e2']);
    expect(JSON.parse(localStorage.getItem('tqr:readingHistory:v1') || '[]')[0].id).toBe('ep-s2-e2');
    expect(JSON.parse(localStorage.getItem('tqr:readingJourney:v2') || '{}').visits).toHaveLength(2);
    expect(JSON.parse(localStorage.getItem('tqr:readingJourney:v2') || '{}').seasonCompletions[0].season).toBe(2);
    expect(JSON.parse(localStorage.getItem('tqr:episodeNotes:v1') || '[]')[0].text).toBe('Remember the callback.');
    expect(JSON.parse(localStorage.getItem('tqr:savedPassages:v1') || '[]')[0].text).toBe('A line worth keeping.');
    expect(JSON.parse(localStorage.getItem('tqr:chapterPositions:v1') || '[]')[0].progress).toBe(0.57);
    expect(JSON.parse(localStorage.getItem('tqr:readerOrganization:v1') || '{}').collections[0].name).toBe('Rhen moments');
    expect(JSON.parse(localStorage.getItem('tqr:react-reader-prefs-v2') || '{}')).toEqual(preferences);
  });

  it('keeps old v1 backups valid by deriving journey visits from legacy history and defaulting other newer fields', () => {
    const parsed = parseReaderBackup(JSON.stringify({
      product: 'The Quiet Regular',
      version: 1,
      bookmarks: [],
      lastRead: null,
      readEpisodes: [],
      history: [{ id: 'ep-s1-e1', season: 1, title: 'Legacy recent', openedAt: 1000 }],
      preferences,
    }));
    expect(parsed.notes).toEqual([]);
    expect(parsed.passages).toEqual([]);
    expect(parsed.positions).toEqual([]);
    expect(parsed.organization).toEqual({ collections: [], items: [] });
    expect(parsed.journey.visits).toEqual(parsed.history);
    expect(parsed.journey.seasonCompletions).toEqual([]);
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
      notes: [],
      passages: [],
      positions: [],
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
      notes: [],
      passages: [],
      positions: [],
      preferences,
    }))).toThrow(/bookmarks/i);
  });

  it('rejects notes whose episode metadata conflicts with the episode id', () => {
    expect(() => parseReaderBackup(JSON.stringify({
      product: 'The Quiet Regular',
      version: 1,
      bookmarks: [],
      lastRead: null,
      readEpisodes: [],
      history: [],
      notes: [{ id: 'ep-s1-e1', season: 2, title: 'Mismatch', text: 'Nope', updatedAt: 1 }],
      passages: [],
      positions: [],
      preferences,
    }))).toThrow(/episode notes/i);
  });

  it('rejects saved passages whose season metadata conflicts with the episode id', () => {
    expect(() => parseReaderBackup(JSON.stringify({
      product: 'The Quiet Regular',
      version: 1,
      bookmarks: [],
      lastRead: null,
      readEpisodes: [],
      history: [],
      notes: [],
      passages: [{ key: 'bad', id: 'ep-s1-e1', season: 2, title: 'Mismatch', text: 'Nope', createdAt: 1 }],
      positions: [],
      preferences,
    }))).toThrow(/saved passages/i);
  });

  it('rejects exact positions whose episode metadata conflicts with the id', () => {
    expect(() => parseReaderBackup(JSON.stringify({
      product: 'The Quiet Regular',
      version: 1,
      bookmarks: [],
      lastRead: null,
      readEpisodes: [],
      history: [],
      notes: [],
      passages: [],
      positions: [{ id: 'ep-s1-e1', season: 2, episode: 1, progress: 0.4, updatedAt: 1 }],
      preferences,
    }))).toThrow(/chapter positions/i);
  });

  it('rejects malformed Reader Library organization data', () => {
    expect(() => parseReaderBackup(JSON.stringify({
      product: 'The Quiet Regular',
      version: 1,
      bookmarks: [],
      lastRead: null,
      readEpisodes: [],
      history: [],
      notes: [],
      passages: [],
      positions: [],
      organization: {
        collections: [],
        items: [{ key: 'bookmark:ep-s1-e1', favorite: false, collectionIds: ['collection-missing'], tags: [] }],
      },
      preferences,
    }))).toThrow(/organization/i);
  });

  it('rejects malformed Reading Journey data', () => {
    expect(() => parseReaderBackup(JSON.stringify({
      product: 'The Quiet Regular',
      version: 1,
      bookmarks: [],
      lastRead: null,
      readEpisodes: [],
      history: [],
      journey: {
        visits: [{ id: 'ep-s1-e99', season: 1, title: 'Phantom', openedAt: 1 }],
        seasonCompletions: [],
      },
      preferences,
    }))).toThrow(/reading journey/i);
  });
});
