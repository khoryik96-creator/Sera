// Authoring lint for reader prose. Reports rendering-contract issues that stop
// names and skills from styling, or that make a new character inherit an
// existing character's colour. The legacy archive lives in src/data.json while
// Seasons 95–114 are generated from docs/prose final-arc drafts.
//
// Run: npm run check:authoring   (add --strict to fail on hard issues)

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadFinalArcSeasons } from './final-arc-reader.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(await readFile(resolve(root, 'src/data.json'), 'utf8'));
const finalArc = await loadFinalArcSeasons();
const registrySrc = await readFile(resolve(root, 'src/characterRegistry.ts'), 'utf8');
const seasonData = {
  ...Object.fromEntries(Object.entries(data).filter(([key]) => /^season\d+$/.test(key))),
  ...finalArc,
};

// --- Registry facts (parsed from the TS source, no build step needed) -------
const speakerKeys = new Set();
const aliases = new Set();
const bareAliases = new Set();
const neutralKeys = new Set();
for (const m of registrySrc.matchAll(/\{ key: '([a-z0-9_]+)',[^\n]*aliases: \[([^\]]+)\](?:, speakerKeys: \[([^\]]+)\])?/g)) {
  for (const a of m[2].matchAll(/'([^']+)'/g)) { aliases.add(a[1]); if (!a[1].includes(' ')) bareAliases.add(a[1]); }
  const explicitSpeakers = m[3] ? [...m[3].matchAll(/'([^']+)'/g)].map((item) => item[1]) : [m[1]];
  for (const speaker of explicitSpeakers) speakerKeys.add(speaker);
  speakerKeys.add(m[1]);
}
const neutralBlock = registrySrc.match(/neutralSpeakerNames[^{]*\{([\s\S]*?)\}/);
if (neutralBlock) for (const k of neutralBlock[1].matchAll(/(\w+):/g)) { speakerKeys.add(k[1]); neutralKeys.add(k[1]); }

// --- Known art names, normalised for tolerant comparison -------------------
const artNames = new Set();
for (const rows of Object.values(data.topSkills || {})) for (const r of rows) artNames.add(r.name);
for (const r of [...(data.rhenSkills || []), ...(data.seraSkills || [])]) artNames.add(r.name);
for (const figure of data.arcFigures || []) {
  for (const skill of figure.skills || []) {
    if (/(supreme|transcended|ultimate)/i.test(skill[1] || '')) artNames.add(skill[0]);
  }
}
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rendererRe = (name) => new RegExp('\\b' + escRe(name).replace(/[’']/g, "['’]") + '\\b');
const looseRe = (name) => new RegExp(
  '\\b' + escRe(name).replace(/[’']/g, "['’]").replace(/[–—-]/g, '[–—-]').replace(/\s+/g, '\\s+') + '\\b',
  'gi',
);
const honorifics = new Set(['Teacher', 'Master', 'Mother', 'Father', 'Sister', 'Brother', 'Elder', 'Sovereign', 'Lord', 'Lady', 'Aunt', 'Uncle', 'Sir', 'Madam', 'Miss', 'Doctor', 'Physician', 'General', 'Captain', 'Commander', 'Governor', 'Grandmother', 'Grandfather', 'Senior', 'Junior']);

const seasonKeys = Object.keys(seasonData).sort((a, b) => Number(a.slice(6)) - Number(b.slice(6)));
const corpus = seasonKeys.flatMap((k) => seasonData[k].map((ep) => String(ep.text || ''))).join('\n');
const calloutRe = /(SUPREME PASSIVE ART|SUPREME ART|TRANSCENDED SKILL|TRANSCENDED ART|ULTIMATE ART)\s*[—-]\s*[^\n]+/gi;
const artCorpus = corpus.replace(calloutRe, ' ');

const unknownSpeakers = new Map();
const collisionCompounds = new Map();
for (const key of seasonKeys) {
  for (const ep of seasonData[key]) {
    const text = String(ep.text || '');
    for (const m of text.matchAll(/\[\[speaker:([^\]]+)\]\]/g)) {
      const k = m[1].trim();
      if (!speakerKeys.has(k)) unknownSpeakers.set(k, (unknownSpeakers.get(k) || 0) + 1);
    }
    for (const bare of bareAliases) {
      for (const m of text.matchAll(new RegExp('\\b' + escRe(bare) + '\\s+([A-Z][a-z]+)', 'g'))) {
        const full = `${bare} ${m[1]}`;
        if (!aliases.has(full) && !honorifics.has(m[1])) collisionCompounds.set(full, (collisionCompounds.get(full) || 0) + 1);
      }
    }
  }
}

const artNearMisses = [...artNames].filter((name) => {
  if (rendererRe(name).test(artCorpus)) return false;
  const matches = artCorpus.match(looseRe(name)) || [];
  return matches.some((m) => m !== m.toLowerCase() && m !== m.toUpperCase());
});

// --- Report ----------------------------------------------------------------
let hardIssues = 0;
const line = (s = '') => process.stdout.write(s + '\n');
line('Authoring check — legacy + generated final-arc prose\n');

line(`1. Dialogue speakers not in the character registry (${unknownSpeakers.size})`);
line('   These render as an uncoloured, capitalised fallback name.');
if (unknownSpeakers.size) { hardIssues += unknownSpeakers.size; for (const [k, n] of [...unknownSpeakers].sort((a, b) => b[1] - a[1])) line(`   ✗ [[speaker:${k}]] ×${n}  — add to characterRegistry.ts`); }
else line('   ✓ all speaker keys are registered');
line();

line(`2. Known arts mentioned in prose but written in a form the reader won't style (${artNearMisses.length})`);
line('   Usually a wrong-case or dash variant. Match the exact name in the skill data so it styles.');
if (artNearMisses.length) { hardIssues += artNearMisses.length; for (const a of artNearMisses) line(`   ✗ "${a}"`); }
else line('   ✓ every art mentioned in prose matches its skill-data name');
line();

line(`3. Possible new characters sharing an existing highlighted surname/given name (${collisionCompounds.size})`);
line('   These are left un-highlighted automatically. If the SAME new character is later');
line('   referred to by the bare shared name alone, add a season cutoff in novel.ts.');
const coll = [...collisionCompounds].sort((a, b) => b[1] - a[1]).slice(0, 40);
if (coll.length) for (const [p, n] of coll) line(`   • "${p}" ×${n}`);
else line('   ✓ none detected');
line();

line(`Reference — bare names that are auto-highlighted (do not reuse for a different character): ${[...bareAliases].sort().join(', ')}`);

const strict = process.argv.includes('--strict');
if (strict && hardIssues) { line(`\n${hardIssues} hard issue(s) found.`); process.exit(1); }
