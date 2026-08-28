import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@19.0.0';
import { DB } from '../../db';
import { navigationItems } from './navigation';
import type { PreviewSection } from './navigation';
import { OverviewPage } from '../features/overview/OverviewPage';
import { CharactersPage } from '../features/characters/CharactersPage';
import { ChaptersPage } from '../features/chapters/ChaptersPage';
import { ReaderPage } from '../features/reader/ReaderPage';
import { RankingsPage } from '../features/rankings/RankingsPage';
import { BookmarksPage } from '../features/bookmarks/BookmarksPage';
import { useReaderState } from '../features/reader/ReaderContext';

interface RouteState {
  section: PreviewSection;
  characterKey: string | null;
  chapter: { season: number; episode: number } | null;
}

const sectionIds = new Set<PreviewSection>(navigationItems.map((item) => item.id));

function readRoute(): RouteState {
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  if (raw.startsWith('chapter/')) {
    const [, seasonRaw, episodeRaw] = raw.split('/');
    const season = Number(seasonRaw);
    const episode = Number(episodeRaw);
    if (Number.isInteger(season) && Number.isInteger(episode) && season >= 1 && season <= 64 && episode >= 1) {
      return { section: 'chapters', characterKey: null, chapter: { season, episode } };
    }
  }
  if (raw.startsWith('characters/')) {
    const key = raw.slice('characters/'.length);
    return { section: 'characters', characterKey: DB.characters[key] ? key : null, chapter: null };
  }
  if (sectionIds.has(raw as PreviewSection)) return { section: raw as PreviewSection, characterKey: null, chapter: null };
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
  const { lastRead } = useReaderState();

  useEffect(() => {
    function applyRoute(): void {
      setRoute(readRoute());
      setSearchOpen(false);
      setSearchQuery('');
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

  function navigate(hash: string): void {
    const next = `#${hash}`;
    if (window.location.hash === next) {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = hash;
  }

  function openSection(section: PreviewSection): void { navigate(section); }
  function openCharacter(key: string): void { navigate(`characters/${key}`); }
  function openChapter(season: number, episode: number): void { navigate(`chapter/${season}/${episode}`); }

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const characters = Object.entries(DB.characters)
      .filter(([, item]) => `${item.name} ${item.subtitle} ${(item.tags || []).join(' ')}`.toLowerCase().includes(q))
      .slice(0, 8)
      .map(([key, item]) => ({ id: `character-${key}`, label: item.name, meta: item.subtitle, kind: 'Character', action: () => openCharacter(key) }));
    const ranks = DB.ranks
      .filter((item) => `${item.rank} ${item.name} ${item.className}`.toLowerCase().includes(q))
      .slice(0, 6)
      .map((item) => ({ id: `rank-${item.rank}-${item.name}`, label: item.name, meta: `${item.rank} · ${item.className}`, kind: 'Ranking', action: () => openSection('rankings') }));
    return [...characters, ...ranks].slice(0, 12);
  }, [searchQuery]);

  let page: unknown;
  if (route.chapter) {
    page = <ReaderPage season={route.chapter.season} episode={route.chapter.episode} onBack={() => openSection('chapters')} onOpenChapter={openChapter} />;
  } else {
    switch (route.section) {
      case 'characters': page = <CharactersPage selectedKey={route.characterKey} onOpenCharacter={openCharacter} />; break;
      case 'chapters': page = <ChaptersPage onOpenChapter={openChapter} />; break;
      case 'bookmarks': page = <BookmarksPage onOpenChapter={openChapter} />; break;
      case 'rankings': page = <RankingsPage />; break;
      case 'overview':
      default: page = <OverviewPage onOpenSection={openSection} onOpenChapter={openChapter} />; break;
    }
  }

  const activeSection = route.chapter ? 'chapters' : route.section;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => openSection('overview')} type="button" aria-label="Quiet Regular overview">
          <div className="brand__mark">QR</div>
          <div><p>Second Spring</p><h1>The Quiet Regular</h1></div>
        </button>
        <nav className="primary-nav" aria-label="Repository sections">
          {navigationItems.map((item, index) => <button className={activeSection === item.id ? 'is-active' : ''} key={item.id} onClick={() => openSection(item.id)} type="button"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong></button>)}
        </nav>
        <div className="sidebar__footer"><span className="status-dot" /><div><strong>React preview</strong><p>Parallel to production</p></div></div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button className="mobile-brand" onClick={() => openSection('overview')} type="button"><div className="brand__mark">QR</div><strong>The Quiet Regular</strong></button>
          <label className="search-box"><span aria-hidden="true">⌕</span><input value={searchQuery} onChange={(event: { target: HTMLInputElement }) => { setSearchQuery(event.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} placeholder="Search characters or ranks…" /><kbd>⌘K</kbd></label>
          {lastRead ? <button className="topbar__continue" onClick={() => openChapter(lastRead.season, episodeNumber(lastRead.id))} type="button">Continue S{lastRead.season} E{episodeNumber(lastRead.id)}</button> : null}
          <span className="topbar__meta">64 seasons · 633 episodes</span>
        </header>

        <nav className="mobile-tabs" aria-label="Mobile repository sections">
          {navigationItems.map((item) => <button className={activeSection === item.id ? 'is-active' : ''} key={item.id} onClick={() => openSection(item.id)} type="button">{item.shortLabel}</button>)}
        </nav>

        <main className="content">
          {searchOpen ? (
            <section>
              <div className="search-page-heading"><div><p className="eyebrow">Global index</p><h2>Search</h2></div><button className="text-button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} type="button">Close</button></div>
              {!searchQuery.trim() ? <div className="empty-state"><div><strong>Search the repository</strong><p>Characters, aliases, titles, and current ranking records are indexed here.</p></div></div> : (
                <div className="search-results">{results.length ? results.map((result) => <button className="search-result" key={result.id} onClick={result.action} type="button"><span><small>{result.kind}</small><strong>{result.label}</strong></span><p>{result.meta}</p><span>→</span></button>) : <div className="empty-state"><div><strong>No matches</strong><p>Try a character name, title, rank, or alias.</p></div></div>}</div>
              )}
            </section>
          ) : page}
        </main>
      </div>
    </div>
  );
}
