import { readFile, writeFile } from 'node:fs/promises';

const path = 'docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT.md';
let text = await readFile(path, 'utf8');

const clean = (value) => value.replace(/^\[\[speaker:[a-z0-9_]+\]\]/, '');

function getParagraphs(source) {
  const out = [];
  let start = 0;
  const re = /\n\n/g;
  let match;
  while ((match = re.exec(source))) {
    out.push({ text: source.slice(start, match.index), start });
    start = match.index + 2;
  }
  out.push({ text: source.slice(start), start });
  return out;
}

function chapterBounds(source, chapter) {
  const marker = `## Chapter ${chapter} —`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Missing chapter ${chapter}`);
  const next = source.indexOf('\n## Chapter ', start + marker.length);
  return [start, next < 0 ? source.length : next];
}

const rules = [
  // Chapter 302 leftovers
  [302, '“You\'re about to ask me again.”', '“Yes.”', '“Every time?”', 'rhen'],
  [302, '“Yes.”', '“Every time?”', '“Yes.”', 'sera'],
  [302, '“Every time?”', '“Yes.”', '“You know my answer.”', 'rhen'],
  [302, '“Yes.”', '“You know my answer.”', '“I know your previous answer.”', 'sera'],
  [302, '“You know my answer.”', '“I know your previous answer.”', 'That was why she loved him.', 'rhen'],

  // Chapter 303
  [303, 'When the sequence ended, she lowered her hand.', '“Dismissed.”', 'Nobody moved.', 'arin'],
  [303, '“Master.”', '“What?”', '“You said we were rebuilding the east practice wall today.”', 'arin'],
  [303, '“That was moisture.”', '“Of course.”', 'Arin approached carrying a stack of replacement braces.', 'sera'],
  [303, 'She looked up at Rhen.', '“Can you actually heal wood?”', '“No.”', 'arin'],
  [303, '“Can you actually heal wood?”', '“No.”', 'The beam creaked into a more reasonable position.', 'rhen'],
  [303, '“Fit for formation.”', '“The others?”', '“One thousand four hundred eighty-six alive outside formation. Wounded. Retired. Teaching. Some left martial life entirely.”', 'sera'],
  [303, '“The others?”', '“One thousand four hundred eighty-six alive outside formation. Wounded. Retired. Teaching. Some left martial life entirely.”', '“And the dead?”', 'arin'],
  [303, '“One thousand four hundred eighty-six alive outside formation. Wounded. Retired. Teaching. Some left martial life entirely.”', '“And the dead?”', 'Arin did not answer immediately.', 'sera'],
  [303, '“You could probably put half the injured back into formation.”', '“Yes.”', '“You have not.”', 'rhen'],
  [303, '“Yes.”', '“You have not.”', '“No.”', 'arin'],
  [303, '“You have not.”', '“No.”', '“Why?”', 'rhen'],
  [303, '“No.”', '“Why?”', '“Because injured and retired are not the same word.”', 'arin'],
  [303, '“Why?”', '“Because injured and retired are not the same word.”', 'Arin watched him.', 'rhen'],
  [303, 'Then eased.', '“Good.”', 'Behind them, someone dropped a brace.', 'arin'],
  [303, '“Good.”', '“Coastal rebuilding behind schedule.”', '“Less good.”', 'sera'],
  [303, '“Coastal rebuilding behind schedule.”', '“Less good.”', '“Aldric is complaining about Wuyue lumber prices.”', 'rhen'],
  [303, '“Less good.”', '“Aldric is complaining about Wuyue lumber prices.”', '“That sounds healthy.”', 'sera'],
  [303, '“Aldric is complaining about Wuyue lumber prices.”', '“That sounds healthy.”', 'Sera snorted.', 'rhen'],
  [303, '“It contains licorice.”', '“That does not defend it.”', '“It absolutely does.”', 'sera'],
  [303, '“That does not defend it.”', '“It absolutely does.”', 'Sera folded the letter.', 'rhen'],
  [303, '“That\'s it?”', '“That is generally the goal.”', 'Rhen turned away.', 'rhen'],
  [303, '“What?”', '“Nothing.”', 'She raised one eyebrow.', 'rhen'],
  [303, '“Something small.”', '“What?”', 'He considered the sensation.', 'sera'],
  [303, 'He considered the sensation.', '“My reserve filled faster than expected.”', '“How much faster?”', 'rhen'],
  [303, '“My reserve filled faster than expected.”', '“How much faster?”', '“Enough that I noticed.”', 'sera'],
  [303, '“How much faster?”', '“Enough that I noticed.”', 'Sera\'s expression changed.', 'rhen'],
  [303, '“Not dangerous.”', '“You do not get to use that tone.”', '“What tone?”', 'sera'],
  [303, '“You do not get to use that tone.”', '“What tone?”', '“The healer tone.”', 'rhen'],
  [303, '“What tone?”', '“The healer tone.”', '“I am a healer.”', 'sera'],
  [303, '“The healer tone.”', '“I am a healer.”', '“You are my husband first when I ask what is wrong.”', 'rhen'],
  [303, '“I am a healer.”', '“You are my husband first when I ask what is wrong.”', 'Rhen looked at her.', 'sera'],
  [303, 'He squeezed her wrist gently.', '“I do not know yet.”', '“Better.”', 'rhen'],
  [303, '“I do not know yet.”', '“Better.”', '“It may simply be the Garden becoming more efficient.”', 'sera'],
  [303, '“Better.”', '“It may simply be the Garden becoming more efficient.”', '“May.”', 'rhen'],
  [303, '“It may simply be the Garden becoming more efficient.”', '“May.”', '“Yes.”', 'sera'],
  [303, '“May.”', '“Yes.”', '“And if it happens again?”', 'rhen'],
  [303, '“Yes.”', '“And if it happens again?”', '“I tell you.”', 'sera'],
  [303, '“And if it happens again?”', '“I tell you.”', '“Immediately.”', 'rhen'],
  [303, '“I tell you.”', '“Immediately.”', '“Yes.”', 'sera'],
  [303, '“Immediately.”', '“Yes.”', 'Sera narrowed her eyes.', 'rhen'],
  [303, '“Before you ask.”', '“Good.”', 'She released him.', 'sera'],

  // Chapter 304
  [304, 'Then at everyone else.', '“Do not comment.”', 'Luo handed her his spare sandals.', 'yun'],
  [304, 'He looked at the patient.', '“And then?”', '“Five minutes.”', 'tae'],
  [304, 'He did not name it yet.', '“Luo.”', 'Luo was already beside him.', 'rhen'],
  [304, 'Luo was already beside him.', '“Pulse is wrong.”', '“Which part?” Yun asked.', 'luo'],
  [304, '“Which part?” Yun asked.', '“All of it.”', '“That is technically not useful.”', 'luo'],
  [304, '“All of it.”', '“That is technically not useful.”', '“The rebound is too deep for simple overcirculation. His body did not borrow only qi.”', 'yun'],
  [304, '“That is technically not useful.”', '“The rebound is too deep for simple overcirculation. His body did not borrow only qi.”', 'Yun crouched near the discarded clothing.', 'luo'],
  [304, 'He looked at her.', '“You know those are mine.”', '“You know I improve them by using them.”', 'luo'],
  [304, '“You know those are mine.”', '“You know I improve them by using them.”', '“That is not how ownership works.”', 'yun'],
  [304, '“You know I improve them by using them.”', '“That is not how ownership works.”', '“Focus.”', 'luo'],
  [304, '“That is not how ownership works.”', '“Focus.”', 'Luo\'s expression suggested he had several answers and had wisely chosen none.', 'yun'],
  [304, '“Northwest Isgard. Trade road feeding the epidemic clinics.”', '“Smuggling what?”', '“Medical compounds. Some legitimate. Some mislabeled. We only knew the escort was wrong because one crate carried a clinic seal from a hospital that burned last winter.”', 'sera'],
  [304, '“How was I holding him?”', '“You were about to use one hand.”', '“Yes.”', 'luo'],
  [304, '“You were about to use one hand.”', '“Yes.”', '“He is convulsing.”', 'huo'],
  [304, '“Yes.”', '“He is convulsing.”', '“I noticed.”', 'luo'],
  [304, '“He is convulsing.”', '“I noticed.”', '“Use two.”', 'huo'],
  [304, '“I noticed.”', '“Use two.”', 'Huo looked insulted.', 'luo'],
  [304, '“You were not here when they said it.”', '“I have ears.”', '“You also have a personality problem.”', 'tae'],
  [304, '“I have ears.”', '“You also have a personality problem.”', 'Sera ignored them.', 'huo'],
  [304, '“What happened?” she asked Rhen.', '“His cultivation stayed Peak Marquis.”', '“Then how did he move like that?”', 'rhen'],
  [304, '“His cultivation stayed Peak Marquis.”', '“Then how did he move like that?”', 'Rhen looked at Yun.', 'sera'],
  [304, 'She had lifted the stained collar toward the lamp without touching the residue.', '“Something forced throughput.”', 'Yun\'s eyes sharpened.', 'rhen'],
  [304, '“Chemical.”', '“Probably.”', 'Luo leaned over the sample.', 'rhen'],
  [304, '“Circulatory stimulant?”', '“Not ordinary.”', 'Yun smiled without humor.', 'rhen'],
  [304, '“You missed three tears.”', '“No.”', 'Rhen touched the patient\'s wrist.', 'rhen'],
  [304, 'Then to another tear near the shoulder.', '“Whatever he took told it not to.”', 'Then the third.', 'yun'],
  [304, 'Then the third.', '“And when the second warning came, it told that one to be quiet too.”', 'Luo\'s face had gone still.', 'yun'],
  [304, '“This was designed.”', '“Obviously.”', '“By someone who understood medicine.”', 'yun'],
  [304, '“Obviously.”', '“By someone who understood medicine.”', 'Yun looked at him.', 'luo'],
  [304, '“In Isgard?”', '“Originally, no.”', '“Where?”', 'luweiran'],
  [304, '“Originally, no.”', '“Where?”', 'Lu tapped a small notation written beside a shipping code.', 'sera'],
  [304, '“I don\'t know what it was.”', '“That is different.”', 'He swallowed.', 'yun'],
  [304, 'She looked back.', '“It sounds a little fun.”', '“It sounds medically catastrophic.”', 'yun'],
  [304, '“It sounds a little fun.”', '“It sounds medically catastrophic.”', '“Exactly.”', 'luo'],
  [304, '“It sounds medically catastrophic.”', '“Exactly.”', 'Luo closed his eyes.', 'yun'],
];

const paragraphs = getParagraphs(text);
const insertions = [];

for (const [chapter, prev, quote, next, speaker] of rules) {
  const [start, end] = chapterBounds(text, chapter);
  const matches = [];
  for (let i = 1; i < paragraphs.length - 1; i++) {
    const p = paragraphs[i];
    if (p.start < start || p.start >= end) continue;
    if (clean(paragraphs[i - 1].text) === prev && clean(p.text) === quote && clean(paragraphs[i + 1].text) === next) matches.push(p.start);
  }
  if (matches.length !== 1) throw new Error(`Ch${chapter}: expected one match for ${quote}, found ${matches.length}`);
  if (paragraphs.find((p) => p.start === matches[0]).text.startsWith('[[speaker:')) throw new Error(`Ch${chapter}: target already marked: ${quote}`);
  insertions.push([matches[0], `[[speaker:${speaker}]]`]);
}

const seen = new Set();
for (const [pos] of insertions) {
  if (seen.has(pos)) throw new Error(`Duplicate insertion at ${pos}`);
  seen.add(pos);
}

insertions.sort((a, b) => b[0] - a[0]);
for (const [pos, marker] of insertions) text = text.slice(0, pos) + marker + text.slice(pos);

await writeFile(path, text, 'utf8');
console.log(`Inserted ${insertions.length} explicit speaker markers into Chapters 302–304.`);
