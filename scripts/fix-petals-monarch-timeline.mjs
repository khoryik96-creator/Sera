import fs from 'node:fs';

const files = [
  'docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_2.md',
  'docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_3.md',
];

const replacements = [
  [
    'Five years earlier, Wuyue had returned from this same continent carrying a story every soldier knew.',
    'After the previous Isgard war, Wuyue had returned from this same continent carrying a story every soldier knew.',
  ],
  [
    'Isgard had spent five years arguing about the last war—about Duskvein, Wuyue, law, pride, invasion and blame.',
    'Isgard had spent the years since arguing about the last war—about Duskvein, Wuyue, law, pride, invasion and blame.',
  ],
  [
    'Some of those soldiers had fought Wuyue five years earlier.',
    'Some of those soldiers had fought Wuyue in the previous war.',
  ],
  [
    'Five years earlier, many Isgard soldiers had said Petals Monarch with anger.',
    'During the previous war, many Isgard soldiers had said Petals Monarch with anger.',
  ],
];

let changed = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  for (const [from, to] of replacements) {
    if (text.includes(from)) {
      text = text.replace(from, to);
      changed += 1;
    }
  }
  fs.writeFileSync(file, text);
}

if (changed !== 4) {
  throw new Error(`Expected 4 timeline replacements, applied ${changed}`);
}

console.log('Removed incorrect five-year references from Season 109 return.');
