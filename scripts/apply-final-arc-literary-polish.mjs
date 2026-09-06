import { readFile, writeFile } from 'node:fs/promises';

const root = 'docs/prose';
const changed = new Set();

async function load(file) {
  return (await readFile(`${root}/${file}`, 'utf8')).replace(/\r\n/g, '\n');
}
async function save(file, text) {
  await writeFile(`${root}/${file}`, text);
  changed.add(file);
}

async function replaceOnce(file, oldText, newText) {
  let text = await load(file);
  const count = text.split(oldText).length - 1;
  if (count !== 1) throw new Error(`${file}: expected exactly one match, found ${count}: ${oldText.slice(0,80)}`);
  text = text.replace(oldText, newText);
  await save(file, text);
}

async function replaceChapter(file, chapter, body) {
  let text = await load(file);
  const marker = `## Chapter ${chapter} — `;
  const heading = text.indexOf(marker);
  if (heading < 0) throw new Error(`${file}: missing Chapter ${chapter}`);
  const bodyStart = text.indexOf('\n\n', heading);
  if (bodyStart < 0) throw new Error(`${file}: malformed Chapter ${chapter} heading`);
  const start = bodyStart + 2;
  const nextChapter = text.indexOf('\n---\n\n## Chapter ', start);
  const end = nextChapter >= 0 ? nextChapter : text.length;
  text = `${text.slice(0, start)}${body.trim()}\n${text.slice(end)}`;
  await save(file, text);
}

// ---------------------------------------------------------------------------
// Five genuinely underwritten late-Phase-II chapters.
// ---------------------------------------------------------------------------

await replaceChapter('FINAL_ARC_SEASON106_PROSE_DRAFT_2.md', 416, `Kenji’s injuries would have ended an ordinary cultivator’s season.

Aya gave him back to the war in days.

The speed was not miraculous. It was work so concentrated that, from outside the treatment room, it looked almost worse.

Fourteen hours for the first repair cycle. Seven Pulse Needles stabilizing nerve disruption. White Thread Sutra laid carefully around torn meridian walls. Cooling treatment for Thunder-Qi overdraw. Joint reconstruction one layer at a time because forcing the shoulder closed too quickly would have preserved strength and ruined motion.

Aya slept for three hours on a bench between the first and second cycles.

Kenji woke before she did.

He stared at his repaired hand until she opened one eye.

“Move the fingers.”

“All of them?”

“If I wanted only some, I would have said so.”

He obeyed.

No tremor.

Aya sat up, checked the wrist, then the elbow, then the shoulder. The work was not finished, but the body was beginning to believe it belonged to itself again.

Kenji watched her expression.

“You’re smiling.”

“No.”

“You are.”

“I’m checking facial nerve function.”

“That is a lie.”

“Yes.”

The answer made him laugh. The laugh pulled at his ribs and stopped him immediately.

Aya pointed at him without looking up from the chart.

“That is why you are not finished.”

Two days later he could rotate the shoulder through its full range. On the fourth, he could circulate Thunder Qi through the repaired arm without the old hitch. On the fifth, Aya let him stand under load and made him repeat the same motion until boredom replaced caution.

Only then did Kenji ask the question he had been avoiding.

“Will it be normal?”

“Recoverable damage, yes.”

“All of it?”

“Yes.”

He looked at the shoulder Sigrun had nearly destroyed.

“I thought she ended this arm.”

“She nearly did.”

“And you fixed it.”

“I treated it.”

“That sounds like the same thing.”

“It is not.”

Aya set the chart aside.

The distinction sat between them for several breaths.

Kenji had spent most of his adult life believing physical consequence clarified moral consequence. You fought. You were wounded. You paid. If you survived, the pain at least proved something had happened.

Now his body was erasing the evidence faster than his mind could.

“If she beats me again?” he asked.

“That is not medical.”

“I know.”

Aya waited.

Kenji looked toward the canvas wall as though Isgard existed immediately beyond it.

“Raska died.”

“Yes.”

“Halvek too.”

“Yes.”

“Tor cannot return to the frontline.”

“Yes.”

“Eldran may never fight properly again.”

Aya’s eyes lowered.

“Yes.”

“Sigrun nearly died.”

“Yes.”

He flexed the repaired hand once more.

“And I get this.”

Aya understood before he finished.

Not guilt exactly. The first honest recognition of an asymmetry he had previously experienced only as advantage.

Shinsei could recycle a living apex fighter if Aya had enough time and the damage remained physically recoverable. Isgard could not ask Raska to stand again. No technique made Halvek less dead. Tor’s destroyed future frontline capacity did not become temporary because the enemy physician was talented.

Kenji swallowed.

“That doesn’t feel fair.”

“No.”

“Should I refuse the rest of the treatment?”

Aya became very still.

“No.”

He blinked.

“You do not honor dead people by making one more injury permanent when it can be healed.” Her voice was quiet, but there was iron beneath it. “A physician does not correct injustice by creating another patient.”

Kenji looked down.

“Then what am I supposed to do with it?”

“The body?”

“The fact that I get it back.”

Aya glanced at the repaired shoulder, then at his face.

“Decide what you do with the body afterward.”

That answer stayed with him through the final circulation test.

Aya restored tendon, nerve, muscle and meridian. She could return the clean mechanics of Stormstep Dominion. She could make the shoulder strong enough to hold a sword as if Sigrun had never driven a spear through his certainty.

She could not restore the certainty itself.

When Kenji finally stood in armor again, he rolled the shoulder once and found nothing wrong.

Physically, he was whole.

He thanked Aya before leaving.

She did not look up from the next chart.

“You owe me no obedience because I treated you.”

“I know.”

“No extra years because I returned your body.”

Kenji paused at the flap.

“I know that too.”

This time Aya believed him.

She had given him back his body.

What he chose to make it mean would have to be his.`);

await replaceChapter('FINAL_ARC_SEASON107_PROSE_DRAFT.md', 422, `Aya removed the last restriction from Jun Kajihara’s chart just after dawn.

He read the line twice, suspicious of good news on principle.

“Full?”

“Recoverable conventional damage: effectively full.”

“Effectively?”

“Medicine uses words carefully. Try it sometime.”

Jun ignored the insult and flexed the arm Kael had damaged weeks earlier.

No instability.

He rotated the shoulder through a slow circle. No pain. A full breath produced no catch beneath the ribs. Even the deep meridian bruise that had made Gatebreaker Halberd feel half a beat late was gone.

Aya had taken him from near-collapse to seventy-eight percent in days because Shinsei needed bodies back on the line. The rushed return had never been the same as healing. She had known it. Jun had known it. Command had known it and used him anyway.

Now enough uninterrupted treatment had finally passed for the remainder to close.

Jun looked at the clean chart.

“So I can go back.”

“I said you are medically cleared.”

“That means I can go back.”

“It means your body is no longer the reason you cannot.”

He looked at her.

Aya’s expression remained neutral.

Jun had learned that neutral was where she hid the most complicated answers.

He picked up the halberd resting beside the cot, tested its weight, then stopped before leaving.

“Kael?”

“What about him?”

“If I fight him again, I don’t make the same mistake.”

“That is not a medical observation.”

“No.”

“Good.”

Jun did not move.

Aya eventually looked up.

“What?”

He had spent his recovery reading battlefield summaries because lying still was intolerable and because the first loss to Kael had embarrassed him enough to become educational. The reports contained more than technique notes now.

Halvek’s road.

Raska’s river retreat.

Tor’s retirement.

Eldran’s ruined frontline future.

Sigrun returning after Kenji nearly killed her.

People on the other side kept paying costs that Aya could erase from Shinsei bodies but not from theirs.

“I used to think recovery meant we were harder to defeat,” Jun said.

“We are.”

“That is not what I mean.”

Aya put the brush down.

Jun continued. “Kael beat me. I came back before I was ready. Then I finished healing anyway. Kenji loses and you rebuild him. Eirik gets hurt and comes back. We keep treating the fact that we can stand again as proof we should keep standing in the same place.”

Aya watched him carefully.

“Do you want me to disagree?”

“No.”

“Good.”

He almost smiled.

Then his face settled again.

“Does getting cleared mean you think I should fight?”

“No.”

The answer came too quickly to misunderstand.

Aya tapped the chart.

“This says your shoulder will not fail because I released you. It says your meridians can sustain your own cultivation. It says the injuries Kael gave you are healed. It does not tell you what your orders mean, whether the invasion is right, or whether a second fight is worth another field full of wounded people.”

Jun’s grip shifted on the halberd.

“You make medicine sound annoyingly limited.”

“It is. That is why physicians become dangerous when governments start asking medicine to answer political questions.”

He looked at her for a long time.

“Thank you.”

Aya’s brush stopped.

“For healing me,” he added.

“You do not owe me obedience because I treated you.”

“I know.”

“You do not owe Shinsei more years because I returned your body.”

Jun went still at the wording.

Redline had made that sentence impossible to hear innocently.

Aya did not soften it.

“Medical clearance is not ownership.”

Jun nodded once.

Then left with his halberd and a body that felt as though the first fight had never happened.

The first fight had happened anyway.

On the Wuyue side, confirmation reached intelligence before noon.

**Jun Kajihara — returned to full conventional combat capacity.**

Kael read the report from a recovery bench while a physician retied the brace on his knee.

“Again?”

Luo nodded.

“I beat him.”

“Yes.”

“He was badly injured.”

“Yes.”

“And now he is fine.”

“Yes.”

Kael looked personally offended by the concept of successful medicine.

Luo folded the report.

“Please do not take this personally.”

“I am absolutely taking it personally.”

“You were healed by Rhen from worse things.”

“That was different.”

“How?”

“He is unfair.”

Luo considered the argument.

“Valid.”

Then he added a new notation beside Jun’s name.

**Defeated once does not equal removed.**

Kael stopped joking.

The sentence was the real problem.

Aya did not need Shinsei to win every battle. She did not even need its Paragons to avoid losing.

She only needed the living ones to reach her with enough body left to repair.`);

await replaceChapter('FINAL_ARC_SEASON107_PROSE_DRAFT_2.md', 430, `Jin received confirmation at dawn.

Kai Moriyama: active.

Eirik Voss: active.

Both observed at effectively full conventional combat function after Aya’s treatment window.

He read the report once, then handed it to Luo without comment.

Luo read it standing beside Sera’s treatment cot. She was awake, although the way she kept her eyes closed suggested she hoped everyone might forget that fact and discuss the war loudly enough for her to participate without being accused of participating.

“We beat them yesterday,” Jin said.

Sera opened one eye.

“Yes.”

“They’re back.”

“Yes.”

Luo folded the report very neatly.

“This is becoming repetitive.”

Jin gave him a flat look.

“Repetition is the problem.”

He pulled the latest map closer.

It showed real victories. Nobody was inventing morale to make themselves feel better.

A beachhead lost by Shinsei.

Two Redline depots destroyed.

A regiment captured rather than slaughtered.

Three evacuation roads held.

Kai wounded twice in separate engagements.

Eirik damaged badly enough that an ordinary High Paragon would have needed a long recovery window.

Jun defeated once.

Kenji defeated once.

Every mark represented planning, blood and people who had done exactly what command asked of them.

Then Jin placed the recovery ledger beside the battle map.

The two documents disagreed about what victory meant.

He tapped Kai’s marker.

“Kael hurt him.”

Another notation.

“Sera hurt him.”

Kai’s current-status seal sat beside both.

**ACTIVE.**

Eirik.

“Aldric hurt him.”

“Maedra too,” Luo said.

**ACTIVE.**

Jun.

“Kael beat him.”

**ACTIVE.**

Kenji.

“Sigrun beat him.”

**ACTIVE.**

Sera pushed herself upright despite the medic immediately appearing at the edge of her vision.

“Don’t,” the medic said.

“I’m sitting.”

“You were lying down better.”

Sera ignored that and looked at Jin.

“So what changes?”

For months, their reports had counted an injured enemy Paragon as temporary strategic relief. A week without Kai could save a corridor. Two weeks without Eirik could let Isgard rebuild a command sector. Those windows still mattered.

But the language had quietly become dishonest whenever anyone let *wounded* sound like *removed*.

Jin crossed out four old assumptions.

“We stop counting bodies we know Aya can return as permanent gains.”

Luo nodded.

“Separate disabled from unrecoverable.”

The medic beside Sera muttered, “Physicians have been telling armies to do that for centuries.”

Jin looked at her.

“Armies have been ignoring physicians for centuries.”

“Also true.”

Sera almost laughed and immediately regretted it when her ribs answered.

Luo pointed at her without looking.

“That.”

“I know.”

He turned back to the map.

“Count the things Aya cannot simply restore with a treatment cycle.”

Jin began a new column.

“Spent lifespan.”

“Redline stock.”

“Shipping capacity.”

“Morale.”

“Legitimacy.”

“Captured information.”

“Trust in command,” Sera added.

Jin’s brush paused.

Then wrote it.

Luo looked at Aya’s name on the intelligence sheet.

“She is not the war.”

“No,” Sera said.

The answer mattered. It would have been easy to reduce the strategic problem to one extraordinary physician and start thinking like people who solved medicine by killing doctors.

Aya had created the healing asymmetry. Shinsei’s institution decided how that asymmetry was used.

Jin drew a circle around the support network instead of the physician.

“So we attack conversion.”

Sera nodded.

“Make every victory cost them something healing cannot refund.”

A depot.

A route.

A lie soldiers no longer believed.

A commander forced to explain why five years of life had been hidden inside a five-minute order.

A government in Isgard that kept functioning despite the argument that it could not.

The tactical fights still mattered. Kael would still have to stop Jun if Jun came through the same gate again. Sera would still have to survive Kai if he returned to the corridor.

But beating the same people repeatedly could not be the strategy.

It was treatment without diagnosis.

Luo said that aloud.

Jin looked at him.

“You’re comparing my war plan to bad medicine.”

“Yes.”

“Helpful.”

“I try.”

Sera studied the southern road on the map, the one that eventually led back toward Wuyue and the sealed chamber beneath the mountain.

Rhen remained in seclusion.

Nobody at the table planned around his return. They had spent months deliberately building the war as though he would not arrive in time, because anything else would have turned hope into negligence.

Time still existed anyway.

Shinsei believed its deeper manpower and recyclable apex fighters would eventually make arithmetic decisive. Wuyue and Isgard believed survival, consent and political fracture could outlast that arithmetic.

Neither side had proven the other wrong.

Jin moved one marker, then another.

“We are winning battles.”

Luo looked at the casualty ledger.

“And losing people.”

“Yes.”

Sera’s voice stayed level.

“Then don’t waste either.”

Outside the tent, the first shift bell of the sixth month sounded.

Nobody in the room celebrated the victories on the map.

They were too busy deciding how to make the next one stay won.`);

await replaceChapter('FINAL_ARC_SEASON108_PROSE_DRAFT.md', 432, `Jin Seoryu won three battles in six days and became angrier after each one.

On the seventh morning, Luo found him comparing two maps that should have made him happy.

The first showed the week’s victories.

A Shinsei regiment captured near the western road.

Two forward depots destroyed.

A coastal relay forced back far enough for Isgard grain carts to move again.

One Redline convoy abandoned when its escort refused to spend another dose just to recover cargo.

Good work. Real work.

The second map was almost identical to the one from six days earlier.

Luo set down two cups of tea.

“You look offended.”

“It refuses to improve.”

“The tea?”

“The map.”

“Mine does that too.”

Jin ignored him and opened the replacement ledger.

Two fresh Shinsei formations had arrived through a secondary port. A repaired Paragon returned to duty. The destroyed depot’s distribution load had been split between three smaller warehouses. Road security had shifted inland instead of disappearing.

The gains remained real.

They simply did not change the slope fast enough.

Luo sat opposite him.

“Are we losing?”

“No.”

Jin did not hesitate.

That was important enough that Luo waited for the rest.

Jin stared at the map until the answer became precise.

“We’re winning too slowly.”

The sentence changed the room more than a casualty report would have.

This was not defeat. It was not even a clean stalemate. Wuyue and Isgard were producing tactical success at a rate lower than Shinsei’s ability to replace, reroute, repair or politically absorb the loss.

A victory that failed to change tomorrow was still a victory.

It was also insufficient.

Sera entered wearing a medical restriction band beneath her coat. Jin noticed because everyone had learned to notice when the most dangerous person in the room was pretending not to be injured.

“You’re supposed to rest.”

“I am about to sit.”

“That is not rest.”

“It is relative.”

Luo pointed at the nearest chair.

“Sit.”

Sera sat.

Jin looked briefly impressed.

“Finally found an authority you obey?”

“Do not make this unpleasant.”

Luo said, “Too late.”

Jin turned the replacement ledger toward her.

“We can keep winning this way for months.”

Sera scanned the casualty trend before answering.

“And?”

“We cannot keep paying this way for months.”

There was the entire sixth month in two sentences.

Wuyue still had reserves at home, but not infinite ones. Isgard’s government was functioning, but epidemic losses had already thinned the ordinary labor beneath its armies. Shinsei could absorb a lost formation, rebuild it farther back, and send a repaired apex fighter into the gap while Wuyue was still writing letters to the families of the people who bought the original victory.

Sera leaned over the table until Luo pushed her shoulder back against the chair.

“Structural targets.”

Jin nodded.

“Already shifting.”

“Show me.”

He began with ports.

Not ships alone. Unloading schedules, warehouse throughput, road access, the clerks whose stamps made replacement formations move without starving civilian districts.

Then Redline.

Not every vial. The secrecy that made mass use politically cheap. Luo’s prisoner interviews and Aya’s amended medical language were spreading the real lifespan cost farther than military censorship could comfortably contain.

Then Isgard.

Every day Solveig’s emergency command functioned without turning into one ruler’s private machine weakened Shinsei’s claim that only imposed centralization could save the north.

Then prisoners.

Sera’s refusal to mistreat them had begun returning stories to Shinsei that were far more destabilizing than crude propaganda: the enemy treated wounds, explained Redline costs and did not require gratitude for either.

Luo tapped that line.

“Truth is slow.”

“So are infections,” Jin said. “Until they aren’t.”

Sera looked at him.

“That was almost poetic.”

“Please never say that again.”

Luo drank his tea.

“Aya?” Sera asked.

“Still appears to be pushing accurate disclosure from inside,” Luo said. “Likely more than we can prove.”

“Then we do not plan around what we cannot prove.”

Jin nodded.

“Correct.”

“You keep agreeing with me.”

“Because you keep being correct.”

“That sounded suspiciously supportive.”

“Don’t get used to it.”

For a moment, the room felt almost like the Quaint command table before the war: dry insults, bad tea, people competent enough to annoy one another safely.

Then Jin opened the casualty ledger again.

The feeling passed.

He drew a line beneath the week’s three victories.

“We need the next month to change something the enemy cannot heal, replace or reroute before breakfast.”

Sera studied the map.

“Then stop asking the map whether we won yesterday.”

Jin looked at her.

“What do I ask?”

“Whether yesterday made today different.”

He was quiet for several breaths.

Then he turned the first map over and began a new one.

Far away, Rhen’s condensation was nearing completion, unknown to everyone in that tent.

Their plan did not depend on it.

The decisions on the new map still belonged to them.`);

await replaceChapter('FINAL_ARC_SEASON108_PROSE_DRAFT.md', 434, `Aldric Veyrhald received three petitions that morning asking him to overrule Solveig.

He denied all three before breakfast.

The petitioners were shocked, which Aldric considered useful information about how badly Isgard had trained powerful families to confuse access with authority.

The first petition came from an inland clan that wanted Brynja’s coastal reserve transferred north to protect its own estates.

Aldric wrote beneath it:

**Coastal command remains Brynja Kharvorn’s operational authority. Current threat assessment does not justify transfer.**

The clan representative read the answer twice.

“Those are our grain stores.”

“And the coast is where the next ships arrive.”

“If the grain burns—”

“If the coast falls, your grain becomes somebody else’s.”

The man left angry.

Aldric let him.

The second petition asked for Astrid’s hidden-road network to be placed under a traditional Veyrhald road office now that the worst emergency had supposedly passed.

Aldric wrote one word.

**No.**

Solveig, standing behind him with three ledgers under one arm, looked over his shoulder.

“Diplomatic.”

“I considered adding a second word.”

“Dangerous escalation.”

The third petition argued that the return of Isgard’s three Paragons made emergency command unnecessary. Aldric stared at that one longest.

The argument was flattering. That made it worse.

If he accepted it, Aldric would be admitting that Isgard’s government existed only when its strongest people were standing upright.

He wrote:

**Emergency command ends when the emergency ends, not when powerful people become available again.**

Solveig read the line.

“You wrote that?”

“Yes.”

“Good.”

“You sound surprised.”

“I am enjoying this.”

Aldric frowned.

The command hall around them was louder than it had been before the invasion and less ceremonial than any ruler would have preferred.

Maedra was arguing with Varok over whether the surviving cavalry should support a grain convoy or reinforce a threatened eastern road. Both had valid reasons. Neither was getting everything wanted.

Sigrun sat with Brynja over coastal reinforcement tables, contributing Paragon threat estimates without pretending that cultivation rank made her a better harbor commander.

Astrid entered through a side door with dirt on one sleeve, placed three new hidden routes on the table, and refused to explain the fourth until the room was cleared of visiting clan aides.

A grain steward waited beside two village delegates whose farms had been stripped first by epidemic labor loss and then by military requisition.

That conversation became Aldric’s next problem.

“We need the southern reserve,” the steward said.

“No,” one delegate answered. “You need what is left of our winter.”

Aldric looked at Solveig.

She already had the numbers.

“Military requirement?”

“Seven days at current issue.”

“Civilian requirement?”

“Eleven if the next Wuyue purchase convoy lands on schedule. Nineteen if it does not.”

The steward said, “Then we requisition.”

Aldric looked at him.

“No.”

“My lord—”

“We purchase what can be purchased, borrow against the Wuyue shipment, and cut military issue before taking seed grain.”

“That reduces readiness.”

“Yes.”

The word landed harder than a heroic speech.

Aldric continued. “A government that saves its army by ensuring nobody can plant after the war has defended a uniform, not a country.”

Solveig wrote the order down.

One village delegate stared at Aldric as if uncertain whether to trust the sentence.

Good. Trust earned too quickly was usually fear in polite clothing.

By midday, six clan representatives had complained that Solveig possessed too much emergency authority.

Three others complained that she was refusing to use enough of it.

Brynja sent a note that consisted of one insult and a revised coastal schedule.

Astrid’s road office denied knowledge of two roads everybody in the room had just watched her draw.

Varok threatened to solve the cavalry dispute by taking half the horses and letting Maedra chase him.

Maedra threatened to catch him.

The government looked terrible.

It also worked.

Orders moved through lawful authority instead of whichever Paragon happened to be nearest. Civilian complaints entered the same room as military requests. Solveig kept theater command because she possessed the freshest theater knowledge. Aldric retained political authority without pretending that meant knowing every bridge better than Astrid or every coast better than Brynja.

None of it was elegant.

That was precisely why it mattered.

Eirik’s criticism of Isgard had never been entirely false. The old clan system duplicated offices, protected local pride and had failed to coordinate fast enough during the natural epidemic. People had died inside those failures.

Shinsei’s conclusion was the lie.

Failure did not automatically grant a foreign state the right to choose Isgard’s replacement.

More importantly, Isgard was changing under pressure without becoming Shinsei.

It was centralizing what needed coordination and leaving other authority distributed. Powerful people were being forced to accept roles rather than ownership. Solveig’s emergency structure could exist beneath law instead of above it.

Eirik understood what that meant. Every functioning day weakened the strongest part of his political argument: that only imposed order could save the north from itself.

Near sunset, Solveig placed the morning’s three denied petitions back on Aldric’s desk.

“Keep them.”

“Why?”

“Because when this is over, somebody will claim emergency command worked because everyone agreed.”

Aldric looked around the hall.

Maedra and Varok were still arguing.

Brynja’s latest message had acquired a second insult.

A village delegate was demanding an audit of military grain use.

Astrid had disappeared with one of the maps.

Aldric smiled despite his ribs.

“Fair.”

The government remained damaged, inefficient and loud.

It had not collapsed.

It was learning how to coordinate without surrendering the right to choose itself.

Isgard still had a government.

Imperfect.

Overworked.

Its own.`);

// ---------------------------------------------------------------------------
// Source-only phase markers that should never read like novel prose.
// ---------------------------------------------------------------------------
await replaceOnce('FINAL_ARC_SEASON100_PROSE_DRAFT_3.md', 'Phase I ended before the invasion began.\n\nWuyue was already warned.', 'The invasion had not begun.\n\nWuyue was already warned.');
await replaceOnce('FINAL_ARC_SEASON108_PROSE_DRAFT_2.md', '“How long?”\n\n---\n\n**End of Phase II.**\n\nChapter 441 begins with Lu’s answer:\n\n**“Six months. And twelve days.”**', '“How long?”');

// ---------------------------------------------------------------------------
// Contextual rhythm polish. These are deliberately exact, local rewrites—not
// blind global thesaurus swaps.
// ---------------------------------------------------------------------------
const edits = [
  ['FINAL_ARC_SEASON095_PROSE_DRAFT.md', 'For the first time in a long time, nobody in the room was waiting for war.', 'Nobody in the room was waiting for war. More than the quiet streets outside, that made peace feel real.'],
  ['FINAL_ARC_SEASON096_PROSE_DRAFT_3.md', 'For the first time since arriving, Yun felt the shape of the problem rise above ordinary crime.', 'The shape of the problem finally rose above ordinary crime.'],
  ['FINAL_ARC_SEASON096_PROSE_DRAFT_3.md', 'For the first time since Yun left, nobody at the Quaint Teahouse called the delay ordinary.', 'By then, nobody at the Quaint Teahouse called the delay ordinary.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'And for the first time since arriving in Shinrin, Yun could feel the investigation approaching an end.', 'Yun could feel the investigation narrowing toward an end.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT_3.md', 'For the first time, Yun felt him stop hiding completely.', 'Yun felt him stop hiding completely.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT_3.md', 'And for the first time since entering Shinrin, there was no locked room behind the next door.', 'Beyond the next door, at last, there was no locked room waiting for her.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT.md', 'And the room where Yun died became, for the first time since Day Zero, a place where something new began.', 'The room where Yun died became, after Day Zero, a place where something new could begin.'],
  ['FINAL_ARC_SEASON107_PROSE_DRAFT.md', 'For the first time, the number felt like his without feeling less like Yun’s history.', 'The number finally felt like his without taking anything from Yun’s history.'],
  ['FINAL_ARC_SEASON109_PROSE_DRAFT_2.md', 'For the first time in six months, she did not mind.', 'After six months of carrying everything herself, she did not mind losing this one argument.'],
  ['FINAL_ARC_SEASON109_PROSE_DRAFT_2.md', 'Her body answered without hesitation for the first time in months.', 'Her body answered without hesitation, an ease she had not felt in months.'],
  ['FINAL_ARC_SEASON109_PROSE_DRAFT_2.md', 'For the first time in six months, thousands of wounded soldiers slept beneath a sky they did not have to watch.', 'That night, thousands of wounded soldiers slept beneath a sky they did not have to watch.'],
  ['FINAL_ARC_SEASON114_PROSE_DRAFT.md', 'For the first time in six months, soldiers on both sides slept because nobody had ordered them to stay awake.', 'That night, soldiers on both sides slept because nobody had ordered them to stay awake.'],

  ['FINAL_ARC_SEASON095_PROSE_DRAFT_3.md', 'There it was.\n\nNot mind control.', 'The distinction Yun had been waiting for surfaced at last.\n\nNot mind control.'],
  ['FINAL_ARC_SEASON096_PROSE_DRAFT_2.md', 'There it was.\n\nNot a revelation delivered by a secret document.', 'The answer sat in plain sight.\n\nNot a revelation delivered by a secret document.'],
  ['FINAL_ARC_SEASON096_PROSE_DRAFT_3.md', '“Something is wrong.”\n\nThere it was.\n\nNot panic.', '“Something is wrong.”\n\nLuo had finally said it aloud.\n\nNot panic.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT_2.md', 'There it was again.\n\nNot exact.', 'The same imprecision again.\n\nNot exact.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT_3.md', 'Hana looked away first.\n\nThere it was.\n\nThe reason she had loved him.', 'Hana looked away first.\n\nThe old answer was still there: the reason she had loved him.'],
  ['FINAL_ARC_SEASON100_PROSE_DRAFT_3.md', '“Not without cost.”\n\nThere it was.\n\nNobody wanted the conversation.', '“Not without cost.”\n\nThe cost had finally been named. Nobody wanted the conversation.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT.md', '“What do you need from us?”\n\nThere it was.\n\nThe question that mattered.', '“What do you need from us?”\n\nSera finally had the question she needed.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT.md', '“Nothing makes me clean.”\n\nThere it was.\n\nThe thing he had never been willing to say when they were together.', '“Nothing makes me clean.”\n\nHe had finally named the thing he could never say while they were together.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT_2.md', 'Haru paused.\n\nThere it was.\n\nThe blank space.', 'Haru paused. The blank space in the schedule had become impossible to ignore.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT_3.md', 'There it was.\n\nHistory refusing to simplify itself for the convenience of battle.', 'History refused to simplify itself for the convenience of battle.'],
  ['FINAL_ARC_SEASON102_PROSE_DRAFT.md', 'There it was again.\n\nThe same thing Kenji had found in Raska.', 'Nao recognized the pattern Kenji had found in Raska.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT.md', 'There it was again.\n\nDistance.', 'Distance again.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT.md', 'Sera stopped in the doorway.\n\nThere it was.\n\nNot absence.', 'Sera stopped in the doorway. What she found was not absence.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT_3.md', 'There it was.\n\nNot five years.', 'The number on the page was the difference.\n\nNot five years.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT_3.md', 'Aya returned to the needles.\n\nThere it was.\n\nThe reason she had stayed.', 'Aya returned to the needles. This was why she had stayed.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT_3.md', '“The real depth of the private organization.”\n\nThere it was.\n\nThe intelligence sacrifice from accelerating the invasion.', '“The real depth of the private organization.”\n\nAccelerating the invasion had bought time by spending intelligence.'],
  ['FINAL_ARC_SEASON104_PROSE_DRAFT.md', '“That information is useful to us too.”\n\nThere it was.\n\nNot mercy.', '“That information is useful to us too.”\n\nQin’s choice was strategy, not mercy.'],
  ['FINAL_ARC_SEASON105_PROSE_DRAFT.md', '“Did you know?”\n\nThere it was.\n\nAya could have explained.', '“Did you know?”\n\nThe question had finally arrived. Aya could have explained.'],
  ['FINAL_ARC_SEASON106_PROSE_DRAFT.md', '“Remains.”\n\nThere it was.\n\nAya closed her eyes briefly.', '“Remains.”\n\nAya heard the evasion packed into one word and closed her eyes briefly.'],
  ['FINAL_ARC_SEASON106_PROSE_DRAFT.md', '“People are dying there.”\n\nThere it was again.\n\nPeople die when the physician leaves.', '“People are dying there.”\n\nThe trap returned in a different form: people die when the physician leaves.'],
  ['FINAL_ARC_SEASON106_PROSE_DRAFT_2.md', 'Kenji looked at her.\n\nThere it was.\n\nThe thing the war had started doing to him.', 'Kenji looked at her, caught again by the question the war had taught him to postpone.'],
  ['FINAL_ARC_SEASON110_PROSE_DRAFT_2.md', '“However, issuance doctrine remains unchanged for now.”\n\nThere it was.\n\nAya\'s jaw tightened.', '“However, issuance doctrine remains unchanged for now.”\n\nAya saw the unchanged doctrine beneath the amended language. Her jaw tightened.'],
  ['FINAL_ARC_SEASON110_PROSE_DRAFT_3.md', 'Shunto smiled.\n\nThere it was again.\n\nSmall overlaps.', 'Shunto smiled. The pattern surfaced again in small overlaps.'],
  ['FINAL_ARC_SEASON111_PROSE_DRAFT.md', 'Kael smiled.\n\nThere it was.\n\nThe opening.', 'Kael smiled. He had the opening.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_2.md', 'Sera did not answer immediately.\n\nThere it was.\n\nNo boast.', 'Sera did not answer immediately. Rhen’s certainty sat between them without boast.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_2.md', 'She smiled.\n\nThere it was.\n\nNot rescue before the fall.', 'She smiled. That was the difference she had been waiting for.\n\nNot rescue before the fall.'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_2.md', 'Tsubasa\'s eyes narrowed.\n\nThere it was.\n\nIf he refused hostile commitment entirely, Orchid Dominion gave Sera nothing.', 'Tsubasa\'s eyes narrowed. He had found the choice inside her rule: if he refused hostile commitment entirely, Orchid Dominion gave Sera nothing.'],

  ['FINAL_ARC_SEASON095_PROSE_DRAFT.md', 'But peace had become real enough to be ordinary again.\n\nThat mattered.', 'Peace had become real enough to be ordinary again, and Sera valued the ordinariness more than she expected.'],
  ['FINAL_ARC_SEASON096_PROSE_DRAFT_2.md', 'The town beyond the gate was not rich.\n\nThat mattered.\n\nProsperity could be staged in capitals.', 'The town beyond the gate was not rich, which mattered because prosperity could be staged in capitals.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'Exact arts unknown.\n\nThat mattered.', 'Exact arts unknown. The uncertainty belonged in the report as firmly as the confirmed ranks.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT.md', 'Not everyone here was stupid enough to punish a patient through medicine.\n\nThat mattered.\n\nIt also made Shinsei harder to simplify.', 'Not everyone here was stupid enough to punish a patient through medicine. That fact also made Shinsei harder to simplify.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT_2.md', 'The first cache was older than Yun’s investigation.\n\nThat mattered.', 'The first cache predated Yun’s investigation, changing what the entire route network meant.'],
  ['FINAL_ARC_SEASON100_PROSE_DRAFT_3.md', 'The smile vanished quickly.\n\nBut it had existed.\n\nThat mattered.', 'The smile vanished quickly, but it had existed, and Sera kept that small fact with her.'],
  ['FINAL_ARC_SEASON100_PROSE_DRAFT_3.md', 'Good.\n\nThat mattered.\n\nXie had no personal army hidden behind the title.', 'Good. Xie had no personal army hidden behind the title.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT.md', 'The packet was older than the final report.\n\nThat mattered.', 'The packet’s age mattered because it captured what Yun knew before the final flight.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT_2.md', 'Mo Qingzhao\'s marker was the largest single public manpower block on the board.\n\nThat mattered.', 'Mo Qingzhao\'s marker was the largest single public manpower block on the board, a fact Jin kept central to every deployment choice.'],
  ['FINAL_ARC_SEASON102_PROSE_DRAFT_2.md', 'Maedra Dravaryn had already been wounded twice before Jun Kajihara found her.\n\nThat mattered.\n\nNobody crossed a month of invasion as a fresh diagram.', 'Maedra Dravaryn had already been wounded twice before Jun Kajihara found her. Nobody crossed a month of invasion as a fresh diagram.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT.md', 'Sera nodded.\n\nThat mattered.\n\nSending physicians first did not mean sending them undefended.', 'Sera nodded. Sending physicians first did not mean sending them undefended.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT_3.md', 'He also did not stop the meal.\n\nThat mattered.\n\nBy evening, seventy-three prisoners had become one hundred twelve.', 'He also did not stop the meal. By evening, seventy-three prisoners had become one hundred twelve.'],
  ['FINAL_ARC_SEASON103_PROSE_DRAFT_3.md', '“Yes.”\n\nThat mattered.\n\nTheir pre-war model had assumed Kael', '“Yes.”\n\nTheir pre-war model had assumed Kael'],
  ['FINAL_ARC_SEASON104_PROSE_DRAFT.md', 'Barely.\n\nThat mattered.\n\nHaru stored spear lines anyway.', 'Barely. Haru stored spear lines anyway.'],
  ['FINAL_ARC_SEASON104_PROSE_DRAFT_3.md', 'Still herself.\n\nThat mattered.\n\nShe used Haru’s new pace as structure rather than trying to imitate it.', 'Still herself. She used Haru’s new pace as structure rather than trying to imitate it.'],
  ['FINAL_ARC_SEASON105_PROSE_DRAFT.md', 'He did not say it lightly.\n\nThat mattered.\n\nJun had watched delayed action kill people as a child.', 'He did not say it lightly; Jun had watched delayed action kill people as a child.'],
  ['FINAL_ARC_SEASON107_PROSE_DRAFT.md', 'They were not fighting for a knockout.\n\nThat mattered.\n\nNao held a broad retreat-control field', 'They were not fighting for a knockout. Nao held a broad retreat-control field'],
  ['FINAL_ARC_SEASON107_PROSE_DRAFT.md', 'Her team opened the medical storage before ignition to separate legitimate medicine from Redline stock.\n\nThat mattered.\n\nAxtaya had grown from medicine.', 'Her team opened the medical storage before ignition to separate legitimate medicine from Redline stock. The separation mattered because Axtaya had grown from medicine.'],
  ['FINAL_ARC_SEASON107_PROSE_DRAFT_2.md', 'But the line survived because Mo had not panicked and spent eighteen thousand people saving one famous man five minutes too early.\n\nThat mattered too.', 'The line survived because Mo had not panicked and spent eighteen thousand people saving one famous man five minutes too early.'],
  ['FINAL_ARC_SEASON109_PROSE_DRAFT_2.md', 'Then went immediately to the next bed.\n\nThat mattered more than staring.', 'Then went immediately to the next bed. Work mattered more than staring.'],
  ['FINAL_ARC_SEASON110_PROSE_DRAFT_2.md', 'Rhen did not ask to see it.\n\nThat mattered.', 'Rhen did not ask to see it. He respected the boundary without requiring it to be explained.'],
  ['FINAL_ARC_SEASON110_PROSE_DRAFT_3.md', 'The meeting happened without a name.\n\nThat mattered.\n\nHana refused to call it a faction.', 'The meeting happened without a name. Hana refused to call it a faction.'],
  ['FINAL_ARC_SEASON111_PROSE_DRAFT.md', 'But it was reacting to its former No.2.\n\nThat mattered.', 'But it was reacting to its former No.2, and that distinction changed how fast orders moved.'],
  ['FINAL_ARC_SEASON111_PROSE_DRAFT.md', 'The High Paragon was angry.\n\nThat mattered medically.\n\nNot emotionally.', 'The High Paragon was angry. Medically, that mattered. Emotionally, it did not.'],

  ['FINAL_ARC_SEASON095_PROSE_DRAFT_3.md', 'He had been arrested for trafficking mislabeled dangerous medicine and cooperating with attempted murder.\n\nThat was enough.', 'He had been arrested for trafficking mislabeled dangerous medicine and cooperating with attempted murder. The charge alone kept him in custody.'],
  ['FINAL_ARC_SEASON097_PROSE_DRAFT_2.md', 'Only distance.\n\nFor now, that was enough.', 'Only distance. For now, distance was enough.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', '“Of course.”\n\nThat was enough.\n\nShe did not ask for secret techniques.', '“Of course.”\n\nShe had what she could defend and did not ask for secret techniques.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT_3.md', 'Yun stopped.\n\nThat was enough.\n\nEnough for Sera to act.', 'Yun stopped. She had enough for Sera to act.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT.md', 'Then the next.\n\nThat was enough for tonight.', 'Then the next. She had enough data for tonight.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT_2.md', 'So far, he had made several.\n\nThat was enough to build with.', 'So far, he had made several. Enough to build with.'],
  ['FINAL_ARC_SEASON100_PROSE_DRAFT_2.md', '“Foreign invasion preparation against Isgard.”\n\nThat was enough.\n\nHallen’s face hardened.', '“Foreign invasion preparation against Isgard.”\n\nHallen’s face hardened. He had heard enough.'],
  ['FINAL_ARC_SEASON104_PROSE_DRAFT_3.md', 'The answer stayed between them.\n\nThat was enough.', 'The answer stayed between them. Neither needed to press it further.'],
  ['FINAL_ARC_SEASON109_PROSE_DRAFT.md', 'But eventually.\n\nAnd that was enough for one morning.', 'But eventually. For one morning, that was all they needed.'],
  ['FINAL_ARC_SEASON111_PROSE_DRAFT.md', 'The guard looked at him.\n\nThat was enough.\n\nShunto leaned back against the wall.', 'The guard looked at him and understood. Shunto leaned back against the wall.'],
  ['FINAL_ARC_SEASON111_PROSE_DRAFT.md', 'Only touched.\n\nThat was enough.\n\nA cold obstruction snapped', 'Only touched. Contact was sufficient. A cold obstruction snapped'],
  ['FINAL_ARC_SEASON112_PROSE_DRAFT_3.md', 'Her circulation failed to answer cleanly.\n\nThat was enough.\n\nThe medical observers saw it.', 'Her circulation failed to answer cleanly. The medical observers saw it immediately.'],
  ['FINAL_ARC_SEASON113_PROSE_DRAFT_2.md', 'Only one.\n\nThat was enough for Tsubasa.', 'Only one. Tsubasa needed no second warning.'],
  ['FINAL_ARC_SEASON114_PROSE_DRAFT.md', 'He would answer.\n\nThat was enough.\n\nNear sunset, Tsubasa woke fully.', 'He would answer. Near sunset, Tsubasa woke fully.'],
  ['FINAL_ARC_SEASON114_PROSE_DRAFT_2.md', 'Nobody forgot her.\n\nThat was enough.', 'Nobody forgot her. They did not need a second Pale Venom to prove it.'],
  ['FINAL_ARC_SEASON114_PROSE_DRAFT_3.md', 'The aliases survived another day.\n\nThat was enough.\n\nKael spent more and more time', 'The aliases survived another day. Kael spent more and more time'],

  ['FINAL_ARC_SEASON095_PROSE_DRAFT.md', 'Not because the war had been forgotten.\n\nIt had not.', 'The war had not been forgotten.'],
  ['FINAL_ARC_SEASON095_PROSE_DRAFT.md', 'Not because anyone was shocked.\n\nBecause Huo had just entered through the side door carrying an entire training post over one shoulder.', 'Shock had nothing to do with it. Huo had just entered through the side door carrying an entire training post over one shoulder.'],
  ['FINAL_ARC_SEASON095_PROSE_DRAFT.md', 'Not because she was weak.\n\nNot because he believed she could not protect herself.\n\nShe had already proved the opposite.', 'Weakness had nothing to do with the offer, and neither did any doubt that she could protect herself. She had already proved the opposite.'],
  ['FINAL_ARC_SEASON095_PROSE_DRAFT.md', 'Not because the Garden switched off every six months.\n\nBecause he refused to treat old consent like permanent ownership.', 'The Garden did not switch off every six months; Rhen simply refused to treat old consent like permanent ownership.'],
  ['FINAL_ARC_SEASON095_PROSE_DRAFT_2.md', 'Not because the source was Wuyue.\n\nBecause the route touched home.', 'The source being Wuyue was less important than the route touching home.'],
  ['FINAL_ARC_SEASON095_PROSE_DRAFT_3.md', 'Not because he refused to speak.\n\nBecause he was embarrassed.', 'He spoke readily enough; embarrassment was what made him difficult.'],
  ['FINAL_ARC_SEASON095_PROSE_DRAFT_3.md', 'Not because the name was wrong.\n\nBecause it was right.', 'The name was right. That was why he froze.'],
  ['FINAL_ARC_SEASON095_PROSE_DRAFT_3.md', 'Not because every unknown country hid an army.\n\nBecause somewhere beyond Wuyue\'s habits, somebody had built a medical system', 'An unknown country did not automatically imply an army. What mattered was that somewhere beyond Wuyue\'s habits, somebody had built a medical system'],
  ['FINAL_ARC_SEASON096_PROSE_DRAFT_3.md', 'Not because it was funny.\n\nBecause she had seen what the descendant of this medicine looked like.', 'Nothing about it was funny; she had seen what the descendant of this medicine looked like.'],
  ['FINAL_ARC_SEASON096_PROSE_DRAFT_3.md', 'Not because he felt better.\n\nBecause his mind finally had something to work on.', 'Relief had nothing to do with it. His mind finally had something to work on.'],
  ['FINAL_ARC_SEASON097_PROSE_DRAFT.md', 'Not because the problem was solved.\n\nBecause he was awake enough to control it again.', 'The problem remained; he was simply awake enough to control it again.'],
  ['FINAL_ARC_SEASON097_PROSE_DRAFT_2.md', 'Not because she expected Shunto specifically.\n\nBecause survival favored people who prepared rooms before they needed them.', 'She had not expected Shunto specifically. She had prepared the room because survival favored people who prepared before they needed to.'],
  ['FINAL_ARC_SEASON097_PROSE_DRAFT_2.md', 'Not because Lu was stronger.\n\nBecause somehow everyone eventually obeyed the man holding the documents.', 'Lu was not stronger; somehow everyone eventually obeyed the man holding the documents.'],
  ['FINAL_ARC_SEASON097_PROSE_DRAFT_3.md', 'Not because he was adapting.\n\nBecause he was good.', 'His adaptation was not what angered her. His competence was.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'Not because the nephew had betrayed her.\n\nBecause he might be ordered to inspect his own building and become guilty without ever choosing to be.', 'The nephew had not betrayed her. He might simply be ordered to inspect his own building and become guilty without ever choosing it.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'Not because of danger.\n\nBecause for one second she could see Luo leaning against their clinic table', 'Danger had nothing to do with the pause. For one second she could see Luo leaning against their clinic table'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'Not because anybody else could read it completely.\n\nBecause Shunto knew she was reading.', 'Its danger did not come from anyone else reading it completely. Shunto knew she was reading.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'Not because she had solved everything.\n\nBecause soon there would be nowhere left to stand while solving it.', 'She had not solved everything. Soon there would simply be nowhere left to stand while solving it.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'Not because rice was dramatic.\n\nBecause soldiers ate it.', 'Rice was not dramatic. Soldiers still had to eat it.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'Not because she wanted a bigger threat.\n\nBecause clinic consumption alone implied more wounded trainees than the payroll category could produce.', 'She did not want a bigger threat; clinic consumption simply implied more wounded trainees than the payroll category could produce.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'Not because his face changed.\n\nBecause she knew what his stillness looked like when it was effortless.', 'His face gave nothing away, but Sera knew what his stillness looked like when it was effortless.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT_2.md', 'Not because Shunto was kind.\n\nBecause killing a transport-seal broker would waste information.', 'Kindness had nothing to do with it; killing a transport-seal broker would waste information.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT.md', 'Not because she did not want to cry.\n\nBecause her body had not decided what to do yet.', 'Her body had not yet decided what to do with the urge to cry.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT.md', 'Not because suffering had become interesting.\n\nBecause observation returned choices.', 'Suffering had not become interesting. Observation mattered because it returned choices.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT_3.md', 'Not because he was bad at lying.\n\nBecause he only became excessively precise when hiding something important.', 'Yurushi was good at lying. Excessive precision was simply his tell when the truth mattered.'],
  ['FINAL_ARC_SEASON099_PROSE_DRAFT_3.md', 'Not because being carried was shameful.\n\nBecause Yurushi needed both hands and full attention for routes, and Yun needed enough control over her body to choose what happened next.', 'Being carried was not shameful; Yurushi needed both hands and full attention for the routes, while Yun needed enough control over her body to choose what happened next.'],
  ['FINAL_ARC_SEASON100_PROSE_DRAFT_2.md', 'Not because No.10 meant she suddenly deserved more medicine.\n\nBecause Wuyue and Isgard had a defensive pact', 'The No.10 title did not make her more deserving of medicine. It activated a defensive pact between Wuyue and Isgard'],
  ['FINAL_ARC_SEASON100_PROSE_DRAFT_2.md', 'Not because medicine required it.\n\nBecause sometimes physicians ran out of medicine before they ran out of hands.', 'Medicine did not require the touch. Sometimes physicians ran out of medicine before they ran out of hands.'],
  ['FINAL_ARC_SEASON100_PROSE_DRAFT_2.md', 'Not because grief disappeared.\n\nBecause Yun had spent her final strength giving him work that mattered.', 'Grief remained. So did the work Yun had spent her final strength giving him.'],
  ['FINAL_ARC_SEASON100_PROSE_DRAFT_3.md', 'She stood without him.\n\nNot because he had abandoned her.\n\nBecause this time, necessity had taken him out of reach for reasons nobody had chosen.', 'She stood without him. He had not abandoned her; necessity had taken him out of reach for reasons nobody had chosen.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT.md', 'Not because the geography had changed.\n\nBecause responsibility had.', 'The geography had not changed. Responsibility had.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT.md', 'Not because she had forgotten where he was.\n\nBecause now she needed the answer written without hope inside it.', 'She knew exactly where he was. What she needed now was an answer written without hope inside it.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT.md', 'Then a third time.\n\nNot because he needed to.\n\nBecause she had told him to.', 'Then a third time, because she had told him to.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT_2.md', 'Haru looked at Tsubasa.\n\nNot because he lacked the answer.\n\nBecause it was Tsubasa\'s decision to own.', 'Haru looked at Tsubasa. He had the answer, but the decision belonged to Tsubasa.'],
  ['FINAL_ARC_SEASON101_PROSE_DRAFT_2.md', 'Not because he was stupid.\n\nBecause Shunto had ended rebellions without massacres.', 'It was not stupidity. Shunto had ended rebellions without massacres.'],

  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'She did not write ten names.\n\nShe did not have ten names with confidence.\n\nShe wrote what she could defend.', 'She refused to write ten names merely to make the list look complete. Instead she wrote only what she could defend.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT.md', 'She did not know their Domains.\n\nShe did not know how the ten fought together.\n\nShe did not know which were stationed near the capital and which were abroad.\n\nShe did not know whether every one would participate in an invasion.\n\nThose unknowns had to remain unknown.', 'Their Domains remained unknown, as did how the ten fought together, which of them were stationed near the capital, and whether every seat would join an invasion. Yun left those gaps visible instead of filling them with confidence she had not earned.'],
  ['FINAL_ARC_SEASON098_PROSE_DRAFT_2.md', 'He did not catch it.\n\nHe did not dodge dramatically.\n\nHe stepped half a pace aside.', 'He neither caught it nor wasted motion on a dramatic dodge. He stepped half a pace aside.'],
];

for (const [file, oldText, newText] of edits) await replaceOnce(file, oldText, newText);

console.log(`Polished ${changed.size} prose files.`);
