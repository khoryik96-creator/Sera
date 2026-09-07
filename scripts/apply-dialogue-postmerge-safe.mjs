import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=process.cwd();
const proseDir=resolve(root,'docs/prose');
const registryPath=resolve(root,'src/characterRegistry.ts');
const SOURCE_RE=/^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE=/^## Chapter (\d+) — /gm;
const SPEECH_WORDS='(?:said|asked|answered|replied|called|shouted|whispered|murmured|muttered|snapped|continued|added|told|spoke)';
function escRe(v){return v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}

const reg=await readFile(registryPath,'utf8');
const aliases=[];
for(const m of reg.matchAll(/\{ key: '([a-z0-9_]+)',[^\n]*aliases: \[([^\]]+)\](?:, speakerKeys: \[([^\]]+)\])?/g)){
  const key=m[1];
  const names=[...m[2].matchAll(/'([^']+)'/g)].map(x=>x[1]);
  const sk=m[3]?[...m[3].matchAll(/'([^']+)'/g)].map(x=>x[1]):[key];
  for(const alias of names) aliases.push({alias,key:sk[0]||key});
}
aliases.sort((a,b)=>b.alias.length-a.alias.length);

function explicitSpeakers(text){
  const found=[];
  for(const row of aliases){
    const a=escRe(row.alias);
    if(new RegExp(`\\b${a}\\s+${SPEECH_WORDS}\\b`,'i').test(text) || new RegExp(`\\b${a}[’']s\\s+voice\\b`,'i').test(text)) found.push(row);
  }
  return [...new Map(found.map(x=>[x.key,x])).values()];
}

// Human-reviewed standalone misses. Context is included so duplicate short replies
// cannot be tagged by quote text alone.
const standaloneMaps=[
  {chapter:401,quote:'“Yes.”',speaker:'aya',before:'Jun corrected himself.',after:'He reached for the halberd resting beside the cot.'},
  {chapter:404,quote:'“Yes.”',speaker:'aya',before:'None answered him.',after:'The boy looked away.'},
  {chapter:418,quote:'“Yes.”',speaker:'maedra',before:'Maedra’s expression changed.',after:'Luo followed her gaze.'},
  {chapter:430,quote:'“Yes.”',speaker:'sera',before:'[[speaker:jin]]“They’re back.”',after:'Luo folded the report very neatly.'},
  {chapter:439,quote:'“Yes.”',speaker:'qin',before:'[[speaker:tae]]“That is new.”',after:'Qin placed his fingertips against the outer stone.'},
  {chapter:439,quote:'“Good.”',speaker:'huo',before:'“No,” Lu said.',after:'Nobody woke Rhen.'}
];

function applyStandalone(text, file){
  const heads=[...text.matchAll(CHAPTER_RE)];
  let changed=0;
  for(const map of standaloneMaps){
    const hIndex=heads.findIndex(h=>Number(h[1])===map.chapter);
    if(hIndex<0) continue;
    const h=heads[hIndex], start=h.index+h[0].length, end=heads[hIndex+1]?.index??text.length;
    const body=text.slice(start,end);
    const paras=body.trim().split(/\n{2,}/);
    let hit=-1;
    for(let i=0;i<paras.length;i++){
      const p=paras[i].trim();
      if(p!==map.quote) continue;
      const prev=paras[i-1]?.trim()||''; const next=paras[i+1]?.trim()||'';
      if(prev===map.before && next===map.after){ if(hit!==-1) throw new Error(`${file} Ch${map.chapter}: duplicate anchored match for ${map.quote}`); hit=i; }
    }
    if(hit===-1) throw new Error(`${file} Ch${map.chapter}: missing anchored match for ${map.quote}`);
    paras[hit]=`[[speaker:${map.speaker}]]${map.quote}`;
    const newBody='\n\n'+paras.join('\n\n').trim()+'\n\n';
    text=text.slice(0,start)+newBody+text.slice(end);
    changed++;
    // Recompute headings because replacement changes indexes.
    return {text,changed,restart:true};
  }
  return {text,changed,restart:false};
}

const files=(await readdir(proseDir)).filter(f=>SOURCE_RE.test(f)).sort();
let mixedAdded=0, mixedMultiSkipped=0, standaloneAdded=0;
for(const f of files){
  const sm=SOURCE_RE.exec(f); const season=Number(sm[1]);
  if(season<95||season>114) continue;
  const path=resolve(proseDir,f);
  let text=(await readFile(path,'utf8')).replace(/\r\n/g,'\n');
  const paras=text.split(/\n{2,}/);
  let fileChanged=false;
  for(let i=0;i<paras.length;i++){
    const p=paras[i].trim();
    if(!p || /^\[\[speaker:[^\]]+\]\]/.test(p) || !p.includes('“') || !p.includes('”')) continue;
    const standalone=p.startsWith('“') && /”[.!?…]?$/u.test(p);
    if(standalone) continue;
    const speakers=explicitSpeakers(p);
    if(speakers.length===1){ paras[i]=`[[speaker:${speakers[0].key}]]${p}`; mixedAdded++; fileChanged=true; }
    else if(speakers.length>1) mixedMultiSkipped++;
  }
  if(fileChanged) text=paras.join('\n\n');

  // Apply each anchored standalone mapping for chapters present in this file.
  for(const map of standaloneMaps.filter(m=>new RegExp(`^## Chapter ${m.chapter} — `,'m').test(text))){
    const heads=[...text.matchAll(CHAPTER_RE)];
    const hIndex=heads.findIndex(h=>Number(h[1])===map.chapter);
    const h=heads[hIndex], start=h.index+h[0].length, end=heads[hIndex+1]?.index??text.length;
    const body=text.slice(start,end);
    const ps=body.trim().split(/\n{2,}/);
    const matches=[];
    for(let i=0;i<ps.length;i++){
      if(ps[i].trim()!==map.quote) continue;
      if((ps[i-1]?.trim()||'')===map.before && (ps[i+1]?.trim()||'')===map.after) matches.push(i);
    }
    if(matches.length!==1) throw new Error(`${f} Ch${map.chapter}: expected 1 anchored ${map.quote}, found ${matches.length}`);
    ps[matches[0]]=`[[speaker:${map.speaker}]]${map.quote}`;
    text=text.slice(0,start)+'\n\n'+ps.join('\n\n').trim()+'\n\n'+text.slice(end);
    standaloneAdded++; fileChanged=true;
  }
  if(fileChanged) await writeFile(path,text);
}

// Make mixed marked paragraphs preserve normal narration inside the card while
// keeping every quoted span visually emphasized.
const novelPath=resolve(root,'src/novel.ts');
let novel=await readFile(novelPath,'utf8');
const old=`function annotateDialogue(text: string, interactiveNames: boolean): string {\n  return String(text || '').split('\\n').map((line) => {\n    const match = line.match(/^\\[\\[speaker:([a-z0-9_]+)\\]\\](.*)$/);\n    if (!match) return line;\n    const speakerKey = match[1];\n    const key = colorKeyMap[speakerKey] || speakerKey;\n    const name = speakerName(speakerKey);\n    const entry = entryForSpeaker(speakerKey);\n    const speaker = characterMarkup(name, key, entry?.key, 'novel-speaker dialogue-speaker', interactiveNames);\n    return \`<span class="novel-dialogue dialogue-card character-\${key}">\${speaker}<b class="dialogue-quote">\${match[2]}</b></span>\`;\n  }).join('\\n');\n}`;
const replacement=`function dialogueBodyMarkup(body: string): string {\n  const quoted = [...body.matchAll(/“[^”]*”/gu)];\n  const narration = body.replace(/“[^”]*”/gu, '').trim();\n  if (!quoted.length || !narration) return \`<b class="dialogue-quote">\${body}</b>\`;\n  return body.replace(/“[^”]*”/gu, (quote) => \`<b class="dialogue-quote">\${quote}</b>\`);\n}\n\nfunction annotateDialogue(text: string, interactiveNames: boolean): string {\n  return String(text || '').split('\\n').map((line) => {\n    const match = line.match(/^\\[\\[speaker:([a-z0-9_]+)\\]\\](.*)$/);\n    if (!match) return line;\n    const speakerKey = match[1];\n    const key = colorKeyMap[speakerKey] || speakerKey;\n    const name = speakerName(speakerKey);\n    const entry = entryForSpeaker(speakerKey);\n    const speaker = characterMarkup(name, key, entry?.key, 'novel-speaker dialogue-speaker', interactiveNames);\n    return \`<span class="novel-dialogue dialogue-card character-\${key}">\${speaker}\${dialogueBodyMarkup(match[2])}</span>\`;\n  }).join('\\n');\n}`;
if(!novel.includes(old)) throw new Error('src/novel.ts annotateDialogue block changed; refusing unsafe replacement');
novel=novel.replace(old,replacement);
await writeFile(novelPath,novel);

const testPath=resolve(root,'test/novel.test.ts');
let test=await readFile(testPath,'utf8');
const anchor=`  it('renders dialogue as a card with the speaker name and quote', () => {\n    const out = renderNovel('[[speaker:han]]“One person?”');\n    expect(out).toContain('dialogue-card');\n    expect(out).toContain('dialogue-speaker');\n    expect(out).toContain('Han Myeong');\n    expect(out).toContain('dialogue-quote');\n  });\n`;
const extra=`\n  it('keeps narration normal inside mixed dialogue cards', () => {\n    const out = renderNovel('[[speaker:sera]]“No,” she said. “Not today.”');\n    expect((out.match(/class="dialogue-quote"/g) || []).length).toBe(2);\n    expect(out).toContain('<b class="dialogue-quote">“No,”</b> she said. <b class="dialogue-quote">“Not today.”</b>');\n    expect(out).not.toContain('<b class="dialogue-quote">“No,” she said.');\n  });\n`;
if(!test.includes(extra.trim())){
  if(!test.includes(anchor)) throw new Error('test/novel.test.ts anchor changed; refusing unsafe insertion');
  test=test.replace(anchor,anchor+extra);
  await writeFile(testPath,test);
}

console.log({mixedAdded,mixedMultiSkipped,standaloneAdded});
