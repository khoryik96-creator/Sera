import { useEffect, useMemo, useState } from 'react';
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

  return (
    <section>
      <PageHeader eyebrow="Episode archive" title="Read The Quiet Regular" description="Browse 64 seasons without loading the entire novel into the page. Open a season, then jump directly into an episode." />

      <div className="season-browser">
        {allSeasons.map((item) => (
          <button className={`season-card ${item.season === selectedSeason ? 'is-current' : ''}`} key={item.season} onClick={() => setSelectedSeason(item.season)} type="button">
            <span className="season-card__number">{String(item.season).padStart(2, '0')}</span>
            <span><strong>{item.title}</strong><small>{item.arc}</small></span>
            <span aria-hidden="true">›</span>
          </button>
        ))}
      </div>

      <div className="season-selected-heading">
        <div><p className="eyebrow">{selected?.arc}</p><h3>{selected?.title}</h3></div>
        <span className="archive-count">{episodes.length || '—'} episodes</span>
      </div>

      {loading ? <div className="reader-loading">Loading Season {selectedSeason}…</div> : null}
      {error ? <div className="reader-error"><strong>Season failed to load</strong><p>{error}</p></div> : null}
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
    </section>
  );
}
