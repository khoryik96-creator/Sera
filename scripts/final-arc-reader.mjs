import { readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const proseDir = resolve(root, 'docs/prose');

export const FINAL_ARC_FIRST_SEASON = 95;
export const FINAL_ARC_LAST_SEASON = 114;
export const FINAL_ARC_FIRST_CHAPTER = 301;
export const FINAL_ARC_LAST_CHAPTER = 500;

const SOURCE_RE = /^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE = /^## Chapter (\d+) — (.+)$/gm;

function partNumber(name) {
  const match = SOURCE_RE.exec(name);
  return match?.[2] ? Number(match[2]) : 1;
}

function cleanChapterBody(raw) {
  let body = raw.replace(/\r\n/g, '\n').trim();

  // Draft files sometimes carry handoff text after the final chapter in a part.
  // That text is useful to writers but must never appear in the reader.
  const footer = body.search(/\n---\n\s*(?:\*\*End of|Chapter \d+ begins|Phase III begins|Reader integration note)/i);
  if (footer >= 0) body = body.slice(0, footer).trim();

  // The markdown horizontal rule is used as a chapter separator in the source
  // drafts. The reader does not parse Markdown rules, so remove separator-only
  // lines while preserving ordinary blank-line paragraph rhythm.
  body = body
    .split('\n')
    .filter((line) => line.trim() !== '---')
    .join('\n')
    .trim();

  if (/^#{1,6}\s/m.test(body)) {
    throw new Error('Final-arc chapter body still contains a Markdown heading.');
  }
  return body;
}

function expectedSeasonForChapter(chapter) {
  return FINAL_ARC_FIRST_SEASON + Math.floor((chapter - FINAL_ARC_FIRST_CHAPTER) / 10);
}

export async function loadFinalArcSeasons() {
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

      const start = heading.index + heading[0].length;
      const end = headings[i + 1]?.index ?? source.length;
      const text = cleanChapterBody(source.slice(start, end));
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

  return Object.fromEntries([...bySeason.entries()].sort((a, b) => Number(a[0].slice(6)) - Number(b[0].slice(6))));
}
