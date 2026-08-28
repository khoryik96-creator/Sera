import type { Bookmark } from './bookmarks';
import { episodeCountForSeason } from './readingProgress';
import { NOTES_KEY, persistEpisodeNotes, validEpisodeNote } from './readerNotes';
import type { EpisodeNote } from './readerNotes';
import { emptyReaderOrganization, persistReaderOrganization, validReaderOrganization } from './readerOrganization';
import type { ReaderOrganizationState } from './readerOrganization';
import { PASSAGES_KEY, persistSavedPassages, validSavedPassage } from './readerPassages';
import type { SavedPassage } from './readerPassages';
import { persistChapterPositions, validChapterPosition } from './readerPositions';
import type { ChapterPosition } from './readerPositions';

export const HISTORY_KEY = 'tqr:readingHistory:v1';
export const BOOKMARKS_KEY = 'tqr:bookmarks';
export const LAST_READ_KEY = 'tqr:lastRead';
export const READ_EPISODES_KEY = 'tqr:readEpisodes:v1';
export const READER_PREFS_KEY = 'tqr:react-reader-prefs-v2';

const EPISODE_ID = /^ep-s(\d+)-e(\d+)$/;
const HISTORY_LIMIT = 50;

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
  notes: EpisodeNote[];
  passages: SavedPassage[];
  positions: ChapterPosition[];
  organization: ReaderOrganizationState;
  preferences: ReaderPreferenceBackup;
}

type ReaderBackupInput = Omit<ReaderStateBackup, 'product' | 'version' | 'exportedAt' | 'positions' | 'organization'> & {
  positions?: ChapterPosition[];
  organization?: ReaderOrganizationState;
};

function episodeParts(value: unknown): { season: number; episode: number } | null {
  if (typeof value !== 'string') return null;
  const match = value.match(EPISODE_ID);
  if (!match) return null;
  const season = Number(match[1]);
  const episode = Number(match[2]);
  const total = episodeCountForSeason(season);
  if (!total || episode < 1 || episode > total) return null;
  return { season, episode };
}

function validEpisodeId(value: unknown): value is string {
  return Boolean(episodeParts(value));
}

function validBookmark(value: unknown): value is Bookmark {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Bookmark>;
  const parts = episodeParts(item.id);
  return Boolean(parts && Number.isInteger(item.season) && Number(item.season) === parts?.season && typeof item.title === 'string');
}

function validHistory(value: unknown): value is ReadingHistoryEntry {
  return validBookmark(value) && typeof (value as ReadingHistoryEntry).openedAt === 'number' && Number.isFinite((value as ReadingHistoryEntry).openedAt);
}

function validPreferences(value: unknown): value is ReaderPreferenceBackup {
  if (!value || typeof value !== 'object') return false;
  const prefs = value as Partial<ReaderPreferenceBackup>;
  return typeof prefs.scale === 'number'
    && prefs.scale >= 0.84
    && prefs.scale <= 1.32
    && (prefs.font === 'serif' || prefs.font === 'book' || prefs.font === 'sans')
    && (prefs.spacing === 'compact' || prefs.spacing === 'comfortable' || prefs.spacing === 'relaxed')
    && (prefs.width === 'narrow' || prefs.width === 'standard' || prefs.width === 'wide');
}

export function getReadingHistory(): ReadingHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(validHistory).sort((a, b) => b.openedAt - a.openedAt).slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function recordReadingHistory(bookmark: Bookmark, openedAt = Date.now()): ReadingHistoryEntry[] {
  if (!validBookmark(bookmark)) return getReadingHistory();
  const next = [{ ...bookmark, openedAt }, ...getReadingHistory().filter((entry) => entry.id !== bookmark.id)].slice(0, HISTORY_LIMIT);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {
    // History is optional if storage is unavailable.
  }
  return next;
}

export function clearReadingHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Storage may be unavailable.
  }
}

export function createReaderBackup(input: ReaderBackupInput): ReaderStateBackup {
  return {
    product: 'The Quiet Regular',
    version: 1,
    exportedAt: new Date().toISOString(),
    bookmarks: input.bookmarks.filter(validBookmark),
    lastRead: input.lastRead && validBookmark(input.lastRead) ? input.lastRead : null,
    readEpisodes: Array.from(new Set(input.readEpisodes.filter(validEpisodeId))),
    history: input.history.filter(validHistory).slice(0, HISTORY_LIMIT),
    notes: input.notes.filter(validEpisodeNote).sort((a, b) => b.updatedAt - a.updatedAt),
    passages: input.passages.filter(validSavedPassage).sort((a, b) => b.createdAt - a.createdAt),
    positions: (input.positions || []).filter(validChapterPosition).sort((a, b) => b.updatedAt - a.updatedAt),
    organization: input.organization && validReaderOrganization(input.organization) ? input.organization : emptyReaderOrganization(),
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
  if (!Array.isArray(backup.bookmarks) || !backup.bookmarks.every(validBookmark)) throw new Error('Backup bookmarks are invalid.');
  if (backup.lastRead !== null && backup.lastRead !== undefined && !validBookmark(backup.lastRead)) throw new Error('Backup Continue Reading position is invalid.');
  if (!Array.isArray(backup.readEpisodes) || !backup.readEpisodes.every(validEpisodeId)) throw new Error('Backup reading progress is invalid.');
  if (!Array.isArray(backup.history) || !backup.history.every(validHistory)) throw new Error('Backup reading history is invalid.');
  const notes = backup.notes === undefined ? [] : backup.notes;
  if (!Array.isArray(notes) || !notes.every(validEpisodeNote)) throw new Error('Backup episode notes are invalid.');
  const passages = backup.passages === undefined ? [] : backup.passages;
  if (!Array.isArray(passages) || !passages.every(validSavedPassage)) throw new Error('Backup saved passages are invalid.');
  const positions = backup.positions === undefined ? [] : backup.positions;
  if (!Array.isArray(positions) || !positions.every(validChapterPosition)) throw new Error('Backup chapter positions are invalid.');
  const organization = backup.organization === undefined ? emptyReaderOrganization() : backup.organization;
  if (!validReaderOrganization(organization)) throw new Error('Backup Reader Library organization is invalid.');
  if (!validPreferences(backup.preferences)) throw new Error('Backup reader preferences are invalid.');

  return {
    product: 'The Quiet Regular',
    version: 1,
    exportedAt: typeof backup.exportedAt === 'string' ? backup.exportedAt : new Date().toISOString(),
    bookmarks: backup.bookmarks,
    lastRead: backup.lastRead || null,
    readEpisodes: Array.from(new Set(backup.readEpisodes)),
    history: backup.history.sort((a, b) => b.openedAt - a.openedAt).slice(0, HISTORY_LIMIT),
    notes: notes.sort((a, b) => b.updatedAt - a.updatedAt),
    passages: passages.sort((a, b) => b.createdAt - a.createdAt),
    positions: positions.sort((a, b) => b.updatedAt - a.updatedAt),
    organization,
    preferences: backup.preferences,
  };
}

export function persistReaderBackup(backup: ReaderStateBackup): void {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(backup.bookmarks));
    if (backup.lastRead) localStorage.setItem(LAST_READ_KEY, JSON.stringify(backup.lastRead));
    else localStorage.removeItem(LAST_READ_KEY);
    localStorage.setItem(READ_EPISODES_KEY, JSON.stringify(backup.readEpisodes));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(backup.history));
    localStorage.setItem(READER_PREFS_KEY, JSON.stringify(backup.preferences));
    if (!backup.notes.length) localStorage.removeItem(NOTES_KEY);
    else persistEpisodeNotes(backup.notes);
    if (!backup.passages.length) localStorage.removeItem(PASSAGES_KEY);
    else persistSavedPassages(backup.passages);
    persistChapterPositions(backup.positions);
    persistReaderOrganization(backup.organization);
  } catch {
    throw new Error('This browser blocked reader storage, so the backup could not be restored.');
  }
}
