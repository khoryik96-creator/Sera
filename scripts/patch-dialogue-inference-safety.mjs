import { readFile, writeFile } from 'node:fs/promises';

// One-shot patch: never carry a speaker from an attributed dialogue paragraph
// into the next standalone quote. Only narration-only preceding prose may focus
// a speaker for the following line.
const path = 'scripts/final-arc-reader.mjs';
let s = await readFile(path, 'utf8');

const from = `    if (!isStandaloneDialogue(paragraph)) {\n      const explicit = attributedSpeaker(paragraph, aliases);\n      const subject = subjectSpeaker(paragraph, aliases);\n      announced = announcedSpeaker(paragraph, aliases);\n      focusSpeaker = explicit || subject;\n      continue;\n    }\n`;
const to = `    if (!isStandaloneDialogue(paragraph)) {\n      const narrationOnly = !paragraph.includes('“');\n      announced = narrationOnly ? announcedSpeaker(paragraph, aliases) : null;\n      focusSpeaker = narrationOnly ? subjectSpeaker(paragraph, aliases) : null;\n      continue;\n    }\n`;

if (!s.includes(from)) throw new Error('Expected preceding-prose inference anchor not found');
s = s.replace(from, to);
await writeFile(path, s);
