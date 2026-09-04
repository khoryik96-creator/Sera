from pathlib import Path

# Update compact power reference.
p = Path('docs/FINAL_ARC_POWER_OPTIONS.md')
s = p.read_text()
old = '''## 2. Locked Rhen — Two-Year Evolution

Rhen gains no mandatory new named technique. His existing arts evolve through dramatically denser, purer qi and greater scale.

### 2.1 Frozen Petals Garden — Energy Condensation

- Roughly **1% of Rhen's current output now carries the effective qi density that previously required 100%**.
- His current full state therefore represents about **100× the effective qi density / usable power** of his prior full state.
- This is not a requirement to narrate every attack as a literal damage multiplier; different arts express the density differently.
- Every offensive art nevertheless has a vastly higher lethal ceiling.
'''
new = '''## 2. Locked Rhen — Two-Year Evolution

Rhen gains no mandatory new named technique. His existing arts evolve because, late in the peaceful rebuilding interval, he deliberately enters another seclusion to solve a problem created by **Frozen Petals Garden** itself: his reserve is regenerating and accumulating power faster than his body should continue carrying it in its old diffuse state.

### 2.1 Six-Month-Plus Seclusion — Condensing One Hundred Into One

By this stage **Frozen Petals Garden** replenishes Rhen's internal energy at an absurd rate. After extreme expenditure, his reserve can return to effectively full strength in roughly **one day** under ordinary conditions.

That recovery speed means his body is repeatedly being refilled with an enormous quantity of raw qi. Rather than allow the reservoir to keep expanding outward, Rhen chooses to compress it.

He enters seclusion for **a little over six months**.

The task is not to gain another realm. It is to force his existing full reserve into a far denser state and make his meridians, body and passive stable enough to carry it safely.

During the process:

- Rhen repeatedly compresses a full reservoir instead of merely spending it;
- **100% of his former full-state energy is condensed into the equivalent of 1% of his new usable reserve**;
- Frozen Petals Garden keeps replenishing the energy involved in each refinement cycle, so the compression has to be repeated and stabilized again and again;
- his meridians and physical vessel gradually adapt to carrying ultra-dense qi rather than a larger diffuse reservoir;
- the final stabilization takes months because the entire reserve must become equally dense and safe, not because Rhen lacks energy.

When the seclusion is complete:

- **new 1% ≈ old 100%** in effective qi density / usable force;
- **new 100% ≈ old 10,000%**, so his full current state is roughly **100× his previous full-state effective power**;
- this is the intended meaning of the user's **100% × 100** description;
- Frozen Petals Garden still replenishes the new ultra-dense reserve extraordinarily quickly, allowing Rhen to recover to full energy in roughly a day after extreme expenditure;
- the condensation does not create a named realm above Paragon. It makes normal ranking language even less useful for Rhen.

This seclusion is the direct cause of the later scale increases to his existing techniques and passive. **One percent of present Rhen can reproduce what once required essentially everything he had.** Full output has a vastly higher ceiling.

The density should not be narrated as a mandatory literal 100× damage multiplier every time he moves. Each art converts the denser qi differently: destructive force, speed, control, healing scale, stasis authority, penetration, endurance or range.

### 2.2 Seclusion Timing — Rhen Leaves One Day Before the Crisis Begins

Rhen **enters seclusion one day before Yun Shizhen's death is discovered / confirmed in Isgard and the emergency warning is sent to Wuyue**.

- He has no knowledge of Yun's fate when he begins seclusion.
- His decision to cultivate is unrelated to Shinrin; he is solving his own increasingly dangerous energy-density problem.
- The timing deliberately removes Wuyue and Isgard's strongest emergency factor at the exact moment the Shinrin crisis becomes visible.
- Rhen remains in seclusion for **more than six months** while Sera, Tae, Huo, Qin, Kael, Wuyue and Isgard investigate, mobilize, fight and survive without being able to call him in.
- The arc must not use Rhen as an available battlefield solution during this period.
- His eventual return happens only after the condensation is truly complete and should occur when the allied side has reached a genuinely desperate point.

### 2.3 Frozen Petals Garden — Violet Frozen-Petal Aura

After the condensation succeeds, the visible expression of Rhen's qi changes.

- His familiar frozen petals remain the defining motif, but the frost-white petals now carry a **pale violet / purplish radiance** through their edges and centres.
- When Rhen is not deliberately suppressing himself, a faint **purple-tinted frozen-petal aura** drifts around him as tiny amounts of ultra-dense qi escape harmlessly into the air.
- Higher output makes the violet tone deeper and the surrounding petals more numerous.
- The colour change is **not a new element, corruption, transformation or separate martial art**. It is the visual symptom of qi compressed far beyond its earlier density.
- Rhen can still suppress the aura completely when he wants to look like an ordinary healer or tea-shop worker.
'''
assert old in s, 'Rhen evolution block not found'
s = s.replace(old, new)
s = s.replace('### 2.2 Sanctuary of Petals', '### 2.4 Sanctuary of Petals')
s = s.replace('### 2.3 Petals in Stasis', '### 2.5 Petals in Stasis')
s = s.replace('### 2.4 Petals Beneath a Frozen Moon', '### 2.6 Petals Beneath a Frozen Moon')
p.write_text(s)

# Update Shinrin foundation chronology and lock Black Radiance direction.
p = Path('docs/FINAL_ARC_SHINRIN_FOUNDATION.md')
s = p.read_text()
s = s.replace(
    "Tae's additional skills, the Shinrin ruling-guild name, Sigrun's Domain, and the new light/darkness unranked character remain approval-gated until selected. **Axtaya** is now locked as the name of Shinrin's life-burning amplifier poison, and Yun Shizhen's final fate is locked below.",
    "Tae's additional skills, the Shinrin ruling-guild name, Sigrun's Domain, and the light/darkness master's **personal name** remain approval-gated. **Axtaya**, Yun Shizhen's final fate, the title **Black Radiance**, the Shinrin-dissident role, and the literal Light Qi / Darkness Qi skill direction are locked below."
)
s = s.replace(
    "One of Shinrin's Paragons attacks her. During that attack, **Yun is sexually assaulted**.",
    "One of Shinrin's **four Established Paragons** attacks her. The attacker is **not** the Peak-Paragon guild leader; the exact officer number and identity remain to be named. During that attack, **Yun is sexually assaulted**."
)
needle = '''Isgard then sends an urgent formal warning to **Wuyue**, activating the political and defensive relationship built during the previous two peaceful years.

This replaces the earlier route where Wuyue would search for and recover Yun alive. Yun's successful escape and warning become the catalyst that exposes Shinrin.
'''
replacement = '''Isgard then sends an urgent formal warning to **Wuyue**, activating the political and defensive relationship built during the previous two peaceful years.

### 7.1 Rhen Enters Seclusion One Day Before Yun's Death Is Discovered

Rhen is **not available** when the Shinrin crisis breaks.

Exactly **one day before** Yun's death is discovered / confirmed in Isgard and the emergency warning is sent to Wuyue, Rhen voluntarily enters another long seclusion.

His reason has nothing to do with Yun or Shinrin. Frozen Petals Garden is restoring his energy so quickly that his old energy-density state is becoming unsuitable for his body. He therefore shuts himself away to compress what used to be his entire 100% reserve into the equivalent of 1% of a new, far denser reserve.

Consequences for the arc:

- Rhen does not know Yun has died when he enters seclusion.
- Wuyue learns about Yun, Axtaya and Shinrin **after Rhen has already made himself unavailable**.
- Sera and the others cannot simply summon him when the threat becomes frightening.
- Rhen remains in seclusion for **a little over six months** while Shinrin's pressure escalates.
- Sera, Tae, Huo, Qin, Kael, the expanded Quaint Teahouse, Wuyue's rebuilt institutions and Isgard's surviving forces have to carry the crisis themselves during that period.
- This gives their new Paragon / Sovereign growth real narrative weight instead of making Rhen the first answer to every problem.

### 7.2 Rhen's Return — The Badass Reappearance

Rhen emerges only when the condensation is genuinely finished.

By then:

- **1% of his new reserve is approximately equivalent to his former 100%**;
- his existing techniques and Frozen Petals Garden have evolved around the ultra-dense qi;
- the familiar frozen-petal aura has changed into frost-white petals carrying a **pale-violet / purple radiance**;
- his full current reserve represents roughly **100× his previous full-state effective power**.

His return should be timed for a point when the Wuyue–Isgard side is under genuine strategic or battlefield pressure and the reader has had months of story in which Rhen could not save them.

The intended feeling is simple: **when they need him most, Rhen finally walks back out of seclusion.**

He should not announce a new realm or give a long power explanation in the moment. The visual—Rhen appearing calmly while unfamiliar violet frozen petals drift around him—should tell the cast that something has changed before his first upgraded technique proves how much.

This replaces the earlier route where Wuyue would search for and recover Yun alive. Yun's successful escape and warning become the catalyst that exposes Shinrin, while Rhen's absence forces everyone else to stand on their own before his later return.
'''
assert needle in s, 'Yun warning block not found'
s = s.replace(needle, replacement)

s = s.replace(
    'Recommended role remains a **Shinrin dissident / former covert operative** who left the ruling guild before the invasion became public.\n\nHe is not automatically heroic and does not instantly become Sera\'s subordinate. His knowledge of Shinrin, Axtaya routes and ruling-guild habits makes him strategically valuable.',
    '**Locked role:** a **Shinrin dissident / former covert operative** who left the ruling guild before the invasion became public.\n\nHe is not automatically heroic and does not instantly become Sera\'s subordinate. His knowledge of Shinrin, Axtaya routes and ruling-guild habits makes him strategically valuable.'
)
old = '''### 12.3 Oriental Name / Title Options — NOT LOCKED

The prior **Ren Tsukishiro / Dusk Walker** proposal is discarded.

Name options:

1. **Kanzaki Reito**
2. **Amagiri Seiran**
3. **Kurobane Akito**
4. **Tsukimori Renji**
5. **Shigure Ren**
6. **Mizuhara Kaito**

Title options:

1. **The Black Sun**
2. **Heaven-Eclipsing Saint**
3. **Lord of the Eclipse**
4. **The Lightless Sun**
5. **Black Radiance**
6. **The Eclipse Hand**

The final name and title should be selected separately.
'''
new = '''### 12.3 Personal Name Pending / Title Locked

The prior **Ren Tsukishiro / Dusk Walker** proposal is discarded.

**Permanent title: Black Radiance.**

His personal name remains approval-gated. Current oriental-name options remain:

1. **Kanzaki Reito**
2. **Amagiri Seiran**
3. **Kurobane Akito**
4. **Tsukimori Renji**
5. **Shigure Ren**
6. **Mizuhara Kaito**

Future planning should refer to him as **Black Radiance** until the personal name is selected.
'''
assert old in s, 'Black Radiance option block not found'
s = s.replace(old, new)
s = s.replace('### 12.5 Proposed Skill Set — NOT LOCKED', '### 12.5 Locked Light / Darkness Skill Set')
s = s.replace('- introduce the new light/darkness unranked figure;', '- introduce **Black Radiance**, the unranked Shinrin light/darkness master;')
s = s.replace("4. Choose the new unranked light/darkness character's final name and title from the revised oriental options or provide a new one.", "4. Choose **Black Radiance's personal name** from the oriental options or provide a new one; the title itself is locked.")
s = s.replace('5. Approve / revise the revised **literal Light Qi / Darkness Qi** skill set.', '5. **Light Qi / Darkness Qi skill direction — LOCKED.**')
s = s.replace('6. Decide whether the new unranked figure is a Shinrin dissident, hermit, border wanderer or other role.', '6. **Black Radiance role — LOCKED:** Shinrin dissident / former covert operative.')
p.write_text(s)
