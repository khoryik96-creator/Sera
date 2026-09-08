import { readdirSync, readFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

const outDir = 'docs/dialogue-audit/older-residual-review';
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

function standalone(p) {
  const t = p.trim();
  return !t.startsWith('[[speaker:') && (/^“[\s\S]+”[.!?…]?$/u.test(t) || /^"[\s\S]+"[.!?…]?$/.test(t));
}
function show(p) { return p.replace(/\[\[speaker:([a-z0-9_]+)\]\]/g, '[$1] '); }
let grand = 0;
const index = [];
for (const file of readdirSync('src/data/seasons').filter((f) => /^season-\d{3}\.json$/.test(f)).sort()) {
  const season = Number(file.match(/(\d{3})/)[1]);
  const episodes = JSON.parse(readFileSync(`src/data/seasons/${file}`, 'utf8'));
  const rows = [];
  let n = 0;
  for (const ep of episodes) {
    const paras = String(ep.text || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    const candidates = paras.map((p, i) => ({ p, i })).filter(({ p }) => standalone(p));
    if (!candidates.length) continue;
    rows.push(`## ${ep.ep} — ${ep.title}\n`);
    for (const { p, i } of candidates) {
      n++; grand++;
      rows.push(`### R${String(n).padStart(2, '0')} · paragraph ${i + 1}`);
      rows.push('```text');
      for (let j = Math.max(0, i - 4); j < i; j++) rows.push(`-${i - j}: ${show(paras[j])}`);
      rows.push(`>>> ${show(p)}`);
      for (let j = i + 1; j <= Math.min(paras.length - 1, i + 3); j++) rows.push(`+${j - i}: ${show(paras[j])}`);
      rows.push('```', '');
    }
  }
  if (!n) continue;
  index.push({ season, count: n });
  writeFileSync(`${outDir}/season-${String(season).padStart(3, '0')}.md`, `# Season ${season} — older unmarked standalone dialogue\n\nCount: **${n}**\n\n${rows.join('\n').replace(/\n+$/u, '')}\n`);
}
writeFileSync(`${outDir}/INDEX.md`, `# Older-season residual dialogue review\n\nTotal: **${grand}** unmarked standalone lines across Seasons 1–94.\n\n${index.map((x) => `- Season ${x.season}: ${x.count}`).join('\n')}\n`);
console.log({ grand, index });
