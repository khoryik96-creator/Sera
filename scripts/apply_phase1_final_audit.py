from pathlib import Path


def replace_once(path: Path, old: str, new: str) -> None:
    text = path.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{path}: expected exactly one match, found {count}: {old[:80]!r}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")


def insert_before_once(path: Path, anchor: str, insert: str) -> None:
    replace_once(path, anchor, insert + anchor)


def insert_after_once(path: Path, anchor: str, insert: str) -> None:
    replace_once(path, anchor, anchor + insert)


# Ch316 — Seven Bridges / civilian legitimacy.
p = Path("docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT_2.md")
anchor = "Yun watched them run past.\n\n"
insert = """A woman selling tea from a roadside kettle noticed where Yun was looking.\n\n“Children still do that?” Yun asked.\n\n“Every spring.”\n\n“For Shinsei?”\n\nThe woman wiped her hands on her apron.\n\n“For the bridge.”\n\nYun looked at her.\n\n“What bridge?”\n\nThe question earned genuine surprise.\n\n“You really are foreign.”\n\n“So I have been told.”\n\n“Seven Bridges.”\n\nYun waited.\n\n“Before Shinsei held the river country properly, three clans fought over the crossings. Not soldiers fighting soldiers. Everyone. Farmers searched. Ferries burned. Houses emptied because somebody's cousin wore the wrong crest.”\n\nHer face changed while she spoke.\n\nNot reverence.\n\nMemory inherited from somebody else's fear.\n\n“My mother was six.”\n\nYun said nothing.\n\n“By the last night, six bridges were gone. Burned or broken. The clans were fighting over the seventh while families were still trying to cross.”\n\n“Tsubasa Kurokawa?”\n\nThe woman nodded.\n\n“He was young then. Not what he is now.”\n\n“What did he do?”\n\n“Stayed.”\n\nYun waited for more.\n\nThe woman shrugged.\n\n“That is the story.”\n\n“He fought three clans.”\n\n“Probably.”\n\n“You don't know?”\n\n“I know my mother crossed.”\n\nThat stopped Yun.\n\n“They say he held the last bridge through the night. Kept the supports standing. Kept the fighting away from the families. Didn't chase anyone when the clans pulled back. Didn't leave when people started saying the road was clear.”\n\nThe woman's voice softened.\n\n“He stayed until the last family crossed.”\n\nThe road moved around them.\n\nA cart wheel squeaked.\n\nSomeone argued over onions.\n\nTwo children ran past the Shinsei marker with ribbon tangled around one wrist.\n\nYun looked at the broken circle joined by one line.\n\nPropaganda could invent a hero.\n\nIt could polish one.\n\nIt could not easily manufacture the exact way an ordinary woman still measured a martial legend by whether her mother reached the other bank alive.\n\nThat was more inconvenient.\n\nA cruel government was easy to understand.\n\nA government built by people who had once done something worth loving was much more dangerous.\n\nBecause people did not obey only from fear.\n\nSometimes they remembered the bridge.\n\n"""
insert_after_once(p, anchor, insert)

# Ch319 — timing correction.
p = Path("docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT_3.md")
replace_once(p, "Her merchant identity had survived five weeks.", "Her merchant identity had survived more than three weeks.")

# Ch331 — make it the beginning/living-through of month three, not three completed months.
p = Path("docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT.md")
replace_once(p, "Three months announced itself in small humiliations.", "The third month announced itself in small humiliations.")
replace_once(p, "Three months.\n\nShe had promised three weeks.", "The third month.\n\nShe had promised three weeks.")
replace_once(p, "Three months under one government.", "The third month under one government.")
replace_once(p, "Three months of finding things that worked well enough to make the things beneath them harder to hate cleanly.", "The third month of finding things that worked well enough to make the things beneath them harder to hate cleanly.")
replace_once(p, "Three months of watching a state capable of feeding villages also prepare medicine for an invasion.", "The third month of watching a state capable of feeding villages also prepare medicine for an invasion.")
replace_once(p, "Three months of being hunted by a man whose competence had become part of the architecture around her.", "The third month of being hunted by a man whose competence had become part of the architecture around her.")

# Ch335 — private Luo line + guarantee it travels in surviving outbound packet.
p = Path("docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT_2.md")
anchor = "Yun closed the notebook and stared at the cover.\n\n"
insert = """Yun finished the troop-rotation sequence and noticed the empty bottom margin.\n\nThere was room for one more line.\n\nNot enough for anything useful.\n\nWhich was why she used it.\n\nShe wrote three apparently unrelated medical marks beneath the last supply notation:\n\n**Low heat. Empty stomach. Repeated diagnostic fixation.**\n\nA Shinsei clerk would read it as a symptom cluster.\n\nA physician might assume it described one of the Axtaya cases.\n\nLuo would know better.\n\nIt was an old joke from the second winter they had worked together. He would skip meals while diagnosing difficult patients, then become irritated when his hands shook and insist the problem was inadequate tea.\n\nYun had once written the same three marks across his breakfast bowl.\n\nTranslated properly, they meant only:\n\n**You forgot to eat again.**\n\nYun looked at the line.\n\nThen added one final notation beside it.\n\n**Treat before recurrence.**\n\nEat something, idiot.\n\nHer mouth moved very slightly.\n\nThen she went back to the war.\n\n"""
insert_before_once(p, anchor, insert)
anchor2 = "Yun sealed the pages beneath legitimate dermatology reports purchased from a retired physician.\n\n"
insert2 = """Yun looked once more at the three marks she had copied into the bottom margin.\n\nThey were not necessary to the invasion warning.\n\nShe had copied them anyway.\n\nIf the packet reached Wuyue, Luo would read the troop estimate first.\n\nThe Ten Seats second.\n\nIsgard third.\n\nThen, somewhere beneath all the numbers, he would find her telling him to eat.\n\nYun considered removing it.\n\nDid not.\n\nThe packet needed to survive her.\n\nThat did not mean every surviving line had to belong to the war.\n\n"""
insert_before_once(p, anchor2, insert2)

# Ch349 — explicit Yurushi knowledge boundary after Yun's contact flinch.
p = Path("docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT_3.md")
anchor = "They continued.\n\nBy dusk, they reached the forgotten ridge path.\n"
insert = """They continued.\n\nYurushi watched her for several steps.\n\nNot the blood.\n\nNot only the damaged circulation marks around her wrists.\n\nThe whole picture.\n\nThe too-careful way she kept one side away from contact. The medicinal smell of a detention compound. The bruising that did not match a clean arrest. The exhaustion beneath the poisoner's discipline. And the reflex that had stopped his hand before either of them chose it.\n\nHis face went still.\n\n“What did Takamori do?”\n\nYun's eyes met his.\n\nFor one moment, something behind them became very cold.\n\nThen she looked toward the route north.\n\n“Later.”\n\nHe did not move.\n\nYun added, “If there is one.”\n\nThat answered enough.\n\nNot everything.\n\nEnough.\n\nYurushi's jaw tightened.\n\nYun pointed north.\n\n“Isgard first.”\n\nHe nodded once.\n\nNo demand for details.\n\nNo promise to avenge her.\n\nNo attempt to turn her escape into his anger.\n\n“Isgard first,” he agreed.\n\nBy dusk, they reached the forgotten ridge path.\n"""
replace_once(p, anchor, insert)

# Ch353 — restore old domestic Sera/Rhen texture before the medical conversation.
p = Path("docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT.md")
anchor = "Now the door was locked.\n\nFinally.\n\nSera crossed the room.\n"
insert = """Now the door was locked.\n\nFinally.\n\nThen the bedroom window refused to close.\n\nRhen stared at it.\n\nSera watched from beside the bed.\n\n“You're losing.”\n\n“I'm assessing it.”\n\n“The window?”\n\n“Yes.”\n\n“It has two hinges.”\n\n“One is misaligned.”\n\n“You once stopped a mountain from falling on a village.”\n\n“That mountain was structurally simpler.”\n\nSera covered her mouth.\n\nRhen looked over.\n\n“Are you laughing?”\n\n“No.”\n\n“You are.”\n\n“Petals Monarch defeated by carpentry.”\n\n“Windows are not carpentry.”\n\n“What are they?”\n\nRhen looked back at the frame.\n\n“Currently hostile.”\n\nSera lost the fight and laughed into her hand.\n\nRhen gave the window one final, deeply offended look.\n\nThen he shut it with two fingers and an amount of precision qi that could probably have severed a fortress gate without disturbing the wall around it.\n\nSera stared.\n\n“You cheated.”\n\n“It is closed.”\n\n“You used cultivation on a window.”\n\n“It was hostile.”\n\nRhen returned to the edge of the bed.\n\nFor a few breaths, tomorrow was not a medical danger or the beginning of months apart.\n\nIt was simply tomorrow.\n\nAnd tonight, Rhen had lost to a window.\n\nSera crossed the room.\n"""
replace_once(p, anchor, insert)

# Update audit checklist status for items now integrated into actual prose.
p = Path("docs/FINAL_ARC_PHASE1_FINAL_AUDIT_CHECKLIST.md")
text = p.read_text(encoding="utf-8")
updates = {
    "- [ ] **Chapter 335 private line:**": "- [x] **Chapter 335 private line:**",
    "- [ ] IMPORTANT DELIVERY FIX:": "- [x] IMPORTANT DELIVERY FIX:",
    "- [ ] Change Chapter 319's \"five weeks\" wording": "- [x] Change Chapter 319's \"five weeks\" wording",
    "- [ ] Preserve Chapter 320 Day-26 sequence.": "- [x] Preserve Chapter 320 Day-26 sequence.",
    "- [ ] Chapter 330 being **more than six weeks**": "- [x] Chapter 330 being **more than six weeks**",
    "- [ ] \"Three months announced itself\"": "- [x] \"Three months announced itself\"",
    "- [ ] \"Three months. She had promised three weeks.\"": "- [x] \"Three months. She had promised three weeks.\"",
    "- [ ] Other Chapter 331 statements": "- [x] Other Chapter 331 statements",
    "- [ ] Chapters 332–339 then consume": "- [x] Chapters 332–339 then consume",
    "- [ ] Chapter 340 capture lands": "- [x] Chapter 340 capture lands",
    "- [ ] The **Chapter 363** Phase II decode": "- [x] The **Chapter 363** Phase II decode",
    "- [ ] The private \"you forgot to eat\" line": "- [x] The private \"you forgot to eat\" line",
    "- [ ] **Seven Bridges** must be folded": "- [x] **Seven Bridges** must be folded",
    "- [ ] Yun must recognize that civilian affection": "- [x] Yun must recognize that civilian affection",
    "- [ ] Fold Chapter 349 information-boundary insert": "- [x] Fold Chapter 349 information-boundary insert",
    "- [ ] Fold the hostile-window domestic scene": "- [x] Fold the hostile-window domestic scene",
    "- [ ] Hostile-window scene before seclusion.": "- [x] Hostile-window scene before seclusion.",
}
for old, new in updates.items():
    if old not in text:
        raise RuntimeError(f"Checklist anchor missing: {old}")
    text = text.replace(old, new, 1)
p.write_text(text, encoding="utf-8")

# Remove one-shot automation from the commit it creates.
Path("scripts/apply_phase1_final_audit.py").unlink(missing_ok=True)
Path(".github/workflows/apply-phase1-final-audit.yml").unlink(missing_ok=True)

print("Phase I final audit fixes applied successfully.")
