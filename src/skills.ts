import { DB } from './db';
import { getEl } from './dom';
import type { Skill } from './types';

export function skillCard(s: Skill): string {
  const tier = (s.tier || '').toLowerCase();
  const cls = tier.includes('ultimate') ? 'ultimate' : tier.includes('supreme') ? 'supreme' : tier.includes('transcended') ? 'transcended' : '';
  const mark = tier.includes('ultimate') ? 'Ω' : tier.includes('supreme') ? '✦' : tier.includes('transcended') ? '◆' : '';
  return `<details class="card skill ${cls}"><summary><h3>${mark ? `<span class="skill-tier-mark">${mark}</span> ` : ''}${s.name}</h3><span class="badge">${s.category}</span><span class="badge">${s.tier}</span>${s.reveal ? `<span class="badge">${s.reveal}</span>` : ''}<span class="rating">${s.rating || '—'}</span></summary><div class="skill-body"><p><strong>Signature:</strong> <span style="color:var(--gold)">${s.signature || '—'}</span></p><p>${s.short || ''}</p><div class="detail-grid"><div class="detail-block"><h4>Combat Category</h4><p>${s.category}</p></div><div class="detail-block"><h4>Power Tier</h4><p>${s.tier}</p></div>${s.reveal ? `<div class="detail-block"><h4>Novel Reveal</h4><p>${s.reveal}</p></div>` : ''}<div class="detail-block"><h4>Mechanics</h4><p>${s.mechanics || '—'}</p></div><div class="detail-block"><h4>Visual</h4><p>${s.visual || '—'}</p></div><div class="detail-block"><h4>Lore</h4><p>${s.lore || '—'}</p></div></div></div></details>`;
}

export function renderSkills(q = ''): void {
  const lower = q.toLowerCase();
  const arr = DB.rhenSkills.filter((s) => JSON.stringify(s).toLowerCase().includes(lower));
  const tierMark = (s: Skill): string => {
    const tier = (s.tier || '').toLowerCase();
    if (tier.includes('ultimate')) return 'Ω';
    if (tier.includes('supreme')) return '✦';
    if (tier.includes('transcended')) return '◆';
    const i = DB.rhenSkills.indexOf(s);
    return String(i + 1).padStart(2, '0');
  };
  getEl('skillTable').innerHTML = `<thead><tr><th>Tier</th><th>Technique</th><th>Combat Category</th><th>Power Tier</th><th>Novel Reveal</th><th>Signature</th><th>Rating</th></tr></thead><tbody>${arr.map((s) => `<tr><td><span class="badge">${tierMark(s)}</span></td><td><strong>${s.name}</strong></td><td>${s.category}</td><td>${s.tier}</td><td>${s.reveal || '—'}</td><td style="color:var(--gold)">${s.signature || '—'}</td><td class="rating">${s.rating || '—'}</td></tr>`).join('')}</tbody>`;
  getEl('skillList').innerHTML = arr.map(skillCard).join('');
}

export function renderSeraSkills(q = ''): void {
  const lower = q.toLowerCase();
  const arr = DB.seraSkills.filter((s) => JSON.stringify(s).toLowerCase().includes(lower));
  getEl('seraSkillTable').innerHTML = `<thead><tr><th>#</th><th>Technique</th><th>Combat Category</th><th>Power Tier</th><th>Novel Reveal</th><th>Signature</th><th>Rating</th></tr></thead><tbody>${arr.map((s) => { const i = DB.seraSkills.indexOf(s); return `<tr><td><span class="badge">${i === 9 ? 'Ω' : String(i + 1).padStart(2, '0')}</span></td><td><strong>${s.name}</strong></td><td>${s.category}</td><td>${s.tier}</td><td>${s.reveal || '—'}</td><td style="color:var(--gold)">${s.signature}</td><td class="rating">${s.rating}</td></tr>`; }).join('')}</tbody>`;
  getEl('seraSkillList').innerHTML = arr.map(skillCard).join('');
}
