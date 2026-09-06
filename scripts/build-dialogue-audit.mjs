// Regenerates docs/dialogue-audit/: every final-arc line of dialogue that has
// no speaker, with surrounding context, so the speakers can be resolved by
// hand. Run: node scripts/build-dialogue-audit.mjs
import { writeFileSync, readFileSync } from 'node:fs';
import { loadFinalArcSeasons } from './final-arc-reader.mjs';

const seasons = await loadFinalArcSeasons();
const reg = readFileSync('src/characterRegistry.ts', 'utf8');
const keys = [];
for (const m of reg.matchAll(/\{ key: '([a-z0-9_]+)', displayName: '([^']+)'/g)) keys.push(`${m[1]} = ${m[2]}`);

let grand = 0;
const index = [];

for (const [seasonKey, eps] of Object.entries(seasons)) {
  const n = Number(seasonKey.replace('season', ''));
  const lines = [];
  let count = 0;

  for (const ep of eps) {
    const paras = ep.text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    const items = [];
    for (let i = 0; i < paras.length; i++) {
      const p = paras[i];
      if (p.startsWith('[[speaker:')) continue;
      if (!/^“/.test(p) || !/”[.!?…]?$/u.test(p)) continue;   // standalone quote, unlabelled
      const before = paras.slice(Math.max(0, i - 3), i);
      const after = paras.slice(i + 1, i + 3);
      items.push({ i, p, before, after });
      count++;
    }
    if (!items.length) continue;
    lines.push(`\n### ${ep.ep} — ${ep.title}\n`);
    for (const it of items) {
      lines.push('```');
      for (const b of it.before) lines.push(b.replace(/\[\[speaker:([a-z0-9_]+)\]\]/g, '[$1] '));
      lines.push(`>>> ${it.p}   <-- WHO SAYS THIS?`);
      for (const a of it.after) lines.push(a.replace(/\[\[speaker:([a-z0-9_]+)\]\]/g, '[$1] '));
      lines.push('```');
    }
  }

  grand += count;
  index.push({ n, count });
  const header = `# Season ${n} — unattributed dialogue

${count} quoted lines in this season have no speaker.
See \`README.md\` in this folder for what to do with them.

Lines already resolved show their speaker in \`[brackets]\` for context.
`;
  writeFileSync(`docs/dialogue-audit/season-${String(n).padStart(3, '0')}.md`, header + lines.join('\n') + '\n');
}

console.log('total unattributed lines:', grand);
console.log(index.map(x => `s${x.n}:${x.count}`).join('  '));
