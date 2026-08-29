import { EPISODE_ARCS } from './episodeMeta';
import { episodeCountForSeason, episodeId, progressForArc, progressForSeason } from './readingProgress';
import type { ProgressSummary, ReadingTarget } from './readingProgress';
import type { ReadingJourneyEntry } from './readerJourney';

export interface ActivityDay {
  key: string;
  timestamp: number;
  count: number;
}

export interface ReadingActivitySummary {
  days: ActivityDay[];
  activeDays: number;
  recentSeven: number;
  streak: number;
}

export interface ReadingSession {
  startedAt: number;
  endedAt: number;
  visits: number;
  uniqueEpisodes: number;
  first: ReadingJourneyEntry;
  last: ReadingJourneyEntry;
}

export interface ReadingJourneySummary {
  totalVisits: number;
  uniqueEpisodes: number;
  revisits: number;
  sessionCount: number;
  averageVisitsPerSession: number;
  busiestSeason: { season: number; visits: number } | null;
  busiestArc: { title: string; visits: number } | null;
}

export interface ArcReadingInsight extends ProgressSummary {
  index: number;
  title: string;
  firstSeason: number;
  lastSeason: number;
  nextUnread: ReadingTarget | null;
}

export interface SeasonReadingInsight extends ProgressSummary {
  season: number;
  title: string;
  arcTitle: string;
  nextUnread: ReadingTarget | null;
}

function localDayStart(timestamp: number): number {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function dayKey(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function addDays(timestamp: number, delta: number): number {
  const date = new Date(timestamp);
  date.setDate(date.getDate() + delta);
  return date.getTime();
}

export function arcTitleForSeason(season: number): string {
  return EPISODE_ARCS.find((arc) => arc.seasons.some((entry) => entry.season === season))?.title || 'Unknown arc';
}

export function seasonTitleForNumber(season: number): string {
  return EPISODE_ARCS.flatMap((arc) => arc.seasons).find((entry) => entry.season === season)?.title || `Season ${season}`;
}

export function readingActivity(history: readonly { openedAt: number }[], days = 14, now = Date.now()): ReadingActivitySummary {
  const safeDays = Math.max(1, Math.min(60, Math.floor(days)));
  const today = localDayStart(now);
  const counts = new Map<string, number>();
  for (const entry of history) {
    if (!Number.isFinite(entry.openedAt)) continue;
    const key = dayKey(entry.openedAt);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  const timeline: ActivityDay[] = [];
  for (let offset = safeDays - 1; offset >= 0; offset -= 1) {
    const timestamp = addDays(today, -offset);
    timeline.push({ key: dayKey(timestamp), timestamp, count: counts.get(dayKey(timestamp)) || 0 });
  }

  const activeKeys = new Set(Array.from(counts.entries()).filter(([, count]) => count > 0).map(([key]) => key));
  let cursor = today;
  if (!activeKeys.has(dayKey(cursor)) && activeKeys.has(dayKey(addDays(cursor, -1)))) cursor = addDays(cursor, -1);
  let streak = 0;
  while (activeKeys.has(dayKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return {
    days: timeline,
    activeDays: timeline.filter((day) => day.count > 0).length,
    recentSeven: timeline.slice(-7).reduce((sum, day) => sum + day.count, 0),
    streak,
  };
}

export function readingSessions(journey: readonly ReadingJourneyEntry[], gapMinutes = 30): ReadingSession[] {
  const safeGap = Math.max(5, Math.min(240, Math.floor(gapMinutes))) * 60_000;
  const visits = journey.filter((entry) => Number.isFinite(entry.openedAt)).slice().sort((a, b) => a.openedAt - b.openedAt);
  if (!visits.length) return [];

  const grouped: ReadingJourneyEntry[][] = [];
  for (const entry of visits) {
    const current = grouped[grouped.length - 1];
    const previous = current?.[current.length - 1];
    if (!current || !previous || entry.openedAt - previous.openedAt > safeGap) grouped.push([entry]);
    else current.push(entry);
  }

  return grouped.map((entries) => ({
    startedAt: entries[0]!.openedAt,
    endedAt: entries[entries.length - 1]!.openedAt,
    visits: entries.length,
    uniqueEpisodes: new Set(entries.map((entry) => entry.id)).size,
    first: entries[0]!,
    last: entries[entries.length - 1]!,
  })).sort((a, b) => b.endedAt - a.endedAt);
}

export function readingJourneySummary(journey: readonly ReadingJourneyEntry[]): ReadingJourneySummary {
  const visits = journey.filter((entry) => Number.isFinite(entry.openedAt));
  const uniqueEpisodes = new Set(visits.map((entry) => entry.id)).size;
  const sessions = readingSessions(visits);
  const seasonCounts = new Map<number, number>();
  const arcCounts = new Map<string, number>();
  for (const entry of visits) {
    seasonCounts.set(entry.season, (seasonCounts.get(entry.season) || 0) + 1);
    const arc = arcTitleForSeason(entry.season);
    arcCounts.set(arc, (arcCounts.get(arc) || 0) + 1);
  }
  const busiestSeasonEntry = Array.from(seasonCounts.entries()).sort((a, b) => b[1] - a[1] || b[0] - a[0])[0];
  const busiestArcEntry = Array.from(arcCounts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];

  return {
    totalVisits: visits.length,
    uniqueEpisodes,
    revisits: Math.max(0, visits.length - uniqueEpisodes),
    sessionCount: sessions.length,
    averageVisitsPerSession: sessions.length ? Number((visits.length / sessions.length).toFixed(1)) : 0,
    busiestSeason: busiestSeasonEntry ? { season: busiestSeasonEntry[0], visits: busiestSeasonEntry[1] } : null,
    busiestArc: busiestArcEntry ? { title: busiestArcEntry[0], visits: busiestArcEntry[1] } : null,
  };
}

function nextUnreadForSeasons(readIds: readonly string[], seasons: readonly number[]): ReadingTarget | null {
  const read = new Set(readIds);
  for (const season of seasons) {
    const count = episodeCountForSeason(season);
    for (let episode = 1; episode <= count; episode += 1) {
      const id = episodeId(season, episode);
      if (!read.has(id)) return { id, season, episode };
    }
  }
  return null;
}

export function arcReadingInsights(readIds: readonly string[]): ArcReadingInsight[] {
  return EPISODE_ARCS.map((arc, index) => {
    const progress = progressForArc(readIds, index);
    const seasons = arc.seasons.map((season) => season.season);
    return {
      ...progress,
      index,
      title: arc.title,
      firstSeason: seasons[0] || 1,
      lastSeason: seasons[seasons.length - 1] || seasons[0] || 1,
      nextUnread: nextUnreadForSeasons(readIds, seasons),
    };
  });
}

export function inProgressSeasonInsights(readIds: readonly string[]): SeasonReadingInsight[] {
  const rows: SeasonReadingInsight[] = [];
  for (const arc of EPISODE_ARCS) {
    for (const seasonMeta of arc.seasons) {
      const progress = progressForSeason(readIds, seasonMeta.season);
      if (progress.read <= 0 || progress.complete) continue;
      rows.push({
        ...progress,
        season: seasonMeta.season,
        title: seasonMeta.title,
        arcTitle: arc.title,
        nextUnread: nextUnreadForSeasons(readIds, [seasonMeta.season]),
      });
    }
  }
  return rows.sort((a, b) => b.season - a.season || b.percent - a.percent);
}

export function furthestOpenedTarget(readIds: readonly string[]): ReadingTarget | null {
  let furthest: ReadingTarget | null = null;
  for (let season = 1; season <= 64; season += 1) {
    const count = episodeCountForSeason(season);
    for (let episode = 1; episode <= count; episode += 1) {
      const id = episodeId(season, episode);
      if (!readIds.includes(id)) continue;
      furthest = { id, season, episode };
    }
  }
  return furthest;
}
