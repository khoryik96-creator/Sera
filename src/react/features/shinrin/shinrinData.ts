// Shinrin — the final-arc northern power and its ten Paragon officers.
//
// Sourced verbatim from the authoritative locks:
//   docs/FINAL_ARC_PHASE1_PHASE2_CONTINUITY_LOCK.md (revised #1–#10 order + tiers)
//   docs/FINAL_ARC_SHINRIN_MARTIAL_LOCKS.md  (styles, signature skills, Domains)
//   docs/FINAL_ARC_SHINRIN_CHARACTER_LOCKS.md (Shinsei Guild, ages, Ultimate)
// The Phase I/II continuity lock wins on order/tiers where it conflicts with the
// older Shinrin roster/supplement/martial docs. Nothing is invented or renamed.
// Yurushi Amagiri (Black Radiance) is a deliberately-unranked High Paragon
// outside the official ten and lives on the Quaint Teahouse tab as the Sixth Petal.
import type { ArchiveFigure } from '../villains/archiveFigures';

/** The ten official Shinsei Guild Paragons, in canonical roster order (#1–#10). */
export const shinrinParagons: ArchiveFigure[] = [
  {
    key: 'tsubasa', name: 'Tsubasa Kurokawa', source: 'arc',
    subtitle: 'Shinsei #1 · Peak Paragon · Chained Crescent',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild leader · undisputed No.1', strength: 'Peak Paragon',
    details: 'Shinsei Guild’s undisputed No.1, with a clear gap over Shunto despite Shunto being the official No.2. He abandoned the bow for a large black crescent blade on a long reinforced chain — fighting close by gripping near the blade, controlling mid-range with shortened chain, or releasing it for wide sweeps that anchor on terrain, pillars, trees and enemy equipment. By the final arc he is the strongest conventional cultivator the ranking system has yet produced — stronger overall than even the historic monster Aethon Vael in his base state, and decisively above that benchmark during the single deliberate 3× Redline he spends in the final battle — while post-seclusion Rhen remains outside the comparison entirely. He does not ascend past Paragon; Paragon stays the highest normal martial level. Age 42.',
    skills: [
      ['Black Orbit', 'Transcended Offense / Control', 'Rotates the crescent through changing chain lengths and attack planes — abruptly shortening or releasing chain, reversing the orbit through an anchor point, or changing the plane of rotation without stopping the weapon’s momentum.'],
      ['Heaven Snare', 'Transcended Control / Movement', 'The chain physically catches terrain, structures, weapons, armour or limbs, and Tsubasa uses the connection to redirect the crescent or pull his own body to a new angle. No teleportation or telekinetic grab — the chain must genuinely catch something.'],
      ['Eclipse Descent', 'Supreme', 'Sets several physical anchor points, releases most of the chain, then drives the crescent through them in one continuous high-speed sequence that keeps returning from new angles at Paragon momentum.'],
      ['Heaven Returns What It Receives', 'Supreme Passive / Counter', 'Every genuine martial attack that actually reaches Tsubasa — direct impact, weapon collision, qi through a clash, shockwave, or force received through his crescent or connected chain — has part of its transmitted force captured and compressed into his own circulation. It does not negate the harm: he can still be cut, broken or displaced by the same blow he converts, and non-impact effects like poison or suffocation are not converted at all. The stored force is not a battery — it must fuel his next committed attack, though several hits landing before he strikes can accumulate up to what his body can safely process, and any excess beyond that throughput limit simply damages him. The identity is that hurting Tsubasa and arming Tsubasa can happen in the same instant, so the wrong answer against him is to commit every heavy attack at once — a strong strategist eventually realises the counter is to stop feeding him.'],
      ['Tethered Heaven Dominion', 'Paragon Domain', 'Two linked rules: detached hostile qi loses cohesion the farther it travels from its owner (weakening ranged sword qi, projected blades, pressure waves and remote barriers), while Tsubasa’s own output stays connected body → hand → chain → crescent; and the closer a target comes, the harder the Domain makes retreat — movement grows heavier and increasing distance from him meets the strongest drag. Not gravity or added mass. Identity: the farther your power travels the weaker it becomes; the closer you come to Tsubasa, the harder it is to leave.'],
      ['One Chain Binds Heaven', 'Ultimate (requires Tethered Heaven Dominion)', 'His Ultimate. Tsubasa sets genuine physical chain anchors through terrain and structures so the uninterrupted chain becomes a continentally scaled extension of his connected martial reach within the prepared battlefield — one man, one chain, one crescent, with no clones, teleportation, duplicated weapons or spatial magic. The unbroken body → hand → chain → crescent connection preserves his output against the Domain’s detached-qi weakening, anchor geometry lets the crescent redirect again and again while keeping real physical momentum, and targets near the chain network meet the same retreat-resistance normally strongest beside him. Anchors and chain sections can be destroyed by sufficient force, and the strain on body, meridians, concentration and weapon is extreme.'],
    ],
  },
  {
    key: 'shunto', name: 'Shunto Takamori', source: 'arc',
    subtitle: 'Shinsei #2 · High Paragon · Seizing Hand',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild officer', strength: 'High Paragon',
    details: 'A close-range capture specialist wielding paired hooked blades, built to strip an opponent’s circulation and mobility piece by piece. Age 38.',
    skills: [
      ['Five Lock Hand', 'Transcended Control', 'Precise finger, palm, elbow and wrist strikes to major circulation junctions; clean contact numbs fingers, weakens grip, delays leg response or makes qi circulation through the struck region painful and unreliable.'],
      ['Wolf Hook', 'Transcended Offense / Capture', 'Hooks a weapon guard, armour seam, sleeve, belt, shield rim or limb, then adds body rotation and qi-reinforced pull to drag the target into grappling range.'],
      ['Closed Meridian Cage', 'Supreme', 'Rapid sequential strikes to several circulation points; enough clean contacts make one limb or section extremely hard to circulate high-output qi through.'],
      ['Hundred Locks Dominion', 'Paragon Domain', 'Every clean physical contact leaves a short-lived lock in that region; locks compound into sluggish, numb or unreliable limbs. Strong cultivators can purge them by stopping and forcing circulation through the region, at a cost of time, qi and attention, and locks expire rather than becoming permanent injuries. Identity: every touch removes another piece of the opponent’s usable fighting capacity.'],
    ],
  },
  {
    key: 'kai', name: 'Kai Moriyama', source: 'arc',
    subtitle: 'Shinsei #3 · High Paragon · Heavy saber / Tempered Flame Qi',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild officer', strength: 'High Paragon',
    details: 'A heavy-saber bruiser whose Tempered Flame Qi turns a prolonged clash into an oven built for him. Age 46.',
    skills: [
      ['Redsteel Heart', 'Transcended Passive', 'Major clashes raise his internal temperature and circulatory pressure; as heat builds, muscle response quickens, the saber runs hotter at contact and his output grows increasingly explosive.'],
      ['Crimson Cleave', 'Transcended Offense', 'Compresses flame qi and saber force into the impact point — the blade lands first, then stored heat expands violently through the damaged guard, armour or struck tissue.'],
      ['Last Ember Guard', 'Supreme Defence / Counter', 'Receives a major attack through reinforced stance and saber structure, catches part of the clash-generated heat in his circulation, then vents it through an immediate countercut.'],
      ['Crimson Crucible Dominion', 'Paragon Domain', 'Drives ambient temperature to extremes while feeding his Tempered Flame Qi. Enemies dehydrate and tire rapidly — sweating, dry mouth, muscle weakness, dizziness, harder circulation control, eventual collapse — faster the harder they fight; qi thermoregulation endures longer at the cost of reserve. Kai’s conditioned body instead grows more explosive up to his trained ceiling. Identity: everyone else is cooked dry while Kai becomes more explosive.'],
    ],
  },
  {
    key: 'haru', name: 'Haru Ishikawa', source: 'arc',
    subtitle: 'Shinsei #4 · High Paragon · Precision spear',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild officer', strength: 'High Paragon',
    details: 'A precision spear stylist who wins by geometry — reach, angle and denial — rather than raw force. At 28 he is the youngest High Paragon in Shinsei history.',
    skills: [
      ['Three-Length Spear', 'Transcended Offense', 'Changes the effective reach of a thrust at the last instant through grip shift, torso extension and compressed spear qi — the spear does not magically grow.'],
      ['Half-Step Outside', 'Transcended Movement / Counter', 'Positions just outside the true end of a committed attack so it misses by inches while he stays in immediate spear-counter range.'],
      ['Nine Lines Collapse', 'Supreme', 'Nine deliberately chosen spear lines remove escape and counter angles one after another until the opponent is forced into a much narrower set of viable positions.'],
      ['Carved Spear Dominion', 'Paragon Domain', 'Every completed thrust leaves a temporary residue along its exact line that Haru can trigger once as a second spear-qi thrust down the original path — a missed or blocked thrust can re-fire after the guard has moved. Stored lines discharge once, cannot rotate or chase, can be destroyed by strong qi disruption, and store only his own attacks. Identity: the opponent must remember not just where the spear is, but everywhere it has already been.'],
    ],
  },
  {
    key: 'eirik', name: 'Eirik Voss', source: 'arc',
    subtitle: 'Shinsei #5 · High Paragon · Longsword & shield',
    affiliation: 'Shinsei Guild', affiliationRole: 'Former ruler of Isgard; now a Shinsei Guild Paragon', strength: 'High Paragon',
    details: 'Once Isgard’s ruler, now a Shinsei Guild Paragon — an Isgard longsword-and-shield fighter and battlefield commander built to win wars of attrition.',
    skills: [
      ['Winter Brace', 'Transcended Defence', 'Distributes incoming force through shield rim, shoulder, hips and rear leg, absorbing impact with his whole frame instead of one arm.'],
      ['King’s Guard', 'Transcended Defence / Escort', 'Sword and shield form a moving defensive frame around one nearby ally, protecting them through retreat, extraction or advance.'],
      ['Last Standard', 'Supreme Formation Art', 'A clear battle signal and qi pulse that willing allies can consciously synchronize with, letting the group take one major exchange in coordinated sequence rather than as isolated fighters. It is not mind control.'],
      ['Crownless Dominion', 'Paragon Domain', 'Hostile cultivators cannot replenish spent qi from the surrounding environment — their existing reserve works at full potential, but breathing and ordinary recovery restore almost nothing, large techniques become irreversible expenditures, and fatigue accumulates because spent energy stays spent. Eirik and selected allies still draw on ambient qi normally, and the Domain never steals existing reserve. Identity: enemies may fight inside his Domain, but the battlefield gives them nothing back.'],
    ],
  },
  {
    key: 'hana', name: 'Hana Arakawa', source: 'arc',
    subtitle: 'Shinsei #6 · Established Paragon · Twin short swords / Wind Qi',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild officer', strength: 'Established Paragon',
    details: 'A twin-short-sword duelist whose Wind-Qi qinggong turns movement and air pressure into weapons. Age 34.',
    skills: [
      ['Falling Sky Step', 'Transcended Movement', 'Wind Qi bursts around her legs during direction changes, letting her redirect sideways, diagonally or downward while keeping far more speed than ordinary qinggong.'],
      ['Twin Gale Crescent', 'Transcended Offense', 'Two compressed wind-edged cuts arrive from slightly separated angles — the first forces a guard, the second punishes that same guard position.'],
      ['Silent Crosswind', 'Supreme', 'Hides one major directional change inside the disturbed pressure wake of her previous movement, so the next physical attack appears to continue along the wrong line. It is not an illusion.'],
      ['Hollow Sky Dominion', 'Paragon Domain', 'Creates moving low-pressure pockets: enemies inside suffer difficult breathing, lung and ear pressure, muffled sound, unstable footing across pressure boundaries and worse sustained exertion. Collapsing a pocket rushes air back as a short violent equalization that can spoil a weapon line, unbalance a body or rupture weak qi constructs. It cannot vacuum a Paragon to death — qi-assisted breathing resists it at the cost of reserve. Identity: she weaponizes not only wind, but the places where wind and pressure have been taken away.'],
    ],
  },
  {
    key: 'aya', name: 'Aya Katsuragi', source: 'arc',
    subtitle: 'Shinsei #7 · Established Paragon · Medical needles / meridian medicine',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild officer · senior medical command', strength: 'Established Paragon',
    details: 'A meridian physician whose needle art both keeps allies alive and turns an enemy’s own circulation against them. Her Paragon-level medicine reaches a formidable ceiling: given enough uninterrupted treatment and recovery time she can restore a living Paragon from severe but medically recoverable combat trauma — torn meridians, organ and circulation damage, broken bones, foreign-qi contamination, combat qi deviation — back to effectively 100% fighting condition, so a patient returning at 70–80% means she was rushed, not that she lacked the skill. She cannot resurrect the dead or restore Axtaya-spent lifespan; the limiting resource is usually time, not her ceiling, which makes her one of Shinsei’s greatest strategic assets for returning apex fighters to the war at full strength. She originally developed the legitimate ~20–30% emergency circulatory stimulant "Aya" and helped develop the controlled 1.5× Axtaya tier, but objected to 2× and never approved routine 3× Redline infantry use; Shinsei military command militarized Axtaya over her objections, and she stayed too long inside the program trying to reduce the harm.',
    skills: [
      ['Seven Pulse Needles', 'Transcended Control', 'Seven fine needles at pulse and circulation junctions can slow bleeding, calm spasms and stabilize unstable qi — or temporarily disrupt an enemy’s circulation.'],
      ['White Thread Sutra', 'Transcended Healing', 'Fine qi threads delivered through implanted needles stabilize torn meridians and vessels long enough for the patient’s body and medicine to recover.'],
      ['Borrowed Beat', 'Supreme Healing / Emergency Support', 'Synchronizes a failing patient’s unstable circulation to her own controlled pulse through needle contact, holding them through shock, poison or meridian failure. It cannot resurrect the dead or restore consumed lifespan.'],
      ['Hundred Pulse Dominion', 'Paragon Domain', 'She reads pulse, circulation and meridian behaviour across every body in the Domain. Against enemies this becomes Paralytic Pulse — suppressive pressure on major junctions progressing from heavy limbs to near-total inability to move cleanly; forcing movement drives high-output qi through constricted channels and risks torn meridians, internal bleeding and worsening self-injury. Selected allies are excluded and can instead be treated through the Domain’s diagnostic side. Identity: stay still, or damage your own meridians forcing the body to move.'],
    ],
  },
  {
    key: 'kenji', name: 'Kenji Narukami', source: 'arc',
    subtitle: 'Shinsei #8 · Established Paragon · Straight sword / Thunder Qi',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild officer', strength: 'Established Paragon',
    details: 'A Thunder-Qi burst swordsman built around violent short-range acceleration and step-punishing pressure. Age 25.',
    skills: [
      ['Flashstep', 'Transcended Movement', 'A controlled Thunder-Qi surge through nerves and legs produces violent short-range physical acceleration. It is not teleportation.'],
      ['Sky Crack', 'Transcended Offense', 'When his sword makes contact, compressed Thunder Qi discharges through the clash point and briefly disrupts grip, muscle timing and stance recovery.'],
      ['Sevenfold Thunder', 'Supreme Movement / Offense', 'Stores a sequence of Thunder-Qi bursts through rapid movement and clashes, then releases them through one continuously changing-speed sword assault.'],
      ['Stormstep Dominion', 'Paragon Domain', 'Every meaningful planted step or landing by a hostile target calls a Thunder-Qi strike onto that position. A single strike can be avoided by acceleration, a jump, a roll, a block, redirection or terrain — but each new step triggers another, so rapid footwork becomes a continuous thunder pursuit, while standing still avoids fresh strikes but offers a stationary target. Identity: dodging one bolt is possible; fighting normally while every step calls another is the real problem.'],
    ],
  },
  {
    key: 'jun_kajihara', name: 'Jun Kajihara', source: 'arc',
    subtitle: 'Shinsei #9 · Stable Paragon · Heavy halberd / anti-defence',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild officer', strength: 'Stable Paragon',
    details: 'A heavy-halberd anti-defence specialist whose whole art is about making armour and guards irrelevant at the point of contact. Age 36.',
    skills: [
      ['Gatebreaker Halberd', 'Transcended Offense', 'Compresses the full force of a heavy halberd swing into a small impact zone, maximizing penetration rather than producing a broad blast.'],
      ['Second Wall', 'Transcended Follow-Up', 'Immediately follows a defended impact with a second strike shaped around the position and timing the first collision exposed.'],
      ['Third Wall Falls', 'Supreme', 'Three escalating halberd attacks arrive in rapid succession, forcing the defender to survive repeated anti-guard pressure without a full reset.'],
      ['Breach Dominion', 'Paragon Domain', 'When Jun’s attack actually connects, conventional mitigation at that point — armour, shields, weapon guards, body-hardening qi, defensive coatings, barriers, reinforced techniques — gives no meaningful reduction. It does not guarantee contact, erase cultivation or cancel an enemy Domain; opponents can still dodge, redirect the weapon before clean contact, interrupt him, control spacing or strike first. Identity: thicker defence is not the answer — do not be where the halberd lands.'],
    ],
  },
  {
    key: 'nao', name: 'Nao Shibasaki', source: 'arc',
    subtitle: 'Shinsei #10 · Stable Paragon · Flowing jian / Water Qi',
    affiliation: 'Shinsei Guild', affiliationRole: 'Shinsei Guild officer', strength: 'Stable Paragon',
    details: 'A flowing-jian Water-Qi swordswoman who defends, rescues, and slowly drains an opponent’s circulatory power. Age 31.',
    skills: [
      ['Quiet Lake Guard', 'Transcended Defence', 'Receives heavy force through circular sword movement and layered body rotation, spreading one collision through wrist, elbow, shoulder, waist and footwork rather than taking it at a single point.'],
      ['Rain-Cut Sword', 'Transcended Offense', 'A sequence of light precise cuts flows around a stronger guard rather than contesting it head-on, targeting exposed edges, wrists and openings.'],
      ['Mercy Current', 'Supreme Defence / Rescue', 'Wraps Water Qi around herself and one nearby person, splitting a dangerous incoming impact across several controlled body movements to create an escape opening.'],
      ['Stillwater Dominion', 'Paragon Domain', 'Gradually lowers hostile cultivators’ effective circulatory pressure: over time the same effort yields slightly less output, explosive qinggong and weapon reinforcement weaken, and major techniques demand ever more aggressive circulation. Enemies are not hard-capped — they can overpressurize their own meridians back toward full power, risking inflammation, internal bleeding, torn channels and mounting exhaustion. Nao’s continuously equalizing Water-Qi keeps her near normal output as opponents decline. Identity: accept becoming weaker, or injure yourself trying to stay at full strength.'],
    ],
  },
];

/** Tier order used to group the roster from strongest to steadiest. */
export const SHINRIN_TIER_ORDER = ['Peak Paragon', 'High Paragon', 'Established Paragon', 'Stable Paragon'];
