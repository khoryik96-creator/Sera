from pathlib import Path

p = Path('docs/FINAL_ARC_OUTLINE.md')
text = p.read_text(encoding='utf-8')


def req(old: str, new: str) -> None:
    global text
    if old not in text:
        raise SystemExit(f'missing required text: {old[:140]}')
    text = text.replace(old, new)

# Opening cultivation table.
req(
    '| **Sera** | **Peak Paragon** · retains **Orchid Dominion** · gains a true Ultimate once its option is selected. |',
    '| **Sera** | **Peak Paragon** · retains **Orchid Dominion** · possesses **Ultimate — Ten Thousand Blooms**. |',
)
req(
    '| **Tae Muyeon** | **High Paragon** · new Domain name/mechanics pending user selection. |',
    '| **Tae Muyeon** | **High Paragon** · **Horizon Cage Dominion**. |',
)
req(
    '| **Huo Wujin** | **High Paragon** · new Domain name/mechanics pending user selection. |',
    '| **Huo Wujin** | **High Paragon** · **Endless Dominion**. |',
)
req(
    '| **Qin Luo** | **High Paragon** · new Domain name/mechanics pending user selection. |',
    '| **Qin Luo** | **High Paragon** · **Echo Dominion**. |',
)
req(
    '| **Kael Veyran** | **Newly ascended Paragon** · new Domain name/mechanics pending user selection. |',
    '| **Kael Veyran** | **Newly ascended Paragon** · **Worldweight Dominion**. |',
)

locked_section = '''### 0.4 Locked Final-Arc Domains and Sera Ultimate

The final-arc power selections are no longer approval gates:

- **Sera — Ultimate: Ten Thousand Blooms.** While **Orchid Dominion** is active, all valid Counter-Blooms already earned may bloom simultaneously. During the Ultimate interval, new hostile offensive commitments generate their Counter-Blooms immediately and Sera may choose a different established Orchid response from each opening. The Ultimate consumes a major portion of Sera's reserve but **does not collapse Orchid Dominion**; the Domain remains active afterward.
- **Tae Muyeon — Horizon Cage Dominion.** Hostile committed movement and attack trajectories forge an iron-qi prison from the enemy's own routes. Enemies may break out, but every escape consumes power and causes the cage to rebuild **denser and smaller**. Repeated breakouts wear down body and qi until the contracting iron pressure begins bruising, disrupting and eventually damaging meridians. The meridian damage is a consequence of physical compression, not circulation magic.
- **Huo Wujin — Endless Dominion.** The Nine Meridian Wheels continuously rotate battlefield rhythm so hostile intent and execution separate: left may resolve right, retreat may become advance, an attack may collapse into defence, or a defence may resolve as an unintended offensive motion. This is **not mind control**; the target's intent remains theirs while physical/cultivation response routes are forced out of alignment. If an enemy successfully corrects one Wheel-induced mismatch, repeating that correction becomes progressively worse as another Wheel overlaps the next exchange.
- **Qin Luo — Echo Dominion.** Overlapping resonance renders hostile perception functionally blind and destroys stable directional awareness. Every hostile committed action also generates an **equivalent-force echo wave** redirected at its source: arrows, sword swings and internal-force releases create resonance counterparts of comparable committed force. Qin copies **force/resonance, not the technique, weapon property or special effect**.
- **Kael Veyran — Worldweight Dominion.** Force committed through connected earth and sand creates corresponding physical burden. The harder an enemy strikes, charges or anchors, the more pressure Kael can redistribute into stance, weapon, armour or terrain. It is mountain-and-sand qi pressure, **not supernatural gravity**.

The compact mechanics reference is `docs/FINAL_ARC_POWER_OPTIONS.md`, whose former option tables are now replaced by the locked selections.
'''
req(
    'Detailed selectable Domain and Sera-Ultimate candidates live in `docs/FINAL_ARC_POWER_OPTIONS.md` until the user chooses them.',
    locked_section,
)

# Opening power baseline table.
req(
    '| **Sera** | **Peak Paragon · Orchid Dominion** | Mature Paragon refinement plus a true Ultimate after user selection; no new realm required. |',
    '| **Sera** | **Peak Paragon · Orchid Dominion · Ultimate: Ten Thousand Blooms** | Mature Paragon refinement and Ultimate mastery; no new realm required. |',
)
req(
    '| **Tae Muyeon** | **High Paragon** | New Domain pending selection; iron-horizon identity remains distinct. |',
    '| **Tae Muyeon** | **High Paragon · Horizon Cage Dominion** | Iron-horizon geometry turns hostile movement into a shrinking self-built prison that exhausts escape attempts and eventually damages meridians through compression. |',
)
req(
    '| **Huo Wujin** | **High Paragon** | New Domain pending selection; Nine Meridian Wheels remain his foundation. |',
    '| **Huo Wujin** | **High Paragon · Endless Dominion** | Nine Meridian Wheels first disrupt intent-to-execution alignment, then make repeated solutions progressively fail through overlapping Wheel responses. |',
)
req(
    '| **Qin Luo** | **High Paragon** | New Domain pending selection; blindness remains part of how he perceives and fights. |',
    '| **Qin Luo** | **High Paragon · Echo Dominion** | Hostile perception is resonance-blinded while the committed force of hostile actions returns as equivalent echo-wave attacks. Qin remains blind and navigates by his established vibration perception. |',
)
req(
    '| **Kael Veyran** | **Newly ascended Paragon** | First public Five Sovereign to reach Paragon; new Domain pending selection. |',
    '| **Kael Veyran** | **Newly ascended Paragon · Worldweight Dominion** | First public Five Sovereign to reach Paragon; connected terrain stores and redistributes the physical burden created by hostile commitment. |',
)

# Core chapter language.
text = text.replace(
    'The scene establishes the chosen new Domains once approved and makes clear that Rhen\'s protection accelerated their foundations without making any two of them fight alike.',
    'The scene establishes **Horizon Cage Dominion**, **Endless Dominion** and **Echo Dominion**, and makes clear that Rhen\'s protection accelerated their foundations without making any two of them fight alike.',
)
text = text.replace(
    'The three should disagree sometimes. Peak Sovereign does not make them interchangeable personalities.',
    'The three should disagree sometimes. High Paragon does not make them interchangeable personalities.',
)

# Final-arc approval gates: remove already-resolved growth/domain questions while preserving true finale gates.
req(
    'The following should be decided before the relevant material becomes finished reader canon:\n\n1. **Structure — LOCKED:**',
    'The following should be decided before the relevant material becomes finished reader canon. **The two-year cultivation baseline, Sera\'s Ten Thousand Blooms, Tae\'s Horizon Cage Dominion, Huo\'s Endless Dominion, Qin\'s Echo Dominion and Kael\'s Worldweight Dominion are already locked and are not approval gates.**\n\n1. **Structure — LOCKED:**',
)
req(
    '19. **Frozen Petals Garden after the war and its final status by Chapter 499.**',
    '19. **Frozen Petals Garden final status by Chapter 499.** The two-year post-war extension over Sera, Qin, Tae, Huo and Lu is locked; only what happens after that interval and by the series ending remains to decide.',
)
req(
    '21. **Whether any of Tae/Huo/Qin approaches Paragon. Default: none crosses.**',
    '21. **Tae/Huo/Qin growth after High Paragon.** Their High-Paragon opening state and selected Domains are locked; default is no further realm jump unless explicitly approved.',
)
req(
    '22. **Sera\'s final combat:** preferred route is a mature Orchid Dominion victory without a new realm.',
    '22. **Sera\'s final combat:** Peak-Paragon **Orchid Dominion + Ten Thousand Blooms** are locked tools; the exact final opponent, tactical use and outcome remain to decide without requiring a new realm.',
)

# Proposed final series state.
req(
    '- Sera a mature Paragon who never needed a second Domain or a new realm to finish her story;',
    '- Sera a **Peak Paragon** who finishes with **Orchid Dominion** and **Ten Thousand Blooms**, without needing a second Domain or a realm above Paragon;',
)
req(
    '- Tae, Huo and Qin still distinct Peak Sovereigns whose final importance comes from what they protect and how they use authority, not mandatory Paragon promotions;',
    '- Tae, Huo and Qin still distinct **High Paragons** whose **Horizon Cage Dominion**, **Endless Dominion** and **Echo Dominion** express different martial identities and whose final importance comes from how they use that power and authority;',
)
req(
    '- Kael, Liang, Jin, Lei and Rui having final contributions that grow from their established strengths rather than sudden upgrades;',
    '- Kael, Liang, Jin, Lei and Rui having final contributions that grow from their locked final-arc opening strengths — including Kael\'s **Worldweight Dominion** — rather than surprise mid-finale promotions;',
)

# Part I legacy cleanup.
req(
    '10. The Top Ten remain strategically relevant even where individuals are weaker than Sera or the hidden Peaks.',
    '10. The Top Ten remain strategically relevant even where individuals are weaker than Sera or the Quaint Teahouse\'s hidden High Paragons.',
)
req(
    '14. **Frozen Petals Garden after the war:** end the trio\'s emergency extension, reduce it to a narrow emergency alert or keep some other approved form.',
    '14. **Frozen Petals Garden after the locked two-year rebuilding interval:** decide only whether the protection continues, changes or ends later; the full two-year extension itself is already canon-locked.',
)
req(
    '17. **Sera\'s combat progression:** refinement of Orchid Dominion only by default; no second Domain.',
    '17. **Sera\'s combat progression:** **Ten Thousand Blooms** is locked as her Ultimate and Orchid Dominion remains active after its use; no second Domain is required.',
)
req(
    '- Frozen Petals Garden\'s wartime extension receiving an explicit post-emergency decision;',
    '- Frozen Petals Garden having remained over the approved core for the locked two-year rebuilding interval, with only its later continuation or withdrawal left for an explicit decision;',
)

# Preserve structure and basic integrity.
if text.count('### Chapter ') != 200:
    raise SystemExit(f'chapter count changed: {text.count("### Chapter ")}')
for token in [
    'Ten Thousand Blooms',
    'Horizon Cage Dominion',
    'Endless Dominion',
    'Echo Dominion',
    'Worldweight Dominion',
]:
    if token not in text:
        raise SystemExit(f'missing locked token: {token}')

p.write_text(text, encoding='utf-8')
