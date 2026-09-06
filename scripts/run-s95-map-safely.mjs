import { readdir, readFile, writeFile } from 'node:fs/promises';

const mapSource = await readFile('scripts/apply-dialogue-s95-complete.mjs', 'utf8');
const match = mapSource.match(/const entries = (\[[\s\S]*?\n\]);/);
if (!match) throw new Error('Could not read Season 95 resolution map');
const entries = Function(`"use strict"; return (${match[1]});`)();

const dir = 'docs/prose';
const files = (await readdir(dir)).filter((f) => /^FINAL_ARC_SEASON095_PROSE_DRAFT(?:_\d+)?\.md$/.test(f)).sort();
function stripMarker(p) { return p.replace(/^\[\[speaker:[^\]]+\]\]/, ''); }
function chapterParts(text) { const re=/^## Chapter (\d+) — /gm; const heads=[...text.matchAll(re)]; return heads.map((h,i)=>({chapter:Number(h[1]),start:h.index,end:heads[i+1]?.index??text.length})); }
const byChapter=new Map(); for(const e of entries){const a=byChapter.get(e[0])||[];a.push(e);byChapter.set(e[0],a);}
let added=0, skippedMissing=0, skippedDuplicate=0, skippedNarration=0;
for (const file of files) {
  const original=await readFile(`${dir}/${file}`,'utf8'); let text=original;
  for (const part of chapterParts(text).reverse()) {
    const list=byChapter.get(part.chapter); if(!list) continue;
    let section=text.slice(part.start,part.end); const paras=section.split(/\n{2,}/);
    for (const [,quote,speaker] of list) {
      // Markers are allowed only on paragraphs made entirely of quoted dialogue.
      if (!(quote.startsWith('“') && quote.endsWith('”'))) { skippedNarration++; continue; }
      const matches=[]; for(let i=0;i<paras.length;i++) if(stripMarker(paras[i].trim())===quote) matches.push(i);
      if(matches.length===0){skippedMissing++;continue;}
      if(matches.length>1){skippedDuplicate++;continue;}
      const i=matches[0], trimmed=paras[i].trim();
      const existing=trimmed.match(/^\[\[speaker:([^\]]+)\]\]/);
      if(existing){if(existing[1]!==speaker)throw new Error(`Ch${part.chapter}: ${quote} already marked ${existing[1]}, expected ${speaker}`);continue;}
      paras[i]=paras[i].replace(quote,`[[speaker:${speaker}]]${quote}`); added++;
    }
    section=paras.join('\n\n'); text=text.slice(0,part.start)+section+text.slice(part.end);
  }
  if(text!==original) await writeFile(`${dir}/${file}`,text);
}
console.log(JSON.stringify({added,skippedMissing,skippedDuplicate,skippedNarration}));
