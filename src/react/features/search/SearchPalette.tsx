import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { restoredCanonReferences } from '../../../canonReference';
import { DB } from '../../../db';
import { EPISODE_ARCS } from '../../../episodeMeta';
import { RankBadge } from '../../components/Shared';
import type { AppSection } from '../../app/navigation';
import { cleanCharacterName, parseRankBadge, rankLabel, rankStatus, rankStatusForEntry } from '../../shared/rankState';
import type { RankStatus } from '../../shared/rankState';
import { loadEpisodeSearchIndex } from './searchIndex';
import type { EpisodeSearchRecord } from './searchIndex';

interface SearchPaletteProps {
  open: boolean;
  query: string;
  onClose(): void;
  onOpenSection(section: AppSection): void;
  onOpenCharacter(key: string): void;
  onOpenChapter(season: number, episode: number): void;
}

type SearchGroup = 'Characters' | 'Story arcs & seasons' | 'Episodes' | 'Techniques' | 'Rankings' | 'Legends' | 'Canon';

interface SearchResult {
  id: string;
  group: SearchGroup;
  kind: string;
  label: string;
  meta: string;
  rank?: string;
  status?: RankStatus;
  score: number;
  open(): void;
}

const GROUP_ORDER: SearchGroup[] = ['Characters', 'Story arcs & seasons', 'Episodes', 'Techniques', 'Rankings', 'Legends', 'Canon'];

function normalized(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9#]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreMatch(value: string, query: string): number {
  const haystack = normalized(value);
  const needle = normalized(query);
  if (!needle) return 0;
  if (haystack === needle) return 120;
  if (haystack.startsWith(needle)) return 100;
  if (haystack.split(' ').some((word) => word.startsWith(needle))) return 82;
  if (haystack.includes(needle)) return 68;
  const tokens = needle.split(' ').filter(Boolean);
  if (tokens.length && tokens.every((token) => haystack.includes(token))) return 50 + tokens.length;
  return 0;
}

function clip(value: string | undefined, length = 126): string {
  const clean = (value || '').replace(/\s+/g, ' ').trim();
  return clean.length > length ? `${clean.slice(0, length - 1).trimEnd()}…` : clean;
}

function resultButtons(): HTMLButtonElement[] {
  return Array.from(document.querySelectorAll<HTMLButtonElement>('[data-search-result="true"]'));
}

export function SearchPalette({ open, query, onClose, onOpenSection, onOpenCharacter, onOpenChapter }: SearchPaletteProps) {
  const [episodeIndex, setEpisodeIndex] = useState<EpisodeSearchRecord[]>([]);
  const [episodeLoading, setEpisodeLoading] = useState(false);
  const [episodeError, setEpisodeError] = useState('');
  const needle = query.trim();
  const shouldLoadEpisodeIndex = open && needle.length >= 2;

  useEffect(() => {
    if (!shouldLoadEpisodeIndex || episodeIndex.length) return;
    let alive = true;
    setEpisodeLoading(true);
    setEpisodeError('');
    loadEpisodeSearchIndex().then((rows) => {
      if (!alive) return;
      setEpisodeIndex(rows);
      setEpisodeLoading(false);
    }).catch((cause: unknown) => {
      if (!alive) return;
      setEpisodeError(cause instanceof Error ? cause.message : 'Episode search index failed to load.');
      setEpisodeLoading(false);
    });
    return () => { alive = false; };
  }, [shouldLoadEpisodeIndex, episodeIndex.length]);

  const results = useMemo<SearchResult[]>(() => {
    if (!needle) return [];
    const found: SearchResult[] = [];

    Object.entries(DB.characters).forEach(([key, item]) => {
      const label = cleanCharacterName(item.name);
      const score = scoreMatch(`${label} ${item.subtitle} ${(item.tags || []).join(' ')} ${item.identity || ''} ${item.reputation || ''}`, needle);
      if (!score) return;
      const rank = rankLabel(item.name);
      found.push({ id: `character-${key}`, group: 'Characters', kind: 'Character', label, meta: item.subtitle, rank: rank || undefined, status: rank ? rankStatus(item.name) : undefined, score: score + 8, open: () => onOpenCharacter(key) });
    });

    EPISODE_ARCS.forEach((arc, arcIndex) => {
      const first = arc.seasons[0]?.season || 1;
      const last = arc.seasons[arc.seasons.length - 1]?.season || first;
      const arcScore = scoreMatch(`${arc.title} ${arc.badge} ${arc.description} arc ${arcIndex + 1}`, needle);
      if (arcScore) found.push({ id: `arc-${arcIndex}`, group: 'Story arcs & seasons', kind: `Arc ${String(arcIndex + 1).padStart(2, '0')}`, label: arc.title, meta: `Seasons ${first}–${last} · ${clip(arc.description, 95)}`, score: arcScore + 4, open: () => onOpenChapter(first, 1) });
      arc.seasons.forEach((season) => {
        const seasonScore = scoreMatch(`season ${season.season} s${season.season} ${season.title} ${season.badge} ${arc.title}`, needle);
        if (!seasonScore) return;
        found.push({ id: `season-${season.season}`, group: 'Story arcs & seasons', kind: `Season ${season.season}`, label: season.title, meta: `${arc.title} · ${season.badge}`, score: seasonScore + 5, open: () => onOpenChapter(season.season, 1) });
      });
    });

    episodeIndex.forEach((episode) => {
      const score = scoreMatch(`${episode.title} ${episode.searchText} season ${episode.season} s${episode.season} episode ${episode.episode} e${episode.episode}`, needle);
      if (!score) return;
      found.push({ id: episode.id, group: 'Episodes', kind: `S${episode.season} · E${episode.episode}`, label: episode.title, meta: clip(episode.excerpt), score, open: () => onOpenChapter(episode.season, episode.episode) });
    });

    [...DB.rhenSkills.map((item) => ({ ...item, owner: 'Rhen' })), ...DB.seraSkills.map((item) => ({ ...item, owner: 'Sera' }))].forEach((item) => {
      const searchable = [item.owner, item.name, item.tier, item.category, item.signature, item.rating, item.short, item.mechanics, item.visual, item.lore, item.reveal].filter(Boolean).join(' ');
      const score = scoreMatch(searchable, needle);
      if (!score) return;
      const meta = item.short || item.mechanics || item.lore || item.visual || `${item.tier || 'Technique'} · ${item.category}`;
      found.push({ id: `technique-${item.owner}-${item.name}`, group: 'Techniques', kind: `${item.owner} · ${item.tier || 'Technique'}`, label: item.name, meta: clip(meta), score, open: () => onOpenSection('techniques') });
    });

    DB.ranks.forEach((item) => {
      const score = scoreMatch(`${item.rank} ${item.name} ${item.className} ${item.description}`, needle);
      if (!score) return;
      found.push({ id: `ranking-${item.rank}-${item.name}`, group: 'Rankings', kind: 'Current ranking', label: item.name, meta: item.className, rank: item.rank, status: rankStatusForEntry(item.name, item.rank, item.className), score: score + 4, open: () => onOpenSection('rankings') });
    });

    DB.legends.forEach((item) => {
      const score = scoreMatch(`${item.title} ${item.kind} ${item.text} ${item.significance} ${item.quote}`, needle);
      if (!score) return;
      const parsed = parseRankBadge(item.rank);
      found.push({ id: `legend-${item.rank}-${item.title}`, group: 'Legends', kind: item.kind, label: item.title, meta: clip(item.text), rank: parsed?.rank, status: parsed?.status, score, open: () => onOpenSection('legends') });
    });

    [...restoredCanonReferences, ...(DB.canonRules || [])].forEach((item) => {
      const score = scoreMatch(`${item.title} ${item.text}`, needle);
      if (!score) return;
      found.push({ id: `canon-${item.title}`, group: 'Canon', kind: 'Canon rule', label: item.title, meta: clip(item.text), score, open: () => onOpenSection('canon') });
    });

    return found.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
  }, [episodeIndex, needle, onOpenChapter, onOpenCharacter, onOpenSection]);

  const grouped = useMemo(() => GROUP_ORDER.map((group) => ({ group, items: results.filter((item) => item.group === group).slice(0, group === 'Episodes' ? 8 : 5) })).filter((entry) => entry.items.length), [results]);
  const totalShown = grouped.reduce((sum, entry) => sum + entry.items.length, 0);

  function handleResultKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>): void {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape'].includes(event.key)) return;
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
    const buttons = resultButtons();
    if (!buttons.length) return;
    event.preventDefault();
    const index = buttons.indexOf(event.currentTarget);
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : event.key === 'ArrowDown' ? (index + 1) % buttons.length : (index - 1 + buttons.length) % buttons.length;
    buttons[nextIndex]?.focus();
  }

  if (!open) return null;

  return (
    <div className="search-palette-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section id="searchPalette" className="search-palette" role="dialog" aria-label="Search The Quiet Regular">
        <header className="search-palette__header">
          <div><p className="eyebrow">Global command palette</p><h2>{needle ? `Results for “${needle}”` : 'Search the repository'}</h2><p>{needle ? `${totalShown} best matches shown across ${grouped.length} categor${grouped.length === 1 ? 'y' : 'ies'}.` : 'Characters, story arcs, all 633 episodes, techniques, rankings, legends, and canon share one index.'}</p></div>
          <button className="search-palette__close" onClick={onClose} type="button" aria-label="Close search">Esc</button>
        </header>

        {!needle ? (
          <div className="search-palette__empty">
            <div><span>Try</span><strong>Sera</strong><small>Character, rank history, and related lore</small></div>
            <div><span>Try</span><strong>frozen petals</strong><small>Techniques, legends, and episode mentions</small></div>
            <div><span>Try</span><strong>Season 23</strong><small>Jump directly into a story season</small></div>
            <div><span>Keyboard</span><strong>↑ ↓ · Enter</strong><small>Move through results without leaving the search</small></div>
          </div>
        ) : null}

        {needle && episodeLoading ? <div className="search-index-status" role="status">Loading the 633-episode search index…</div> : null}
        {needle && episodeError ? <div className="search-index-status search-index-status--error">Episode search is temporarily unavailable. Core lore search still works.</div> : null}

        {needle && grouped.length ? (
          <div className="search-palette__groups">
            {grouped.map(({ group, items }) => (
              <section className="search-group" key={group} aria-labelledby={`search-group-${group.replace(/[^a-z]+/gi, '-').toLowerCase()}`}>
                <div className="search-group__heading"><h3 id={`search-group-${group.replace(/[^a-z]+/gi, '-').toLowerCase()}`}>{group}</h3><span>{items.length}</span></div>
                <div className="search-group__results">
                  {items.map((result) => (
                    <button className="search-result search-result-v2" data-search-result="true" key={result.id} onClick={() => { result.open(); onClose(); }} onKeyDown={handleResultKeyDown} type="button">
                      <span className="search-result-v2__kind">{result.kind}</span>
                      <span className="search-result-v2__main"><span className="search-result-v2__title"><strong>{result.label}</strong>{result.rank ? <RankBadge rank={result.rank} status={result.status} /> : null}</span><small>{result.meta}</small></span>
                      <b aria-hidden="true">→</b>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {needle && !episodeLoading && !grouped.length ? <div className="search-palette__no-results"><strong>No matches</strong><p>Try a character name, title, technique, season number, episode phrase, legend, or canon rule.</p></div> : null}
        <footer className="search-palette__footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>Enter</kbd> open</span><span><kbd>Esc</kbd> close</span><span>Episode index loads only when searching</span></footer>
      </section>
    </div>
  );
}
