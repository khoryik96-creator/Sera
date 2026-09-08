import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { loadFinalArcSeasons } from './final-arc-reader.mjs';

const src = readFileSync('src/characterRegistry.ts', 'utf8');
const entries = [];
const parse = (s='') => [...s.matchAll(/'([^']+)'/g)].map(m=>m[1]);
for (const m of src.matchAll(/\{ key: '([a-z0-9_]+)', displayName: '([^']+)', colorKey: '([^']+)', aliases: \[([^\]]*)\](?:, speakerKeys: \[([^\]]*)\])?/g)) {
  entries.push({key:m[1], name:m[2], aliases:parse(m[4]), speakerKeys:m[5]?parse(m[5]):[m[1]]});
}
const names=[];
for(const e of entries) for(const a of new Set([e.name,...e.aliases])) if(a?.length>=2) names.push({alias:a,key:e.speakerKeys[0]||e.key,name:e.name});
names.sort((a,b)=>b.alias.length-a.alias.length);
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/[’']/g,"[’']");
const stripMarker=s=>String(s||'').replace(/^\[\[speaker:[a-z0-9_]+\]\]/,'');
const standalone=s=>{const t=stripMarker(s).trim(); return /^“[\s\S]+”[.!?…]?$/u.test(t)||/^"[\s\S]+"[.!?…]?$/.test(t)};
const unmarkedStandalone=s=>!String(s||'').trim().startsWith('[[speaker:')&&standalone(s);
const marker=s=>String(s||'').trim().match(/^\[\[speaker:([a-z0-9_]+)\]\]/)?.[1]||null;
const stripQuotes=s=>String(s||'').replace(/“[^”]*”/gu,' ').replace(/"[^"]*"/g,' ');
function mentions(s){const outside=stripQuotes(s), out=[];for(const n of names){if(new RegExp(`(?:^|[^\\p{L}])${esc(n.alias)}(?:[^\\p{L}]|$)`,'iu').test(outside))out.push(n)}const seen=new Set();return out.filter(x=>!seen.has(x.key)&&seen.add(x.key));}
const action=/\b(?:looked|glanced|stared|nodded|shook|smiled|sighed|leaned|turned|frowned|grimaced|blinked|exhaled|inhaled|laughed|mouth|lips|voice|eyes|brow|expression|jaw|shoulders|paused|stopped|lowered|raised|folded|tilted|closed|opened|stepped|sat|stood|knelt|pointed)\b/i;
function singleAction(s){if(!action.test(stripQuotes(s)))return null;const ms=mentions(s);return ms.length===1?ms[0]:null;}
function source(season){return season>=95?`docs/prose/FINAL_ARC_SEASON${String(season).padStart(3,'0')}_PROSE_DRAFT*.md`:`src/data/seasons/season-${String(season).padStart(3,'0')}.json`;}
const seasons=[];
for(const f of readdirSync('src/data/seasons').filter(x=>/^season-\d{3}\.json$/.test(x)).sort()) seasons.push({season:Number(f.match(/(\d{3})/)[1]),episodes:JSON.parse(readFileSync(`src/data/seasons/${f}`,'utf8'))});
for(const [k,episodes] of Object.entries(await loadFinalArcSeasons())) seasons.push({season:Number(k.replace('season','')),episodes});
seasons.sort((a,b)=>a.season-b.season);
const rows=[];
for(const {season,episodes} of seasons) for(const ep of episodes){
 const ps=String(ep.text||'').split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);
 for(let i=0;i<ps.length;i++) if(unmarkedStandalone(ps[i])){
   const prevA=singleAction(ps[i-1]||''), nextA=singleAction(ps[i+1]||'');
   const prevM=marker(ps[i-1]||''), nextM=marker(ps[i+1]||'');
   const nearNames=[]; for(let j=Math.max(0,i-3);j<=Math.min(ps.length-1,i+3);j++) if(j!==i) for(const m of mentions(ps[j])) nearNames.push(m);
   const uniqueNames=[...new Map(nearNames.map(x=>[x.key,x])).values()];
   if(!nextA && !prevA && !prevM && !nextM) continue;
   rows.push({season,ep:ep.ep,title:ep.title,i,text:ps[i],prev:ps[i-1]||'',next:ps[i+1]||'',prev2:ps[i-2]||'',next2:ps[i+2]||'',prevA,nextA,prevM,nextM,uniqueNames,source:source(season)});
 }
}
const compact=(s,n=340)=>{const x=String(s||'').replace(/\s+/g,' ').trim();return x.length>n?x.slice(0,n-1)+'…':x};
const out=['# Bidirectional context review for unmarked standalone dialogue','',`Candidates: **${rows.length}**`,''];
for(const r of rows){
 out.push(`## S${r.season} ${r.ep} P${r.i+1} — ${r.title}`,'',`Source: \`${r.source}\``,'');
 out.push(`- previous action: ${r.prevA?`**${r.prevA.name}** (\`${r.prevA.key}\`)`:'none'}`);
 out.push(`- following action: ${r.nextA?`**${r.nextA.name}** (\`${r.nextA.key}\`)`:'none'}`);
 out.push(`- previous marked speaker: ${r.prevM?`\`${r.prevM}\``:'none'}`);
 out.push(`- following marked speaker: ${r.nextM?`\`${r.nextM}\``:'none'}`);
 out.push(`- named characters within ±3: ${r.uniqueNames.length?r.uniqueNames.map(x=>`${x.key}:${x.name}`).join(', '):'none'}`,'','```text',`-2: ${compact(r.prev2)}`,`-1: ${compact(r.prev)}`,`>>> ${compact(r.text,500)}`,`+1: ${compact(r.next)}`,`+2: ${compact(r.next2)}`,'```','');
}
writeFileSync('docs/dialogue-audit/BIDIRECTIONAL_POST160_REVIEW.md',out.join('\n').replace(/\n+$/u,'')+'\n');
console.log({candidates:rows.length, nextAction:rows.filter(r=>r.nextA).length, prevAction:rows.filter(r=>r.prevA).length, adjacentMarker:rows.filter(r=>r.nextM||r.prevM).length});
