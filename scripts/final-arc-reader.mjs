import { readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const proseDir = resolve(root, 'docs/prose');
const registryPath = resolve(root, 'src/characterRegistry.ts');

export const FINAL_ARC_FIRST_SEASON = 95;
export const FINAL_ARC_LAST_SEASON = 114;
export const FINAL_ARC_FIRST_CHAPTER = 301;
export const FINAL_ARC_LAST_CHAPTER = 500;

const SOURCE_RE = /^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE = /^## Chapter (\d+) — (.+)$/gm;
const SPEECH_VERBS = '(?:said|asked|answered|replied|called|shouted|whispered|muttered|snapped|continued|added|told|said quietly|said dryly)';

function escRe(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function partNumber(name) {
  const match = SOURCE_RE.exec(name);
  return match?.[2] ? Number(match[2]) : 1;
}

async function loadSpeakerAliases() {
  const source = await readFile(registryPath, 'utf8');
  const rows = [];
  for (const match of source.matchAll(/\{ key: '([a-z0-9_]+)',[^\n]*aliases: \[([^\]]+)\](?:, speakerKeys: \[([^\]]+)\])?/g)) {
    const key = match[1];
    const aliases = [...match[2].matchAll(/'([^']+)'/g)].map((item) => item[1]);
    const speakerKeys = match[3] ? [...match[3].matchAll(/'([^']+)'/g)].map((item) => item[1]) : [key];
    for (const alias of aliases) rows.push({ alias, key: speakerKeys[0] || key });
  }
  rows.sort((a, b) => b.alias.length - a.alias.length);
  return rows;
}

/** Every speaker key the reader can colour, for validating hand-written
 *  `[[speaker:key]]` markers in the prose drafts. */
async function loadSpeakerKeys() {
  const source = await readFile(registryPath, 'utf8');
  const keys = new Set();
  for (const match of source.matchAll(/\{ key: '([a-z0-9_]+)',[^\n]*?(?:speakerKeys: \[([^\]]+)\])?\s*\}/g)) {
    keys.add(match[1]);
    if (match[2]) for (const k of match[2].matchAll(/'([^']+)'/g)) keys.add(k[1]);
  }
  for (const match of source.matchAll(/speakerKeys: \[([^\]]+)\]/g)) {
    for (const k of match[1].matchAll(/'([^']+)'/g)) keys.add(k[1]);
  }
  const neutral = source.match(/neutralSpeakerNames[^{]*\{([\s\S]*?)\}/);
  if (neutral) for (const k of neutral[1].matchAll(/(\w+):/g)) keys.add(k[1]);
  return keys;
}

/** A hand-written marker with an unknown key renders as an uncoloured fallback
 *  name, which is silent breakage. Fail the build instead. */
function assertKnownSpeakers(body, keys, where) {
  for (const match of body.matchAll(/\[\[speaker:([^\]]+)\]\]/g)) {
    if (!keys.has(match[1])) {
      throw new Error(`${where}: unknown speaker key "${match[1]}". Use a key listed in docs/dialogue-audit/README.md.`);
    }
  }
}

function subjectSpeaker(paragraph, aliases) {
  const text = paragraph.trim().replace(/^\*\*/, '');
  for (const row of aliases) {
    const re = new RegExp(`^${escRe(row.alias)}(?:[’']s)?\\b`);
    if (re.test(text)) return row.key;
  }
  return null;
}

function attributedSpeaker(paragraph, aliases) {
  const text = paragraph.trim();
  for (const row of aliases) {
    const re = new RegExp(`\\b${escRe(row.alias)}\\s+${SPEECH_VERBS}\\b`, 'i');
    if (re.test(text)) return row.key;
  }
  return null;
}

/** The narration of a paragraph with the quoted speech removed, so an
 *  attribution is only read from outside the quotation marks. */
/** A short narration line that announces who is about to speak — `Luo finally
 *  spoke.`, `Hana whispered:`, `Huo's voice drifted in from the courtyard.` The
 *  name must lead the sentence, and a negation (`Rhen said nothing.`) means the
 *  opposite, so those are rejected. This is an explicit statement by the prose
 *  and therefore outranks any guess drawn from a neighbouring paragraph. */
const SPEECH_CUE = /\b(?:voice|spoke|speaks|called|calls|answered|replied|asked|said|whispered|murmured|muttered|shouted|added|continued|snapped)\b/i;
const CUE_NEGATION = /\b(?:nothing|never|silent|silence|did not|didn’t|didn't|no reply|without a word)\b/i;

function announcedSpeaker(paragraph, aliases) {
  const text = paragraph.trim();
  if (text.length > 120 || CUE_NEGATION.test(text) || !SPEECH_CUE.test(text)) return null;
  for (const row of aliases) {
    if (new RegExp(`^${escRe(row.alias)}(?:[’']s)?\\b`).test(text)) return row.key;
  }
  return null;
}

function outsideQuotes(paragraph) {
  return paragraph.replace(/“[^”]*”?/gu, ' ');
}

function isStandaloneDialogue(paragraph) {
  const text = paragraph.trim();
  return !text.startsWith('[[speaker:') && text.startsWith('“') && /”[.!?…]?$/u.test(text);
}

function addDialogueHints(body, aliases) {
  const paragraphs = body.split(/\n{2,}/);
  let tagged = 0;
  let total = 0;
  let focusSpeaker = null;
  let announced = null;
  // reset per chapter; addDialogueHints is called once per chapter body

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    if (!paragraph) continue;

    if (!isStandaloneDialogue(paragraph)) {
      const narrationOnly = !paragraph.includes('“');
      announced = narrationOnly ? announcedSpeaker(paragraph, aliases) : null;
      focusSpeaker = narrationOnly ? subjectSpeaker(paragraph, aliases) : null;
      continue;
    }

    total++;
    // A quote paragraph can carry its own attribution — `“No,” Eirik said. “I am
    // surprised.”` — and that is stated fact. Otherwise only a speaker explicitly
    // announced by the preceding prose is used. Do not infer from the following
    // paragraph and do not assume conversational turn-taking: either can assign a
    // plausible but wrong name in multi-person scenes.
    const selfAttribution = attributedSpeaker(outsideQuotes(paragraph), aliases);
    const speaker = selfAttribution || announced || focusSpeaker;

    if (speaker) {
      paragraphs[i] = `[[speaker:${speaker}]]${paragraph}`;
      tagged++;
    }
    focusSpeaker = null;
    announced = null;
  }

  return { text: paragraphs.join('\n\n').trim(), tagged, total };
}

function cleanChapterBody(raw) {
  let body = raw.replace(/\r\n/g, '\n').trim();

  // Draft files sometimes carry handoff text after the final chapter in a part.
  // That text is useful to writers but must never appear in the reader.
  const footer = body.search(/\n---\n\s*(?:\*\*End of|Chapter \d+ begins|Phase III begins|Reader integration note)/i);
  if (footer >= 0) body = body.slice(0, footer).trim();

  // Horizontal rules delimit chapters/parts in the authoring files. Internal
  // source subheadings are converted to bold reader lines because the novel
  // renderer intentionally does not interpret Markdown headers.
  body = body
    .split('\n')
    .filter((line) => line.trim() !== '---')
    .join('\n')
    .replace(/^#{1,6}\s+(.+)$/gm, '**$1**')
    .trim();

  if (/^## Chapter \d+\s+[—-]/m.test(body)) {
    throw new Error('Final-arc chapter body leaked a chapter boundary heading.');
  }
  return body;
}

function expectedSeasonForChapter(chapter) {
  return FINAL_ARC_FIRST_SEASON + Math.floor((chapter - FINAL_ARC_FIRST_CHAPTER) / 10);
}

export async function loadFinalArcSeasons() {
  const aliases = await loadSpeakerAliases();
  const speakerKeys = await loadSpeakerKeys();
  const filenames = (await readdir(proseDir))
    .filter((name) => SOURCE_RE.test(name))
    .map((name) => ({ name, match: SOURCE_RE.exec(name) }))
    .filter(({ match }) => {
      const season = Number(match[1]);
      return season >= FINAL_ARC_FIRST_SEASON && season <= FINAL_ARC_LAST_SEASON;
    })
    .sort((a, b) => Number(a.match[1]) - Number(b.match[1]) || partNumber(a.name) - partNumber(b.name));

  const bySeason = new Map();
  const seenChapters = new Set();
  let taggedDialogue = 0;
  let standaloneDialogue = 0;

  for (const { name, match } of filenames) {
    const sourceSeason = Number(match[1]);
    const source = (await readFile(resolve(proseDir, name), 'utf8')).replace(/\r\n/g, '\n');
    const headings = [...source.matchAll(CHAPTER_RE)];
    if (!headings.length) throw new Error(`${name}: no chapter headings found`);

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const chapter = Number(heading[1]);
      const title = heading[2].trim();
      const expectedSeason = expectedSeasonForChapter(chapter);
      if (expectedSeason !== sourceSeason) {
        throw new Error(`${name}: Chapter ${chapter} belongs to Season ${expectedSeason}, not Season ${sourceSeason}`);
      }
      if (seenChapters.has(chapter)) throw new Error(`Duplicate final-arc Chapter ${chapter}`);
      seenChapters.add(chapter);
      assertKnownSpeakers(source, speakerKeys, `${name} (Chapter ${chapter})`);

      const start = heading.index + heading[0].length;
      const end = headings[i + 1]?.index ?? source.length;
      const cleaned = cleanChapterBody(source.slice(start, end));
      const dialogue = addDialogueHints(cleaned, aliases);
      const text = dialogue.text;
      taggedDialogue += dialogue.tagged;
      standaloneDialogue += dialogue.total;
      if (!title || !text) throw new Error(`${name}: Chapter ${chapter} is missing title or prose`);

      const key = `season${sourceSeason}`;
      const episodes = bySeason.get(key) || [];
      episodes.push({ ep: `Chapter ${chapter}`, title, text });
      bySeason.set(key, episodes);
    }
  }

  for (let chapter = FINAL_ARC_FIRST_CHAPTER; chapter <= FINAL_ARC_LAST_CHAPTER; chapter++) {
    if (!seenChapters.has(chapter)) throw new Error(`Missing final-arc Chapter ${chapter}`);
  }
  if (seenChapters.size !== FINAL_ARC_LAST_CHAPTER - FINAL_ARC_FIRST_CHAPTER + 1) {
    throw new Error(`Expected 200 final-arc chapters, found ${seenChapters.size}`);
  }

  for (let season = FINAL_ARC_FIRST_SEASON; season <= FINAL_ARC_LAST_SEASON; season++) {
    const key = `season${season}`;
    const episodes = bySeason.get(key);
    if (!episodes || episodes.length !== 10) {
      throw new Error(`${key}: expected 10 chapters, found ${episodes?.length ?? 0}`);
    }
    episodes.sort((a, b) => Number(a.ep.replace('Chapter ', '')) - Number(b.ep.replace('Chapter ', '')));
    const firstExpected = FINAL_ARC_FIRST_CHAPTER + (season - FINAL_ARC_FIRST_SEASON) * 10;
    episodes.forEach((episode, index) => {
      const expected = `Chapter ${firstExpected + index}`;
      if (episode.ep !== expected) throw new Error(`${key}: expected ${expected}, found ${episode.ep}`);
    });
  }

  console.log(`[final-arc] Parsed 200 chapters; tagged ${taggedDialogue}/${standaloneDialogue} high-confidence standalone dialogue paragraphs.`);
  return Object.fromEntries([...bySeason.entries()].sort((a, b) => Number(a[0].slice(6)) - Number(b[0].slice(6))));
}
