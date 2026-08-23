import { DB } from './db';
import { getEl } from './dom';
import { renderNovel } from './novel';
import type { Legend } from './types';

export function legendCard(l: Legend): string {
  return `<details class="card legend-card"><summary><span class="badge">${l.rank}</span><span class="badge">${l.kind}</span><h3 style="margin:8px 0">${l.title}</h3><div class="muted">Click to read full legend ▾</div></summary><div class="skill-body"><div class="full-legend-text">${renderNovel(l.text)}</div><div class="callout"><strong>Why it matters:</strong> ${l.significance}</div><div class="full-legend-quote"><strong>Memorable line:</strong> ${l.quote}</div></div></details>`;
}

export function renderLegends(q = ''): void {
  const lower = q.toLowerCase();
  getEl('legendList').innerHTML = DB.legends
    .filter((l) => JSON.stringify(l).toLowerCase().includes(lower))
    .map(legendCard)
    .join('');
}
