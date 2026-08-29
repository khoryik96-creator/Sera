import { useMemo, useState } from 'react';
import type { ReadingHistoryEntry } from '../../../readerLibrary';
import type { ReadingJourneyState } from '../../../readerJourney';
import { arcTitleForSeason, readingJourneySummary, readingSessions, seasonTitleForNumber } from '../../../readingInsights';
import { EmptyState } from '../../components/Shared';
import '../../styles/reading-journey.css';

interface ReadingJourneyPanelProps {
  journey: ReadingJourneyState;
  recent: ReadingHistoryEntry[];
  onOpenChapter(season: number, episode: number): void;
  onClear(): void;
}

type RangeFilter = 'all' | '7' | '30';

function episodeNumber(id: string): number {
  const match = id.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function shortDate(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(timestamp));
}

function sessionRange(startedAt: number, endedAt: number): string {
  const date = new Date(startedAt);
  const start = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date);
  const end = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(endedAt));
  return `${shortDate(startedAt)} · ${start}–${end}`;
}

export function ReadingJourneyPanel({ journey, recent, onOpenChapter, onClear }: ReadingJourneyPanelProps) {
  const visits = journey.visits.length ? journey.visits : recent;
  const [query, setQuery] = useState('');
  const [range, setRange] = useState<RangeFilter>('all');
  const [seasonFilter, setSeasonFilter] = useState('all');
  const summary = useMemo(() => readingJourneySummary(visits), [visits]);
  const sessions = useMemo(() => readingSessions(visits).slice(0, 6), [visits]);
  const seasonOptions = useMemo(() => Array.from(new Set(visits.map((entry) => entry.season))).sort((a, b) => a - b), [visits]);
  const normalizedQuery = query.trim().toLowerCase();
  const now = Date.now();
  const cutoff = range === 'all' ? 0 : now - Number(range) * 86_400_000;
  const visibleVisits = visits.filter((entry) => {
    if (cutoff && entry.openedAt < cutoff) return false;
    if (seasonFilter !== 'all' && entry.season !== Number(seasonFilter)) return false;
    if (!normalizedQuery) return true;
    const episode = episodeNumber(entry.id);
    return `${entry.title} ${arcTitleForSeason(entry.season)} season ${entry.season} episode ${episode} s${entry.season} e${episode}`.toLowerCase().includes(normalizedQuery);
  });

  return (
    <div className="reading-journey">
      <div className="library-panel-heading">
        <div><p className="eyebrow">Private reading timeline</p><h3>Reading journey</h3></div>
        {visits.length ? <button onClick={onClear} type="button">Clear journey</button> : null}
      </div>

      {visits.length === 0 ? <EmptyState title="No reading journey yet" text="Episodes you open from this version onward will build a private timeline here. Existing Recent Reading entries will migrate automatically when available." /> : (
        <>
          <div className="journey-stat-grid" aria-label="Reading journey summary">
            <article><span>Visits</span><strong>{summary.totalVisits}</strong><small>episode opens tracked</small></article>
            <article><span>Unique episodes</span><strong>{summary.uniqueEpisodes}</strong><small>distinct chapters visited</small></article>
            <article><span>Sessions</span><strong>{summary.sessionCount}</strong><small>{summary.averageVisitsPerSession} visits per session</small></article>
            <article><span>Revisits</span><strong>{summary.revisits}</strong><small>{summary.busiestSeason ? `Most visited: S${summary.busiestSeason.season}` : 'No repeats yet'}</small></article>
          </div>

          <div className="journey-tools">
            <input aria-label="Search reading journey" className="filter-input" onChange={(event) => setQuery(event.target.value)} placeholder="Search title, arc, S12 E3…" value={query} />
            <select aria-label="Filter reading journey by date" onChange={(event) => setRange(event.target.value as RangeFilter)} value={range}>
              <option value="all">All dates</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option>
            </select>
            <select aria-label="Filter reading journey by season" onChange={(event) => setSeasonFilter(event.target.value)} value={seasonFilter}>
              <option value="all">All seasons</option>{seasonOptions.map((season) => <option key={season} value={season}>Season {season}</option>)}
            </select>
          </div>

          {sessions.length ? <section className="journey-section">
            <div className="journey-section__heading"><div><p className="eyebrow">Resume a session</p><h4>Recent sessions</h4></div><span>{summary.busiestArc ? `Most visited · ${summary.busiestArc.title}` : ''}</span></div>
            <div className="journey-session-grid">{sessions.map((session) => { const episode = episodeNumber(session.last.id); return <button key={`${session.startedAt}-${session.endedAt}`} onClick={() => onOpenChapter(session.last.season, episode)} type="button"><small>{sessionRange(session.startedAt, session.endedAt)}</small><strong>{session.visits} visit{session.visits === 1 ? '' : 's'} · {session.uniqueEpisodes} unique</strong><span>S{session.first.season} → S{session.last.season} · resume S{session.last.season} E{episode}</span><b>Resume →</b></button>; })}</div>
          </section> : null}

          {journey.seasonCompletions.length ? <section className="journey-section">
            <div className="journey-section__heading"><div><p className="eyebrow">Milestones</p><h4>Season completions</h4></div><span>Recorded from Reading Journey v2 onward</span></div>
            <div className="journey-milestones">{journey.seasonCompletions.map((milestone) => <button key={milestone.season} onClick={() => onOpenChapter(milestone.season, 1)} type="button"><span>✓</span><div><small>{shortDate(milestone.completedAt)}</small><strong>{seasonTitleForNumber(milestone.season)}</strong></div><b>S{milestone.season}</b></button>)}</div>
          </section> : null}

          <section className="journey-section">
            <div className="journey-section__heading"><div><p className="eyebrow">Timeline</p><h4>Episode visits</h4></div><span>{visibleVisits.length} shown · up to 500 stored locally</span></div>
            {visibleVisits.length === 0 ? <EmptyState title="No matching journey entries" text="Try another date range, season, title, arc, or episode search." /> : <div className="journey-timeline">{visibleVisits.map((entry, index) => { const episode = episodeNumber(entry.id); return <button key={`${entry.id}-${entry.openedAt}-${index}`} onClick={() => onOpenChapter(entry.season, episode)} type="button"><span><small>{arcTitleForSeason(entry.season)} · S{entry.season} E{episode}</small><strong>{entry.title}</strong></span><time dateTime={new Date(entry.openedAt).toISOString()}>{new Date(entry.openedAt).toLocaleString()}</time><b>→</b></button>; })}</div>}
          </section>
        </>
      )}
    </div>
  );
}