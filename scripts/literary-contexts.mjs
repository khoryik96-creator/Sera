import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const dir=resolve('docs/prose');
const fileRe=/^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const chapRe=/^## Chapter (\d+) — (.+)$/gm;
const files=(await readdir(dir)).filter(f=>fileRe.test(f)&&Number(fileRe.exec(f)[1])>=95&&Number(fileRe.exec(f)[1])<=114).sort();
const chapters=[];
for(const file of files){const s=(await readFile(resolve(dir,file),'utf8')).replace(/\r\n/g,'\n');const hs=[...s.matchAll(chapRe)];for(let i=0;i<hs.length;i++){const h=hs[i];chapters.push({chapter:Number(h[1]),title:h[2],file,body:s.slice(h.index+h[0].length,hs[i+1]?.index??s.length)});}}
const targets=['For the first time','There it was','That mattered','That was enough','That was the problem','Not because','He did not','She did not'];
for(const t of targets){console.log(`\n===== ${t} =====`);let shown=0;for(const c of chapters){const ps=c.body.split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);for(let i=0;i<ps.length;i++){if(ps[i].toLowerCase().includes(t.toLowerCase())){const before=ps[i-1]||'';const after=ps[i+1]||'';console.log(`\nCh${c.chapter} ${c.title} [${c.file}]`);console.log(`PREV: ${before.replace(/\s+/g,' ').slice(0,220)}`);console.log(`HIT:  ${ps[i].replace(/\s+/g,' ').slice(0,300)}`);console.log(`NEXT: ${after.replace(/\s+/g,' ').slice(0,220)}`);shown++;if(shown>=40)break;}}if(shown>=40)break;}console.log(`shown=${shown}`);}
