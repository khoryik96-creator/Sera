import { DB } from './db';
import { getEl } from './dom';

export function renderFormer(q = ''): void {
  const lower = q.toLowerCase();
  getEl('formerList').innerHTML = DB.former.filter((x) => JSON.stringify(x).toLowerCase().includes(lower)).map((x) => {
    const ranked = x.rank && !/unranked/i.test(x.rank);
    const rankBadge = ranked ? `<span class="rank-badge rank-badge--former">${x.rank}</span>` : '';
    return `<div class="card"><span class="badge">${x.status}</span><h3>${x.name} ${rankBadge} — ${x.title}</h3><p class="muted">${x.era}</p><p>${x.summary}</p><div class="detail-block"><h4>Connections</h4><p>${x.connections}</p></div><div class="detail-block" style="margin-top:10px"><h4>Fate</h4><p>${x.death}</p></div></div>`;
  }).join('');
}
