import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=process.cwd();
const proseDir=resolve(root,'docs/prose');
const registryPath=resolve(root,'src/characterRegistry.ts');
const SOURCE_RE=/^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE=/^## Chapter (\d+) — /gm;
const SPEECH_WORDS='(?:said|asked|answered|replied|called|shouted|whispered|murmured|muttered|snapped|continued|added|told|spoke)';
function escRe(v){return v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
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

function explicitSpeakers(text){
  const narration=outsideQuotes(text);
  const found=[];
  for(const row of aliases){
    const a=escRe(row.alias);
    if(new RegExp(`\\b${a}\\s+${SPEECH_WORDS}\\b`,'i').test(narration) || new RegExp(`\\b${a}[’']s\\s+voice\\b`,'i').test(narration)) found.push(row);
  }
  return [...new Map(found.map(x=>[x.key,x])).values()];
}

// Human-reviewed standalone misses. Exact neighbouring paragraphs are required,
// so duplicated replies such as “Yes.” cannot be tagged by turn-taking alone.
const standaloneMaps=[
  // Season 95
  {chapter:306,quote:'“No.”',speaker:'yun',before:'“I didn\'t agree to that.”',after:'That word mattered.'},
  {chapter:306,quote:'“Yes.”',speaker:'rhen',before:'[[speaker:sera]]“Faster again?” she asked.',after:'[[speaker:sera]]“How fast?”'},
  {chapter:307,quote:'“Yes.”',speaker:'luweiran',before:'[[speaker:sera]]“And those rules leave a trail.”',after:'Lu pointed at three route marks.'},
  {chapter:307,quote:'“No.”',speaker:'luweiran',before:'[[speaker:sera]]“That is it?”',after:'[[speaker:sera]]“The same rope?”'},
  {chapter:307,quote:'“No.”',speaker:'luweiran',before:'[[speaker:sera]]“The same rope?”',after:'[[speaker:sera]]“The same carpenter?”'},
  {chapter:307,quote:'“No.”',speaker:'luweiran',before:'[[speaker:sera]]“Those are not accidental.”',after:'[[speaker:sera]]“Who?”'},
  {chapter:307,quote:'“Where?”',speaker:'sera',before:'[[speaker:luweiran]]“One relocated.”',after:'“Unknown.”'},
  {chapter:307,quote:'“Unknown.”',speaker:'luweiran',before:'[[speaker:sera]]“Where?”',after:'[[speaker:sera]]“And the third?”'},
  {chapter:307,quote:'“Yes.”',speaker:'luweiran',before:'[[speaker:sera]]“Wuyue?”',after:'That changed the problem.'},
  {chapter:307,quote:'“Unknown.”',speaker:'luo',before:'[[speaker:sera]]“How long?” Sera asked.',after:'“Cost?”'},
  {chapter:307,quote:'“Cost?”',speaker:'sera',before:'[[speaker:luo]]“Unknown.”',after:'“Unknown.”'},
  {chapter:307,quote:'“Unknown.”',speaker:'luo',before:'[[speaker:sera]]“Cost?”',after:'Lu\'s expression remained flat.'},
  {chapter:307,quote:'“No.”',speaker:'luo',before:'[[speaker:yun]]“Defend me.”',after:'[[speaker:yun]]“Coward.”'},
  {chapter:308,quote:'“Yes.”',speaker:'sera',before:'“Now?”',after:'“Before I tell you anything?”'},
  {chapter:308,quote:'“Yes.”',speaker:'sera',before:'“Before I tell you anything?”',after:'Dae frowned.'},
  {chapter:308,quote:'“No.”',speaker:'luweiran',before:'“She knows?”',after:'“Oh.”'},
  {chapter:308,quote:'“What?”',speaker:'luweiran',before:'[[speaker:sera]]“Lu.”',after:'[[speaker:sera]]“Less helpful.”'},
  {chapter:309,quote:'“Do not.”',speaker:'rui',before:'[[speaker:sera]]“How badly?”',after:'Lu was already writing.'},

  // Season 105
  {chapter:401,quote:'“Yes.”',speaker:'aya',before:'[[speaker:jun]]“Stop.”',after:'He reached for the halberd resting beside the cot.'},
  {chapter:404,quote:'“Yes.”',speaker:'aya',before:'“That it’s an emergency stimulant.”',after:'“Three-times output for around five minutes.”'},
  {chapter:404,quote:'“Yes.”',speaker:'aya',before:'“Three-times output for around five minutes.”',after:'“Severe fatigue. Meridian damage. Recovery can take months. Repeated use is dangerous.”'},
  {chapter:404,quote:'“Yes.”',speaker:'aya',before:'None answered him.',after:'The boy looked away.'},

  // Seasons 106–108
  {chapter:418,quote:'“Yes.”',speaker:'maedra',before:'Maedra’s expression changed.',after:'Luo followed her gaze.'},
  {chapter:429,quote:'“Yes.”',speaker:'sera',before:'“Internal damage.”',after:'“Dehydration.”'},
  {chapter:429,quote:'“Yes.”',speaker:'sera',before:'“Dehydration.”',after:'[[speaker:sera]]“You’ve been spending time with Luo.”'},
  {chapter:430,quote:'“Yes.”',speaker:'sera',before:'[[speaker:jin]]“They’re back.”',after:'Luo folded the report very neatly.'},
  {chapter:439,quote:'“Yes.”',speaker:'qin',before:'[[speaker:tae]]“That is new.”',after:'Qin placed his fingertips against the outer stone.'},
  {chapter:439,quote:'“Good.”',speaker:'huo',before:'[[speaker:luweiran]]“No,” Lu said.',after:'Nobody woke Rhen.'}
];

// Pronoun-attributed mixed paragraphs reviewed in their full scene. These are
// explicit speech attributions once the pronoun antecedent is resolved; prose is
// not rewritten, only a marker is prepended.
const mixedManualMaps=[
  {chapter:306,paragraph:'“Faster again?” she asked.',speaker:'sera'},
  {chapter:312,paragraph:'“When it stops being pottery,” she said, “you tell me.”',speaker:'sera'},
  {chapter:313,paragraph:'“Fine,” she said. “Be dramatic.”',speaker:'sera'},
  {chapter:313,paragraph:'“Then a responsibility,” he continued. “Then an office. Then one day somebody points at a person you’ve never met and says the banner requires you to kill them.”',speaker:'xie_wuchen'},
  {chapter:334,paragraph:'“The qi needs to become denser,” he said. “Same amount. Less space.”',speaker:'rhen'},
  {chapter:334,paragraph:'“When it crosses from annoying to unsafe,” she said, “you tell me.”',speaker:'sera'},
  {chapter:416,paragraph:'“You do not honor dead people by making one more injury permanent when it can be healed.” Her voice was quiet, but there was iron beneath it. “A physician does not correct injustice by creating another patient.”',speaker:'aya'},
  {chapter:429,paragraph:'“Next time,” she said quietly.',speaker:'sera'}
];

const files=(await readdir(proseDir)).filter(f=>SOURCE_RE.test(f)).sort();
let mixedAdded=0, mixedMultiSkipped=0, mixedManualAdded=0, standaloneAdded=0;
for(const f of files){
  const sm=SOURCE_RE.exec(f); const season=Number(sm[1]);
  if(season<95||season>114) continue;
  const path=resolve(proseDir,f);
  let text=(await readFile(path,'utf8')).replace(/\r\n/g,'\n');
  let paras=text.split(/\n{2,}/);
  let fileChanged=false;

  // Explicit named attributions in the same mixed paragraph are factual. Ignore
  // names occurring inside the spoken quotation itself and require one unique key.
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

  // Manual mixed paragraphs. Match within the owning chapter and insist on one hit.
  for(const map of mixedManualMaps.filter(m=>new RegExp(`^## Chapter ${m.chapter} — `,'m').test(text))){
    const heads=[...text.matchAll(CHAPTER_RE)];
    const hIndex=heads.findIndex(h=>Number(h[1])===map.chapter);
    const h=heads[hIndex], start=h.index+h[0].length, end=heads[hIndex+1]?.index??text.length;
    const body=text.slice(start,end); const ps=body.trim().split(/\n{2,}/);
    const matches=[];
    for(let i=0;i<ps.length;i++) if(ps[i].trim()===map.paragraph) matches.push(i);
    if(matches.length!==1) throw new Error(`${f} Ch${map.chapter}: expected 1 manual mixed paragraph, found ${matches.length}: ${map.paragraph}`);
    ps[matches[0]]=`[[speaker:${map.speaker}]]${map.paragraph}`;
    text=text.slice(0,start)+'\n\n'+ps.join('\n\n').trim()+'\n\n'+text.slice(end);
    mixedManualAdded++; fileChanged=true;
  }

  // Anchored standalone mappings. Recompute chapter offsets for every change.
  for(const map of standaloneMaps.filter(m=>new RegExp(`^## Chapter ${m.chapter} — `,'m').test(text))){
    const heads=[...text.matchAll(CHAPTER_RE)];
    const hIndex=heads.findIndex(h=>Number(h[1])===map.chapter);
    const h=heads[hIndex], start=h.index+h[0].length, end=heads[hIndex+1]?.index??text.length;
    const body=text.slice(start,end); const ps=body.trim().split(/\n{2,}/);
    const matches=[];
    for(let i=0;i<ps.length;i++){
      if(ps[i].trim()!==map.quote) continue;
      if((ps[i-1]?.trim()||'')===map.before && (ps[i+1]?.trim()||'')===map.after) matches.push(i);
    }
    if(matches.length!==1) throw new Error(`${f} Ch${map.chapter}: expected 1 anchored ${map.quote}, found ${matches.length}; before=${map.before}; after=${map.after}`);
    ps[matches[0]]=`[[speaker:${map.speaker}]]${map.quote}`;
    text=text.slice(0,start)+'\n\n'+ps.join('\n\n').trim()+'\n\n'+text.slice(end);
    standaloneAdded++; fileChanged=true;
  }
  if(fileChanged) await writeFile(path,text);
}

// Mixed marked paragraphs keep narration normal-weight while each spoken segment
// remains visually emphasized inside the character's dialogue card.
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

console.log({mixedAdded,mixedMultiSkipped,mixedManualAdded,standaloneAdded});
