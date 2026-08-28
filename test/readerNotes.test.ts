// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { deleteEpisodeNote, getEpisodeNote, getEpisodeNotes, saveEpisodeNote, validEpisodeNote } from '../src/readerNotes';

beforeEach(() => localStorage.clear());

describe('episode notes', () => {
  it('saves, sorts, and retrieves valid notes', () => {
    saveEpisodeNote({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: ' First thought. ' }, 100);
    saveEpisodeNote({ id: 'ep-s1-e2', season: 1, title: 'Second', text: 'Second thought.' }, 200);
    expect(getEpisodeNotes().map((note) => note.id)).toEqual(['ep-s1-e2', 'ep-s1-e1']);
    expect(getEpisodeNote('ep-s1-e1')?.text).toBe('First thought.');
  });

  it('treats an empty saved note as deletion', () => {
    saveEpisodeNote({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: 'Keep me.' }, 100);
    saveEpisodeNote({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: '   ' }, 200);
    expect(getEpisodeNote('ep-s1-e1')).toBeNull();
  });

  it('validates episode ids and season metadata', () => {
    expect(validEpisodeNote({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: 'Valid', updatedAt: 1 })).toBe(true);
    expect(validEpisodeNote({ id: 'ep-s64-e99', season: 64, title: 'Phantom', text: 'Invalid', updatedAt: 1 })).toBe(false);
    expect(validEpisodeNote({ id: 'ep-s1-e1', season: 2, title: 'Mismatch', text: 'Invalid', updatedAt: 1 })).toBe(false);
  });

  it('deletes notes explicitly', () => {
    saveEpisodeNote({ id: 'ep-s2-e1', season: 2, title: 'Season two', text: 'Remove later.' }, 100);
    expect(deleteEpisodeNote('ep-s2-e1')).toEqual([]);
    expect(localStorage.getItem('tqr:episodeNotes:v1')).toBeNull();
  });
});
