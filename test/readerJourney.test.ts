// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { clearReadingJourney, getReadingJourney, JOURNEY_KEY, recordReadingJourney } from '../src/readerJourney';

beforeEach(() => localStorage.clear());

describe('reading journey', () => {
  it('records repeated visits instead of replacing earlier episode timestamps', () => {
    recordReadingJourney({ id: 'ep-s1-e1', season: 1, title: 'Opening' }, false, 1000);
    recordReadingJourney({ id: 'ep-s1-e2', season: 1, title: 'Second' }, false, 3000);
    recordReadingJourney({ id: 'ep-s1-e1', season: 1, title: 'Opening again' }, false, 5000);
    expect(getReadingJourney().visits.map((entry) => [entry.id, entry.openedAt])).toEqual([
      ['ep-s1-e1', 5000],
      ['ep-s1-e2', 3000],
      ['ep-s1-e1', 1000],
    ]);
  });

  it('suppresses accidental duplicate mounts inside a short window', () => {
    recordReadingJourney({ id: 'ep-s1-e1', season: 1, title: 'Opening' }, false, 1000);
    recordReadingJourney({ id: 'ep-s1-e1', season: 1, title: 'Opening' }, false, 1800);
    expect(getReadingJourney().visits).toHaveLength(1);
  });

  it('records each season completion milestone only once', () => {
    recordReadingJourney({ id: 'ep-s1-e10', season: 1, title: 'Finale' }, true, 2000);
    recordReadingJourney({ id: 'ep-s1-e10', season: 1, title: 'Finale revisit' }, true, 5000);
    expect(getReadingJourney().seasonCompletions).toEqual([{ season: 1, completedAt: 2000 }]);
  });

  it('migrates legacy recent history into the journey when no v2 state exists', () => {
    const migrated = getReadingJourney([
      { id: 'ep-s2-e2', season: 2, title: 'Legacy', openedAt: 1234 },
    ]);
    expect(migrated.visits).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem(JOURNEY_KEY) || '{}').visits[0].id).toBe('ep-s2-e2');
  });

  it('clears the private journey state', () => {
    recordReadingJourney({ id: 'ep-s1-e1', season: 1, title: 'Opening' }, false, 2000);
    clearReadingJourney();
    expect(localStorage.getItem(JOURNEY_KEY)).toBeNull();
  });
});
