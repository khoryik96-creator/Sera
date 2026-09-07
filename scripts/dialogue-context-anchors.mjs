import { readdir, readFile, writeFile } from 'node:fs/promises';

const entries = [
  [112,474,'sera','“No.”','That made her smile faintly.'],
  [112,474,'rhen','“Yes.”','Rhen paused.'],
  [112,474,'rhen','“Yes.”','Sera narrowed her eyes.','“Do not do that.”'],
  [112,474,'sera','“No.”','Sera\'s eyes narrowed.'],
  [112,480,'sera','“No.”','She raised one hand.'],
  [112,480,'tsubasa','“No.”','Tsubasa shook his head.'],
  [113,481,'rhen','“Yes.”','Then at her.'],
  [113,481,'rhen','“Yes.”','Rhen nodded.'],
  [113,484,'rhen','“Yes.”','Rhen looked at the chain network.'],
  [113,484,'rhen','“Yes.”','Rhen looked past him.'],
  [113,486,'rhen','“Yes.”','“Into that?”'],
  [113,486,'rhen','“Yes.”','Rhen thought about it.'],
  [113,488,'tsubasa','“Why?”','“Yes.”'],
  [113,488,'tsubasa','“Why?”','“No.”'],
  [113,489,'rhen','“No.”','Rhen watched the remaining signatures.'],
  [113,489,'rhen','“No.”','One signature remained still.'],
  [110,452,'haru','“Yes.”','Haru\'s mouth flattened.'],
  [110,452,'haru','“Yes.”','Haru\'s fingers curled against his knee.'],
  [110,452,'hana','“Yes.”','Hana held his gaze.'],
  [110,453,'jin','“No.”','Jin looked at her.'],
  [110,453,'tsubasa','“No.”','Tsubasa did not look at him.'],
  [110,454,'aya','“No.”','Aya kept writing.','The clerk blinked.'],
  [110,454,'tsubasa','“Yes.”','Tsubasa held her gaze.'],
  [110,454,'aya','“No.”','Aya turned on him.'],
  [110,454,'aya','“Yes.”','Aya stopped.'],
  [110,454,'aya','“Yes.”','Aya\'s throat tightened.'],
  [110,455,'black_radiance','“Yes.”','Yurushi\'s eyes hardened.'],
  [110,455,'rhen','“Yes.”','Rhen\'s hand tightened slightly at her shoulder.'],
  [110,456,'luo','“Good.”','Luo nodded once.'],
  [110,456,'luo','“Good.”','Luo nodded.'],
  [110,460,'tsubasa','“No.”','Tsubasa nodded once.'],
  [110,460,'tsubasa','“No.”','Tsubasa\'s face went still.'],
  [109,444,'black_radiance','“Yes.”','Yurushi\'s expression did not change much, but the balance in his qi did.'],
  [109,444,'rhen','“No.”','Rhen smiled.'],
  [109,444,'rhen','“No.”','Rhen looked up.'],
  [109,444,'rhen','“No.”','Rhen\'s expression softened.'],
  [109,444,'luweiran','“Yes.”','Lu stared at him.'],
  [109,446,'rhen','“I know.”','Rhen\'s expression changed.'],
  [109,446,'sera','“I know.”','Sera smiled.'],
  [109,448,'rhen','“Yes.”','“You understand I healed people so they could return to the same war.”'],
  [109,448,'aya','“Yes.”','Aya gave him a flat look.'],
  [108,436,'luo','“I know.”','Luo’s jaw tightened.'],
  [108,437,'sera','“Yes.”','Sera folded the pages.'],
  [108,439,'qin','“Yes.”','“Different?” Tae asked him.'],
  [106,412,'tsubasa','“Yes.”','Tsubasa’s face hardened.'],
  [106,413,'aya','“Yes.”','Aya did not look up.'],
  [106,413,'nao','“No.”','Nao considered.'],
  [106,413,'nao','“No.”','Nao’s mouth moved.']
];

const valid = new Set(['rhen','sera','kael','liang','jin','lei','rui','ilyra','tae','mo','arin','luo','yun','qin','han','jianruo','xuweng','moqian','yeonhwa','wei','ji','cao','ye','zhao','lin','yan','meizhen','yunke','gaoren','shufen','baotien','meilin','song','shiyue','huo','nam','chun','haejin','gwon','daemun','baek','gong','jiang','duan','mi','qiu','zhao_renkai','mu','seo','gu','ren','qiao','miri','sorin','valeria','draven','aurel','vaelor','orun','iscaryn','rhavenn','tor','caedros','varesh','amon','aethon','mareth','garran','neris','sivra','oren','varok','raska','eira','tor_veyrhald','aldric','maedra','sigrun','halvek','solveig','eldran','brynja','oskar','astrid','jorek','freya','kellan','luweiran','xie_wuchen','black_radiance','tsubasa','shunto','kai','haru','eirik','hana','aya','kenji','jun','nao']);
for (const [, , speaker, quote] of entries) {
  if (!valid.has(speaker)) throw new Error(`Invalid speaker key: ${speaker}`);
  if (!/^“[\s\S]*”$/.test(quote)) throw new Error(`Target is not dialogue-only: ${quote}`);
}

const stripMarker = (s) => s.replace(/^\[\[speaker:[^\]]+\]\]/, '');
const normalize = (s) => stripMarker(s.trim()).replace(/\r/g, '');
const proseDir = 'docs/prose';
const files = (await readdir(proseDir)).filter((name) => /^FINAL_ARC_SEASON\d{3}_PROSE_DRAFT(?:_\d+)?\.md$/.test(name));
const seasonOf = (name) => Number(name.match(/SEASON(\d{3})/)[1]);
const wanted = new Set(entries.map(([s]) => s));
const matched = new Set();

for (const file of files.filter((f) => wanted.has(seasonOf(f)))) {
  const season = seasonOf(file);
  const original = await readFile(`${proseDir}/${file}`, 'utf8');
  const paragraphs = original.split(/\n{2,}/);
  let chapter = null;
  for (let i = 0; i < paragraphs.length; i++) {
    const t = paragraphs[i].trim();
    const h = t.match(/^## Chapter (\d+) — /);
    if (h) { chapter = Number(h[1]); continue; }
    if (!chapter || /^\[\[speaker:[^\]]+\]\]/.test(t)) continue;
    for (let e = 0; e < entries.length; e++) {
      if (matched.has(e)) continue;
      const [s,ch,speaker,quote,prevAnchor,nextAnchor] = entries[e];
      if (s !== season || ch !== chapter || normalize(t) !== quote) continue;
      const prev = i > 0 ? normalize(paragraphs[i-1]) : '';
      const next = i + 1 < paragraphs.length ? normalize(paragraphs[i+1]) : '';
      if (prevAnchor && !prev.includes(prevAnchor)) continue;
      if (nextAnchor && !next.includes(nextAnchor)) continue;
      const offset = paragraphs[i].indexOf(t);
      paragraphs[i] = `${paragraphs[i].slice(0, offset)}[[speaker:${speaker}]]${t}${paragraphs[i].slice(offset + t.length)}`;
      matched.add(e);
      break;
    }
  }
  const updated = paragraphs.join('\n\n');
  if (updated !== original) await writeFile(`${proseDir}/${file}`, updated);
}

console.log(`Added ${matched.size} context-anchored speaker markers from ${entries.length} reviewed targets.`);
for (let i = 0; i < entries.length; i++) {
  if (!matched.has(i)) console.log('UNMATCHED', JSON.stringify(entries[i]));
}
if (matched.size !== entries.length) throw new Error(`Expected ${entries.length} context markers, added ${matched.size}. Refusing partial silent success.`);
