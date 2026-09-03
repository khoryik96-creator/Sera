from pathlib import Path

path = Path('docs/NEXT_ARC_OUTLINE.md')
text = path.read_text(encoding='utf-8')

text = text.replace('# Next Arc — Ten-Season Planning Skeleton', '# Final Arc — Two-Part Twenty-Season Planning Skeleton', 1)
text = text.replace('> **Proposed reader range:** Seasons 95–104 · Chapters 301–400.', '> **Final-arc structure — locked:** Part I = Seasons 95–104 / Chapters 301–400. Part II = Seasons 105–114 / Chapters 401–500. Every season contains exactly 10 chapters. Total final arc = 20 seasons / 200 chapters.', 1)
text = text.replace('> **Working-title status:** Unchosen. Title candidates appear in the approval gates near the end of this file.', '> **Working-title status:** Unchosen. The final arc may use one master title with Part I / Part II subtitles, or one title per part. Candidates remain approval-gated.', 1)
text = text.replace('> **Central promise — proposed, not locked:** The first arc after the Wuyue–Isgard war should be driven by consequences rather than by immediately introducing a continent that is simply stronger than the last one.', '> **Central promise — proposed, not locked:** The final arc should be driven by consequences rather than by immediately introducing a continent that is simply stronger than the last one.', 1)
text = text.replace('> **Important:** The conspiracy route below is a complete working skeleton so the next arc has something concrete to revise.', '> **Important:** The conspiracy route below is a complete working skeleton for Part I and a final-endgame route for Part II so the last 200 chapters have something concrete to revise.', 1)

anchor = '## 7. Proposed Ten-Season Arc Shape\n\nThis is the working route if the conspiracy premise is accepted. New events below are **proposals**, not inherited canon.\n'
replacement = '''## 7. Final Arc Structure — Two Parts, Twenty Seasons\n\nThe following structure is now a **locked production format** unless the user explicitly changes it later:\n\n| Part | Seasons | Chapters | Function |\n|---|---:|---:|---|\n| **Final Arc — Part I** | **95–104** | **301–400** | Post-war instability, evidence war, exposure of the hidden network and discovery of the real final objective. |\n| **Final Arc — Part II** | **105–114** | **401–500** | The true endgame: both continents confront the final authority project, every major surviving cast member receives a last meaningful role, and the series resolves permanently. |\n\n- Each part contains exactly **10 seasons**.\n- Each season contains exactly **10 chapters**.\n- Each part therefore contains **100 chapters**.\n- The complete final arc contains **200 chapters**.\n- Season 104 / Chapter 400 is the **midpoint ending**, not the series finale.\n- Season 114 / Chapter 500 is the intended **final chapter of the series**.\n- Part I may end on a major revelation because Part II is already part of the same final arc; Chapter 400 should still resolve the immediate Part I problem rather than merely stopping mid-scene.\n\n### 7.1 Part I — Proposed Ten-Season Shape\n\nThis remains the working route if the conspiracy premise is accepted. New events below are **proposals**, not inherited canon.\n'''
if anchor not in text:
    raise SystemExit('Part I structure anchor not found')
text = text.replace(anchor, replacement, 1)

old_end = '''### Chapter 399 — Optional Future Hook\n\nOne future-facing element may appear only if separately approved: a new continent, an unresolved Isgard region, a surviving conspiracy branch, a former legendary figure or a completely domestic interval. Do not force one automatically.\n\n### Chapter 400 — The Crooked Sign Does Not Declare Peace\n\nThe arc ends beneath the sign with peace existing because people continue choosing systems that make lies harder to weaponize. The last image should resolve this arc before teasing the next one.\n'''
new_end = '''### Chapter 399 — The Lie Has an Author\n\nThe immediate forged-order network is dismantled, but the captured archive proves the conspiracy was never designed merely to restart one war. Its deeper objective is to make every existing authority fail verification at the same time so both continents will accept one permanent emergency command as the only surviving source of truth. The Architect remains unnamed until the relevant approval gate is resolved.\n\n### Chapter 400 — The Order That Outlived the War\n\nPart I closes with Wuyue and Isgard preventing the manufactured second war, only to discover that dormant wartime relays across both continents have received the same final instruction: recognize one emergency authority when ordinary authentication collapses. Jin never wrote the protocol, Aldric never approved it and Sera refuses to let fear decide whether anyone should own that power. The crooked sign remains standing, but the conflict has changed from proving which orders are false to deciding whether the world will surrender the right to choose its own authority.\n'''
if old_end not in text:
    raise SystemExit('Part I ending anchor not found')
text = text.replace(old_end, new_end, 1)

part2 = r'''
---

## 18. Final Arc — Part II Working Route

> **Status:** Proposed endgame, not canon until its approval gates are resolved. The twenty-season / two-part structure is locked; the exact antagonist identity, motive, technique set and final combat solution are not.

### 18.1 Part II Central Promise

Part II should not reveal that the forged-order conspiracy was merely the servant of a physically stronger stranger. The deeper threat should be the attempt to create a **permanent final authority** after both continents have been traumatized into distrusting every existing institution.

The working name for the project is **The Last Mandate**. This is a planning label only.

Its danger comes from combining:

- captured wartime authentication;
- relay houses and courier routes;
- medical-neutrality credentials;
- reconstruction contracts;
- dead officers' still-valid seals;
- emergency command clauses;
- martial formation anchors hidden inside roads, gates and public buildings;
- enough legitimate supporters that destroying one villain cannot solve the problem.

The final thematic question is not “who is strongest?” It is:

> **When fear makes one permanent ruler look efficient, who still chooses a world where authority must be earned, limited and answerable?**

Sera's answer should be lived through what she does, not delivered as a speech from a throne.

### 18.2 The Final Antagonist Model — Approval-Gated

Recommended structure:

| Slot | Function | Default ceiling |
|---|---|---|
| **The Architect** | Designed the final-authority project and understands how both continents authenticate command. | Veteran Paragon **or** Sovereign strategist protected by the system. No new realm required. |
| **The Executor** | Martial defender who can hold Sera or the Top Ten away from key anchors long enough for the Mandate to function. | Veteran Paragon by default if the Architect is noncombatant; otherwise Peak Sovereign. |
| **The Civil Sponsor** | Gives the project legitimacy among exhausted officials, widows, merchants and reconstruction bodies. | May be noncombatant. |
| **The Northern Sponsor** | Makes the project appear to answer Isgard's fear of renewed Wuyue invasion. | Political weight matters more than cultivation. |
| **The Relay Keepers** | Cells that maintain physical authentication and formation anchors. | Mixed levels; most should not be elite duelists. |

The Architect and Executor should remain separate by default so investigation and combat do not collapse into one person.

### 18.3 No Cheap Final-Realm Escalation

- No realm above Paragon is required.
- Sera may become a more complete and efficient Paragon without crossing into a newly named realm.
- Rhen remains beyond the ranking system without needing a new category.
- Tae, Huo and Qin do not all become Paragons merely because the story is ending.
- One of the trio may approach the threshold only if separately earned and approved.
- The public Top Ten remain essential because the final crisis attacks institutions, armies and roads across a continent rather than one duel arena.
- Rhen's Ultimate remains an approval gate. The preferred working route does **not** require it.

---

## 19. Part II — Ten-Season Shape

| Season | Chapters | Working season title | Main movement |
|---:|---:|---|---|
| **105** | 401–410 | **The Name Behind the Orders** | Part I evidence exposes the deeper final-authority project and the first legitimate supporters behind it. |
| **106** | 411–420 | **The Authority Nobody Chose** | Officials begin voluntarily surrendering emergency powers to the Mandate because normal verification is failing. |
| **107** | 421–430 | **Roads Without Banners** | The project seizes relays, medical routes and reconstruction arteries without declaring conventional war. |
| **108** | 431–440 | **Five Sovereigns, Three Peaks, One House** | Wuyue's public and hidden powers must coordinate without becoming one permanent command structure themselves. |
| **109** | 441–450 | **The Last Gate of Isgard** | Isgard faces its own internal legitimacy crisis; Aldric, Maedra, Sigrun and Tor must choose what they will defend. |
| **110** | 451–460 | **A World Without Trusted Orders** | Authentication collapses at continental scale; ordinary institutions must function by visible human accountability. |
| **111** | 461–470 | **Orchid Dominion, Fully Hers** | Sera's mature Paragon control is tested against the Mandate's protected anchors and final Executor. |
| **112** | 471–480 | **The Last Mandate** | The Architect activates the complete project and offers both continents peace in exchange for permanent obedience. |
| **113** | 481–490 | **No One Rules Beneath Heaven** | The final multi-front battle dismantles the Mandate while preserving the choice not to replace it with Sera, Rhen or Jin. |
| **114** | 491–500 | **The Crooked Sign at the End** | Trials, rebuilding, final character resolutions and the permanent series ending at Chapter 500. |

---

## 20. Season 105 — The Name Behind the Orders

### Chapter 401 — Every Bell Rings Once

The same dormant emergency signal sounds at relay houses in Wuyue and Isgard. Nobody receives an army order; instead each station is instructed to preserve itself and await recognition of a “final validating authority.” Jin understands immediately that someone designed a succession protocol for command itself.

### Chapter 402 — Jin Burns His Own Emergency Book

Jin orders every surviving Black March contingency manual opened to public Compact review rather than protecting his authorship. He finds no clause matching the new instruction, proving the Mandate was inserted around his system rather than created by it.

### Chapter 403 — Tor Brings the Northern Copy

Tor crosses with Isgard's version. The wording differs enough to fit Gate law while producing the same outcome. The enemy did not copy one bureaucracy; it wrote parallel instructions that make both systems converge.

### Chapter 404 — Lu Counts Who Profits From Waiting

Lu traces reconstruction payments that accelerate whenever local authorities accept emergency verification from one private clearing network. The first supporters are not secret cultists; some are officials who genuinely believe centralization will keep food moving.

### Chapter 405 — Sera Refuses the First Oath

A Wuyue prefect offers Sera temporary supreme authority over three damaged provinces because no one else is trusted. She refuses even though accepting would make the investigation easier. Her refusal becomes the first practical statement of what this final arc is about.

### Chapter 406 — Kael Accepts Being Checked

Stonecrown opens its wartime seal stores to outside inspection. Kael hates the humiliation and does it anyway because strength without verification is exactly the argument the Mandate is selling.

### Chapter 407 — Maedra Recognizes the Handwriting of Power

Maedra identifies a Dravaryn emergency phrase buried in one northern protocol. It belonged to a wartime legal committee rather than a battlefield commander, narrowing the conspiracy toward people who built institutions behind the banners.

### Chapter 408 — The Architect Has Never Needed a Throne

Evidence points toward one coordinating mind that repeatedly occupied advisory positions rather than command. The name remains approval-gated, but the pattern is clear: the Architect built systems that outlived every superior.

### Chapter 409 — Huo Guards a Vote

A provincial council deciding whether to accept Mandate verification is threatened by militants from both sides. Huo's task is not to tell them how to vote; he keeps the room alive long enough for them to choose without coercion.

### Chapter 410 — One Province Says Yes

A devastated border province voluntarily recognizes the Mandate for thirty days because its pension, grain and medical systems have stopped functioning. The decision is lawful. Sera cannot solve it by arresting everyone involved.

---

## 21. Season 106 — The Authority Nobody Chose

### Chapter 411 — Thirty Days Is Enough

Once one province accepts Mandate validation, surrounding merchants and hospitals begin routing through it for efficiency. Temporary authority starts becoming infrastructure before anyone formally extends the deadline.

### Chapter 412 — Mo Explains Why People Agree

Mo rejects the easy claim that only cowards surrender authority. He shows Sera the families who have waited months for disability payments because regional seals contradict one another. The Mandate is dangerous because it solves real pain.

### Chapter 413 — Liang Tests a Perfect Order

Liang proves one Mandate order is procedurally flawless and morally disastrous. The problem can no longer be framed as counterfeit versus genuine; the project is acquiring legitimate authority through voluntary delegation.

### Chapter 414 — Qin Maps Consent

Qin maps which districts accept Mandate oversight and discovers the pattern follows broken courier and hospital routes rather than ideology. The enemy expands where institutions fail first.

### Chapter 415 — Tae Holds a Border Without Owning It

Two provinces dispute which authority controls a crossing. Tae prevents both armies from advancing while refusing to claim the crossing for Sera. His Peak Sovereign strength creates time, not law.

### Chapter 416 — Aldric Faces the Same Offer

Northern Gate councils offer Aldric permanent emergency judgment power if he will authenticate one Mandate branch. He refuses because the final Gate Seal was rewritten specifically to stop one spear from becoming a continent's law.

### Chapter 417 — The Civil Sponsor Speaks Publicly

The Mandate gains a respected public advocate who does not hide. The sponsor argues that fragmented sovereignty caused the war and that only one neutral authority can prevent another. Their popularity makes assassination or secret detention politically impossible and morally wrong.

### Chapter 418 — Arin's Survivors Vote Differently

Silver Horizon veterans split over the proposal. Some who lost friends want one authority capable of preventing future marches. Arin does not command their political beliefs merely because she commands the sect.

### Chapter 419 — Rhen Treats Someone Who Supports the Mandate

A wounded supporter expects contempt from the teahouse. Rhen heals them without asking what they signed. The scene keeps his moral role grounded and prevents the final arc from turning disagreement into dehumanization.

### Chapter 420 — The Thirty Days Become Ninety

The first province extends Mandate recognition after measurable improvements in food and medical delivery. Jin realizes defeating the project now requires building a better alternative, not merely exposing a lie.

---

## 22. Season 107 — Roads Without Banners

### Chapter 421 — The Road Chooses Its Own Seal

A major trade road refuses both Wuyue and Mandate commands because three authorities claim it. Caravan masters create a temporary visible-signature council to keep food moving, accidentally demonstrating the kind of distributed solution Jin needs.

### Chapter 422 — Lu Builds a Ledger Everyone Can Read

Lu designs a verification ledger where each command leaves multiple independent witnesses rather than one secret master seal. It is slower than the Mandate and much harder to capture.

### Chapter 423 — Someone Burns Only the Copies

Relay Keepers destroy duplicate public ledgers while preserving central originals, revealing that the Mandate requires information to become singular again. Quiet Hands protect copying houses instead of hunting commanders.

### Chapter 424 — Rui Opens the River to Witnesses

Rui places civilian ferrymen, physicians and merchants beside military route officers so no single command can secretly redirect the river. His post-war lesson becomes institutional practice.

### Chapter 425 — Sigrun Holds a Gate for Two Enemies

Sigrun keeps a northern gate open simultaneously for Mandate supporters and opponents while refusing violence inside its walls. Her old Supreme identity as the First Wall gains a final non-conquest meaning.

### Chapter 426 — The Executor Appears

The final martial defender destroys a relay defence without killing the clerks, taking only the authentication anchor beneath the building. Their strength is sufficient to force Sera's direct attention but their exact realm remains approval-gated.

### Chapter 427 — Sera Arrives Too Late to Fight

Sera reaches the site after the Executor leaves. Instead of chasing, she helps preserve the surviving witness chain. Part II reinforces that Paragon speed still does not make investigation omnipresent.

### Chapter 428 — Huo Finds the Route the Quiet Hands Missed

Huo recognizes an old military movement pattern from his feared past that the younger covert cells did not. His history becomes useful without being romanticized.

### Chapter 429 — The Anchor Is Inside a Public Road

The stolen object proves Mandate relays are connected through buried martial formation anchors installed during wartime reconstruction. Destroying every anchor would also destroy roads, hospitals and bridges civilians need.

### Chapter 430 — The Final War Cannot Look Like War

Jin states the problem plainly: the Mandate has built its battlefield inside the systems both continents must preserve. Mass mobilization would help the enemy more than it helps them.

---

## 23. Season 108 — Five Sovereigns, Three Peaks, One House

### Chapter 431 — Kael Takes the Mountains

Kael secures fixed infrastructure and refuses to leave Stonecrown again. His final-arc role is protecting foundations rather than chasing the highest-ranked enemy.

### Chapter 432 — Liang Takes the Seals

Liang's White Vein specialists inspect anchor circulation and develop nonlethal ways to interrupt Mandate relays without collapsing the structures built around them.

### Chapter 433 — Jin Takes the Contradictions

Jin coordinates competing authorities but deliberately publishes every emergency instruction he issues. His greatest strategic advantage becomes accepting that others may audit him.

### Chapter 434 — Lei Takes the Time Between Messages

Lei's speed carries physical witnesses between disconnected districts when no seal can be trusted. He becomes the human link the Mandate cannot forge quickly enough.

### Chapter 435 — Rui Takes the Living Roads

Rui stabilizes river, food and medical routes. He refuses to convert logistics into obedience, even when commanders demand priority.

### Chapter 436 — Tae Takes the Distance

Tae's Peak Sovereign control prevents hostile forces from completing the final interval into protected civic centres. He holds territory without claiming ownership of it.

### Chapter 437 — Huo Takes the Strike Sera Authorizes

Sera authorizes Huo to dismantle one Relay Keeper combat hub after evidence confirms it is actively coercing councils. Huo destroys the fighting structure and leaves the records, surrendered staff and civilian facilities intact.

### Chapter 438 — Qin Takes the Whole Map

Qin coordinates the overlapping rhythms of public armies, Quiet Hands and civilian witness routes. His blindness is never treated as mystical omniscience; he still depends upon reports beyond physical range.

### Chapter 439 — Lu Takes Nothing by Force

Lu's distributed ledger overtakes Mandate verification in three districts because people can see who witnessed each order. He wins territory in the information war without owning one soldier.

### Chapter 440 — Sera Keeps the House Outside the State

Pressure grows for Sera to formalize the teahouse as Wuyue's supreme emergency institution. She refuses again and instead signs a limited cooperation charter that explicitly expires.

---

## 24. Season 109 — The Last Gate of Isgard

### Chapter 441 — Isgard Splits at the Gate

Northern councils divide between those accepting Mandate stability and those defending the revised Gate Seal. The fracture is political first, martial second.

### Chapter 442 — Aldric Cannot Order Unity

Aldric has the strength to crush several councils and refuses. His final growth is accepting that judgment without consent would recreate the thing he claimed to defend during the war.

### Chapter 443 — Maedra Chooses Dravaryn, Not the Mandate

Maedra rejects the Mandate not because she loves Wuyue but because permanent external authority would erase Dravaryn sovereignty. Her cooperation remains nationalist and conditional.

### Chapter 444 — Tor Opens the Duskvein Archive Again

Tor reveals dormant contracts showing that some wartime legal architects profited whenever coalition command became more centralized. The final conspiracy traces back before the war without rewriting Duskvein as secretly responsible for everything.

### Chapter 445 — Eira Refuses Perfect Medical Efficiency

The Mandate offers Eirholt guaranteed supply priority in exchange for exclusive authentication. Eira refuses because neutral medicine cannot depend upon one political authority remaining benevolent forever.

### Chapter 446 — Sigrun and Kael Hold Opposite Sides of One Door

Kael and Sigrun defend a gate together from Relay Keepers while remaining on opposite political sides. Their old defeat history remains intact; cooperation does not become friendship.

### Chapter 447 — The Executor Challenges Sera Once

The Executor forces a direct Paragon-scale confrontation to keep the gate anchor active. Sera does not unveil a new realm; she demonstrates how much cleaner Orchid Dominion has become since Isgard.

### Chapter 448 — Orchid Dominion Chooses the Smaller Field

Sera deliberately contracts her Domain to protect civilians and attack only the Executor's committed openings. The choice costs her territorial control and prevents the fight from becoming another army-scale spectacle.

### Chapter 449 — The Gate Votes While Paragons Fight

Aldric protects the voting hall from collateral pressure while Sera fights outside. The political decision proceeds without waiting to see which Paragon wins.

### Chapter 450 — Isgard Rejects Permanent Recognition

A narrow majority rejects the Mandate as permanent northern authority while allowing temporary local contracts to wind down safely. The victory is legal and fragile, not a conquest by Wuyue.

---

## 25. Season 110 — A World Without Trusted Orders

### Chapter 451 — The Architect Breaks Verification

After losing political momentum in Isgard, the Architect triggers dormant contradictions across both continents. Thousands of orders become impossible to distinguish quickly from compromised copies.

### Chapter 452 — No Seal Opens the Grain Store

One city faces famine because every authorized release bears a disputed mark. Mo orders the stores opened under visible council witness and accepts personal legal review afterward.

### Chapter 453 — Paper-Seal Guard Without Paper

Mo's elite messengers revert to face-to-face chain testimony when documents fail. The supposedly old-fashioned method keeps the imperial capital functioning.

### Chapter 454 — Liang Trusts a Physician Before a General

A medical convoy must choose between two military routes. Liang accepts the physician's witnessed local knowledge over higher-ranked command because the general's authentication cannot be verified.

### Chapter 455 — Arin Names Every Missing Sword

Silver Horizon publicly records who may still issue sect orders. Dead and retired names are permanently closed from authorization, preventing another exploitation of the fallen.

### Chapter 456 — Quiet Hands Become Witnesses

Selected covert operatives temporarily reveal themselves to authenticate critical events in person. Sera accepts the secrecy cost because protecting identity cannot outrank preventing civilians from starving.

### Chapter 457 — Tae Cannot Hold Every Distance

Simultaneous crises force Tae to choose one city and leave another to ordinary defenders. The story refuses to let Peak Sovereign power become infinite logistics.

### Chapter 458 — Rhen Cannot Heal a Missing Shipment

A hospital has physicians but no medicine. Rhen stabilizes patients and then helps carry crates when the delayed convoy finally arrives, grounding his power in practical limitation.

### Chapter 459 — Lu's Slow System Wins One Day

The distributed witness ledger restores enough trust for one full day of food, medicine and transport orders across multiple regions. It is slower than the Mandate and no longer dependent on one person.

### Chapter 460 — The Architect Offers the Faster Answer

The Mandate broadcasts a simple offer: recognize one final authority and every central seal will become valid again immediately. Exhausted populations now understand exactly what they would gain by surrendering the choice.

---

## 26. Season 111 — Orchid Dominion, Fully Hers

### Chapter 461 — Sera Studies Her First Defeat

Sera reviews the Isgard two-Paragon battle without shame or mythmaking. Her growth target is efficiency: fewer petals, cleaner Counter-Blooms, less reserve wasted contesting empty ground.

### Chapter 462 — Rhen Says Nothing Useful Until Asked Correctly

Rhen refuses to hand her a solution. When Sera finally asks about her physical recovery rather than how he would fight, he gives precise medical limits and leaves the martial answer hers.

### Chapter 463 — The Executor Returns With Anchors

The Executor fights inside a network of Mandate anchors that can redirect pressure through surrounding infrastructure. Raw destruction would collapse civilian structures.

### Chapter 464 — Orchid Dominion Stops Chasing Territory

Sera stops measuring her Domain by radius and instead controls only the spaces created by committed hostile action. Her reserve consumption drops dramatically.

### Chapter 465 — One Bloom Inside One Decision

A single Counter-Bloom appears at the exact instant the Executor sacrifices a guard to activate an anchor. Sera severs the anchor connection without breaking the road beneath it.

### Chapter 466 — The Executor Learns to Do Nothing

The opponent reduces attacks to deny Sera openings. The duel becomes patience rather than spectacle, forcing Sera to create ordinary pressure without relying on the Domain to manufacture opportunities.

### Chapter 467 — Veiled Moon Becomes Restraint

Sera uses Veiled Moon not to hide a larger attack but to conceal which civilian structure she has chosen not to endanger, forcing the Executor to guess where restraint limits her.

### Chapter 468 — Sera Wins Without Expanding

She defeats the Executor inside a field smaller than her original one-mile Dominion, proving mastery through control rather than scale. Whether the Executor dies remains a separate approval gate; default is capture.

### Chapter 469 — No New Realm Appears

Witnesses expect Sera's victory to receive a new cultivation title. She explicitly remains a Paragon. The story refuses inflation for its own sake.

### Chapter 470 — The Architect Activates the Empty Throne

With the Executor removed, the Architect no longer protects the system through duels. The Last Mandate begins its complete activation across every surviving anchor.

---

## 27. Season 112 — The Last Mandate

### Chapter 471 — Every Anchor Recognizes One Voice

Roads, relays and emergency formation seals begin accepting commands from one central source. The system does not mind-control people; it controls which institutional orders infrastructure will honor.

### Chapter 472 — The Architect Names the Price of Peace

The Architect publicly offers permanent peace: one authority, one authentication chain, one emergency military hierarchy and guaranteed neutral logistics. The price is that no region may refuse once integrated.

### Chapter 473 — Jin Admits Why It Is Tempting

Jin acknowledges that the Mandate would make coordination easier than the Compact ever was. His rejection matters because he understands the efficiency being sacrificed.

### Chapter 474 — Aldric Rejects Perfect Judgment

Aldric refuses a system that would let one law continue without end. His old Unbroken principle is turned against his own previous certainty.

### Chapter 475 — Sera Is Offered the Seat

The Architect offers Sera the position of final martial guarantor, arguing that if someone must stand above institutions, the person who repeatedly refuses rule is safest. Sera rejects the logic: a safe tyrant still teaches the world to need a tyrant.

### Chapter 476 — Rhen Is Offered Nothing

The Architect does not attempt to command Rhen and instead designs around him, betting that he will refuse to slaughter thousands of ordinary supporters to end the system quickly.

### Chapter 477 — The Five Sovereigns Break Their Own Shortcuts

Kael, Liang, Jin, Lei and Rui each disable one convenience their institutions rely upon rather than let the Mandate own it. The cost is immediate disorder they must personally help manage.

### Chapter 478 — Three Peaks Refuse Promotion

Tae, Huo and Qin are offered permanent continental military offices within the Mandate. All three refuse for different reasons, preserving their distinct personalities instead of one shared speech.

### Chapter 479 — Lu Finds the Root That Is Not a Place

The Mandate cannot be ended by destroying one headquarters. Its root is a quorum rule distributed across anchors, sponsors and recognition contracts. Enough independent withdrawals can collapse it without annihilating infrastructure.

### Chapter 480 — The Final Plan Requires Everyone to Say No

The endgame becomes clear: martial teams must hold anchors long enough for civil authorities, guilds, hospitals and armies to revoke recognition simultaneously. No single strongest character can perform the decisive act alone.

---

## 28. Season 113 — No One Rules Beneath Heaven

### Chapter 481 — Five Fronts, No Supreme Commander

Jin coordinates timing but every region retains the right to abort. The final operation deliberately rejects the command structure it is fighting.

### Chapter 482 — Kael and Arin Hold Stonecrown's Root

Kael holds the physical anchor while Arin's surviving sect cuts only the relay links. The 611 standing swords finally fight as what survived, not as a magically restored army.

### Chapter 483 — Liang and Yun Close White Vein

Liang and Yun prevent medical and suppression systems from being hijacked during withdrawal. Their success keeps thousands alive without a duel headline.

### Chapter 484 — Lei and Luo Carry the Refusal

Lei physically carries witnessed revocation records faster than compromised relays can overwrite them while Luo keeps the route functioning as casualties mount.

### Chapter 485 — Rui and Ilyra Open the River

Rui and Ilyra protect independent river witnesses against Mandate loyalists. The Crownless Host refuses to become the enforcement army of the new order or of its opponents.

### Chapter 486 — Tae Holds the Last Distance

Tae prevents Mandate forces from reaching the central civic quorum before local votes are recorded. He does not cross into Paragon; Peak Sovereign mastery is enough for the task he has earned.

### Chapter 487 — Huo Breaks the Last Armed Enforcement Wing

Under Sera's explicit authority, Huo destroys the Mandate's final coercive combat formation and stops when it surrenders. His final major battle demonstrates control over the violence that once defined his reputation.

### Chapter 488 — Qin Keeps the No Connected

Qin coordinates thousands of independent withdrawals without turning them into one hidden command. Lu's ledger confirms enough authorities have revoked recognition for the system to begin failing.

### Chapter 489 — Sera Faces the Architect

The Architect's exact cultivation determines the form of the final confrontation. Default route: a veteran Paragon whose Domain protects continuing authority rather than raw destruction. Sera must defeat the person without simply smashing the civic structures around them.

### Chapter 490 — No One Takes the Empty Throne

Sera wins the final confrontation or creates the opening that lets the last recognition contract be revoked. Rhen intervenes only if an approved lethal boundary is crossed; preferred route keeps the victory Sera's. When the Mandate collapses, Jin, Aldric, Sera and every other candidate refuse to inherit its central seat. The Empty Throne remains empty by choice.

---

## 29. Season 114 — The Crooked Sign at the End

### Chapter 491 — The Day After No One Became Emperor

The world does not instantly become peaceful. Orders are slower, roads are messy and several districts regret rejecting the Mandate. The series treats freedom as work rather than a victory glow.

### Chapter 492 — The Architect Is Tried, Not Erased

If captured, the Architect faces a joint evidentiary process built from the very verification reforms the conspiracy forced into existence. If the final identity requires a different fate, it must be approved before prose.

### Chapter 493 — Aldric Returns the Northern Seal

Aldric returns emergency authority to Isgard's revised institutions and refuses a permanent supreme judgeship. He and Sera part with respect that does not become friendship.

### Chapter 494 — Maedra Keeps Dravaryn

Maedra remains difficult, dangerous and nationalist. She accepts no Wuyue redemption arc. Her final choice is to rebuild Dravaryn under limits her own people can revoke.

### Chapter 495 — Five Sovereigns Lower the Black Strips

The remaining Black March symbols are retired into archives. The Compact survives, but its emergency protocol is rewritten so no future strategist can become indispensable merely by controlling one seal chain.

### Chapter 496 — Three Peaks Choose Their Own Doors

Tae, Huo and Qin receive final status scenes. None needs to leave the teahouse, but each relationship to public life is clarified: Tae as visible defensive authority, Huo as bounded offensive guardian and Qin as Sera's operational deputy who still prefers the quiet room to ceremony.

### Chapter 497 — Lu Closes the Emergency Ledger

Lu closes the ledger he opened before the Isgard war. He remains completely noncombatant and is recognized as one of the people who saved both continents by making truth harder to own.

### Chapter 498 — Sera Has No Number

The ranking authorities offer Sera every reasonable way to formalize her place. She chooses no numerical rank. Paragon is a realm; her authority over her own household does not require becoming number one of the world.

### Chapter 499 — Rhen Repairs the Sign This Time

The crooked sign finally cracks beyond another temporary patch. Rhen repairs it while Sera argues that replacing the whole board would have been easier. Their last private conversation resolves the Garden extension, their marriage, the years they stopped aging and the choice to keep living an ordinary life that may last far longer than anyone understands.

### Chapter 500 — The Quiet Regular

The final chapter returns completely to the teahouse. No army arrives. No hidden continent is teased. No stronger realm is named. A customer who knows none of the legends asks who the man carrying tea is. Sera gives the most ordinary answer available. Rhen takes the cup to the table beneath the repaired crooked sign, frozen petals briefly visible only in the courtyard light before they melt. The world continues without needing to know everything that protected it. **End.**

---

## 30. Final-Arc Sera and Rhen Relationship Spine

| Season | Relationship movement |
|---:|---|
| **95** | They return to ordinary domestic rhythm while acknowledging the emergency Garden decision and the political weight now attached to their home. |
| **96** | Rhen gives Sera medical observations when useful but does not become the investigation's answer key. |
| **97** | Sera travels while Rhen remains with veterans for part of the arc, showing a marriage that does not require constant physical proximity. |
| **98** | Public fear of the teahouse tests Sera's instinct to protect everyone through secrecy; Rhen supports her without choosing the disclosure boundary for her. |
| **99** | The summit forces them back into the same dangerous space; private scenes remain small and practical. |
| **100** | Rhen treats people harmed by manipulated records while Sera sees how administration can wound without a blade. |
| **101** | Sera chooses civilians over pursuit; Rhen treats the consequence rather than praising the choice as predetermined heroism. |
| **102** | One deliberate quiet teahouse chapter gives them emotional recovery without stopping the plot. |
| **103** | Rhen does not intervene in Sera's Part I apex fight because she remains inside the boundary they both understand. |
| **104** | They understand that preventing the false war was only the first half; neither treats the coming final-authority crisis as permission to seize control themselves. |
| **105** | They disagree mildly over whether Sera's repeated refusal of temporary authority creates extra risk, then resolve it through the principle that safety is not the same as ownership. |
| **106** | Rhen's patients include genuine Mandate supporters; Sera sees him model care without political obedience. |
| **107** | Sera pursues the Executor while Rhen stays with damaged civic systems, keeping both halves of the threat visible. |
| **108** | The teahouse cooperation charter forces them to define what their household will and will not become publicly. |
| **109** | Sera fights in Isgard while Rhen again respects the boundary they established, demonstrating growth since the two-Paragon war finale. |
| **110** | Their most difficult conversations concern people harmed by slow decentralized systems, preventing their anti-Mandate position from becoming self-righteous. |
| **111** | Rhen helps Sera understand bodily limits; Sera owns every martial conclusion of her mature Orchid Dominion. |
| **112** | Both are offered versions of supreme safety. They reject becoming the world's permanent answer for different reasons. |
| **113** | The final operation works specifically because Rhen is not made commander and Sera does not inherit the Mandate after victory. |
| **114** | The series resolves their long life together as a choice to keep a home, not as a promise to rule future generations. |

---

## 31. Final-Arc Power Discipline

1. No realm above Paragon is introduced by default anywhere in Seasons 95–114.
2. Sera begins Part I as an entry Paragon and ends Part II as a more mature Paragon through efficiency, reserve control, judgement and Counter-Bloom precision.
3. Sera receives no second Domain.
4. Orchid Dominion gains refinement, not random new functions.
5. The Part I Blade / Part II Executor may be Peak Sovereign or veteran Paragon according to approval; the final Architect may be noncombatant, Sovereign or veteran Paragon.
6. If both Architect and Executor are Paragons, their danger must come from different roles rather than simply repeating Aldric + Maedra.
7. Rhen requires no new art.
8. Rhen's Ultimate remains unavailable unless explicitly approved. The preferred final route does not require it.
9. Rhen should not solve the Mandate by killing infrastructure, supporters or political opponents.
10. Tae, Huo and Qin remain Peak Sovereigns by default through Chapter 500.
11. No automatic trio Paragon ascension.
12. The public Top Ten remain strategically indispensable because their institutions are the battleground.
13. Lu remains noncombatant through the final chapter.
14. Quiet Hands remain elite and costly, never a substitute for every public institution.
15. Chapter 500 introduces no stronger realm, successor villain or sequel escalation.

---

## 32. Final-Arc Political and Institutional Discipline

- The Mandate must offer real benefits or it becomes a cartoon tyranny.
- Some good people may support it for understandable reasons.
- Refusing centralized authority must carry visible costs: slower decisions, duplicated work, disagreement and occasional failure.
- The story's answer cannot be “all government is bad”; it is that durable authority needs limits, visibility and revocability.
- Sera does not become empress, supreme judge or permanent military ruler.
- Rhen does not become a hidden god-king.
- Jin remains coordinator, not owner of the Compact.
- Aldric remains Isgard's figure, not Sera's subordinate.
- Maedra remains politically independent and morally complicated.
- The final operation succeeds through many separate withdrawals of consent plus bounded martial protection, not one super-technique that rewrites everyone's will.

---

## 33. Final-Arc Casualty and Recovery Discipline

- The story is ending, but that is not permission for random mass death.
- Major deaths require explicit approval.
- The final conflict should threaten civilian systems more than body-count spectacle.
- Existing war losses continue to matter.
- Silver Horizon remains reduced.
- Quiet Hand losses from Isgard remain real.
- Rhen cannot resurrect anyone.
- Medical repair does not erase retirement, grief or political consequence.
- If a named major character dies in Part II, the death must complete a character arc rather than prove the villain is serious.

---

## 34. Final-Arc Approval Gates Before Finished Prose

The following should be decided before the relevant material becomes finished reader canon:

1. **Structure — LOCKED:** Final arc = two parts, 10 seasons each, 10 chapters per season, 200 chapters total.
2. **Range — LOCKED by current numbering plan:** Part I S95–104 / Ch301–400; Part II S105–114 / Ch401–500.
3. **Series end — working lock:** Chapter 500 is intended to be the final chapter; change only by explicit user decision.
4. **Master arc title.**
5. **Whether Part I and Part II receive separate subtitles.**
6. **Part I central premise:** forged-order / evidence-war conspiracy or replacement.
7. **The Architect's identity.**
8. **The Architect's cultivation level.**
9. **The Executor/Blade identity and whether this is the same character across both parts.**
10. **The Executor's cultivation level.**
11. **Architect motive:** emergency power, revenge, forced unification, hidden objective or combination.
12. **Working project name “The Last Mandate”:** keep or rename.
13. **Civil Sponsor identity.**
14. **Isgard/Northern Sponsor identity.**
15. **Whether either sponsor survives to trial.**
16. **Aldric's final role.**
17. **Maedra's final role.**
18. **Sera public rank decision:** default is no number through the finale.
19. **Frozen Petals Garden after the war and its final status by Chapter 499.**
20. **Tae/Huo/Qin final public visibility.**
21. **Whether any of Tae/Huo/Qin approaches Paragon. Default: none crosses.**
22. **Sera's final combat:** preferred route is a mature Orchid Dominion victory without a new realm.
23. **Rhen's final combat involvement:** preferred route is minimal/bounded, not the decisive political solution.
24. **Rhen Ultimate:** default no use; explicit approval required.
25. **Named major deaths:** default none required.
26. **Architect fate:** trial/capture by default, death only if separately chosen.
27. **Executor fate:** capture by default, death only if separately chosen.
28. **Final Black March protocol status:** retired/rebuilt/renamed.
29. **Final Isgard Gate structure.**
30. **Chapter 500 ending image:** current proposal is the ordinary teahouse ending with no sequel hook.
31. **No sequel hook by default.** A future project may exist, but this story should end cleanly.

---

## 35. Proposed Final Series End State

If the working route is approved, Chapter 500 should leave the world with:

- the Wuyue–Isgard war permanently concluded rather than restarted for spectacle;
- the Part I forged-order conspiracy exposed and its deeper final-authority objective revealed;
- the Last Mandate dismantled without replacing it with Sera, Rhen, Jin or Aldric as one permanent supreme authority;
- Sera a mature Paragon who never needed a second Domain or a new realm to finish her story;
- Sera still without a public numerical rank by choice;
- Rhen still beyond ranking, primarily healer and husband, without requiring a new technique;
- Tae, Huo and Qin still distinct Peak Sovereigns whose final importance comes from what they protect and how they use authority, not mandatory Paragon promotions;
- Lu still noncombatant and central to the final victory;
- the Top Ten still meaningful through the institutions and people they lead;
- Kael, Liang, Jin, Lei and Rui having final contributions that grow from their established strengths rather than sudden upgrades;
- Arin rebuilding around the 611 standing swords and surviving wounded rather than restoring the old 3,000 through convenience;
- Mo leaving stronger civil verification behind him;
- Aldric and Maedra remaining recognizably themselves rather than converted followers;
- Eirholt medically neutral;
- Quiet Hands still hidden enough to protect members while no longer pretending leadership knows nothing about them;
- wartime authentication replaced by slower but distributed verification that no single seal owns;
- Frozen Petals Garden receiving a deliberate final post-emergency status;
- no new realm above Paragon;
- no obligatory use of Rhen's Ultimate;
- no automatic major death merely because this is the finale;
- Chapter 500 returning to the teahouse with no stronger enemy, hidden continent or next-arc teaser;
- the title **The Quiet Regular** finally landing on the choice to live ordinarily after having every possible reason to rule.
'''

relationship_anchor = '\n---\n\n## 18. Sera and Rhen Relationship Spine\n'
if relationship_anchor not in text:
    raise SystemExit('Relationship spine anchor not found')
text = text.replace(relationship_anchor, part2 + relationship_anchor, 1)

# Rename legacy sections after insertion so they are explicitly Part I reference material.
text = text.replace('## 18. Sera and Rhen Relationship Spine', '## 36. Part I Legacy Relationship Spine', 1)
text = text.replace('## 19. Power Discipline', '## 37. Part I Legacy Power Discipline', 1)
text = text.replace('## 20. Political and Institutional Discipline', '## 38. Part I Legacy Political and Institutional Discipline', 1)
text = text.replace('## 21. Casualty and Recovery Discipline', '## 39. Part I Legacy Casualty and Recovery Discipline', 1)
text = text.replace('## 22. Things This Arc Should Avoid', '## 40. Things the Final Arc Should Avoid', 1)
text = text.replace('## 23. Approval Gates Before Chapter 301 Prose', '## 41. Part I Legacy Approval Gates — Superseded by Section 34 Where They Conflict', 1)
text = text.replace('## 24. Proposed End State If the Working Route Is Approved', '## 42. Part I Midpoint End State — Superseded as Series Finale', 1)
text = text.replace('## 25. Handoff Rule', '## 43. Handoff Rule', 1)

# Update obvious old final-arc wording in legacy sections.
text = text.replace('Chapter 400 resolving the chosen arc before any future hook is introduced.', 'Chapter 400 resolving Part I while revealing the approved Part II endgame rather than pretending the series has already ended.')
text = text.replace('no Season 95 prose should imply the conspiracy premise was already locked at Chapter 300;', 'no Season 95 prose should imply the conspiracy premise was already locked at Chapter 300;')
text = text.replace('once the user approves the next-arc foundation, this document can be converted from a planning skeleton into the same locked production role', 'once the user approves the final-arc foundation, this document can be converted from a planning skeleton into the same locked production role')

# Rename the file now that its purpose is explicit.
new_path = Path('docs/FINAL_ARC_OUTLINE.md')
new_path.write_text(text, encoding='utf-8')
path.unlink()

print('Final arc outline patched: 20 seasons / 200 chapters / two parts.')
