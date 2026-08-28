import { useEffect, useMemo, useRef, useState } from 'react';
import { EPISODE_ARCS } from '../../../episodeMeta';
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
  const { lastRead } = useReaderState();
  const initialSeason = lastRead?.season || 1;
  const allSeasons = useMemo(() => EPISODE_ARCS.flatMap((arc) => arc.seasons.map((season) => ({ ...season, arc: arc.title }))), []);
  const [selectedArcIndex, setSelectedArcIndex] = useState(() => arcIndexForSeason(initialSeason));
  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const readerPanelRef = useRef<HTMLDivElement>(null);

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

  const selectedArc = EPISODE_ARCS[selectedArcIndex] || EPISODE_ARCS[0];
  const selected = allSeasons.find((item) => item.season === selectedSeason) || allSeasons[0];
  const lastReadEpisode = episodeNumber(lastRead?.id);
  const selectedHasResume = Boolean(lastRead && lastRead.season === selectedSeason);

  function bringReaderIntoView(): void {
    window.requestAnimationFrame(() => {
      readerPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function selectArc(index: number): void {
    const arc = EPISODE_ARCS[index];
    if (!arc) return;
    setSelectedArcIndex(index);
    const preferred = lastRead && arc.seasons.some((item) => item.season === lastRead.season)
      ? lastRead.season
      : arc.seasons[0]?.season || 1;
    setSelectedSeason(preferred);
  }

  function openSeason(season: number): void {
    setSelectedArcIndex(arcIndexForSeason(season));
    setSelectedSeason(season);
    bringReaderIntoView();
  }

  function retrySeason(): void {
    setLoadAttempt((attempt) => attempt + 1);
    bringReaderIntoView();
  }

  return (
    <section>
      <PageHeader eyebrow="Episode archive" title="Read The Quiet Regular" description="Browse the 64-season novel by story arc, keep your last-read chapter close, and open only the season you actually want to read." />

      <button className="archive-resume" onClick={() => onOpenChapter(lastRead?.season || 1, lastRead ? lastReadEpisode : 1)} type="button">
        <span className="archive-resume__mark">{lastRead ? 'CONTINUE' : 'START'}</span>
        <span className="archive-resume__copy">
          <small>{lastRead ? `Season ${lastRead.season} · Episode ${lastReadEpisode}` : 'Season 1 · Episode 1'}</small>
          <strong>{lastRead?.title || 'Begin The Quiet Regular'}</strong>
          <span>{lastRead ? 'Resume from your saved reading position.' : 'Start the story from the locked first season.'}</span>
        </span>
        <span className="archive-resume__action">Read <span aria-hidden="true">→</span></span>
      </button>

      <div className="archive-section-heading"><div><p className="eyebrow">Story arcs</p><h3>Jump by arc</h3></div><span>13 arcs · 64 seasons</span></div>
      <nav className="arc-browser" aria-label="Story arcs">
        {EPISODE_ARCS.map((arc, index) => {
          const first = arc.seasons[0]?.season || 1;
          const last = arc.seasons[arc.seasons.length - 1]?.season || first;
          return (
            <button aria-pressed={index === selectedArcIndex} className={`arc-card ${index === selectedArcIndex ? 'is-current' : ''}`} key={`${index}-${arc.title}`} onClick={() => selectArc(index)} type="button">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{arc.title}</strong>
              <small>S{first}–S{last}</small>
            </button>
          );
        })}
      </nav>

      <div className="archive-section-heading archive-section-heading--seasons"><div><p className="eyebrow">Selected arc</p><h3>{selectedArc?.title}</h3></div><span>{selectedArc?.seasons.length || 0} seasons</span></div>
      <div className="season-browser" aria-label={`Seasons in ${selectedArc?.title || 'selected arc'}`}>
        {(selectedArc?.seasons || []).map((item) => {
          const isLastRead = lastRead?.season === item.season;
          return (
            <button
              aria-pressed={item.season === selectedSeason}
              className={`season-card ${item.season === selectedSeason ? 'is-current' : ''} ${isLastRead ? 'is-last-read' : ''}`}
              key={item.season}
              onClick={() => openSeason(item.season)}
              type="button"
            >
              <span className="season-card__number">{String(item.season).padStart(2, '0')}</span>
              <span><strong>{item.title}</strong><small>{isLastRead ? `Continue from Episode ${lastReadEpisode}` : item.badge}</small></span>
              <span className="season-card__action">{isLastRead ? 'Resume' : 'Read'} <span aria-hidden="true">→</span></span>
            </button>
          );
        })}
      </div>

      <div className="season-reader-panel" ref={readerPanelRef}>
        <div className="season-selected-heading">
          <div><p className="eyebrow">{selected?.arc}</p><h3>{selected?.title}</h3><p className="season-selected-heading__meta">Season {selectedSeason}</p></div>
          <div className="season-selected-heading__actions">
            <span className="archive-count" aria-live="polite">{loading ? 'Loading…' : `${episodes.length} episodes`}</span>
            {selectedHasResume ? <button className="season-continue-button" disabled={loading || Boolean(error)} onClick={() => onOpenChapter(selectedSeason, lastReadEpisode)} type="button">Continue E{lastReadEpisode}</button> : null}
            <button className="season-start-button" disabled={loading || Boolean(error) || episodes.length === 0} onClick={() => onOpenChapter(selectedSeason, 1)} type="button">Start Season <span aria-hidden="true">→</span></button>
          </div>
        </div>

        {loading ? <div className="reader-loading" role="status">Loading Season {selectedSeason}…</div> : null}
        {error ? <div className="reader-error"><strong>Season failed to load</strong><p>{error}</p><button onClick={retrySeason} type="button">Retry</button></div> : null}
        {!loading && !error ? (
          <div className="chapter-list">
            {episodes.map((episode, index) => {
              const number = index + 1;
              const id = `ep-s${selectedSeason}-e${number}`;
              const isLastRead = lastRead?.id === id;
              return (
                <article className={`chapter-row ${isLastRead ? 'is-last-read' : ''}`} key={id}>
                  <button className="chapter-row__open" onClick={() => onOpenChapter(selectedSeason, number)} type="button">
                    <span className="chapter-row__number"><small>S{selectedSeason}</small><strong>{number}</strong></span>
                    <span className="chapter-row__body"><span className="season-kicker">Episode {number}{isLastRead ? ' · Continue here' : ''}</span><h3>{episode.title}</h3><p>{episode.text.replace(/\[\[speaker:[^\]]+\]\]/g, '').replace(/\s+/g, ' ').slice(0, 190)}…</p></span>
                  </button>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
