import { DB } from './db';
import { renderNovel } from './novel';
import { isBookmarked } from './bookmarks';
import { allSeasonNumbers } from './episodeStructure';
import type { Episode } from './types';

const renderedSeasons = new Set<number>();
let searchActive = false;

/** Escape a string for safe use inside a double-quoted HTML attribute. */
function escAttr(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function seasonListId(season: number): string {
  return season === 1 ? 'episodeList' : `episodeListSeason${season}`;
}

function seasonData(season: number): Episode[] {
  return DB[`season${season}` as `season${number}`] || [];
}

function episodeCards(data: Episode[], season: number, q = ''): string {
  const lower = q.toLowerCase();
  return data
    .filter((x) => JSON.stringify(x).toLowerCase().includes(lower))
    .map((x, i) => {
      const id = `ep-s${season}-e${i + 1}`;
      const marked = isBookmarked(id);
      const title = escAttr(x.title);
      const star = `<button class="ep-bookmark${marked ? ' is-marked' : ''}" data-ep-id="${id}" data-season="${season}" data-ep-title="${title}" aria-label="Bookmark this episode" aria-pressed="${marked}" title="Bookmark this episode">${marked ? '★' : '☆'}</button>`;
      return `<details id="${id}" class="card legend-card" data-season="${season}" data-ep-title="${title}" ${season === 1 && i === 0 && !q ? 'open' : ''}><summary>${star}<span class="badge">${x.ep}</span><span class="badge">SEASON ${season}</span>${season === 1 ? '<span class="badge">LOCKED</span>' : ''}<h3 style="margin:8px 0">${x.title}</h3><div class="muted">Click to read full short-novel episode ▾</div></summary><div class="skill-body"><div class="full-legend-text">${renderNovel(x.text, season)}</div></div></details>`;
    })
    .join('');
}

function renderSeasonCastFor(season: number): void {
  const el = document.getElementById(`seasonCast${season}`);
  if (!el) return;
  const items = DB.seasonCast[String(season)] || [];
  el.innerHTML = items.length
    ? `<h3>New / Important Characters This Season</h3><div class="season-cast-grid">${items.map((x) => `<div class="season-cast-item"><strong>${x.name}</strong><div class="season-cast-role">${x.role}</div><div class="season-cast-desc">${x.description}</div></div>`).join('')}</div>`
    : '';
}

/** Ensure a season exists in the DOM before navigation needs its cards. */
export function ensureSeasonRendered(season: number): void {
  // While global search is active a container may hold filtered cards, so a
  // direct navigator request must be allowed to restore that season unfiltered.
  if (renderedSeasons.has(season) && !searchActive) return;
  const container = document.getElementById(seasonListId(season));
  if (!container) return;
  container.innerHTML = episodeCards(seasonData(season), season);
  renderSeasonCastFor(season);
  renderedSeasons.add(season);
}

function clearRenderedArchive(): void {
  for (const season of allSeasonNumbers()) {
    const container = document.getElementById(seasonListId(season));
    if (container) container.innerHTML = '';
    const cast = document.getElementById(`seasonCast${season}`);
    if (cast) cast.innerHTML = '';
  }
  renderedSeasons.clear();
}

/**
 * Normal browsing renders only opened/current seasons. Search deliberately
 * renders filtered cards across all seasons because the user asked for a
 * global result set; clearing search returns to lazy mode.
 */
export function renderEpisodes(q = ''): void {
  if (q.trim()) {
    searchActive = true;
    for (const season of allSeasonNumbers()) {
      const container = document.getElementById(seasonListId(season));
      if (container) container.innerHTML = episodeCards(seasonData(season), season, q);
      renderSeasonCastFor(season);
    }
    return;
  }

  if (searchActive) {
    searchActive = false;
    clearRenderedArchive();
  }

  ensureSeasonRendered(1);
  document.querySelectorAll<HTMLDetailsElement>('.season-accordion[open]').forEach((details) => {
    const season = Number(details.dataset.season);
    if (Number.isFinite(season)) ensureSeasonRendered(season);
  });
}

/** Attach lazy render hooks after the generated episode shell exists. */
export function mountEpisodeLazyRendering(): void {
  document.querySelectorAll<HTMLDetailsElement>('.season-accordion[data-season]').forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      const season = Number(details.dataset.season);
      if (Number.isFinite(season)) ensureSeasonRendered(season);
    });
  });
  ensureSeasonRendered(1);
}

/** Backwards-compatible helper used by callers/tests that want cast guides. */
export function renderSeasonCast(): void {
  for (const season of renderedSeasons) renderSeasonCastFor(season);
}
