import fs from 'node:fs';

const p2Path = 'docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_2.md';
const p3Path = 'docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_3.md';
const testPath = 'test/petalsMonarchReturn.test.ts';

function replaceOnce(text, oldText, newText, label) {
  const first = text.indexOf(oldText);
  if (first === -1) throw new Error(`Missing anchor for ${label}`);
  if (text.indexOf(oldText, first + 1) !== -1) throw new Error(`Duplicate anchor for ${label}`);
  return text.replace(oldText, newText);
}

let p2 = fs.readFileSync(p2Path, 'utf8');
const anchor = `It came from Wuyue first.\n\nIsgard answered.\n\nJin stopped speaking.`;
const expanded = `It came from Wuyue first.\n\nIsgard answered.\n\nShinsei heard it too.\n\nForward observation posts had spent six months learning the sounds of the Wuyue–Isgard rear: evacuation horns, rotation bells, casualty wagons, exhausted formations changing watch.\n\nThis was none of them.\n\nAt first, Shinsei officers assumed another army had arrived.\n\nThen the first scout report came back.\n\nFrost-white petals.\n\nPale violet beneath the ice.\n\nNo banner.\n\nNo formation source.\n\nA veteran intelligence officer read the report twice and stopped asking how many reinforcements had landed.\n\nHe knew the title.\n\nPetals Monarch.\n\nFor six months Shinsei had measured the people opposing it. Sera. Tae. Huo. Qin. Kael. Isgard's surviving Paragons. Every one of them had a file, a cultivation estimate, a known limit and a plan built around that limit.\n\nThe Petals Monarch had a file too.\n\nThe useful part was very short.\n\nNo accepted rank.\n\nNo verified upper limit.\n\nLast decisive appearance in Isgard: two hostile Paragons defeated after Orchid Dominion collapsed. War ended.\n\nAcross the northern line, Shinsei signal flags changed.\n\nNot retreat.\n\nRecalculation.\n\nBehind them, the allied roar grew louder.\n\nJin stopped speaking.`;
p2 = replaceOnce(p2, anchor, expanded, 'Shinsei recognition');
fs.writeFileSync(p2Path, p2);

let p3 = fs.readFileSync(p3Path, 'utf8');
p3 = replaceOnce(
  p3,
  `[[speaker:rhen]]“You treated people because they were in front of you.”\n\n[[speaker:rhen]]“Yes.”\n\n[[speaker:rhen]]“Even when you hated why they were hurt.”`,
  `[[speaker:rhen]]“You treated people because they were in front of you.”\n\n[[speaker:aya]]“Yes.”\n\n[[speaker:rhen]]“Even when you hated why they were hurt.”`,
  'Aya response attribution',
);
fs.writeFileSync(p3Path, p3);

let test = fs.readFileSync(testPath, 'utf8');
test = replaceOnce(
  test,
  `    expect(part2).toContain('morale was also a battlefield resource');\n    expect(part2).toContain("[[speaker:sera]]“He's here.”");`,
  `    expect(part2).toContain('morale was also a battlefield resource');\n    expect(part2).toContain('Shinsei heard it too.');\n    expect(part2).toContain('No accepted rank.');\n    expect(part2).toContain("[[speaker:sera]]“He's here.”");`,
  'enemy-reaction regression test',
);
fs.writeFileSync(testPath, test);

console.log('Refined Petals Monarch return with Shinsei reaction and fixed Aya attribution.');
