import { episodeCountForSeason } from './readingProgress';

/**
 * Bookmarks + "continue reading" state, persisted in localStorage so it
 * survives reloads on the same device/browser. Corrupt/stale values are
 * filtered before they can reach the reader UI.
 */

const BM_KEY = 'tqr:bookmarks';
const LAST_KEY = 'tqr:lastRead';
const EPISODE_ID = /^ep-s(\d+)-e(\d+)$/;
const BOOKMARK_LIMIT = 633;
const MAX_TITLE_LENGTH = 500;

export interface Bookmark {
  id: string;      // episode element id, e.g. "ep-s12-e3"
  season: number;
  title: string;
}

export function validBookmark(value: unknown): value is Bookmark {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Bookmark>;
  if (typeof item.id !== 'string' || typeof item.title !== 'string' || item.title.length > MAX_TITLE_LENGTH || !Number.isInteger(item.season)) return false;
  const match = item.id.match(EPISODE_ID);
  if (!match) return false;
  const season = Number(match[1]);
  const episode = Number(match[2]);
  const total = episodeCountForSeason(season);
  return Boolean(total && season === item.season && episode >= 1 && episode <= total);
}

export function getBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(BM_KEY);
    const list: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) return [];
    const seen = new Set<string>();
    const valid: Bookmark[] = [];
    for (const value of list) {
      if (!validBookmark(value) || seen.has(value.id)) continue;
      seen.add(value.id);
      valid.push(value);
      if (valid.length >= BOOKMARK_LIMIT) break;
    }
    return valid;
  } catch {
    return [];
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().some((b) => b.id === id);
}

/** Add or remove a bookmark. Returns the actual persisted state. */
export function toggleBookmark(b: Bookmark): boolean {
  if (!validBookmark(b)) return isBookmarked(b.id);
  const list = getBookmarks();
  const idx = list.findIndex((x) => x.id === b.id);
  const next = list.slice();
  if (idx >= 0) next.splice(idx, 1);
  else next.push(b);
  try {
    localStorage.setItem(BM_KEY, JSON.stringify(next.slice(0, BOOKMARK_LIMIT)));
    return idx < 0;
  } catch {
    return idx >= 0;
  }
}

export function setLastRead(b: Bookmark): boolean {
  if (!validBookmark(b)) return false;
  try {
    localStorage.setItem(LAST_KEY, JSON.stringify(b));
    return true;
  } catch {
    return false;
  }
}

export function getLastRead(): Bookmark | null {
  try {
    const raw = localStorage.getItem(LAST_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return validBookmark(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
