# Story Authoring Guide — reader formatting contract

This guide is for whoever writes chapter prose into `src/data.json` (the ChatGPT
story workflow). It documents **how the reader turns prose into styled output** —
coloured character names with rank badges, tier-symbol skill styling, dialogue
cards and bold — so new chapters render the same way the existing ones do.

None of this changes the story. It only affects whether names and skills *light
up* in the reader. Follow it and the styling is automatic; ignore it and names or
skills silently render as plain text.

After writing new chapters, run:

```
npm run check:authoring
```

It reports the three mistakes below. All three have bitten new chapters before.

---

## 1. Character names — highlighting and rank badges

The reader auto-highlights a character wherever their name appears, and adds their
rank badge (e.g. `#1`, `Former #6`, `RET`, `†`). This is driven by a **registry**
of known names in `src/characterRegistry.ts` — not by the prose.

- A name is highlighted **only if it is a registered alias.** Both the full name
  and the short form must be listed. Example: `Tae Muyeon` and `Tae` are both
  registered, so both highlight. `Huo Wujin` was registered but bare `Huo` was
  not — so "Huo" rendered as plain grey text until it was added.
- **Write names exactly as registered.** Don't invent spelling or spacing
  variants of an existing character's name.
- **Introducing a new recurring character who should be highlighted?** The
  registry is code, so it can't be edited from prose. Flag the new character (name
  + the colour/rank they should get) so Claude adds a registry entry. Until then
  they render as plain text — which is fine for one-off background characters.

## 2. Name collisions — the important one

Reusing an existing highlighted character's **bare name** for a *different*
character makes the new character inherit the original's colour and rank badge.

These bare names are already highlighted — **do not reuse any of them for a new
character:**

> Aethon, Amon, Arin, Caedros, Han, Huo, Ilyra, Iscaryn, Jin, Kael, Lei, Liang,
> Luo, Mo, Orun, Qin, Rhavenn, Rhen, Rui, Sera, Tae, Tor, Varesh, Wei, Yun

Rules:

- Prefer a **distinct full name** for a new character (e.g. `Wei Shuang`,
  `Han Mira`). A capitalised word right after the shared name (`Wei Shuang`) is
  detected as a *different* person and left un-highlighted automatically — good.
- **But** if that new character is ever referred to by the **bare shared name
  alone** (just "Wei", just "Han"), the reader will stamp them with the original
  character's badge. If a new character must be called by a bare shared name,
  flag it so Claude adds a season cutoff (`aliasLastSeason` in `src/novel.ts`),
  as was done for Han → Han Mira and Wei → Wei An from season 65.
- A following honorific ("Wei Teacher", "Sera Mother") is safe — that's read as
  the real character being addressed by title.

## 3. Skills / martial arts — inline styling

The reader styles a **named art** inline wherever it appears — a tier symbol
(`Ω` Ultimate · `✦` Supreme · `◆` Transcended · `✧` Named) plus a tier colour and
hover label. This is driven by the **skill data** (`topSkills`, `rhenSkills`,
`seraSkills` in `src/data.json`) — every art registered there styles automatically
in prose.

- **Write an art's name exactly as it appears in the skill data** — same words,
  same capitalisation, same punctuation. Matching is case-sensitive (so the art
  "Veiled Moon" styles, but the descriptive "veiled moon" doesn't). Straight `'`
  and curly `’` apostrophes are treated the same, so either is fine.
- **Do not write an art name in ALL CAPS inline** (e.g. `**THE BREATH THAT NEVER
  CAME**`). That won't match, so it renders as plain bold with no tier symbol.
  Write it in its normal case: `**The Breath That Never Came**`.
- **The one exception** is the deliberate announcement callout on its own line,
  which uses ALL CAPS on purpose and styles differently:
  `SUPREME ART — When the Silver Horizon Breaks`. Use that only for a formal
  skill reveal, not for ordinary in-line mentions.
- **A skill that isn't in the skill data won't style.** If a new art is meant to
  read as a skill, flag it so it's added to the character's roster (that's also
  what makes it show on the character profile). Until then it's just text.

## 4. Markup the prose may use

- **Dialogue:** start the line with `[[speaker:key]]` where `key` is the
  character's registry speaker key (e.g. `[[speaker:sera]]“…”`). This renders a
  coloured dialogue card. An unregistered key renders an uncoloured fallback name
  — `npm run check:authoring` lists any unknown keys.
- **Bold:** `**like this**` renders as bold. (It used to show the literal
  asterisks; that's fixed, but only `**double**` is bold — single `*` is not
  special.)
- Headers (`#`), links (`[x](y)`) and other Markdown are **not** processed — they
  render literally. Don't use them in prose.

---

### Quick pre-push checklist

1. New recurring character to highlight? → flag it for a registry entry.
2. New character's name doesn't reuse a bare highlighted name (list above)?
3. Skill names written exactly as in the skill data, normal case, not ALL CAPS?
4. Dialogue uses `[[speaker:key]]` with a known key?
5. `npm run check:authoring` comes back clean (or every finding is intentional)?
