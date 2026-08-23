/**
 * Bookmarks + "continue reading" state, persisted in localStorage so it
 * survives reloads on the same device/browser. All access is wrapped in
 * try/catch: private-mode or storage-blocked browsers simply behave as if
 * nothing is saved rather than throwing.
 */

const BM_KEY = 'tqr:bookmarks';
const LAST_KEY = 'tqr:lastRead';

export interface Bookmark {
  id: string;      // episode element id, e.g. "ep-s12-e3"
  season: number;
  title: string;
}

export function getBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(BM_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().some((b) => b.id === id);
}

/** Add or remove a bookmark. Returns the new state (true = now bookmarked). */
export function toggleBookmark(b: Bookmark): boolean {
  const list = getBookmarks();
  const idx = list.findIndex((x) => x.id === b.id);
  if (idx >= 0) {
    list.splice(idx, 1);
    save(BM_KEY, list);
    return false;
  }
  list.push(b);
  save(BM_KEY, list);
  return true;
}

export function setLastRead(b: Bookmark): void {
  save(LAST_KEY, b);
}

export function getLastRead(): Bookmark | null {
  try {
    const raw = localStorage.getItem(LAST_KEY);
    return raw ? JSON.parse(raw) as Bookmark : null;
  } catch {
    return null;
  }
}

function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}
