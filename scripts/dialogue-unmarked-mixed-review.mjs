import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { loadFinalArcSeasons } from './final-arc-reader.mjs';

const marker=s=>String(s||'').trim().match(/^\[\[speaker:([a-z0-9_]+)\]\]/)?.[1]||null;
const stripMarker=s=>String(s||'').replace(/^\[\[speaker:[a-z0-9_]+\]\]/,'');
const hasQuote=s=>/“[^”]+”/u.test(String(s||''))||/"[^"]+"/.test(String(s||''));
const standalone=s=>{const t=stripMarker(s).trim();return /^“[\s\S]+”[.!?…]?$/u.test(t)||/^"[\s\S]+"[.!?…]?$/.test(t)};
const isCandidate=s=>!marker(s)&&hasQuote(s)&&!standalone(s);
const seasons=[];
for(const f of readdirSync('src/data/seasons').filter(x=>/^season-\d{3}\.json$/.test(x)).sort()) seasons.push({season:Number(f.match(/(\d{3})/)[1]),episodes:JSON.parse(readFileSync(`src/data/seasons/${f}`,'utf8'))});
for(const [k,episodes] of Object.entries(await loadFinalArcSeasons())) seasons.push({season:Number(k.replace('season','')),episodes});
seasons.sort((a,b)=>a.season-b.season);
const rows=[];
for(const {season,episodes} of seasons) for(const ep of episodes){const ps=String(ep.text||'').split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);for(let i=0;i<ps.length;i++)if(isCandidate(ps[i]))rows.push({season,ep,i,ps});}
const compact=(s,n=600)=>{const x=String(s||'').replace(/\s+/g,' ').trim();return x.length>n?x.slice(0,n-1)+'…':x};
const out=['# All unmarked mixed quote paragraphs','',`Candidates: **${rows.length}**`,''];
for(const r of rows){out.push(`## S${r.season} ${r.ep.ep} P${r.i+1} — ${r.ep.title}`,'','```text',`-3: ${compact(r.ps[r.i-3])}`,`-2: ${compact(r.ps[r.i-2])}`,`-1: ${compact(r.ps[r.i-1])}`,`>>> ${compact(r.ps[r.i],900)}`,`+1: ${compact(r.ps[r.i+1])}`,`+2: ${compact(r.ps[r.i+2])}`,`+3: ${compact(r.ps[r.i+3])}`,'```','');}
writeFileSync('docs/dialogue-audit/UNMARKED_MIXED_POST160_REVIEW.md',out.join('\n').replace(/\n+$/u,'')+'\n');
console.log({candidates:rows.length});
