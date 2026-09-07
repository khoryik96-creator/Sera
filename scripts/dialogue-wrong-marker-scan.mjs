import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=process.cwd();
const proseDir=resolve(root,'docs/prose');
const out=resolve(root,'docs/dialogue-audit/_postmerge-wrong-marker-candidates.md');
const registryPath=resolve(root,'src/characterRegistry.ts');
const SOURCE_RE=/^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE=/^## Chapter (\d+) — .+$/gm;
const CUE='(?:said|asked|answered|replied|called|shouted|whispered|murmured|muttered|snapped|continued|added|told|spoke)';
const ROLE=new RegExp(`\\b(?:the|a|an)\\s+(?:medic|physician|doctor|clerk|guard|captain|officer|runner|messenger|courier|quartermaster|surgeon|sentry|soldier|scout|aide|assistant|nurse|liaison|steward|broker|inspector|landlord|governor|delegate|representative|patient|prisoner|worker|owner|fisherman|woman|man)\\b[^.!?]{0,60}\\b${CUE}\\b`,'i');
function esc(v){return v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function outside(v){return v.replace(/“[^”]*”?/gu,' ');}

const reg=await readFile(registryPath,'utf8');
const aliases=[];
for(const m of reg.matchAll(/\{ key: '([a-z0-9_]+)',[^\n]*aliases: \[([^\]]+)\](?:, speakerKeys: \[([^\]]+)\])?/g)){
  const key=m[1];
  const names=[...m[2].matchAll(/'([^']+)'/g)].map(x=>x[1]);
  const sk=m[3]?[...m[3].matchAll(/'([^']+)'/g)].map(x=>x[1]):[key];
  for(const alias of names) aliases.push({alias,key:sk[0]||key});
}
aliases.sort((a,b)=>b.alias.length-a.alias.length);

const rows=[];
for(const file of (await readdir(proseDir)).filter(f=>SOURCE_RE.test(f)).sort()){
  const sm=SOURCE_RE.exec(file); const season=Number(sm[1]); if(season<95||season>114) continue;
  const text=await readFile(resolve(proseDir,file),'utf8');
  const heads=[...text.matchAll(CHAPTER_RE)];
  for(let h=0;h<heads.length;h++){
    const chapter=Number(heads[h][1]); const start=heads[h].index+heads[h][0].length; const end=heads[h+1]?.index??text.length;
    for(const p0 of text.slice(start,end).trim().split(/\n{2,}/)){
      const p=p0.trim(); const mm=p.match(/^\[\[speaker:([a-z0-9_]+)\]\](.*)$/s); if(!mm) continue;
      const marker=mm[1], body=mm[2], narr=outside(body);
      const named=[];
      for(const a of aliases){ if(new RegExp(`\\b${esc(a.alias)}\\s+${CUE}\\b`,'i').test(narr)) named.push(a); }
      const uniq=[...new Map(named.map(x=>[x.key,x])).values()];
      const conflict=uniq.length===1 && uniq[0].key!==marker;
      const role=ROLE.test(narr);
      if(conflict||role) rows.push({season,chapter,file,marker,body,narr,conflict,role,named:uniq});
    }
  }
}
let md=`# Wrong-marker candidates (TEMP)\n\nCount: **${rows.length}**\n\n`;
for(const r of rows){md+=`## S${r.season} Ch${r.chapter}\nMarker: \`${r.marker}\` | role-attribution=${r.role} | named-conflict=${r.conflict}${r.named.length?` | named=${r.named.map(x=>x.key).join(',')}`:''}\n\n\`\`\`\n${r.body}\n\`\`\`\n\n`;}
await writeFile(out,md);
console.log({count:rows.length});
