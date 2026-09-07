import { readdir, readFile, writeFile } from 'node:fs/promises';

const source = await readFile('scripts/apply-dialogue-final-residuals.mjs', 'utf8');
const entriesMatch = source.match(/const entries = (\[[\s\S]*?\n\]);/);
if (!entriesMatch) throw new Error('Could not load explicit residual mapping data.');
const entries = Function(`"use strict"; return (${entriesMatch[1]});`)();

const valid = new Set(['rhen','sera','kael','liang','jin','lei','rui','ilyra','tae','mo','arin','luo','yun','qin','han','jianruo','xuweng','moqian','yeonhwa','wei','ji','cao','ye','zhao','lin','yan','meizhen','yunke','gaoren','shufen','baotien','meilin','song','shiyue','huo','nam','chun','haejin','gwon','daemun','baek','gong','jiang','duan','mi','qiu','zhao_renkai','mu','seo','gu','ren','qiao','miri','sorin','valeria','draven','aurel','vaelor','orun','iscaryn','rhavenn','tor','caedros','varesh','amon','aethon','mareth','garran','neris','sivra','oren','varok','raska','eira','tor_veyrhald','aldric','maedra','sigrun','halvek','solveig','eldran','brynja','oskar','astrid','jorek','freya','kellan','luweiran','xie_wuchen','black_radiance','tsubasa','shunto','kai','haru','eirik','hana','aya','kenji','jun','nao']);
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
const speakersByKey = new Map();
for (const [season, chapter, speaker, quote] of entries) {
  const key = keyOf(season, chapter, quote);
  const speakers = speakersByKey.get(key) ?? new Set();
  speakers.add(speaker);
  speakersByKey.set(key, speakers);
}

const occurrenceCount = new Map();
for (const [file, text] of sources) {
  const season = fileSeason(file);
  let chapter = null;
  for (const paragraph of text.split(/\n{2,}/)) {
    const trimmed = paragraph.trim();
    const heading = trimmed.match(/^## Chapter (\d+) — /);
    if (heading) { chapter = Number(heading[1]); continue; }
    if (!chapter || /^\[\[speaker:[^\]]+\]\]/.test(trimmed)) continue;
    const key = keyOf(season, chapter, trimmed);
    if (speakersByKey.has(key)) occurrenceCount.set(key, (occurrenceCount.get(key) ?? 0) + 1);
  }
}

let added = 0;
const skipped = new Map();
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
    const speakers = speakersByKey.get(key);
    if (!speakers) continue;
    const count = occurrenceCount.get(key) ?? 0;
    if (speakers.size !== 1 || count !== 1) {
      skipped.set(key, { season, chapter, speakers: [...speakers], count, quote: trimmed });
      continue;
    }

    const [speaker] = speakers;
    const offset = paragraphs[i].indexOf(trimmed);
    paragraphs[i] = `${paragraphs[i].slice(0, offset)}[[speaker:${speaker}]]${trimmed}${paragraphs[i].slice(offset + trimmed.length)}`;
    added++;
  }
  const updated = paragraphs.join('\n\n');
  if (updated !== original) await writeFile(`${proseDir}/${file}`, updated);
}

console.log(`Added ${added} explicit dialogue speaker markers.`);
console.log(`Skipped ${skipped.size} collision/duplicate targets for context-specific review.`);
for (const item of skipped.values()) {
  console.log(`SKIP S${item.season} Ch${item.chapter} speakers=${item.speakers.join(',')} occurrences=${item.count}: ${item.quote}`);
}
