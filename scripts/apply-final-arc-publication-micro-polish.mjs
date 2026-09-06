import { readFile, writeFile } from 'node:fs/promises';

const root = 'docs/prose';
const edits = [
  {
    file: 'FINAL_ARC_SEASON114_PROSE_DRAFT_3.md',
    from: '“It is.”\n\nRhen sat at the edge of the bed.\n\nSera crossed the room slowly.',
    to: '“It is.”\n\nRhen settled onto the edge of the bed.\n\nSera crossed the room slowly.'
  },
  {
    file: 'FINAL_ARC_SEASON109_PROSE_DRAFT_3.md',
    from: 'Instead he asked Sera.\n\nShe looked at him for a long moment.\n\nThen pointed to the hospital district first.',
    to: 'Instead he asked Sera.\n\nSera held his gaze, weighing the question.\n\nThen pointed to the hospital district first.'
  },
  {
    file: 'FINAL_ARC_SEASON114_PROSE_DRAFT.md',
    from: "Shunto's chair was empty.\n\nTsubasa stood at the head of the table.\n\nThen deliberately stepped away from it.",
    to: "Shunto's chair was empty.\n\nTsubasa took the head of the table, then deliberately stepped away from it."
  },
  {
    file: 'FINAL_ARC_SEASON111_PROSE_DRAFT_2.md',
    from: 'Luo understood.\n\nThe next phase had begun.',
    to: 'Luo understood.\n\nThe next attack would be for him.'
  }
];

for (const edit of edits) {
  const path = `${root}/${edit.file}`;
  let text = (await readFile(path, 'utf8')).replace(/\r\n/g, '\n');
  const matches = text.split(edit.from).length - 1;
  if (matches !== 1) {
    throw new Error(`${edit.file}: expected exactly one match, found ${matches}`);
  }
  text = text.replace(edit.from, edit.to);
  await writeFile(path, text);
}

console.log(`Applied ${edits.length} publication micro-edits.`);
