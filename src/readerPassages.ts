import { episodeCountForSeason } from './readingProgress';

export const PASSAGES_KEY = 'tqr:savedPassages:v1';
const EPISODE_ID = /^ep-s(\d+)-e(\d+)$/;
const MAX_PASSAGE_LENGTH = 1600;
const MAX_PASSAGES = 500;

export interface SavedPassage {
  key: string;
  id: string;
  season: number;
  title: string;
  text: string;
  createdAt: number;
}

function episodeParts(id: string): { season: number; episode: number } | null {
  const match = id.match(EPISODE_ID);
  if (!match) return null;
  const season = Number(match[1]);
  const episode = Number(match[2]);
  const total = episodeCountForSeason(season);
  if (!total || episode < 1 || episode > total) return null;
  return { season, episode };
}

export function validSavedPassage(value: unknown): value is SavedPassage {
  if (!value || typeof value !== 'object') return false;
  const passage = value as Partial<SavedPassage>;
  const parts = typeof passage.id === 'string' ? episodeParts(passage.id) : null;
  return Boolean(
    parts
    && typeof passage.key === 'string'
    && passage.key.length > 0
    && passage.key.length <= 220
    && Number.isInteger(passage.season)
    && Number(passage.season) === parts.season
    && typeof passage.title === 'string'
    && typeof passage.text === 'string'
    && passage.text.trim().length >= 3
    && passage.text.length <= MAX_PASSAGE_LENGTH
    && typeof passage.createdAt === 'number'
    && Number.isFinite(passage.createdAt),
  );
}

export function getSavedPassages(): SavedPassage[] {
  try {
    const raw = localStorage.getItem(PASSAGES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(validSavedPassage).sort((a, b) => b.createdAt - a.createdAt).slice(0, MAX_PASSAGES);
  } catch {
    return [];
  }
}

export function savePassage(
  passage: Omit<SavedPassage, 'key' | 'createdAt'>,
  createdAt = Date.now(),
): SavedPassage[] {
  const text = passage.text.replace(/\s+/g, ' ').trim().slice(0, MAX_PASSAGE_LENGTH);
  if (text.length < 3) return getSavedPassages();

  const existing = getSavedPassages();
  if (existing.some((item) => item.id === passage.id && item.text === text)) return existing;

  let key = `${passage.id}:${createdAt}`;
  if (existing.some((item) => item.key === key)) key = `${key}:${existing.length}`;
  const candidate: SavedPassage = { ...passage, text, key, createdAt };
  if (!validSavedPassage(candidate)) return existing;

  const next = [candidate, ...existing].slice(0, MAX_PASSAGES);
  try {
    localStorage.setItem(PASSAGES_KEY, JSON.stringify(next));
  } catch {
    // Saved passages are optional when storage is unavailable.
  }
  return next;
}

export function deletePassage(key: string): SavedPassage[] {
  const next = getSavedPassages().filter((passage) => passage.key !== key);
  try {
    if (next.length) localStorage.setItem(PASSAGES_KEY, JSON.stringify(next));
    else localStorage.removeItem(PASSAGES_KEY);
  } catch {
    // Saved passages are optional when storage is unavailable.
  }
  return next;
}

export function persistSavedPassages(passages: SavedPassage[]): void {
  const validated = passages.filter(validSavedPassage).sort((a, b) => b.createdAt - a.createdAt).slice(0, MAX_PASSAGES);
  try {
    if (validated.length) localStorage.setItem(PASSAGES_KEY, JSON.stringify(validated));
    else localStorage.removeItem(PASSAGES_KEY);
  } catch {
    throw new Error('This browser blocked saved-passage storage.');
  }
}
