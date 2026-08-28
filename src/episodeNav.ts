/**
 * Compact, pinned episode navigator for the Episodes tab. Episode prose is now
 * rendered lazily, so navigation ensures a season is materialized before it
 * queries or scrolls to one of its cards.
 */

import { getBookmarks, toggleBookmark, setLastRead, getLastRead, isBookmarked } from './bookmarks';
import { ensureSeasonRendered } from './episodes';
import type { Bookmark } from './bookmarks';

interface SeasonRef {
  season: number;
  containerId: string;
}

let seasons: SeasonRef[] = [];
let curSeason = 1;

function el<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function collectSeasons(): SeasonRef[] {
  const out: SeasonRef[] = [];
  document.querySelectorAll<HTMLElement>('#episodes .season-accordion').forEach((acc) => {
    const container = acc.querySelector<HTMLElement>('[id^="episodeList"]');
    if (!container) return;
    const season = Number(acc.dataset.season || (container.id === 'episodeList' ? 1 : container.id.replace('episodeListSeason', '')));
    if (!Number.isFinite(season)) return;
    out.push({ season, containerId: container.id });
  });
  return out.sort((a, b) => a.season - b.season);
}

function revealAncestors(node: HTMLElement | null): void {
  let n: HTMLElement | null = node;
  while (n) {
    if (n instanceof HTMLDetailsElement) n.open = true;
    n = n.parentElement;
  }
}

function scrollToEl(node: HTMLElement): void {
  node.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function seasonCards(season: number): HTMLDetailsElement[] {
  ensureSeasonRendered(season);
  const ref = seasons.find((s) => s.season === season);
  const container = ref ? el(ref.containerId) : null;
  return container ? [...container.querySelectorAll<HTMLDetailsElement>('.legend-card')] : [];
}

function seasonFromEpisodeId(id: string): number | null {
  const match = id.match(/^ep-s(\d+)-e\d+$/);
  return match ? Number(match[1]) : null;
}

function jumpToEpisode(id: string): void {
  const requestedSeason = seasonFromEpisodeId(id);
  if (requestedSeason) ensureSeasonRendered(requestedSeason);
  const target = document.getElementById(id);
  if (!target) return;
  revealAncestors(target);
  scrollToEl(target);
  const det = target as HTMLDetailsElement;
  const season = Number(det.dataset.season);
  setLastRead({ id, season, title: det.dataset.epTitle || '' });
  updateResumeButton();
  if (Number.isFinite(season) && season !== curSeason) setSeason(season);
}

/* ---------- pop-panels (one open at a time) ---------- */

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

function openPop(id: string): void {
  for (const popId of Object.keys(POPS)) {
    const open = popId === id;
    const pop = el(popId);
    if (pop) pop.hidden = !open;
    el(POPS[popId])?.setAttribute('aria-expanded', String(open));
  }
  if (id === 'episodePad') renderEpisodePad();
  if (id === 'bookmarksPanel') renderBookmarksPanel();
}

function togglePop(id: string): void {
  const pop = el(id);
  if (pop && !pop.hidden) closePops();
  else openPop(id);
}

/* ---------- season stepper + episode pad ---------- */

function buildSeasonPicker(): void {
  const picker = el('seasonPicker');
  if (!picker) return;
  picker.innerHTML = seasons
    .map((s) => `<button type="button" class="season-chip" data-season="${s.season}">${s.season}</button>`)
    .join('');
}

function renderEpisodePad(): void {
  const pad = el('episodePad');
  if (!pad) return;
  const cards = seasonCards(curSeason);
  pad.innerHTML = cards.map((card) => {
    const m = card.id.match(/-e(\d+)$/);
    const num = m ? m[1] : '';
    const marked = isBookmarked(card.id) ? ' is-marked' : '';
    const title = (card.dataset.epTitle || `Episode ${num}`).replace(/"/g, '&quot;');
    return `<button type="button" class="epnum${marked}" data-target="${card.id}" title="${title}">${num}</button>`;
  }).join('');
}

function setSeason(n: number): void {
  if (!seasons.length) return;
  const min = seasons[0].season;
  const max = seasons[seasons.length - 1].season;
  curSeason = Math.min(Math.max(n, min), max);
  ensureSeasonRendered(curSeason);
  const numEl = el('seasonCurNum');
  if (numEl) numEl.textContent = String(curSeason);
  const label = el('episodeToggleLabel');
  if (label) label.textContent = `${seasonCards(curSeason).length} eps`;
  const prev = el<HTMLButtonElement>('seasonPrev');
  const next = el<HTMLButtonElement>('seasonNext');
  if (prev) prev.disabled = curSeason <= min;
  if (next) next.disabled = curSeason >= max;
  el('seasonPicker')?.querySelectorAll<HTMLElement>('.season-chip').forEach((c) => {
    c.classList.toggle('active', Number(c.dataset.season) === curSeason);
  });
  if (!el('episodePad')?.hidden) renderEpisodePad();
}

/* ---------- bookmarks ---------- */

function handleBookmarkClick(btn: HTMLElement): void {
  const id = btn.dataset.epId;
  if (!id) return;
  const bm: Bookmark = { id, season: Number(btn.dataset.season), title: btn.dataset.epTitle || '' };
  const nowOn = toggleBookmark(bm);
  btn.classList.toggle('is-marked', nowOn);
  btn.setAttribute('aria-pressed', String(nowOn));
  btn.textContent = nowOn ? '★' : '☆';
  if (!el('episodePad')?.hidden) renderEpisodePad();
  if (!el('bookmarksPanel')?.hidden) renderBookmarksPanel();
}

function updateResumeButton(): void {
  const btn = el('resumeReading');
  if (!btn) return;
  const last = getLastRead();
  if (last && seasons.some((season) => season.season === last.season)) {
    btn.hidden = false;
    btn.title = `Resume: ${last.title}`;
  } else {
    btn.hidden = true;
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
  panel.innerHTML = list
    .slice()
    .sort((a, b) => a.season - b.season)
    .map((b) => `<button class="bookmark-item" data-jump="${b.id}"><span class="badge">S${b.season}</span> ${b.title || b.id}</button>`)
    .join('');
}

export function initEpisodeNav(): void {
  seasons = collectSeasons();
  buildSeasonPicker();
  setSeason(1);

  el('seasonPrev')?.addEventListener('click', () => setSeason(curSeason - 1));
  el('seasonNext')?.addEventListener('click', () => setSeason(curSeason + 1));
  el('seasonCur')?.addEventListener('click', () => togglePop('seasonPicker'));
  el('episodeToggle')?.addEventListener('click', () => togglePop('episodePad'));
  el('bookmarksToggle')?.addEventListener('click', () => togglePop('bookmarksPanel'));

  el('seasonPicker')?.addEventListener('click', (e) => {
    const chip = (e.target as HTMLElement).closest<HTMLElement>('.season-chip');
    if (!chip?.dataset.season) return;
    setSeason(Number(chip.dataset.season));
    openPop('episodePad');
  });

  el('episodePad')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('.epnum');
    if (!btn?.dataset.target) return;
    jumpToEpisode(btn.dataset.target);
    closePops();
  });

  el('resumeReading')?.addEventListener('click', () => {
    const last = getLastRead();
    if (last) jumpToEpisode(last.id);
  });

  el('bookmarksPanel')?.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('[data-jump]');
    if (!item?.dataset.jump) return;
    jumpToEpisode(item.dataset.jump);
    closePops();
  });

  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('#episodeJumpBar')) closePops();
  });

  el('episodes')?.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const bm = t.closest<HTMLElement>('.ep-bookmark');
    if (bm) {
      e.preventDefault();
      e.stopPropagation();
      handleBookmarkClick(bm);
      return;
    }
    const summary = t.closest('.legend-card > summary');
    if (summary) {
      const det = summary.parentElement as HTMLDetailsElement;
      setTimeout(() => {
        if (det.open && det.id) {
          setLastRead({ id: det.id, season: Number(det.dataset.season), title: det.dataset.epTitle || '' });
          updateResumeButton();
        }
      }, 0);
    }
  });

  updateResumeButton();
}
