/** Compact episode navigator with an in-flow mobile toolbar. */

import { getBookmarks, toggleBookmark, setLastRead, getLastRead, isBookmarked } from './bookmarks';
import { ensureSeasonRendered } from './episodes';
import { mountReaderPreferences } from './readerPreferences';
import type { Bookmark } from './bookmarks';

interface SeasonRef {
  season: number;
  containerId: string;
}

let seasons: SeasonRef[] = [];
let curSeason = 1;
let initialized = false;

function el<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function collectSeasons(): SeasonRef[] {
  const out: SeasonRef[] = [];
  document.querySelectorAll<HTMLElement>('#episodes .season-accordion').forEach((accordion) => {
    const container = accordion.querySelector<HTMLElement>('[id^="episodeList"]');
    if (!container) return;
    const season = Number(accordion.dataset.season || (container.id === 'episodeList' ? 1 : container.id.replace('episodeListSeason', '')));
    if (Number.isFinite(season)) out.push({ season, containerId: container.id });
  });
  return out.sort((a, b) => a.season - b.season);
}

function revealAncestors(node: HTMLElement | null): void {
  let current: HTMLElement | null = node;
  while (current) {
    if (current instanceof HTMLDetailsElement) current.open = true;
    current = current.parentElement;
  }
}

function scrollToEl(node: HTMLElement): void {
  node.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

async function seasonCards(season: number): Promise<HTMLDetailsElement[]> {
  await ensureSeasonRendered(season);
  const ref = seasons.find((item) => item.season === season);
  const container = ref ? el(ref.containerId) : null;
  return container ? [...container.querySelectorAll<HTMLDetailsElement>('.legend-card')] : [];
}

function routeForEpisode(season: number, episode: number): void {
  const url = `${location.pathname}${location.search}#episodes/${season}/${episode}`;
  history.pushState(null, '', url);
}

async function jumpToEpisodeId(id: string, updateRoute = true): Promise<void> {
  const match = id.match(/^ep-s(\d+)-e(\d+)$/);
  if (!match) return;
  const season = Number(match[1]);
  const episode = Number(match[2]);
  await ensureSeasonRendered(season);
  const target = document.getElementById(id);
  if (!target) return;
  revealAncestors(target);
  const details = target as HTMLDetailsElement;
  details.open = true;
  setLastRead({ id, season, title: details.dataset.epTitle || '' });
  updateResumeButton();
  if (season !== curSeason) await setSeason(season);
  if (updateRoute) routeForEpisode(season, episode);
  requestAnimationFrame(() => scrollToEl(target));
}

export async function jumpToEpisodeByNumber(season: number, episode: number, updateRoute = true): Promise<void> {
  if (!Number.isInteger(season) || !Number.isInteger(episode) || season < 1 || episode < 1) return;
  await jumpToEpisodeId(`ep-s${season}-e${episode}`, updateRoute);
}

const POPS: Record<string, string> = {
  seasonPicker: 'seasonCur',
  episodePad: 'episodeToggle',
  bookmarksPanel: 'bookmarksToggle',
};

function closePops(): void {
  for (const popId of Object.keys(POPS)) {
    const pop = el(popId);
    if (pop) pop.hidden = true;
    el(POPS[popId])?.setAttribute('aria-expanded', 'false');
  }
}

async function openPop(id: string): Promise<void> {
  for (const popId of Object.keys(POPS)) {
    const open = popId === id;
    const pop = el(popId);
    if (pop) pop.hidden = !open;
    el(POPS[popId])?.setAttribute('aria-expanded', String(open));
  }
  if (id === 'episodePad') await renderEpisodePad();
  if (id === 'bookmarksPanel') renderBookmarksPanel();
}

function togglePop(id: string): void {
  const pop = el(id);
  if (pop && !pop.hidden) closePops();
  else void openPop(id);
}

function buildSeasonPicker(): void {
  const picker = el('seasonPicker');
  if (!picker) return;
  picker.innerHTML = seasons.map((item) => `<button type="button" class="season-chip" data-season="${item.season}" aria-label="Season ${item.season}">${item.season}</button>`).join('');
}

async function renderEpisodePad(): Promise<void> {
  const pad = el('episodePad');
  if (!pad) return;
  pad.setAttribute('aria-busy', 'true');
  const cards = await seasonCards(curSeason);
  pad.setAttribute('aria-busy', 'false');
  pad.innerHTML = cards.map((card) => {
    const match = card.id.match(/-e(\d+)$/);
    const num = match ? match[1] : '';
    const marked = isBookmarked(card.id) ? ' is-marked' : '';
    const title = (card.dataset.epTitle || `Episode ${num}`).replace(/"/g, '&quot;');
    return `<button type="button" class="epnum${marked}" data-target="${card.id}" title="${title}" aria-label="Episode ${num}: ${title}">${num}</button>`;
  }).join('');
}

async function setSeason(season: number): Promise<void> {
  if (!seasons.length) return;
  const min = seasons[0].season;
  const max = seasons[seasons.length - 1].season;
  curSeason = Math.min(Math.max(season, min), max);
  const label = el('episodeToggleLabel');
  if (label) label.textContent = 'Loading…';
  const cards = await seasonCards(curSeason);
  const numEl = el('seasonCurNum');
  if (numEl) numEl.textContent = String(curSeason);
  if (label) label.textContent = `${cards.length} eps`;
  const prev = el<HTMLButtonElement>('seasonPrev');
  const next = el<HTMLButtonElement>('seasonNext');
  if (prev) prev.disabled = curSeason <= min;
  if (next) next.disabled = curSeason >= max;
  el('seasonPicker')?.querySelectorAll<HTMLElement>('.season-chip').forEach((chip) => {
    chip.classList.toggle('active', Number(chip.dataset.season) === curSeason);
    chip.setAttribute('aria-current', Number(chip.dataset.season) === curSeason ? 'true' : 'false');
  });
  if (!el('episodePad')?.hidden) await renderEpisodePad();
}

function handleBookmarkClick(button: HTMLElement): void {
  const id = button.dataset.epId;
  if (!id) return;
  const bookmark: Bookmark = { id, season: Number(button.dataset.season), title: button.dataset.epTitle || '' };
  const nowOn = toggleBookmark(bookmark);
  button.classList.toggle('is-marked', nowOn);
  button.setAttribute('aria-pressed', String(nowOn));
  button.textContent = nowOn ? '★' : '☆';
  if (!el('episodePad')?.hidden) void renderEpisodePad();
  if (!el('bookmarksPanel')?.hidden) renderBookmarksPanel();
}

function updateResumeButton(): void {
  const button = el('resumeReading');
  if (!button) return;
  const last = getLastRead();
  if (last && seasons.some((season) => season.season === last.season)) {
    button.hidden = false;
    button.title = `Resume: ${last.title}`;
  } else {
    button.hidden = true;
  }
}

function renderBookmarksPanel(): void {
  const panel = el('bookmarksPanel');
  if (!panel) return;
  const list = getBookmarks();
  if (list.length === 0) {
    panel.innerHTML = '<p class="muted" style="margin:0;padding:4px 2px">No bookmarks yet. Tap the ☆ on any episode to save it here.</p>';
    return;
  }
  panel.innerHTML = list.slice().sort((a, b) => a.season - b.season).map((bookmark) => `<button class="bookmark-item" data-jump="${bookmark.id}"><span class="badge">S${bookmark.season}</span> ${bookmark.title || bookmark.id}</button>`).join('');
}

export async function initEpisodeNav(): Promise<void> {
  if (initialized) return;
  initialized = true;
  seasons = collectSeasons();
  buildSeasonPicker();
  mountReaderPreferences();
  await setSeason(1);

  el('seasonPrev')?.addEventListener('click', () => { void setSeason(curSeason - 1); });
  el('seasonNext')?.addEventListener('click', () => { void setSeason(curSeason + 1); });
  el('seasonCur')?.addEventListener('click', () => togglePop('seasonPicker'));
  el('episodeToggle')?.addEventListener('click', () => togglePop('episodePad'));
  el('bookmarksToggle')?.addEventListener('click', () => togglePop('bookmarksPanel'));

  el('seasonPicker')?.addEventListener('click', (event) => {
    const chip = (event.target as HTMLElement).closest<HTMLElement>('.season-chip');
    if (!chip?.dataset.season) return;
    void (async () => {
      await setSeason(Number(chip.dataset.season));
      await openPop('episodePad');
    })();
  });

  el('episodePad')?.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>('.epnum');
    if (!button?.dataset.target) return;
    void jumpToEpisodeId(button.dataset.target);
    closePops();
  });

  el('resumeReading')?.addEventListener('click', () => {
    const last = getLastRead();
    if (last) void jumpToEpisodeId(last.id);
  });

  el('bookmarksPanel')?.addEventListener('click', (event) => {
    const item = (event.target as HTMLElement).closest<HTMLElement>('[data-jump]');
    if (!item?.dataset.jump) return;
    void jumpToEpisodeId(item.dataset.jump);
    closePops();
  });

  document.addEventListener('click', (event) => {
    if (!(event.target as HTMLElement).closest('#episodeJumpBar')) closePops();
  });

  el('episodeJumpBar')?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      void setSeason(curSeason - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      void setSeason(curSeason + 1);
    } else if (event.key === 'Escape') {
      closePops();
    }
  });

  el('episodes')?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const bookmark = target.closest<HTMLElement>('.ep-bookmark');
    if (bookmark) {
      event.preventDefault();
      event.stopPropagation();
      handleBookmarkClick(bookmark);
      return;
    }
    const summary = target.closest('.legend-card > summary');
    if (summary) {
      const details = summary.parentElement as HTMLDetailsElement;
      setTimeout(() => {
        if (details.open && details.id) {
          const season = Number(details.dataset.season);
          const episode = Number(details.dataset.episode);
          setLastRead({ id: details.id, season, title: details.dataset.epTitle || '' });
          updateResumeButton();
          if (Number.isFinite(season) && Number.isFinite(episode)) routeForEpisode(season, episode);
        }
      }, 0);
    }
  });

  updateResumeButton();
}
