import { colorKeyMap } from './db';
import { escRe } from './dom';

const nameMap: string[][] = [
  ['Kael Veyran', 'kael'], ['Liang Yue', 'liang'], ['Jin Seoryu', 'jin'], ['Lei Zhen', 'lei'], ['Shen Rui', 'rui'], ['Qin Luo', 'qin'],
  ['Han Myeong', 'han'], ['Arin Vale', 'arin'], ['Luo Wen', 'luo'],
  ['Jian Ruo', 'former'], ['Xu Weng', 'former'], ['Mo Qian', 'former'], ['Yeon Hwa', 'former'],
  ['Wei Zhen', 'wei'], ['Ji Wuye', 'ji'], ['Cao Tian', 'cao'], ['Ye Mo', 'ye'],
  ['Zhao Keshan', 'zhao'], ['Lin Yao', 'lin'], ['Yan Shou', 'yan'], ['Mei Zhen', 'meizhen'], ['Yun Ke', 'yunke'], ['Gao Ren', 'gaoren'], ['Shu Fen', 'shufen'], ['Bao Tien', 'baotien'], ['Jian Meilin', 'meilin'], ['Song Qiren', 'song'], ['Yun Shiyue', 'shiyue'], ['Huo Wujin', 'huo'],
  ['Nam Gyeol', 'nam'], ['Chun Baek', 'chun'], ['Seo Haejin', 'haejin'], ['Gwon Myeong', 'gwon'], ['Dae Mun', 'daemun'], ['Mun Daeho', 'daemun'], ['Baek Cheon', 'baek'], ['Gong Seok', 'gong'],
  ['Jiang Taixuan', 'jiang'], ['Duan He', 'duan'], ['Mi Suyun', 'mi'], ['Qiu Shen', 'qiu'], ['Zhao Renkai', 'zhao_renkai'],
  ['Mo Qingzhao', 'mo'], ['Yun Shizhen', 'yun'], ['Mu Gyeong', 'mu'], ['Seo Mujin', 'seo'], ['Tae Muyeon', 'tae'], ['Gu Xian', 'gu'], ['Ren Qiao', 'ren'], ['Qiao Ren', 'qiao'], ['Jae Miri', 'miri'],
  ['Sorin Vael', 'sorin'], ['Valeria Nox', 'valeria'], ['Draven Sol', 'draven'], ['Ilyra Serath', 'ilyra'], ['Aurel Veyr', 'aurel'], ['Vaelor Veyr', 'vaelor'], ['Mo', 'mo'], ['Yun', 'yun'], ['Rhen', 'rhen'], ['Sera', 'sera'], ['Kael', 'kael'], ['Liang', 'liang'], ['Jin', 'jin'], ['Lei', 'lei'], ['Rui', 'rui'], ['Qin', 'qin'], ['Han', 'han'], ['Arin', 'arin'], ['Luo', 'luo'], ['Wei', 'wei'], ['Orun Vhal', 'orun'], ['Iscaryn Voss', 'iscaryn'], ['Rhavenn Korr', 'rhavenn'], ['Tor Veydan', 'tor'], ['Caedros Marr', 'caedros'], ['Varesh Nhal', 'varesh'], ['Amon Serath', 'amon'], ['Aethon Vael', 'aethon'], ['Ilyra', 'ilyra'], ['Orun', 'orun'], ['Iscaryn', 'iscaryn'], ['Rhavenn', 'rhavenn'], ['Tor', 'tor'], ['Caedros', 'caedros'], ['Varesh', 'varesh'], ['Amon', 'amon'], ['Aethon', 'aethon'],
].sort((a, b) => b[0].length - a[0].length);

const rankLabelMap: Record<string, string> = {
  'Kael Veyran': '#1', Kael: '#1',
  'Liang Yue': '#2', Liang: '#2',
  'Jin Seoryu': '#3', Jin: '#3',
  'Lei Zhen': '#4', Lei: '#4',
  'Shen Rui': '#5', Rui: '#5',
  Sera: 'Former #6',
  'Mo Qingzhao': '#7', Mo: '#7',
  'Arin Vale': '#8', Arin: '#8',
  'Luo Wen': '#9', Luo: '#9',
  'Yun Shizhen': '#10', Yun: '#10',
  'Qin Luo': 'Former #6', Qin: 'Former #6',
  'Han Myeong': 'Former #8', Han: 'Former #8',
  'Jian Ruo': 'Former #1',
  'Xu Weng': 'Former #3',
  'Mo Qian': 'Former #5',
  'Yeon Hwa': 'Former #6',
  'Wei Zhen': 'Former #5', Wei: 'Former #5',
  'Ilyra Serath': '#6', Ilyra: '#6',
  'Orun Vhal': 'VII', Orun: 'VII',
  'Iscaryn Voss': 'VI', Iscaryn: 'VI',
  'Rhavenn Korr': 'V', Rhavenn: 'V',
  'Tor Veydan': 'IV', Tor: 'IV',
  'Caedros Marr': 'III', Caedros: 'III',
  'Varesh Nhal': 'II', Varesh: 'II',
  'Amon Serath': 'I', Amon: 'I',
  'Aethon Vael': 'OL', Aethon: 'OL',
};

// Best display name per colour key, derived from nameMap (prefer the fullest name).
const speakerNameByKey: Record<string, string> = {};
nameMap.forEach(([name, key]) => {
  const cur = speakerNameByKey[key];
  if (!cur || name.length > cur.length) speakerNameByKey[key] = name;
});

// Friendly labels for generic/unnamed speakers (they share the neutral colour).
const neutralNames: Record<string, string> = {
  novice: 'Novice', girl: 'Girl', flowerseller: 'Flower Seller', covenant: 'Covenant Envoy',
  duchess: 'Duchess', soldier: 'Soldier', opponent: 'Opponent', captain: 'Captain',
  lieutenant: 'Lieutenant', attacker: 'Attacker', messenger: 'Messenger', grandmaster: 'Grandmaster',
};

/** Human-readable name for a `[[speaker:key]]` tag. */
function speakerName(raw: string): string {
  const colorKey = colorKeyMap[raw] || raw;
  return speakerNameByKey[colorKey] || neutralNames[raw] || (raw.charAt(0).toUpperCase() + raw.slice(1));
}

function annotateDialogue(text: string): string {
  return String(text || '').split('\n').map((line) => {
    const m = line.match(/^\[\[speaker:([a-z0-9_]+)\]\](.*)$/);
    if (!m) return line;
    const key = colorKeyMap[m[1]] || m[1];
    const name = speakerName(m[1]);
    // Block "dialogue card": a colour-keyed border + uppercase speaker label
    // above the quote (kept near-white for readability). Inner tags are <b>
    // (never <span>) so annotateNamesForSeason's span-guard protects the whole
    // card and does not re-annotate names inside the label or quote.
    return `<span class="novel-dialogue dialogue-card character-${key}"><b class="novel-speaker dialogue-speaker">${name}</b><b class="dialogue-quote">${m[2]}</b></span>`;
  }).join('\n');
}

function annotateSkills(text: string): string {
  let out = String(text || '');
  // Preserve authored gold spans.
  out = out.replace(/(^|\n)(✦\s*)?(SUPREME PASSIVE ART|SUPREME ART|TRANSCENDED SKILL|TRANSCENDED ART|ULTIMATE ART)\s*[—-]\s*([^\n<]+)/gi, (_m, prefix, _star, t, name) =>
    `${prefix}<span class="novel-skill-supreme"><strong>✦ ${t.toUpperCase()} — ${name.trim()}</strong></span>`);
  const known = ['The Orchid Blooms Only Once'];
  known.forEach((n) => {
    const re = new RegExp('(^|\\n)(?:✦\\s*)?' + escRe(n) + '(?=\\n|$|\\.)', 'gi');
    out = out.replace(re, (_m, p) => `${p}<span class="novel-skill-supreme"><strong>✦ SUPREME ART — ${n}</strong></span>`);
  });
  out = out.replace(/(^|\n)✦ TECHNIQUE\s*[—-]\s*([^\n<]+)/gi, (_m, p, name) => `${p}<span class="novel-skill-callout"><strong>✦ TECHNIQUE — ${name.trim()}</strong></span>`);
  return out;
}

export function rankForStory(name: string, season?: number): string {
  if (!season) return rankLabelMap[name] || '';
  const aliases: Record<string, string> = { Sera: 'Sera', 'Ilyra Serath': 'Ilyra', Ilyra: 'Ilyra', 'Mo Qingzhao': 'Mo', Mo: 'Mo', 'Arin Vale': 'Arin', Arin: 'Arin', 'Luo Wen': 'Luo', Luo: 'Luo', 'Yun Shizhen': 'Yun', Yun: 'Yun' };
  const n = aliases[name] || name;
  const ancientRanks: Record<string, string> = { 'Orun Vhal': 'VII', Orun: 'VII', 'Iscaryn Voss': 'VI', Iscaryn: 'VI', 'Rhavenn Korr': 'V', Rhavenn: 'V', 'Tor Veydan': 'IV', Tor: 'IV', 'Caedros Marr': 'III', Caedros: 'III', 'Varesh Nhal': 'II', Varesh: 'II', 'Amon Serath': 'I', Amon: 'I', 'Aethon Vael': 'OL', Aethon: 'OL' };
  if (ancientRanks[name]) return ancientRanks[name];
  if (n === 'Sera') { if (season <= 22) return '#7'; if (season <= 43) return '#6'; return 'Former #6'; }
  if (n === 'Ilyra') { return season < 44 ? '' : '#6'; }
  if (n === 'Mo') { return season <= 22 ? '' : '#7'; }
  if (n === 'Arin') { return season <= 22 ? '#9' : '#8'; }
  if (n === 'Luo') { return season <= 22 ? '' : '#9'; }
  if (n === 'Yun') { return season <= 22 ? '' : '#10'; }
  return rankLabelMap[name] || '';
}

function annotateNamesForSeason(text: string, season?: number): string {
  let out = String(text || '');
  const held: string[] = [];
  out = out.replace(/<span[\s\S]*?<\/span>/g, (m) => { const t = `@@SPAN${held.length}@@`; held.push(m); return t; });
  const placeholders: string[] = [];
  nameMap.forEach(([name, key]) => {
    const re = new RegExp('\\b' + escRe(name) + '\\b', 'g');
    out = out.replace(re, (_match, offset: number, source: string) => {
      const before = source.slice(Math.max(0, offset - 28), offset);
      const alreadyRanked = /(?:Former\s+)?#\d+\s*(?:—|-)?\s*$/.test(before);
      const rank = rankForStory(name, season);
      const display = (rank && !alreadyRanked) ? `${rank} - ${name}` : name;
      const t = `@@NAME${placeholders.length}@@`;
      placeholders.push(`<span class="novel-character-name character-${key}">${display}</span>`);
      return t;
    });
  });
  placeholders.forEach((v, i) => { out = out.replaceAll(`@@NAME${i}@@`, v); });
  held.forEach((v, i) => { out = out.replaceAll(`@@SPAN${i}@@`, v); });
  return out;
}

/** Render an episode/legend body: dialogue cards, skill callouts, and ranked names. */
export function renderNovel(text: string, season?: number): string {
  const html = annotateNamesForSeason(annotateSkills(annotateDialogue(text)), season);
  // Dialogue cards are block-level; strip the surrounding pre-line newlines so
  // the card's own margin controls spacing instead of doubling it.
  return html.replace(/\n*(<span class="novel-dialogue[\s\S]*?<\/span>)\n*/g, '$1');
}
