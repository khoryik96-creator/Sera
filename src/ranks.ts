import { DB } from './db';
import { getEl } from './dom';

export function renderRanks(q = ''): void {
  const lower = q.toLowerCase();
  getEl('rankList').innerHTML = DB.ranks.filter((r) => r.join(' ').toLowerCase().includes(lower)).map((r) => {
    const n = r[1];
    let key = 'rhen';
    if (n.includes('Kael')) key = 'kael';
    else if (n.includes('Liang')) key = 'liang';
    else if (n.includes('Jin')) key = 'jin';
    else if (n.includes('Lei')) key = 'lei';
    else if (n.includes('Rui')) key = 'rui';
    else if (n.includes('Qin')) key = 'qin';
    else if (n.includes('Sera')) key = 'sera';
    else if (n.includes('Han')) key = 'han';
    else if (n.includes('Arin')) key = 'arin';
    else if (n.includes('Luo')) key = 'luo';
    return `<div class="rank-row"><div><span class="badge">${r[0]}</span></div><div class="character-${key}"><strong>${r[1]}</strong></div><div>${r[3]}</div></div>`;
  }).join('');
}
