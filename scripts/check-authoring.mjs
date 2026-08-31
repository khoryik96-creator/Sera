// Authoring lint for src/data.json chapter prose. Reports the rendering-contract
// issues that stop names and skills from styling in the reader, or that make a
// new character inherit an existing character's colour. Non-blocking by default;
// pass --strict to exit non-zero when hard issues are found (CI use).
//
// Run: npm run check:authoring   (add --strict to fail on hard issues)

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(await readFile(resolve(root, 'src/data.json'), 'utf8'));
const registrySrc = await readFile(resolve(root, 'src/characterRegistry.ts'), 'utf8');

// --- Registry facts (parsed from the TS source, no build step needed) -------
const speakerKeys = new Set();
const aliases = new Set();
const bareAliases = new Set();
const neutralKeys = new Set();
for (const m of registrySrc.matchAll(/\{ key: '([a-z_]+)',[^\n]*aliases: \[([^\]]+)\](?:, speakerKeys: \[([^\]]+)\])?/g)) {
  for (const a of m[2].matchAll(/'([^']+)'/g)) { aliases.add(a[1]); if (!a[1].includes(' ')) bareAliases.add(a[1]); }
  for (const s of (m[3] || m[1]).matchAll(/'([^']+)'/g)) speakerKeys.add(s[1]);
  speakerKeys.add(m[1]);
}
const neutralBlock = registrySrc.match(/neutralSpeakerNames[^{]*\{([\s\S]*?)\}/);
if (neutralBlock) for (const k of neutralBlock[1].matchAll(/(\w+):/g)) { speakerKeys.add(k[1]); neutralKeys.add(k[1]); }

// --- Known art names, normalised for tolerant comparison -------------------
const artNames = new Set();
for (const rows of Object.values(data.topSkills || {})) for (const r of rows) artNames.add(r.name);
for (const r of [...(data.rhenSkills || []), ...(data.seraSkills || [])]) artNames.add(r.name);
const norm = (s) => s.toLowerCase().replace(/[‘’']/g, "'").replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// The reader matches an art name case-sensitively, tolerating only straight vs
// curly apostrophes (see annotateArtNames in src/novel.ts). Mirror that here.
const rendererRe = (name) => new RegExp('\\b' + escRe(name).replace(/[’']/g, "['’]") + '\\b');
// A following honorific/relationship word means the bare name really is the
// registry character being addressed by title — the reader highlights it fine.
const honorifics = new Set(['Teacher', 'Master', 'Mother', 'Father', 'Sister', 'Brother', 'Elder', 'Sovereign', 'Lord', 'Lady', 'Aunt', 'Uncle', 'Sir', 'Madam', 'Miss', 'Doctor', 'Physician', 'General', 'Captain', 'Commander', 'Governor', 'Grandmother', 'Grandfather', 'Senior', 'Junior']);

const seasonKeys = Object.keys(data).filter((k) => /^season\d+$/.test(k));
const corpus = seasonKeys.flatMap((k) => data[k].map((ep) => String(ep.text || ''))).join('\n');
// Drop the ALLCAPS "TIER — NAME" callouts: those style via annotateSkills, not
// the inline art path, so an art appearing only there is not a near-miss.
const calloutRe = /(SUPREME PASSIVE ART|SUPREME ART|TRANSCENDED SKILL|TRANSCENDED ART|ULTIMATE ART)\s*[—-]\s*[^\n]+/gi;
const artCorpus = corpus.replace(calloutRe, ' ');
const normCorpus = norm(artCorpus);

const unknownSpeakers = new Map();
const collisionCompounds = new Map();
for (const key of seasonKeys) {
  for (const ep of data[key]) {
    const text = String(ep.text || '');
    for (const m of text.matchAll(/\[\[speaker:([^\]]+)\]\]/g)) {
      const k = m[1].trim();
      if (!speakerKeys.has(k)) unknownSpeakers.set(k, (unknownSpeakers.get(k) || 0) + 1);
    }
    for (const bare of bareAliases) {
      for (const m of text.matchAll(new RegExp('\\b' + bare + '\\s+([A-Z][a-z]+)', 'g'))) {
        const full = `${bare} ${m[1]}`;
        if (!aliases.has(full) && !honorifics.has(m[1])) collisionCompounds.set(full, (collisionCompounds.get(full) || 0) + 1);
      }
    }
  }
}

// Arts that are mentioned in the prose (normalised) but would NOT style in the
// reader — the "skill not highlighted" bug, e.g. a wrong-case or dash variant.
const artNearMisses = [...artNames].filter((name) => normCorpus.includes(norm(name)) && !rendererRe(name).test(artCorpus));

// --- Report ----------------------------------------------------------------
let hardIssues = 0;
const line = (s = '') => process.stdout.write(s + '\n');
line('Authoring check — src/data.json prose\n');

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
line('   referred to by the bare shared name alone, tell Claude so a season cutoff is added');
line('   (see aliasLastSeason in src/novel.ts), otherwise they inherit the original\'s badge.');
const coll = [...collisionCompounds].sort((a, b) => b[1] - a[1]).slice(0, 40);
if (coll.length) for (const [p, n] of coll) line(`   • "${p}" ×${n}`);
else line('   ✓ none detected');
line();

line(`Reference — bare names that are auto-highlighted (do not reuse for a different character): ${[...bareAliases].sort().join(', ')}`);

const strict = process.argv.includes('--strict');
if (strict && hardIssues) { line(`\n${hardIssues} hard issue(s) found.`); process.exit(1); }
