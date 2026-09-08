import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { loadFinalArcSeasons } from './final-arc-reader.mjs';

const src=readFileSync('src/characterRegistry.ts','utf8');
const namedKeys=new Set();
for(const m of src.matchAll(/\{ key: '([a-z0-9_]+)', displayName: '([^']+)', colorKey: '([^']+)', aliases: \[([^\]]*)\](?:, speakerKeys: \[([^\]]*)\])?/g)){
  const keys=m[5]?[...m[5].matchAll(/'([^']+)'/g)].map(x=>x[1]):[m[1]];
  for(const k of keys) namedKeys.add(k);
}
const marker=s=>String(s||'').trim().match(/^\[\[speaker:([a-z0-9_]+)\]\]/)?.[1]||null;
const stripMarker=s=>String(s||'').replace(/^\[\[speaker:[a-z0-9_]+\]\]/,'');
const standalone=s=>{const t=stripMarker(s).trim();return /^“[\s\S]+”[.!?…]?$/u.test(t)||/^"[\s\S]+"[.!?…]?$/.test(t)};
const unmarked=s=>!String(s||'').trim().startsWith('[[speaker:')&&standalone(s);
const role=/\b(?:officer|soldier|medic|physician|doctor|healer|clerk|guard|sentry|courier|messenger|captain|general|marshal|quartermaster|aide|disciple|apprentice|patient|prisoner|scout|sailor|driver|merchant|owner|woman|man|girl|boy|child|monarch|minister|broker|sergeant|lieutenant|commander|worker|nurse|customer|foreman|inspector)\b/i;

const seasons=[];
for(const f of readdirSync('src/data/seasons').filter(x=>/^season-\d{3}\.json$/.test(x)).sort()) seasons.push({season:Number(f.match(/(\d{3})/)[1]),episodes:JSON.parse(readFileSync(`src/data/seasons/${f}`,'utf8'))});
for(const [k,episodes] of Object.entries(await loadFinalArcSeasons())) seasons.push({season:Number(k.replace('season','')),episodes});
seasons.sort((a,b)=>a.season-b.season);

const rows=[];
for(const {season,episodes} of seasons) for(const ep of episodes){
 const ps=String(ep.text||'').split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);
 for(let i=0;i<ps.length;i++){
   if(!unmarked(ps[i]))continue;
   const mark=[];
   for(let j=Math.max(0,i-5);j<=Math.min(ps.length-1,i+5);j++) if(j!==i){const k=marker(ps[j]);if(k&&namedKeys.has(k))mark.push({j,k});}
   const keys=[...new Set(mark.map(x=>x.k))];
   if(keys.length!==2)continue;
   const immediate=[ps[i-2]||'',ps[i-1]||'',ps[i+1]||'',ps[i+2]||''].join(' ');
   const p=marker(ps[i-1]||''),n=marker(ps[i+1]||'');
   const nearestPrev=[...mark].filter(x=>x.j<i).sort((a,b)=>b.j-a.j)[0];
   const nearestNext=[...mark].filter(x=>x.j>i).sort((a,b)=>a.j-b.j)[0];
   let suggested=null,reason='';
   if(p&&n&&p===n){suggested=keys.find(k=>k!==p);reason='sandwiched by same named speaker';}
   else if(nearestPrev&&nearestNext&&nearestPrev.k===nearestNext.k){suggested=keys.find(k=>k!==nearestPrev.k);reason='nearest named turns on both sides are same speaker';}
   else if(p&&n&&p!==n){reason='between two different named speakers';}
   else reason='two named speakers dominate local window';
   if(role.test(immediate)) reason+='; nearby anonymous-role language';
   rows.push({season,ep,i,ps,keys,suggested,reason});
 }
}
const compact=(s,n=400)=>{const x=String(s||'').replace(/\s+/g,' ').trim();return x.length>n?x.slice(0,n-1)+'…':x};
const out=['# Two-name dialogue-turn review','',`Candidates: **${rows.length}**`,''];
for(const r of rows){out.push(`## S${r.season} ${r.ep.ep} P${r.i+1} — ${r.ep.title}`,'',`Local named speakers: ${r.keys.map(k=>`\`${k}\``).join(', ')}`,'',`Suggested: ${r.suggested?`\`${r.suggested}\``:'none'} — ${r.reason}`,'','```text',`-4: ${compact(r.ps[r.i-4])}`,`-3: ${compact(r.ps[r.i-3])}`,`-2: ${compact(r.ps[r.i-2])}`,`-1: ${compact(r.ps[r.i-1])}`,`>>> ${compact(r.ps[r.i],600)}`,`+1: ${compact(r.ps[r.i+1])}`,`+2: ${compact(r.ps[r.i+2])}`,`+3: ${compact(r.ps[r.i+3])}`,`+4: ${compact(r.ps[r.i+4])}`,'```','');}
writeFileSync('docs/dialogue-audit/TWO_NAME_TURN_POST160_REVIEW.md',out.join('\n').replace(/\n+$/u,'')+'\n');
console.log({candidates:rows.length,suggested:rows.filter(r=>r.suggested).length,withRole:rows.filter(r=>role.test([r.ps[r.i-2],r.ps[r.i-1],r.ps[r.i+1],r.ps[r.i+2]].join(' '))).length});
