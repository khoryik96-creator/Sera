import fs from 'node:fs';
const file = 'docs/dialogue-audit/README.md';
let text = fs.readFileSync(file, 'utf8');
const pairs = [
  ['**750 quoted lines now have no speaker name.**', '**850 quoted lines now have no speaker name.**'],
  ['| Season 109 | 18 | `season-109.md`', '| Season 109 | 118 | `season-109.md`'],
  ['| **Total** | **750** | | |', '| **Total** | **850** | | |'],
];
for (const [from, to] of pairs) {
  if (!text.includes(from)) throw new Error(`Missing README anchor: ${from}`);
  text = text.replace(from, to);
}
fs.writeFileSync(file, text);
console.log('Synced dialogue README to Season 109 = 118, total = 850.');
