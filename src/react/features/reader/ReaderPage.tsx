import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { EPISODE_ARCS } from '../../../episodeMeta';
import { loadSeason } from '../../../seasonStore';
import { renderNovel } from '../../../novel';
import { nextUnreadTarget, progressForSeason } from '../../../readingProgress';
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
    readEpisodes,
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
  const arcIndex = EPISODE_ARCS.findIndex((arc) => arc.seasons.some((entry) => entry.season === season));
  const arc = EPISODE_ARCS[Math.max(0, arcIndex)];
  const seasonProgress = progressForSeason(readEpisodes, season);
  const nextUnread = nextUnreadTarget(readEpisodes, { season, episode });
  const previousTitle = episode > 1 ? episodes[episode - 2]?.title : season > 1 ? `Final episode of Season ${season - 1}` : 'Beginning';
  const nextTitle = episode < episodes.length ? episodes[episode]?.title : season < 64 ? `Season ${season + 1} · Episode 1` : 'The End';

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
        <button className="text-button" onClick={onBack} type="button">← Back to Season {season}</button>
        <span>{arc?.title || 'The Quiet Regular'}</span>
      </div>

      {loading ? <div className="reader-loading">Loading episode…</div> : null}
      {error ? <div className="reader-error"><strong>Episode failed to load</strong><p>{error}</p><button onClick={onBack} type="button">Back to season</button></div> : null}

      {!loading && !error && current ? (
        <>
          <header className="reader-header reader-header--v3">
            <div className="reader-header__copy">
              <div className="reader-meta-chips">
                <span>{arc ? `Arc ${Math.max(1, arcIndex + 1)}` : 'Story'}</span>
                <span>Season {season}</span>
                <span>Episode {episode} / {episodes.length}</span>
                <span className="is-read">✓ Read</span>
              </div>
              <h2>{current.title}</h2>
              <p>{arc?.title || 'The Quiet Regular'}</p>
            </div>
            <div className="reader-header__actions">
              <button className={`bookmark-toggle ${saved ? 'is-saved' : ''}`} onClick={() => bookmark && toggleSaved(bookmark)} type="button">{saved ? '★ Saved' : '☆ Bookmark'}</button>
              {nextUnread ? <button className="next-unread-button" onClick={() => onOpenChapter(nextUnread.season, nextUnread.episode)} type="button"><span>Next unread</span><strong>S{nextUnread.season} · E{nextUnread.episode}</strong></button> : <span className="reader-complete-chip">Story complete</span>}
            </div>

            <div className="reader-progress" aria-label={`Season ${season} progress`}>
              <div className="reader-progress__copy"><span>Season progress</span><strong>{seasonProgress.read} / {seasonProgress.total} opened · {seasonProgress.percent}%</strong></div>
              <div className="reader-progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={seasonProgress.percent} aria-label={`Season ${season} ${seasonProgress.percent}% complete`}><span style={{ width: `${seasonProgress.percent}%` }} /></div>
            </div>
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

          <nav className="reader-nav reader-nav--v3" aria-label="Episode navigation">
            <button disabled={season === 1 && episode === 1} onClick={() => { void goPrevious(); }} type="button"><span>← Previous</span><strong>{previousTitle}</strong><small>{episode > 1 ? `Season ${season} · Episode ${episode - 1}` : season > 1 ? `Season ${season - 1}` : 'Start'}</small></button>
            <button className="reader-nav__archive" onClick={onBack} type="button"><span>Season {season}</span><strong>Back to episodes</strong><small>{seasonProgress.percent}% opened</small></button>
            <button disabled={season === 64 && episode === episodes.length} onClick={goNext} type="button"><span>Next →</span><strong>{nextTitle}</strong><small>{episode < episodes.length ? `Season ${season} · Episode ${episode + 1}` : season < 64 ? `Continue to Season ${season + 1}` : 'Complete'}</small></button>
          </nav>
        </>
      ) : null}
    </section>
  );
}
