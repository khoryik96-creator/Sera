import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { loadFinalArcSeasons } from './final-arc-reader.mjs';

const registrySource = readFileSync('src/characterRegistry.ts', 'utf8');
const entries = [];
const parse = (raw='') => [...raw.matchAll(/'([^']+)'/g)].map((m) => m[1]);
for (const m of registrySource.matchAll(/\{ key: '([a-z0-9_]+)', displayName: '([^']+)', colorKey: '([^']+)', aliases: \[([^\]]*)\](?:, speakerKeys: \[([^\]]*)\])?/g)) {
  entries.push({ key:m[1], name:m[2], aliases:parse(m[4]), speakerKeys:m[5]?parse(m[5]):[m[1]] });
}
const aliases=[];
for (const e of entries) for (const alias of new Set([e.name,...e.aliases])) if(alias?.length>=2) aliases.push({alias,key:e.speakerKeys[0]||e.key,name:e.name});
aliases.sort((a,b)=>b.alias.length-a.alias.length);
const esc=(s)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/[’']/g,"[’']");
const marker=(s)=>String(s||'').trim().match(/^\[\[speaker:([a-z0-9_]+)\]\]/)?.[1]||null;
const stripMarker=(s)=>String(s||'').replace(/^\[\[speaker:[a-z0-9_]+\]\]/,'');
const standalone=(s)=>{const t=stripMarker(s).trim();return /^“[\s\S]+”[.!?…]?$/u.test(t)||/^"[\s\S]+"[.!?…]?$/.test(t)};
const unmarkedStandalone=(s)=>!String(s||'').trim().startsWith('[[speaker:')&&standalone(s);
const stripQuotes=(s)=>String(s||'').replace(/“[^”]*”/gu,' ').replace(/"[^"]*"/g,' ');
const speech='said|asked|replied|answered|whispered|murmured|muttered|called|shouted|snapped|added|continued|repeated|demanded|agreed|ordered|warned|told|insisted|protested|explained|confirmed|responded|observed';
function explicitNamed(p){
  const out=[];
  for(const n of aliases){
    const a=esc(n.alias);
    if(new RegExp(`(?:^|[^\\p{L}])${a}[^.!?\\n]{0,25}\\b(?:${speech})\\b`,'iu').test(p) || new RegExp(`\\b(?:${speech})\\b[^.!?\\n]{0,12}${a}(?:[^\\p{L}]|$)`,'iu').test(p)) out.push(n);
  }
  const seen=new Set(); return out.filter(x=>!seen.has(x.key)&&seen.add(x.key));
}
function subjectAction(p){
  const t=stripQuotes(stripMarker(p)).trim();
  for(const n of aliases){
    const a=esc(n.alias);
    if(new RegExp(`^${a}(?:[’']s)?\\s+(?:looked|glanced|stared|nodded|shook|smiled|sighed|leaned|turned|frowned|grimaced|blinked|exhaled|inhaled|laughed|paused|stopped|lowered|raised|folded|tilted|closed|opened|stepped|sat|stood|knelt|pointed|watched|waited|lifted|set|placed|pressed|rested|breathed|swore|winced)\\b`,'iu').test(t)) return n;
  }
  return null;
}
function namedMentions(p){
  const t=stripQuotes(stripMarker(p)); const out=[];
  for(const n of aliases) if(new RegExp(`(?:^|[^\\p{L}])${esc(n.alias)}(?:[^\\p{L}]|$)`,'iu').test(t)) out.push(n);
  const seen=new Set(); return out.filter(x=>!seen.has(x.key)&&seen.add(x.key));
}
const anonymousRole=/\b(?:officer|soldier|medic|physician|doctor|healer|clerk|guard|sentry|courier|messenger|captain|general|marshal|quartermaster|aide|disciple|apprentice|patient|prisoner|scout|sailor|driver|merchant|owner|woman|man|girl|boy|child|monarch|minister|broker|sergeant|lieutenant|commander|worker|nurse)\b/i;

const seasons=[];
for(const f of readdirSync('src/data/seasons').filter(x=>/^season-\d{3}\.json$/.test(x)).sort()) seasons.push({season:Number(f.match(/(\d{3})/)[1]),episodes:JSON.parse(readFileSync(`src/data/seasons/${f}`,'utf8'))});
for(const [k,episodes] of Object.entries(await loadFinalArcSeasons())) seasons.push({season:Number(k.replace('season','')),episodes});
seasons.sort((a,b)=>a.season-b.season);

const rows=[];
for(const {season,episodes} of seasons) for(const ep of episodes){
  const ps=String(ep.text||'').split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);
  for(let i=0;i<ps.length;i++){
    const p=ps[i]; if(!unmarkedStandalone(p)) continue;
    const expl=explicitNamed(p);
    if(expl.length===1) rows.push({tier:'A-explicit',speaker:expl[0],season,ep,i,p,ps});
    const prevSubject=subjectAction(ps[i-1]||'');
    const pm=marker(ps[i-1]||''), nm=marker(ps[i+1]||'');
    if(prevSubject && nm && nm!==prevSubject.key && !anonymousRole.test(ps[i-1]||'')) rows.push({tier:'B-subject-then-other-reply',speaker:prevSubject,season,ep,i,p,ps});
    if(pm && nm && pm===nm){
      const nearby=[];
      for(let j=Math.max(0,i-4);j<=Math.min(ps.length-1,i+4);j++) if(j!==i){ const s=subjectAction(ps[j]); if(s && s.key!==pm) nearby.push(s); }
      const uniq=[...new Map(nearby.map(x=>[x.key,x])).values()];
      if(uniq.length===1 && !anonymousRole.test([ps[i-2],ps[i-1],ps[i+1],ps[i+2]].join(' '))) rows.push({tier:'C-sandwich-other-named',speaker:uniq[0],season,ep,i,p,ps});
    }
  }
}
const dedup=new Map();
for(const r of rows){const k=`${r.season}|${r.ep.ep}|${r.i}|${r.speaker.key}`;const old=dedup.get(k);if(!old || old.tier>r.tier)dedup.set(k,r)}
const outRows=[...dedup.values()].sort((a,b)=>a.tier.localeCompare(b.tier)||a.season-b.season||String(a.ep.ep).localeCompare(String(b.ep.ep))||a.i-b.i);
const compact=(s,n=420)=>{const x=String(s||'').replace(/\s+/g,' ').trim();return x.length>n?x.slice(0,n-1)+'…':x};
const out=['# Ranked named-speaker candidates','',`Candidates: **${outRows.length}**`,''];
for(const r of outRows){out.push(`## ${r.tier} · S${r.season} ${r.ep.ep} P${r.i+1} — ${r.ep.title}`,'',`Candidate: **${r.speaker.name}** (\`${r.speaker.key}\`)`,'','```text',`-3: ${compact(r.ps[r.i-3])}`,`-2: ${compact(r.ps[r.i-2])}`,`-1: ${compact(r.ps[r.i-1])}`,`>>> ${compact(r.p,600)}`,`+1: ${compact(r.ps[r.i+1])}`,`+2: ${compact(r.ps[r.i+2])}`,`+3: ${compact(r.ps[r.i+3])}`,'```','');}
writeFileSync('docs/dialogue-audit/RANKED_NAMED_POST160_REVIEW.md',out.join('\n').replace(/\n+$/u,'')+'\n');
console.log({candidates:outRows.length,tiers:Object.fromEntries([...new Set(outRows.map(r=>r.tier))].map(t=>[t,outRows.filter(r=>r.tier===t).length]))});
