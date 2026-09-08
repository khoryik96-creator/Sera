import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const registrySource = readFileSync('src/characterRegistry.ts', 'utf8');
const registry = [];
for (const line of registrySource.split('\n')) {
  const m = line.match(/\{ key: '([^']+)', displayName: '([^']+)', colorKey: '([^']+)', aliases: \[([^\]]*)\](?:, speakerKeys: \[([^\]]*)\])?/);
  if (!m) continue;
  const parseStrings = (raw) => [...raw.matchAll(/'([^']+)'/g)].map((x) => x[1]);
  const key = m[1];
  const aliases = parseStrings(m[4]);
  const speakerKeys = m[5] ? parseStrings(m[5]) : [key];
  registry.push({ key, displayName: m[2], colorKey: m[3], aliases, speakerKeys });
}

const speakerToEntry = new Map();
for (const entry of registry) for (const key of entry.speakerKeys) speakerToEntry.set(key, entry);
const knownSpeakerKeys = new Set(speakerToEntry.keys());

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
  'told', 'admitted', 'said softly', 'said quietly', 'said flatly', 'said simply', 'said again',
  'said at last', 'said finally', 'said after a moment', 'said after a pause', 'said under his breath',
  'said under her breath', 'said without looking', 'said without turning', 'said without looking up',
  'said without looking away', 'said from behind', 'said from the doorway', 'said beside him',
  'said beside her', 'said dryly', 'said carefully', 'said gently', 'said evenly', 'said coldly',
  'said calmly', 'said sharply', 'said immediately', 'said eventually', 'said aloud', 'said instead',
  'said nothing and then said', 'spoke', 'breathed', 'growled', 'hissed', 'declared', 'announced',
  'insisted', 'protested', 'explained', 'confirmed', 'agreed', 'objected', 'corrected', 'responded'
];
const verbPattern = speechVerbs.map((v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const nameBoundary = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[’']/g, "[’']");

function stripSpeakerMarker(line) {
  return line.replace(/^\[\[speaker:[a-z0-9_]+\]\]/, '');
}
function stripQuotes(text) {
  return text.replace(/“[^”]*”/gu, ' ').replace(/"[^"]*"/g, ' ');
}
function quoteCount(text) {
  return [...text.matchAll(/“[^”]*”/gu)].length + [...text.matchAll(/"[^"]*"/g)].length;
}
function hasDialogueQuote(text) {
  return /“[^”]+”/u.test(text) || /"[^"]+"/.test(text);
}
function isStandaloneDialogue(text) {
  const t = text.trim();
  return /^“[\s\S]+”[.!?…]?$/u.test(t) || /^"[\s\S]+"[.!?…]?$/.test(t);
}
function explicitNamedAttributions(text) {
  const outside = stripQuotes(text);
  const hits = [];
  for (const row of aliasRows) {
    const re1 = new RegExp(`(?:^|[^\\p{L}])${nameBoundary(row.alias)}(?:[^\\p{L}]|$)[^.!?\\n]{0,55}\\b(?:${verbPattern})\\b`, 'iu');
    const re2 = new RegExp(`\\b(?:${verbPattern})\\b[^.!?\\n]{0,28}(?:^|[^\\p{L}])${nameBoundary(row.alias)}(?:[^\\p{L}]|$)`, 'iu');
    if (re1.test(outside) || re2.test(outside)) hits.push(row);
  }
  const seen = new Set();
  return hits.filter((h) => !seen.has(h.key) && seen.add(h.key));
}
function namedMentions(text) {
  const outside = stripQuotes(text);
  const hits = [];
  for (const row of aliasRows) {
    const re = new RegExp(`(?:^|[^\\p{L}])${nameBoundary(row.alias)}(?:[^\\p{L}]|$)`, 'iu');
    if (re.test(outside)) hits.push(row);
  }
  const seen = new Set();
  return hits.filter((h) => !seen.has(h.key) && seen.add(h.key));
}
function pronounAttribution(text) {
  const outside = stripQuotes(text);
  return new RegExp(`\\b(?:he|she|they)\\s+(?:${verbPattern})\\b|\\b(?:${verbPattern})\\s+(?:he|she|they)\\b`, 'iu').test(outside);
}
function roleAttribution(text) {
  const outside = stripQuotes(text);
  return new RegExp(`\\b(?:the|an?|one)\\s+[a-z][a-z -]{1,35}\\s+(?:${verbPattern})\\b`, 'iu').test(outside);
}
function strongActionCue(text) {
  return /\b(?:looked|glanced|stared|nodded|shook|smiled|sighed|leaned|turned|frowned|grimaced|blinked|exhaled|inhaled|laughed|mouth|lips|voice|eyes|brow|expression|jaw|shoulders|raised (?:his|her|their) hand|lowered (?:his|her|their) hand|folded (?:his|her|their) arms|tilted (?:his|her|their) head|closed (?:his|her|their) eyes|opened (?:his|her|their) eyes)\b/i.test(text);
}
function sourceHint(season) {
  return season >= 95 ? `docs/prose/FINAL_ARC_SEASON${String(season).padStart(3, '0')}_PROSE_DRAFT*.md` : `src/data/seasons/season-${String(season).padStart(3, '0')}.json`;
}
function compact(text, max = 240) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}
function contextLabel(season, ep, idx) {
  return `S${season} ${ep.ep || '?'} P${idx + 1}`;
}

const findings = {
  malformedMarkers: [],
  unknownMarkers: [],
  markedNoQuote: [],
  markedExplicitMismatch: [],
  markedMultipleSpeakerRisk: [],
  markedAsciiMixedRisk: [],
  unmarkedExplicitNamed: [],
  unmarkedPronoun: [],
  unmarkedActionCue: [],
  unmarkedStandalone: [],
  asciiQuoteCandidates: [],
};
const seasonSummary = [];
let totalEpisodes = 0;
let totalParagraphs = 0;
let totalMarkers = 0;
let totalQuoteParagraphs = 0;

const seasonFiles = readdirSync('src/data/seasons').filter((f) => /^season-\d{3}\.json$/.test(f)).sort();
for (const file of seasonFiles) {
  const season = Number(file.match(/(\d{3})/)[1]);
  const episodes = JSON.parse(readFileSync(`src/data/seasons/${file}`, 'utf8'));
  totalEpisodes += episodes.length;
  let markers = 0;
  let unmarkedStandalone = 0;
  let explicitNamed = 0;
  let pronoun = 0;
  let actionCue = 0;
  let quoteParas = 0;

  for (const ep of episodes) {
    const paras = String(ep.text || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    totalParagraphs += paras.length;
    for (let i = 0; i < paras.length; i++) {
      const p = paras[i];
      const lines = p.split('\n');
      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        const allMarkers = [...line.matchAll(/\[\[speaker:([^\]]+)\]\]/g)];
        if (allMarkers.length) {
          for (const m of allMarkers) {
            if (m.index !== 0) findings.malformedMarkers.push({ season, ep, para: i, line: li, key: m[1], text: line, source: sourceHint(season) });
            if (!knownSpeakerKeys.has(m[1])) findings.unknownMarkers.push({ season, ep, para: i, line: li, key: m[1], text: line, source: sourceHint(season) });
          }
          if (allMarkers.length > 1) findings.malformedMarkers.push({ season, ep, para: i, line: li, key: allMarkers.map((m) => m[1]).join(','), text: line, source: sourceHint(season), note: 'multiple markers on one line' });
        }
      }

      const marker = p.match(/^\[\[speaker:([a-z0-9_]+)\]\]/);
      const body = marker ? stripSpeakerMarker(p) : p;
      const quotes = quoteCount(body);
      if (quotes > 0) { quoteParas++; totalQuoteParagraphs++; }

      if (marker) {
        markers++; totalMarkers++;
        const key = marker[1];
        if (!hasDialogueQuote(body)) findings.markedNoQuote.push({ season, ep, para: i, key, text: p, source: sourceHint(season) });
        const explicit = explicitNamedAttributions(body);
        if (explicit.length === 1 && explicit[0].key !== key) {
          findings.markedExplicitMismatch.push({ season, ep, para: i, key, expected: explicit[0].key, expectedName: explicit[0].displayName, text: p, source: sourceHint(season) });
        }
        if (quotes >= 2 && explicit.length >= 2) {
          findings.markedMultipleSpeakerRisk.push({ season, ep, para: i, key, explicit: explicit.map((x) => `${x.key}:${x.displayName}`), text: p, source: sourceHint(season) });
        }
        if (/"[^"]+"/.test(body) && stripQuotes(body).trim()) {
          findings.markedAsciiMixedRisk.push({ season, ep, para: i, key, text: p, source: sourceHint(season), note: 'ASCII quotes in mixed marked paragraph cause whole body to be bolded by current renderer' });
        }
        continue;
      }

      if (!hasDialogueQuote(p)) continue;
      const explicit = explicitNamedAttributions(p);
      if (explicit.length === 1) {
        explicitNamed++;
        findings.unmarkedExplicitNamed.push({ season, ep, para: i, expected: explicit[0].key, expectedName: explicit[0].displayName, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '', source: sourceHint(season) });
      } else if (pronounAttribution(p)) {
        pronoun++;
        findings.unmarkedPronoun.push({ season, ep, para: i, mentions: namedMentions(p).map((x) => `${x.key}:${x.displayName}`), text: p, before: paras[i - 1] || '', after: paras[i + 1] || '', source: sourceHint(season) });
      }

      if (/"[^"]+"/.test(p)) findings.asciiQuoteCandidates.push({ season, ep, para: i, text: p, source: sourceHint(season) });

      if (isStandaloneDialogue(p)) {
        unmarkedStandalone++;
        findings.unmarkedStandalone.push({ season, ep, para: i, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '', source: sourceHint(season) });
        const beforeMentions = namedMentions(paras[i - 1] || '');
        if (beforeMentions.length === 1 && strongActionCue(paras[i - 1] || '')) {
          actionCue++;
          findings.unmarkedActionCue.push({ season, ep, para: i, expected: beforeMentions[0].key, expectedName: beforeMentions[0].displayName, text: p, before: paras[i - 1] || '', after: paras[i + 1] || '', source: sourceHint(season) });
        }
      }
    }
  }
  seasonSummary.push({ season, episodes: episodes.length, markers, quoteParas, unmarkedStandalone, explicitNamed, pronoun, actionCue });
}

function section(title, rows, formatter, limit = 5000) {
  const out = [`## ${title}`, '', `Count: **${rows.length}**`, ''];
  if (!rows.length) return out.join('\n');
  const shown = rows.slice(0, limit);
  for (const row of shown) out.push(formatter(row), '');
  if (rows.length > limit) out.push(`_Truncated: showing ${limit} of ${rows.length}._`, '');
  return out.join('\n');
}
function ctx(row) {
  return `**${contextLabel(row.season, row.ep, row.para)}** — source: \`${row.source}\``;
}
function block(row) {
  const lines = [];
  if (row.before) lines.push(`before: ${compact(row.before)}`);
  lines.push(`>>> ${compact(row.text, 400)}`);
  if (row.after) lines.push(`after: ${compact(row.after)}`);
  return `${ctx(row)}\n\n\`\`\`text\n${lines.join('\n')}\n\`\`\``;
}

const report = [];
report.push('# Full-repository dialogue attribution/highlight audit — post PR #160', '');
report.push(`Scanned **${seasonFiles.length} seasons**, **${totalEpisodes} episodes**, **${totalParagraphs} paragraphs**, **${totalMarkers} speaker markers**, and **${totalQuoteParagraphs} paragraphs containing quoted text**.`, '');
report.push('This is a candidate report, not an auto-fix list. High-confidence structural problems are separated from context candidates so anonymous dialogue is not accidentally named.', '');
report.push('## Summary by season', '');
report.push('| Season | Episodes | Markers | Quote paragraphs | Unmarked standalone | Explicit named unmarked | Pronoun unmarked | Action-cue standalone |');
report.push('|---:|---:|---:|---:|---:|---:|---:|---:|');
for (const x of seasonSummary) report.push(`| ${x.season} | ${x.episodes} | ${x.markers} | ${x.quoteParas} | ${x.unmarkedStandalone} | ${x.explicitNamed} | ${x.pronoun} | ${x.actionCue} |`);
report.push('');

report.push(section('A. Malformed marker placement / duplicate markers', findings.malformedMarkers, (r) => `${ctx(r)}\n\n- marker: \`${r.key}\`${r.note ? ` — ${r.note}` : ''}\n- text: ${compact(r.text, 500)}`));
report.push(section('B. Unknown speaker keys', findings.unknownMarkers, (r) => `${ctx(r)}\n\n- key: \`${r.key}\`\n- text: ${compact(r.text, 500)}`));
report.push(section('C. Existing marker but no dialogue quote', findings.markedNoQuote, (r) => `${ctx(r)}\n\n- key: \`${r.key}\`\n- text: ${compact(r.text, 500)}`));
report.push(section('D. Existing marker conflicts with explicit named attribution', findings.markedExplicitMismatch, (r) => `${ctx(r)}\n\n- existing: \`${r.key}\`\n- explicit prose points to: \`${r.expected}\` (${r.expectedName})\n- text: ${compact(r.text, 600)}`));
report.push(section('E. Marked paragraph may contain multiple named speakers', findings.markedMultipleSpeakerRisk, (r) => `${ctx(r)}\n\n- marker: \`${r.key}\`\n- explicit names: ${r.explicit.join(', ')}\n- text: ${compact(r.text, 700)}`));
report.push(section('F. Marked mixed paragraph uses ASCII quotes (renderer emphasis risk)', findings.markedAsciiMixedRisk, (r) => `${ctx(r)}\n\n- marker: \`${r.key}\`\n- ${r.note}\n- text: ${compact(r.text, 700)}`));
report.push(section('G. HIGH-VALUE: unmarked dialogue with one explicit named speech attribution', findings.unmarkedExplicitNamed, (r) => `${block(r)}\n\nExpected speaker candidate: **${r.expectedName}** (\`${r.expected}\`)`));
report.push(section('H. Unmarked mixed dialogue with pronoun speech attribution', findings.unmarkedPronoun, (r) => `${block(r)}\n\nNamed mentions in same paragraph: ${r.mentions.length ? r.mentions.join(', ') : '_none_'}`));
report.push(section('I. Unmarked standalone dialogue after a single named-character action cue', findings.unmarkedActionCue, (r) => `${block(r)}\n\nImmediate-action candidate: **${r.expectedName}** (\`${r.expected}\`)`));
report.push(section('J. All unmarked standalone dialogue (human-context pool)', findings.unmarkedStandalone, (r) => block(r), 2500));
report.push(section('K. ASCII-quoted unmarked candidates', findings.asciiQuoteCandidates, (r) => `${ctx(r)}\n\n- text: ${compact(r.text, 700)}`, 1000));

writeFileSync('docs/dialogue-audit/FULL_REPO_POST160_AUDIT.md', report.join('\n').replace(/\n+$/u, '') + '\n');
writeFileSync('docs/dialogue-audit/FULL_REPO_POST160_COUNTS.json', JSON.stringify({
  totals: { seasons: seasonFiles.length, episodes: totalEpisodes, paragraphs: totalParagraphs, markers: totalMarkers, quoteParagraphs: totalQuoteParagraphs },
  counts: Object.fromEntries(Object.entries(findings).map(([k, v]) => [k, v.length])),
  seasonSummary
}, null, 2) + '\n');

console.log(JSON.stringify({ totals: { seasons: seasonFiles.length, episodes: totalEpisodes, paragraphs: totalParagraphs, markers: totalMarkers, quoteParagraphs: totalQuoteParagraphs }, counts: Object.fromEntries(Object.entries(findings).map(([k, v]) => [k, v.length])) }, null, 2));
