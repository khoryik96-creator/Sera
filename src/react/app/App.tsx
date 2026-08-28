import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DB } from '../../db';
import { navigationItems } from './navigation';
import type { AppSection } from './navigation';
import { OverviewPage } from '../features/overview/OverviewPage';
import { CharactersPage } from '../features/characters/CharactersPage';
import { VillainsPage } from '../features/villains/VillainsPage';
import { TechniquesPage } from '../features/techniques/TechniquesPage';
import { ChaptersPage } from '../features/chapters/ChaptersPage';
import { ReaderPage } from '../features/reader/ReaderPage';
import { RankingsPage } from '../features/rankings/RankingsPage';
import { BookmarksPage } from '../features/bookmarks/BookmarksPage';
import { LegendsPage } from '../features/legends/LegendsPage';
import { FormerPage } from '../features/former/FormerPage';
import { TimelinePage } from '../features/timeline/TimelinePage';
import { CanonPage } from '../features/canon/CanonPage';
import { useReaderState } from '../features/reader/ReaderContext';
import { RankBadge } from '../components/Shared';
import { cleanCharacterName, parseRankBadge, rankLabel, rankStatus, rankStatusForEntry } from '../shared/rankState';
import type { RankStatus } from '../shared/rankState';

interface RouteState {
  section: AppSection;
  characterKey: string | null;
  chapter: { season: number; episode: number } | null;
}

interface SearchResult {
  id: string;
  label: string;
  meta: string;
  kind: string;
  rank?: string;
  rankStatus?: RankStatus;
  section?: AppSection;
  characterKey?: string;
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

export function App() {
  const initial = useMemo(readRoute, []);
  const [route, setRoute] = useState<RouteState>(initial);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileChromeHidden, setMobileChromeHidden] = useState(false);
  const { lastRead } = useReaderState();
  const mobileTabsRef = useRef<HTMLElement>(null);
  const activeSection: AppSection = route.chapter ? 'chapters' : route.section;
  const reading = Boolean(route.chapter);

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
      if (event.key === 'Escape') setSearchOpen(false);
    }
    window.addEventListener('hashchange', applyRoute);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('hashchange', applyRoute);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

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
      setSearchOpen(false);
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = hash;
  }

  function openSection(section: AppSection): void { navigate(section); }
  function openCharacter(key: string): void { navigate(`characters/${key}`); }
  function openChapter(season: number, episode: number): void { navigate(`chapter/${season}/${episode}`); }

  const results = useMemo<SearchResult[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const characters: SearchResult[] = Object.entries(DB.characters)
      .filter(([, item]) => `${item.name} ${item.subtitle} ${(item.tags || []).join(' ')}`.toLowerCase().includes(q))
      .slice(0, 6)
      .map(([key, item]) => {
        const rank = rankLabel(item.name);
        return { id: `character-${key}`, label: cleanCharacterName(item.name), meta: item.subtitle, kind: 'Character', characterKey: key, rank: rank || undefined, rankStatus: rank ? rankStatus(item.name) : undefined };
      });
    const ranks: SearchResult[] = DB.ranks
      .filter((item) => `${item.rank} ${item.name} ${item.className}`.toLowerCase().includes(q))
      .slice(0, 4)
      .map((item) => ({ id: `rank-${item.rank}-${item.name}`, label: item.name, meta: item.className, kind: 'Ranking', section: 'rankings', rank: item.rank, rankStatus: rankStatusForEntry(item.name, item.rank, item.className) }));
    const arts: SearchResult[] = [...DB.rhenSkills, ...DB.seraSkills]
      .filter((item) => JSON.stringify(item).toLowerCase().includes(q))
      .slice(0, 4)
      .map((item) => ({ id: `art-${item.name}`, label: item.name, meta: `${item.tier || 'Technique'} · ${item.category}`, kind: 'Technique', section: 'techniques' }));
    const legends: SearchResult[] = DB.legends
      .filter((item) => JSON.stringify(item).toLowerCase().includes(q))
      .slice(0, 3)
      .map((item) => {
        const parsed = parseRankBadge(item.rank);
        return { id: `legend-${item.title}`, label: item.title, meta: item.kind, kind: 'Legend', section: 'legends', rank: parsed?.rank, rankStatus: parsed?.status };
      });
    const canon: SearchResult[] = (DB.canonRules || [])
      .filter((item) => JSON.stringify(item).toLowerCase().includes(q))
      .slice(0, 3)
      .map((item) => ({ id: `canon-${item.title}`, label: item.title, meta: 'Canon rule', kind: 'Canon', section: 'canon' }));
    return [...characters, ...ranks, ...arts, ...legends, ...canon].slice(0, 14);
  }, [searchQuery]);

  function openSearchResult(result: SearchResult): void {
    if (result.characterKey) openCharacter(result.characterKey);
    else if (result.section) openSection(result.section);
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
          <label className="search-box"><span aria-hidden="true">⌕</span><input value={searchQuery} onChange={(event: { target: HTMLInputElement }) => { setSearchQuery(event.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} placeholder="Search the repository…" /><kbd>⌘K</kbd></label>
          {lastRead ? <button className="topbar__continue" onClick={() => openChapter(lastRead.season, episodeNumber(lastRead.id))} type="button">Continue S{lastRead.season} E{episodeNumber(lastRead.id)}</button> : null}
          <span className="topbar__meta">64 seasons · 633 episodes</span>
        </header>

        <nav className="mobile-tabs" aria-label="Mobile repository sections" ref={mobileTabsRef}>
          {navigationItems.map((item) => <button aria-current={activeSection === item.id ? 'page' : undefined} className={activeSection === item.id ? 'is-active' : ''} key={item.id} onClick={() => openSection(item.id)} type="button">{item.shortLabel}</button>)}
        </nav>

        <main id="mainContent" className="content" tabIndex={-1}>
          {searchOpen ? (
            <section>
              <div className="search-page-heading"><div><p className="eyebrow">Global index</p><h2>Search</h2></div><button className="text-button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} type="button">Close</button></div>
              {!searchQuery.trim() ? <div className="empty-state"><div><strong>Search the repository</strong><p>Characters, ranks, techniques, legends, and canon rules are indexed here.</p></div></div> : (
                <div className="search-results">{results.length ? results.map((result) => <button className="search-result" key={result.id} onClick={() => openSearchResult(result)} type="button"><span><small>{result.kind}</small><span className="search-result__title"><strong>{result.label}</strong>{result.rank ? <RankBadge rank={result.rank} status={result.rankStatus} /> : null}</span></span><p>{result.meta}</p><span>→</span></button>) : <div className="empty-state"><div><strong>No matches</strong><p>Try a character, title, technique, rank, legend, or canon phrase.</p></div></div>}</div>
              )}
            </section>
          ) : page}
        </main>
      </div>
    </div>
  );
}
