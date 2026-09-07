import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=process.cwd();
const dir=resolve(root,'docs/dialogue-audit');
const out=resolve(dir,'_postmerge-inline-residuals.md');
const cue=/\b(?:he|she)\s+(?:said|asked|answered|replied|called|shouted|whispered|murmured|muttered|snapped|continued|added|told)\b/i;
let rows=[];
for(let s=95;s<=114;s++){
  const text=await readFile(resolve(dir,`season-${String(s).padStart(3,'0')}.md`),'utf8');
  let chapter='';
  const lines=text.replace(/\r\n/g,'\n').split('\n');
  for(let i=0;i<lines.length;i++){
    const h=lines[i].match(/^### Chapter (\d+) — (.+)$/); if(h){chapter=h[1];continue;}
    if(!lines[i].startsWith('>>> ')) continue;
    const q=lines[i].replace(/^>>> /,'').replace(/\s+<-- WHO SAYS THIS\?\s*$/,'');
    if(!cue.test(q)) continue;
    const before=lines.slice(Math.max(0,i-4),i).filter(x=>x && x!=='```');
    const after=lines.slice(i+1,i+5).filter(x=>x && x!=='```');
    rows.push({s,chapter,q,before,after});
  }
}
let md=`# Residual inline pronoun attributions (TEMP)\n\nCount: **${rows.length}**\n\n`;
for(const r of rows){md+=`## S${r.s} Ch${r.chapter}\n\n\`\`\`\n${r.before.join('\n')}\n>>> ${r.q}\n${r.after.join('\n')}\n\`\`\`\n\n`;}
await writeFile(out,md);
console.log({count:rows.length});
