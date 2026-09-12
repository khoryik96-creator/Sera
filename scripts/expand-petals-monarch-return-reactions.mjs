import fs from 'node:fs';

const p2 = 'docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_2.md';
const p3 = 'docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_3.md';
const testFile = 'test/petalsMonarchReturn.test.ts';

function replaceOnce(text, from, to, label) {
  const count = text.split(from).length - 1;
  if (count !== 1) throw new Error(`${label}: expected exactly one anchor, found ${count}`);
  return text.replace(from, to);
}

let part2 = fs.readFileSync(p2, 'utf8');
let part3 = fs.readFileSync(p3, 'utf8');
let test = fs.readFileSync(testFile, 'utf8');

part2 = replaceOnce(
  part2,
  `One title left his mouth so quietly that the wounded man beside him almost missed it.\n\nPetals Monarch.\n\nAn Isgard veteran heard him.`,
  `One title left his mouth so quietly that the wounded man beside him almost missed it.\n\nPetals Monarch.\n\nThe wounded man on the stretcher opened his eyes.\n\n“Say that again.”\n\nThe bearer looked down at him.\n\n“Petals Monarch.”\n\n“Here?”\n\nThe bearer lifted the spear just enough for him to see the frost-white petal resting against the black shaft.\n\n“Where else do you think that came from?”\n\nA second Wuyue soldier turned so quickly his canteen spilled into the mud.\n\n“You're sure?”\n\nAn older Silver Horizon swordswoman beside him did not even look over.\n\n“I'm sure.”\n\n“You've seen them?”\n\n“I was here when the last war ended.”\n\nThat silenced everyone within earshot.\n\nThe swordswoman finally looked toward the ridge.\n\n“On your feet.”\n\nOne of the younger soldiers blinked.\n\n“For inspection?”\n\n“No.”\n\nHer hand tightened around the hilt at her hip.\n\n“For yourself. You don't sit through this.”\n\nAn Isgard veteran heard them.`,
  'chapter 445 Wuyue reaction',
);

part2 = replaceOnce(
  part2,
  `Every veteran who had survived the final campaign knew what happened when that title entered a battlefield.\n\nPetals Monarch.`,
  `Every veteran who had survived the final campaign knew what happened when that title entered a battlefield.\n\nA young Isgard lancer stared at the petal on the Wuyue spear.\n\n“That's him?”\n\nThe veteran beside him kept looking at the ridge.\n\n“That's the title.”\n\n“The man who ended the war?”\n\n“The man who ended the battle that ended the war.”\n\nThe lancer swallowed.\n\n“Did you see him?”\n\n“I saw the petals.”\n\nThe veteran's mouth tightened at an old memory.\n\n“That was enough.”\n\nThe lancer looked from the petal to the allied hospital tents.\n\n“And now?”\n\nThe veteran finally smiled.\n\n“Now they're falling on our side.”\n\nPetals Monarch.`,
  'chapter 445 Isgard reaction',
);

part2 = replaceOnce(
  part2,
  `The sound traveled through the camp like a pulse.\n\nIsgard heard it next.`,
  `The sound traveled through the camp like a pulse.\n\nA Wuyue lieutenant pushed out of a command tent with one boot unlaced.\n\n“What happened?”\n\nA wounded captain pointed with his good arm.\n\n“Look up.”\n\nThe lieutenant saw the petals.\n\nHis entire face changed.\n\n“No.”\n\nThe captain laughed.\n\n“Yes.”\n\n“That's really—”\n\n“Don't call him Rhen unless you're planning to invite him for tea.”\n\nThe lieutenant looked toward the ridge.\n\n“Petals Monarch.”\n\nSomeone twenty yards away heard him and shouted it louder.\n\nThe answer came from another lane.\n\nThen another.\n\nIsgard heard it next.`,
  'chapter 446 Wuyue dialogue',
);

part2 = replaceOnce(
  part2,
  `Some of those soldiers had fought Wuyue in the previous war. Some had carried wounded away from the battlefield where the Petals Monarch ended the last war. Some were too young to have been there and knew the story only because older fighters never agreed on anything except the ending.\n\nThey did not need an explanation now.`,
  `Some of those soldiers had fought Wuyue in the previous war. Some had carried wounded away from the battlefield where the Petals Monarch ended the last war. Some were too young to have been there and knew the story only because older fighters never agreed on anything except the ending.\n\nA young Isgard spearman grabbed the sleeve of the veteran beside him.\n\n“That's him?”\n\n“You were twelve.”\n\n“I know the story.”\n\n“No.”\n\nThe veteran watched the frost-white petals cross the camp.\n\n“You know the ending.”\n\n“The one who broke the Paragons?”\n\n“The one who made everybody stop pretending there was another round left.”\n\nThe younger man looked almost offended by the scale of the answer.\n\n“And he's with us now?”\n\nThe veteran held out one gauntleted hand. A petal settled into it without melting.\n\n“Look where the winter is falling.”\n\nA second Isgard veteran, older and missing two fingers, barked a laugh from the next formation.\n\n“Last time I heard that title, I thought we were finished.”\n\nThe younger spearman looked at him.\n\n“And now?”\n\nThe old man raised his spear.\n\n“Now I think Shinsei should be worried.”\n\nThat was when the first Isgard weapon struck frozen earth.\n\nThey did not need an explanation now.`,
  'chapter 446 Isgard dialogue',
);

part2 = replaceOnce(
  part2,
  `Shinsei heard it too.\n\nForward observation posts had spent six months learning the sounds of the Wuyue–Isgard rear: evacuation horns, rotation bells, casualty wagons, exhausted formations changing watch.\n\nThis was none of them.\n\nAt first, Shinsei officers assumed another army had arrived.\n\nThen the first scout report came back.\n\nFrost-white petals.\n\nPale violet beneath the ice.\n\nNo banner.\n\nNo formation source.\n\nA veteran intelligence officer read the report twice and stopped asking how many reinforcements had landed.\n\nHe knew the title.\n\nPetals Monarch.\n\nFor six months Shinsei had measured the people opposing it. Sera. Tae. Huo. Qin. Kael. Isgard's surviving Paragons. Every one of them had a file, a cultivation estimate, a known limit and a plan built around that limit.\n\nThe Petals Monarch had a file too.\n\nThe useful part was very short.\n\nNo accepted rank.\n\nNo verified upper limit.\n\nLast decisive appearance in Isgard: two hostile Paragons defeated after Orchid Dominion collapsed. War ended.\n\nAcross the northern line, Shinsei signal flags changed.\n\nNot retreat.\n\nRecalculation.\n\nBehind them, the allied roar grew louder.`,
  `Shinsei heard it too.\n\nForward observation posts had spent six months learning the sounds of the Wuyue–Isgard rear: evacuation horns, rotation bells, casualty wagons, exhausted formations changing watch.\n\nThis was none of them.\n\nAt one Shinsei ridge post, a junior lieutenant lowered his spyglass.\n\n“They're cheering.”\n\nThe veteran intelligence officer beside him did not move.\n\n“No.”\n\nThe lieutenant frowned.\n\n“What do you mean, no?”\n\n“Listen to the words.”\n\nThe sound reached them in pieces across the cold distance.\n\nPetals.\n\nMonarch.\n\nThen together.\n\n**PETALS MONARCH.**\n\nThe lieutenant looked back at the officer.\n\n“That's a person?”\n\nThe veteran finally took the spyglass.\n\n“That's a problem.”\n\nA scout came up the ridge at a run.\n\nHe carried a folded black cloth between both hands.\n\nInside it lay one frost-white petal with pale violet light beneath the ice.\n\n“It crossed the forward marker without melting,” the scout said.\n\nThe lieutenant stared at it.\n\n“Technique?”\n\n“No visible source.”\n\n“Formation?”\n\n“No anchors.”\n\n“Reinforcement army?”\n\nThe veteran intelligence officer opened an older file.\n\n“No army.”\n\nHe turned the page toward them.\n\nThe useful part was very short.\n\nNo accepted rank.\n\nNo verified upper limit.\n\nLast decisive appearance in Isgard: two hostile Paragons defeated after Orchid Dominion collapsed. War ended.\n\nThe junior lieutenant read the lines twice.\n\n“One man ended a continental war?”\n\nThe veteran's eyes stayed on the allied rear.\n\n“One man ended the part everyone else could not.”\n\nThe scout swallowed.\n\n“Can he reach this ridge?”\n\n“No verified range.”\n\n“Can he hit us from there?”\n\n“No verified upper limit.”\n\nThe lieutenant's patience broke.\n\n“Then what exactly do we know?”\n\nThe roar crossed the valley again.\n\n**PETALS MONARCH.**\n\nThe veteran closed the file.\n\n“He's here.”\n\nAcross the northern line, Shinsei signal flags changed.\n\nNot retreat.\n\nRecalculation.\n\nOne planned advance horn was quietly cancelled.\n\nThen a second.\n\nNo order said fear.\n\nMilitary language had cleaner words for the same instinct.\n\nBehind them, the allied roar grew louder.`,
  'chapter 446 Shinsei POV',
);

part2 = replaceOnce(
  part2,
  `Wuyue shouted first. Isgard answered almost immediately.\n\nThe response from Isgard was not simple worship. Too many of its veterans remembered standing on the other side five years earlier. They remembered the humiliation, the fear and the arguments that followed.`,
  `Wuyue shouted first. Isgard answered almost immediately.\n\nA Wuyue sergeant slammed the flat of his sword against his shield.\n\n“Six months!” he shouted.\n\nSomeone farther down the line answered, “We know!”\n\n“We held six damn months!”\n\nA laugh broke through the formation.\n\nThe sergeant pointed north with his blade.\n\n“Then stand up straight. He didn't cross the Black Current to find us looking dead already.”\n\nThe shield line came up as one.\n\nAcross the road, an Isgard veteran stared into the petal-filled sky.\n\n“The last time I saw this,” he said, “I was praying he would stop.”\n\nA younger soldier beside him grinned despite a split lip.\n\n“And now?”\n\nThe veteran drew his sword.\n\n“Now I'm praying Shinsei gives him a reason not to.”\n\nTheir captain heard that and rounded on both of them.\n\n“If the physicians haven't cleared you, you stay down.”\n\nThe younger soldier blinked.\n\n“Captain—”\n\n“The Petals Monarch crossed a sea to heal you. If you rip yourself open trying to look heroic, I will personally kill you after he fixes you again.”\n\nThat got a roar of laughter from three formations.\n\nThen the title rose over it.\n\n**PETALS MONARCH.**\n\nThe response from Isgard was not simple worship. Too many of its veterans remembered standing on the other side in the previous war. They remembered the humiliation, the fear and the arguments that followed.`,
  'chapter 447 allied dialogue and timeline',
);

part2 = replaceOnce(
  part2,
  `No one sensible believed the Petals Monarch made them immortal.\n\nThey knew better than that now.\n\nBut morale was also a battlefield resource, and his arrival had changed it before the first repaired meridian was counted.\n\nPetals covered the sky like a second weather system.`,
  `No one sensible believed the Petals Monarch made them immortal.\n\nThey knew better than that now.\n\nBut morale was also a battlefield resource, and his arrival had changed it before the first repaired meridian was counted.\n\nOn the Shinsei side of the front, an observation captain watched the translucent hemisphere continue expanding.\n\n“Range?”\n\nA signal officer checked the marker grid.\n\n“Still expanding.”\n\n“Estimate.”\n\n“Twenty-six miles.”\n\nThe frost-light moved farther.\n\nThe officer went pale.\n\n“Thirty.”\n\nThe captain lowered his spyglass.\n\n“What is it doing?”\n\nA medical scout beside him had been watching the hospital lanes.\n\n“Treating them.”\n\n“All of them?”\n\nThe scout did not answer quickly enough.\n\nThe captain turned.\n\n“All of them?”\n\n“As far as we can see.”\n\nSilence took the post.\n\nYesterday, Shinsei's arithmetic had been simple: hurt enough people often enough and Wuyue–Isgard eventually ran out of bodies that could stand.\n\nThe horizon had just answered that arithmetic with thirty miles of winter.\n\nThe captain pulled a priority strip from the signal case.\n\n“Central command. Black priority.”\n\nThe signal officer raised his brush.\n\n“What wording?”\n\nThe captain watched frost-white petals turn the allied sky pale.\n\n“Exact wording.”\n\nHe waited until the officer was ready.\n\n“THE PETALS MONARCH IS ACTIVE.”\n\nThe brush stopped for half a heartbeat.\n\nThen moved.\n\nPetals covered the sky like a second weather system.`,
  'chapter 447 Shinsei Sanctuary POV',
);

part3 = replaceOnce(
  part3,
  `One old Isgard shieldman answered a younger lancer's question by telling him the stories had made the Petals Monarch smaller, not larger.\n\nThat answer traveled almost as quickly as the title itself.`,
  `One old Isgard shieldman sat outside a hospital tent while a younger lancer worked up the courage to ask him what everyone else had been asking for three days.\n\n“Were you really there?”\n\nThe shieldman kept oiling the rim of his battered shield.\n\n“I was.”\n\n“Did he actually punch through a Paragon?”\n\n“Yes.”\n\n“Just like that?”\n\nThe old man looked up.\n\n“No.”\n\nThe lancer leaned closer.\n\nThe shieldman smiled without humor.\n\n“Faster.”\n\nThe younger man looked through the open tent flap at frost-white petals drifting over rows of recovering soldiers.\n\n“The stories make him sound terrifying.”\n\n“The stories made him smaller.”\n\nA second veteran on the next cot snorted.\n\n“You hated him last time.”\n\n“I hated losing.”\n\n“You cursed his title for a month.”\n\n“I was injured and creative.”\n\nThe younger lancer laughed.\n\nThen his expression softened.\n\n“And now?”\n\nThe old shieldman looked toward the bed behind him, where his own son was breathing cleanly for the first time in weeks.\n\n“Now I can hate the memory and be grateful to the man. I'm old enough to manage two thoughts.”\n\nA Wuyue veteran passing with a bowl of broth overheard him.\n\n“That's the Petals Monarch problem.”\n\nThe shieldman looked over.\n\n“What problem?”\n\nThe Wuyue veteran kept walking.\n\n“Eventually you stop trying to make him fit anything sensible.”\n\nThat answer traveled almost as quickly as the title itself.`,
  'chapter 449 Isgard veteran dialogue',
);

test = replaceOnce(
  test,
  `    expect(part2).toContain('Shinsei heard it too.');\n    expect(part2).toContain('No accepted rank.');`,
  `    expect(part2).toContain('Shinsei heard it too.');\n    expect(part2).toContain('One planned advance horn was quietly cancelled.');\n    expect(part2).toContain('No accepted rank.');\n    expect(part2).toContain('THE PETALS MONARCH IS ACTIVE.');`,
  'test Shinsei reaction assertions',
);

test = replaceOnce(
  test,
  `    expect(part3).toContain('Not Rhen.\\n\\nThe Petals Monarch.');\n    expect(part3).toContain("The man who ended Isgard's last war had returned to Isgard by healing it.");`,
  `    expect(part3).toContain('Not Rhen.\\n\\nThe Petals Monarch.');\n    expect(part3).toContain('The stories made him smaller.');\n    expect(part3).toContain("The man who ended Isgard's last war had returned to Isgard by healing it.");`,
  'test Isgard veteran dialogue assertion',
);

fs.writeFileSync(p2, part2);
fs.writeFileSync(p3, part3);
fs.writeFileSync(testFile, test);
console.log('Expanded Petals Monarch return reactions and Shinsei POV.');
