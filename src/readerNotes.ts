import { episodeCountForSeason } from './readingProgress';
import { validReaderTimestamp } from './readerValidation';

export const NOTES_KEY = 'tqr:episodeNotes:v1';
const EPISODE_ID = /^ep-s(\d+)-e(\d+)$/;
const MAX_NOTE_LENGTH = 12000;
const MAX_NOTES = 733;

export interface EpisodeNote {
  id: string;
  season: number;
  title: string;
  text: string;
  updatedAt: number;
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

export function validEpisodeNote(value: unknown): value is EpisodeNote {
  if (!value || typeof value !== 'object') return false;
  const note = value as Partial<EpisodeNote>;
  const parts = typeof note.id === 'string' ? episodeParts(note.id) : null;
  return Boolean(
    parts
    && Number.isInteger(note.season)
    && Number(note.season) === parts.season
    && typeof note.title === 'string'
    && note.title.length <= 500
    && typeof note.text === 'string'
    && note.text.length <= MAX_NOTE_LENGTH
    && validReaderTimestamp(note.updatedAt),
  );
}

export function getEpisodeNotes(): EpisodeNote[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed
      .filter(validEpisodeNote)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter((note) => {
        if (seen.has(note.id)) return false;
        seen.add(note.id);
        return true;
      })
      .slice(0, MAX_NOTES);
  } catch {
    return [];
  }
}

export function getEpisodeNote(id: string): EpisodeNote | null {
  return getEpisodeNotes().find((note) => note.id === id) || null;
}

export function saveEpisodeNote(note: Omit<EpisodeNote, 'updatedAt'>, updatedAt = Date.now()): EpisodeNote[] {
  const trimmed = note.text.trim();
  if (!trimmed) return deleteEpisodeNote(note.id);
  const candidate: EpisodeNote = { ...note, text: trimmed.slice(0, MAX_NOTE_LENGTH), updatedAt };
  if (!validEpisodeNote(candidate)) return getEpisodeNotes();
  const current = getEpisodeNotes();
  const next = [candidate, ...current.filter((item) => item.id !== note.id)].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_NOTES);
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(next));
    return next;
  } catch {
    return current;
  }
}

export function deleteEpisodeNote(id: string): EpisodeNote[] {
  const current = getEpisodeNotes();
  const next = current.filter((note) => note.id !== id);
  try {
    if (next.length) localStorage.setItem(NOTES_KEY, JSON.stringify(next));
    else localStorage.removeItem(NOTES_KEY);
    return next;
  } catch {
    return current;
  }
}

export function persistEpisodeNotes(notes: EpisodeNote[]): void {
  const validated = notes.filter(validEpisodeNote).sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_NOTES);
  try {
    if (validated.length) localStorage.setItem(NOTES_KEY, JSON.stringify(validated));
    else localStorage.removeItem(NOTES_KEY);
  } catch {
    throw new Error('This browser blocked note storage.');
  }
}
