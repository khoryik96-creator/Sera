import { episodeCountForSeason } from './readingProgress';
import { validReaderTimestamp } from './readerValidation';

export const CHAPTER_POSITIONS_KEY = 'tqr:chapterPositions:v1';
const EPISODE_ID = /^ep-s(\d+)-e(\d+)$/;
const POSITION_LIMIT = 160;

export interface ChapterPosition {
  id: string;
  season: number;
  episode: number;
  progress: number;
  updatedAt: number;
}

function validEpisode(id: string, season: number, episode: number): boolean {
  const match = id.match(EPISODE_ID);
  if (!match) return false;
  const idSeason = Number(match[1]);
  const idEpisode = Number(match[2]);
  const total = episodeCountForSeason(idSeason);
  return Boolean(total && idSeason === season && idEpisode === episode && episode >= 1 && episode <= total);
}

export function validChapterPosition(value: unknown): value is ChapterPosition {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<ChapterPosition>;
  return typeof item.id === 'string'
    && Number.isInteger(item.season)
    && Number.isInteger(item.episode)
    && validEpisode(item.id, Number(item.season), Number(item.episode))
    && typeof item.progress === 'number'
    && Number.isFinite(item.progress)
    && item.progress >= 0
    && item.progress <= 1
    && validReaderTimestamp(item.updatedAt);
}

export function getChapterPositions(): ChapterPosition[] {
  try {
    const raw = localStorage.getItem(CHAPTER_POSITIONS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed
      .filter(validChapterPosition)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .slice(0, POSITION_LIMIT);
  } catch {
    return [];
  }
}

export function getChapterPosition(id: string): ChapterPosition | null {
  return getChapterPositions().find((item) => item.id === id) || null;
}

export function saveChapterPosition(input: Omit<ChapterPosition, 'updatedAt'>, updatedAt = Date.now()): ChapterPosition[] {
  const nextItem: ChapterPosition = { ...input, progress: Math.min(1, Math.max(0, input.progress)), updatedAt };
  if (!validChapterPosition(nextItem)) return getChapterPositions();
  const current = getChapterPositions();
  const next = [nextItem, ...current.filter((item) => item.id !== input.id)].slice(0, POSITION_LIMIT);
  try {
    persistChapterPositions(next);
    return next;
  } catch {
    return current;
  }
}

/** Strict persistence used by backup restore; callers that treat positions as optional should catch. */
export function persistChapterPositions(positions: ChapterPosition[]): void {
  const safe = positions.filter(validChapterPosition).sort((a, b) => b.updatedAt - a.updatedAt).slice(0, POSITION_LIMIT);
  try {
    if (safe.length) localStorage.setItem(CHAPTER_POSITIONS_KEY, JSON.stringify(safe));
    else localStorage.removeItem(CHAPTER_POSITIONS_KEY);
  } catch {
    throw new Error('This browser blocked exact-position storage.');
  }
}
