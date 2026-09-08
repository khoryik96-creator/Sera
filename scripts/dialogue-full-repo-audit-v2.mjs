import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { loadFinalArcSeasons } from './final-arc-reader.mjs';

const registrySource = readFileSync('src/characterRegistry.ts', 'utf8');
const parseStrings = (raw = '') => [...raw.matchAll(/'([^']+)'/g)].map((m) => m[1]);

const registry = [];
for (const m of registrySource.matchAll(/\{ key: '([a-z0-9_]+)', displayName: '([^']+)', colorKey: '([^']+)', aliases: \[([^\]]*)\](?:, speakerKeys: \[([^\]]*)\])?/g)) {
  const key = m[1];
  registry.push({
    key,
    displayName: m[2],
    colorKey: m[3],
    aliases: parseStrings(m[4]),
    speakerKeys: m[5] ? parseStrings(m[5]) : [key],
  });
}

const neutralSpeakerNames = new Map();
const neutralBlock = registrySource.match(/neutralSpeakerNames[^{]*\{([\s\S]*?)\}/);
if (neutralBlock) {
  for (const m of neutralBlock[1].matchAll(/([a-z0-9_]+):\s*'([^']+)'/g)) neutralSpeakerNames.set(m[1], m[2]);
}

const speakerInfo = new Map();
for (const entry of registry) {
  for (const speakerKey of entry.speakerKeys) speakerInfo.set(speakerKey, { ...entry, speakerKey, neutral: false });
}
for (const [speakerKey, displayName] of neutralSpeakerNames) {
  speakerInfo.set(speakerKey, { key: speakerKey, speakerKey, displayName, colorKey: 'neutral', aliases: [], speakerKeys: [speakerKey], neutral: true });
}
const knownSpeakerKeys = new Set(speakerInfo.keys());

const aliasRows = [];
for (const entry of registry) {
  const names = new Set([entry.displayName, ...entry.aliases]);
  for (const alias of names) {
    if (!alias || alias.length < 2) continue;
    aliasRows.push({ alias, key: entry.speakerKeys[0] || entry.key, displayName: entry.displayName });
  }
}
aliasRows.sort((a, b) => b.alias.length - a.alias.length);

const speechVerbs = [
  'said', 'asked', 'replied', 'answered', 'whispered', 'murmured', 'muttered', 'called', 'shouted',
  'yelled', 'snapped', 'added', 'continued', 'finished', 'began', 'offered', 'warned', 'ordered',
  'admitted', 'spoke', 'breathed', 'growled', 'hissed', 'declared', 'announced', 'insisted', 'protested',
  'explained', 'confirmed', 'agreed', 'objected', 'corrected', 'responded', 'remarked', 'observed',
  'demanded', 'suggested', 'promised', 'reported', 'noted', 'conceded', 'repeated', 'called back',
];
const verbPattern = speechVerbs.map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[’']/g, "[’']");

function sourceHint(season) {
  return season >= 95
    ? `docs/prose/FINAL_ARC_SEASON${String(season).padStart(3, '0')}_PROSE_DRAFT*.md`
    : `src/data/seasons/season-${String(season).padStart(3, '0')}.json`;
}
function stripMarker(text) { return text.replace(/^\[\[speaker:[a-z0-9_]+\]\]/, ''); }
function curlyQuotes(text) { return [...text.matchAll(/“[^”]*”/gu)]; }
function asciiQuotes(text) { return [...text.matchAll(/"[^"]*"/g)]; }
function quoteCount(text) { return curlyQuotes(text).length + asciiQuotes(text).length; }
function hasQuote(text) { return quoteCount(text) > 0; }
function outsideQuotes(text) { return text.replace(/“[^”]*”/gu, ' ').replace(/"[^"]*"/g, ' '); }
function standaloneQuote(text) {
  const t = text.trim();
  return /^“[\s\S]+”[.!?…]?$/u.test(t) || /^"[\s\S]+"[.!?…]?$/.test(t);
}
function compact(text, max = 360) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}
function mentions(text) {
  const outside = outsideQuotes(text);
  const out = [];
  for (const row of aliasRows) {
    const re = new RegExp(`(?:^|[^\\p{L}])${esc(row.alias)}(?:[^\\p{L}]|$)`, 'iu');
    if (re.test(outside)) out.push(row);
  }
  const seen = new Set();
  return out.filter((x) => !seen.has(x.key) && seen.add(x.key));
}
function namedSpeechAttributions(text) {
  const outside = outsideQuotes(text);
  const out = [];
  for (const row of aliasRows) {
    const name = esc(row.alias);
    const before = new RegExp(`(?:^|[^\\p{L}])${name}(?:[^\\p{L}]|$)[^.!?\\n]{0,70}\\b(?:${verbPattern})\\b`, 'iu');
    const after = new RegExp(`\\b(?:${verbPattern})\\b[^.!?\\n]{0,45}(?:^|[^\\p{L}])${name}(?:[^\\p{L}]|$)`, 'iu');
    if (before.test(outside) || after.test(outside)) out.push(row);
  }
  const seen = new Set();
  return out.filter((x) => !seen.has(x.key) && seen.add(x.key));
}
function pronounSpeechAttribution(text) {
  const outside = outsideQuotes(text);
  return new RegExp(`\\b(?:he|she|they)\\s+(?:${verbPattern})\\b|\\b(?:${verbPattern})\\s+(?:he|she|they)\\b`, 'iu').test(outside);
}
function announcedSpeaker(text) {
  const t = text.trim();
  if (!t || t.length > 180 || /\b(?:said nothing|did not speak|didn't speak|didn’t speak|silent|silence|without a word|no reply)\b/i.test(t)) return null;
  const cue = /\b(?:voice|spoke|called|answered|replied|asked|said|whispered|murmured|muttered|shouted|added|continued|snapped|breathed)\b/i;
  if (!cue.test(t)) return null;
  const ms = mentions(t);
  if (ms.length !== 1) return null;
  return ms[0];
}
function actionSpeaker(text) {
  const t = text.trim();
  const action = /\b(?:looked|glanced|stared|nodded|shook|smiled|sighed|leaned|turned|frowned|grimaced|blinked|exhaled|inhaled|laughed|mouth|lips|voice|eyes|brow|expression|jaw|shoulders|raised (?:his|her|their) hand|lowered (?:his|her|their) hand|folded (?:his|her|their) arms|tilted (?:his|her|their) head|closed (?:his|her|their) eyes|opened (?:his|her|their) eyes)\b/i;
  if (!action.test(t)) return null;
  const ms = mentions(t);
  return ms.length === 1 ? ms[0] : null;
}
function neutralRoleAttribution(text) {
  const outside = outsideQuotes(text);
  const hits = [];
  for (const [key, displayName] of neutralSpeakerNames) {
    const words = displayName.toLowerCase().split(/\s+/).filter(Boolean);
    const roleCandidates = new Set([key.replace(/_/g, ' '), displayName.toLowerCase(), words.at(-1)]);
    for (const role of roleCandidates) {
      if (!role || role.length < 3) continue;
      const roleRe = esc(role);
      const re = new RegExp(`\\b(?:the|an?|one)?\\s*${roleRe}\\b[^.!?\\n]{0,45}\\b(?:${verbPattern})\\b|\\b(?:${verbPattern})\\b[^.!?\\n]{0,30}\\b(?:the|an?|one)?\\s*${roleRe}\\b`, 'iu');
      if (re.test(outside)) { hits.push({ key, displayName }); break; }
    }
  }
  const seen = new Set();
  return hits.filter((x) => !seen.has(x.key) && seen.add(x.key));
}

const findings = {
  markerNotAtLineStart: [],
  duplicateMarkerLine: [],
  unknownMarker: [],
  markedNoQuote: [],
  markedExplicitMismatch: [],
  markedAnnouncedMismatch: [],
  markedMultipleNamedSpeakers: [],
  markedAsciiOnlyMixed: [],
  unmarkedExplicitNamed: [],
  unmarkedAnnounced: [],
  unmarkedPronoun: [],
  unmarkedActionCue: [],
  unmarkedNeutralRole: [],
  unmarkedStandalone: [],
  unmarkedAsciiQuote: [],
};

const seasonSources = [];
for (const file of readdirSync('src/data/seasons').filter((f) => /^season-\d{3}\.json$/.test(f)).sort()) {
  const season = Number(file.match(/(\d{3})/)[1]);
  seasonSources.push({ season, episodes: JSON.parse(readFileSync(`src/data/seasons/${file}`, 'utf8')) });
}
const finalArc = await loadFinalArcSeasons();
for (const [key, episodes] of Object.entries(finalArc)) seasonSources.push({ season: Number(key.replace('season', '')), episodes });
seasonSources.sort((a, b) => a.season - b.season);

let totalEpisodes = 0;
let totalParagraphs = 0;
let totalMarkers = 0;
let totalQuoteParagraphs = 0;
const summary = [];

function push(type, season, ep, para, extra = {}) {
  findings[type].push({ season, ep: ep.ep, title: ep.title, para, source: sourceHint(season), ...extra });
}

for (const { season, episodes } of seasonSources) {
  totalEpisodes += episodes.length;
  let markers = 0, quoteParas = 0, unmarkedStandalone = 0, explicitNamed = 0, announced = 0, pronoun = 0, actionCue = 0;
  for (const ep of episodes) {
    const paras = String(ep.text || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    totalParagraphs += paras.length;
    for (let i = 0; i < paras.length; i++) {
      const p = paras[i];
      const lines = p.split('\n');
      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        const ms = [...line.matchAll(/\[\[speaker:([^\]]+)\]\]/g)];
        if (ms.length > 1) push('duplicateMarkerLine', season, ep, i, { line: li + 1, text: line, keys: ms.map((m) => m[1]) });
        for (const m of ms) {
          if (m.index !== 0) push('markerNotAtLineStart', season, ep, i, { line: li + 1, text: line, key: m[1] });
          if (!knownSpeakerKeys.has(m[1])) push('unknownMarker', season, ep, i, { line: li + 1, text: line, key: m[1] });
        }
      }

      const marker = p.match(/^\[\[speaker:([a-z0-9_]+)\]\]/);
      const body = marker ? stripMarker(p) : p;
      const qc = quoteCount(body);
      if (qc) { quoteParas++; totalQuoteParagraphs++; }

      if (marker) {
        markers++; totalMarkers++;
        const key = marker[1];
        if (!hasQuote(body)) push('markedNoQuote', season, ep, i, { key, text: p });
        const explicit = namedSpeechAttributions(body);
        if (explicit.length === 1 && explicit[0].key !== key) push('markedExplicitMismatch', season, ep, i, { key, expected: explicit[0].key, expectedName: explicit[0].displayName, text: p });
        if (explicit.length >= 2) push('markedMultipleNamedSpeakers', season, ep, i, { key, explicit: explicit.map((x) => `${x.key}:${x.displayName}`), text: p });
        const prevAnnounced = announcedSpeaker(paras[i - 1] || '');
        if (standaloneQuote(body) && prevAnnounced && prevAnnounced.key !== key) push('markedAnnouncedMismatch', season, ep, i, { key, expected: prevAnnounced.key, expectedName: prevAnnounced.displayName, text: p, before: paras[i - 1] });
        if (asciiQuotes(body).length && !curlyQuotes(body).length && outsideQuotes(body).trim()) push('markedAsciiOnlyMixed', season, ep, i, { key, text: p });
        continue;
      }

      if (!hasQuote(p)) continue;
      const explicit = namedSpeechAttributions(p);
      const prevAnnounced = announcedSpeaker(paras[i - 1] || '');
      const prevAction = actionSpeaker(paras[i - 1] || '');
      const neutral = neutralRoleAttribution(p);
      if (explicit.length === 1) {
        explicitNamed++;
        push('unmarkedExplicitNamed', season, ep, i, { expected: explicit[0].key, expectedName: explicit[0].displayName, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' });
      }
      if (standaloneQuote(p) && prevAnnounced) {
        announced++;
        push('unmarkedAnnounced', season, ep, i, { expected: prevAnnounced.key, expectedName: prevAnnounced.displayName, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' });
      }
      if (pronounSpeechAttribution(p)) {
        pronoun++;
        push('unmarkedPronoun', season, ep, i, { mentions: mentions(p).map((x) => `${x.key}:${x.displayName}`), text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' });
      }
      if (standaloneQuote(p) && prevAction) {
        actionCue++;
        push('unmarkedActionCue', season, ep, i, { expected: prevAction.key, expectedName: prevAction.displayName, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' });
      }
      if (neutral.length === 1) push('unmarkedNeutralRole', season, ep, i, { expected: neutral[0].key, expectedName: neutral[0].displayName, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' });
      if (standaloneQuote(p)) {
        unmarkedStandalone++;
        push('unmarkedStandalone', season, ep, i, { text: p, before: paras[i - 1] || '', after: paras[i + 1] || '', mentionsBefore: mentions(paras[i - 1] || '').map((x) => `${x.key}:${x.displayName}`), mentionsAfter: mentions(paras[i + 1] || '').map((x) => `${x.key}:${x.displayName}`) });
      }
      if (asciiQuotes(p).length) push('unmarkedAsciiQuote', season, ep, i, { text: p, before: paras[i - 1] || '', after: paras[i + 1] || '' });
    }
  }
  summary.push({ season, episodes: episodes.length, markers, quoteParas, unmarkedStandalone, explicitNamed, announced, pronoun, actionCue });
}

function context(row) { return `S${row.season} ${row.ep} P${row.para + 1} — ${row.title}`; }
function block(row) {
  const lines = [];
  if (row.before) lines.push(`before: ${compact(row.before)}`);
  lines.push(`>>> ${compact(row.text, 520)}`);
  if (row.after) lines.push(`after: ${compact(row.after)}`);
  return `**${context(row)}** — \`${row.source}\`\n\n\`\`\`text\n${lines.join('\n')}\n\`\`\``;
}
function section(title, rows, format, limit = 3000) {
  const out = [`## ${title}`, '', `Count: **${rows.length}**`, ''];
  for (const row of rows.slice(0, limit)) out.push(format(row), '');
  if (rows.length > limit) out.push(`_Truncated to ${limit} of ${rows.length}._`, '');
  return out.join('\n');
}

const report = [];
report.push('# Full-repository dialogue attribution/highlight audit — corrected all-season pass', '');
report.push(`Scanned **${seasonSources.length} seasons**, **${totalEpisodes} episodes**, **${totalParagraphs} paragraphs**, **${totalMarkers} visible/runtime speaker markers**, and **${totalQuoteParagraphs} quoted paragraphs**.`, '');
report.push('Seasons 1–94 are read from `src/data/seasons/`; Seasons 95–114 are loaded through the same `final-arc-reader.mjs` pipeline used by the application, so runtime-inferred final-arc tags are included.', '');
report.push('Neutral-role speaker keys from `neutralSpeakerNames` are treated as valid. Candidate sections are deliberately conservative and require human context review before any attribution changes.', '');
report.push('## Summary by season', '');
report.push('| Season | Episodes | Markers | Quote paras | Unmarked standalone | Explicit named | Announced speaker | Pronoun | Action cue |');
report.push('|---:|---:|---:|---:|---:|---:|---:|---:|---:|');
for (const x of summary) report.push(`| ${x.season} | ${x.episodes} | ${x.markers} | ${x.quoteParas} | ${x.unmarkedStandalone} | ${x.explicitNamed} | ${x.announced} | ${x.pronoun} | ${x.actionCue} |`);
report.push('');

const simple = (r) => `**${context(r)}** — \`${r.source}\`\n\n- ${r.key ? `marker: \`${r.key}\`` : ''}${r.expected ? ` expected: \`${r.expected}\` (${r.expectedName})` : ''}${r.explicit ? ` speakers: ${r.explicit.join(', ')}` : ''}\n- ${compact(r.text, 700)}`;
report.push(section('A. Marker not at line start', findings.markerNotAtLineStart, simple));
report.push(section('B. Duplicate marker on one line', findings.duplicateMarkerLine, simple));
report.push(section('C. Unknown marker key', findings.unknownMarker, simple));
report.push(section('D. Marked line contains no dialogue quote', findings.markedNoQuote, simple));
report.push(section('E. HIGH-RISK: existing marker conflicts with explicit named attribution', findings.markedExplicitMismatch, simple));
report.push(section('F. HIGH-RISK: existing standalone marker conflicts with preceding announced speaker', findings.markedAnnouncedMismatch, (r) => `${block(r)}\n\nExisting \`${r.key}\`, preceding prose announces **${r.expectedName}** (\`${r.expected}\`).`));
report.push(section('G. Marked paragraph contains multiple explicitly attributed named speakers', findings.markedMultipleNamedSpeakers, simple));
report.push(section('H. Marked mixed paragraph uses only ASCII quotes', findings.markedAsciiOnlyMixed, simple));
report.push(section('I. HIGH-VALUE: unmarked quote with one explicit named speech attribution', findings.unmarkedExplicitNamed, (r) => `${block(r)}\n\nCandidate: **${r.expectedName}** (\`${r.expected}\`).`));
report.push(section('J. HIGH-VALUE: unmarked standalone quote after explicit announced-speaker narration', findings.unmarkedAnnounced, (r) => `${block(r)}\n\nCandidate: **${r.expectedName}** (\`${r.expected}\`).`));
report.push(section('K. REVIEW: unmarked mixed quote with pronoun speech attribution', findings.unmarkedPronoun, (r) => `${block(r)}\n\nNamed mentions in paragraph: ${r.mentions?.join(', ') || '_none_'}.`));
report.push(section('L. REVIEW: unmarked standalone quote after single named action cue', findings.unmarkedActionCue, (r) => `${block(r)}\n\nAction-cue candidate: **${r.expectedName}** (\`${r.expected}\`).`));
report.push(section('M. OPTIONAL: unmarked dialogue with one neutral-role speech attribution', findings.unmarkedNeutralRole, (r) => `${block(r)}\n\nNeutral-role candidate: **${r.expectedName}** (\`${r.expected}\`).`));
report.push(section('N. All remaining unmarked standalone dialogue', findings.unmarkedStandalone, block, 3000));
report.push(section('O. Unmarked ASCII-quoted text candidates', findings.unmarkedAsciiQuote, block, 1000));

writeFileSync('docs/dialogue-audit/FULL_REPO_POST160_AUDIT_V2.md', report.join('\n').replace(/\n+$/u, '') + '\n');
writeFileSync('docs/dialogue-audit/FULL_REPO_POST160_COUNTS_V2.json', JSON.stringify({
  totals: { seasons: seasonSources.length, episodes: totalEpisodes, paragraphs: totalParagraphs, markers: totalMarkers, quoteParagraphs: totalQuoteParagraphs },
  counts: Object.fromEntries(Object.entries(findings).map(([k, rows]) => [k, rows.length])),
  summary,
}, null, 2) + '\n');
console.log(JSON.stringify({ totals: { seasons: seasonSources.length, episodes: totalEpisodes, paragraphs: totalParagraphs, markers: totalMarkers, quoteParagraphs: totalQuoteParagraphs }, counts: Object.fromEntries(Object.entries(findings).map(([k, rows]) => [k, rows.length])) }, null, 2));
