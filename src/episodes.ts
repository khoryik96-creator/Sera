import { DB } from './db';
import { renderNovel } from './novel';
import { isBookmarked } from './bookmarks';
import { allSeasonNumbers } from './episodeStructure';
import { loadSeason } from './seasonStore';
import type { Episode } from './types';

const renderedSeasons = new Set<number>();
let searchActive = false;
let searchRun = 0;

function escAttr(value: string): string {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function seasonListId(season: number): string {
  return season === 1 ? 'episodeList' : `episodeListSeason${season}`;
}

function episodeCards(data: Episode[], season: number, query = ''): string {
  const lower = query.toLowerCase();
  return data
    .map((episode, index) => ({ episode, index }))
    .filter(({ episode }) => JSON.stringify(episode).toLowerCase().includes(lower))
    .map(({ episode, index }) => {
      const id = `ep-s${season}-e${index + 1}`;
      const marked = isBookmarked(id);
      const title = escAttr(episode.title);
      const star = `<button class="ep-bookmark${marked ? ' is-marked' : ''}" data-ep-id="${id}" data-season="${season}" data-ep-title="${title}" aria-label="Bookmark this episode" aria-pressed="${marked}" title="Bookmark this episode">${marked ? '★' : '☆'}</button>`;
      return `<details id="${id}" class="card legend-card" data-season="${season}" data-episode="${index + 1}" data-ep-title="${title}" ${season === 1 && index === 0 && !query ? 'open' : ''}><summary>${star}<span class="badge">${episode.ep}</span><span class="badge">SEASON ${season}</span>${season === 1 ? '<span class="badge">LOCKED</span>' : ''}<h3 style="margin:8px 0">${episode.title}</h3><div class="muted">Tap to read full short-novel episode ▾</div></summary><div class="skill-body"><div class="full-legend-text">${renderNovel(episode.text, season)}</div></div></details>`;
    })
    .join('');
}

function renderSeasonCastFor(season: number): void {
  const el = document.getElementById(`seasonCast${season}`);
  if (!el) return;
  const items = DB.seasonCast[String(season)] || [];
  el.innerHTML = items.length
    ? `<h3>New / Important Characters This Season</h3><div class="season-cast-grid">${items.map((item) => `<div class="season-cast-item"><strong>${item.name}</strong><div class="season-cast-role">${item.role}</div><div class="season-cast-desc">${item.description}</div></div>`).join('')}</div>`
    : '';
}

function setSeasonBusy(season: number, busy: boolean, message = ''): void {
  const container = document.getElementById(seasonListId(season));
  if (!container) return;
  container.setAttribute('aria-busy', String(busy));
  if (busy) container.innerHTML = `<div class="season-loading" role="status"><span class="app-spinner" aria-hidden="true"></span>${message || `Loading Season ${season}…`}</div>`;
}

/** Ensure one season payload has been fetched and rendered before navigation uses it. */
export async function ensureSeasonRendered(season: number): Promise<void> {
  if (renderedSeasons.has(season) && !searchActive) return;
  const container = document.getElementById(seasonListId(season));
  if (!container) return;
  setSeasonBusy(season, true);
  try {
    const data = await loadSeason(season);
    container.innerHTML = episodeCards(data, season);
    container.setAttribute('aria-busy', 'false');
    renderSeasonCastFor(season);
    renderedSeasons.add(season);
  } catch (error) {
    container.setAttribute('aria-busy', 'false');
    container.innerHTML = `<div class="card season-load-error" role="alert">Season ${season} could not be loaded. <button type="button" data-retry-season="${season}">Retry</button></div>`;
    console.error(error);
  }
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

function searchStatus(text: string): void {
  const el = document.getElementById('episodeSearchStatus');
  if (el) el.textContent = text;
}

/**
 * Normal reading fetches only the opened/current season. A global search is an
 * explicit request to search the whole archive, so all 64 payloads are fetched
 * then cached for that session. Stale rapid-typing searches are discarded.
 */
export async function renderEpisodes(query = ''): Promise<void> {
  const q = query.trim();
  const run = ++searchRun;
  if (q) {
    searchActive = true;
    const seasons = allSeasonNumbers();
    searchStatus(`Searching all ${seasons.length} seasons…`);
    const results = await Promise.all(seasons.map(async (season) => [season, await loadSeason(season)] as const));
    if (run !== searchRun) return;
    let matches = 0;
    for (const [season, data] of results) {
      const container = document.getElementById(seasonListId(season));
      if (!container) continue;
      const markup = episodeCards(data, season, q);
      container.innerHTML = markup;
      container.setAttribute('aria-busy', 'false');
      matches += container.querySelectorAll('.legend-card').length;
      renderSeasonCastFor(season);
    }
    searchStatus(`${matches} episode${matches === 1 ? '' : 's'} matched “${q}”.`);
    return;
  }

  searchStatus('');
  if (searchActive) {
    searchActive = false;
    clearRenderedArchive();
  }

  await ensureSeasonRendered(1);
  const opened = [...document.querySelectorAll<HTMLDetailsElement>('.season-accordion[open]')];
  await Promise.all(opened.map(async (details) => {
    const season = Number(details.dataset.season);
    if (Number.isFinite(season)) await ensureSeasonRendered(season);
  }));
}

export function mountEpisodeLazyRendering(): void {
  document.querySelectorAll<HTMLDetailsElement>('.season-accordion[data-season]').forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      const season = Number(details.dataset.season);
      if (Number.isFinite(season)) void ensureSeasonRendered(season);
    });
  });

  document.getElementById('episodes')?.addEventListener('click', (event) => {
    const retry = (event.target as HTMLElement).closest<HTMLElement>('[data-retry-season]');
    if (!retry?.dataset.retrySeason) return;
    void ensureSeasonRendered(Number(retry.dataset.retrySeason));
  });
}

export function renderSeasonCast(): void {
  for (const season of renderedSeasons) renderSeasonCastFor(season);
}
