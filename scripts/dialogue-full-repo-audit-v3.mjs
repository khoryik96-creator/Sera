import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { loadFinalArcSeasons } from './final-arc-reader.mjs';

const registrySource = readFileSync('src/characterRegistry.ts', 'utf8');
const parseStrings = (raw = '') => [...raw.matchAll(/'([^']+)'/g)].map((m) => m[1]);
const registry = [];
for (const m of registrySource.matchAll(/\{ key: '([a-z0-9_]+)', displayName: '([^']+)', colorKey: '([^']+)', aliases: \[([^\]]*)\](?:, speakerKeys: \[([^\]]*)\])?/g)) {
  const key = m[1];
  registry.push({ key, displayName: m[2], colorKey: m[3], aliases: parseStrings(m[4]), speakerKeys: m[5] ? parseStrings(m[5]) : [key] });
}
const neutralSpeakerNames = new Map();
const neutralBlock = registrySource.match(/neutralSpeakerNames[^{]*\{([\s\S]*?)\}/);
if (neutralBlock) for (const m of neutralBlock[1].matchAll(/([a-z0-9_]+):\s*'([^']+)'/g)) neutralSpeakerNames.set(m[1], m[2]);
const validKeys = new Set([...neutralSpeakerNames.keys()]);
for (const entry of registry) for (const key of entry.speakerKeys) validKeys.add(key);

const aliases = [];
for (const entry of registry) {
  for (const alias of new Set([entry.displayName, ...entry.aliases])) {
    if (alias?.length >= 2) aliases.push({ alias, key: entry.speakerKeys[0] || entry.key, name: entry.displayName });
  }
}
aliases.sort((a, b) => b.alias.length - a.alias.length);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[’']/g, "[’']");
const verbs = '(?:said|asked|replied|answered|whispered|murmured|muttered|called|shouted|yelled|snapped|added|continued|warned|admitted|spoke|breathed|growled|hissed|declared|announced|insisted|protested|explained|confirmed|agreed|objected|corrected|responded|remarked|observed|demanded|suggested|promised|reported|noted|conceded|repeated)';

const stripQuotes = (s) => String(s || '').replace(/“[^”]*”/gu, ' ').replace(/"[^"]*"/g, ' ');
const quoteCount = (s) => [...String(s || '').matchAll(/“[^”]*”/gu)].length + [...String(s || '').matchAll(/"[^"]*"/g)].length;
const hasQuote = (s) => quoteCount(s) > 0;
const standalone = (s) => /^“[\s\S]+”[.!?…]?$/u.test(String(s || '').trim()) || /^"[\s\S]+"[.!?…]?$/.test(String(s || '').trim());
const stripMarker = (s) => String(s || '').replace(/^\[\[speaker:[a-z0-9_]+\]\]/, '');
const compact = (s, max = 420) => { const x = String(s || '').replace(/\s+/g, ' ').trim(); return x.length > max ? `${x.slice(0, max - 1)}…` : x; };
const sourceHint = (season) => season >= 95 ? `docs/prose/FINAL_ARC_SEASON${String(season).padStart(3, '0')}_PROSE_DRAFT*.md` : `src/data/seasons/season-${String(season).padStart(3, '0')}.json`;

function namedMentions(text) {
  const outside = stripQuotes(text);
  const hits = [];
  for (const row of aliases) {
    if (new RegExp(`(?:^|[^\\p{L}])${esc(row.alias)}(?:[^\\p{L}]|$)`, 'iu').test(outside)) hits.push(row);
  }
  const seen = new Set();
  return hits.filter((h) => !seen.has(h.key) && seen.add(h.key));
}

// Precision rule: a named character is a speaker only when the prose grammatically
// makes the name the subject of the speech verb ("Sera said"), or when a classic
// post-quote inversion begins with the verb ("said Sera"). We deliberately do
// NOT treat "she asked Rhen" as Rhen speaking.
function explicitNamedSpeaker(text) {
  const outside = stripQuotes(text);
  const hits = [];
  for (const row of aliases) {
    const name = esc(row.alias);
    const subjectFirst = new RegExp(`(?:^|[^\\p{L}])${name}\\s+${verbs}\\b`, 'iu');
    const inversion = new RegExp(`^\\s*[,;:—-]?\\s*${verbs}\\s+${name}(?:[^\\p{L}]|$)`, 'iu');
    if (subjectFirst.test(outside) || inversion.test(outside)) hits.push(row);
  }
  const seen = new Set();
  return hits.filter((h) => !seen.has(h.key) && seen.add(h.key));
}

// Same conservative grammar as final-arc-reader: no quote in the cue paragraph,
// short narration, the character name must lead the sentence, and silence/negation
// cues are excluded. This prevents "Sera asked him" from being interpreted as an
// announcement that Sera speaks the following reply.
function strictAnnouncedSpeaker(text) {
  const t = String(text || '').trim();
  if (!t || t.length > 140 || hasQuote(t)) return null;
  if (/\b(?:said nothing|did not speak|didn't speak|didn’t speak|never spoke|silent|silence|without a word|no reply)\b/i.test(t)) return null;
  if (!/\b(?:voice|spoke|speaks|called|calls|answered|replied|asked|said|whispered|murmured|muttered|shouted|added|continued|snapped|breathed)\b/i.test(t)) return null;
  for (const row of aliases) {
    if (new RegExp(`^${esc(row.alias)}(?:[’']s)?\\b`, 'iu').test(t)) return row;
  }
  return null;
}

function actionCandidate(text) {
  const t = String(text || '').trim();
  if (!/\b(?:looked|glanced|stared|nodded|shook|smiled|sighed|leaned|turned|frowned|grimaced|blinked|exhaled|inhaled|laughed|mouth|lips|voice|eyes|brow|expression|jaw|shoulders|raised (?:his|her|their) hand|lowered (?:his|her|their) hand|folded (?:his|her|their) arms|tilted (?:his|her|their) head|closed (?:his|her|their) eyes|opened (?:his|her|their) eyes)\b/i.test(t)) return null;
  const ms = namedMentions(t);
  return ms.length === 1 ? ms[0] : null;
}
function pronounSpeech(text) {
  const outside = stripQuotes(text);
  return new RegExp(`\\b(?:he|she|they)\\s+${verbs}\\b|\\b${verbs}\\s+(?:he|she|they)\\b`, 'iu').test(outside);
}

const seasonSources = [];
for (const file of readdirSync('src/data/seasons').filter((f) => /^season-\d{3}\.json$/.test(f)).sort()) {
  seasonSources.push({ season: Number(file.match(/(\d{3})/)[1]), episodes: JSON.parse(readFileSync(`src/data/seasons/${file}`, 'utf8')) });
}
for (const [key, episodes] of Object.entries(await loadFinalArcSeasons())) seasonSources.push({ season: Number(key.replace('season', '')), episodes });
seasonSources.sort((a, b) => a.season - b.season);

const f = {
  badPlacement: [], unknown: [], duplicate: [], markedNoQuote: [], markedExplicitMismatch: [], markedStrictCueMismatch: [], multiSpeakerMarked: [],
  explicitNamedMiss: [], strictAnnouncedMiss: [], pronounMiss: [], actionMiss: [], standalonePool: [], asciiPool: [],
};
let episodesTotal = 0, paragraphsTotal = 0, markersTotal = 0, quotesTotal = 0;
const summary = [];
const push = (type, season, ep, para, extra = {}) => f[type].push({ season, ep: ep.ep, title: ep.title, para, source: sourceHint(season), ...extra });

for (const { season, episodes } of seasonSources) {
  episodesTotal += episodes.length;
  const s = { season, episodes: episodes.length, markers: 0, quoteParas: 0, standalone: 0, explicit: 0, announced: 0, pronoun: 0, action: 0 };
  for (const ep of episodes) {
    const paras = String(ep.text || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    paragraphsTotal += paras.length;
    for (let i = 0; i < paras.length; i++) {
      const p = paras[i];
      for (const [lineIndex, line] of p.split('\n').entries()) {
        const markers = [...line.matchAll(/\[\[speaker:([^\]]+)\]\]/g)];
        if (markers.length > 1) push('duplicate', season, ep, i, { line: lineIndex + 1, text: line, keys: markers.map((m) => m[1]) });
        for (const m of markers) {
          if (m.index !== 0) push('badPlacement', season, ep, i, { line: lineIndex + 1, text: line, key: m[1] });
          if (!validKeys.has(m[1])) push('unknown', season, ep, i, { line: lineIndex + 1, text: line, key: m[1] });
        }
      }
      const marker = p.match(/^\[\[speaker:([a-z0-9_]+)\]\]/);
      const body = marker ? stripMarker(p) : p;
      if (hasQuote(body)) { s.quoteParas++; quotesTotal++; }
      if (marker) {
        s.markers++; markersTotal++;
        const key = marker[1];
        if (!hasQuote(body)) push('markedNoQuote', season, ep, i, { key, text: p });
        const explicit = explicitNamedSpeaker(body);
        if (explicit.length === 1 && explicit[0].key !== key) push('markedExplicitMismatch', season, ep, i, { key, expected: explicit[0].key, expectedName: explicit[0].name, text: p });
        if (explicit.length >= 2) push('multiSpeakerMarked', season, ep, i, { key, explicit: explicit.map((x) => `${x.key}:${x.name}`), text: p });
        const announced = strictAnnouncedSpeaker(paras[i - 1] || '');
        if (standalone(body) && announced && announced.key !== key) push('markedStrictCueMismatch', season, ep, i, { key, expected: announced.key, expectedName: announced.name, text: p, before: paras[i - 1] });
        continue;
      }
      if (!hasQuote(p)) continue;
      const explicit = explicitNamedSpeaker(p);
      if (explicit.length === 1) { s.explicit++; push('explicitNamedMiss', season, ep, i, { expected: explicit[0].key, expectedName: explicit[0].name, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' }); }
      const announced = standalone(p) ? strictAnnouncedSpeaker(paras[i - 1] || '') : null;
      if (announced) { s.announced++; push('strictAnnouncedMiss', season, ep, i, { expected: announced.key, expectedName: announced.name, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' }); }
      if (pronounSpeech(p)) { s.pronoun++; push('pronounMiss', season, ep, i, { mentions: namedMentions(p).map((x) => `${x.key}:${x.name}`), text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' }); }
      const action = standalone(p) ? actionCandidate(paras[i - 1] || '') : null;
      if (action) { s.action++; push('actionMiss', season, ep, i, { expected: action.key, expectedName: action.name, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' }); }
      if (standalone(p)) { s.standalone++; push('standalonePool', season, ep, i, { text: p, before: paras[i - 1] || '', after: paras[i + 1] || '', beforeMentions: namedMentions(paras[i - 1] || '').map((x) => `${x.key}:${x.name}`), afterMentions: namedMentions(paras[i + 1] || '').map((x) => `${x.key}:${x.name}`) }); }
      if (/"[^"]+"/.test(p)) push('asciiPool', season, ep, i, { text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' });
    }
  }
  summary.push(s);
}

const ctx = (r) => `S${r.season} ${r.ep} P${r.para + 1} — ${r.title}`;
const block = (r) => {
  const lines = [];
  if (r.before) lines.push(`before: ${compact(r.before)}`);
  lines.push(`>>> ${compact(r.text, 560)}`);
  if (r.after) lines.push(`after: ${compact(r.after)}`);
  return `**${ctx(r)}** — \`${r.source}\`\n\n\`\`\`text\n${lines.join('\n')}\n\`\`\``;
};
const section = (title, rows, fn, limit = 3000) => [`## ${title}`, '', `Count: **${rows.length}**`, '', ...rows.slice(0, limit).flatMap((r) => [fn(r), '']), rows.length > limit ? `_Truncated to ${limit} of ${rows.length}._\n` : ''].join('\n');
const simple = (r) => `**${ctx(r)}** — \`${r.source}\`\n\n- ${r.key ? `existing \`${r.key}\`` : ''}${r.expected ? ` candidate \`${r.expected}\` (${r.expectedName})` : ''}${r.explicit ? ` explicit ${r.explicit.join(', ')}` : ''}\n- ${compact(r.text, 750)}`;

const out = [];
out.push('# Full-repository dialogue attribution/highlight audit — precision pass', '');
out.push(`Scanned **${seasonSources.length} seasons**, **${episodesTotal} episodes**, **${paragraphsTotal} paragraphs**, **${markersTotal} speaker markers**, **${quotesTotal} quoted paragraphs**.`, '');
out.push('This pass uses grammar-constrained speaker attribution to avoid the false positives produced by broad proximity rules. It treats named-subject speech verbs and strict name-leading announced-speaker narration as high-confidence; pronouns/action beats remain review-only.', '');
out.push('## Summary by season', '');
out.push('| S | Eps | Markers | Quote paras | Standalone neutral | Explicit-name miss | Announced miss | Pronoun review | Action review |');
out.push('|---:|---:|---:|---:|---:|---:|---:|---:|---:|');
for (const x of summary) out.push(`| ${x.season} | ${x.episodes} | ${x.markers} | ${x.quoteParas} | ${x.standalone} | ${x.explicit} | ${x.announced} | ${x.pronoun} | ${x.action} |`);
out.push('');
out.push(section('A. Marker placement errors', f.badPlacement, simple));
out.push(section('B. Unknown speaker keys', f.unknown, simple));
out.push(section('C. Duplicate marker lines', f.duplicate, simple));
out.push(section('D. Marked lines with no quote', f.markedNoQuote, simple));
out.push(section('E. Existing marker conflicts with grammatical named-speaker attribution', f.markedExplicitMismatch, simple));
out.push(section('F. Existing marker conflicts with strict preceding announced-speaker cue', f.markedStrictCueMismatch, (r) => `${block(r)}\n\nExisting \`${r.key}\`; strict cue points to **${r.expectedName}** (\`${r.expected}\`).`));
out.push(section('G. Marked paragraph has multiple grammatical named speakers', f.multiSpeakerMarked, simple));
out.push(section('H. HIGH-VALUE unmarked dialogue with grammatical named speaker', f.explicitNamedMiss, (r) => `${block(r)}\n\nCandidate: **${r.expectedName}** (\`${r.expected}\`).`));
out.push(section('I. HIGH-VALUE unmarked standalone after strict announced-speaker cue', f.strictAnnouncedMiss, (r) => `${block(r)}\n\nCandidate: **${r.expectedName}** (\`${r.expected}\`).`));
out.push(section('J. REVIEW unmarked mixed dialogue with pronoun attribution', f.pronounMiss, (r) => `${block(r)}\n\nNamed mentions: ${r.mentions?.join(', ') || '_none_'}.`));
out.push(section('K. REVIEW unmarked standalone after single named action cue', f.actionMiss, (r) => `${block(r)}\n\nCandidate: **${r.expectedName}** (\`${r.expected}\`).`));
out.push(section('L. Full unmarked standalone pool', f.standalonePool, block, 3000));
out.push(section('M. Unmarked ASCII-quote pool', f.asciiPool, block, 1000));
writeFileSync('docs/dialogue-audit/FULL_REPO_POST160_AUDIT_V3.md', out.join('\n').replace(/\n+$/u, '') + '\n');
writeFileSync('docs/dialogue-audit/FULL_REPO_POST160_COUNTS_V3.json', JSON.stringify({ totals: { seasons: seasonSources.length, episodes: episodesTotal, paragraphs: paragraphsTotal, markers: markersTotal, quoteParagraphs: quotesTotal }, counts: Object.fromEntries(Object.entries(f).map(([k, v]) => [k, v.length])), summary }, null, 2) + '\n');
console.log(JSON.stringify({ totals: { seasons: seasonSources.length, episodes: episodesTotal, paragraphs: paragraphsTotal, markers: markersTotal, quoteParagraphs: quotesTotal }, counts: Object.fromEntries(Object.entries(f).map(([k, v]) => [k, v.length])) }, null, 2));
