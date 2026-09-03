import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { characterRegistry } from '../../../characterRegistry';
import { DB } from '../../../db';
import { EPISODE_ARCS, TOTAL_SEASONS } from '../../../episodeMeta';
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

function chapterId(season: number, episode: number): string {
  return `ep-s${season}-e${episode}`;
}

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
  // Chapters in the same season append below as the reader scrolls, so the whole
  // season reads as one continuous flow. visibleCount is how many are mounted
  // from the entry chapter; activeEpisode is whichever is currently under the
  // reading line (drives the header, bookmarking, notes and read-marking).
  const [visibleCount, setVisibleCount] = useState(1);
  const [activeEpisode, setActiveEpisode] = useState(episode);

  const surfaceRef = useRef<HTMLElement>(null);
  const proseRefs = useRef(new Map<number, HTMLDivElement>());
  const renderedNumbersRef = useRef<number[]>([]);
  const hasMoreRef = useRef(false);

  const startIndex = episode - 1;
  const renderedEpisodes = episodes
    .slice(startIndex, startIndex + visibleCount)
    .map((ep, index) => ({ ep, number: startIndex + index + 1 }));
  renderedNumbersRef.current = renderedEpisodes.map((item) => item.number);
  const hasMoreInSeason = episodes.length > 0 && startIndex + visibleCount < episodes.length;
  hasMoreRef.current = hasMoreInSeason;

  const entryChapterId = chapterId(season, episode);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    setLoreKey(null);
    setSelectedPassage('');
    setPassageNotice('');
    setResumeDismissed(false);
    setResumePosition(getChapterPosition(entryChapterId));
    loadSeason(season).then((rows) => {
      if (!alive) return;
      setEpisodes(rows);
      setLoading(false);
      const current = rows[episode - 1];
      if (current) markRead({ id: entryChapterId, season, title: current.title });
    }).catch((cause: unknown) => {
      if (!alive) return;
      setError(cause instanceof Error ? cause.message : 'Unable to load this chapter.');
      setLoading(false);
    });
    return () => { alive = false; };
  }, [season, episode, entryChapterId]);

  useEffect(() => {
    // A fresh entry chapter always starts at the top and rebuilds the continuous
    // stack from that chapter, so tapping Previous/Next (or a link) drops the
    // reader straight into the new chapter. The resume-position banner still
    // offers a jump back into the entry chapter when a saved position exists.
    proseRefs.current.clear();
    setVisibleCount(1);
    setActiveEpisode(episode);
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

  // Track the chapter under the reading line and persist reading position for it.
  // Kept as one scroll listener that reads the live rendered-chapter list from a
  // ref, so appending chapters never re-subscribes or loses throttle state.
  useEffect(() => {
    if (loading || error || episodes.length === 0) return;
    let frame = 0;
    let pageHiding = false;
    // Append only after the reader has settled at the top of the entry chapter
    // (armed) and then genuinely scrolled down (maxScrollY). Arming resets the
    // downward baseline, so the leftover scroll position from the previous
    // chapter can never eagerly append the next one on navigation.
    let armed = window.scrollY < 60;
    let maxScrollY = 0;
    let activeNum = activeEpisode;
    const persisted = new Map<number, { progress: number; at: number }>();

    const readingLineY = (): number => window.scrollY + Math.min(window.innerHeight * 0.3, 240);

    const pickActive = (): number => {
      const numbers = renderedNumbersRef.current;
      const line = readingLineY();
      let best = numbers[0] ?? episode;
      for (const num of numbers) {
        const el = proseRefs.current.get(num);
        if (!el) continue;
        const top = window.scrollY + el.getBoundingClientRect().top - 120;
        if (top <= line) best = num; else break;
      }
      return best;
    };

    const persist = (num: number, force = false): void => {
      const el = proseRefs.current.get(num);
      if (!el) return;
      const progress = progressInsideProse(el);
      if (progress < 0.02) return;
      const previous = persisted.get(num);
      const now = Date.now();
      if (!force && previous && Math.abs(progress - previous.progress) < 0.005) return;
      if (!force && previous && Math.abs(progress - previous.progress) < 0.015 && now - previous.at < 700) return;
      saveChapterPosition({ id: chapterId(season, num), season, episode: num, progress }, now);
      persisted.set(num, { progress, at: now });
    };

    const update = (): void => {
      frame = 0;
      if (pageHiding) return;
      const num = pickActive();
      if (num !== activeNum) {
        activeNum = num;
        setActiveEpisode(num);
        const ep = episodes[num - 1];
        if (ep) markRead({ id: chapterId(season, num), season, title: ep.title });
      }
      persist(activeNum, false);
      if (armed && maxScrollY > 100 && hasMoreRef.current) {
        const doc = document.documentElement;
        if (window.scrollY + window.innerHeight >= doc.scrollHeight - 600) {
          setVisibleCount((count) => Math.min(count + 1, episodes.length - startIndex));
        }
      }
    };

    const onScroll = (): void => {
      const y = window.scrollY;
      if (y < 60) { armed = true; maxScrollY = y; }
      else if (y > maxScrollY) maxScrollY = y;
      if (!frame && !pageHiding) frame = window.requestAnimationFrame(update);
    };
    const onPageHide = (): void => {
      pageHiding = true;
      persist(activeNum, true);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', onPageHide);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', onPageHide);
      if (frame) window.cancelAnimationFrame(frame);
      persist(activeNum, true);
    };
    // Intentionally excludes activeEpisode/markRead: the listener reads the live
    // chapter list from a ref and re-subscribing on every scroll would thrash.
  }, [loading, error, episodes, season, episode]);

  const current = episodes[activeEpisode - 1] || episodes[episode - 1];
  const bookmark = current ? { id: chapterId(season, activeEpisode), season, title: current.title } : null;
  const saved = bookmark ? bookmarks.some((item) => item.id === bookmark.id) : false;
  const arcIndex = EPISODE_ARCS.findIndex((arc) => arc.seasons.some((entry) => entry.season === season));
  const arc = EPISODE_ARCS[Math.max(0, arcIndex)];
  const loreEntry = loreKey ? characterRegistry.find((entry) => entry.key === loreKey) : undefined;
  const loreProfile = loreKey ? DB.characters[loreKey] : undefined;
  const loreName = loreProfile ? cleanCharacterName(loreProfile.name) : loreEntry?.displayName || '';
  const loreRank = loreName ? rankLabel(loreName, season) : '';
  const loreStatus = loreName ? rankStatus(loreName, season) : 'current';
  const loreStrength = loreProfile?.cultivation?.trim() || 'Not recorded';
  const loreAffiliation = loreProfile?.affiliation?.trim() || 'Not recorded';
  const loreRole = loreProfile?.affiliationRole?.trim() || 'No formal role recorded';
  const showResumePosition = Boolean(resumePosition && resumePosition.progress >= 0.05 && resumePosition.progress <= 0.96 && !resumeDismissed);

  function registerProse(num: number, el: HTMLDivElement | null): void {
    if (el) proseRefs.current.set(num, el);
    else proseRefs.current.delete(num);
  }

  async function goPrevious(): Promise<void> {
    if (activeEpisode > 1) { onOpenChapter(season, activeEpisode - 1); return; }
    if (season <= 1) return;
    const previous = await loadSeason(season - 1);
    onOpenChapter(season - 1, previous.length);
  }

  function goNext(): void {
    if (activeEpisode < episodes.length) { onOpenChapter(season, activeEpisode + 1); return; }
    if (season < TOTAL_SEASONS) onOpenChapter(season + 1, 1);
  }

  function resumeExactPosition(): void {
    const root = proseRefs.current.get(episode);
    if (!resumePosition || !root) return;
    scrollToProseProgress(root, resumePosition.progress);
    setResumeDismissed(true);
  }

  function capturePassageSelection(): void {
    const root = surfaceRef.current;
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
                <span>Chapter {activeEpisode} / {episodes.length}</span>
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
                <div className="reader-lore-context__name"><strong className={`character-${loreEntry.colorKey}`}>{loreName}</strong></div>
                {loreProfile ? (
                  <div className="reader-lore-context__facts" aria-label={`Quick facts for ${loreName}`}>
                    <div className="reader-lore-context__fact"><span>Ranking</span><div>{loreRank ? <RankBadge rank={loreRank} status={loreStatus} /> : <strong>Not ranked</strong>}</div></div>
                    <div className="reader-lore-context__fact"><span>Strength</span><strong>{loreStrength}</strong></div>
                    <div className="reader-lore-context__fact"><span>Affiliation</span><strong>{loreAffiliation}</strong></div>
                    <div className="reader-lore-context__fact"><span>Role</span><strong>{loreRole}</strong></div>
                  </div>
                ) : null}
                <p>{loreProfile?.subtitle || 'Referenced in this chapter. A full profile is not currently part of the main character archive.'}</p>
              </div>
              <div className="reader-lore-context__actions">
                {loreProfile ? <button onClick={openLoreProfile} type="button">Open profile →</button> : null}
                <button className="reader-lore-context__close" onClick={() => setLoreKey(null)} type="button">Close</button>
              </div>
            </aside>
          ) : null}

          <article ref={surfaceRef} className="reader-surface" onClick={handleProseClick} onKeyUp={capturePassageSelection} onMouseUp={capturePassageSelection} onTouchEnd={() => window.setTimeout(capturePassageSelection, 0)} style={surfaceStyle}>
            {renderedEpisodes.map(({ ep, number }, index) => (
              <div className="reader-chapter" data-episode={number} key={number}>
                {index > 0 ? (
                  <div className="reader-chapter__divider">
                    <span>Chapter {number} / {episodes.length}</span>
                    <h3>{ep.title}</h3>
                  </div>
                ) : null}
                <div ref={(el) => registerProse(number, el)} className="reader-prose" dangerouslySetInnerHTML={{ __html: renderNovel(ep.text, season, { interactiveNames: true }) }} />
              </div>
            ))}
          </article>

          <nav className="reader-nav reader-nav--v3" aria-label="Chapter navigation">
            <button disabled={season === 1 && activeEpisode === 1} onClick={() => { void goPrevious(); }} type="button"><span>← Previous</span><strong>{activeEpisode > 1 ? `Ch ${activeEpisode - 1}` : season > 1 ? `S${season - 1} finale` : 'Start'}</strong></button>
            <button className="reader-nav__archive" onClick={onBack} type="button"><span>Season {season}</span><strong>Chapters</strong></button>
            <button disabled={season === TOTAL_SEASONS && activeEpisode === episodes.length} onClick={goNext} type="button"><span>Next →</span><strong>{activeEpisode < episodes.length ? `Ch ${activeEpisode + 1}` : season < TOTAL_SEASONS ? `S${season + 1} · Ch 1` : 'End'}</strong></button>
          </nav>
        </>
      ) : null}
    </section>
  );
}
