import type { Bookmark } from './bookmarks';
import { validBookmark } from './bookmarks';
import { validReaderTimestamp } from './readerValidation';

export const JOURNEY_KEY = 'tqr:readingJourney:v2';

const VISIT_LIMIT = 500;
// One entry per season, so this tracks the total season count. It must stay in
// step with the story length (currently 74) — otherwise a reader who completes
// more than this many seasons has their whole Reading Journey rejected as
// invalid and later completions dropped on restore.
const COMPLETION_LIMIT = 74;

export interface ReadingJourneyEntry extends Bookmark {
  openedAt: number;
}

export interface SeasonCompletionEntry {
  season: number;
  completedAt: number;
}

export interface ReadingJourneyState {
  visits: ReadingJourneyEntry[];
  seasonCompletions: SeasonCompletionEntry[];
}

export function emptyReadingJourney(): ReadingJourneyState {
  return { visits: [], seasonCompletions: [] };
}

export function validReadingJourneyEntry(value: unknown): value is ReadingJourneyEntry {
  return validBookmark(value) && validReaderTimestamp((value as ReadingJourneyEntry).openedAt);
}

export function validSeasonCompletionEntry(value: unknown): value is SeasonCompletionEntry {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<SeasonCompletionEntry>;
  return Number.isInteger(item.season)
    && Number(item.season) >= 1
    && Number(item.season) <= 74
    && validReaderTimestamp(item.completedAt);
}

export function validReadingJourney(value: unknown): value is ReadingJourneyState {
  if (!value || typeof value !== 'object') return false;
  const state = value as Partial<ReadingJourneyState>;
  if (!Array.isArray(state.visits) || state.visits.length > VISIT_LIMIT || !state.visits.every(validReadingJourneyEntry)) return false;
  if (!Array.isArray(state.seasonCompletions) || state.seasonCompletions.length > COMPLETION_LIMIT || !state.seasonCompletions.every(validSeasonCompletionEntry)) return false;
  const seasons = state.seasonCompletions.map((entry) => entry.season);
  return new Set(seasons).size === seasons.length;
}

function normalizeReadingJourney(state: ReadingJourneyState): ReadingJourneyState {
  return {
    visits: state.visits
      .filter(validReadingJourneyEntry)
      .sort((a, b) => b.openedAt - a.openedAt)
      .slice(0, VISIT_LIMIT),
    seasonCompletions: state.seasonCompletions
      .filter(validSeasonCompletionEntry)
      .sort((a, b) => b.completedAt - a.completedAt)
      .slice(0, COMPLETION_LIMIT),
  };
}

/** Strict persistence used by backup restore; storage failures must be visible. */
export function persistReadingJourney(state: ReadingJourneyState): ReadingJourneyState {
  const normalized = normalizeReadingJourney(state);
  if (!validReadingJourney(normalized)) throw new Error('Reading Journey data is invalid.');
  try {
    if (!normalized.visits.length && !normalized.seasonCompletions.length) localStorage.removeItem(JOURNEY_KEY);
    else localStorage.setItem(JOURNEY_KEY, JSON.stringify(normalized));
  } catch {
    throw new Error('This browser blocked Reading Journey storage.');
  }
  return normalized;
}

export function getReadingJourney(legacyVisits: readonly ReadingJourneyEntry[] = []): ReadingJourneyState {
  try {
    const raw = localStorage.getItem(JOURNEY_KEY);
    if (!raw) {
      const migrated = normalizeReadingJourney({ visits: legacyVisits.filter(validReadingJourneyEntry), seasonCompletions: [] });
      if (migrated.visits.length) {
        try { persistReadingJourney(migrated); } catch { /* Migration remains usable in memory. */ }
      }
      return migrated;
    }
    const parsed = JSON.parse(raw) as unknown;
    return validReadingJourney(parsed) ? normalizeReadingJourney(parsed) : emptyReadingJourney();
  } catch {
    return emptyReadingJourney();
  }
}

export function recordReadingJourney(
  bookmark: Bookmark,
  seasonCompleted = false,
  openedAt = Date.now(),
): ReadingJourneyState {
  if (!validBookmark(bookmark) || !validReaderTimestamp(openedAt)) return getReadingJourney();
  const current = getReadingJourney();
  const latest = current.visits[0];
  const duplicateMount = latest?.id === bookmark.id && Math.abs(openedAt - latest.openedAt) < 1_500;
  const visits = duplicateMount ? current.visits : [{ ...bookmark, openedAt }, ...current.visits];
  const alreadyCompleted = current.seasonCompletions.some((entry) => entry.season === bookmark.season);
  const seasonCompletions = seasonCompleted && !alreadyCompleted
    ? [{ season: bookmark.season, completedAt: openedAt }, ...current.seasonCompletions]
    : current.seasonCompletions;
  try {
    return persistReadingJourney({ visits, seasonCompletions });
  } catch {
    return current;
  }
}

export function clearReadingJourney(): void {
  try {
    localStorage.removeItem(JOURNEY_KEY);
  } catch {
    // Storage may be unavailable.
  }
}
