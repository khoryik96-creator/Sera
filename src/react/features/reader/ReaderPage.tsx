import React, { useEffect, useState } from 'https://esm.sh/react@19.0.0';
import { loadSeason } from '../../../seasonStore';
import { renderNovel } from '../../../novel';
import type { Episode } from '../../../types';
import { useReaderState } from './ReaderContext';

interface ReaderPageProps {
  season: number;
  episode: number;
  onBack(): void;
  onOpenChapter(season: number, episode: number): void;
}

export function ReaderPage({ season, episode, onBack, onOpenChapter }: ReaderPageProps) {
  const { bookmarks, markRead, toggleSaved, scale, relaxedSpacing, changeScale, toggleSpacing } = useReaderState();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    loadSeason(season).then((rows) => {
      if (!alive) return;
      setEpisodes(rows);
      setLoading(false);
      const current = rows[episode - 1];
      if (current) markRead({ id: `ep-s${season}-e${episode}`, season, title: current.title });
    }).catch((cause: unknown) => {
      if (!alive) return;
      setError(cause instanceof Error ? cause.message : 'Unable to load this episode.');
      setLoading(false);
    });
    return () => { alive = false; };
  }, [season, episode]);

  const current = episodes[episode - 1];
  const bookmark = current ? { id: `ep-s${season}-e${episode}`, season, title: current.title } : null;
  const saved = bookmark ? bookmarks.some((item) => item.id === bookmark.id) : false;

  async function goPrevious(): Promise<void> {
    if (episode > 1) { onOpenChapter(season, episode - 1); return; }
    if (season <= 1) return;
    const previous = await loadSeason(season - 1);
    onOpenChapter(season - 1, previous.length);
  }

  function goNext(): void {
    if (episode < episodes.length) { onOpenChapter(season, episode + 1); return; }
    if (season < 64) onOpenChapter(season + 1, 1);
  }

  return (
    <section className="reader-page">
      <div className="reader-page__topline">
        <button className="text-button" onClick={onBack} type="button">← Episode archive</button>
        <span>Season {season} · Episode {episode}</span>
      </div>

      {loading ? <div className="reader-loading">Loading episode…</div> : null}
      {error ? <div className="reader-error"><strong>Episode failed to load</strong><p>{error}</p><button onClick={onBack} type="button">Back to archive</button></div> : null}

      {!loading && !error && current ? (
        <>
          <header className="reader-header">
            <div><p className="eyebrow">Season {season} · Episode {episode}</p><h2>{current.title}</h2><p>The Quiet Regular</p></div>
            <button className={`bookmark-toggle ${saved ? 'is-saved' : ''}`} onClick={() => bookmark && toggleSaved(bookmark)} type="button">{saved ? '★ Saved' : '☆ Bookmark'}</button>
          </header>

          <div className="reader-controls" aria-label="Reading preferences">
            <span>Reading</span>
            <button onClick={() => changeScale(-0.08)} type="button">A−</button>
            <strong>{Math.round(scale * 100)}%</strong>
            <button onClick={() => changeScale(0.08)} type="button">A+</button>
            <button className={relaxedSpacing ? 'is-active' : ''} onClick={toggleSpacing} type="button">Spacing</button>
          </div>

          <article className="reader-surface" style={{ '--reader-scale': scale, '--reader-line-height': relaxedSpacing ? 2.05 : 1.82 }}>
            <div className="reader-prose" dangerouslySetInnerHTML={{ __html: renderNovel(current.text, season) }} />
          </article>

          <nav className="reader-nav" aria-label="Episode navigation">
            <button disabled={season === 1 && episode === 1} onClick={() => { void goPrevious(); }} type="button"><span>Previous</span><strong>{episode > 1 ? `Episode ${episode - 1}` : season > 1 ? `Season ${season - 1}` : 'Beginning'}</strong></button>
            <button disabled={season === 64 && episode === episodes.length} onClick={goNext} type="button"><span>Next</span><strong>{episode < episodes.length ? `Episode ${episode + 1}` : season < 64 ? `Season ${season + 1}` : 'The End'}</strong></button>
          </nav>
        </>
      ) : null}
    </section>
  );
}
