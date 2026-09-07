import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=process.cwd();
const proseDir=resolve(root,'docs/prose');
const SOURCE_RE=/^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;

const eirikText='“Submit the ports to joint Shinsei administration,” he said. “Open military inventory. Accept unified coastal command. No reprisals against local officers who comply. Existing civil councils remain provisionally in place.”';
const badMedic='The medic beside Sera muttered, “Physicians have been telling armies to do that for centuries.”';

let eirik=0, medic=0;
for(const file of (await readdir(proseDir)).filter(f=>SOURCE_RE.test(f))){
  const season=Number(SOURCE_RE.exec(file)[1]); if(season<95||season>114) continue;
  const path=resolve(proseDir,file);
  let text=await readFile(path,'utf8');
  const ePlain=`\n\n${eirikText}\n\n`;
  const eMarked=`\n\n[[speaker:eirik]]${eirikText}\n\n`;
  if(text.includes(eMarked)) eirik++;
  else if(text.includes(ePlain)){text=text.replace(ePlain,eMarked); eirik++;}

  const badMarked=`\n\n[[speaker:sera]]${badMedic}\n\n`;
  const badPlain=`\n\n${badMedic}\n\n`;
  if(text.includes(badMarked)){text=text.replace(badMarked,badPlain); medic++;}
  else if(text.includes(badPlain)) medic++;

  await writeFile(path,text);
}
if(eirik!==1) throw new Error(`Expected exactly one Eirik Ch370 target, found ${eirik}`);
if(medic!==1) throw new Error(`Expected exactly one S107 medic target, found ${medic}`);
console.log({eirikCorrected:eirik,medicCorrected:medic});
