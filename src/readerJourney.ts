import type { Bookmark } from './bookmarks';
import { episodeCountForSeason } from './readingProgress';

export const JOURNEY_KEY = 'tqr:readingJourney:v2';

const EPISODE_ID = /^ep-s(\d+)-e(\d+)$/;
const VISIT_LIMIT = 500;
const COMPLETION_LIMIT = 64;

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

function validBookmark(value: unknown): value is Bookmark {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Bookmark>;
  if (typeof item.id !== 'string' || typeof item.title !== 'string' || !Number.isInteger(item.season)) return false;
  const match = item.id.match(EPISODE_ID);
  if (!match) return false;
  const season = Number(match[1]);
  const episode = Number(match[2]);
  const total = episodeCountForSeason(season);
  return Boolean(total && season === item.season && episode >= 1 && episode <= total);
}

export function validReadingJourneyEntry(value: unknown): value is ReadingJourneyEntry {
  return validBookmark(value)
    && typeof (value as ReadingJourneyEntry).openedAt === 'number'
    && Number.isFinite((value as ReadingJourneyEntry).openedAt);
}

export function validSeasonCompletionEntry(value: unknown): value is SeasonCompletionEntry {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<SeasonCompletionEntry>;
  return Number.isInteger(item.season)
    && Number(item.season) >= 1
    && Number(item.season) <= 64
    && typeof item.completedAt === 'number'
    && Number.isFinite(item.completedAt);
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

export function persistReadingJourney(state: ReadingJourneyState): ReadingJourneyState {
  const normalized = normalizeReadingJourney(state);
  try {
    localStorage.setItem(JOURNEY_KEY, JSON.stringify(normalized));
  } catch {
    // Journey tracking is optional if storage is unavailable.
  }
  return normalized;
}

export function getReadingJourney(legacyVisits: readonly ReadingJourneyEntry[] = []): ReadingJourneyState {
  try {
    const raw = localStorage.getItem(JOURNEY_KEY);
    if (!raw) {
      const migrated = normalizeReadingJourney({ visits: legacyVisits.filter(validReadingJourneyEntry), seasonCompletions: [] });
      if (migrated.visits.length) persistReadingJourney(migrated);
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
  if (!validBookmark(bookmark) || !Number.isFinite(openedAt)) return getReadingJourney();
  const current = getReadingJourney();
  const latest = current.visits[0];
  const duplicateMount = latest?.id === bookmark.id && Math.abs(openedAt - latest.openedAt) < 1_500;
  const visits = duplicateMount ? current.visits : [{ ...bookmark, openedAt }, ...current.visits];
  const alreadyCompleted = current.seasonCompletions.some((entry) => entry.season === bookmark.season);
  const seasonCompletions = seasonCompleted && !alreadyCompleted
    ? [{ season: bookmark.season, completedAt: openedAt }, ...current.seasonCompletions]
    : current.seasonCompletions;
  return persistReadingJourney({ visits, seasonCompletions });
}

export function clearReadingJourney(): void {
  try {
    localStorage.removeItem(JOURNEY_KEY);
  } catch {
    // Storage may be unavailable.
  }
}
