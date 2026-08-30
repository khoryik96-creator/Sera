import { EPISODE_ARCS } from './episodeMeta';

const READ_KEY = 'tqr:readEpisodes:v1';
const EPISODE_ID = /^ep-s(\d+)-e(\d+)$/;

export interface ReadingTarget {
  id: string;
  season: number;
  episode: number;
}

export interface ProgressSummary {
  read: number;
  total: number;
  percent: number;
  complete: boolean;
}

export function episodeId(season: number, episode: number): string {
  return `ep-s${season}-e${episode}`;
}

export function episodeCountForSeason(season: number): number {
  const meta = EPISODE_ARCS.flatMap((arc) => arc.seasons).find((entry) => entry.season === season);
  const match = meta?.badge.match(/^(\d+)\s+(?:Episodes|Chapters)/i);
  return match ? Number(match[1]) : 0;
}

export function validEpisodeId(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const match = value.match(EPISODE_ID);
  if (!match) return false;
  const season = Number(match[1]);
  const episode = Number(match[2]);
  const total = episodeCountForSeason(season);
  return Boolean(total && episode >= 1 && episode <= total);
}

export function allReadingTargets(): ReadingTarget[] {
  return EPISODE_ARCS.flatMap((arc) => arc.seasons.flatMap((season) => {
    const count = episodeCountForSeason(season.season);
    return Array.from({ length: count }, (_, index) => ({
      season: season.season,
      episode: index + 1,
      id: episodeId(season.season, index + 1),
    }));
  }));
}

export function getReadEpisodeIds(): string[] {
  try {
    const raw = localStorage.getItem(READ_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter(validEpisodeId))];
  } catch {
    return [];
  }
}

export function markEpisodeRead(id: string): string[] {
  if (!validEpisodeId(id)) return getReadEpisodeIds();
  const current = getReadEpisodeIds();
  if (current.includes(id)) return current;
  const next = [...current, id];
  try {
    localStorage.setItem(READ_KEY, JSON.stringify(next));
    return next;
  } catch {
    return current;
  }
}

export function progressForSeason(readIds: readonly string[], season: number): ProgressSummary {
  const total = episodeCountForSeason(season);
  const read = Array.from({ length: total }, (_, index) => episodeId(season, index + 1)).filter((id) => readIds.includes(id)).length;
  return summarize(read, total);
}

export function progressForArc(readIds: readonly string[], arcIndex: number): ProgressSummary {
  const arc = EPISODE_ARCS[arcIndex];
  if (!arc) return summarize(0, 0);
  const targets = arc.seasons.flatMap((season) => Array.from({ length: episodeCountForSeason(season.season) }, (_, index) => episodeId(season.season, index + 1)));
  const read = targets.filter((id) => readIds.includes(id)).length;
  return summarize(read, targets.length);
}

export function overallReadingProgress(readIds: readonly string[]): ProgressSummary {
  const targets = allReadingTargets();
  const readSet = new Set(readIds);
  return summarize(targets.filter((target) => readSet.has(target.id)).length, targets.length);
}

export function completedSeasonCount(readIds: readonly string[]): number {
  return EPISODE_ARCS.flatMap((arc) => arc.seasons).filter((season) => progressForSeason(readIds, season.season).complete).length;
}

export function nextUnreadTarget(readIds: readonly string[], after?: { season: number; episode: number } | null): ReadingTarget | null {
  const targets = allReadingTargets();
  const readSet = new Set(readIds.filter(validEpisodeId));
  if (!targets.length || readSet.size >= targets.length) return null;

  const afterIndex = after ? targets.findIndex((target) => target.season === after.season && target.episode === after.episode) : -1;
  const ordered = afterIndex >= 0 ? [...targets.slice(afterIndex + 1), ...targets.slice(0, afterIndex + 1)] : targets;
  return ordered.find((target) => !readSet.has(target.id)) || null;
}

export function nextUnreadInSeason(readIds: readonly string[], season: number, afterEpisode = 0): ReadingTarget | null {
  const total = episodeCountForSeason(season);
  const readSet = new Set(readIds.filter(validEpisodeId));
  const episodes = Array.from({ length: total }, (_, index) => index + 1);
  const ordered = [...episodes.filter((episode) => episode > afterEpisode), ...episodes.filter((episode) => episode <= afterEpisode)];
  const next = ordered.find((episode) => !readSet.has(episodeId(season, episode)));
  return next ? { season, episode: next, id: episodeId(season, next) } : null;
}

function summarize(read: number, total: number): ProgressSummary {
  const safeRead = Math.min(read, total);
  return {
    read: safeRead,
    total,
    percent: total ? Math.round((safeRead / total) * 100) : 0,
    complete: total > 0 && safeRead >= total,
  };
}
