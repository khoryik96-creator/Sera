import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const proseDir = resolve('docs/prose');
const sourceRe = /^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const chapterRe = /^## Chapter (\d+) — (.+)$/gm;
const files = (await readdir(proseDir))
  .filter((name) => sourceRe.test(name))
  .filter((name) => {
    const season = Number(sourceRe.exec(name)[1]);
    return season >= 95 && season <= 114;
  })
  .sort((a, b) => {
    const ma = sourceRe.exec(a); const mb = sourceRe.exec(b);
    return Number(ma[1]) - Number(mb[1]) || Number(ma[2] || 1) - Number(mb[2] || 1);
  });

const chapters = [];
for (const file of files) {
  const source = (await readFile(resolve(proseDir, file), 'utf8')).replace(/\r\n/g, '\n');
  const heads = [...source.matchAll(chapterRe)];
  for (let i = 0; i < heads.length; i++) {
    const h = heads[i];
    const start = h.index + h[0].length;
    const end = heads[i + 1]?.index ?? source.length;
    let body = source.slice(start, end).replace(/^---$/gm, '').trim();
    body = body.replace(/\n---\n[\s\S]*$/m, '').trim();
    chapters.push({ file, chapter: Number(h[1]), title: h[2].trim(), body });
  }
}

const words = (s) => (s.match(/[A-Za-z0-9’'-]+/g) || []).length;
const stock = [
  'For the first time', 'For a moment', 'There it was', 'That was the point', 'That was the problem',
  'That mattered', 'That was enough', 'It was not', 'It was not a', 'Which meant', 'The problem was',
  'Not because', 'Not yet', 'He did not', 'She did not', 'They did not', 'did not need to', 'did not have to',
  'The answer was', 'The truth was', 'In the end', 'For once', 'That was why', 'It meant', 'The difference was',
];

console.log(`FINAL ARC LITERARY AUDIT: ${chapters.length} chapters across ${files.length} source files`);
console.log('\n== LENGTH OUTLIERS ==');
const lens = chapters.map((c) => ({ ...c, wc: words(c.body) })).sort((a,b)=>a.wc-b.wc);
for (const c of lens.slice(0, 15)) console.log(`LOW Ch${c.chapter} ${c.wc}w — ${c.title} (${c.file})`);
for (const c of lens.slice(-10).reverse()) console.log(`HIGH Ch${c.chapter} ${c.wc}w — ${c.title} (${c.file})`);
const avg = Math.round(lens.reduce((s,c)=>s+c.wc,0)/lens.length);
console.log(`AVG ${avg}w`);

console.log('\n== STOCK PHRASES ==');
for (const phrase of stock) {
  const hits = [];
  for (const c of chapters) {
    const count = c.body.toLowerCase().split(phrase.toLowerCase()).length - 1;
    if (count) hits.push(`Ch${c.chapter}x${count}`);
  }
  const total = hits.reduce((s,h)=>s+Number(h.split('x')[1]),0);
  if (total >= 2) console.log(`${phrase}: ${total} — ${hits.join(', ')}`);
}

console.log('\n== META-LANGUAGE IN CHAPTER BODIES ==');
for (const c of chapters) {
  const lines = c.body.split('\n');
  lines.forEach((line, idx) => {
    if (/\b(?:Phase I{1,3}|the reader|reader should|the prose|this chapter|next chapter|draft|author note|story beat)\b/i.test(line)) {
      console.log(`Ch${c.chapter} L${idx+1}: ${line.trim().slice(0,180)}`);
    }
  });
}

console.log('\n== SHORT-PARAGRAPH DENSITY ==');
for (const c of chapters) {
  const ps = c.body.split(/\n{2,}/).map((p)=>p.trim()).filter(Boolean);
  const short = ps.filter((p)=>words(p)<=4).length;
  const ratio = ps.length ? short/ps.length : 0;
  if (ps.length >= 15 && ratio >= .32) console.log(`Ch${c.chapter}: ${short}/${ps.length} = ${(ratio*100).toFixed(0)}% short — ${c.title}`);
}

console.log('\n== REPEATED PARAGRAPHS ACROSS CHAPTERS ==');
const paraMap = new Map();
for (const c of chapters) {
  for (const p0 of c.body.split(/\n{2,}/)) {
    const p = p0.replace(/\s+/g,' ').trim();
    if (words(p) < 8 || p.startsWith('## ')) continue;
    const key = p.toLowerCase();
    const arr = paraMap.get(key) || [];
    arr.push(c.chapter); paraMap.set(key, arr);
  }
}
for (const [p, cs] of paraMap) {
  const uniq = [...new Set(cs)];
  if (uniq.length > 1) console.log(`${uniq.map(c=>`Ch${c}`).join(', ')} :: ${p.slice(0,160)}`);
}

console.log('\n== CHAPTER OPENINGS ==');
for (const c of chapters) {
  const first = c.body.split(/\n{2,}/).map((p)=>p.trim()).find(Boolean) || '';
  console.log(`Ch${c.chapter}: ${first.replace(/\s+/g,' ').slice(0,120)}`);
}

console.log('\n== CHAPTER ENDINGS ==');
for (const c of chapters) {
  const ps = c.body.split(/\n{2,}/).map((p)=>p.trim()).filter(Boolean);
  const last = ps.at(-1) || '';
  console.log(`Ch${c.chapter}: ${last.replace(/\s+/g,' ').slice(0,120)}`);
}
