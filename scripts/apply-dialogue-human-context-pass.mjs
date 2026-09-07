import { readdir, readFile, writeFile } from 'node:fs/promises';

const E = (s,ch,k,q,prev,extra={}) => ({s,ch,k,q,prev,...extra});
const entries = [
  // Season 95 — named action beats that directly identify the following quote.
  E(95,301,'rhen',`“I haven't done anything yet.”`,`Rhen looked down.`),
  E(95,301,'rhen',`“I could fix the sign before they destroy something expensive.”`,`Rhen looked back at Sera.`),
  E(95,301,'sera',`“You say that like the sign is not the expensive thing you're about to destroy.”`,`Sera's mouth twitched.`),
  E(95,302,'sera',`“You're about to ask me again.”`,`Sera caught his wrist.`),
  E(95,302,'rhen',`“He said, ‘If this is another excuse to tell me my meridians are asymmetrical, I will leave.’”`,`Rhen's expression went blank in the particular way that meant he was about to quote someone exactly.`),
  E(95,303,'rhen',`“If someone asks me to repair damage, I repair it. If someone decided they are done, I do not heal that decision.”`,`Rhen wiped dust from his hand.`),
  E(95,303,'sera',`“‘Tell the healer his northern tonic tastes like boiled boots.’”`,`Sera read it.`),
  E(95,304,'yun',`“Ordinary medicine does not ask a body to tear itself apart for five good minutes.”`,`Yun smiled without humor.`),
  E(95,304,'rhen',`“I left them because I want you to see the pattern before I erase it.”`,`Rhen touched the patient's wrist.`),
  E(95,304,'yun',`“Something prevented the crash from arriving when it should have.”`,`Yun nodded.`),
  E(95,304,'yun',`“Yes.”`,`Yun looked at him.`),
  E(95,304,'luweiran',`“Three crates passed through registered medical distributors before the route went dark.”`,`Lu turned one page of the manifest.`),
  E(95,304,'luo',`“No.”`,`Luo looked at her.`),
  E(95,305,'yun',`“Warning responses. Tremor. breath distress. vascular pressure. The body begins screaming and something tells it to lower its voice.”`,`Yun tapped the glass.`),
  E(95,305,'yun',`“The patient's damage clusters around thresholds. Whoever made the compound expected variance in meridian width, cardiovascular tolerance and body mass.”`,`Yun pointed toward the notes.`),
  E(95,306,'rhen',`“If you cut someone, there is a wound. I can close it.”`,`Rhen looked at her.`),
  E(95,306,'yun',`“The drug made your body spend something it normally protects.”`,`Yun did not soften the point, but neither did she make it cruel.`),
  E(95,306,'rhen',`“Some things, yes. Ordinary exhaustion. Qi. physical condition.”`,`Rhen considered.`),
  E(95,306,'qin',`“The pulse rhythm is correct. The resonance behind it is thin.”`,`Qin tilted his head.`),
  E(95,306,'qin',`“Good. I was worried being blind had become decorative.”`,`Qin smiled faintly.`),
  E(95,306,'sera',`“Can Echo Dominion read it more clearly?”`,`Sera ignored the tone.`),
  E(95,306,'qin',`“I am not activating a Domain inside a clinic to listen to one recovering man's pulse.”`,`Qin shook his head.`),
  E(95,307,'sera',`“Where?”`,`Sera's eyes sharpened.`),
  E(95,307,'luweiran',`“Excellent.”`,`Lu's expression remained flat.`),
  E(95,307,'yun',`“You are welcome.”`,`Yun leaned against a cabinet.`),
  E(95,308,'sera',`“Yes.”`,`Sera nodded.`),
  E(95,308,'rhen',`“No.”`,`Rhen considered.`),
  E(95,308,'rhen',`“What?”`,`Rhen looked at all of them.`),
  E(95,309,'luweiran',`“I know everyone's name.”`,`Lu looked offended.`),
  E(95,309,'xie_wuchen',`“Yes.”`,`Xie's face lost its lightness.`),
  E(95,309,'rui',`“Do not.”`,`Rui closed his eyes.`),
  E(95,309,'luweiran',`“I know everyone's name.”`,`Lu looked up.`),
  E(95,310,'yun',`“Axtaya.”`,`Yun looked down at the word.`),
  E(95,310,'sera',`“Shinrin.”`,`Sera looked at the route mark beneath it.`),

  // Later seasons — similarly direct, locally provable context.
  E(101,370,'eirik',`“No.”`,`Eirik did not deny it.`),
  E(101,370,'aldric',`“No.”`,`Aldric's spear settled into both hands.`),
  E(105,404,'aya',`“What?”`,`Aya finished adjusting the needle in his shoulder.`),
  E(105,404,'aya',`“Yes.”`,`Aya looked at him.`, {next:`The officer’s jaw tightened.`}),
  E(105,406,'jin',`“Yes.”`,`Jin sighed.`),
  E(105,406,'jin',`“Yes.”`,`Jin looked at him.`),
  E(105,409,'kai',`“Good.”`,`Actually laughed.`, {prev2:`Kai laughed.`}),
  E(105,409,'kai',`“Good.”`,`Kai looked past Sera.`),
  E(108,436,'luo',`“I know.”`,`“I mean your claim.”`, {prev2:`[luo] “Yes.”`}),
  E(108,437,'sera',`“Yes.”`,`“Still good?” Kael asked.`, {prev2:`Sera folded the pages.`}),
  E(111,462,'kael',`“What?”`,`[luo] “Yes.”`, {prev2:`[kael] “Anything?”`}),
  E(111,468,'luo',`“Yes.”`,`[shunto] “On me?”`, {prev2:`[luo] “I'm working.”`}),
  E(111,468,'luo',`“Yes.”`,`For one impossible instant, Shunto thought he was smiling.`, {prev2:`Luo's mouth moved.`}),
  E(111,470,'luo',`“Yes.”`,`[shunto] “You could let me die.”`),
];

const strip = s => s.replace(/^\[\[speaker:[^\]]+\]\]/,'').trim();
const norm = s => strip(s).replace(/\r/g,'');
const files = (await readdir('docs/prose')).filter(f => /^FINAL_ARC_SEASON\d{3}_PROSE_DRAFT(?:_\d+)?\.md$/.test(f));
const seasonOf = f => Number(f.match(/SEASON(\d{3})/)[1]);
const targetSeasons = new Set(entries.map(e=>e.s));
const matched = new Set();

for (const file of files.filter(f=>targetSeasons.has(seasonOf(f)))) {
  const season = seasonOf(file);
  const pth = `docs/prose/${file}`;
  const original = await readFile(pth,'utf8');
  const ps = original.split(/\n{2,}/);
  let chapter = null;
  for (let i=0;i<ps.length;i++) {
    const t = ps[i].trim();
    const h = t.match(/^## Chapter (\d+) — /);
    if (h) { chapter=Number(h[1]); continue; }
    if (!chapter || /^\[\[speaker:/.test(t)) continue;
    for (let x=0;x<entries.length;x++) {
      if (matched.has(x)) continue;
      const e=entries[x];
      if (e.s!==season || e.ch!==chapter || norm(t)!==e.q) continue;
      const prev=i?norm(ps[i-1]):'';
      const prev2=i>1?norm(ps[i-2]):'';
      const next=i+1<ps.length?norm(ps[i+1]):'';
      if (e.prev && !prev.includes(e.prev)) continue;
      if (e.prev2 && !prev2.includes(e.prev2)) continue;
      if (e.next && !next.includes(e.next)) continue;
      const off=ps[i].indexOf(t);
      ps[i]=`${ps[i].slice(0,off)}[[speaker:${e.k}]]${t}${ps[i].slice(off+t.length)}`;
      matched.add(x);
      break;
    }
  }
  const updated=ps.join('\n\n');
  if(updated!==original) await writeFile(pth,updated);
}

console.log(`Added ${matched.size}/${entries.length} reviewed human-context markers.`);
for(let i=0;i<entries.length;i++) if(!matched.has(i)) console.log('UNMATCHED',JSON.stringify(entries[i]));
if(matched.size!==entries.length) throw new Error('Refusing partial human-context pass.');
