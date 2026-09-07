import { readFile, readdir, writeFile } from 'node:fs/promises';

const mapSource = await readFile('scripts/dialogue-manual-map.mjs', 'utf8');
const seasonMatch = mapSource.match(/export const season = (\d+);/);
const entriesMatch = mapSource.match(/export const entries = (\[[\s\S]*?\n\]);/);
if (!seasonMatch || !entriesMatch) throw new Error('Malformed dialogue manual map');
const season = Number(seasonMatch[1]);
const entries = Function(`"use strict"; return (${entriesMatch[1]});`)();
const seasonCode = String(season).padStart(3, '0');
const dir='docs/prose';
const files=(await readdir(dir)).filter(f=>new RegExp(`^FINAL_ARC_SEASON${seasonCode}_PROSE_DRAFT(?:_\\d+)?\\.md$`).test(f)).sort();
if(!files.length) throw new Error(`No source prose files for season ${season}`);

function stripMarker(p){return p.replace(/^\[\[speaker:[^\]]+\]\]/,'');}
function chapterParts(text){const re=/^## Chapter (\d+) — /gm;const heads=[...text.matchAll(re)];return heads.map((h,i)=>({chapter:Number(h[1]),start:h.index,end:heads[i+1]?.index??text.length}));}
function pureQuote(q){return q.startsWith('“')&&q.endsWith('”');}
function anchorMatches(paragraph, anchor){return stripMarker(paragraph.trim()).includes(anchor);}
let added=0,already=0,skippedMissing=0,skippedAmbiguous=0,skippedNarration=0;
for(const file of files){
  const original=await readFile(`${dir}/${file}`,'utf8');let text=original;
  for(const part of chapterParts(text).reverse()){
    const list=entries.filter(e=>e.chapter===part.chapter);if(!list.length)continue;
    let section=text.slice(part.start,part.end);const paras=section.split(/\n{2,}/);
    for(const e of list){
      if(!pureQuote(e.quote)){skippedNarration++;continue;}
      const matches=[];
      for(let i=0;i<paras.length;i++){
        if(stripMarker(paras[i].trim())!==e.quote)continue;
        if(e.before && (i===0||!anchorMatches(paras[i-1],e.before)))continue;
        if(e.after && (i+1>=paras.length||!anchorMatches(paras[i+1],e.after)))continue;
        matches.push(i);
      }
      if(matches.length===0){skippedMissing++;continue;}
      if(matches.length!==1){skippedAmbiguous++;continue;}
      const i=matches[0],trimmed=paras[i].trim(),existing=trimmed.match(/^\[\[speaker:([^\]]+)\]\]/);
      if(existing){if(existing[1]!==e.speaker)throw new Error(`Ch${e.chapter}: ${e.quote} already marked ${existing[1]}, expected ${e.speaker}`);already++;continue;}
      paras[i]=paras[i].replace(e.quote,`[[speaker:${e.speaker}]]${e.quote}`);added++;
    }
    section=paras.join('\n\n');text=text.slice(0,part.start)+section+text.slice(part.end);
  }
  if(text!==original)await writeFile(`${dir}/${file}`,text);
}
console.log(JSON.stringify({season,added,already,skippedMissing,skippedAmbiguous,skippedNarration}));