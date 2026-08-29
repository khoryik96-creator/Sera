import { DB } from './db';
import { getEl } from './dom';

type FormerTone = 'former' | 'retired' | 'deceased';

function formerTone(status: string): FormerTone {
  if (/deceased|dead|killed/i.test(status)) return 'deceased';
  if (/semi[- ]?retired|retired/i.test(status)) return 'retired';
  return 'former';
}

function formerRankLabel(rank: string, tone: FormerTone): string {
  const base = rank.replace(/^Former\s+/i, '').trim();
  if (tone === 'deceased') return `${base} †`;
  if (tone === 'retired') return `${base} · RET`;
  return `${base} · FORMER`;
}

export function renderFormer(q = ''): void {
  const lower = q.toLowerCase();
  getEl('formerList').innerHTML = DB.former.filter((x) => JSON.stringify(x).toLowerCase().includes(lower)).map((x) => {
    const ranked = x.rank && !/unranked/i.test(x.rank);
    const tone = formerTone(x.status);
    const rankBadge = ranked ? `<span class="rank-badge rank-badge--${tone}">${formerRankLabel(x.rank, tone)}</span>` : '';
    return `<div class="card"><span class="badge">${x.status}</span><h3>${x.name} ${rankBadge} — ${x.title}</h3><p class="muted">${x.era}</p><p>${x.summary}</p><div class="detail-block"><h4>Connections</h4><p>${x.connections}</p></div><div class="detail-block" style="margin-top:10px"><h4>Fate</h4><p>${x.death}</p></div></div>`;
  }).join('');
}
