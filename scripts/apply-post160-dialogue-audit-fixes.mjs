import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const older = [
  [87,'sigrun','“Again,” Sigrun said.'],
  [87,'solveig','“Wuyue hides military movement beneath physicians.”'],
  [87,'solveig','“And Wuyue crossed with an army.”'],
  [87,'solveig','“Move.”'],
  [87,'sigrun','“A settlement beyond the east road sent a civilian bell.”'],
  [87,'sigrun','“You heard it,” she said.'],
  [87,'sigrun','“I know which army occupies the road between.”'],
  [87,'halvek','Halvek’s voice travelled through the nearest gate seal. “White Blood hears what it enters. These roads are not your body.”'],

  [88,'jin','“It buys time,” Jin said through the signal officer.'],
  [88,'sigrun','“The Mountain came.”'],
  [88,'sigrun','“If you can carry them through the First Wall.”'],
  [88,'arin','“All out!” her signal reached the valley.'],
  [88,'sigrun','“You carried them,” she said.'],

  [90,'kellan','“You crossed into Isgard with an army.”'],
  [90,'kellan','“You broke our gates.”'],
  [90,'kellan','“And now you lecture us on law?”'],
  [90,'sigrun','“Leave this wall and you do not take it back.”'],

  [91,'astrid','“You surrendered your advantage.”'],
  [91,'astrid','“Maedra ordered the corridor closed.”'],
  [91,'astrid','“And your wounded?”'],

  [92,'sigrun','“You left this wall once.”'],
  [92,'sigrun','“You will not take it back today.”'],
  [92,'jorek','“Chainforge does not surrender.”'],
  [92,'jorek','“We have eight thousand soldiers.”'],

  [93,'raska','“Those riders would not strengthen your Domain. Their wounds would give you roads.”'],
  [93,'raska','“It restores your political claim.”'],

  [94,'maedra','“How much did you hold back?”'],
];

const final = [
  [96,'yun','Yun, without looking up, said, “He loves those more than he loves people.”'],
  [96,'luo','“Three weeks,” Luo repeated.'],
  [97,'shunto','Only after the woman left did he say, “The arm was clever.”'],

  [99,'shunto','“Who is waiting for this?” he asked.'],
  [99,'shunto','“Treatment?” he asked.'],
  [99,'black_radiance','He simply said, “Wall on your left.”'],
  [99,'black_radiance','“Isgard first,” he agreed.'],

  [100,'xie_wuchen','Xie finally said, “Publicly?”'],

  [101,'luweiran','Lu, from the other side of the room, said, “Correct.”'],
  [101,'tae','“What are you writing?” Tae demanded.'],

  [102,'jun','“Push,” Jun ordered.'],
  [102,'jun','“Take the junction,” he ordered.'],
  [102,'solveig','“Next,” she said.'],
  [102,'tae','On the seventh, Tae Muyeon handed him a crate and said, “If you are not one of us, carry this like an outsider.”'],
  [102,'luweiran','Lu, without looking up from a ledger, said, “You have eaten fourteen meals.”'],

  [103,'kael','Then asked, “Beachhead?”'],

  [108,'liang','Liang, seated farther back, said, “You call all strong people annoying.”'],

  [109,'luweiran','Then added, “Shinsei attacked Wuyue anyway.”'],
  [109,'luweiran','Then amended, “You should not reach Sera before it does.”'],
  [109,'arin','Then said, “You took your time.”'],
  [109,'aya','“What are you going to do?” she asked.'],
  [109,'aldric','The Established Paragon opened his eyes on the third morning beneath Sanctuary of Petals, stared at the ceiling of the hospital pavilion, and said, “Why am I here?”'],
  [109,'rhen','“Recently,” he amended.'],

  [110,'tsubasa','He simply asked, “How?”'],
  [110,'nao','Nao finally said, “That was stupid.”'],
  [110,'tsubasa','“Consistent,” Tsubasa repeated.'],
  [110,'aya','Then added, “And if you discover what I think you will discover, do not bury it because he is No.2.”'],
  [110,'tsubasa','Then said, “Good.”'],

  [111,'luo','“No,” he rasped.'],

  [114,'ilyra','Ilyra Serath simply sheathed her weapon and said, “Finally.”'],
  [114,'maedra','Maedra Dravaryn, joining by sealed field relay from another Isgard command point, said, “That was not the question.”'],
  [114,'liang','Liang Yue, standing beside the second pillar, muttered, “Terrible idea.”'],
  [114,'qin','He still asked, “What does it look like?”'],
  [114,'solveig','Solveig, standing between them, said, “Sign the document.”'],
];

const special = [
  {
    season:95, key:'luweiran',
    old:'[[speaker:sera]]“Do not spook him?”\n\n“Yes.”\n\n[[speaker:sera]]“Did we spook him?”',
    neu:'[[speaker:sera]]“Do not spook him?”\n\n[[speaker:luweiran]]“Yes.”\n\n[[speaker:sera]]“Did we spook him?”',
  },
  {
    season:95, key:'luweiran',
    old:'[[speaker:xie_wuchen]]“I assume you are following that one.”\n\n“Yes.”\n\n[[speaker:xie_wuchen]]“Then I am done.”',
    neu:'[[speaker:xie_wuchen]]“I assume you are following that one.”\n\n[[speaker:luweiran]]“Yes.”\n\n[[speaker:xie_wuchen]]“Then I am done.”',
  },
  {
    season:95, key:'sera',
    old:'[[speaker:xie_wuchen]]“The problem is no longer immediate.”\n\n“No.”\n\n[[speaker:xie_wuchen]]“Then I am leaving.”',
    neu:'[[speaker:xie_wuchen]]“The problem is no longer immediate.”\n\n[[speaker:sera]]“No.”\n\n[[speaker:xie_wuchen]]“Then I am leaving.”',
  },
];

function count(hay, needle) { return hay.split(needle).length - 1; }
function replaceExactlyOnce(path, old, neu, label) {
  const src = readFileSync(path, 'utf8');
  const n = count(src, old);
  if (n !== 1) throw new Error(`${label}: expected exactly one match in ${path}, found ${n}`);
  if (src.includes(`[[speaker:${label.split(':')[0]}]]${old}`)) throw new Error(`${label}: appears already marked`);
  writeFileSync(path, src.replace(old, neu));
}

let applied = 0;
for (const [season,key,text] of older) {
  const path = `src/data/seasons/season-${String(season).padStart(3,'0')}.json`;
  const src = readFileSync(path,'utf8');
  const marked = `[[speaker:${key}]]${text}`;
  if (src.includes(marked)) throw new Error(`S${season} ${key}: target already marked: ${text}`);
  const n = count(src,text);
  if (n !== 1) throw new Error(`S${season} ${key}: expected one occurrence, found ${n}: ${text}`);
  writeFileSync(path,src.replace(text,marked));
  applied++;
}

const proseFiles = readdirSync('docs/prose').filter(f=>/^FINAL_ARC_SEASON\d{3}_PROSE_DRAFT(?:_\d+)?\.md$/.test(f));
function finalFiles(season){const prefix=`FINAL_ARC_SEASON${String(season).padStart(3,'0')}_PROSE_DRAFT`;return proseFiles.filter(f=>f.startsWith(prefix)).map(f=>`docs/prose/${f}`);}
function applyAcrossSeason(season,key,text){
  const paths=finalFiles(season); if(!paths.length) throw new Error(`S${season}: no prose files`);
  const hits=[];
  for(const path of paths){const src=readFileSync(path,'utf8');if(src.includes(`[[speaker:${key}]]${text}`)) throw new Error(`S${season} ${key}: already marked in ${path}: ${text}`);const n=count(src,text);if(n)hits.push({path,n});}
  const total=hits.reduce((s,x)=>s+x.n,0);
  if(total!==1) throw new Error(`S${season} ${key}: expected one occurrence across season, found ${total}: ${text}`);
  const {path}=hits[0]; const src=readFileSync(path,'utf8'); writeFileSync(path,src.replace(text,`[[speaker:${key}]]${text}`));
  applied++;
}
for(const [season,key,text] of final) applyAcrossSeason(season,key,text);
for(const x of special){
  const paths=finalFiles(x.season); const hits=[];
  for(const path of paths){const src=readFileSync(path,'utf8');const n=count(src,x.old);if(n)hits.push({path,n});}
  const total=hits.reduce((s,z)=>s+z.n,0); if(total!==1) throw new Error(`S${x.season} special ${x.key}: expected one context match, found ${total}`);
  const {path}=hits[0]; const src=readFileSync(path,'utf8'); writeFileSync(path,src.replace(x.old,x.neu)); applied++;
}

const expected=older.length+final.length+special.length;
if(applied!==expected) throw new Error(`Expected ${expected} fixes, applied ${applied}`);
console.log(`Applied ${applied} reviewed dialogue speaker markers (${older.length} older-arc, ${final.length+special.length} final-arc).`);
