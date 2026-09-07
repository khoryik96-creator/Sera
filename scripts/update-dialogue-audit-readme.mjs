import { readFile, writeFile } from 'node:fs/promises';

const counts = new Map();
for (let season = 95; season <= 114; season++) {
  const p = `docs/dialogue-audit/season-${String(season).padStart(3, '0')}.md`;
  const text = await readFile(p, 'utf8');
  const m = text.match(/\n(\d+) quoted lines in this season have no speaker\./);
  if (!m) throw new Error(`Cannot read count from ${p}`);
  counts.set(season, Number(m[1]));
}
const total = [...counts.values()].reduce((a,b) => a+b, 0);
let readme = await readFile('docs/dialogue-audit/README.md', 'utf8');
readme = readme.replace(/\*\*\d+ quoted lines now have no speaker name\.\*\*/, `**${total} quoted lines now have no speaker name.**`);
for (const [season, count] of counts) {
  const re = new RegExp(`\\| Season ${season} \\| \\d+ \\|`);
  readme = readme.replace(re, `| Season ${season} | ${count} |`);
}
readme = readme.replace(/\| \*\*Total\*\* \| \*\*\d+\*\* \|/, `| **Total** | **${total}** |`);
await writeFile('docs/dialogue-audit/README.md', readme);
console.log(`Updated dialogue audit README counts: ${total} total.`);
console.log([...counts].map(([s,c]) => `s${s}:${c}`).join('  '));
