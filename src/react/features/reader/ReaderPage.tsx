import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { characterRegistry } from '../../../characterRegistry';
import { DB } from '../../../db';
import { EPISODE_ARCS } from '../../../episodeMeta';
import { loadSeason } from '../../../seasonStore';
import { renderNovel } from '../../../novel';
import { getChapterPosition, saveChapterPosition } from '../../../readerPositions';
import type { ChapterPosition } from '../../../readerPositions';
import type { Episode } from '../../../types';
import { RankBadge } from '../../components/Shared';
import { cleanCharacterName, rankLabel, rankStatus } from '../../shared/rankState';
import '../../styles/contextual-lore.css';
import '../../styles/passages.css';
import '../../styles/reader-v4.css';
import { EpisodeNoteEditor } from './EpisodeNoteEditor';
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
const MAX_SELECTED_PASSAGE = 1600;
const FOCUS_MODE_KEY = 'tqr:reader-focus-mode:v1';

type ReaderSurfaceStyle = CSSProperties & {
  '--reader-scale': number;
  '--reader-line-height': number;
  '--reader-max-width': string;
  '--reader-font-family': string;
};

function clampProgress(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function loadFocusMode(): boolean {
  try {
    return localStorage.getItem(FOCUS_MODE_KEY) === '1';
  } catch {
    return false;
  }
}

function progressInsideProse(root: HTMLElement): number {
  const pageTop = window.scrollY + root.getBoundingClientRect().top;
  const lead = Math.min(window.innerHeight * 0.28, 220);
  const travel = Math.max(1, root.offsetHeight - Math.min(window.innerHeight * 0.42, 340));
  return clampProgress((window.scrollY + lead - pageTop) / travel);
}

function scrollToProseProgress(root: HTMLElement, progress: number): void {
  const pageTop = window.scrollY + root.getBoundingClientRect().top;
  const lead = Math.min(window.innerHeight * 0.28, 220);
  const travel = Math.max(1, root.offsetHeight - Math.min(window.innerHeight * 0.42, 340));
  const top = Math.max(0, pageTop + clampProgress(progress) * travel - lead);
  window.scrollTo({ top, behavior: 'smooth' });
}

export function ReaderPage({ season, episode, onBack, onOpenChapter }: ReaderPageProps) {
  const {
    bookmarks,
    markRead,
    toggleSaved,
    savePassage,
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
  const [loreKey, setLoreKey] = useState<string | null>(null);
  const [selectedPassage, setSelectedPassage] = useState('');
  const [passageNotice, setPassageNotice] = useState('');
  const [resumePosition, setResumePosition] = useState<ChapterPosition | null>(null);
  const [resumeDismissed, setResumeDismissed] = useState(false);
  const [focusMode, setFocusMode] = useState(loadFocusMode);
  const proseRef = useRef<HTMLDivElement>(null);

  const chapterId = `ep-s${season}-e${episode}`;

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    setLoreKey(null);
    setSelectedPassage('');
    setPassageNotice('');
    setResumeDismissed(false);
    setResumePosition(getChapterPosition(chapterId));
    loadSeason(season).then((rows) => {
      if (!alive) return;
      setEpisodes(rows);
      setLoading(false);
      const current = rows[episode - 1];
      if (current) markRead({ id: chapterId, season, title: current.title });
    }).catch((cause: unknown) => {
      if (!alive) return;
      setError(cause instanceof Error ? cause.message : 'Unable to load this chapter.');
      setLoading(false);
    });
    return () => { alive = false; };
  }, [season, episode, chapterId]);

  useEffect(() => {
    // A fresh chapter always starts at the top, so tapping Previous/Next drops the
    // reader straight into the new chapter instead of keeping the old scroll
    // offset. The resume-position banner still offers a jump back when a saved
    // position exists.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [season, episode]);

  useEffect(() => {
    document.body.classList.toggle('reader-focus-mode', focusMode);
    try {
      localStorage.setItem(FOCUS_MODE_KEY, focusMode ? '1' : '0');
    } catch {
      // Focus mode remains usable for this session if storage is blocked.
    }
    return () => document.body.classList.remove('reader-focus-mode');
  }, [focusMode]);

  useEffect(() => {
    if (!focusMode) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setFocusMode(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [focusMode]);

  useEffect(() => {
    if (loading || error || !episodes[episode - 1]) return;
    let frame = 0;
    let pageHiding = false;
    let lastPersisted = getChapterPosition(chapterId)?.progress || 0;
    let lastPersistedAt = 0;

    const readProgress = (): number => {
      const root = proseRef.current;
      return root ? progressInsideProse(root) : 0;
    };

    let latestProgress = readProgress();

    const persistProgress = (progress: number, force = false): void => {
      const now = Date.now();
      if (progress < 0.02) return;
      const delta = Math.abs(progress - lastPersisted);
      // Meaningful jumps should persist immediately. Only tiny scroll churn is
      // throttled; otherwise a fast jump followed by a clamped scroll can leave
      // an older position stored even though the UI already shows the new one.
      if (!force && delta < 0.005) return;
      if (!force && delta < 0.015 && now - lastPersistedAt < 700) return;
      saveChapterPosition({ id: chapterId, season, episode, progress }, now);
      lastPersisted = progress;
      lastPersistedAt = now;
    };

    const update = (): void => {
      frame = 0;
      if (pageHiding) return;
      latestProgress = readProgress();
      persistProgress(latestProgress, false);
    };

    const onScroll = (): void => {
      if (!frame && !pageHiding) frame = window.requestAnimationFrame(update);
    };
    const onPageHide = (): void => {
      pageHiding = true;
      persistProgress(latestProgress, true);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', onPageHide);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', onPageHide);
      if (frame) window.cancelAnimationFrame(frame);
      // Never re-measure during teardown: browser reload/scroll restoration can
      // temporarily move layout and overwrite a stable reading position.
      persistProgress(latestProgress, true);
    };
  }, [chapterId, season, episode, loading, error, episodes]);

  const current = episodes[episode - 1];
  const bookmark = current ? { id: chapterId, season, title: current.title } : null;
  const saved = bookmark ? bookmarks.some((item) => item.id === bookmark.id) : false;
  const arcIndex = EPISODE_ARCS.findIndex((arc) => arc.seasons.some((entry) => entry.season === season));
  const arc = EPISODE_ARCS[Math.max(0, arcIndex)];
  const loreEntry = loreKey ? characterRegistry.find((entry) => entry.key === loreKey) : undefined;
  const loreProfile = loreKey ? DB.characters[loreKey] : undefined;
  const loreName = loreProfile ? cleanCharacterName(loreProfile.name) : loreEntry?.displayName || '';
  const loreRank = loreName ? rankLabel(loreName, season) : '';
  const loreStatus = loreName ? rankStatus(loreName, season) : 'current';
  const showResumePosition = Boolean(resumePosition && resumePosition.progress >= 0.05 && resumePosition.progress <= 0.96 && !resumeDismissed);

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

  function resumeExactPosition(): void {
    if (!resumePosition || !proseRef.current) return;
    scrollToProseProgress(proseRef.current, resumePosition.progress);
    setResumeDismissed(true);
  }

  function capturePassageSelection(): void {
    const root = proseRef.current;
    const selection = window.getSelection();
    if (!root || !selection || selection.isCollapsed || !selection.rangeCount) {
      setSelectedPassage('');
      return;
    }
    const range = selection.getRangeAt(0);
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) {
      setSelectedPassage('');
      return;
    }
    const selected = selection.toString().replace(/\s+/g, ' ').trim().slice(0, MAX_SELECTED_PASSAGE);
    setSelectedPassage(selected.length >= 3 ? selected : '');
    if (selected.length >= 3) setPassageNotice('');
  }

  function saveSelectedPassage(): void {
    if (!bookmark || !selectedPassage) return;
    const persisted = savePassage({ ...bookmark, text: selectedPassage });
    if (persisted) {
      setSelectedPassage('');
      setPassageNotice('✓ Passage saved');
      window.getSelection()?.removeAllRanges();
    } else {
      setPassageNotice('Passage was not saved because browser storage is unavailable.');
    }
    window.setTimeout(() => setPassageNotice(''), 2600);
  }

  function handleProseClick(event: ReactMouseEvent<HTMLElement>): void {
    const target = event.target as HTMLElement;
    const reference = target.closest<HTMLElement>('[data-character-key]');
    const key = reference?.dataset.characterKey;
    if (!key) return;
    // A real character-reference click always opens lore. Passage selection is
    // handled by the mouse/touch selection hooks and must not swallow name taps.
    setLoreKey(key);
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.reader-lore-context')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function openLoreProfile(): void {
    if (!loreEntry || !loreProfile) return;
    window.location.hash = `characters/${loreEntry.key}`;
  }

  const surfaceStyle: ReaderSurfaceStyle = {
    '--reader-scale': scale,
    '--reader-line-height': LINE_HEIGHTS[spacing],
    '--reader-max-width': WIDTHS[width],
    '--reader-font-family': FONT_STACKS[font],
  };

  return (
    <section className="reader-page reader-page--v4">
      <div className="reader-page__topline">
        <button className="text-button" onClick={onBack} type="button">← Back to Season {season}</button>
        <span>{focusMode ? 'Focus reading' : arc?.title || 'The Quiet Regular'}</span>
      </div>

      {loading ? <div className="reader-loading">Loading chapter…</div> : null}
      {error ? <div className="reader-error"><strong>Chapter failed to load</strong><p>{error}</p><button onClick={onBack} type="button">Back to season</button></div> : null}
      {!loading && !error && !current ? <div className="reader-error"><strong>Chapter not found</strong><p>Season {season} does not contain Chapter {episode}.</p><button onClick={onBack} type="button">Back to season</button></div> : null}

      {!loading && !error && current ? (
        <>
          <header className="reader-header reader-header--v3 reader-header--v4">
            <div className="reader-header__copy">
              <div className="reader-meta-chips">
                <span>{arc ? `Arc ${Math.max(1, arcIndex + 1)}` : 'Story'}</span>
                <span>Season {season}</span>
                <span>Chapter {episode} / {episodes.length}</span>
                <span className="is-read">✓ Read</span>
              </div>
              <h2>{current.title}</h2>
              <p>{arc?.title || 'The Quiet Regular'}</p>
            </div>
            <div className="reader-header__actions">
              <button className={`bookmark-toggle ${saved ? 'is-saved' : ''}`} onClick={() => bookmark && toggleSaved(bookmark)} type="button">{saved ? '★ Saved' : '☆ Bookmark'}</button>
              {showResumePosition ? <button className="reader-position-resume" onClick={resumeExactPosition} type="button"><span>Resume position</span><strong>{Math.round((resumePosition?.progress || 0) * 100)}%</strong></button> : null}
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
            <button className={`reader-focus-toggle ${focusMode ? 'is-active' : ''}`} aria-pressed={focusMode} onClick={() => setFocusMode((value) => !value)} type="button">Focus · {focusMode ? 'On' : 'Off'}</button>
            <button className="reader-controls__reset" onClick={resetPreferences} type="button">Reset</button>
            {selectedPassage ? <button className="reader-passage-save" onClick={saveSelectedPassage} type="button">Save passage · {selectedPassage.length} chars</button> : null}
            {passageNotice ? <span className="reader-passage-notice" role="status">{passageNotice}</span> : null}
          </div>

          {bookmark ? <EpisodeNoteEditor episode={bookmark} /> : null}

          {loreEntry ? (
            <aside className="reader-lore-context" aria-label={`Lore reference for ${loreName}`}>
              <div className="reader-lore-context__copy">
                <span>Character reference</span>
                <div><strong className={`character-${loreEntry.colorKey}`}>{loreName}</strong>{loreRank ? <RankBadge rank={loreRank} status={loreStatus} /> : null}</div>
                <p>{loreProfile?.subtitle || 'Referenced in this chapter. A full profile is not currently part of the main character archive.'}</p>
              </div>
              <div className="reader-lore-context__actions">
                {loreProfile ? <button onClick={openLoreProfile} type="button">Open profile →</button> : null}
                <button className="reader-lore-context__close" onClick={() => setLoreKey(null)} type="button">Close</button>
              </div>
            </aside>
          ) : null}

          <article className="reader-surface" onClick={handleProseClick} onKeyUp={capturePassageSelection} onMouseUp={capturePassageSelection} onTouchEnd={() => window.setTimeout(capturePassageSelection, 0)} style={surfaceStyle}>
            <div ref={proseRef} className="reader-prose" dangerouslySetInnerHTML={{ __html: renderNovel(current.text, season, { interactiveNames: true }) }} />
          </article>

          <nav className="reader-nav reader-nav--v3" aria-label="Chapter navigation">
            <button disabled={season === 1 && episode === 1} onClick={() => { void goPrevious(); }} type="button"><span>← Previous</span><strong>{episode > 1 ? `Ch ${episode - 1}` : season > 1 ? `S${season - 1} finale` : 'Start'}</strong></button>
            <button className="reader-nav__archive" onClick={onBack} type="button"><span>Season {season}</span><strong>Chapters</strong></button>
            <button disabled={season === 64 && episode === episodes.length} onClick={goNext} type="button"><span>Next →</span><strong>{episode < episodes.length ? `Ch ${episode + 1}` : season < 64 ? `S${season + 1} · Ch 1` : 'End'}</strong></button>
          </nav>
        </>
      ) : null}
    </section>
  );
}
