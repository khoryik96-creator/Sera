import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { getBookmarks, getLastRead, setLastRead, toggleBookmark } from '../../../bookmarks';
import type { Bookmark } from '../../../bookmarks';
import { getReadEpisodeIds, markEpisodeRead, progressForSeason } from '../../../readingProgress';
import { clearReadingHistory, createReaderBackup, getReadingHistory, parseReaderBackup, persistReaderBackup, recordReadingHistory } from '../../../readerLibrary';
import type { ReadingHistoryEntry } from '../../../readerLibrary';
import { clearReadingJourney, getReadingJourney, recordReadingJourney } from '../../../readerJourney';
import type { ReadingJourneyState } from '../../../readerJourney';
import { deleteEpisodeNote, getEpisodeNotes, saveEpisodeNote } from '../../../readerNotes';
import type { EpisodeNote } from '../../../readerNotes';
import {
  createReaderCollection as addReaderCollection,
  deleteReaderCollection as removeReaderCollection,
  getReaderOrganization,
  readerLibraryItemKey,
  removeReaderItemOrganization as dropReaderItemOrganization,
  renameReaderCollection as editReaderCollection,
  saveReaderOrganization,
  setReaderItemTags as updateReaderItemTags,
  toggleReaderCollectionItem as flipReaderCollectionItem,
  toggleReaderFavorite as flipReaderFavorite,
} from '../../../readerOrganization';
import type { ReaderOrganizationState } from '../../../readerOrganization';
import { deletePassage as deleteSavedPassage, getSavedPassages, savePassage as persistPassage } from '../../../readerPassages';
import type { SavedPassage } from '../../../readerPassages';
import { getChapterPositions } from '../../../readerPositions';

export type ReaderFont = 'serif' | 'book' | 'sans';
export type ReaderSpacing = 'compact' | 'comfortable' | 'relaxed';
export type ReaderWidth = 'narrow' | 'standard' | 'wide';

interface ReaderPreferences {
  scale: number;
  font: ReaderFont;
  spacing: ReaderSpacing;
  width: ReaderWidth;
}

interface ReaderContextValue extends ReaderPreferences {
  bookmarks: Bookmark[];
  lastRead: Bookmark | null;
  readEpisodes: string[];
  history: ReadingHistoryEntry[];
  journey: ReadingJourneyState;
  notes: EpisodeNote[];
  passages: SavedPassage[];
  organization: ReaderOrganizationState;
  markRead(bookmark: Bookmark): void;
  toggleSaved(bookmark: Bookmark): void;
  saveNote(note: Omit<EpisodeNote, 'updatedAt'>): void;
  deleteNote(id: string): void;
  savePassage(passage: Omit<SavedPassage, 'key' | 'createdAt'>): void;
  deletePassage(key: string): void;
  createCollection(name: string): void;
  renameCollection(id: string, name: string): void;
  deleteCollection(id: string): void;
  toggleFavorite(key: string): void;
  toggleCollectionItem(key: string, collectionId: string): void;
  setItemTags(key: string, tags: string[]): void;
  changeScale(delta: number): void;
  cycleFont(): void;
  cycleSpacing(): void;
  cycleWidth(): void;
  resetPreferences(): void;
  exportBackup(): string;
  restoreBackup(raw: string): void;
  clearHistory(): void;
}

const DEFAULT_PREFERENCES: ReaderPreferences = {
  scale: 1,
  font: 'serif',
  spacing: 'comfortable',
  width: 'standard',
};
const PREFS_KEY = 'tqr:react-reader-prefs-v2';
const LEGACY_PREFS_KEY = 'tqr:react-reader-prefs-v1';
const ReaderContext = createContext<ReaderContextValue | null>(null);

function clampScale(value: number): number {
  return Math.min(1.32, Math.max(0.84, Number(value.toFixed(2))));
}

function isFont(value: unknown): value is ReaderFont {
  return value === 'serif' || value === 'book' || value === 'sans';
}

function isSpacing(value: unknown): value is ReaderSpacing {
  return value === 'compact' || value === 'comfortable' || value === 'relaxed';
}

function isWidth(value: unknown): value is ReaderWidth {
  return value === 'narrow' || value === 'standard' || value === 'wide';
}

function loadPreferences(): ReaderPreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ReaderPreferences>;
      return {
        scale: clampScale(typeof parsed.scale === 'number' ? parsed.scale : DEFAULT_PREFERENCES.scale),
        font: isFont(parsed.font) ? parsed.font : DEFAULT_PREFERENCES.font,
        spacing: isSpacing(parsed.spacing) ? parsed.spacing : DEFAULT_PREFERENCES.spacing,
        width: isWidth(parsed.width) ? parsed.width : DEFAULT_PREFERENCES.width,
      };
    }

    const legacyRaw = localStorage.getItem(LEGACY_PREFS_KEY);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw) as { scale?: number; relaxedSpacing?: boolean };
      return {
        ...DEFAULT_PREFERENCES,
        scale: clampScale(typeof legacy.scale === 'number' ? legacy.scale : DEFAULT_PREFERENCES.scale),
        spacing: legacy.relaxedSpacing ? 'relaxed' : 'comfortable',
      };
    }
  } catch {
    // Reader preferences are optional; defaults remain usable.
  }
  return { ...DEFAULT_PREFERENCES };
}

function nextValue<T>(current: T, values: readonly T[]): T {
  const index = values.indexOf(current);
  return values[(index + 1) % values.length] ?? values[0] ?? current;
}

export function ReaderProvider({ children }: { children?: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => getBookmarks());
  const [lastRead, setLastReadState] = useState<Bookmark | null>(() => getLastRead());
  const [readEpisodes, setReadEpisodes] = useState<string[]>(() => getReadEpisodeIds());
  const [history, setHistory] = useState<ReadingHistoryEntry[]>(() => getReadingHistory());
  const [journey, setJourney] = useState<ReadingJourneyState>(() => getReadingJourney(history));
  const [notes, setNotes] = useState<EpisodeNote[]>(() => getEpisodeNotes());
  const [passages, setPassages] = useState<SavedPassage[]>(() => getSavedPassages());
  const [organization, setOrganization] = useState<ReaderOrganizationState>(() => getReaderOrganization());
  const [preferences, setPreferences] = useState<ReaderPreferences>(loadPreferences);

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(preferences));
    } catch {
      // Reader preferences are optional.
    }
  }, [preferences]);

  function updateOrganization(update: (state: ReaderOrganizationState) => ReaderOrganizationState): void {
    setOrganization((state) => saveReaderOrganization(update(state)));
  }

  function markRead(bookmark: Bookmark): void {
    const openedAt = Date.now();
    const beforeRead = getReadEpisodeIds();
    const wasComplete = progressForSeason(beforeRead, bookmark.season).complete;
    setLastRead(bookmark);
    setLastReadState(bookmark);
    const nextRead = markEpisodeRead(bookmark.id);
    const seasonCompleted = !wasComplete && progressForSeason(nextRead, bookmark.season).complete;
    setReadEpisodes(nextRead);
    setHistory(recordReadingHistory(bookmark, openedAt));
    setJourney(recordReadingJourney(bookmark, seasonCompleted, openedAt));
  }

  function toggleSaved(bookmark: Bookmark): void {
    const removing = bookmarks.some((item) => item.id === bookmark.id);
    toggleBookmark(bookmark);
    setBookmarks(getBookmarks());
    if (removing) updateOrganization((state) => dropReaderItemOrganization(state, readerLibraryItemKey('bookmark', bookmark.id)));
  }

  function saveNote(note: Omit<EpisodeNote, 'updatedAt'>): void {
    const next = saveEpisodeNote(note);
    setNotes(next);
    if (!next.some((item) => item.id === note.id)) updateOrganization((state) => dropReaderItemOrganization(state, readerLibraryItemKey('note', note.id)));
  }

  function deleteNote(id: string): void {
    setNotes(deleteEpisodeNote(id));
    updateOrganization((state) => dropReaderItemOrganization(state, readerLibraryItemKey('note', id)));
  }

  function savePassage(passage: Omit<SavedPassage, 'key' | 'createdAt'>): void {
    setPassages(persistPassage(passage));
  }

  function deletePassage(key: string): void {
    setPassages(deleteSavedPassage(key));
    updateOrganization((state) => dropReaderItemOrganization(state, readerLibraryItemKey('passage', key)));
  }

  function createCollection(name: string): void {
    updateOrganization((state) => addReaderCollection(state, name));
  }

  function renameCollection(id: string, name: string): void {
    updateOrganization((state) => editReaderCollection(state, id, name));
  }

  function deleteCollection(id: string): void {
    updateOrganization((state) => removeReaderCollection(state, id));
  }

  function toggleFavorite(key: string): void {
    updateOrganization((state) => flipReaderFavorite(state, key));
  }

  function toggleCollectionItem(key: string, collectionId: string): void {
    updateOrganization((state) => flipReaderCollectionItem(state, key, collectionId));
  }

  function setItemTags(key: string, tags: string[]): void {
    updateOrganization((state) => updateReaderItemTags(state, key, tags));
  }

  function changeScale(delta: number): void {
    setPreferences((value) => ({ ...value, scale: clampScale(value.scale + delta) }));
  }

  function cycleFont(): void {
    setPreferences((value) => ({ ...value, font: nextValue(value.font, ['serif', 'book', 'sans'] as const) }));
  }

  function cycleSpacing(): void {
    setPreferences((value) => ({ ...value, spacing: nextValue(value.spacing, ['compact', 'comfortable', 'relaxed'] as const) }));
  }

  function cycleWidth(): void {
    setPreferences((value) => ({ ...value, width: nextValue(value.width, ['narrow', 'standard', 'wide'] as const) }));
  }

  function resetPreferences(): void {
    setPreferences({ ...DEFAULT_PREFERENCES });
  }

  function exportBackup(): string {
    return JSON.stringify(createReaderBackup({ bookmarks, lastRead, readEpisodes, history, journey, notes, passages, positions: getChapterPositions(), organization, preferences }), null, 2);
  }

  function restoreBackup(raw: string): void {
    const backup = parseReaderBackup(raw);
    persistReaderBackup(backup);
    setBookmarks(backup.bookmarks);
    setLastReadState(backup.lastRead);
    setReadEpisodes(backup.readEpisodes);
    setHistory(backup.history);
    setJourney(backup.journey);
    setNotes(backup.notes);
    setPassages(backup.passages);
    setOrganization(backup.organization);
    setPreferences(backup.preferences);
  }

  function clearHistory(): void {
    clearReadingHistory();
    clearReadingJourney();
    setHistory([]);
    setJourney({ visits: [], seasonCompletions: [] });
  }

  const value: ReaderContextValue = {
    bookmarks,
    lastRead,
    readEpisodes,
    history,
    journey,
    notes,
    passages,
    organization,
    ...preferences,
    markRead,
    toggleSaved,
    saveNote,
    deleteNote,
    savePassage,
    deletePassage,
    createCollection,
    renameCollection,
    deleteCollection,
    toggleFavorite,
    toggleCollectionItem,
    setItemTags,
    changeScale,
    cycleFont,
    cycleSpacing,
    cycleWidth,
    resetPreferences,
    exportBackup,
    restoreBackup,
    clearHistory,
  };

  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>;
}

export function useReaderState(): ReaderContextValue {
  const value = useContext(ReaderContext);
  if (!value) throw new Error('useReaderState must be used inside ReaderProvider');
  return value;
}
