import React, { createContext, useContext, useEffect, useState } from 'https://esm.sh/react@19.0.0';
import { getBookmarks, getLastRead, setLastRead, toggleBookmark } from '../../../bookmarks';
import type { Bookmark } from '../../../bookmarks';

interface ReaderPreferences {
  scale: number;
  relaxedSpacing: boolean;
}

interface ReaderContextValue {
  bookmarks: Bookmark[];
  lastRead: Bookmark | null;
  scale: number;
  relaxedSpacing: boolean;
  markRead(bookmark: Bookmark): void;
  toggleSaved(bookmark: Bookmark): void;
  changeScale(delta: number): void;
  toggleSpacing(): void;
}

const PREFS_KEY = 'tqr:react-reader-prefs-v1';
const ReaderContext = createContext<ReaderContextValue | null>(null);

function clampScale(value: number): number {
  return Math.min(1.28, Math.max(0.86, Number(value.toFixed(2))));
}

function loadPreferences(): ReaderPreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return { scale: 1, relaxedSpacing: false };
    const parsed = JSON.parse(raw) as Partial<ReaderPreferences>;
    return {
      scale: clampScale(typeof parsed.scale === 'number' ? parsed.scale : 1),
      relaxedSpacing: Boolean(parsed.relaxedSpacing),
    };
  } catch {
    return { scale: 1, relaxedSpacing: false };
  }
}

export function ReaderProvider({ children }: { children: any }) {
  const prefs = loadPreferences();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => getBookmarks());
  const [lastRead, setLastReadState] = useState<Bookmark | null>(() => getLastRead());
  const [scale, setScale] = useState(prefs.scale);
  const [relaxedSpacing, setRelaxedSpacing] = useState(prefs.relaxedSpacing);

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ scale, relaxedSpacing }));
    } catch {
      // Reader preferences are optional.
    }
  }, [scale, relaxedSpacing]);

  function markRead(bookmark: Bookmark): void {
    setLastRead(bookmark);
    setLastReadState(bookmark);
  }

  function toggleSaved(bookmark: Bookmark): void {
    toggleBookmark(bookmark);
    setBookmarks(getBookmarks());
  }

  function changeScale(delta: number): void {
    setScale((value) => clampScale(value + delta));
  }

  function toggleSpacing(): void {
    setRelaxedSpacing((value) => !value);
  }

  const value: ReaderContextValue = {
    bookmarks,
    lastRead,
    scale,
    relaxedSpacing,
    markRead,
    toggleSaved,
    changeScale,
    toggleSpacing,
  };

  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>;
}

export function useReaderState(): ReaderContextValue {
  const value = useContext(ReaderContext);
  if (!value) throw new Error('useReaderState must be used inside ReaderProvider');
  return value;
}
