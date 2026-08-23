/**
 * Mobile-friendly episode navigation for the Episodes tab:
 *  - a sticky jump bar with Season + Episode dropdowns that open and scroll to
 *    the chosen place (opening the enclosing arc/season accordions on the way);
 *  - per-episode bookmarks with a "Resume reading" shortcut and a bookmarks list;
 *  - a floating "Jump" button that brings the jump bar back into reach while
 *    reading.
 *
 * The episode list is re-rendered on search/tab changes, so all interaction is
 * done via event delegation on stable parents; bookmark star state is baked in
 * at render time (see episodes.ts).
 */

import { getBookmarks, toggleBookmark, setLastRead, getLastRead } from './bookmarks';
import type { Bookmark } from './bookmarks';

interface SeasonRef {
  season: number;
  title: string;
  containerId: string; // id of the element holding that season's episode cards
}

let seasons: SeasonRef[] = [];

function el<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/** Discover every season block currently in the DOM (id + human title). */
function collectSeasons(): SeasonRef[] {
  const out: SeasonRef[] = [];
  document.querySelectorAll<HTMLElement>('#episodes .season-accordion').forEach((acc) => {
    const container = acc.querySelector<HTMLElement>('[id^="episodeList"]');
    if (!container) return;
    const season = container.id === 'episodeList' ? 1 : Number(container.id.replace('episodeListSeason', ''));
    if (!Number.isFinite(season)) return;
    const title = acc.querySelector('h2')?.textContent?.trim() || `Season ${season}`;
    out.push({ season, title, containerId: container.id });
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
  // scroll-margin-top (set in CSS) keeps the target clear of the sticky toolbar.
  node.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function jumpToSeason(season: number): void {
  const ref = seasons.find((s) => s.season === season);
  if (!ref) return;
  const container = el(ref.containerId);
  const acc = container?.closest('details');
  if (acc instanceof HTMLDetailsElement) {
    revealAncestors(acc);
    scrollToEl(acc);
  }
}

function jumpToEpisode(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  revealAncestors(target);
  scrollToEl(target);
  const det = target as HTMLDetailsElement;
  setLastRead({ id, season: Number(det.dataset.season), title: det.dataset.epTitle || '' });
  updateResumeButton();
}

function populateSeasonSelect(): void {
  const sel = el<HTMLSelectElement>('seasonJump');
  if (!sel) return;
  sel.innerHTML = '<option value="">Choose a season…</option>' +
    seasons.map((s) => `<option value="${s.season}">${s.title}</option>`).join('');
}

function populateEpisodeSelect(season: number): void {
  const sel = el<HTMLSelectElement>('episodeJump');
  if (!sel) return;
  const ref = seasons.find((s) => s.season === season);
  const container = ref ? el(ref.containerId) : null;
  if (!container) {
    sel.innerHTML = '<option value="">—</option>';
    return;
  }
  const cards = container.querySelectorAll<HTMLDetailsElement>('.legend-card');
  const opts = ['<option value="">Choose an episode…</option>'];
  cards.forEach((card) => {
    const title = card.dataset.epTitle || card.querySelector('h3')?.textContent?.trim() || card.id;
    opts.push(`<option value="${card.id}">${title}</option>`);
  });
  sel.innerHTML = opts.join('');
}

function handleBookmarkClick(btn: HTMLElement): void {
  const id = btn.dataset.epId;
  if (!id) return;
  const bm: Bookmark = { id, season: Number(btn.dataset.season), title: btn.dataset.epTitle || '' };
  const nowOn = toggleBookmark(bm);
  btn.classList.toggle('is-marked', nowOn);
  btn.setAttribute('aria-pressed', String(nowOn));
  btn.textContent = nowOn ? '★' : '☆';
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
  const episodesVisible = !el('episodes')?.classList.contains('hidden');
  fab.hidden = !episodesVisible;
}

export function initEpisodeNav(): void {
  seasons = collectSeasons();
  populateSeasonSelect();

  const seasonSel = el<HTMLSelectElement>('seasonJump');
  seasonSel?.addEventListener('change', () => {
    const v = Number(seasonSel.value);
    if (!v) return;
    populateEpisodeSelect(v);
    jumpToSeason(v);
  });

  const epSel = el<HTMLSelectElement>('episodeJump');
  epSel?.addEventListener('change', () => {
    if (epSel.value) jumpToEpisode(epSel.value);
  });

  el('resumeReading')?.addEventListener('click', () => {
    const last = getLastRead();
    if (last) jumpToEpisode(last.id);
  });

  el('bookmarksToggle')?.addEventListener('click', toggleBookmarksPanel);

  // Delegated handling inside the (re-rendered) episodes panel.
  const episodes = el('episodes');
  episodes?.addEventListener('click', (e) => {
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

  // Floating button brings the jump bar back within reach.
  el('jumpFab')?.addEventListener('click', () => {
    el('episodeJumpBar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Show the floating button only while the Episodes tab is open.
  document.querySelectorAll<HTMLElement>('.tab').forEach((btn) => btn.addEventListener('click', () => {
    // Defer so the panel's hidden class is updated first.
    setTimeout(updateFabVisibility, 0);
  }));

  updateResumeButton();
  updateFabVisibility();
}
