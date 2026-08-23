/**
 * Episode navigation for the Episodes tab — a "reader stepper":
 *  - prev / next through seasons, with the current season title opening a
 *    season picker grid;
 *  - an episode number pad for the current season (bookmarked episodes show a ★);
 *  - per-episode bookmarks with a "Resume reading" shortcut and a bookmarks list;
 *  - a floating "Jump" button that brings the stepper back into reach.
 *
 * The episode list is re-rendered on search/tab changes, so all interaction is
 * done via event delegation on stable parents; bookmark star state is baked in
 * at render time (see episodes.ts).
 */

import { getBookmarks, toggleBookmark, setLastRead, getLastRead, isBookmarked } from './bookmarks';
import type { Bookmark } from './bookmarks';

interface SeasonRef {
  season: number;
  containerId: string; // id of the element holding that season's episode cards
}

let seasons: SeasonRef[] = [];
let curSeason = 1;

function el<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/** Discover every season block currently in the DOM. */
function collectSeasons(): SeasonRef[] {
  const out: SeasonRef[] = [];
  document.querySelectorAll<HTMLElement>('#episodes .season-accordion').forEach((acc) => {
    const container = acc.querySelector<HTMLElement>('[id^="episodeList"]');
    if (!container) return;
    const season = container.id === 'episodeList' ? 1 : Number(container.id.replace('episodeListSeason', ''));
    if (!Number.isFinite(season)) return;
    out.push({ season, containerId: container.id });
  });
  return out.sort((a, b) => a.season - b.season);
}

/** Open a <details> element and every ancestor <details> so it becomes visible. */
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

/** The episode cards for a season, in order. */
function seasonCards(season: number): HTMLDetailsElement[] {
  const ref = seasons.find((s) => s.season === season);
  const container = ref ? el(ref.containerId) : null;
  return container ? [...container.querySelectorAll<HTMLDetailsElement>('.legend-card')] : [];
}

function jumpToEpisode(id: string): void {
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

/* ---------- season stepper ---------- */

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
    const title = card.dataset.epTitle || `Episode ${num}`;
    return `<button type="button" class="epnum${marked}" data-target="${card.id}" title="${title.replace(/"/g, '&quot;')}">${num}</button>`;
  }).join('');
}

function setSeason(n: number): void {
  if (!seasons.length) return;
  const min = seasons[0].season;
  const max = seasons[seasons.length - 1].season;
  curSeason = Math.min(Math.max(n, min), max);
  const numEl = el('seasonCurNum');
  if (numEl) numEl.textContent = String(curSeason);
  const prev = el<HTMLButtonElement>('seasonPrev');
  const next = el<HTMLButtonElement>('seasonNext');
  if (prev) prev.disabled = curSeason <= min;
  if (next) next.disabled = curSeason >= max;
  el('seasonPicker')?.querySelectorAll<HTMLElement>('.season-chip').forEach((c) => {
    c.classList.toggle('active', Number(c.dataset.season) === curSeason);
  });
  renderEpisodePad();
}

function toggleSeasonPicker(force?: boolean): void {
  const picker = el('seasonPicker');
  const btn = el('seasonCur');
  if (!picker) return;
  const show = force ?? picker.hidden;
  picker.hidden = !show;
  btn?.setAttribute('aria-expanded', String(show));
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
  renderEpisodePad(); // reflect the ★ on the number pad
  if (!el<HTMLElement>('bookmarksPanel')?.hidden) renderBookmarksPanel();
}

function updateResumeButton(): void {
  const btn = el('resumeReading');
  if (!btn) return;
  const last = getLastRead();
  if (last && document.getElementById(last.id)) {
    btn.hidden = false;
    btn.textContent = `▸ Resume: ${last.title}`;
  } else {
    btn.hidden = true;
  }
}

function renderBookmarksPanel(): void {
  const panel = el('bookmarksPanel');
  if (!panel) return;
  const list = getBookmarks();
  if (list.length === 0) {
    panel.innerHTML = '<p class="muted" style="margin:0">No bookmarks yet. Tap the ☆ on any episode to save it here.</p>';
    return;
  }
  panel.innerHTML = list
    .slice()
    .sort((a, b) => a.season - b.season)
    .map((b) => `<button class="bookmark-item" data-jump="${b.id}"><span class="badge">S${b.season}</span> ${b.title || b.id}</button>`)
    .join('');
}

function toggleBookmarksPanel(): void {
  const panel = el('bookmarksPanel');
  if (!panel) return;
  panel.hidden = !panel.hidden;
  if (!panel.hidden) renderBookmarksPanel();
}

function updateFabVisibility(): void {
  const fab = el('jumpFab');
  if (!fab) return;
  fab.hidden = !!el('episodes')?.classList.contains('hidden');
}

export function initEpisodeNav(): void {
  seasons = collectSeasons();
  buildSeasonPicker();
  setSeason(1);

  el('seasonPrev')?.addEventListener('click', () => setSeason(curSeason - 1));
  el('seasonNext')?.addEventListener('click', () => setSeason(curSeason + 1));
  el('seasonCur')?.addEventListener('click', () => toggleSeasonPicker());

  el('seasonPicker')?.addEventListener('click', (e) => {
    const chip = (e.target as HTMLElement).closest<HTMLElement>('.season-chip');
    if (!chip?.dataset.season) return;
    setSeason(Number(chip.dataset.season));
    toggleSeasonPicker(false);
    // scroll to the chosen season's accordion
    const ref = seasons.find((s) => s.season === curSeason);
    const acc = ref ? el(ref.containerId)?.closest('details') : null;
    if (acc instanceof HTMLDetailsElement) { revealAncestors(acc); scrollToEl(acc); }
  });

  el('episodePad')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('.epnum');
    if (btn?.dataset.target) jumpToEpisode(btn.dataset.target);
  });

  el('resumeReading')?.addEventListener('click', () => {
    const last = getLastRead();
    if (last) jumpToEpisode(last.id);
  });

  el('bookmarksToggle')?.addEventListener('click', toggleBookmarksPanel);

  // Delegated handling inside the (re-rendered) episodes panel.
  el('episodes')?.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const bm = t.closest<HTMLElement>('.ep-bookmark');
    if (bm) {
      e.preventDefault();
      e.stopPropagation();
      handleBookmarkClick(bm);
      return;
    }
    // Remember the last episode the reader opened (for Resume).
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

  // Bookmarks panel: jump when an entry is tapped.
  el('bookmarksPanel')?.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>('[data-jump]');
    if (item?.dataset.jump) jumpToEpisode(item.dataset.jump);
  });

  // Floating button brings the stepper back within reach.
  el('jumpFab')?.addEventListener('click', () => {
    el('episodeJumpBar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Show the floating button only while the Episodes tab is open.
  document.querySelectorAll<HTMLElement>('.tab').forEach((btn) => btn.addEventListener('click', () => {
    setTimeout(updateFabVisibility, 0);
  }));

  updateResumeButton();
  updateFabVisibility();
}
