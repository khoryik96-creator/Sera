import { readFile, writeFile } from 'node:fs/promises';

const path = 'docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT.md';
let text = await readFile(path, 'utf8');

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
  // Chapter 301
  [301, '“They surprised me.”', '“That is because you were eating.”', '“I can do two things.”', 'tae'],
  [301, '“That is because you were eating.”', '“I can do two things.”', '“You were doing one badly.”', 'huo'],
  [301, '“I can do two things.”', '“You were doing one badly.”', 'Rhen looked back at Sera.', 'tae'],
  [301, '“You say that like the sign is not the expensive thing you\'re about to destroy.”', '“It is wood.”', '“It is history.”', 'rhen'],
  [301, '“It is wood.”', '“It is history.”', '“It is crooked.”', 'sera'],
  [301, '“It is history.”', '“It is crooked.”', '“So are you.”', 'rhen'],
  [301, '“It is crooked.”', '“So are you.”', 'Rhen stared at her.', 'sera'],
  [301, 'She looked down at it.', '“I\'m not falling.”', '“I know.”', 'sera'],
  [301, '“I\'m not falling.”', '“I know.”', '“You moved before I even climbed.”', 'rhen'],
  [301, '“I know.”', '“You moved before I even climbed.”', '“I know.”', 'sera'],
  [301, '“You moved before I even climbed.”', '“I know.”', '“That is extremely annoying.”', 'rhen'],
  [301, '“I know.”', '“That is extremely annoying.”', '“I know.”', 'sera'],
  [301, '“That is extremely annoying.”', '“I know.”', 'She climbed one rung higher anyway.', 'rhen'],
  [301, 'Then at her.', '“You made it worse.”', '“I made it ours.”', 'rhen'],
  [301, '“You made it worse.”', '“I made it ours.”', '“That sentence does not improve the angle.”', 'sera'],
  [301, '“I made it ours.”', '“That sentence does not improve the angle.”', '“It improves everything else.”', 'rhen'],
  [301, '“That sentence does not improve the angle.”', '“It improves everything else.”', 'Before Rhen could answer, the front door opened behind them.', 'sera'],
  [301, 'Lu called back, “I did not ask you.”', '“Still not me.”', '“That makes it more suspicious.”', 'huo'],
  [301, '“Still not me.”', '“That makes it more suspicious.”', 'Sera stepped past Qin.', 'luweiran'],
  [301, '“Good morning, Lu.”', '“It was.”', 'The tea room was full enough that Sera had to turn sideways between two tables.', 'luweiran'],
  [301, '“You counted?”', '“Yes.”', '“That is romantic.”', 'luo'],
  [301, '“Yes.”', '“That is romantic.”', '“That is inventory.”', 'yun'],
  [301, '“That is romantic.”', '“That is inventory.”', '“Same thing if you care enough.”', 'luo'],
  [301, '“That is inventory.”', '“Same thing if you care enough.”', 'Luo looked at Sera as she approached.', 'yun'],
  [301, 'Then up at him.', '“Very romantic.”', 'He let go.', 'yun'],
  [301, '“I have prices.”', '“You have numbers written on a board.”', '“That is what prices are.”', 'luweiran'],
  [301, '“You have numbers written on a board.”', '“That is what prices are.”', '“That is what decoration is when nobody collects them.”', 'rhen'],
  [301, '“That is what prices are.”', '“That is what decoration is when nobody collects them.”', 'Sera hid a smile in her cup.', 'luweiran'],
  [301, '“Do not encourage him.”', '“I married him. That ship left years ago.”', 'The room went quiet for exactly one second.', 'sera'],
  [301, '“You broke it.”', '“I improved it.”', '“It is in two pieces.”', 'huo'],
  [301, '“I improved it.”', '“It is in two pieces.”', '“It now travels easier.”', 'tae'],
  [301, '“It is in two pieces.”', '“It now travels easier.”', '“You are holding both pieces.”', 'huo'],
  [301, '“It now travels easier.”', '“You are holding both pieces.”', '“That is not the point.”', 'tae'],
  [301, '“You are holding both pieces.”', '“That is not the point.”', 'Huo saw Sera.', 'huo'],
  [301, '“Huo.”', '“Yes?”', '“Put it down.”', 'huo'],
  [301, '“Yes?”', '“Put it down.”', '“Where?”', 'luweiran'],
  [301, '“Put it down.”', '“Where?”', '“Somewhere I cannot see it.”', 'huo'],
  [301, '“Where?”', '“Somewhere I cannot see it.”', 'Huo considered this.', 'luweiran'],
  [301, '“No.”', '“Good.”', 'He walked away.', 'rhen'],
  [301, 'He felt her gaze before he turned.', '“What?”', '“Nothing.”', 'rhen'],
  [301, '“What?”', '“Nothing.”', '“That is never true.”', 'sera'],
  [301, '“Nothing.”', '“That is never true.”', 'She crooked one finger at him.', 'rhen'],
  [301, '“What are you doing?”', '“Respecting privacy.”', '“We are in a tea shop.”', 'huo'],
  [301, '“Respecting privacy.”', '“We are in a tea shop.”', '“Exactly.”', 'tae'],
  [301, '“We are in a tea shop.”', '“Exactly.”', 'Sera released Rhen.', 'huo'],
  [301, '“Was that about the sign?” he asked.', '“No.”', '“The tea?”', 'sera'],
  [301, '“No.”', '“The tea?”', '“No.”', 'rhen'],
  [301, '“The tea?”', '“No.”', '“You are difficult.”', 'sera'],
  [301, '“No.”', '“You are difficult.”', 'Sera leaned closer.', 'rhen'],

  // Chapter 302
  [302, 'She did not open her eyes.', '“Rhen.”', 'No answer.', 'sera'],
  [302, 'Rhen was lying beside her, very obviously awake, one arm beneath his head.', '“You are abusing a transcendent martial foundation for nonsense.”', '“I am not using a technique.”', 'sera'],
  [302, '“You are abusing a transcendent martial foundation for nonsense.”', '“I am not using a technique.”', '“That makes it worse.”', 'rhen'],
  [302, '“I am not using a technique.”', '“That makes it worse.”', '“It was one petal.”', 'sera'],
  [302, '“That makes it worse.”', '“It was one petal.”', '“Two.”', 'rhen'],
  [302, '“It was one petal.”', '“Two.”', '“The first melted.”', 'sera'],
  [302, '“Two.”', '“The first melted.”', '“That is not how counting works.”', 'rhen'],
  [302, '“The first melted.”', '“That is not how counting works.”', 'Rhen looked thoughtful.', 'sera'],
  [302, '“How do you know?” Sera asked.', '“You have been arguing for ten minutes.”', '“That proves nothing.”', 'luweiran'],
  [302, '“You have been arguing for ten minutes.”', '“That proves nothing.”', '“There are captains waiting below.”', 'sera'],
  [302, '“That proves nothing.”', '“There are captains waiting below.”', 'Sera sighed.', 'luweiran'],
  [302, '“Which ones?”', '“All ten.”', 'That got her moving.', 'luweiran'],
  [302, 'Everyone stood.', '“Sit.”', 'They sat.', 'sera'],
  [302, 'Sera glanced at the assignment board.', '“Why are there four companies on medicine routes?”', 'Lu answered immediately.', 'sera'],
  [302, '“Flooding south of the river. The bridge repairs are finished but three villages are still relying on temporary wells.”', '“Lethal authorization?”', '“None requested.”', 'sera'],
  [302, '“Lethal authorization?”', '“None requested.”', '“Escort threat?”', 'luweiran'],
  [302, '“None requested.”', '“Escort threat?”', '“Bandits withdrew after learning who runs the route.”', 'sera'],
  [302, '“Escort threat?”', '“Bandits withdrew after learning who runs the route.”', 'Huo sounded disappointed.', 'luweiran'],
  [302, '“You are not going to provoke bandits because you are bored.”', '“I did not say that.”', '“You thought it loudly.”', 'huo'],
  [302, '“I did not say that.”', '“You thought it loudly.”', 'Tae muttered, “He does most things loudly.”', 'sera'],
  [302, '“Want to train?”', '“No.”', '“That sounded afraid.”', 'tae'],
  [302, '“No.”', '“That sounded afraid.”', '“That sounded employed.”', 'huo'],
  [302, '“That sounded afraid.”', '“That sounded employed.”', 'Sera tapped the board.', 'tae'],
  [302, '“How?”', '“I know you.”', '“That is invasive.”', 'luweiran'],
  [302, '“I know you.”', '“That is invasive.”', '“So is stealing breakfast meant for patients.”', 'huo'],
  [302, '“That is invasive.”', '“So is stealing breakfast meant for patients.”', '“That happened once.”', 'luweiran'],
  [302, '“So is stealing breakfast meant for patients.”', '“That happened once.”', '“Yesterday.”', 'huo'],
  [302, '“That happened once.”', '“Yesterday.”', 'Huo left.', 'luweiran'],
  [302, 'He turned his face toward Rhen.', '“You asked again?”', '“Yes.”', 'qin'],
  [302, '“You asked again?”', '“Yes.”', '“Still yes.”', 'rhen'],
  [302, '“Yes.”', '“Still yes.”', 'Rhen nodded.', 'qin'],
];

const paragraphs = getParagraphs(text);
const insertions = [];

for (const [chapter, prev, quote, next, speaker] of rules) {
  const [start, end] = chapterBounds(text, chapter);
  const matches = [];
  for (let i = 1; i < paragraphs.length - 1; i++) {
    const p = paragraphs[i];
    if (p.start < start || p.start >= end) continue;
    if (paragraphs[i - 1].text === prev && p.text === quote && paragraphs[i + 1].text === next) matches.push(p.start);
  }
  if (matches.length !== 1) {
    throw new Error(`Ch${chapter}: expected one match for ${quote}, found ${matches.length}`);
  }
  insertions.push([matches[0], `[[speaker:${speaker}]]`]);
}

const duplicatePositions = new Set();
for (const [pos] of insertions) {
  if (duplicatePositions.has(pos)) throw new Error(`Duplicate insertion at ${pos}`);
  duplicatePositions.add(pos);
}

insertions.sort((a, b) => b[0] - a[0]);
for (const [pos, marker] of insertions) text = text.slice(0, pos) + marker + text.slice(pos);

await writeFile(path, text, 'utf8');
console.log(`Inserted ${insertions.length} explicit speaker markers into Chapters 301–302.`);
