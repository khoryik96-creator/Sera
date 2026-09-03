import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
const registrySource = fs.readFileSync('src/characterRegistry.ts', 'utf8');

const registry = [];
const entryPattern = /\{\s*key:\s*'([^']+)',\s*displayName:\s*'([^']+)',\s*colorKey:\s*'([^']+)',\s*aliases:\s*\[([^\]]*)\](?:,\s*speakerKeys:\s*\[([^\]]*)\])?(?:,\s*currentRank:\s*'([^']+)')?\s*\}/g;
for (const match of registrySource.matchAll(entryPattern)) {
  registry.push({ key: match[1], displayName: match[2], currentRank: match[6] || '' });
}

const STRENGTH_PATTERN = /\b(?:(?:Entry|Established|Stable|Low|Mid|High|Peak)\s+(?:Paragon|Sovereign|Duke|Marquis|Grandmaster|Master)|Paragon|Sovereign|Duke|Marquis|Grandmaster|High Master|Master|Overlord|Ancient King|Calamity)\b/i;
const affiliations = [
  [/\bDuskvein\b/i, 'Duskvein Guild — Isgard'],
  [/\bVeyrhald\b/i, 'Veyrhald — Unbroken Banner, Isgard'],
  [/\bDravaryn\b/i, 'Dravaryn — Crimson Vanguard, Isgard'],
  [/\bSkeldran\b/i, 'Skeldran — Thousandfold Hunt, Isgard'],
  [/\bEirholt\b/i, 'Eirholt — Winter Physicians, Isgard'],
  [/\bKharvorn\b/i, 'Kharvorn — Isgard'],
  [/\bSolvane\b/i, 'Solvane — Isgard'],
  [/\bVardrenn\b/i, 'Vardrenn — Isgard'],
  [/\bNorrvek\b/i, 'Norrvek — Isgard'],
  [/\bYsmark\b/i, 'Ysmark — Isgard'],
  [/\bHaldren\b/i, 'Haldren — Isgard'],
];

function cleanName(name = '') { return name.replace(/^(?:Former\s+)?#\d+\s*-\s*/i, '').trim(); }
function strengthFrom(values) {
  for (const value of values) {
    const match = value?.match(STRENGTH_PATTERN)?.[0];
    if (match) return match;
  }
  return '';
}
function cleanRole(value = '') {
  const strength = value.match(STRENGTH_PATTERN)?.[0];
  const withoutStrength = strength ? value.replace(strength, '') : value;
  return withoutStrength.replace(/^[\s·•|—,:;-]+/, '').replace(/[\s·•|—,:;-]+$/, '').replace(/\s{2,}/g, ' ').trim();
}
function inferAffiliation(name) {
  for (const [pattern, affiliation] of affiliations) if (pattern.test(name)) return affiliation;
  return '';
}

const allSeasonRows = Object.entries(data.seasonCast || {}).flatMap(([season, rows]) =>
  (rows || []).map((row) => ({ season: Number(season), ...row }))
);

const results = registry.map((entry) => {
  const profile = data.characters?.[entry.key];
  const arcFigure = (data.arcFigures || []).find((figure) => figure.key === entry.key || cleanName(figure.name) === entry.displayName);
  const former = (data.former || []).find((row) => cleanName(row.name) === entry.displayName);
  const castRows = allSeasonRows.filter((row) => cleanName(row.name) === entry.displayName);
  const cast = castRows[0];

  const strength = profile?.cultivation?.trim()
    || strengthFrom([arcFigure?.subtitle, arcFigure?.affiliationRole, cast?.role, arcFigure?.details, cast?.description, former?.summary]);
  const affiliation = profile?.affiliation?.trim()
    || arcFigure?.affiliation?.trim()
    || inferAffiliation(entry.displayName)
    || (former ? 'Historical ranking archive' : '');
  const role = profile?.affiliationRole?.trim()
    || arcFigure?.affiliationRole?.trim()
    || cleanRole(cast?.role || '')
    || former?.title?.trim()
    || '';
  const summary = profile?.subtitle || arcFigure?.subtitle || cast?.description || former?.summary || '';

  const missing = [];
  if (!strength) missing.push('strength');
  if (!affiliation) missing.push('affiliation');
  if (!role) missing.push('role');
  if (!summary) missing.push('summary');

  return {
    key: entry.key,
    name: entry.displayName,
    rank: entry.currentRank || 'outside numeric ranking / no registry rank',
    sources: [profile && 'characters', arcFigure && 'arcFigures', former && 'former', castRows.length && `seasonCast(${castRows.map(r => `S${r.season}`).join(',')})`].filter(Boolean),
    resolved: { strength: strength || null, affiliation: affiliation || null, role: role || null, summary: summary || null },
    missing,
  };
});

const incomplete = results.filter((row) => row.missing.length);
const complete = results.filter((row) => !row.missing.length);
const noRichSource = results.filter((row) => !row.sources.length);

console.log('HIGHLIGHTED_LORE_AUDIT_BEGIN');
console.log(JSON.stringify({
  totals: { highlighted: results.length, complete: complete.length, incomplete: incomplete.length, noRichSource: noRichSource.length },
  incomplete,
  noRichSource,
}, null, 2));
console.log('HIGHLIGHTED_LORE_AUDIT_END');
