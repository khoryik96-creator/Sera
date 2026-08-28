import { escRe } from './dom';
import { colorKeyMap, novelNameMap, rankForStory, speakerName } from './characterRegistry';

export { rankForStory } from './characterRegistry';

type NovelRankTone = 'current' | 'former' | 'retired' | 'deceased' | 'unranked';

function annotateDialogue(text: string): string {
  return String(text || '').split('\n').map((line) => {
    const match = line.match(/^\[\[speaker:([a-z0-9_]+)\]\](.*)$/);
    if (!match) return line;
    const key = colorKeyMap[match[1]] || match[1];
    const name = speakerName(match[1]);
    return `<span class="novel-dialogue dialogue-card character-${key}"><b class="novel-speaker dialogue-speaker">${name}</b><b class="dialogue-quote">${match[2]}</b></span>`;
  }).join('\n');
}

function annotateSkills(text: string): string {
  let out = String(text || '');
  out = out.replace(/(^|\n)(✦\s*)?(SUPREME PASSIVE ART|SUPREME ART|TRANSCENDED SKILL|TRANSCENDED ART|ULTIMATE ART)\s*[—-]\s*([^\n<]+)/gi, (_m, prefix, _star, tier, name) =>
    `${prefix}<span class="novel-skill-supreme"><strong>✦ ${tier.toUpperCase()} — ${name.trim()}</strong></span>`);
  const known = ['The Orchid Blooms Only Once'];
  known.forEach((name) => {
    const re = new RegExp('(^|\\n)(?:✦\\s*)?' + escRe(name) + '(?=\\n|$|\\.)', 'gi');
    out = out.replace(re, (_m, prefix) => `${prefix}<span class="novel-skill-supreme"><strong>✦ SUPREME ART — ${name}</strong></span>`);
  });
  out = out.replace(/(^|\n)✦ TECHNIQUE\s*[—-]\s*([^\n<]+)/gi, (_m, prefix, name) => `${prefix}<span class="novel-skill-callout"><strong>✦ TECHNIQUE — ${name.trim()}</strong></span>`);
  return out;
}

function effectiveRank(name: string, season?: number): string {
  // Qin and Han are active #6/#8 before the Ranking Succession arc. Their
  // registry stores present-day status, so preserve the historical badge in prose.
  if (season && season <= 22) {
    if (name === 'Qin Luo' || name === 'Qin') return '#6';
    if (name === 'Han Myeong' || name === 'Han') return '#8';
  }
  return rankForStory(name, season);
}

function rankTone(name: string, rank: string, season?: number): NovelRankTone {
  if (rank === 'UNR') return 'unranked';
  const currentEra = !season || season >= 23;
  if (currentEra && (name === 'Han Myeong' || name === 'Han')) return 'deceased';
  if (currentEra && (name === 'Qin Luo' || name === 'Qin')) return 'retired';
  if (rank.startsWith('Former ')) return 'former';
  return 'current';
}

function rankBadgeMarkup(rank: string, name: string, season?: number): string {
  if (!rank) return '';
  const tone = rankTone(name, rank, season);
  const base = rank.replace(/^Former\s+/i, '').trim();
  const label = tone === 'deceased'
    ? `${base} †`
    : tone === 'retired'
      ? `${base} <span class="rank-badge__state">RET</span>`
      : tone === 'former'
        ? `${base} <span class="rank-badge__state">FORMER</span>`
        : base;
  return `<span class="rank-badge rank-badge--${tone}">${label}</span>`;
}

function annotateNamesForSeason(text: string, season?: number): string {
  let out = String(text || '');
  const held: string[] = [];
  out = out.replace(/<span[\s\S]*?<\/span>/g, (markup) => {
    const token = `@@SPAN${held.length}@@`;
    held.push(markup);
    return token;
  });

  const placeholders: string[] = [];
  novelNameMap.forEach(([name, key]) => {
    // Consume any legacy inline numeric rank immediately before the name so the
    // reader always shows one canonical Lucy-style badge instead of "#1 - Name".
    const re = new RegExp('(?:(?:Former\\s+)?#\\d+\\s*(?:—|-)?\\s*)?\\b' + escRe(name) + '\\b', 'g');
    out = out.replace(re, () => {
      const rank = effectiveRank(name, season);
      const badge = rankBadgeMarkup(rank, name, season);
      const token = `@@NAME${placeholders.length}@@`;
      placeholders.push(`<span class="ranked-name"><span class="novel-character-name character-${key}">${name}</span>${badge}</span>`);
      return token;
    });
  });

  placeholders.forEach((value, index) => { out = out.replaceAll(`@@NAME${index}@@`, value); });
  held.forEach((value, index) => { out = out.replaceAll(`@@SPAN${index}@@`, value); });
  return out;
}

/** Render an episode/legend body: dialogue cards, skill callouts, and ranked names. */
export function renderNovel(text: string, season?: number): string {
  const html = annotateNamesForSeason(annotateSkills(annotateDialogue(text)), season);
  return html.replace(/\n*(<span class="novel-dialogue[\s\S]*?<\/span>)\n*/g, '$1');
}
