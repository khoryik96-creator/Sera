import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const auditDir=resolve(process.cwd(),'docs/dialogue-audit');
for(let season=95;season<=114;season++){
  const id=String(season).padStart(3,'0');
  const src=await readFile(resolve(auditDir,`_postmerge-review-s${id}.md`),'utf8');
  const marker='# Mixed pronoun/voice\n';
  const start=src.indexOf(marker);
  let mixed=`# S${season} mixed pronoun/voice candidates (TEMP)\n\n`;
  if(start>=0){
    let section=src.slice(start+marker.length);
    const explicit=section.indexOf('\n# Explicit leftovers');
    if(explicit>=0) section=section.slice(0,explicit);
    mixed+=section.trim()+'\n';
  } else mixed+='None.\n';
  await writeFile(resolve(auditDir,`_postmerge-mixed-s${id}.md`),mixed);
}
console.log('wrote per-season mixed dialogue reports');
