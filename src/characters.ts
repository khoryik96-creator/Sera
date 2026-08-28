import { DB, colorKeyMap } from './db';
import { characterImageMap, characterExtraImages } from './images';
import { getEl, escRe } from './dom';
import { renderSeraSkills } from './skills';
import { legendCard } from './legends';
import { portraitGalleryMarkup, handlePortraitGalleryClick } from './portraitGallery';
import type { Character, Legend } from './types';

let currentCharacterKey = 'sera';

export const charOrder = ['rhen', 'kael', 'liang', 'jin', 'lei', 'rui', 'ilyra', 'sera', 'mo', 'arin', 'wen', 'yun', 'qin', 'han'];

function displayRank(c: Character): string {
  const m = String(c.name || '').match(/^(Former\s+)?#\d+/);
  if (m) return m[0].replace('Former ', 'F');
  if ((c.name || '').toLowerCase().includes('rhen')) return 'UNR';
  return '';
}

function rankBadgeMarkup(c: Character): string {
  const label = displayRank(c);
  if (!label) return '';
  const tone = label === 'UNR' ? 'unranked' : c.name.startsWith('Former ') ? 'former' : 'current';
  return `<span class="rank-badge rank-badge--${tone}">${label}</span>`;
}

function displayName(c: Character): string {
  return String(c.name || '').replace(/^(Former\s+)?#\d+\s*[-–—]\s*/, '').trim();
}

function characterInitial(c: Character): string {
  return displayName(c).split(/\s+/).map((x) => x[0]).join('').slice(0, 2).toUpperCase();
}

export function renderCharacterButtons(q = ''): void {
  const lower = q.toLowerCase();
  const rows = charOrder.filter((k) => JSON.stringify(DB.characters[k]).toLowerCase().includes(lower));
  getEl('characterButtons').innerHTML = rows.map((k) => {
    const c = DB.characters[k];
    const color = colorKeyMap[k] || k;
    const active = k === currentCharacterKey ? ' active' : '';
    const img = characterImageMap[k];
    return `<button class="char-nav-item${active}" data-char="${k}">
      <span class="char-avatar">${img ? `<img src="${img}" alt="${c.name}">` : characterInitial(c)}</span>
      <span class="char-nav-copy"><span class="char-nav-name character-${color}">${displayName(c)}</span><span class="char-nav-sub">${c.subtitle}</span></span>
      <span class="char-nav-rank">${rankBadgeMarkup(c)}</span>
    </button>`;
  }).join('');
}

export function renderCharacter(key: string): void {
  const c = DB.characters[key];
  if (!c) return;
  currentCharacterKey = key;
  renderCharacterButtons(getEl<HTMLInputElement>('search').value || '');
  const color = colorKeyMap[key] || key;
  const img = characterImageMap[key];
  const coreFields = ['identity', 'reputation', 'relationship', 'motif'] as const;
  const detailFields = ['appearance', 'personality', 'background', 'legend'] as const;
  const quote = key === 'sera'
    ? 'She was the Pale Orchid the world feared. Yet in Second Spring, she was simply Sera.'
    : key === 'rhen'
      ? 'The world called him the Petals Monarch. He still preferred a quiet table and tea.'
      : (c.legend || c.reputation || c.identity || '').split('.')[0] + '.';
  const extras = characterExtraImages[key] || [];
  const visual = img
    ? portraitGalleryMarkup(c.name, [img, ...extras])
    : `<div class="profile-visual"><div class="profile-placeholder"><div class="sigil character-${color}">${characterInitial(c)}</div></div></div>`;
  const facts: [string, string | undefined][] = [
    ['STATUS', c.subtitle],
    ['IDENTITY', c.identity],
    ['REPUTATION', c.reputation],
    ['RELATIONSHIP', c.relationship],
  ].filter((x) => x[1]) as [string, string | undefined][];
  getEl('charDetail').innerHTML = `
    <div class="profile-hero">
      <div class="profile-copy">
        <div class="profile-overline">CHARACTER PROFILE</div>
        <h2 class="profile-name character-${color}"><span>${displayName(c)}</span>${rankBadgeMarkup(c)}</h2>
        <div class="profile-subtitle">${c.subtitle}</div>
        <div class="profile-tags">${(c.tags || []).map((t) => `<span class="badge">${t}</span>`).join('')}</div>
        <div class="profile-quote">“${quote.replace(/^“|”$/g, '')}”</div>
        <div class="profile-facts">${facts.map(([k, v]) => `<div class="fact-row"><div class="fact-key">${k}</div><div class="fact-value">${v}</div></div>`).join('')}</div>
      </div>
      ${visual}
    </div>
    <div class="profile-summary-grid">
      ${coreFields.map((f) => c[f] ? `<div class="summary-tile"><h4>${f}</h4><p>${c[f]}</p></div>` : '').join('')}
    </div>
    <div class="profile-details">
      <div class="detail-grid">${detailFields.map((f) => c[f] ? `<div class="detail-block"><h4>${f[0].toUpperCase() + f.slice(1)}</h4><p>${c[f]}</p></div>` : '').join('')}</div>
    </div>`;
  const wrap = getEl('topCharacterSkillsWrap');
  const rows = DB.topSkills[key];
  if (rows) {
    wrap.classList.remove('hidden');
    getEl('topSkillTitle').textContent = `${c.name} — Signature Martial Arts`;
    getEl('topSkillTable').innerHTML = `<thead><tr><th>#</th><th>Technique</th><th>Category</th><th>Signature</th><th>Rating</th><th>Description</th></tr></thead><tbody>${rows.map((s, i) => `<tr><td><span class="badge">${i === rows.length - 1 ? 'Ω' : String(i + 1).padStart(2, '0')}</span></td><td><strong>${s.name}</strong></td><td>${s.category}</td><td style="color:var(--gold)">${s.signature}</td><td class="rating">${s.rating}</td><td>${s.description}</td></tr>`).join('')}</tbody>`;
  } else {
    wrap.classList.add('hidden');
    getEl('topSkillTitle').textContent = '';
    getEl('topSkillTable').innerHTML = '';
  }
  const seraWrap = getEl('seraSkillsWrap');
  if (key === 'sera') {
    seraWrap.classList.remove('hidden');
    renderSeraSkills();
  } else {
    seraWrap.classList.add('hidden');
    getEl('seraSkillTable').innerHTML = '';
    getEl('seraSkillList').innerHTML = '';
  }
  renderCharacterLegends(key);
}

const legendLabelMap: Record<string, string> = { rhen: 'Rhen', kael: 'Kael', liang: 'Liang', jin: 'Jin', lei: 'Lei', rui: 'Rui', qin: 'Qin', sera: 'Sera', ilyra: 'Ilyra', mo: 'Mo', yun: 'Yun', han: 'Han', arin: 'Arin', wen: 'Luo' };

/**
 * Legends belonging to a character, matched by the character's label appearing
 * as a whole word in the legend's `rank` field. Whole-word matching avoids
 * substring false positives ("Mo" vs "Amon", "Sera" vs "Ilyra Serath"). A
 * character with no label (or no matching legend) returns an empty list — never
 * every legend.
 */
export function legendsForCharacter(key: string): Legend[] {
  const n = legendLabelMap[key];
  if (!n) return [];
  const re = new RegExp('\\b' + escRe(n) + '\\b', 'i');
  return DB.legends.filter((l) => re.test(l.rank));
}

function renderCharacterLegends(key: string): void {
  const items = legendsForCharacter(key);
  getEl('characterLegendList').innerHTML = items.length ? items.map(legendCard).join('') : '<div class="card muted">No dedicated legend entry yet.</div>';
}

/** Wire up delegated click handlers for character navigation and all galleries. */
export function mountCharacterEvents(): void {
  getEl('characterButtons').addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-char]');
    if (btn?.dataset.char) renderCharacter(btn.dataset.char);
  });
  getEl('charDetail').addEventListener('click', (e) => {
    handlePortraitGalleryClick(e.target as HTMLElement);
  });
}
