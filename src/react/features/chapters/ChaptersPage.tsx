import { useEffect, useMemo, useState } from 'react';
import { EPISODE_ARCS } from '../../../episodeMeta';
import { nextUnreadInSeason, nextUnreadTarget, overallReadingProgress, progressForSeason } from '../../../readingProgress';
import { loadSeason } from '../../../seasonStore';
import type { Episode } from '../../../types';
import { PageHeader } from '../../components/Shared';
import { useReaderState } from '../reader/ReaderContext';

interface ChaptersPageProps {
  onOpenChapter(season: number, episode: number): void;
}

function episodeNumber(id: string | undefined): number {
  const match = id?.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function arcIndexForSeason(season: number): number {
  const index = EPISODE_ARCS.findIndex((arc) => arc.seasons.some((entry) => entry.season === season));
  return Math.max(0, index);
}

export function ChaptersPage({ onOpenChapter }: ChaptersPageProps) {
  const { lastRead, readEpisodes } = useReaderState();
  const initialSeason = lastRead?.season || 1;
  const allSeasons = useMemo(() => EPISODE_ARCS.flatMap((arc) => arc.seasons.map((season) => ({ ...season, arc: arc.title }))), []);
  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    loadSeason(selectedSeason).then((rows) => {
      if (!alive) return;
      setEpisodes(rows);
      setLoading(false);
    }).catch((cause: unknown) => {
      if (!alive) return;
      setError(cause instanceof Error ? cause.message : 'Unable to load this season.');
      setLoading(false);
    });
    return () => { alive = false; };
  }, [selectedSeason, loadAttempt]);

  const selectedArcIndex = arcIndexForSeason(selectedSeason);
  const lastReadEpisode = episodeNumber(lastRead?.id);
  const selectedHasResume = Boolean(lastRead && lastRead.season === selectedSeason);
  const overall = overallReadingProgress(readEpisodes);
  const nextUnread = nextUnreadTarget(readEpisodes, lastRead ? { season: lastRead.season, episode: lastReadEpisode } : null);
  const selectedProgress = progressForSeason(readEpisodes, selectedSeason);
  const selectedNextUnread = nextUnreadInSeason(readEpisodes, selectedSeason, selectedHasResume ? lastReadEpisode : 0);
  const preferredChapter = selectedHasResume ? lastReadEpisode : selectedNextUnread?.episode || 1;

  function openArc(index: number): void {
    const arc = EPISODE_ARCS[index];
    if (!arc) return;
    const preferred = lastRead && arc.seasons.some((item) => item.season === lastRead.season)
      ? lastRead.season
      : arc.seasons[0]?.season || 1;
    setSelectedSeason(preferred);
  }

  function retrySeason(): void {
    setLoadAttempt((attempt) => attempt + 1);
  }

  return (
    <section>
      <PageHeader eyebrow="Chapter archive" title="Read The Quiet Regular" description="Pick an arc and season, then open a chapter." />

      <div className="chapter-quickbar" aria-label="Reading shortcuts">
        <button className="chapter-quickbar__primary" onClick={() => onOpenChapter(lastRead?.season || 1, lastRead ? lastReadEpisode : 1)} type="button">
          <span>{lastRead ? 'CONTINUE' : 'START'}</span>
          <strong>{lastRead ? `S${lastRead.season} · Ch ${lastReadEpisode}` : 'S1 · Ch 1'}</strong>
          <small>{lastRead?.title || 'Begin The Quiet Regular'}</small>
          <b aria-hidden="true">→</b>
        </button>
        {nextUnread ? (
          <button className="chapter-quickbar__secondary" onClick={() => onOpenChapter(nextUnread.season, nextUnread.episode)} type="button">
            <span>Next unread</span>
            <strong>S{nextUnread.season} · Ch {nextUnread.episode}</strong>
            <small>{overall.percent}% of the story opened</small>
          </button>
        ) : (
          <div className="chapter-quickbar__secondary chapter-quickbar__complete"><span>Story</span><strong>Complete</strong><small>All {overall.total} chapters opened</small></div>
        )}
      </div>

      <section className="chapter-browser-panel" aria-labelledby="chapterBrowserHeading">
        <div className="chapter-browser-panel__heading">
          <div><p className="eyebrow">Browse</p><h3 id="chapterBrowserHeading">Find a chapter</h3></div>
        </div>

        <div className="chapter-picker-grid">
          <label>
            <span>Story arc</span>
            <select aria-label="Story arc" onChange={(event) => openArc(Number(event.target.value))} value={selectedArcIndex}>
              {EPISODE_ARCS.map((arc, index) => {
                const first = arc.seasons[0]?.season || 1;
                const last = arc.seasons[arc.seasons.length - 1]?.season || first;
                return <option key={`${index}-${arc.title}`} value={index}>{arc.title} · S{first}–S{last}</option>;
              })}
            </select>
          </label>

          <label>
            <span>Season</span>
            <select aria-label="Season" onChange={(event) => setSelectedSeason(Number(event.target.value))} value={selectedSeason}>
              {allSeasons.map((item) => <option key={item.season} value={item.season}>{item.title}</option>)}
            </select>
          </label>
        </div>

        <div className="chapter-season-summary chapter-season-summary--compact">
          <div className="chapter-season-summary__actions">
            <button disabled={selectedSeason <= 1} onClick={() => setSelectedSeason((season) => Math.max(1, season - 1))} type="button">← S{Math.max(1, selectedSeason - 1)}</button>
            <button className="is-primary" disabled={loading || Boolean(error) || episodes.length === 0} onClick={() => onOpenChapter(selectedSeason, preferredChapter)} type="button">{selectedHasResume ? `Continue Ch ${preferredChapter}` : selectedNextUnread ? `Read Ch ${preferredChapter}` : 'Start season'}</button>
            <button disabled={selectedSeason >= 64} onClick={() => setSelectedSeason((season) => Math.min(64, season + 1))} type="button">S{Math.min(64, selectedSeason + 1)} →</button>
          </div>
        </div>

        <div className="season-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={selectedProgress.percent} aria-label={`Season ${selectedSeason} ${selectedProgress.percent}% complete`}><span style={{ width: `${selectedProgress.percent}%` }} /></div>

        {loading ? <div className="reader-loading" role="status">Loading Season {selectedSeason}…</div> : null}
        {error ? <div className="reader-error"><strong>Season failed to load</strong><p>{error}</p><button onClick={retrySeason} type="button">Retry</button></div> : null}
        {!loading && !error ? (
          <div className="chapter-list chapter-list--compact">
            {episodes.map((chapter, index) => {
              const number = index + 1;
              const id = `ep-s${selectedSeason}-e${number}`;
              const isLastRead = lastRead?.id === id;
              const isRead = readEpisodes.includes(id);
              return (
                <article className={`chapter-row chapter-row--compact ${isLastRead ? 'is-last-read' : ''} ${isRead ? 'is-read' : ''}`} key={id}>
                  <button className="chapter-row__open" onClick={() => onOpenChapter(selectedSeason, number)} type="button">
                    <span className="chapter-row__number"><small>CH</small><strong>{number}</strong></span>
                    <span className="chapter-row__body"><h3>{chapter.title}</h3></span>
                    <span className={`chapter-row__status ${isLastRead ? 'is-current' : isRead ? 'is-read' : ''}`}>{isLastRead ? 'Continue' : isRead ? '✓ Read' : 'Unread'}</span>
                  </button>
                </article>
              );
            })}
          </div>
        ) : null}
      </section>
    </section>
  );
}
