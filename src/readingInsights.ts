import { EPISODE_ARCS } from './episodeMeta';
import type { ReadingJourneyEntry } from './readerJourney';

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

export function arcTitleForSeason(season: number): string {
  return EPISODE_ARCS.find((arc) => arc.seasons.some((entry) => entry.season === season))?.title || 'Unknown arc';
}

export function seasonTitleForNumber(season: number): string {
  return EPISODE_ARCS.flatMap((arc) => arc.seasons).find((entry) => entry.season === season)?.title || `Season ${season}`;
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
