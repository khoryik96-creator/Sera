// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getBookmarks, getLastRead } from '../src/bookmarks';
import { createReaderBackup, parseReaderBackup, persistReaderBackup } from '../src/readerLibrary';
import { recordReadingJourney, validReadingJourney } from '../src/readerJourney';
import { getEpisodeNotes, saveEpisodeNote, validEpisodeNote } from '../src/readerNotes';
import { PASSAGES_KEY, validSavedPassage } from '../src/readerPassages';
import { validChapterPosition } from '../src/readerPositions';

const preferences = { scale: 1, font: 'serif' as const, spacing: 'comfortable' as const, width: 'standard' as const };

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe('reader hardening', () => {
  it('filters corrupt bookmarks and Continue Reading payloads before UI state loads', () => {
    localStorage.setItem('tqr:bookmarks', JSON.stringify([
      { id: 'ep-s1-e1', season: 1, title: 'Valid' },
      { id: 'ep-s1-e999', season: 1, title: 'Phantom' },
      { nope: true },
    ]));
    localStorage.setItem('tqr:lastRead', JSON.stringify({ id: 'ep-s64-e999', season: 64, title: 'Broken' }));
    expect(getBookmarks()).toEqual([{ id: 'ep-s1-e1', season: 1, title: 'Valid' }]);
    expect(getLastRead()).toBeNull();
  });

  it('rejects finite timestamps that are outside the JavaScript Date range', () => {
    const impossible = 1e300;
    expect(validEpisodeNote({ id: 'ep-s1-e1', season: 1, title: 'Bad date', text: 'x', updatedAt: impossible })).toBe(false);
    expect(validSavedPassage({ key: 'ep-s1-e1:bad', id: 'ep-s1-e1', season: 1, title: 'Bad date', text: 'valid passage', createdAt: impossible })).toBe(false);
    expect(validChapterPosition({ id: 'ep-s1-e1', season: 1, episode: 1, progress: 0.5, updatedAt: impossible })).toBe(false);
    expect(validReadingJourney({ visits: [{ id: 'ep-s1-e1', season: 1, title: 'Bad date', openedAt: impossible }], seasonCompletions: [] })).toBe(false);
  });

  it('rejects duplicate and orphaned backup state', () => {
    const duplicateBookmarks = {
      product: 'The Quiet Regular', version: 1, bookmarks: [
        { id: 'ep-s1-e1', season: 1, title: 'One' },
        { id: 'ep-s1-e1', season: 1, title: 'Duplicate' },
      ], lastRead: null, readEpisodes: [], history: [], preferences,
    };
    expect(() => parseReaderBackup(JSON.stringify(duplicateBookmarks))).toThrow(/bookmarks/i);

    const orphanOrganization = {
      product: 'The Quiet Regular', version: 1, bookmarks: [], lastRead: null, readEpisodes: [], history: [],
      organization: { collections: [], items: [{ key: 'bookmark:ep-s1-e1', favorite: true, collectionIds: [], tags: [] }] },
      preferences,
    };
    expect(() => parseReaderBackup(JSON.stringify(orphanOrganization))).toThrow(/organization/i);
  });

  it('rolls a backup restore back if a later storage write fails', () => {
    localStorage.setItem('tqr:bookmarks', JSON.stringify([{ id: 'ep-s1-e1', season: 1, title: 'Original bookmark' }]));
    localStorage.setItem('tqr:episodeNotes:v1', JSON.stringify([{ id: 'ep-s1-e1', season: 1, title: 'Original', text: 'Original note', updatedAt: 100 }]));

    const backup = createReaderBackup({
      bookmarks: [{ id: 'ep-s2-e1', season: 2, title: 'Imported bookmark' }],
      lastRead: { id: 'ep-s2-e1', season: 2, title: 'Imported bookmark' },
      readEpisodes: ['ep-s2-e1'],
      history: [{ id: 'ep-s2-e1', season: 2, title: 'Imported bookmark', openedAt: 200 }],
      journey: { visits: [{ id: 'ep-s2-e1', season: 2, title: 'Imported bookmark', openedAt: 200 }], seasonCompletions: [] },
      notes: [{ id: 'ep-s2-e1', season: 2, title: 'Imported', text: 'Imported note', updatedAt: 200 }],
      passages: [{ key: 'ep-s2-e1:200', id: 'ep-s2-e1', season: 2, title: 'Imported', text: 'Imported passage', createdAt: 200 }],
      positions: [], organization: { collections: [], items: [] }, preferences,
    });

    const originalSetItem = Storage.prototype.setItem;
    let failed = false;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function setItem(key: string, value: string) {
      if (!failed && key === PASSAGES_KEY) {
        failed = true;
        throw new DOMException('Quota exceeded', 'QuotaExceededError');
      }
      return originalSetItem.call(this, key, value);
    });

    expect(() => persistReaderBackup(backup)).toThrow(/rolled back/i);
    expect(JSON.parse(localStorage.getItem('tqr:bookmarks') || '[]')[0].title).toBe('Original bookmark');
    expect(JSON.parse(localStorage.getItem('tqr:episodeNotes:v1') || '[]')[0].text).toBe('Original note');
    expect(localStorage.getItem(PASSAGES_KEY)).toBeNull();
  });

  it('does not return optimistic note or journey state when localStorage rejects a write', () => {
    const originalSetItem = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function setItem(key: string, value: string) {
      if (key === 'tqr:episodeNotes:v1' || key === 'tqr:readingJourney:v2') throw new DOMException('Quota exceeded', 'QuotaExceededError');
      return originalSetItem.call(this, key, value);
    });

    expect(saveEpisodeNote({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: 'Should not persist' }, 100)).toEqual([]);
    expect(getEpisodeNotes()).toEqual([]);
    expect(recordReadingJourney({ id: 'ep-s1-e1', season: 1, title: 'Opening' }, false, 100).visits).toEqual([]);
  });
});
