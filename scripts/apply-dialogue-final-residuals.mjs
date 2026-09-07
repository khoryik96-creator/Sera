import { readdir, readFile, writeFile } from 'node:fs/promises';

const valid = new Set(['rhen','sera','kael','liang','jin','lei','rui','ilyra','tae','mo','arin','luo','yun','qin','han','jianruo','xuweng','moqian','yeonhwa','wei','ji','cao','ye','zhao','lin','yan','meizhen','yunke','gaoren','shufen','baotien','meilin','song','shiyue','huo','nam','chun','haejin','gwon','daemun','baek','gong','jiang','duan','mi','qiu','zhao_renkai','mu','seo','gu','ren','qiao','miri','sorin','valeria','draven','aurel','vaelor','orun','iscaryn','rhavenn','tor','caedros','varesh','amon','aethon','mareth','garran','neris','sivra','oren','varok','raska','eira','tor_veyrhald','aldric','maedra','sigrun','halvek','solveig','eldran','brynja','oskar','astrid','jorek','freya','kellan','luweiran','xie_wuchen','black_radiance','tsubasa','shunto','kai','haru','eirik','hana','aya','kenji','jun','nao']);

// Explicitly reviewed residuals. These are data, not inference rules.
// Duplicate identical dialogue paragraphs within the same chapter are deliberately skipped.
const entries = [
  // Season 104
  [104,392,'tae','“Good.”'],
  [104,393,'huo','“No.”'],
  [104,394,'haru','“Yes.”'],
  [104,394,'qin','“Good.”'],
  [104,394,'tae','“Yes.”'],
  [104,397,'hana','“Yes.”'],
  [104,399,'hana','“Yes.”'],

  // Season 105
  [105,401,'aya','“No.”'],
  [105,403,'aya','“What?”'],
  [105,404,'aya','“What?”'],
  [105,404,'aya','“Yes.”'],
  [105,404,'aya','“Copy it.”'],
  [105,404,'aya','“Good.”'],
  [105,405,'jin','“Why?”'],
  [105,406,'jin','“Yes.”'],
  [105,406,'jin','“No.”'],
  [105,407,'kenji','“Yes.”'],
  [105,407,'kai','“Aya?”'],
  [105,407,'eirik','“New Paragon. Better than initial model.”'],
  [105,408,'kael','“No.”'],
  [105,408,'kael','“Yes.”'],
  [105,409,'kai','“Good.”'],

  // Season 106
  [106,411,'hana','“Yes.”'],
  [106,412,'tsubasa','“Yes.”'],
  [106,412,'aya','“Not enough.”'],
  [106,412,'aya','“Why?”'],
  [106,412,'aya','“Yes.”'],
  [106,412,'hana','“Well?”'],
  [106,413,'aya','“Yes.”'],
  [106,413,'nao','“No.”'],
  [106,413,'aya','“What?”'],
  [106,415,'sigrun','“Yes.”'],
  [106,415,'kenji','“Why?”'],
  [106,416,'aya','“Yes.”'],
  [106,416,'aya','“No.”'],
  [106,416,'kenji','“I know.”'],
  [106,419,'aldric','“Yes.”'],
  [106,420,'sera','“What?”'],

  // Season 107
  [107,422,'aya','“What?”'],
  [107,422,'aya','“No.”'],
  [107,422,'jun','“I know.”'],
  [107,422,'luo','“Yes.”'],
  [107,423,'rui','“No.”'],
  [107,424,'xie_wuchen','“No.”'],
  [107,425,'sera','“No civilian fire spread.”'],
  [107,426,'jin','“Yes.”'],
  [107,427,'lei','“Hold.”'],
  [107,428,'sera','“No.”'],
  [107,430,'sera','“I know.”'],

  // Season 108
  [108,434,'aldric','“Yes.”'],
  [108,434,'aldric','“Why?”'],
  [108,436,'luo','“I know.”'],
  [108,437,'jin','“Yes.”'],
  [108,437,'sera','“Yes.”'],
  [108,437,'kael','“Why?”'],
  [108,439,'qin','“Yes.”'],

  // Season 109
  [109,442,'rhen','“Good.”'],
  [109,443,'rhen','“Good.”'],
  [109,443,'luweiran','“Yes.”'],
  [109,444,'black_radiance','“Yes.”'],
  [109,444,'rhen','“No.”'],
  [109,444,'black_radiance','“Why?”'],
  [109,444,'luweiran','“Yes.”'],
  [109,446,'rhen','“Why?”'],
  [109,446,'rhen','“I know.”'],
  [109,446,'rhen','“What?”'],
  [109,446,'jin','“Good.”'],
  [109,446,'rhen','“Yes.”'],
  [109,446,'sera','“I know.”'],
  [109,448,'rhen','“No.”'],
  [109,448,'rhen','“Yes.”'],
  [109,448,'aya','“Yes.”'],
  [109,449,'sera','“Yes.”'],
  [109,449,'aldric','“Apparently.”'],
  [109,450,'rhen','“Probably.”'],

  // Season 110
  [110,452,'haru','“Yes.”'],
  [110,452,'hana','“Yes.”'],
  [110,453,'jin','“No.”'],
  [110,453,'tsubasa','“No.”'],
  [110,454,'aya','“No.”'],
  [110,454,'tsubasa','“Yes.”'],
  [110,454,'aya','“Yes.”'],
  [110,455,'black_radiance','“Yes.”'],
  [110,455,'rhen','“Yes.”'],
  [110,456,'luo','“Good.”'],
  [110,456,'luo','“I know.”'],
  [110,456,'sera','“Yes.”'],
  [110,456,'sera','“No.”'],
  [110,456,'luo','“Sera.”'],
  [110,457,'hana','“No.”'],
  [110,459,'hana','“Yes.”'],
  [110,460,'tsubasa','“No.”'],

  // Season 111
  [111,461,'aya','“Yes.”'],
  [111,461,'hana','“Yurushi?”'],
  [111,461,'qin','“Yurushi?”'],
  [111,462,'kael','“What?”'],
  [111,462,'kael','“No.”'],
  [111,463,'kael','“No.”'],
  [111,464,'kael','“Later.”'],
  [111,466,'kael','“Good.”'],
  [111,466,'shunto','“With what?”'],
  [111,466,'kael','“Yes.”'],
  [111,467,'kael','“No.”'],
  [111,467,'luo','“Yes.”'],
  [111,468,'luo','“Yes.”'],
  [111,469,'shunto','“Yes.”'],
  [111,469,'luo','“Good.”'],
  [111,469,'luo','“Yes.”'],
  [111,470,'luo','“Yes.”'],
  [111,470,'luo','“No.”'],
  [111,470,'luo','“What?”'],
  [111,470,'rhen','“Yes.”'],

  // Season 112
  [112,471,'tsubasa','“Good.”'],
  [112,472,'luo','“No.”'],
  [112,472,'tsubasa','“Yes.”'],
  [112,473,'tsubasa','“I know.”'],
  [112,474,'sera','“No.”'],
  [112,474,'rhen','“Yes.”'],
  [112,474,'rhen','“Okay.”'],
  [112,475,'tsubasa','“Yes.”'],
  [112,475,'tsubasa','“No.”'],
  [112,475,'sera','“Good.”'],
  [112,476,'lei','“No.”'],
  [112,477,'kael','“Yes.”'],
  [112,478,'tsubasa','“Good.”'],
  [112,480,'sera','“No.”'],
  [112,480,'kael','“Yes.”'],
  [112,480,'tsubasa','“No.”'],

  // Season 113
  [113,481,'rhen','“Yes.”'],
  [113,481,'tsubasa','“Why?”'],
  [113,481,'sera','“No.”'],
  [113,481,'rhen','“Good.”'],
  [113,483,'rui','“What?”'],
  [113,483,'rhen','“I know.”'],
  [113,484,'rhen','“Yes.”'],
  [113,484,'lei','“Fine.”'],
  [113,484,'tsubasa','“Why?”'],
  [113,485,'tsubasa','“Yes.”'],
  [113,485,'rhen','“Good.”'],
  [113,486,'rhen','“Yes.”'],
  [113,487,'aya','“No.”'],
  [113,487,'tsubasa','“Why?”'],
  [113,487,'tsubasa','“Yes.”'],
  [113,488,'tsubasa','“Why?”'],
  [113,488,'rhen','“No.”'],
  [113,489,'tsubasa','“What?”'],
  [113,489,'rhen','“Fine.”'],
  [113,489,'rhen','“Sorry.”'],
  [113,489,'rhen','“No.”'],
  [113,490,'kai','“Why?”'],
  [113,490,'rhen','“No.”'],
  [113,490,'sera','“Good.”'],

  // Season 114
  [114,491,'tsubasa','“No.”'],
  [114,492,'tsubasa','“Good.”'],
  [114,492,'aya','“Yes.”'],
  [114,492,'tsubasa','“No.”'],
  [114,493,'eirik','“Good.”'],
  [114,493,'rhen','“Yes.”'],
  [114,496,'aya','“No.”'],
  [114,499,'arin','“Yes.”'],
  [114,500,'rhen','“Why?”'],
  [114,500,'rhen','“I know.”'],
  [114,500,'rhen','“What?”'],
  [114,500,'rhen','“Sera.”'],
];

for (const [, , speaker, quote] of entries) {
  if (!valid.has(speaker)) throw new Error(`Invalid speaker key: ${speaker}`);
  if (!quote.startsWith('“') || !quote.endsWith('”')) throw new Error(`Not a dialogue-only target: ${quote}`);
}

const proseDir = 'docs/prose';
const files = (await readdir(proseDir)).filter((name) => /^FINAL_ARC_SEASON\d{3}_PROSE_DRAFT(?:_\d+)?\.md$/.test(name));
const fileSeason = (name) => Number(name.match(/SEASON(\d{3})/)[1]);
const wantedSeasons = new Set(entries.map(([season]) => season));
const sources = new Map();
for (const file of files.filter((name) => wantedSeasons.has(fileSeason(name)))) {
  sources.set(file, await readFile(`${proseDir}/${file}`, 'utf8'));
}

const keyOf = (season, chapter, quote) => `${season}\u0000${chapter}\u0000${quote}`;
const mapping = new Map();
for (const [season, chapter, speaker, quote] of entries) {
  const key = keyOf(season, chapter, quote);
  const previous = mapping.get(key);
  if (previous && previous !== speaker) throw new Error(`Conflicting explicit mapping for S${season} Ch${chapter}: ${quote}`);
  mapping.set(key, speaker);
}

const counts = new Map();
for (const [file, text] of sources) {
  const season = fileSeason(file);
  let chapter = null;
  for (const paragraph of text.split(/\n{2,}/)) {
    const trimmed = paragraph.trim();
    const heading = trimmed.match(/^## Chapter (\d+) — /);
    if (heading) { chapter = Number(heading[1]); continue; }
    if (!chapter || /^\[\[speaker:[^\]]+\]\]/.test(trimmed)) continue;
    const key = keyOf(season, chapter, trimmed);
    if (mapping.has(key)) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
}

let added = 0;
const skippedDuplicates = [];
const missing = [];
const seenTargets = new Set();
for (const [file, original] of sources) {
  const season = fileSeason(file);
  let chapter = null;
  const paragraphs = original.split(/\n{2,}/);
  for (let i = 0; i < paragraphs.length; i++) {
    const trimmed = paragraphs[i].trim();
    const heading = trimmed.match(/^## Chapter (\d+) — /);
    if (heading) { chapter = Number(heading[1]); continue; }
    if (!chapter || /^\[\[speaker:[^\]]+\]\]/.test(trimmed)) continue;
    const key = keyOf(season, chapter, trimmed);
    const speaker = mapping.get(key);
    if (!speaker) continue;
    seenTargets.add(key);
    const count = counts.get(key) ?? 0;
    if (count !== 1) {
      if (count > 1) skippedDuplicates.push({ season, chapter, speaker, quote: trimmed, count });
      continue;
    }
    const prefix = paragraphs[i].slice(0, paragraphs[i].indexOf(trimmed));
    const suffix = paragraphs[i].slice(paragraphs[i].indexOf(trimmed) + trimmed.length);
    paragraphs[i] = `${prefix}[[speaker:${speaker}]]${trimmed}${suffix}`;
    added++;
  }
  const updated = paragraphs.join('\n\n');
  if (updated !== original) await writeFile(`${proseDir}/${file}`, updated);
}

for (const [season, chapter, speaker, quote] of entries) {
  const key = keyOf(season, chapter, quote);
  if (!seenTargets.has(key) && ![...sources.values()].some((text) => text.includes(`[[speaker:${speaker}]]${quote}`))) {
    missing.push({ season, chapter, speaker, quote });
  }
}

console.log(`Added ${added} explicit dialogue speaker markers.`);
console.log(`Skipped ${skippedDuplicates.length} duplicate-text targets for context-specific review.`);
for (const item of skippedDuplicates) console.log(`DUP S${item.season} Ch${item.chapter} ${item.speaker} x${item.count}: ${item.quote}`);
console.log(`Missing/unmatched targets: ${missing.length}`);
for (const item of missing) console.log(`MISS S${item.season} Ch${item.chapter} ${item.speaker}: ${item.quote}`);
