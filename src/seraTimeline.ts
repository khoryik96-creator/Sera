import { DB } from './db';
import { getEl } from './dom';
import { renderNovel } from './novel';

export function renderSeraTimeline(q = ''): void {
  const lower = q.toLowerCase();
  getEl('seraTimelineList').innerHTML = DB.seraTimeline
    .filter((x) => JSON.stringify(x).toLowerCase().includes(lower))
    .map((x) => `<details class="card legend-card"><summary><span class="badge">${x.age}</span><span class="badge">${x.phase}</span><h3 style="margin:8px 0">${x.title}</h3><div class="muted">Click to expand full chronology ▾</div></summary><div class="skill-body"><div class="full-legend-text">${renderNovel(x.text)}</div></div></details>`)
    .join('');
}
