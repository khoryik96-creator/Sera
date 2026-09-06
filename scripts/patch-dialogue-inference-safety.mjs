import { readFile, writeFile } from 'node:fs/promises';

const path = 'scripts/final-arc-reader.mjs';
let s = await readFile(path, 'utf8');

const replacements = [
  [
`  let lastSpeaker = null;\n  let previousSpeaker = null;\n  let focusSpeaker = null;\n  let announced = null;\n  let recentSpeakers = new Set();\n  // reset per chapter; addDialogueHints is called once per chapter body\n`,
`  let focusSpeaker = null;\n  let announced = null;\n  // reset per chapter; addDialogueHints is called once per chapter body\n`
  ],
  [
`    const next = paragraphs[i + 1]?.trim() || '';\n    const nextAttribution = attributedSpeaker(next, aliases);\n`,
``
  ],
  [
`    // A quote paragraph can carry its own attribution — \`“No,” Eirik said. “I am\n    // surprised.”\` — and that is stated fact, so it outranks every neighbouring\n    // guess below. Only the narration OUTSIDE the quotation marks counts: a name\n    // inside the quote is reported speech (\`“Rui said you saved six witnesses.”\`)\n    // and says nothing about who is speaking.\n    const selfAttribution = attributedSpeaker(outsideQuotes(paragraph), aliases);\n    let speaker = selfAttribution || announced || nextAttribution || focusSpeaker;\n\n    // In a clean two-person exchange, consecutive quote paragraphs usually\n    // alternate. Only use this when two distinct speakers were already observed;\n    // multi-person scenes without a fresh narrative subject stay untagged rather\n    // than risk assigning the wrong colour.\n    // The alternation guess rests on nothing but "they take turns", which only\n    // holds in a clean two-person exchange. Once a third voice is active in the\n    // scene it is a coin flip, and a wrong name reads worse than none, so those\n    // quotes stay untagged.\n    if (!speaker && lastSpeaker && previousSpeaker && lastSpeaker !== previousSpeaker && recentSpeakers.size <= 2) {\n      speaker = previousSpeaker;\n    }\n\n`,
`    // A quote paragraph can carry its own attribution — \`“No,” Eirik said. “I am\n    // surprised.”\` — and that is stated fact. Otherwise only a speaker explicitly\n    // announced by the preceding prose is used. Do not infer from the following\n    // paragraph and do not assume conversational turn-taking: either can assign a\n    // plausible but wrong name in multi-person scenes.\n    const selfAttribution = attributedSpeaker(outsideQuotes(paragraph), aliases);\n    const speaker = selfAttribution || announced || focusSpeaker;\n\n`
  ],
  [
`    if (speaker) {\n      paragraphs[i] = \`[[speaker:${speaker}]]${paragraph}\`;\n      tagged++;\n      recentSpeakers.add(speaker);\n      if (speaker !== lastSpeaker) {\n        previousSpeaker = lastSpeaker;\n        lastSpeaker = speaker;\n      }\n    }\n`,
`    if (speaker) {\n      paragraphs[i] = \`[[speaker:${speaker}]]${paragraph}\`;\n      tagged++;\n    }\n`
  ]
];

for (const [from, to] of replacements) {
  if (!s.includes(from)) throw new Error('Expected final-arc-reader anchor not found');
  s = s.replace(from, to);
}

await writeFile(path, s);
