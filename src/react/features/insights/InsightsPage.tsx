import type { CSSProperties } from 'react';
import { completedSeasonCount, nextUnreadTarget, overallReadingProgress } from '../../../readingProgress';
import { arcReadingInsights, furthestOpenedTarget, inProgressSeasonInsights, readingActivity, readingJourneySummary } from '../../../readingInsights';
import { PageHeader } from '../../components/Shared';
import { useReaderState } from '../reader/ReaderContext';
import '../../styles/insights.css';

interface InsightsPageProps {
  onOpenChapter(season: number, episode: number): void;
  onOpenLibrary(): void;
  onOpenJourney(): void;
}

function episodeNumber(id: string): number {
  const match = id.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function dayLabel(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(timestamp)).slice(0, 2);
}

export function InsightsPage({ onOpenChapter, onOpenLibrary, onOpenJourney }: InsightsPageProps) {
  const { readEpisodes, history, journey, bookmarks, notes, passages, lastRead } = useReaderState();
  const overall = overallReadingProgress(readEpisodes);
  const completedSeasons = completedSeasonCount(readEpisodes);
  const activitySource = journey.visits.length ? journey.visits : history;
  const activity = readingActivity(activitySource, 14);
  const journeySummary = readingJourneySummary(activitySource);
  const arcs = arcReadingInsights(readEpisodes);
  const inProgress = inProgressSeasonInsights(readEpisodes).slice(0, 8);
  const furthest = furthestOpenedTarget(readEpisodes);
  const lastEpisode = lastRead ? episodeNumber(lastRead.id) : 1;
  const nextUnread = nextUnreadTarget(readEpisodes, lastRead ? { season: lastRead.season, episode: lastEpisode } : null);
  const maxDay = Math.max(1, ...activity.days.map((day) => day.count));

  return (
    <section className="reading-insights">
      <PageHeader eyebrow="Private reader analytics" title="Reading Insights" description="A device-local view of your progress, reading journey, recent rhythm, story arcs, in-progress seasons, and Reader Library footprint. Nothing is sent anywhere." />

      <div className="insights-hero">
        <div className="insights-hero__copy">
          <p className="eyebrow">Your journey through The Quiet Regular</p>
          <h3>{overall.read ? `${overall.percent}% of the story opened.` : 'Your reading map starts here.'}</h3>
          <p>{overall.read ? `${overall.read} of ${overall.total} episodes have been opened on this device.` : 'Open an episode and this dashboard will begin building itself from your local reader history.'}</p>
          <div className="insights-hero__actions">
            {lastRead ? <button className="insights-primary" onClick={() => onOpenChapter(lastRead.season, lastEpisode)} type="button"><span>Continue reading</span><strong>S{lastRead.season} · E{lastEpisode}</strong><small>{lastRead.title}</small><b>→</b></button> : <button className="insights-primary" onClick={() => onOpenChapter(1, 1)} type="button"><span>Begin the story</span><strong>S1 · E1</strong><small>Start from Second Spring.</small><b>→</b></button>}
            {nextUnread ? <button className="insights-secondary" onClick={() => onOpenChapter(nextUnread.season, nextUnread.episode)} type="button">Next unread · S{nextUnread.season} E{nextUnread.episode} <span>→</span></button> : null}
          </div>
        </div>
        <div className="insights-overall" aria-label="Overall story progress">
          <div className="insights-overall__ring" style={{ '--insights-progress': `${overall.percent * 3.6}deg` } as CSSProperties}><span><strong>{overall.percent}%</strong><small>complete</small></span></div>
          <p>{completedSeasons} of 69 seasons complete</p>
        </div>
      </div>

      <div className="insights-stat-grid">
        <article><span>Current streak</span><strong>{activity.streak}</strong><small>consecutive reading day{activity.streak === 1 ? '' : 's'}</small></article>
        <article><span>Last 7 days</span><strong>{activity.recentSeven}</strong><small>episode visit{activity.recentSeven === 1 ? '' : 's'}</small></article>
        <article><span>Active days</span><strong>{activity.activeDays}</strong><small>of the last 14 days</small></article>
        <article><span>Furthest opened</span><strong>{furthest ? `S${furthest.season}` : '—'}</strong><small>{furthest ? `Episode ${furthest.episode}` : 'No episodes yet'}</small></article>
      </div>

      <div className="insights-columns">
        <section className="insights-panel insights-activity-panel">
          <div className="insights-heading"><div><p className="eyebrow">Recent rhythm</p><h3>14-day activity</h3></div><span>{activity.activeDays} active days</span></div>
          <div className="insights-activity-bars" aria-label="Reading activity over the last 14 days">
            {activity.days.map((day) => {
              const height = day.count ? Math.max(12, Math.round((day.count / maxDay) * 100)) : 4;
              return <div className={day.count ? 'is-active' : ''} key={day.key} title={`${day.key}: ${day.count} visit${day.count === 1 ? '' : 's'}`}><span className="insights-activity-bars__track"><i style={{ height: `${height}%` }} /></span><small>{dayLabel(day.timestamp)}</small><b>{day.count || ''}</b></div>;
            })}
          </div>
          <p className="insights-footnote">Activity uses Reading Journey visits when available, so rereads count as real reading activity instead of being overwritten by the Recent Reading list.</p>
        </section>

        <section className="insights-panel insights-library-panel">
          <div className="insights-heading"><div><p className="eyebrow">Reader Library</p><h3>Your saved layer</h3></div><button onClick={onOpenLibrary} type="button">Open Library →</button></div>
          <div className="insights-library-grid">
            <div><strong>{bookmarks.length}</strong><span>bookmarks</span></div>
            <div><strong>{notes.length}</strong><span>private notes</span></div>
            <div><strong>{passages.length}</strong><span>saved passages</span></div>
            <div><strong>{journeySummary.totalVisits}</strong><span>journey visits</span></div>
          </div>
          <p className="insights-footnote">These counts stay in this browser unless you explicitly export a Reader Library backup.</p>
        </section>
      </div>

      <section className="insights-panel">
        <div className="insights-heading"><div><p className="eyebrow">Reading Journey v2</p><h3>How you move through the story</h3></div><button onClick={onOpenJourney} type="button">Open Journey →</button></div>
        <div className="insights-library-grid">
          <div><strong>{journeySummary.sessionCount}</strong><span>reading sessions</span></div>
          <div><strong>{journeySummary.revisits}</strong><span>episode revisits</span></div>
          <div><strong>{journeySummary.busiestSeason ? `S${journeySummary.busiestSeason.season}` : '—'}</strong><span>{journeySummary.busiestSeason ? `${journeySummary.busiestSeason.visits} visits · busiest season` : 'busiest season'}</span></div>
          <div><strong>{journey.seasonCompletions.length}</strong><span>completion milestones</span></div>
        </div>
        <p className="insights-footnote">Sessions are reconstructed locally using a 30-minute inactivity gap. The Reader Library Journey tab contains the searchable visit timeline, recent-session resume cards, filters, and season milestones.</p>
      </section>

      <section className="insights-section">
        <div className="insights-heading"><div><p className="eyebrow">Story map</p><h3>Progress by arc</h3></div><span>14 arcs · 69 seasons</span></div>
        <div className="insights-arc-grid">
          {arcs.map((arc) => {
            const target = arc.nextUnread || { season: arc.firstSeason, episode: 1 };
            return <button className={`insights-arc-card ${arc.complete ? 'is-complete' : ''}`} key={arc.title} onClick={() => onOpenChapter(target.season, target.episode)} type="button"><div><span>{String(arc.index + 1).padStart(2, '0')}</span><small>S{arc.firstSeason}–S{arc.lastSeason}</small></div><strong>{arc.title}</strong><p>{arc.read} / {arc.total} episodes · {arc.percent}%</p><span className="insights-progress-track"><i style={{ width: `${arc.percent}%` }} /></span><b>{arc.complete ? '✓ Complete' : arc.nextUnread ? `Next · S${arc.nextUnread.season} E${arc.nextUnread.episode}` : 'Open arc'} →</b></button>;
          })}
        </div>
      </section>

      <section className="insights-section">
        <div className="insights-heading"><div><p className="eyebrow">Open threads</p><h3>In-progress seasons</h3></div><span>{inProgress.length ? `${inProgress.length} shown` : 'Nothing in progress'}</span></div>
        {inProgress.length ? <div className="insights-season-list">{inProgress.map((season) => <button key={season.season} onClick={() => onOpenChapter(season.nextUnread?.season || season.season, season.nextUnread?.episode || 1)} type="button"><span className="insights-season-list__number">S{season.season}</span><span><small>{season.arcTitle}</small><strong>{season.title}</strong><span className="insights-progress-track"><i style={{ width: `${season.percent}%` }} /></span></span><span className="insights-season-list__meta"><strong>{season.percent}%</strong><small>{season.read}/{season.total}</small><b>Continue →</b></span></button>)}</div> : <div className="insights-empty"><strong>No partially read seasons</strong><p>Once you open part of a season without finishing it, it will appear here.</p></div>}
      </section>

      <aside className="insights-privacy"><span aria-hidden="true">◇</span><div><strong>Private by design</strong><p>Reading Insights and Reading Journey do not add analytics tracking. They only calculate views from local reader state used for Continue Reading, Reader Library, and reader progress.</p></div></aside>
    </section>
  );
}
