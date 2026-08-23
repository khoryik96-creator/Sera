import { DB } from './db';
import { getEl } from './dom';
import { renderNovel } from './novel';
import type { Episode } from './types';

function episodeCards(data: Episode[], season: number, q = ''): string {
  const lower = q.toLowerCase();
  return data
    .filter((x) => JSON.stringify(x).toLowerCase().includes(lower))
    .map((x, i) => `<details class="card legend-card" ${season === 1 && i === 0 && !q ? 'open' : ''}><summary><span class="badge">${x.ep}</span><span class="badge">SEASON ${season}</span>${season === 1 ? '<span class="badge">LOCKED</span>' : ''}<h3 style="margin:8px 0">${x.title}</h3><div class="muted">Click to read full short-novel episode ▾</div></summary><div class="skill-body"><div class="full-legend-text">${renderNovel(x.text, season)}</div></div></details>`)
    .join('');
}

export function renderEpisodes(q = ''): void {
  getEl('episodeList').innerHTML = episodeCards(DB.season1, 1, q);
  for (let s = 2; s <= 64; s++) {
    getEl(`episodeListSeason${s}`).innerHTML = episodeCards(DB[`season${s}` as `season${number}`], s, q);
  }
}

export function renderSeasonCast(): void {
  for (let season = 4; season <= 64; season++) {
    const el = document.getElementById(`seasonCast${season}`);
    if (!el) continue;
    const items = DB.seasonCast[String(season)] || [];
    el.innerHTML = `<h3>New / Important Characters This Season</h3><div class="season-cast-grid">${items.map((x) => `<div class="season-cast-item"><strong>${x[0]}</strong><div class="season-cast-role">${x[1]}</div><div class="season-cast-desc">${x[2]}</div></div>`).join('')}</div>`;
  }
}
