import { readFile, writeFile } from 'node:fs/promises';

const path = 'scripts/final-arc-reader.mjs';
let text = await readFile(path, 'utf8');

const oldSubject = `function subjectSpeaker(paragraph, aliases) {\n  const text = paragraph.trim().replace(/^\\*\\*/, '');\n  for (const row of aliases) {\n    const re = new RegExp(\`^\${escRe(row.alias)}(?:[’']s)?\\\\b\`);\n    if (re.test(text)) return row.key;\n  }\n  return null;\n}\n\n`;
if (!text.includes(oldSubject)) throw new Error('subjectSpeaker block not found');
text = text.replace(oldSubject, '');

text = text.replace('  let focusSpeaker = null;\n  let announced = null;', '  let announced = null;');
text = text.replace("      focusSpeaker = narrationOnly ? subjectSpeaker(paragraph, aliases) : null;\n", '');
text = text.replace('    const speaker = selfAttribution || announced || focusSpeaker;', '    const speaker = selfAttribution || announced;');
text = text.replace('    focusSpeaker = null;\n    announced = null;', '    announced = null;');

if (text.includes('subjectSpeaker(') || text.includes('focusSpeaker')) {
  throw new Error('generic focus-speaker inference still present after patch');
}
if (!text.includes('const speaker = selfAttribution || announced;')) {
  throw new Error('strict speaker selection was not installed');
}

await writeFile(path, text);
console.log('Removed generic narration-subject speaker inference.');
