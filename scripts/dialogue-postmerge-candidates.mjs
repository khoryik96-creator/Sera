import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const proseDir = resolve(root, 'docs/prose');
const auditDir = resolve(root, 'docs/dialogue-audit');
const outPath = resolve(auditDir, '_postmerge-candidates.md');
const registryPath = resolve(root, 'src/characterRegistry.ts');
const SOURCE_RE = /^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE = /^## Chapter (\d+) — (.+)$/gm;
const SPEECH_WORDS = '(?:said|asked|answered|replied|called|shouted|whispered|murmured|muttered|snapped|continued|added|told|spoke)';

function escRe(v){return v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function compact(s){return s.replace(/\s+/g,' ').trim();}

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
  return hits.filter(h=>{if(seen.has(h.key))return false;seen.add(h.key);return true;});
}
function explicitNamedAttribution(text){
  for(const row of aliases){
    const a=escRe(row.alias);
    if(new RegExp(`\\b${a}\\s+${SPEECH_WORDS}\\b`,'i').test(text) || new RegExp(`\\b${a}[’']s\\s+voice\\b`,'i').test(text)) return row;
  }
  return null;
}

// Actual residuals: read the generated worklists, not raw prose. This excludes
// unmarked source quotes that the reader already resolves automatically.
const residual=[];
for(let season=95;season<=114;season++){
  const path=resolve(auditDir,`season-${String(season).padStart(3,'0')}.md`);
  const lines=(await readFile(path,'utf8')).replace(/\r\n/g,'\n').split('\n');
  let chapter=null, inFence=false, block=[];
  const flush=()=>{
    if(!chapter||!block.length){block=[];return;}
    for(let i=0;i<block.length;i++){
      if(!block[i].startsWith('>>> ')) continue;
      const quote=block[i].replace(/^>>> /,'').replace(/\s+<-- WHO SAYS THIS\?\s*$/,'');
      const before=block.slice(Math.max(0,i-3),i).filter(Boolean);
      const after=block.slice(i+1,i+4).filter(Boolean);
      const nearby=[...before,...after].flatMap(namedHits);
      const unique=[...new Map(nearby.map(x=>[x.key,x])).values()];
      const prev=before.at(-1)||''; const next=after[0]||'';
      const adjacent=[...namedHits(prev),...namedHits(next)];
      residual.push({season,chapter,quote,before,after,nearby:unique,adjacent:[...new Map(adjacent.map(x=>[x.key,x])).values()]});
    }
    block=[];
  };
  for(const line of lines){
    const h=line.match(/^### Chapter (\d+) — /);
    if(h){flush();chapter=Number(h[1]);continue;}
    if(line.trim()==='```'){
      if(inFence){flush();inFence=false;} else {inFence=true;block=[];}
      continue;
    }
    if(inFence) block.push(line);
  }
  flush();
}

// Mixed paragraphs are not in the standalone worklists. Find only explicit
// factual attribution and pronoun-attribution candidates for manual review.
const mixedExplicit=[];
const mixedPronoun=[];
const proseFiles=(await readdir(proseDir)).filter(f=>SOURCE_RE.test(f)).sort();
for(const f of proseFiles){
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
      if(/^\[\[speaker:[^\]]+\]\]/.test(p) || !p.includes('“') || !p.includes('”')) continue;
      const standalone=p.startsWith('“') && /”[.!?…]?$/u.test(p);
      if(standalone) continue;
      const explicit=explicitNamedAttribution(p);
      if(explicit){mixedExplicit.push({season,chapter,p:compact(p),speaker:explicit});continue;}
      if(new RegExp(`\\b(?:he|she)\\s+${SPEECH_WORDS}\\b`,'i').test(p)){
        const before=paras.slice(Math.max(0,i-3),i);
        const after=paras.slice(i+1,i+3);
        const nearby=[...before,...after].flatMap(namedHits);
        if(nearby.length) mixedPronoun.push({season,chapter,p:compact(p),before:before.map(compact),after:after.map(compact),nearby:[...new Map(nearby.map(x=>[x.key,x])).values()]});
      }
    }
  }
}

const withNearby=residual.filter(x=>x.nearby.length);
const withAdjacent=residual.filter(x=>x.adjacent.length);
let out='# Post-merge dialogue candidates (TEMP)\n\n';
out+=`Actual standalone residuals: **${residual.length}**\n\n`;
out+=`Residuals with a named character anywhere in the local 3+3 context: **${withNearby.length}**\n\n`;
out+=`Residuals with a named character on the immediately adjacent context line: **${withAdjacent.length}**\n\n`;
out+='# Adjacent named-context residuals\n\n';
for(const x of withAdjacent){
  out+=`## S${x.season} Ch${x.chapter}\nAdjacent candidates: ${x.adjacent.map(n=>`\`${n.key}\` (${n.alias})`).join(', ')}\nLocal candidates: ${x.nearby.map(n=>`\`${n.key}\` (${n.alias})`).join(', ')}\n\n`;
  out+='```\n'+x.before.map(v=>'  '+v).join('\n')+'\n>>> '+x.quote+'\n'+x.after.map(v=>'  '+v).join('\n')+'\n```\n\n';
}
out+=`# Mixed paragraphs with explicit named attribution: **${mixedExplicit.length}**\n\n`;
for(const x of mixedExplicit) out+=`- S${x.season} Ch${x.chapter} — \`${x.speaker.key}\` (${x.speaker.alias}): ${x.p}\n`;
out+=`\n# Mixed paragraphs with pronoun attribution + named context: **${mixedPronoun.length}**\n\n`;
for(const x of mixedPronoun){
  out+=`## S${x.season} Ch${x.chapter}\nCandidates: ${x.nearby.map(n=>`\`${n.key}\` (${n.alias})`).join(', ')}\n\n`;
  out+='```\n'+x.before.map(v=>'  '+v).join('\n')+'\n>>> '+x.p+'\n'+x.after.map(v=>'  '+v).join('\n')+'\n```\n\n';
}
await mkdir(auditDir,{recursive:true});
await writeFile(outPath,out);
console.log({residual:residual.length,withNearby:withNearby.length,withAdjacent:withAdjacent.length,mixedExplicit:mixedExplicit.length,mixedPronoun:mixedPronoun.length});
