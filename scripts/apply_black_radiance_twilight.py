from pathlib import Path

p = Path('docs/FINAL_ARC_SHINRIN_FOUNDATION.md')
s = p.read_text()

old = """He is not part of Wuyue's public Top Ten. The vacant public seat remains vacant. After defecting from Shinrin and proving himself through the war, he is recruited into **The Quaint Teahouse as the Sixth Petal**. Rhen remains the **Hidden Petal**.\n\nHis Established-Paragon status means he does possess a true Domain; its exact name/mechanics remain approval-gated until selected."""
new = """He is not part of Wuyue's public Top Ten. The vacant public seat remains vacant. During Rhen's six-month seclusion, after defecting from Shinrin and proving himself through repeated operations beside Wuyue and Isgard, he is recruited into **The Quaint Teahouse as the Sixth Petal**. Rhen remains the **Hidden Petal**.\n\nThe intended induction point is roughly **the third month of Rhen's seclusion**: late enough that Sera, Tae, Huo, Qin, Kael and the Isgard side have had time to test his loyalty, but early enough that Black Radiance becomes part of the alliance while the Shinrin war is still escalating. **Sera makes the recruitment decision while Rhen is unavailable.**\n\nHis Established-Paragon Domain is permanently named **Twilight Dominion**."""
assert old in s, 'power ceiling block not found'
s = s.replace(old, new)

old = """### 12.6 Distinction From Existing Characters

- **Sera** manipulates commitment, false futures, concealment and Counter-Blooms; this fighter manipulates literal light and darkness qi.
- **Qin** attacks orientation through vibration and echo waves; this fighter attacks visual information through radiance and genuine darkness.
- **Rhen** can overwhelm perception through Moonless Snowfield, but this character's system is narrower and elemental rather than total battlefield perception control.

### 12.7 Character Tone
"""
new = """### 12.6 **Twilight Dominion** — Paragon Domain — LOCKED

Black Radiance's Domain turns the battlefield into a constantly shifting coexistence of literal **Light Qi** and **Darkness Qi**. It is not illusion magic, spatial movement or mental control. The Domain changes the physical radiance, shadow, visual contrast and elemental qi available around every movement.

#### Shadow / Darkness State

- Wherever genuine shadow or Darkness Qi gathers inside the Domain, Black Radiance can suppress reflected light around his body until his outline and movement become extraordinarily difficult to see.
- He can **hide inside connected shadows** by moving physically through them while Darkness Qi erases the visual cues that would normally reveal him. He does not teleport, become intangible or enter another dimension.
- Enemies caught inside the deep shadow cast or expanded by his Darkness Qi become **blinded by real darkness**: ambient and reflected light are swallowed or scattered until ordinary sight becomes useless.
- Nonvisual senses such as Qin-style resonance, touch, hearing or sufficiently refined qi perception can still function, so the darkness is powerful without becoming absolute concealment.

#### Light / Radiance State

- In illuminated regions of the Domain, Black Radiance floods his meridians and movement lines with Light Qi and becomes **blindingly fast**.
- **Radiant Step** and other movement techniques accelerate far beyond their ordinary state because the Domain continuously supplies the radiance his Light Qi propagates through.
- Enemies exposed directly to his concentrated Light Qi become **dazed and visually overwhelmed by genuine blinding radiance**. This is a physical sensory effect rather than mind control.
- Strong opponents can fight through the dazzle, close their eyes, defend by qi sense or use nonvisual perception, but doing so sacrifices normal visual tracking against an Established Paragon moving at Light-Qi speed.

#### Twilight Transition

- Light and Darkness Qi continuously consume, replace and border one another across the Domain, creating moving **twilight boundaries**.
- Crossing from darkness into light lets Black Radiance convert concealed movement directly into explosive Light-Qi acceleration.
- Crossing from light into darkness lets him preserve physical momentum while abruptly removing the visible path of the attack.
- His techniques may therefore change elemental state during one continuous physical action: speed can become concealment, concealment can become speed, and the transition itself is what makes his martial art hardest to read.
- Where concentrated Light Qi and Darkness Qi collide, the opposing elemental pressures can burst outward as destructive twilight force, but this remains a secondary battlefield effect rather than the Domain's only purpose.

#### Core Combat Identity

Inside **Twilight Dominion** the opponent has no comfortable visual state:

- remain in light and Black Radiance becomes terrifyingly fast while the radiance dazzles normal sight;
- retreat into shadow and he becomes much harder to locate while the darkness blinds ordinary vision;
- attempt to move between both and Black Radiance can weaponize the transition faster than most opponents can adapt.

The Domain is the perfected battlefield expression of his existing **Radiant Step**, **Black Veil**, **Piercing Dawn**, **Night Severance** and **Eclipse Crossing**, not a separate magical power set.

### 12.7 Distinction From Existing Characters

- **Sera** manipulates commitment, false futures, concealment and Counter-Blooms; Black Radiance manipulates literal light, darkness and the transition between them.
- **Qin** attacks orientation through vibration and echo waves; Black Radiance attacks ordinary vision through genuine darkness and overwhelming radiance.
- **Huo** disrupts the link between intended and executed martial action; Twilight Dominion does not alter an enemy's decisions or bodily commands.
- **Rhen** can overwhelm perception through Moonless Snowfield, but Black Radiance's system is narrower, elemental and dependent on actual Light Qi / Darkness Qi conditions.

### 12.8 Character Tone
"""
assert old in s, 'distinction block not found'
s = s.replace(old, new)

old = """- eventually chooses the Quaint Teahouse voluntarily after fighting beside Wuyue and Isgard rather than being absorbed on first contact;
- becomes the **Sixth Petal** after the war, while the public Top Ten seat remains empty;"""
new = """- eventually chooses the Quaint Teahouse voluntarily after fighting beside Wuyue and Isgard rather than being absorbed on first contact;
- is recruited by **Sera around the third month of Rhen's seclusion** and becomes the **Sixth Petal** while the public Top Ten seat remains empty;
- Rhen remains the **Hidden Petal** throughout and does not need to approve or vacate his role for the Sixth Petal to exist;"""
assert old in s, 'character tone recruitment block not found'
s = s.replace(old, new)

old = """6. **Black Radiance role — LOCKED:** Shinrin dissident / former covert operative; **Established Paragon**; later recruited as the **Sixth Petal** of the Quaint Teahouse; does **not** take the vacant public Top Ten seat.
7. Name / design **Sigrun's Paragon Domain**.
8. **Yun fate — LOCKED:** assaulted by a Shinrin Paragon, escapes to Isgard, delivers warning, dies; portrayal must remain non-graphic and consequence-focused.
9. Decide whether any Shinrin Paragon defects, is politically divided from the leader, or all ten remain loyal.
10. Decide how much of Shinrin's 200,000+ elite force actually crosses into Isgard before the pact fully mobilizes."""
new = """6. **Black Radiance role — LOCKED:** Shinrin dissident / former covert operative; **Established Paragon**; recruited by Sera as the **Sixth Petal** around month three of Rhen's seclusion; Rhen remains Hidden Petal; Black Radiance does **not** take the vacant public Top Ten seat.
7. **Black Radiance Domain — LOCKED:** **Twilight Dominion**, with shadow concealment / real-darkness blindness, Light-Qi acceleration / blinding dazzle, and transition-based combat between the two elemental states.
8. Name / design **Sigrun's Paragon Domain**.
9. **Yun fate — LOCKED:** assaulted by a Shinrin Paragon, escapes to Isgard, delivers warning, dies; portrayal must remain non-graphic and consequence-focused.
10. Decide whether any Shinrin Paragon defects, is politically divided from the leader, or all ten remain loyal.
11. Decide how much of Shinrin's 200,000+ elite force actually crosses into Isgard before the pact fully mobilizes."""
assert old in s, 'approval gate block not found'
s = s.replace(old, new)

p.write_text(s)
