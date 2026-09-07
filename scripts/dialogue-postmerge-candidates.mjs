import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=process.cwd();
const proseDir=resolve(root,'docs/prose');
const auditDir=resolve(root,'docs/dialogue-audit');
const registryPath=resolve(root,'src/characterRegistry.ts');
const SOURCE_RE=/^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE=/^## Chapter (\d+) — .+$/gm;
const SPEECH_WORDS='(?:said|asked|answered|replied|called|shouted|whispered|murmured|muttered|snapped|continued|added|told|spoke)';
function escRe(v){return v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function compact(s){return s.replace(/\s+/g,' ').trim();}
function outsideQuotes(v){return v.replace(/“[^”]*”?/gu,' ');}

const reg=await readFile(registryPath,'utf8');
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
  for(const row of aliases) if(new RegExp(`\\b${escRe(row.alias)}\\b`).test(text)) hits.push(row);
  return [...new Map(hits.map(x=>[x.key,x])).values()];
}
function explicitNamedAttribution(text){
  const narration=outsideQuotes(text);
  const found=[];
  for(const row of aliases){
    const a=escRe(row.alias);
    if(new RegExp(`\\b${a}\\s+${SPEECH_WORDS}\\b`,'i').test(narration) || new RegExp(`\\b${a}[’']s\\s+voice\\b`,'i').test(narration)) found.push(row);
  }
  return [...new Map(found.map(x=>[x.key,x])).values()];
}

const residual=[];
for(let season=95;season<=114;season++){
  const path=resolve(auditDir,`season-${String(season).padStart(3,'0')}.md`);
  const lines=(await readFile(path,'utf8')).replace(/\r\n/g,'\n').split('\n');
  let chapter=null,inFence=false,block=[];
  const flush=()=>{
    if(!chapter||!block.length){block=[];return;}
    for(let i=0;i<block.length;i++){
      if(!block[i].startsWith('>>> ')) continue;
      const quote=block[i].replace(/^>>> /,'').replace(/\s+<-- WHO SAYS THIS\?\s*$/,'');
      const before=block.slice(Math.max(0,i-3),i).filter(Boolean);
      const after=block.slice(i+1,i+4).filter(Boolean);
      const nearby=[...before,...after].flatMap(namedHits);
      const adjacent=[...namedHits(before.at(-1)||''),...namedHits(after[0]||'')];
      residual.push({season,chapter,quote,before,after,nearby:[...new Map(nearby.map(x=>[x.key,x])).values()],adjacent:[...new Map(adjacent.map(x=>[x.key,x])).values()]});
    }
    block=[];
  };
  for(const line of lines){
    const h=line.match(/^### Chapter (\d+) — /);
    if(h){flush();chapter=Number(h[1]);continue;}
    if(line.trim()==='```'){if(inFence){flush();inFence=false;}else{inFence=true;block=[];}continue;}
    if(inFence) block.push(line);
  }
  flush();
}

const mixedPronoun=[];
const explicitLeft=[];
const proseFiles=(await readdir(proseDir)).filter(f=>SOURCE_RE.test(f)).sort();
for(const f of proseFiles){
  const sm=SOURCE_RE.exec(f); const season=Number(sm[1]);
  if(season<95||season>114) continue;
  const src=(await readFile(resolve(proseDir,f),'utf8')).replace(/\r\n/g,'\n');
  const heads=[...src.matchAll(CHAPTER_RE)];
  for(let hi=0;hi<heads.length;hi++){
    const h=heads[hi],chapter=Number(h[1]),start=h.index+h[0].length,end=heads[hi+1]?.index??src.length;
    const paras=src.slice(start,end).trim().split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);
    for(let i=0;i<paras.length;i++){
      const p=paras[i];
      if(/^\[\[speaker:[^\]]+\]\]/.test(p)||!p.includes('“')||!p.includes('”')) continue;
      const standalone=p.startsWith('“')&&/”[.!?…]?$/u.test(p);
      if(standalone) continue;
      const explicit=explicitNamedAttribution(p);
      if(explicit.length){explicitLeft.push({season,chapter,p:compact(p),explicit});continue;}
      if(new RegExp(`\\b(?:he|she)\\s+${SPEECH_WORDS}\\b`,'i').test(outsideQuotes(p)) || /\b(?:his|her)\s+voice\b/i.test(outsideQuotes(p))){
        const before=paras.slice(Math.max(0,i-3),i).map(compact);
        const after=paras.slice(i+1,i+3).map(compact);
        const nearby=[...before,...after].flatMap(namedHits);
        mixedPronoun.push({season,chapter,p:compact(p),before,after,nearby:[...new Map(nearby.map(x=>[x.key,x])).values()]});
      }
    }
  }
}

await mkdir(auditDir,{recursive:true});
const totalAdjacent=residual.filter(x=>x.adjacent.length).length;
let summary='# Post-merge dialogue candidates (TEMP)\n\n';
summary+=`Actual residual worklist lines: **${residual.length}**\n\n`;
summary+=`Residuals with immediate named context: **${totalAdjacent}**\n\n`;
summary+=`Unmarked mixed pronoun/voice-attribution candidates: **${mixedPronoun.length}**\n\n`;
summary+=`Unmarked mixed explicit-name attributions left after safe pass: **${explicitLeft.length}**\n\n`;
await writeFile(resolve(auditDir,'_postmerge-candidates.md'),summary);

for(let season=95;season<=114;season++){
  const rr=residual.filter(x=>x.season===season&&x.adjacent.length);
  const mm=mixedPronoun.filter(x=>x.season===season);
  const ee=explicitLeft.filter(x=>x.season===season);
  let out=`# S${season} post-merge review candidates (TEMP)\n\n`;
  out+=`Immediate-context residuals: **${rr.length}**\n\nMixed pronoun candidates: **${mm.length}**\n\nExplicit-name mixed leftovers: **${ee.length}**\n\n`;
  if(rr.length){out+='# Residuals\n\n'; for(const x of rr){out+=`## Ch${x.chapter}\nAdjacent: ${x.adjacent.map(n=>`\`${n.key}\`(${n.alias})`).join(', ')} | Nearby: ${x.nearby.map(n=>`\`${n.key}\`(${n.alias})`).join(', ')}\n\n\`\`\`\n${x.before.join('\n')}\n>>> ${x.quote}\n${x.after.join('\n')}\n\`\`\`\n\n`;}}
  if(mm.length){out+='# Mixed pronoun/voice\n\n'; for(const x of mm){out+=`## Ch${x.chapter}\nNearby: ${x.nearby.map(n=>`\`${n.key}\`(${n.alias})`).join(', ')}\n\n\`\`\`\n${x.before.join('\n')}\n>>> ${x.p}\n${x.after.join('\n')}\n\`\`\`\n\n`;}}
  if(ee.length){out+='# Explicit leftovers\n\n'; for(const x of ee) out+=`- Ch${x.chapter}: ${x.explicit.map(n=>`\`${n.key}\`(${n.alias})`).join(', ')} — ${x.p}\n`;}
  await writeFile(resolve(auditDir,`_postmerge-review-s${String(season).padStart(3,'0')}.md`),out);
}
console.log({residual:residual.length,totalAdjacent,mixedPronoun:mixedPronoun.length,explicitLeft:explicitLeft.length});
