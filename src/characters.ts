import { DB, colorKeyMap } from './db';
import { characterImageMap, characterExtraImages } from './images';
import { getEl, escRe } from './dom';
import { renderSeraSkills } from './skills';
import { legendCard } from './legends';
import { portraitGalleryMarkup, handlePortraitGalleryClick, handlePortraitGalleryKeydown } from './portraitGallery';
import type { Character, Legend } from './types';

let currentCharacterKey = 'sera';

export const charOrder = ['rhen', 'kael', 'liang', 'jin', 'lei', 'rui', 'ilyra', 'sera', 'mo', 'arin', 'wen', 'yun', 'qin', 'han'];

function displayRank(c: Character): string {
  const match = String(c.name || '').match(/^(Former\s+)?#\d+/);
  if (match) return match[0].replace('Former ', 'F');
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
  return displayName(c).split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

export function renderCharacterButtons(query = ''): void {
  const lower = query.toLowerCase();
  const rows = charOrder.filter((key) => JSON.stringify(DB.characters[key]).toLowerCase().includes(lower));
  getEl('characterButtons').innerHTML = rows.map((key) => {
    const character = DB.characters[key];
    const color = colorKeyMap[key] || key;
    const active = key === currentCharacterKey ? ' active' : '';
    const image = characterImageMap[key];
    return `<button class="char-nav-item${active}" data-char="${key}" aria-current="${key === currentCharacterKey ? 'true' : 'false'}">
      <span class="char-avatar">${image ? `<img src="${image}" alt="${character.name}">` : characterInitial(character)}</span>
      <span class="char-nav-copy"><span class="char-nav-name character-${color}">${displayName(character)}</span><span class="char-nav-sub">${character.subtitle}</span></span>
      <span class="char-nav-rank">${rankBadgeMarkup(character)}</span>
    </button>`;
  }).join('');
}

export function renderCharacter(key: string): void {
  const character = DB.characters[key];
  if (!character) return;
  currentCharacterKey = key;
  renderCharacterButtons(getEl<HTMLInputElement>('search').value || '');
  const color = colorKeyMap[key] || key;
  const image = characterImageMap[key];
  const coreFields = ['identity', 'reputation', 'relationship', 'motif'] as const;
  const detailFields = ['appearance', 'personality', 'background', 'legend'] as const;
  const quote = key === 'sera'
    ? 'She was the Pale Orchid the world feared. Yet in Second Spring, she was simply Sera.'
    : key === 'rhen'
      ? 'The world called him the Petals Monarch. He still preferred a quiet table and tea.'
      : (character.legend || character.reputation || character.identity || '').split('.')[0] + '.';
  const extras = characterExtraImages[key] || [];
  const visual = image
    ? portraitGalleryMarkup(character.name, [image, ...extras])
    : `<div class="profile-visual"><div class="profile-placeholder"><div class="sigil character-${color}">${characterInitial(character)}</div></div></div>`;
  const facts: [string, string | undefined][] = [
    ['STATUS', character.subtitle],
    ['IDENTITY', character.identity],
    ['REPUTATION', character.reputation],
    ['RELATIONSHIP', character.relationship],
  ].filter((item) => item[1]) as [string, string | undefined][];

  getEl('charDetail').innerHTML = `
    <div class="profile-hero">
      <div class="profile-copy">
        <div class="profile-overline">CHARACTER PROFILE</div>
        <h2 class="profile-name character-${color}"><span>${displayName(character)}</span>${rankBadgeMarkup(character)}</h2>
        <div class="profile-subtitle">${character.subtitle}</div>
        <div class="profile-tags">${(character.tags || []).map((tag) => `<span class="badge">${tag}</span>`).join('')}</div>
        <div class="profile-quote">“${quote.replace(/^“|”$/g, '')}”</div>
        <div class="profile-facts">${facts.map(([name, value]) => `<div class="fact-row"><div class="fact-key">${name}</div><div class="fact-value">${value}</div></div>`).join('')}</div>
      </div>
      ${visual}
    </div>
    <div class="profile-summary-grid">
      ${coreFields.map((field) => character[field] ? `<div class="summary-tile"><h4>${field}</h4><p>${character[field]}</p></div>` : '').join('')}
    </div>
    <div class="profile-details">
      <div class="detail-grid">${detailFields.map((field) => character[field] ? `<div class="detail-block"><h4>${field[0].toUpperCase() + field.slice(1)}</h4><p>${character[field]}</p></div>` : '').join('')}</div>
    </div>`;

  const wrap = getEl('topCharacterSkillsWrap');
  const rows = DB.topSkills[key];
  if (rows) {
    wrap.classList.remove('hidden');
    getEl('topSkillTitle').textContent = `${character.name} — Signature Martial Arts`;
    getEl('topSkillTable').innerHTML = `<thead><tr><th>#</th><th>Technique</th><th>Category</th><th>Signature</th><th>Rating</th><th>Description</th></tr></thead><tbody>${rows.map((skill, index) => `<tr><td><span class="badge">${index === rows.length - 1 ? 'Ω' : String(index + 1).padStart(2, '0')}</span></td><td><strong>${skill.name}</strong></td><td>${skill.category}</td><td style="color:var(--gold)">${skill.signature}</td><td class="rating">${skill.rating}</td><td>${skill.description}</td></tr>`).join('')}</tbody>`;
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

export function legendsForCharacter(key: string): Legend[] {
  const name = legendLabelMap[key];
  if (!name) return [];
  const re = new RegExp('\\b' + escRe(name) + '\\b', 'i');
  return DB.legends.filter((legend) => re.test(legend.rank));
}

function renderCharacterLegends(key: string): void {
  const items = legendsForCharacter(key);
  getEl('characterLegendList').innerHTML = items.length ? items.map(legendCard).join('') : '<div class="card muted">No dedicated legend entry yet.</div>';
}

/** Wire delegated profile events. Navigation callback keeps URL routing outside this module. */
export function mountCharacterEvents(onNavigate: (key: string) => void = renderCharacter): void {
  getEl('characterButtons').addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>('[data-char]');
    if (button?.dataset.char) onNavigate(button.dataset.char);
  });
  getEl('charDetail').addEventListener('click', (event) => {
    handlePortraitGalleryClick(event.target as HTMLElement);
  });
  getEl('charDetail').addEventListener('keydown', (event) => {
    handlePortraitGalleryKeydown(event);
  });
}
