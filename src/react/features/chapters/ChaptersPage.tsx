import { useEffect, useMemo, useRef, useState } from 'react';
import { EPISODE_ARCS } from '../../../episodeMeta';
import { loadSeason } from '../../../seasonStore';
import type { Episode } from '../../../types';
import { PageHeader } from '../../components/Shared';
import { useReaderState } from '../reader/ReaderContext';

interface ChaptersPageProps {
  onOpenChapter(season: number, episode: number): void;
}

export function ChaptersPage({ onOpenChapter }: ChaptersPageProps) {
  const { lastRead } = useReaderState();
  const allSeasons = useMemo(() => EPISODE_ARCS.flatMap((arc) => arc.seasons.map((season) => ({ ...season, arc: arc.title }))), []);
  const [selectedSeason, setSelectedSeason] = useState(lastRead?.season || 1);
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
  }, [selectedSeason]);

  const selected = allSeasons.find((item) => item.season === selectedSeason) || allSeasons[0];

  function openSeason(season: number): void {
    setSelectedSeason(season);
    window.requestAnimationFrame(() => {
      readerPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <section>
      <PageHeader eyebrow="Episode archive" title="Read The Quiet Regular" description="Browse 64 seasons without loading the entire novel into the page. Tap any season to bring its episodes straight into view, then open the chapter you want." />

      <div className="season-browser" aria-label="Seasons">
        {allSeasons.map((item) => (
          <button
            aria-pressed={item.season === selectedSeason}
            className={`season-card ${item.season === selectedSeason ? 'is-current' : ''}`}
            key={item.season}
            onClick={() => openSeason(item.season)}
            type="button"
          >
            <span className="season-card__number">{String(item.season).padStart(2, '0')}</span>
            <span><strong>{item.title}</strong><small>{item.arc}</small></span>
            <span className="season-card__action">Read <span aria-hidden="true">→</span></span>
          </button>
        ))}
      </div>

      <div className="season-reader-panel" ref={readerPanelRef}>
        <div className="season-selected-heading">
          <div><p className="eyebrow">{selected?.arc}</p><h3>{selected?.title}</h3><p className="season-selected-heading__meta">Season {selectedSeason}</p></div>
          <div className="season-selected-heading__actions">
            <span className="archive-count" aria-live="polite">{loading ? 'Loading…' : `${episodes.length} episodes`}</span>
            <button
              className="season-start-button"
              disabled={loading || Boolean(error) || episodes.length === 0}
              onClick={() => onOpenChapter(selectedSeason, 1)}
              type="button"
            >
              Start Season <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {loading ? <div className="reader-loading" role="status">Loading Season {selectedSeason}…</div> : null}
        {error ? <div className="reader-error"><strong>Season failed to load</strong><p>{error}</p><button onClick={() => openSeason(selectedSeason)} type="button">Retry</button></div> : null}
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
