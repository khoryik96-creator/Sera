import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=process.cwd();
const dir=resolve(root,'docs/dialogue-audit');
const counts=[];
for(let season=95;season<=114;season++){
  const file=resolve(dir,`season-${String(season).padStart(3,'0')}.md`);
  const text=await readFile(file,'utf8');
  const m=text.match(/\n(\d+) quoted lines? in this season have no speaker\./);
  if(!m) throw new Error(`Could not read count from ${file}`);
  counts.push([season,Number(m[1])]);
}
const total=counts.reduce((n,[,c])=>n+c,0);
const path=resolve(dir,'README.md');
let text=await readFile(path,'utf8');
text=text.replace(/The result is that \*\*\d+ quoted lines now have no speaker name\.\*\*/, `The result is that **${total} quoted lines now have no speaker name.**`);
text=text.replace(/- Do not add markers to narration — only to paragraphs that are entirely a\n  quoted line\./, `- For an all-dialogue paragraph, the marker applies to that quoted line.\n- A mixed dialogue+narration paragraph may also be marked when the prose itself\n  makes the named speaker unambiguous. In the reader, only the quoted spans are\n  emphasized; narration remains normal-weight. Do not mark mixed paragraphs from\n  turn-taking alone.`);
for(const [season,count] of counts){
  const re=new RegExp(`\\| Season ${season} \\| \\d+ \\|`);
  if(!re.test(text)) throw new Error(`README row missing for Season ${season}`);
  text=text.replace(re,`| Season ${season} | ${count} |`);
}
text=text.replace(/\| \*\*Total\*\* \| \*\*\d+\*\* \| \| \|/,`| **Total** | **${total}** | | |`);
await writeFile(path,text);
console.log({total,counts:Object.fromEntries(counts)});
