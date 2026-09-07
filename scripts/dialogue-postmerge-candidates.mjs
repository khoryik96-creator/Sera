import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const proseDir = resolve(root, 'docs/prose');
const outPath = resolve(root, 'docs/dialogue-audit/_postmerge-candidates.md');
const registryPath = resolve(root, 'src/characterRegistry.ts');
const SOURCE_RE = /^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE = /^## Chapter (\d+) — (.+)$/gm;
const SPEECH = /\b(?:said|asked|answered|replied|called|shouted|whispered|murmured|muttered|snapped|continued|added|told|spoke)\b/i;

function escRe(v){return v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function stripMarker(p){return p.replace(/^\[\[speaker:[^\]]+\]\]/,'');}
function isStandalone(p){const t=stripMarker(p.trim());return t.startsWith('“') && /”[.!?…]?$/u.test(t);}
function hasMarker(p){return /^\[\[speaker:[^\]]+\]\]/.test(p.trim());}

const reg = await readFile(registryPath,'utf8');
const aliases=[];
for(const m of reg.matchAll(/\{ key: '([a-z0-9_]+)',[^\n]*aliases: \[([^\]]+)\](?:, speakerKeys: \[([^\]]+)\])?/g)){
  const key=m[1];
  const names=[...m[2].matchAll(/'([^']+)'/g)].map(x=>x[1]);
  const sk=m[3]?[...m[3].matchAll(/'([^']+)'/g)].map(x=>x[1]):[key];
  for(const alias of names) aliases.push({alias,key:sk[0]||key});
}
aliases.sort((a,b)=>b.alias.length-a.alias.length);

function namedHits(text){
  const hits=[];
  for(const row of aliases){
    if(new RegExp(`\\b${escRe(row.alias)}\\b`).test(text)) hits.push(row);
  }
  const seen=new Set();
  return hits.filter(h=>{const k=h.key+'|'+h.alias;if(seen.has(k))return false;seen.add(k);return true;});
}
function explicitNamedAttribution(text){
  for(const row of aliases){
    const a=escRe(row.alias);
    if(new RegExp(`\\b${a}\\s+${SPEECH.source.slice(2,-2)}\\b`,'i').test(text) || new RegExp(`\\b${a}[’']s\\s+voice\\b`,'i').test(text)) return row;
  }
  return null;
}
function compact(s){return s.replace(/\s+/g,' ').trim();}

const files=(await readdir(proseDir)).filter(f=>SOURCE_RE.test(f)).sort();
const standalone=[];
const mixedExplicit=[];
const mixedPronoun=[];

for(const f of files){
  const sm=SOURCE_RE.exec(f); const season=Number(sm[1]);
  if(season<95||season>114) continue;
  const src=(await readFile(resolve(proseDir,f),'utf8')).replace(/\r\n/g,'\n');
  const heads=[...src.matchAll(CHAPTER_RE)];
  for(let hi=0;hi<heads.length;hi++){
    const h=heads[hi], chapter=Number(h[1]);
    const start=h.index+h[0].length, end=heads[hi+1]?.index??src.length;
    const paras=src.slice(start,end).trim().split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);
    for(let i=0;i<paras.length;i++){
      const p=paras[i];
      if(hasMarker(p)) continue;
      if(isStandalone(p)){
        const before=paras.slice(Math.max(0,i-3),i);
        const after=paras.slice(i+1,i+4);
        const nearby=[...before,...after].flatMap(namedHits);
        if(nearby.length){
          standalone.push({season,chapter,quote:compact(p),before:before.map(compact),after:after.map(compact),nearby:[...new Map(nearby.map(x=>[x.key,x])).values()]});
        }
        continue;
      }
      if(!p.includes('“')||!p.includes('”')) continue;
      const explicit=explicitNamedAttribution(p);
      if(explicit){mixedExplicit.push({season,chapter,p:compact(p),speaker:explicit});continue;}
      if(/\b(?:he|she)\s+(?:said|asked|answered|replied|called|shouted|whispered|murmured|muttered|snapped|continued|added)\b/i.test(p)){
        const before=paras.slice(Math.max(0,i-3),i);
        const after=paras.slice(i+1,i+3);
        const nearby=[...before,...after].flatMap(namedHits);
        if(nearby.length) mixedPronoun.push({season,chapter,p:compact(p),before:before.map(compact),after:after.map(compact),nearby:[...new Map(nearby.map(x=>[x.key,x])).values()]});
      }
    }
  }
}

let out='# Post-merge dialogue candidates (TEMP)\n\n';
out+=`Standalone residuals with named characters nearby: **${standalone.length}**\n\n`;
for(const x of standalone){
  out+=`## S${x.season} Ch${x.chapter}\nCandidates: ${x.nearby.map(n=>`\`${n.key}\` (${n.alias})`).join(', ')}\n\n`;
  out+='```\n'+x.before.map(v=>'  '+v).join('\n')+'\n>>> '+x.quote+'\n'+x.after.map(v=>'  '+v).join('\n')+'\n```\n\n';
}
out+=`# Mixed paragraphs with explicit named attribution: **${mixedExplicit.length}**\n\n`;
for(const x of mixedExplicit) out+=`- S${x.season} Ch${x.chapter} — \`${x.speaker.key}\` (${x.speaker.alias}): ${x.p}\n`;
out+=`\n# Mixed paragraphs with pronoun attribution + named context: **${mixedPronoun.length}**\n\n`;
for(const x of mixedPronoun){
  out+=`## S${x.season} Ch${x.chapter}\nCandidates: ${x.nearby.map(n=>`\`${n.key}\` (${n.alias})`).join(', ')}\n\n`;
  out+='```\n'+x.before.map(v=>'  '+v).join('\n')+'\n>>> '+x.p+'\n'+x.after.map(v=>'  '+v).join('\n')+'\n```\n\n';
}
await mkdir(resolve(root,'docs/dialogue-audit'),{recursive:true});
await writeFile(outPath,out);
console.log(`wrote ${outPath}`);
console.log({standalone:standalone.length,mixedExplicit:mixedExplicit.length,mixedPronoun:mixedPronoun.length});
