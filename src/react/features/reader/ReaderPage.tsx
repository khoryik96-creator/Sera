import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { loadSeason } from '../../../seasonStore';
import { renderNovel } from '../../../novel';
import type { Episode } from '../../../types';
import { useReaderState } from './ReaderContext';
import type { ReaderFont, ReaderSpacing, ReaderWidth } from './ReaderContext';

interface ReaderPageProps {
  season: number;
  episode: number;
  onBack(): void;
  onOpenChapter(season: number, episode: number): void;
}

const FONT_STACKS: Record<ReaderFont, string> = {
  serif: "Georgia, 'Times New Roman', serif",
  book: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
  sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};
const FONT_LABELS: Record<ReaderFont, string> = { serif: 'Serif', book: 'Book', sans: 'Sans' };
const LINE_HEIGHTS: Record<ReaderSpacing, number> = { compact: 1.66, comfortable: 1.82, relaxed: 2.05 };
const SPACING_LABELS: Record<ReaderSpacing, string> = { compact: 'Compact', comfortable: 'Comfort', relaxed: 'Relaxed' };
const WIDTHS: Record<ReaderWidth, string> = { narrow: '640px', standard: '760px', wide: '900px' };
const WIDTH_LABELS: Record<ReaderWidth, string> = { narrow: 'Narrow', standard: 'Standard', wide: 'Wide' };

type ReaderSurfaceStyle = CSSProperties & {
  '--reader-scale': number;
  '--reader-line-height': number;
  '--reader-max-width': string;
  '--reader-font-family': string;
};

export function ReaderPage({ season, episode, onBack, onOpenChapter }: ReaderPageProps) {
  const {
    bookmarks,
    markRead,
    toggleSaved,
    scale,
    font,
    spacing,
    width,
    changeScale,
    cycleFont,
    cycleSpacing,
    cycleWidth,
    resetPreferences,
  } = useReaderState();
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

  const surfaceStyle: ReaderSurfaceStyle = {
    '--reader-scale': scale,
    '--reader-line-height': LINE_HEIGHTS[spacing],
    '--reader-max-width': WIDTHS[width],
    '--reader-font-family': FONT_STACKS[font],
  };

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
            <div><p className="eyebrow">Season {season} · Episode {episode} of {episodes.length}</p><h2>{current.title}</h2><p>The Quiet Regular</p></div>
            <button className={`bookmark-toggle ${saved ? 'is-saved' : ''}`} onClick={() => bookmark && toggleSaved(bookmark)} type="button">{saved ? '★ Saved' : '☆ Bookmark'}</button>
          </header>

          <div className="reader-controls" aria-label="Reading preferences">
            <span>Reading</span>
            <div className="reader-controls__group" aria-label="Text size">
              <button onClick={() => changeScale(-0.08)} type="button">A−</button>
              <strong>{Math.round(scale * 100)}%</strong>
              <button onClick={() => changeScale(0.08)} type="button">A+</button>
            </div>
            <button onClick={cycleFont} type="button">Font · {FONT_LABELS[font]}</button>
            <button onClick={cycleSpacing} type="button">Spacing · {SPACING_LABELS[spacing]}</button>
            <button onClick={cycleWidth} type="button">Width · {WIDTH_LABELS[width]}</button>
            <button className="reader-controls__reset" onClick={resetPreferences} type="button">Reset</button>
          </div>

          <article className="reader-surface" style={surfaceStyle}>
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
