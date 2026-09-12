import fs from 'node:fs';

const p2Path = 'docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_2.md';
const p3Path = 'docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_3.md';
const mapPath = 'docs/FINAL_ARC_PHASE3_SEASON_MAP.md';
const testPath = 'test/petalsMonarchReturn.test.ts';

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function write(path, text) {
  fs.writeFileSync(path, text);
}

function replaceRange(text, start, end, replacement, label) {
  const a = text.indexOf(start);
  if (a === -1) throw new Error(`Missing start anchor for ${label}`);
  const b = text.indexOf(end, a + start.length);
  if (b === -1) throw new Error(`Missing end anchor for ${label}`);
  if (text.indexOf(start, a + 1) !== -1) throw new Error(`Duplicate start anchor for ${label}`);
  return text.slice(0, a) + replacement + text.slice(b);
}

function replaceExact(text, oldText, newText, label) {
  const first = text.indexOf(oldText);
  if (first === -1) throw new Error(`Missing exact anchor for ${label}`);
  if (text.indexOf(oldText, first + 1) !== -1) throw new Error(`Duplicate exact anchor for ${label}`);
  return text.replace(oldText, newText);
}

let p2 = read(p2Path);

const chapter445Tail = `By evening, Isgard rose against the northern horizon.

Rhen slowed.

Not because he was tired.

Because he could feel the war before he could see it.

Smoke sat over the coast in layers.

The land carried too many damaged circulations.

Thousands.

Tens of thousands.

Some sharp and newly torn.

Some old, badly knitted, reopened, reinforced and damaged again.

Some dim enough that the body holding them had no business remaining awake.

Rhen stopped on a high black ridge overlooking the allied rear territory.

The first thing he saw was not an army.

It was a hospital field.

Rows of canvas.

Rows behind those.

And beyond them, more.

His face changed.

Lu had shown him numbers.

Numbers had edges.

This did not.

A cart creaked along the road below carrying six wounded soldiers. One was Wuyue. Two were Isgard. Three wore stripped Shinsei grey and had prisoner cords around their wrists.

The same physician walked beside all six.

Rhen watched until the cart disappeared between tents.

Then he looked farther north.

Somewhere beyond the command lines was Sera.

He released the last layer of invisibility.

A single frost-white petal formed beside his shoulder.

Pale violet moved through it like trapped dawn.

The color was new.

The signature was not.

The petal left him before he moved.

It drifted down the ridge on a wind too weak to carry it that far.

Then another formed.

Then another.

Not a technique.

Not yet.

Only the quiet overflow of a circulation that had spent six months learning how to hold an impossible amount of winter without announcing it.

The first petal reached the hospital road before Rhen did.

A Wuyue stretcher bearer saw it settle on the black shaft of his spear and stopped walking.

He had never seen Rhen's face.

He did not need to.

Five years earlier, Wuyue had returned from this same continent carrying a story every soldier knew. Sera had held two Paragons until **Orchid Dominion** broke. Then one man had crossed the wreckage of both Domains, punched through one Paragon, broken the other with **Meridian Bloom**, and ended the final battle while frozen petals filled the field.

The stretcher bearer looked up at the ridge.

One title left his mouth so quietly that the wounded man beside him almost missed it.

Petals Monarch.

An Isgard veteran heard him.

The veteran turned toward the petal.

His expression changed before he ever found the man on the ridge.

Isgard had spent five years arguing about the last war—about Duskvein, Wuyue, law, pride, invasion and blame.

It did not argue about how the war ended.

The last battlefield had belonged to two broken Paragon laws and frozen petals.

Every garrison school knew the title attached to them.

Every veteran who had survived the final campaign knew what happened when that title entered a battlefield.

Petals Monarch.

The words moved without a courier.

A Wuyue medical orderly repeated them at the next lane.

An Isgard shieldman heard and straightened.

A Silver Horizon swordswoman who had been sitting against a wagon stood despite the blood drying down one sleeve.

An Isgard captain looked toward the ridge, then toward the exhausted soldiers under his command, and for the first time that day his shoulders stopped sagging.

A wounded man tried to sit up.

His physician shoved him flat again.

The physician was smiling.

No one had been healed yet.

No enemy had been struck.

No reinforcement horn had sounded.

Morale changed anyway.

For six months Wuyue and Isgard had carried the war without him. They had buried friends, promoted replacements, held roads with half-strength companies and learned exactly how much survival cost when no miracle was coming.

His return did not erase any of that.

It told them the miracle had finally caught up.

Rhen noticed the change below.

He looked mildly puzzled by the number of people suddenly staring in his direction.

Then another petal drifted past him toward the hospitals.

Understanding arrived.

He sighed once.

Not annoyed.

Almost embarrassed.

Then he started down the ridge.

Below, one Isgard sentry looked up.

The spear fell from his hand.

Not from fear.

Recognition.

`;

p2 = replaceRange(
  p2,
  'By evening, Isgard rose against the northern horizon.',
  '---\n\n## Chapter 446 — Sera',
  chapter445Tail,
  'Chapter 445 Isgard arrival',
);

const chapter446Opening = `## Chapter 446 — Sera

The sentry did not know Rhen's face.

He knew the title.

The frost-white petal hovering beside the faded dark-green coat was enough.

Pale violet moved beneath the ice.

The sentry's lips parted.

Petals Monarch.

Rhen looked down the road.

[[speaker:rhen]]“Where is Sera?”

The sentry pointed toward the allied command district.

Rhen nodded once and walked past him.

The title outran him.

Nobody shouted Rhen.

At first the words moved in low voices between hospital lanes, supply wagons and exhausted sentries.

Petals Monarch.

Then Wuyue's western camp heard.

A line of soldiers who had been eating in silence stood almost together.

A sword struck the rim of a shield once.

Another answered.

Then another.

The sound traveled through the camp like a pulse.

Isgard heard it next.

Some of those soldiers had fought Wuyue five years earlier. Some had carried wounded away from the battlefield where the Petals Monarch ended the last war. Some were too young to have been there and knew the story only because older fighters never agreed on anything except the ending.

They did not need an explanation now.

Frost-white petals were crossing an Isgard sky again.

This time they were falling behind their own lines.

An Isgard spear company began striking weapon shafts against the frozen earth.

A Wuyue formation answered with shields.

The rhythm spread.

Not celebration.

Not yet.

Something harder.

Relief turning back into aggression.

Men and women who had spent weeks measuring every retreat route began looking north instead of south.

Banners that had hung limp in the evening cold were lifted higher.

A stretcher patient heard the title and started laughing until his ribs hurt badly enough for the medic to threaten him.

A wounded Isgard officer who had asked twice that morning whether evacuation ships were still running stopped asking.

The alliance had survived six months without the Petals Monarch.

That mattered.

His return did not make those six months smaller.

It made every person who had endured them feel, for the first time in too long, that endurance might actually reach an ending.

Rhen kept walking.

The closer he came to the command district, the quieter the people nearest him became.

The roar belonged to the formations farther out.

Up close, myth was stranger.

A tall man in an old traveling coat.

Tousled black hair.

A pale scar through one eyebrow.

No aura.

No army.

No weapon.

Only petals.

Soldiers moved aside before he asked.

Wuyue veterans bowed their heads.

Isgard soldiers straightened.

More than one person stared at him with the disorientation of someone discovering that a story had ordinary footsteps.

Rhen did not look left or right.

He was searching for one person.

The command post stood farther inland behind three defensive rings and a line of black pines that had somehow survived artillery, qi shock and six months of people cutting branches for firewood.

The first ring opened before Rhen reached it.

So did the second.

At the third, Arin Vale stood waiting.

Her silver hair was shorter than he remembered.

One leg carried a reinforced brace beneath the trousers. Her face looked leaner. The old elegance remained, but war had carved away anything decorative around it.

She looked at him for a long moment while the title rolled through the camps behind her.

[[speaker:arin]]“You took your time.”

Rhen nodded.

[[speaker:rhen]]“I know.”

Arin stepped aside.

Then stopped him with one sentence.

[[speaker:arin]]“She did well.”

Rhen's expression changed.

[[speaker:rhen]]“I know.”

Inside the command tent, Sera was standing over a map.

Of course she was.

There were six people in the tent with her: Jin Seoryu at the far end, Luo Wen beside an open medical ledger, Solveig Skeldran in Isgard grey, Xie Wuchen near the rear pole, Mo Qingzhao with two dispatches in hand, and one exhausted courier waiting to be dismissed.

Sera had one palm planted on the table.

Her other arm was wrapped from shoulder to wrist.

A dark bruise disappeared beneath the collar of her clothing. There was a fresh cut at one temple and the subtle stiffness of someone compensating for internal damage every time she breathed.

She was thinner.

Not dramatically.

Enough that Rhen would notice before he noticed anything else.

Outside, the first full roar finally broke across the allied rear.

**PETALS MONARCH.**

It came from Wuyue first.

Isgard answered.

Jin stopped speaking.

Solveig's head turned toward the canvas wall.

A single frost-white petal slipped beneath the tent flap.

It crossed the floor without wind and settled on the map directly over Isgard.

Pale violet moved beneath its surface.

Sera stared at it.

For six months she had received casualty totals, retreat orders, reinforcement schedules and messages that began with another name she knew.

This message needed one petal.

She touched it with two fingers.

The frost did not burn her.

Sera closed her eyes for half a breath.

When she opened them, some weight the room had forgotten she was carrying was gone.

[[speaker:sera]]“He's here.”

Rhen entered.

Sera looked up.

`;

p2 = replaceRange(
  p2,
  '## Chapter 446 — Sera\n\nThe sentry did not recognize Rhen\'s face.',
  'The room stopped.',
  chapter446Opening,
  'Chapter 446 public recognition',
);

const sanctuarySpan = 'The hemisphere reached its full thirty-mile span over hospital fields, allied camps, prisoner wards, civilian shelters, supply roads and stretches of ruined Isgard earth where people had been sleeping under patched canvas because no building remained.\n\n';
const sanctuaryMorale = `${sanctuarySpan}Every watch post in the allied rear could see it.\n\nNo signal officer had to explain what the sky meant.\n\nThe title rose again.\n\n**PETALS MONARCH.**\n\nThis time it did not travel as rumor.\n\nIt rolled through tens of thousands of people at once.\n\nWuyue shouted first. Isgard answered almost immediately.\n\nThe response from Isgard was not simple worship. Too many of its veterans remembered standing on the other side five years earlier. They remembered the humiliation, the fear and the arguments that followed.\n\nThey also remembered the ending.\n\nThe last Isgard war had many causes, many commanders and many people who made victory possible. Its final image was simpler: Sera's broken Domain, two defeated Paragons, and frozen petals falling while the man beyond the ranking system decided the battle was over.\n\nNow that same legend was not walking against Isgard.\n\nHe was standing inside its hospital district.\n\nThe same winter that had ended one war was spreading over Isgard to keep its people alive in another.\n\nFor six months, every readiness report Jin received had moved in one direction. Down.\n\nHe watched exhausted formations stand straighter without receiving an order.\n\nHe watched units that had been discussing rotation begin asking when they would be cleared to return.\n\nHe watched Isgard officers stop checking the southern roads every time a distant horn sounded.\n\nNo one sensible believed the Petals Monarch made them immortal.\n\nThey knew better than that now.\n\nBut morale was also a battlefield resource, and his arrival had changed it before the first repaired meridian was counted.\n\n`;
p2 = replaceExact(p2, sanctuarySpan, sanctuaryMorale, 'Chapter 447 morale expansion');

write(p2Path, p2);

let p3 = read(p3Path);
const ch449Header = '## Chapter 449 — Isgard Stands Again\n\n';
const ch449Insert = `${ch449Header}For three days, Isgard talked about the same person.\n\nNot Rhen.\n\nThe Petals Monarch.\n\nThe name moved through mess lines, bridge crews, hospital queues and night watches with the peculiar certainty reserved for things people had once believed were already history.\n\nOlder soldiers remembered the previous Wuyue war directly.\n\nSome had fought beneath banners that opposed him.\n\nSome had carried wounded from the final battlefield after Sera's Domain fell and the two Paragons facing her discovered that the ranking system had no useful place to put the man who stepped in next.\n\nYounger soldiers knew the same scene from veterans, academy lectures and arguments around winter fires.\n\nDetails changed depending on who told it.\n\nThe ending never did.\n\nFrozen petals.\n\nOne Paragon punched through.\n\nAnother broken by a Transcended art.\n\nThe war stopped.\n\nOne old Isgard shieldman answered a younger lancer's question by telling him the stories had made the Petals Monarch smaller, not larger.\n\nThat answer traveled almost as quickly as the title itself.\n\nFive years earlier, many Isgard soldiers had said Petals Monarch with anger.\n\nNow they said it while waking beneath repaired roofs, testing limbs that should still have been broken and watching their own Paragons prepare to stand again.\n\nHistory had not become friendship.\n\nIt had become context.\n\nThe man who ended Isgard's last war had returned to Isgard by healing it.\n\nThen Aldric Veyrhald woke angry.\n\n`;
p3 = replaceExact(p3, `${ch449Header}Aldric Veyrhald woke angry.\n\n`, ch449Insert, 'Chapter 449 Isgard memory');
write(p3Path, p3);

let map = read(mapPath);
map = replaceExact(
  map,
  '### Chapter 445 — North Without an Army\nRhen leaves for Isgard alone. Drifting Petals should make the distance feel absurd without becoming teleportation or spatial magic. He does not summon a second army or seize command on arrival.\n',
  '### Chapter 445 — North Without an Army\nRhen leaves for Isgard alone. Drifting Petals should make the distance feel absurd without becoming teleportation or spatial magic. His first pale-violet frost-white petals reach the allied rear before he does. Wuyue and Isgard veterans recognize the signature immediately as the **Petals Monarch**, the legendary figure who ended the previous Isgard war. Morale begins rising before Rhen heals or attacks anyone. He does not summon a second army or seize command on arrival.\n',
  'season map 445',
);
map = replaceExact(
  map,
  '### Chapter 446 — Sera\nRhen finds Sera injured, exhausted and still commanding. The reunion is intimate but not helpless-rescue framing. She carried the war without him. Preferred tonal beat: Rhen says she looks terrible; Sera replies that he slept through a war; then she embraces him anyway.\n',
  '### Chapter 446 — Sera\nThe allied rear recognizes the return publicly before the private reunion: soldiers call him **Petals Monarch**, Wuyue and Isgard formations visibly regain morale, and nobody outside his intimate circle treats the event as merely “Rhen came back.” A single pale-violet frost-white petal reaches Sera\'s map before he enters, and she knows exactly what it means. The reunion then becomes intimate rather than helpless-rescue framing. She carried the war without him. Keep the tonal beat where Rhen says she looks terrible, Sera replies that he slept through a war, then embraces him anyway.\n',
  'season map 446',
);
map = replaceExact(
  map,
  '### Chapter 447 — Sanctuary of Petals\nRhen\'s first enormous post-seclusion display is healing, not offense. His upgraded thirty-mile Sanctuary treats Wuyue, Isgard, civilians, soldiers and prisoners alike. Severe but recoverable physical and meridian damage can be restored. The dead remain dead. Axtaya-spent lifespan remains spent.\n',
  '### Chapter 447 — Sanctuary of Petals\nRhen\'s first enormous post-seclusion display is healing, not offense. His upgraded thirty-mile Sanctuary treats Wuyue, Isgard, civilians, soldiers and prisoners alike. The visible Sanctuary turns the return into a strategic morale event: Wuyue and Isgard both answer the title **Petals Monarch**, and Isgard explicitly remembers that the same legend ended the previous war. Severe but recoverable physical and meridian damage can be restored. The dead remain dead. Axtaya-spent lifespan remains spent.\n',
  'season map 447',
);
map = replaceExact(
  map,
  '### Chapter 449 — Isgard Stands Again\nAldric, Maedra and Sigrun regain the recoverable condition needed to stand and fight again. Solveig\'s wartime command is not erased simply because the Paragons recover; the people who kept Isgard functioning while they were down remain institutionally important.\n',
  '### Chapter 449 — Isgard Stands Again\nIsgard spends the days beneath Sanctuary openly talking about the **Petals Monarch**. Veterans remember the previous war from the opposite side; younger soldiers know the same ending from stories and training halls. The title carries old fear, reluctant respect and new relief because the man who ended Isgard\'s last war has returned by healing Isgard. Aldric, Maedra and Sigrun regain the recoverable condition needed to stand and fight again. Solveig\'s wartime command is not erased simply because the Paragons recover; the people who kept Isgard functioning while they were down remain institutionally important.\n',
  'season map 449',
);
write(mapPath, map);

const test = `import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const part2 = readFileSync('docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_2.md', 'utf8');
const part3 = readFileSync('docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_3.md', 'utf8');
const seasonMap = readFileSync('docs/FINAL_ARC_PHASE3_SEASON_MAP.md', 'utf8');

describe('Petals Monarch Isgard return', () => {
  it('makes the legend arrive before the man', () => {
    expect(part2).toContain('The color was new.\\n\\nThe signature was not.');
    expect(part2).toContain('Nobody shouted Rhen.');
    expect(part2).toContain('Petals Monarch.');
    expect(part2).toContain('It did not argue about how the war ended.');
  });

  it('turns the return into a Wuyue and Isgard morale event', () => {
    expect(part2).toContain('Wuyue shouted first. Isgard answered almost immediately.');
    expect(part2).toContain('morale was also a battlefield resource');
    expect(part2).toContain('[[speaker:sera]]“He\'s here.”');
  });

  it('preserves the intimate Sera reunion after the public mythic reveal', () => {
    expect(part2).toContain('[[speaker:rhen]]Then Rhen said, “You look terrible.”');
    expect(part2).toContain('[[speaker:sera]]“You slept through a war.”');
  });

  it('makes Isgard remember who ended the previous war', () => {
    expect(part3).toContain('Not Rhen.\\n\\nThe Petals Monarch.');
    expect(part3).toContain('The man who ended Isgard\'s last war had returned to Isgard by healing it.');
    expect(seasonMap).toContain('the legendary figure who ended the previous Isgard war');
  });
});
`;
write(testPath, test);

console.log('Applied Petals Monarch return polish to Season 109.');
