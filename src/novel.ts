import { escRe } from './dom';
import { colorKeyMap, novelNameMap, rankForStory, speakerName } from './characterRegistry';

export { rankForStory } from './characterRegistry';

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
    const re = new RegExp('\\b' + escRe(name) + '\\b', 'g');
    out = out.replace(re, (_match, offset: number, source: string) => {
      const before = source.slice(Math.max(0, offset - 28), offset);
      const alreadyRanked = /(?:Former\s+)?#\d+\s*(?:—|-)?\s*$/.test(before);
      const rank = rankForStory(name, season);
      const display = rank && !alreadyRanked ? `${rank} - ${name}` : name;
      const token = `@@NAME${placeholders.length}@@`;
      placeholders.push(`<span class="novel-character-name character-${key}">${display}</span>`);
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
