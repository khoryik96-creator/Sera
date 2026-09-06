from pathlib import Path


def replace_once(path: Path, old: str, new: str) -> None:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{path}: expected exactly one match, found {count}: {old[:100]!r}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")


def insert_after_once(path: Path, anchor: str, insert: str) -> None:
    replace_once(path, anchor, anchor + insert)


# ---------- Phase II map corrections ----------
p = Path("docs/FINAL_ARC_PHASE2_SEASON_MAP.md")

anchor = "Finished reader prose still stops at Season 94. This document is not a claim that Seasons 101–108 are already written.\n\n"
insert = """## Tone carry-forward\n\nPhase II is a war arc, but it must not turn the cast into uniformly grim war archetypes. Preserve the older Quaint contrast in short, natural beats between crises: Rhen can be absurdly powerful and domestically ridiculous when he is present; Sera stays dry rather than sentimental; Tae / Huo remain terrifying idiots without becoming incompetent; Qin's humor stays quiet; Lu remains the exhausted competent adult. Comedy may release tension or deepen family chemistry, but must never undercut casualties, Yun's death, captivity or civilian suffering.\n\n"""
insert_after_once(p, anchor, insert)

replace_once(
    p,
    "### Chapter 361 — The Warning Arrives Without the Woman\nYun's death report reaches Wuyue. Sera, Luo, the Top Ten and the Quaint leadership react to the military facts before anyone has the full truth about Shunto's assault. The Wuyue–Isgard defensive pact is activated immediately.\n",
    "### Chapter 361 — The First Day After the Warning\nPhase II opens **after** the events of Chapters 355–357: Yun has already completed the report, died, Wuyue has already received the warning, and the Wuyue–Isgard defensive pact is already active. Day 1 is therefore mobilisation under grief, not a second delivery of the same message. Jin converts Yun's facts into movement orders; Isgard disperses coast / medical assets; Luo works while the loss is still new; Sera allocates what can leave Wuyue without stripping home defence. In Shinrin, Tsubasa learns that Yun succeeded and understands the original timetable is compromised. Do **not** replay Yun's report or pact activation.\n",
)

replace_once(
    p,
    "### Chapter 363 — Luo Reads What Yun Left Him\nLuo decodes Yun's private medical notation: Axtaya stock, approximate troop scale, Paragon sightings, shipping corridors and the warning that Shinsei is a government-sized military institution rather than a remote guild. A tiny ordinary personal note makes the loss intimate without replacing the military evidence.\n",
    "### Chapter 363 — Luo Reads What Yun Left Him\nThe delayed **outbound coded medical packet** Yun sent before capture reaches / is routed into Wuyue channels; this is not a magically recovered field notebook. Luo decodes its copied notation: Axtaya at state scale, ten Paragon Seats, Isgard as the external objective and the limited evidence Yun judged safe to send early. The final Isgard report remains the fuller operational warning. After the military layer, Luo finds the private shorthand meaning **you forgot to eat again / eat something, idiot**. His response stays small. The field notebook Shunto seized remains compromised unless later returned on-page.\n",
)

replace_once(
    p,
    "### Chapter 367 — The Man Who Says He Has Not Joined\nYurushi reaches Wuyue and gives Sera his first inside Shinsei intelligence. She does not trust him instantly. Lu begins verifying his story against Yun's route, old civilian escape patterns and Shinsei logistics.\n",
    "### Chapter 367 — The Man Who Says He Has Not Joined\nYurushi reaches Wuyue and gives Sera / Luo his first inside Shinsei intelligence. He immediately shares what he directly observed: Yun was held under Shunto's personal medical-security chain, badly injured, clearly subjected to treatment far beyond lawful detention, and unwilling to spend the escape narrating details. He does **not** claim a detailed firsthand confession of the assault. Sera does not trust him instantly; Lu verifies his route history, civilian corridors and Shinsei logistics against Yun's evidence. This prevents Yurushi from inexplicably sitting on direct information for six months while preserving the later fuller reconstruction.\n",
)

replace_once(
    p,
    "### Chapter 391 — Two Paragons Enter Sera's Home\nHaru and Hana attack the Quaint home / support hub expecting Sera, the public Top Ten and Rhen to be absent. They know the household is medically important; they do not know it hides three High Paragons or a 1,000-person Marquis+ organisation.\n",
    "### Chapter 391 — Two Paragons Enter Sera's Home\nHaru and Hana attack the Quaint home / support hub expecting Sera, the public Top Ten and Rhen to be absent. Before the first clash, establish why Haru is feared through the old **Forty-Seven Thrust Duel**: an opponent believed he had blocked or avoided forty-seven spear lines, only for **Carved Spear Dominion** to reveal that the earlier thrusts had built the geometry of the real trap. They know the household is medically important; they do not know it hides three High Paragons or a 1,000-person Marquis+ organisation. Haru's legend should make what follows feel like a terrifying expert walking into a house that is even worse than he expected.\n",
)

replace_once(
    p,
    "### Chapter 395 — Qin Opens the Map\nQin refuses to keep all three hidden Paragons around one building. He remains central while Tae / Huo are redistributed toward weaker regions. Lu turns the first attack into a prediction problem: where would Shinsei strike next if the objective is to force Kael home?\n",
    "### Chapter 395 — Qin Opens the Map\nQin refuses to keep all three hidden Paragons around one building. He remains central while Tae / Huo are redistributed toward weaker regions. Lu turns the first attack into a prediction problem: where would Shinsei strike next if the objective is to force Kael home? In parallel, Tsubasa receives the retreat report and explicitly recalculates Wuyue: its public Top Ten was never its full apex roster. Three High Paragons have been living under Sera and Rhen's roof outside the ranking system, which means Shinsei's pre-war model of Wuyue strength was materially incomplete.\n",
)

replace_once(
    p,
    "### Chapter 407 — Kai Moriyama Arrives\nProperly reintroduce Shinsei No.3 / High Paragon. Kai treats Redline as one tool inside a war rather than a reason for ego duels. His presence visibly raises the front's strategic pressure.\n",
    "### Chapter 407 — Kai Moriyama Arrives\nProperly reintroduce Shinsei No.3 / High Paragon. His history with Tsubasa matters: Kai once **defeated a younger Tsubasa**, and Tsubasa later returned with negotiated terms rather than revenge. That old loss helps explain both Kai's standing and why Tsubasa's legitimacy was never built on pretending he had always been invincible. Present-day Kai treats Redline as one tool inside a war rather than a reason for ego duels. His presence visibly raises the front's strategic pressure.\n",
)

replace_once(
    p,
    "### Chapter 428 — Two High Paragons Against the Orchid\nKai and the fully restored Eirik attack a command / medical corridor whose loss could break allied continuity. Sera intercepts. **Orchid Dominion**, **Crimson Crucible Dominion** and **Crownless Dominion** are all explained through what they do to the fight rather than named as trivia.\n",
    "### Chapter 428 — Two High Paragons Against the Orchid\nKai and the fully restored Eirik attack a command / medical corridor whose loss could break allied continuity. Sera intercepts. This is the definitive multi-Domain rules demonstration: Domains **coexist unless an art explicitly disrupts another**; simultaneous activation does not automatically cancel the weaker one. **Orchid Dominion** strengthens Sera's Orchid execution / Counter-Bloom economy and imposes its weakening conditions where her rule reaches the opponents; **Crimson Crucible Dominion** makes prolonged close combat increasingly punishing through heat, dehydration and Kai's conditioned output; **Crownless Dominion** suppresses hostile ambient-qi replenishment. Overlap creates interacting battlefield rules, not a generic aura collision. Sera must actively solve the combined conditions while Kai and Eirik are also fighting inside Orchid's pressure.\n",
)

replace_once(
    p,
    "### Chapter 437 — Tsubasa Has Still Not Entered the Field\nShinsei's strongest conventional cultivator remains physically fresh relative to the months-worn forward Paragons. Reports / older Heaven Gate history make clear that the war has not yet seen Shinsei's ultimate martial reserve. Do not reveal his new Redline apex package in full yet.\n",
    "### Chapter 437 — Tsubasa Has Still Not Entered the Field\nShinsei's strongest conventional cultivator remains physically fresh relative to the months-worn forward Paragons. The **Heaven Gate** history is finally told clearly enough to matter: Tsubasa faced **three prepared Paragons**, completed **One Chain Binds Heaven** under that pressure, and emerged as a Peak Paragon. Combined with Seven Bridges and Kai's old victory over his younger self, the legend shows evolution rather than effortless predestination. The war has still not seen Shinsei's ultimate martial reserve. Do not reveal his new Redline apex package in full yet.\n",
)

replace_once(
    p,
    "### Chapter 440 — How Long?\nRhen opens his eyes. His first reaction is understated rather than a declaration of vengeance. He asks how long he has been gone. Only after the answer does he begin learning about Yun, Sera, Isgard, the invasion and the six months everyone else carried without him. End Phase II here.\n",
    "### Chapter 440 — How Long?\nRhen opens his eyes. His first reaction is understated rather than a declaration of vengeance. He asks, **How long?** End Phase II on the question itself. Do **not** answer it here and do not wake him again in Season 109. Chapter 441 begins directly with Lu's already-locked answer — **Six months. And twelve days.** — before Rhen learns about Yun, Sera, Isgard, the invasion and the six months everyone else carried without him.\n",
)

# ---------- Phase III notebook clarification ----------
p = Path("docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT_2.md")
replace_once(
    p,
    "Luo arrived last.\n\nHe carried Yun's notebook.\n\nThe same one he had kept closed for weeks after her death because opening it had felt too much like admitting there would be no new page.\n",
    "Luo arrived last.\n\nHe carried the **second notebook Yun had left in Wuyue before Shinrin**.\n\nThe same one he had held while she was overdue, then kept closed for weeks after her death because opening it had felt too much like admitting there would be no new page. The field notebook Shunto seized was a different object.\n",
)

# ---------- Phase III Xie promise/return dramatization ----------
p = Path("docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT_3.md")
anchor = "Shen Rui and Xie Wuchen visited together once and destroyed half a training yard in what both described as a light exchange.\n\nSera billed them.\n\n"
insert = """At the gate, Xie adjusted his travel coat.\n\n“I'll be back in eight days.”\n\nSera looked at him.\n\nThe old Xie would have said *probably*.\n\nOr *if I am nearby*.\n\nOr nothing at all.\n\nShen Rui noticed too.\n\n“That sounded like a promise.”\n\nXie gave him a flat look.\n\n“Do not make it unpleasant.”\n\nEight days later, Lu placed an extra cup on the table before noon.\n\nSera looked at it.\n\n“You believe him?”\n\nLu opened a ledger.\n\n“He said eight days.”\n\nThe front door opened before Sera could answer.\n\nXie stepped inside with road dust on his shoulders.\n\nHe looked at the waiting cup.\n\nThen at Lu.\n\n“Nine minutes early,” Lu said.\n\n“Wind.”\n\nNobody congratulated him.\n\nThat would have made it ceremonial.\n\nXie sat down and drank the tea.\n\nFor him, returning when promised was enough.\n\n"""
insert_after_once(p, anchor, insert)

# ---------- Audit checklist status / wording ----------
p = Path("docs/FINAL_ARC_PHASE1_FINAL_AUDIT_CHECKLIST.md")
text = p.read_text(encoding="utf-8")
text = text.replace(
    "- [ ] The notebook Luo carries at the **Chapter 496 memorial** must be treated as the notebook already left in Wuyue / retained from their shared work unless later prose explicitly dramatizes Shinsei returning Yun's seized field notebook after the war. No unexplained notebook teleportation.",
    "- [x] The **Chapter 496 memorial** now explicitly identifies Luo's notebook as the second notebook Yun left in Wuyue; the field notebook Shunto seized is a different object. No unexplained notebook teleportation.",
    1,
)
text = text.replace(
    "- [ ] Yurushi therefore does **not** possess a detailed firsthand assault confession in Phase I.",
    "- [x] Yurushi therefore does **not** possess a detailed firsthand assault confession in Phase I.",
    1,
)
text = text.replace(
    "- [ ] Epilogue must preserve the small character payoff that Xie learns to **return when he said he would**, not merely appear for another fight.",
    "- [x] Chapter 499 now dramatizes Xie learning to **return when he said he would**: he names eight days and comes back eight days later, without turning it into ceremony.",
    1,
)
text = text.replace(
    "- [ ] **Chapter 361 cannot deliver Yun's warning again.** Phase I already completes the report, death, Wuyue receipt and pact activation in Chapters 355–357.\n- [ ] Rewrite Chapter 361 as **the first day after the warning**: mobilization already underway, grief colliding with logistics, Isgard scrambling, Shinsei realizing Yun succeeded.\n- [ ] Chapter 362 can then pay off why Rhen's door cannot safely be opened.\n- [ ] Chapter 363 decodes Yun's surviving coded packet and private Luo line.",
    "- [x] **Phase II map fixed:** Chapter 361 no longer delivers Yun's warning again; it opens on Day 1 after the already-completed warning/death/pact activation.\n- [x] **Phase II map fixed:** Chapter 361 is mobilisation under grief, with Isgard scrambling and Tsubasa learning Yun succeeded.\n- [x] Chapter 362 remains the safe-interruption payoff for Rhen's closed door.\n- [x] **Phase II map fixed:** Chapter 363 explicitly decodes Yun's surviving outbound coded packet and private Luo line, not the seized field notebook.\n\n> Phase II chapter **prose** remains unwritten; these checkmarks mean the continuity/map defect is fixed before drafting, not that Chapters 361–363 have already been prose-integrated.",
    1,
)
text = text.replace(
    "- [ ] Kai once defeated young Tsubasa and Tsubasa returned with negotiated terms rather than revenge.\n- [ ] Tsubasa's Heaven Gate three-Paragon legend and **One Chain Binds Heaven**.\n- [ ] Haru's **Forty-Seven Thrust Duel** before his major home-front fight.\n- [ ] Haru/Hana attack Quaint and discover Tae/Huo/Qin are hidden High Paragons.\n- [ ] Tsubasa explicitly recalculates Wuyue after learning its public ranking board was never its true apex roster.",
    "- [x] **Phase II map placement locked:** Kai once defeated young Tsubasa and Tsubasa returned with negotiated terms rather than revenge — Chapter 407.\n- [x] **Phase II map placement locked:** Tsubasa's Heaven Gate three-Paragon legend and **One Chain Binds Heaven** — Chapter 437.\n- [x] **Phase II map placement locked:** Haru's **Forty-Seven Thrust Duel** before his major home-front fight — Chapter 391.\n- [x] Haru/Hana attack Quaint and discover Tae/Huo/Qin are hidden High Paragons — existing Season 104 route preserved.\n- [x] **Phase II map placement locked:** Tsubasa explicitly recalculates Wuyue after learning its public ranking board was never its true apex roster — Chapter 395.\n\n> These are map-level placements. They remain prose-writing obligations when Seasons 101–108 are drafted.",
    1,
)
# Add final status summary after the title block.
needle = "Do not call an item \"fixed in prose\" merely because it exists in a planning/insert file.\n\n---\n"
summary = "Do not call an item \"fixed in prose\" merely because it exists in a planning/insert file.\n\n**Current implementation status:** all identified Phase I prose defects are now integrated into the chapter files; cross-phase continuity defects are corrected in the Phase II map; the two immediately-fixable Phase III ambiguities/payoffs (Yun's notebook identity and Xie's promised return) are now corrected in merged-prose descendants on this branch. Remaining unchecked items are genuine future Phase II prose obligations or intentional tone rules, not unresolved Phase I contradictions.\n\n---\n"
if needle not in text:
    raise RuntimeError("Checklist status insertion anchor missing")
text = text.replace(needle, summary, 1)
p.write_text(text, encoding="utf-8")

# Remove one-shot files from the commit produced by this workflow.
Path("scripts/apply_cross_phase_audit_fixes.py").unlink(missing_ok=True)
Path(".github/workflows/apply-cross-phase-audit-fixes.yml").unlink(missing_ok=True)

print("Cross-phase audit fixes applied successfully.")
