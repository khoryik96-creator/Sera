import type { Bookmark } from './bookmarks';
import { validBookmark } from './bookmarks';
import { validEpisodeId } from './readingProgress';
import { JOURNEY_KEY, persistReadingJourney, validReadingJourney } from './readerJourney';
import type { ReadingJourneyState } from './readerJourney';
import { NOTES_KEY, persistEpisodeNotes, validEpisodeNote } from './readerNotes';
import type { EpisodeNote } from './readerNotes';
import { emptyReaderOrganization, persistReaderOrganization, readerLibraryItemKey, READER_ORGANIZATION_KEY, validReaderOrganization } from './readerOrganization';
import type { ReaderOrganizationState } from './readerOrganization';
import { PASSAGES_KEY, persistSavedPassages, validSavedPassage } from './readerPassages';
import type { SavedPassage } from './readerPassages';
import { CHAPTER_POSITIONS_KEY, persistChapterPositions, validChapterPosition } from './readerPositions';
import type { ChapterPosition } from './readerPositions';
import { uniqueBy, uniqueStrings, validReaderTimestamp } from './readerValidation';

export const HISTORY_KEY = 'tqr:readingHistory:v1';
export const BOOKMARKS_KEY = 'tqr:bookmarks';
export const LAST_READ_KEY = 'tqr:lastRead';
export const READ_EPISODES_KEY = 'tqr:readEpisodes:v1';
export const READER_PREFS_KEY = 'tqr:react-reader-prefs-v2';

const HISTORY_LIMIT = 50;
const BOOKMARK_LIMIT = 683;
const READ_EPISODE_LIMIT = 683;
const NOTE_LIMIT = 683;
const PASSAGE_LIMIT = 500;
const POSITION_LIMIT = 160;

const RESTORE_KEYS = [
  BOOKMARKS_KEY,
  LAST_READ_KEY,
  READ_EPISODES_KEY,
  HISTORY_KEY,
  READER_PREFS_KEY,
  NOTES_KEY,
  PASSAGES_KEY,
  CHAPTER_POSITIONS_KEY,
  READER_ORGANIZATION_KEY,
  JOURNEY_KEY,
] as const;

export interface ReadingHistoryEntry extends Bookmark {
  openedAt: number;
}

export interface ReaderPreferenceBackup {
  scale: number;
  font: 'serif' | 'book' | 'sans';
  spacing: 'compact' | 'comfortable' | 'relaxed';
  width: 'narrow' | 'standard' | 'wide';
}

export interface ReaderStateBackup {
  product: 'The Quiet Regular';
  version: 1;
  exportedAt: string;
  bookmarks: Bookmark[];
  lastRead: Bookmark | null;
  readEpisodes: string[];
  history: ReadingHistoryEntry[];
  journey: ReadingJourneyState;
  notes: EpisodeNote[];
  passages: SavedPassage[];
  positions: ChapterPosition[];
  organization: ReaderOrganizationState;
  preferences: ReaderPreferenceBackup;
}

type ReaderBackupInput = Omit<ReaderStateBackup, 'product' | 'version' | 'exportedAt' | 'positions' | 'organization' | 'journey'> & {
  positions?: ChapterPosition[];
  organization?: ReaderOrganizationState;
  journey?: ReadingJourneyState;
};

function validHistory(value: unknown): value is ReadingHistoryEntry {
  return validBookmark(value) && validReaderTimestamp((value as ReadingHistoryEntry).openedAt);
}

function validPreferences(value: unknown): value is ReaderPreferenceBackup {
  if (!value || typeof value !== 'object') return false;
  const prefs = value as Partial<ReaderPreferenceBackup>;
  return typeof prefs.scale === 'number'
    && Number.isFinite(prefs.scale)
    && prefs.scale >= 0.84
    && prefs.scale <= 1.32
    && (prefs.font === 'serif' || prefs.font === 'book' || prefs.font === 'sans')
    && (prefs.spacing === 'compact' || prefs.spacing === 'comfortable' || prefs.spacing === 'relaxed')
    && (prefs.width === 'narrow' || prefs.width === 'standard' || prefs.width === 'wide');
}

function dedupeBy<T>(values: readonly T[], key: (value: T) => string, limit: number): T[] {
  const seen = new Set<string>();
  const output: T[] = [];
  for (const value of values) {
    const id = key(value);
    if (seen.has(id)) continue;
    seen.add(id);
    output.push(value);
    if (output.length >= limit) break;
  }
  return output;
}

function knownOrganizationKeys(bookmarks: readonly Bookmark[], notes: readonly EpisodeNote[], passages: readonly SavedPassage[]): Set<string> {
  return new Set([
    ...bookmarks.map((bookmark) => readerLibraryItemKey('bookmark', bookmark.id)),
    ...notes.map((note) => readerLibraryItemKey('note', note.id)),
    ...passages.map((passage) => readerLibraryItemKey('passage', passage.key)),
  ]);
}

function organizationMatchesItems(
  organization: ReaderOrganizationState,
  bookmarks: readonly Bookmark[],
  notes: readonly EpisodeNote[],
  passages: readonly SavedPassage[],
): boolean {
  const known = knownOrganizationKeys(bookmarks, notes, passages);
  return organization.items.every((item) => known.has(item.key));
}

export function getReadingHistory(): ReadingHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return dedupeBy(parsed.filter(validHistory).sort((a, b) => b.openedAt - a.openedAt), (entry) => entry.id, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function recordReadingHistory(bookmark: Bookmark, openedAt = Date.now()): ReadingHistoryEntry[] {
  if (!validBookmark(bookmark) || !validReaderTimestamp(openedAt)) return getReadingHistory();
  const current = getReadingHistory();
  const next = [{ ...bookmark, openedAt }, ...current.filter((entry) => entry.id !== bookmark.id)].slice(0, HISTORY_LIMIT);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    return next;
  } catch {
    return current;
  }
}

export function clearReadingHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Storage may be unavailable.
  }
}

export function createReaderBackup(input: ReaderBackupInput): ReaderStateBackup {
  const bookmarks = dedupeBy(input.bookmarks.filter(validBookmark), (item) => item.id, BOOKMARK_LIMIT);
  const history = dedupeBy(input.history.filter(validHistory).sort((a, b) => b.openedAt - a.openedAt), (item) => item.id, HISTORY_LIMIT);
  const notes = dedupeBy(input.notes.filter(validEpisodeNote).sort((a, b) => b.updatedAt - a.updatedAt), (item) => item.id, NOTE_LIMIT);
  const passages = dedupeBy(input.passages.filter(validSavedPassage).sort((a, b) => b.createdAt - a.createdAt), (item) => item.key, PASSAGE_LIMIT);
  const positions = dedupeBy((input.positions || []).filter(validChapterPosition).sort((a, b) => b.updatedAt - a.updatedAt), (item) => item.id, POSITION_LIMIT);
  const readEpisodes = Array.from(new Set(input.readEpisodes.filter(validEpisodeId))).slice(0, READ_EPISODE_LIMIT);
  const fallbackJourney: ReadingJourneyState = { visits: history, seasonCompletions: [] };
  const organizationCandidate = input.organization && validReaderOrganization(input.organization) ? input.organization : emptyReaderOrganization();
  const known = knownOrganizationKeys(bookmarks, notes, passages);
  const organization = {
    ...organizationCandidate,
    items: organizationCandidate.items.filter((item) => known.has(item.key)),
  };
  return {
    product: 'The Quiet Regular',
    version: 1,
    exportedAt: new Date().toISOString(),
    bookmarks,
    lastRead: input.lastRead && validBookmark(input.lastRead) ? input.lastRead : null,
    readEpisodes,
    history,
    journey: input.journey && validReadingJourney(input.journey) ? input.journey : fallbackJourney,
    notes,
    passages,
    positions,
    organization,
    preferences: input.preferences,
  };
}

export function parseReaderBackup(raw: string): ReaderStateBackup {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('This file is not valid JSON.');
  }
  if (!parsed || typeof parsed !== 'object') throw new Error('This is not a Quiet Regular reader backup.');
  const backup = parsed as Partial<ReaderStateBackup>;
  if (backup.product !== 'The Quiet Regular' || backup.version !== 1) throw new Error('Unsupported reader backup format.');

  if (!Array.isArray(backup.bookmarks) || backup.bookmarks.length > BOOKMARK_LIMIT || !backup.bookmarks.every(validBookmark) || !uniqueBy(backup.bookmarks, (item) => item.id)) throw new Error('Backup bookmarks are invalid.');
  if (backup.lastRead !== null && backup.lastRead !== undefined && !validBookmark(backup.lastRead)) throw new Error('Backup Continue Reading position is invalid.');
  if (!Array.isArray(backup.readEpisodes) || backup.readEpisodes.length > READ_EPISODE_LIMIT || !backup.readEpisodes.every(validEpisodeId) || !uniqueStrings(backup.readEpisodes)) throw new Error('Backup reading progress is invalid.');
  if (!Array.isArray(backup.history) || backup.history.length > HISTORY_LIMIT || !backup.history.every(validHistory) || !uniqueBy(backup.history, (item) => item.id)) throw new Error('Backup reading history is invalid.');

  const journey = backup.journey === undefined ? { visits: backup.history, seasonCompletions: [] } : backup.journey;
  if (!validReadingJourney(journey)) throw new Error('Backup reading journey is invalid.');

  const notes = backup.notes === undefined ? [] : backup.notes;
  if (!Array.isArray(notes) || notes.length > NOTE_LIMIT || !notes.every(validEpisodeNote) || !uniqueBy(notes, (item) => item.id)) throw new Error('Backup episode notes are invalid.');
  const passages = backup.passages === undefined ? [] : backup.passages;
  if (!Array.isArray(passages) || passages.length > PASSAGE_LIMIT || !passages.every(validSavedPassage) || !uniqueBy(passages, (item) => item.key)) throw new Error('Backup saved passages are invalid.');
  const positions = backup.positions === undefined ? [] : backup.positions;
  if (!Array.isArray(positions) || positions.length > POSITION_LIMIT || !positions.every(validChapterPosition) || !uniqueBy(positions, (item) => item.id)) throw new Error('Backup chapter positions are invalid.');
  const organization = backup.organization === undefined ? emptyReaderOrganization() : backup.organization;
  if (!validReaderOrganization(organization) || !organizationMatchesItems(organization, backup.bookmarks, notes, passages)) throw new Error('Backup Reader Library organization is invalid.');
  if (!validPreferences(backup.preferences)) throw new Error('Backup reader preferences are invalid.');

  const exportedAt = typeof backup.exportedAt === 'string' && !Number.isNaN(new Date(backup.exportedAt).getTime())
    ? backup.exportedAt
    : new Date().toISOString();

  return {
    product: 'The Quiet Regular',
    version: 1,
    exportedAt,
    bookmarks: backup.bookmarks,
    lastRead: backup.lastRead || null,
    readEpisodes: backup.readEpisodes,
    history: backup.history.slice().sort((a, b) => b.openedAt - a.openedAt),
    journey,
    notes: notes.slice().sort((a, b) => b.updatedAt - a.updatedAt),
    passages: passages.slice().sort((a, b) => b.createdAt - a.createdAt),
    positions: positions.slice().sort((a, b) => b.updatedAt - a.updatedAt),
    organization,
    preferences: backup.preferences,
  };
}

function snapshotReaderStorage(): Map<string, string | null> {
  const snapshot = new Map<string, string | null>();
  for (const key of RESTORE_KEYS) snapshot.set(key, localStorage.getItem(key));
  return snapshot;
}

function rollbackReaderStorage(snapshot: Map<string, string | null>): void {
  for (const [key, value] of snapshot) {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  }
}

export function persistReaderBackup(backup: ReaderStateBackup): void {
  let before: Map<string, string | null>;
  try {
    before = snapshotReaderStorage();
  } catch {
    throw new Error('This browser blocked reader storage, so the backup could not be restored.');
  }

  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(backup.bookmarks));
    if (backup.lastRead) localStorage.setItem(LAST_READ_KEY, JSON.stringify(backup.lastRead));
    else localStorage.removeItem(LAST_READ_KEY);
    localStorage.setItem(READ_EPISODES_KEY, JSON.stringify(backup.readEpisodes));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(backup.history));
    localStorage.setItem(READER_PREFS_KEY, JSON.stringify(backup.preferences));
    persistEpisodeNotes(backup.notes);
    persistSavedPassages(backup.passages);
    persistChapterPositions(backup.positions);
    persistReaderOrganization(backup.organization);
    persistReadingJourney(backup.journey);
  } catch {
    try { rollbackReaderStorage(before); } catch { /* Best effort if storage became completely unavailable. */ }
    throw new Error('This browser blocked reader storage, so the backup was rolled back instead of being partially restored.');
  }
}
