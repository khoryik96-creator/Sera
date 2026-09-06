import { readFile, writeFile } from 'node:fs/promises';
const root = 'docs/prose';
const changed = new Set();
async function replaceOnce(file, oldText, newText) {
  const path = `${root}/${file}`;
  let text = (await readFile(path, 'utf8')).replace(/\r\n/g, '\n');
  const count = text.split(oldText).length - 1;
  if (count !== 1) throw new Error(`${file}: expected one match, found ${count}: ${oldText.slice(0,100)}`);
  text = text.replace(oldText, newText);
  await writeFile(path, text);
  changed.add(file);
}
const edits = [
  ['FINAL_ARC_SEASON103_PROSE_DRAFT.md', '“Say she lives.”\n\nThat mattered.\n\nEldran’s eyes returned to Sera.', '“Say she lives.”\n\nFor now, survival was enough to change the room.\n\nEldran’s eyes returned to Sera.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT.md', '“You made it.”\n\nThat mattered.\n\nShe had crossed a continent.', '“You made it.”\n\nThe words carried the whole distance she had crossed.'],
  ['FINAL_ARC_SEASON108_PROSE_DRAFT.md', 'He would finish when he finished.\n\nUntil then, she commanded hurt.\n\nThat was enough.', 'He would finish when he finished.\n\nUntil then, she would command hurt—and refuse to let anyone confuse endurance with invulnerability.'],
  ['FINAL_ARC_SEASON110_PROSE_DRAFT.md', 'The institution still moved.\n\nThat mattered.\n\nTsubasa had spent most of his adult life making sure it could.', 'The institution still moved, which was the result of most of Tsubasa’s adult life.'],
  ['FINAL_ARC_SEASON111_PROSE_DRAFT_3.md', '“Yes.”\n\nLuo nodded.\n\nThat mattered.\n\nNot today.\n\nLater.\n\nKael would never be able to say Shunto took the choice away from him.', '“Yes.”\n\nLuo nodded. Not today, but later.\n\nKael would never be able to say Shunto took the choice away from him.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT.md', 'Nobody in the room seemed relieved.\n\nThat was the problem.\n\nThe terms were survivable.', 'Nobody in the room seemed relieved. That absence of relief exposed the real problem.\n\nThe terms were survivable.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_2.md', '“Yes.”\n\nThat pause mattered.\n\nNot uncertainty.\n\nCalculation.\n\nSera saw it.', '“Yes.”\n\nThe pause was calculation, not uncertainty. Sera saw it.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_2.md', 'He meant it.\n\nNot because he thought she needed saving.\n\nBecause he would respect the decision if she made it.', 'He meant it. He did not think she needed saving; he would simply respect the decision if she made it.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_2.md', 'This was the moment she expected resistance.\n\nNot because he doubted her.\n\nBecause he loved her.', 'This was the moment she expected resistance, and any resistance would come from love rather than doubt.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_3.md', 'Sera did not look toward Rhen.\n\nThat mattered.\n\nShe had asked for the duel.\n\nHe was letting her have it.', 'Sera did not look toward Rhen. She had asked for the duel, and he was letting her have it.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_3.md', 'He was not winning cleanly.\n\nThat mattered too.\n\nHe looked at her.', 'He was not winning cleanly either.\n\nHe looked at her.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_3.md', 'This was her moment.\n\nNot because Rhen had weakened him.\n\nNot because someone else had solved his Domain.\n\nNot because Tsubasa was on a timer created by Redline.\n\nHer system had forced the strongest conventional cultivator alive to reveal his full battlefield art.', 'This was her moment. Rhen had not weakened him, nobody else had solved his Domain, and no Redline timer was forcing his collapse.\n\nHer system had forced the strongest conventional cultivator alive to reveal his full battlefield art.'],
  ['FINAL_ARC_SEASON113_PROSE_DRAFT.md', 'Aya waited.\n\nRhen did not move past her.\n\nThat mattered.\n\n“What are you doing?” she asked.', 'Aya waited. Rhen stopped where she stopped him.\n\n“What are you doing?” she asked.'],
  ['FINAL_ARC_SEASON113_PROSE_DRAFT_2.md', 'Rhen stopped walking.\n\nNot because he had been trapped.\n\nBecause now Tsubasa had shown what Rhen was waiting to see.', 'Rhen stopped walking. Tsubasa had finally shown what Rhen was waiting to see.'],
  ['FINAL_ARC_SEASON113_PROSE_DRAFT_2.md', "Sera's eyes widened.\n\nNot because Rhen was in danger.\n\nBecause Tsubasa had done exactly what he was supposed to do.\n\nHe had made Rhen move.", "Sera's eyes widened—not from fear for Rhen, but because Tsubasa had done exactly what he was supposed to do.\n\nHe had made Rhen move."],
  ['FINAL_ARC_SEASON113_PROSE_DRAFT_2.md', 'Rhen smiled faintly.\n\nNot because the war was funny.\n\nBecause Tsubasa had finally stopped looking like a commander carrying an institution and started looking like what he also was:', 'Rhen smiled faintly. The war was not funny; Tsubasa had simply stopped looking like a commander carrying an institution and started looking like what he also was:'],
  ['FINAL_ARC_SEASON113_PROSE_DRAFT_3.md', 'Without cultivation, Tsubasa Kurokawa was still dangerous.\n\nThat mattered.\n\nIt mattered to him.\n\nIt mattered to Rhen.\n\nIt mattered to every soldier watching from the allied ridge who had spent years using qi as if it were synonymous with martial skill.', 'Without cultivation, Tsubasa Kurokawa was still dangerous.\n\nThe fact belonged to all of them: to Tsubasa, to Rhen, and to every soldier watching from the allied ridge who had spent years using qi as if it were synonymous with martial skill.'],
  ['FINAL_ARC_SEASON113_PROSE_DRAFT_3.md', 'Rhen let him be.\n\nNot out of pity.\n\nBecause this was the cleanest part of the entire fight.', 'Rhen let him be, not out of pity but because this was the cleanest part of the entire fight.'],
];
for (const e of edits) await replaceOnce(...e);
console.log(`Second literary polish touched ${changed.size} files.`);
