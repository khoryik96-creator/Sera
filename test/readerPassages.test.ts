// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { deletePassage, getSavedPassages, savePassage, validSavedPassage } from '../src/readerPassages';

beforeEach(() => localStorage.clear());

describe('saved passages', () => {
  it('saves normalized passage text with episode metadata', () => {
    const passages = savePassage({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: '  A   quiet\nline worth keeping.  ' }, 100);
    expect(passages).toHaveLength(1);
    expect(passages[0]).toMatchObject({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: 'A quiet line worth keeping.', createdAt: 100 });
    expect(getSavedPassages()).toEqual(passages);
  });

  it('does not duplicate the same passage from the same episode', () => {
    savePassage({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: 'Same line.' }, 100);
    savePassage({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: 'Same   line.' }, 200);
    expect(getSavedPassages()).toHaveLength(1);
  });

  it('allows the same text to be saved from different episodes', () => {
    savePassage({ id: 'ep-s1-e1', season: 1, title: 'Opening', text: 'Echo.' }, 100);
    savePassage({ id: 'ep-s1-e2', season: 1, title: 'Second', text: 'Echo.' }, 200);
    expect(getSavedPassages()).toHaveLength(2);
  });

  it('deletes one saved passage by key', () => {
    const [passage] = savePassage({ id: 'ep-s2-e1', season: 2, title: 'Saved', text: 'Keep this.' }, 300);
    expect(passage).toBeTruthy();
    deletePassage(passage!.key);
    expect(getSavedPassages()).toEqual([]);
  });

  it('rejects passage metadata that does not match the episode id', () => {
    expect(validSavedPassage({ key: 'bad', id: 'ep-s1-e1', season: 2, title: 'Mismatch', text: 'Nope', createdAt: 1 })).toBe(false);
    expect(savePassage({ id: 'ep-s64-e99', season: 64, title: 'Phantom', text: 'Nope' }, 400)).toEqual([]);
  });
});
