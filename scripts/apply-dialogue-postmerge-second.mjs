import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const proseDir = resolve(root, 'docs/prose');
const SOURCE_RE = /^FINAL_ARC_SEASON(\d{3})_PROSE_DRAFT(?:_(\d+))?\.md$/;
const CHAPTER_RE = /^## Chapter (\d+) — .+$/gm;

// Human-reviewed mixed dialogue/pronoun attributions. Each entry is scoped to a
// globally unique chapter and a distinctive exact snippet from the paragraph.
// Anonymous/generic speakers are deliberately omitted.
const maps = [
  [301, "“You're arguing with the sign again,” he said.", 'qin'],
  [301, '“Was that about the sign?” he asked.', 'rhen'],
  [303, '“Again,” she said.', 'arin'],
  [304, '“What seal?” he asked.', 'luweiran'],
  [304, '“What happened?” she asked Rhen.', 'sera'],
  [305, 'After a moment she added, “Professionally.”', 'yun'],
  [305, '“What is the third layer?” he asked.', 'luo'],
  [305, '“Release coating,” he said.', 'luo'],
  [306, '“Not they,” she said.', 'yun'],
  [307, '“Start again,” he told the courier.', 'luweiran'],
  [307, '“I follow the boxes,” he said.', 'luweiran'],
  [309, '“One instruction,” he said.', 'luweiran'],
  [309, '“Where?” he asked.', 'rui'],

  [312, 'After a moment she said, “You owe me a teapot.”', 'sera'],
  [313, '“You dislike institutions,” she said.', 'sera'],
  [313, '“Do you think Tae obeys me because I own him?” she asked.', 'sera'],
  [313, 'Behind her, he said, “You were waiting to say that.”', 'xie_wuchen'],
  [315, '“There’s a knife in the sleeve,” he said.', 'luo'],
  [315, 'After a while he said, “Use the second notebook.”', 'luo'],
  [316, '“What happens there?” she asked, nodding toward the dispute hall.', 'yun'],
  [320, 'Instead she said, “Then we act like she missed the window.”', 'sera'],

  [323, '“That is cheating,” she said.', 'sera'],
  [323, '“Leaving before anyone can depend on you is still a choice,” he said.', 'rhen'],
  [324, '“Wet floor?” he asked.', 'shunto'],
  [325, '“You’re improving,” she said.', 'yun'],
  [325, '“You’re looking for Axtaya,” he said.', 'shunto'],
  [325, '“Interesting,” he murmured.', 'shunto'],
  [327, '“No wet floors today?” he asked.', 'shunto'],
  [329, '“What are you trying to find?” he asked.', 'shunto'],
  [330, '“One more layer,” she whispered.', 'yun'],

  [331, '“He is unreliable,” she said.', 'yun'],
  [332, '“Embarrassing,” she told it.', 'yun'],
  [334, '“How full?” she asked.', 'sera'],
  [337, '“You are late,” she said.', 'yun'],
  [337, '“You disappoint me,” she said.', 'yun'],
  [337, '“Needle?” he asked.', 'shunto'],
  [337, '“You want out,” he said.', 'shunto'],
  [337, '“You learned,” she said.', 'yun'],
  [340, '“Three months,” he called.', 'shunto'],
  [340, '“You stopped searching,” he said.', 'shunto'],

  [341, '“How are the locks?” he asked.', 'shunto'],
  [342, '“Your physician,” he said.', 'shunto'],
  [343, 'He said, “You should have—”', 'shunto'],
  [344, '“When?” he asked.', 'shunto'],
  [344, '“Delayed peripheral toxin,” she said.', 'yun'],
  [346, 'She said, “I have evidence.”', 'yun'],
  [346, 'She said, “The evidence cannot be left behind.”', 'yun'],
  [347, '“How many?” she asked.', 'yun'],
  [348, '“The eastern medical corridor has an unnecessary double patrol between third and fourth bell,” he said.', 'black_radiance'],
  [349, '“Late,” he said.', 'black_radiance'],
  [349, '“Humiliating,” she muttered.', 'yun'],
  [349, '“His training helps,” she said.', 'yun'],
  [350, '“Find the corridor,” he said.', 'shunto'],

  [351, 'Instead she asked, “Can the Garden keep running while you are inside?”', 'sera'],
  [355, '“How long?” she asked.', 'yun'],
  [356, '“Not yet,” she said.', 'yun'],
  [357, 'Then he said, “Facts first.”', 'jin'],
  [360, '“You said an hour,” he told him.', 'luweiran'],

  [361, '“Again,” she said.', 'sera'],
  [361, '“Do not heat it,” he said when one assistant reached for the kettle.', 'luo'],
  [361, '“Not enough,” he said.', 'haru'],
  [362, '“Home,” she said.', 'sera'],
  [363, '“Fine,” he murmured.', 'luo'],
  [364, '“Where will you go?” she asked.', 'hana'],
  [364, 'She said, “The western inspection office receives the updated route notices at sunset.”', 'hana'],
  [364, '“Thank you,” he said.', 'black_radiance'],
  [365, '“Again,” he said.', 'tsubasa'],
  [365, '“I think Isgard cannot sustain another decade like the last two years,” he said.', 'tsubasa'],
  [366, '“Again,” he said.', 'jin'],
  [366, "“Most of Stonecrown's fixed defence remains,” he said.", 'kael'],
  [367, '“Start at the point you found Yun,” she said.', 'sera'],
  [369, '“Form on the ridge,” he said.', 'kenji'],

  [371, '“You always hated long arguments,” he said.', 'eirik'],
  [372, '“Where does the road split behind it?” he asked.', 'jun'],
  [372, '“Road?” he asked.', 'halvek'],
  [373, '“Two passes,” he told his riders.', 'raska'],
  [373, '“You like this,” he said.', 'raska'],
  [374, '“Your output is falling,” she said.', 'nao'],
  [374, '“Terrible face,” he muttered.', 'tor_veyrhald'],
  [375, '“Your leg is bleeding again,” he said.', 'eldran'],
  [375, '“Idiot,” she said.', 'maedra'],
  [377, '“Merciful?” she asked.', 'sigrun'],
  [379, 'He said, “Coincidence.”', 'black_radiance'],
  [379, 'She said, “Three weeks of coincidence is employment.”', 'sera'],
  [379, 'He said, “I have not accepted wages.”', 'black_radiance'],

  [384, 'After a long time he asked, “Did she say his name?”', 'luo'],
  [384, 'Then he said, “I hate you sometimes.”', 'luo'],

  [392, '“Stop forcing it,” she said.', 'hana'],
  [396, '“Five minutes,” he said.', 'haru'],

  [401, '“Necessary to whom?” she asked.', 'aya'],
  [403, '“How many doses?” she asked.', 'aya'],
  [404, '“Sorry,” she said.', 'aya'],

  [411, '“What happens now?” he asked.', 'haru'],
  [416, '“If she beats me again?” he asked.', 'kenji'],

  [421, '“Do you believe in this invasion?” he asked.', 'liang'],
  [422, '“For healing me,” he added.', 'jun'],

  [437, '“Hold still,” he said.', 'luo'],

  [441, '“She is alive,” he said.', 'luweiran'],
  [441, 'Then he asked, “What is Axtaya?”', 'rhen'],
  [442, '“Your security has improved,” he said.', 'rhen'],
  [442, '“Yun died on Day Zero,” he said.', 'luweiran'],
  [442, '“Remember her name,” he said.', 'rhen'],
  [442, '“Two Paragons?” he asked.', 'rhen'],
  [442, '“Thirty-five years,” he said.', 'rhen'],
  [443, '“It’s too quiet,” he said.', 'qin'],
  [443, '“What did you think of their Domains?” he asked.', 'rhen'],
  [443, 'Then he asked, “Where is Yurushi?”', 'rhen'],
  [444, '“Still adjusting,” he said.', 'rhen'],
  [445, '“Good work,” he said.', 'rhen'],
  [446, '“Don’t,” she said into his coat.', 'sera'],
  [446, '“Good,” she said.', 'sera'],
  [447, '“This is cheating,” she said.', 'sera'],
  [447, '“Better?” he asked.', 'rhen'],
  [447, '“One is for him?” he asked.', 'jin'],
  [447, '“I don’t know,” she said.', 'sera'],
  [448, '“I am not offended,” she said.', 'aya'],
  [448, '“You’re late,” he said.', 'luo'],
  [448, '“Did you approve three-times use?” he asked.', 'rhen'],
  [448, '“That is not the same as saying I bear no responsibility,” she added.', 'aya'],
  [448, '“Sector Seven,” she said instantly.', 'aya'],
  [448, 'Instead she asked, “Why can’t you restore the years?”', 'aya'],
  [448, '“Not this,” he said.', 'rhen'],
  [449, '“Maedra?” he asked.', 'aldric'],
  [449, '“You changed,” she said.', 'sigrun'],
  [449, '“Fine,” she said.', 'sigrun'],
  [449, '“Happy?” she asked.', 'sera'],
  [450, '“And people inside it who do not agree with everything command has done,” she said.', 'aya'],
  [450, '“You’re smiling,” she whispered.', 'sera'],
  [450, '“So we plan for all of them,” she said.', 'sera'],
  [450, '“You’re really okay with this?” she asked.', 'sera'],

  [452, '“Nation army destroyed in one night,” he said.', 'tsubasa'],
  [452, '“Prepare relocation,” he said.', 'tsubasa'],
  [453, '“This is worse,” she said.', 'ilyra'],
  [453, '“What?” she asked.', 'sera'],
  [455, '“Start at the point you are certain,” he said.', 'luweiran'],
  [455, '“Yurushi told me everything,” she said.', 'sera'],
  [456, 'Then he asked, “Did Rhen tell you to say that?”', 'luo'],
  [456, '“Where is Shunto Takamori?” he asked again.', 'luo'],
  [458, 'Without looking back, he said, “Because there is a difference between discovering that a report is false and discovering that the man who wrote it will lie to my face.”', 'tsubasa'],
  [460, '“Do not,” he said.', 'tsubasa'],

  [461, '“Five years,” he murmured.', 'shunto'],
  [464, '“What are you looking at?” he asked.', 'shunto'],
  [464, '“Five minutes,” he said.', 'luo'],
  [466, '“Careful,” he said.', 'kael'],
  [467, '“No,” he said.', 'luo'],
  [468, '“Be alive,” she whispered.', 'sera'],
  [470, '“No,” he said.', 'luo'],

  [477, '“Can she win?” he asked.', 'jin'],
  [480, '“Don’t look so happy,” she said.', 'sera'],
  [480, '“You are,” he answered.', 'tsubasa'],

  [481, '“You need me?” he asked.', 'tsubasa'],
  [481, '“What are you doing?” she asked.', 'aya'],
  [481, '“He’s clean,” she said.', 'aya'],
  [482, '“They’re telling them,” he said.', 'jin'],
  [483, '“They’re good,” he said.', 'rhen'],

  [491, '“Are they safe?” she asked.', 'sera'],
  [492, '“You’re doing that wrong,” she said anyway.', 'aya'],
  [496, 'Finally he said, “I know.”', 'luo'],
  [496, '“Maybe longer,” she added.', 'hana'],
  [497, '“It survived,” he said.', 'aldric'],
  [497, '“You’re smiling,” he said.', 'rhen'],
  [498, '“No report?” he asked.', 'black_radiance'],
  [499, '“This was supposed to be a quiet organization,” she said.', 'sera'],
  [499, '“Your idea,” he said.', 'rhen'],
  [500, '“You’re staring,” he said.', 'rhen'],
  [500, '“You planned this,” he murmured.', 'rhen']
];

const byChapter = new Map();
for (const [chapter, snippet, speaker] of maps) {
  if (!byChapter.has(chapter)) byChapter.set(chapter, []);
  byChapter.get(chapter).push({ snippet, speaker });
}

const files = (await readdir(proseDir)).filter((f) => SOURCE_RE.test(f)).sort();
let added = 0;
let already = 0;
for (const file of files) {
  const match = SOURCE_RE.exec(file);
  const season = Number(match[1]);
  if (season < 95 || season > 114) continue;

  const path = resolve(proseDir, file);
  let text = (await readFile(path, 'utf8')).replace(/\r\n/g, '\n');
  let changed = false;

  for (const [chapter, chapterMaps] of byChapter) {
    if (!new RegExp(`^## Chapter ${chapter} — `, 'm').test(text)) continue;
    for (const map of chapterMaps) {
      const heads = [...text.matchAll(CHAPTER_RE)];
      const hi = heads.findIndex((h) => Number(h[1]) === chapter);
      const start = heads[hi].index + heads[hi][0].length;
      const end = heads[hi + 1]?.index ?? text.length;
      const paragraphs = text.slice(start, end).trim().split(/\n{2,}/);
      const hits = [];

      for (let i = 0; i < paragraphs.length; i++) {
        const p = paragraphs[i].trim();
        const body = p.replace(/^\[\[speaker:[a-z0-9_]+\]\]/, '');
        if (body.includes(map.snippet)) hits.push(i);
      }

      if (hits.length !== 1) {
        throw new Error(`${file} Ch${chapter}: expected exactly one paragraph containing ${map.snippet}; found ${hits.length}`);
      }

      const index = hits[0];
      const current = paragraphs[index].trim();
      const marker = current.match(/^\[\[speaker:([a-z0-9_]+)\]\]/);
      if (marker) {
        if (marker[1] !== map.speaker) {
          throw new Error(`${file} Ch${chapter}: existing speaker ${marker[1]} conflicts with reviewed ${map.speaker}: ${map.snippet}`);
        }
        already++;
        continue;
      }

      paragraphs[index] = `[[speaker:${map.speaker}]]${current}`;
      text = text.slice(0, start) + '\n\n' + paragraphs.join('\n\n').trim() + '\n\n' + text.slice(end);
      added++;
      changed = true;
    }
  }

  if (changed) await writeFile(path, text);
}

console.log({ reviewed: maps.length, added, already });
