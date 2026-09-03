import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
const registrySource = fs.readFileSync('src/characterRegistry.ts', 'utf8');

const parseQuoted = (value = '') => [...value.matchAll(/'([^']+)'/g)].map((m) => m[1]);
const registry = [];
const entryPattern = /\{\s*key:\s*'([^']+)',\s*displayName:\s*'([^']+)',\s*colorKey:\s*'([^']+)',\s*aliases:\s*\[([^\]]*)\](?:,\s*speakerKeys:\s*\[([^\]]*)\])?(?:,\s*currentRank:\s*'([^']+)')?\s*\}/g;
for (const match of registrySource.matchAll(entryPattern)) registry.push({ key: match[1], displayName: match[2], aliases: parseQuoted(match[4]), speakerKeys: parseQuoted(match[5] || '') });

const STRENGTH_PATTERN = /\b(?:(?:Entry|Established|Stable|Low|Mid|High|Peak)\s+(?:Paragon|Sovereign|Duke|Marquis|Grandmaster|Master)|Paragon|Sovereign|Duke|Marquis|Grandmaster|High Master|Master|Overlord|Ancient King|Calamity)\b/i;
const affiliations = [
  [/\bDuskvein\b/i, 'Duskvein Guild — Isgard'], [/\bVeyrhald\b/i, 'Veyrhald — Unbroken Banner, Isgard'],
  [/\bDravaryn\b/i, 'Dravaryn — Crimson Vanguard, Isgard'], [/\bSkeldran\b/i, 'Skeldran — Thousandfold Hunt, Isgard'],
  [/\bEirholt\b/i, 'Eirholt — Winter Physicians, Isgard'], [/\bKharvorn\b/i, 'Kharvorn — Isgard'],
  [/\bSolvane\b/i, 'Solvane — Isgard'], [/\bVardrenn\b/i, 'Vardrenn — Isgard'],
  [/\bNorrvek\b/i, 'Norrvek — Isgard'], [/\bYsmark\b/i, 'Ysmark — Isgard'], [/\bHaldren\b/i, 'Haldren — Isgard'],
];
function cleanName(name = '') { return name.replace(/^(?:Former\s+)?#\d+\s*-\s*/i, '').trim(); }
function strengthFrom(values) { for (const value of values) { const match = value?.match(STRENGTH_PATTERN)?.[0]; if (match) return match; } return ''; }
function cleanRole(value = '') { const strength = value.match(STRENGTH_PATTERN)?.[0]; return (strength ? value.replace(strength, '') : value).replace(/^[\s·•|—,:;-]+/, '').replace(/[\s·•|—,:;-]+$/, '').replace(/\s{2,}/g, ' ').trim(); }
function inferAffiliation(name) { for (const [pattern, affiliation] of affiliations) if (pattern.test(name)) return affiliation; return ''; }
function escaped(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

const seasonEntries = Object.entries(data).filter(([key]) => /^season\d+$/.test(key));
function proseUsage(entry) {
  const seasons = [];
  for (const [key, episodes] of seasonEntries) {
    const season = Number(key.slice(6));
    const source = (episodes || []).map((ep) => `${ep.title || ''}\n${ep.text || ''}`).join('\n');
    const speakerHit = (entry.speakerKeys.length ? entry.speakerKeys : [entry.key]).some((speaker) => source.includes(`[[speaker:${speaker}]]`));
    const aliasHit = entry.aliases.some((alias) => new RegExp(`(^|[^A-Za-z])${escaped(alias)}([^A-Za-z]|$)`).test(source));
    if (speakerHit || aliasHit) seasons.push(season);
  }
  return seasons;
}

const allSeasonRows = Object.entries(data.seasonCast || {}).flatMap(([season, rows]) => (rows || []).map((row) => ({ season: Number(season), ...row })));
const results = registry.map((entry) => {
  const usedSeasons = proseUsage(entry);
  const profile = data.characters?.[entry.key];
  const arcFigure = (data.arcFigures || []).find((figure) => figure.key === entry.key || cleanName(figure.name) === entry.displayName);
  const former = (data.former || []).find((row) => cleanName(row.name) === entry.displayName);
  const castRows = allSeasonRows.filter((row) => cleanName(row.name) === entry.displayName);
  const cast = castRows[0];
  const strength = profile?.cultivation?.trim() || strengthFrom([arcFigure?.subtitle, arcFigure?.affiliationRole, cast?.role, arcFigure?.details, cast?.description, former?.summary]);
  const affiliation = profile?.affiliation?.trim() || arcFigure?.affiliation?.trim() || inferAffiliation(entry.displayName) || (former ? 'Historical ranking archive' : '');
  const role = profile?.affiliationRole?.trim() || arcFigure?.affiliationRole?.trim() || cleanRole(cast?.role || '') || former?.title?.trim() || '';
  const summary = profile?.subtitle || arcFigure?.subtitle || cast?.description || former?.summary || '';
  const missing = [];
  if (!strength) missing.push('strength'); if (!affiliation) missing.push('affiliation'); if (!role) missing.push('role'); if (!summary) missing.push('summary');
  return { key: entry.key, name: entry.displayName, usedSeasons, sources: [profile && 'characters', arcFigure && 'arcFigures', former && 'former', castRows.length && `seasonCast(${castRows.map(r => `S${r.season}`).join(',')})`].filter(Boolean), strength, affiliation, role, summary, missing };
});

const used = results.filter((row) => row.usedSeasons.length);
const incomplete = used.filter((row) => row.missing.length);
const noRichSource = used.filter((row) => !row.sources.length);
const unusedRegistry = results.filter((row) => !row.usedSeasons.length);
console.log(`TOTAL registry=${results.length} usedInProse=${used.length} completeUsed=${used.length - incomplete.length} incompleteUsed=${incomplete.length} usedNoRichSource=${noRichSource.length} unusedRegistry=${unusedRegistry.length}`);
console.log('INCOMPLETE_USED_BEGIN');
for (const row of incomplete) console.log(`${row.name}\tused=S${row.usedSeasons.join(',S')}\tmissing=${row.missing.join(',')}\tstrength=${row.strength || '-'}\taffiliation=${row.affiliation || '-'}\trole=${row.role || '-'}\tsources=${row.sources.join('+') || '-'}`);
console.log('INCOMPLETE_USED_END');
console.log('USED_NO_RICH_SOURCE=' + noRichSource.map((row) => row.name).join(' | '));
console.log('UNUSED_REGISTRY=' + unusedRegistry.map((row) => row.name).join(' | '));
