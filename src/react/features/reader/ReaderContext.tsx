import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { getBookmarks, getLastRead, setLastRead, toggleBookmark } from '../../../bookmarks';
import type { Bookmark } from '../../../bookmarks';

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
  markRead(bookmark: Bookmark): void;
  toggleSaved(bookmark: Bookmark): void;
  changeScale(delta: number): void;
  cycleFont(): void;
  cycleSpacing(): void;
  cycleWidth(): void;
  resetPreferences(): void;
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
  const [preferences, setPreferences] = useState<ReaderPreferences>(loadPreferences);

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(preferences));
    } catch {
      // Reader preferences are optional.
    }
  }, [preferences]);

  function markRead(bookmark: Bookmark): void {
    setLastRead(bookmark);
    setLastReadState(bookmark);
  }

  function toggleSaved(bookmark: Bookmark): void {
    toggleBookmark(bookmark);
    setBookmarks(getBookmarks());
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

  const value: ReaderContextValue = {
    bookmarks,
    lastRead,
    ...preferences,
    markRead,
    toggleSaved,
    changeScale,
    cycleFont,
    cycleSpacing,
    cycleWidth,
    resetPreferences,
  };

  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>;
}

export function useReaderState(): ReaderContextValue {
  const value = useContext(ReaderContext);
  if (!value) throw new Error('useReaderState must be used inside ReaderProvider');
  return value;
}
