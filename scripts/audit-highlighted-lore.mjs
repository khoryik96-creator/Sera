import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
const registrySource = fs.readFileSync('src/characterRegistry.ts', 'utf8');

const parseQuoted = (value = '') => [...value.matchAll(/'([^']+)'/g)].map((match) => match[1]);
const registry = [];
const entryPattern = /\{\s*key:\s*'([^']+)',\s*displayName:\s*'([^']+)',\s*colorKey:\s*'([^']+)',\s*aliases:\s*\[([^\]]*)\](?:,\s*speakerKeys:\s*\[([^\]]*)\])?(?:,\s*currentRank:\s*'([^']+)')?\s*\}/g;
for (const match of registrySource.matchAll(entryPattern)) {
  registry.push({ key: match[1], displayName: match[2], aliases: parseQuoted(match[4]), speakerKeys: parseQuoted(match[5] || '') });
}

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
  const firstWith = (field) => castRows.find((row) => String(row[field] || '').trim())?.[field]?.trim?.() || '';

  const strength = profile?.cultivation?.trim()
    || arcFigure?.strength?.trim()
    || firstWith('strength')
    || former?.strength?.trim()
    || strengthFrom([arcFigure?.subtitle, arcFigure?.affiliationRole, arcFigure?.details, ...castRows.flatMap((row) => [row.role, row.description]), former?.summary]);
  const affiliation = profile?.affiliation?.trim()
    || arcFigure?.affiliation?.trim()
    || firstWith('affiliation')
    || inferAffiliation(entry.displayName)
    || (former ? 'Historical ranking archive' : '');
  const role = profile?.affiliationRole?.trim()
    || arcFigure?.affiliationRole?.trim()
    || firstWith('affiliationRole')
    || cleanRole(castRows[0]?.role || '')
    || former?.title?.trim()
    || '';
  const summary = profile?.subtitle || arcFigure?.subtitle || castRows.find((row) => row.description?.trim())?.description || former?.summary || '';

  const missing = [];
  if (!strength) missing.push('strength');
  if (!affiliation) missing.push('affiliation');
  if (!role) missing.push('role');
  if (!summary) missing.push('summary');
  return { name: entry.displayName, usedSeasons, missing };
});

const used = results.filter((row) => row.usedSeasons.length);
const incomplete = used.filter((row) => row.missing.length);
console.log(`Highlighted lore completeness: ${used.length - incomplete.length}/${used.length} used highlighted characters complete.`);
if (incomplete.length) {
  for (const row of incomplete) console.error(`${row.name}: missing ${row.missing.join(', ')} (used S${row.usedSeasons.join(', S')})`);
  process.exitCode = 1;
} else {
  console.log('All highlighted names used in prose resolve Strength, Affiliation, Role and Summary.');
}
