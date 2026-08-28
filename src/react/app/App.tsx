import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { DB } from '../../db';
import { navigationItems } from './navigation';
import type { AppSection } from './navigation';
import { useReaderState } from '../features/reader/ReaderContext';

const OverviewPage = lazy(() => import('../routes/OverviewRoute').then((module) => ({ default: module.OverviewPage })));
const CharactersPage = lazy(() => import('../routes/CharactersRoute').then((module) => ({ default: module.CharactersPage })));
const VillainsPage = lazy(() => import('../routes/VillainsRoute').then((module) => ({ default: module.VillainsPage })));
const TechniquesPage = lazy(() => import('../routes/TechniquesRoute').then((module) => ({ default: module.TechniquesPage })));
const ChaptersPage = lazy(() => import('../routes/ChaptersRoute').then((module) => ({ default: module.ChaptersPage })));
const ReaderPage = lazy(() => import('../routes/ReaderRoute').then((module) => ({ default: module.ReaderPage })));
const RankingsPage = lazy(() => import('../routes/RankingsRoute').then((module) => ({ default: module.RankingsPage })));
const BookmarksPage = lazy(() => import('../routes/BookmarksRoute').then((module) => ({ default: module.BookmarksPage })));
const LegendsPage = lazy(() => import('../routes/LegendsRoute').then((module) => ({ default: module.LegendsPage })));
const FormerPage = lazy(() => import('../routes/FormerRoute').then((module) => ({ default: module.FormerPage })));
const TimelinePage = lazy(() => import('../routes/TimelineRoute').then((module) => ({ default: module.TimelinePage })));
const CanonPage = lazy(() => import('../routes/CanonRoute').then((module) => ({ default: module.CanonPage })));
const SearchPalette = lazy(() => import('../routes/SearchRoute').then((module) => ({ default: module.SearchPalette })));

interface RouteState {
  section: AppSection;
  characterKey: string | null;
  chapter: { season: number; episode: number } | null;
}

const sectionIds = new Set<AppSection>(navigationItems.map((item) => item.id));
const legacySectionAliases: Readonly<Record<string, AppSection>> = {
  others: 'villains',
  skills: 'techniques',
  episodes: 'chapters',
  'sera-timeline': 'timeline',
};

function readChapterRoute(raw: string): RouteState | null {
  if (!raw.startsWith('chapter/') && !raw.startsWith('episodes/')) return null;
  const [, seasonRaw, episodeRaw] = raw.split('/');
  const season = Number(seasonRaw);
  const episode = Number(episodeRaw);
  if (!Number.isInteger(season) || !Number.isInteger(episode) || season < 1 || season > 64 || episode < 1) return null;
  return { section: 'chapters', characterKey: null, chapter: { season, episode } };
}

function readRoute(): RouteState {
  const raw = decodeURIComponent(window.location.hash.replace(/^#\/?/, '')).trim();
  const chapterRoute = readChapterRoute(raw);
  if (chapterRoute) return chapterRoute;

  if (raw.startsWith('characters/')) {
    const key = raw.slice('characters/'.length);
    return { section: 'characters', characterKey: DB.characters[key] ? key : null, chapter: null };
  }

  const section = legacySectionAliases[raw] || raw;
  if (sectionIds.has(section as AppSection)) return { section: section as AppSection, characterKey: null, chapter: null };
  return { section: 'overview', characterKey: null, chapter: null };
}

function episodeNumber(id: string): number {
  const match = id.match(/-e(\d+)$/);
  return match ? Number(match[1]) : 1;
}

function firstSearchResult(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>('[data-search-result="true"]');
}

function RouteFallback(): ReactNode {
  return <div className="route-loading" role="status"><span className="status-dot" /><span>Opening section…</span></div>;
}

export function App() {
  const initial = useMemo(readRoute, []);
  const [route, setRoute] = useState<RouteState>(initial);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileChromeHidden, setMobileChromeHidden] = useState(false);
  const { lastRead } = useReaderState();
  const mobileTabsRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const activeSection: AppSection = route.chapter ? 'chapters' : route.section;
  const reading = Boolean(route.chapter);

  function closeSearch(): void {
    setSearchOpen(false);
    setSearchQuery('');
  }

  useEffect(() => {
    function applyRoute(): void {
      setRoute(readRoute());
      setSearchOpen(false);
      setSearchQuery('');
      setMobileChromeHidden(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    function onKeyDown(event: KeyboardEvent): void {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') closeSearch();
    }
    window.addEventListener('hashchange', applyRoute);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('hashchange', applyRoute);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  }, [searchOpen]);

  useEffect(() => {
    if (window.matchMedia('(min-width: 801px)').matches) return;
    const activeTab = mobileTabsRef.current?.querySelector<HTMLButtonElement>('button.is-active');
    activeTab?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeSection]);

  useEffect(() => {
    if (!reading || window.matchMedia('(min-width: 801px)').matches) {
      setMobileChromeHidden(false);
      return;
    }
    let lastY = window.scrollY;
    let frame = 0;
    const update = (): void => {
      frame = 0;
      const nextY = window.scrollY;
      const delta = nextY - lastY;
      if (nextY < 96) setMobileChromeHidden(false);
      else if (delta > 12) setMobileChromeHidden(true);
      else if (delta < -8) setMobileChromeHidden(false);
      lastY = nextY;
    };
    const onScroll = (): void => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reading]);

  function navigate(hash: string): void {
    const next = `#${hash}`;
    if (window.location.hash === next) {
      setRoute(readRoute());
      closeSearch();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = hash;
  }

  function openSection(section: AppSection): void { navigate(section); }
  function openCharacter(key: string): void { navigate(`characters/${key}`); }
  function openChapter(season: number, episode: number): void { navigate(`chapter/${season}/${episode}`); }

  function handleSearchInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSearch();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      firstSearchResult()?.focus();
      return;
    }
    if (event.key === 'Enter') {
      const first = firstSearchResult();
      if (first) {
        event.preventDefault();
        first.click();
      }
    }
  }

  let page: ReactNode;
  if (route.chapter) {
    page = <ReaderPage season={route.chapter.season} episode={route.chapter.episode} onBack={() => openSection('chapters')} onOpenChapter={openChapter} />;
  } else {
    switch (route.section) {
      case 'characters': page = <CharactersPage selectedKey={route.characterKey} onOpenCharacter={openCharacter} onOpenChapter={openChapter} />; break;
      case 'villains': page = <VillainsPage />; break;
      case 'techniques': page = <TechniquesPage />; break;
      case 'chapters': page = <ChaptersPage onOpenChapter={openChapter} />; break;
      case 'bookmarks': page = <BookmarksPage onOpenChapter={openChapter} />; break;
      case 'rankings': page = <RankingsPage />; break;
      case 'legends': page = <LegendsPage />; break;
      case 'former': page = <FormerPage />; break;
      case 'timeline': page = <TimelinePage />; break;
      case 'canon': page = <CanonPage />; break;
      case 'overview':
      default: page = <OverviewPage onOpenSection={openSection} onOpenChapter={openChapter} onOpenCharacter={openCharacter} />; break;
    }
  }

  const shellClass = ['app-shell', reading ? 'is-reading' : '', mobileChromeHidden ? 'is-mobile-chrome-hidden' : ''].filter(Boolean).join(' ');

  return (
    <div className={shellClass}>
      <aside className="sidebar">
        <button className="brand" onClick={() => openSection('overview')} type="button" aria-label="Quiet Regular overview">
          <div className="brand__mark">QR</div>
          <div><p>Second Spring</p><h1>The Quiet Regular</h1></div>
        </button>
        <nav className="primary-nav" aria-label="Repository sections">
          {navigationItems.map((item, index) => <button aria-current={activeSection === item.id ? 'page' : undefined} className={activeSection === item.id ? 'is-active' : ''} key={item.id} onClick={() => openSection(item.id)} type="button"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong></button>)}
        </nav>
        <div className="sidebar__footer"><span className="status-dot" /><div><strong>Lore repository</strong><p>Production reader</p></div></div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button className="mobile-brand" onClick={() => openSection('overview')} type="button"><div className="brand__mark">QR</div><strong>The Quiet Regular</strong></button>
          <label className={`search-box ${searchOpen ? 'is-open' : ''}`}>
            <span aria-hidden="true">⌕</span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(event: { target: HTMLInputElement }) => { setSearchQuery(event.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleSearchInputKeyDown}
              placeholder="Search characters, episodes, canon…"
              aria-controls="searchPalette"
              aria-haspopup="dialog"
            />
            <kbd>⌘K</kbd>
          </label>
          {lastRead ? <button className="topbar__continue" onClick={() => openChapter(lastRead.season, episodeNumber(lastRead.id))} type="button">Continue S{lastRead.season} E{episodeNumber(lastRead.id)}</button> : null}
          <span className="topbar__meta">64 seasons · 633 episodes</span>
        </header>

        <nav className="mobile-tabs" aria-label="Mobile repository sections" ref={mobileTabsRef}>
          {navigationItems.map((item) => <button aria-current={activeSection === item.id ? 'page' : undefined} className={activeSection === item.id ? 'is-active' : ''} key={item.id} onClick={() => openSection(item.id)} type="button">{item.shortLabel}</button>)}
        </nav>

        <main id="mainContent" className="content" tabIndex={-1}>
          <Suspense fallback={<RouteFallback />}>{page}</Suspense>
        </main>
      </div>

      {searchOpen ? (
        <Suspense fallback={null}>
          <SearchPalette open query={searchQuery} onClose={closeSearch} onOpenSection={openSection} onOpenCharacter={openCharacter} onOpenChapter={openChapter} />
        </Suspense>
      ) : null}
    </div>
  );
}
