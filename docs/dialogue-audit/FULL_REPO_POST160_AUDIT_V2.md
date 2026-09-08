# Full-repository dialogue attribution/highlight audit — corrected all-season pass

Scanned **114 seasons**, **1133 episodes**, **59813 paragraphs**, **14178 visible/runtime speaker markers**, and **15152 quoted paragraphs**.

Seasons 1–94 are read from `src/data/seasons/`; Seasons 95–114 are loaded through the same `final-arc-reader.mjs` pipeline used by the application, so runtime-inferred final-arc tags are included.

Neutral-role speaker keys from `neutralSpeakerNames` are treated as valid. Candidate sections are deliberately conservative and require human context review before any attribution changes.

## Summary by season

| Season | Episodes | Markers | Quote paras | Unmarked standalone | Explicit named | Announced speaker | Pronoun | Action cue |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 10 | 173 | 177 | 4 | 0 | 0 | 0 | 0 |
| 2 | 10 | 158 | 164 | 4 | 0 | 0 | 0 | 0 |
| 3 | 10 | 137 | 138 | 1 | 0 | 0 | 0 | 0 |
| 4 | 10 | 54 | 54 | 0 | 0 | 0 | 0 | 0 |
| 5 | 10 | 42 | 42 | 0 | 0 | 0 | 0 | 0 |
| 6 | 10 | 48 | 48 | 0 | 0 | 0 | 0 | 0 |
| 7 | 10 | 50 | 50 | 0 | 0 | 0 | 0 | 0 |
| 8 | 10 | 49 | 50 | 1 | 0 | 0 | 0 | 0 |
| 9 | 10 | 85 | 85 | 0 | 0 | 0 | 0 | 0 |
| 10 | 10 | 55 | 55 | 0 | 0 | 0 | 0 | 0 |
| 11 | 10 | 47 | 47 | 0 | 0 | 0 | 0 | 0 |
| 12 | 10 | 50 | 50 | 0 | 0 | 0 | 0 | 0 |
| 13 | 10 | 75 | 75 | 0 | 0 | 0 | 0 | 0 |
| 14 | 10 | 164 | 164 | 0 | 0 | 0 | 0 | 0 |
| 15 | 10 | 153 | 153 | 0 | 0 | 0 | 0 | 0 |
| 16 | 10 | 118 | 120 | 0 | 0 | 0 | 0 | 0 |
| 17 | 10 | 72 | 73 | 1 | 0 | 0 | 0 | 0 |
| 18 | 10 | 136 | 136 | 0 | 0 | 0 | 0 | 0 |
| 19 | 10 | 133 | 133 | 0 | 0 | 0 | 0 | 0 |
| 20 | 10 | 137 | 137 | 0 | 0 | 0 | 0 | 0 |
| 21 | 10 | 149 | 149 | 0 | 0 | 0 | 0 | 0 |
| 22 | 10 | 81 | 81 | 0 | 0 | 0 | 0 | 0 |
| 23 | 10 | 48 | 48 | 0 | 0 | 0 | 0 | 0 |
| 24 | 10 | 56 | 56 | 0 | 0 | 0 | 0 | 0 |
| 25 | 10 | 69 | 69 | 0 | 0 | 0 | 0 | 0 |
| 26 | 10 | 49 | 49 | 0 | 0 | 0 | 0 | 0 |
| 27 | 10 | 46 | 46 | 0 | 0 | 0 | 0 | 0 |
| 28 | 10 | 42 | 42 | 0 | 0 | 0 | 0 | 0 |
| 29 | 10 | 25 | 25 | 0 | 0 | 0 | 0 | 0 |
| 30 | 10 | 30 | 30 | 0 | 0 | 0 | 0 | 0 |
| 31 | 10 | 30 | 30 | 0 | 0 | 0 | 0 | 0 |
| 32 | 10 | 62 | 62 | 0 | 0 | 0 | 0 | 0 |
| 33 | 10 | 25 | 25 | 0 | 0 | 0 | 0 | 0 |
| 34 | 10 | 16 | 16 | 0 | 0 | 0 | 0 | 0 |
| 35 | 10 | 7 | 7 | 0 | 0 | 0 | 0 | 0 |
| 36 | 10 | 13 | 13 | 0 | 0 | 0 | 0 | 0 |
| 37 | 10 | 9 | 9 | 0 | 0 | 0 | 0 | 0 |
| 38 | 10 | 25 | 25 | 0 | 0 | 0 | 0 | 0 |
| 39 | 10 | 32 | 32 | 0 | 0 | 0 | 0 | 0 |
| 40 | 10 | 15 | 15 | 0 | 0 | 0 | 0 | 0 |
| 41 | 10 | 11 | 11 | 0 | 0 | 0 | 0 | 0 |
| 42 | 10 | 19 | 19 | 0 | 0 | 0 | 0 | 0 |
| 43 | 10 | 39 | 39 | 0 | 0 | 0 | 0 | 0 |
| 44 | 10 | 20 | 20 | 0 | 0 | 0 | 0 | 0 |
| 45 | 10 | 17 | 17 | 0 | 0 | 0 | 0 | 0 |
| 46 | 10 | 26 | 27 | 0 | 0 | 0 | 0 | 0 |
| 47 | 10 | 13 | 14 | 0 | 0 | 0 | 0 | 0 |
| 48 | 10 | 36 | 36 | 0 | 0 | 0 | 0 | 0 |
| 49 | 10 | 18 | 18 | 0 | 0 | 0 | 0 | 0 |
| 50 | 10 | 24 | 24 | 0 | 0 | 0 | 0 | 0 |
| 51 | 10 | 22 | 22 | 0 | 0 | 0 | 0 | 0 |
| 52 | 10 | 25 | 25 | 0 | 0 | 0 | 0 | 0 |
| 53 | 10 | 23 | 23 | 0 | 0 | 0 | 0 | 0 |
| 54 | 10 | 15 | 15 | 0 | 0 | 0 | 0 | 0 |
| 55 | 10 | 20 | 20 | 0 | 0 | 0 | 0 | 0 |
| 56 | 10 | 22 | 22 | 0 | 0 | 0 | 0 | 0 |
| 57 | 10 | 25 | 25 | 0 | 0 | 0 | 0 | 0 |
| 58 | 10 | 5 | 5 | 0 | 0 | 0 | 0 | 0 |
| 59 | 10 | 17 | 17 | 0 | 0 | 0 | 0 | 0 |
| 60 | 10 | 21 | 21 | 0 | 0 | 0 | 0 | 0 |
| 61 | 10 | 21 | 21 | 0 | 0 | 0 | 0 | 0 |
| 62 | 10 | 27 | 27 | 0 | 0 | 0 | 0 | 0 |
| 63 | 10 | 25 | 25 | 0 | 0 | 0 | 0 | 0 |
| 64 | 3 | 81 | 81 | 0 | 0 | 0 | 0 | 0 |
| 65 | 10 | 490 | 490 | 0 | 0 | 0 | 0 | 0 |
| 66 | 10 | 178 | 178 | 0 | 0 | 0 | 0 | 0 |
| 67 | 10 | 76 | 76 | 0 | 0 | 0 | 0 | 0 |
| 68 | 10 | 97 | 98 | 0 | 0 | 0 | 0 | 0 |
| 69 | 10 | 77 | 78 | 0 | 0 | 0 | 0 | 0 |
| 70 | 10 | 65 | 65 | 0 | 0 | 0 | 0 | 0 |
| 71 | 10 | 45 | 45 | 0 | 0 | 0 | 0 | 0 |
| 72 | 10 | 31 | 31 | 0 | 0 | 0 | 0 | 0 |
| 73 | 10 | 37 | 37 | 0 | 0 | 0 | 0 | 0 |
| 74 | 10 | 36 | 36 | 0 | 0 | 0 | 0 | 0 |
| 75 | 10 | 173 | 173 | 0 | 0 | 0 | 0 | 0 |
| 76 | 10 | 75 | 75 | 0 | 0 | 0 | 0 | 0 |
| 77 | 10 | 39 | 39 | 0 | 0 | 0 | 0 | 0 |
| 78 | 10 | 59 | 59 | 0 | 0 | 0 | 0 | 0 |
| 79 | 10 | 50 | 50 | 0 | 0 | 0 | 0 | 0 |
| 80 | 10 | 40 | 40 | 0 | 0 | 0 | 0 | 0 |
| 81 | 10 | 23 | 23 | 0 | 0 | 0 | 0 | 0 |
| 82 | 10 | 20 | 20 | 0 | 0 | 0 | 0 | 0 |
| 83 | 10 | 25 | 25 | 0 | 0 | 0 | 0 | 0 |
| 84 | 10 | 21 | 21 | 0 | 0 | 0 | 0 | 0 |
| 85 | 10 | 106 | 119 | 13 | 0 | 0 | 0 | 1 |
| 86 | 10 | 44 | 58 | 13 | 0 | 0 | 0 | 0 |
| 87 | 10 | 38 | 57 | 16 | 1 | 0 | 1 | 1 |
| 88 | 10 | 34 | 43 | 5 | 1 | 0 | 1 | 0 |
| 89 | 10 | 19 | 24 | 5 | 0 | 0 | 0 | 0 |
| 90 | 10 | 71 | 77 | 6 | 0 | 0 | 0 | 0 |
| 91 | 10 | 41 | 45 | 4 | 0 | 0 | 0 | 0 |
| 92 | 10 | 39 | 47 | 8 | 0 | 0 | 0 | 0 |
| 93 | 10 | 28 | 30 | 2 | 0 | 0 | 0 | 0 |
| 94 | 10 | 48 | 51 | 3 | 0 | 0 | 0 | 0 |
| 95 | 10 | 818 | 984 | 159 | 0 | 4 | 2 | 3 |
| 96 | 10 | 453 | 506 | 47 | 2 | 3 | 2 | 1 |
| 97 | 10 | 268 | 321 | 47 | 0 | 2 | 1 | 0 |
| 98 | 10 | 142 | 172 | 16 | 0 | 1 | 0 | 0 |
| 99 | 10 | 481 | 521 | 34 | 0 | 0 | 4 | 1 |
| 100 | 10 | 522 | 602 | 67 | 2 | 2 | 1 | 1 |
| 101 | 10 | 630 | 722 | 80 | 2 | 3 | 1 | 1 |
| 102 | 10 | 401 | 445 | 34 | 3 | 0 | 3 | 0 |
| 103 | 10 | 446 | 504 | 57 | 0 | 0 | 0 | 3 |
| 104 | 10 | 382 | 394 | 12 | 0 | 0 | 0 | 0 |
| 105 | 10 | 320 | 384 | 64 | 0 | 1 | 0 | 1 |
| 106 | 10 | 389 | 394 | 3 | 0 | 0 | 0 | 0 |
| 107 | 10 | 217 | 231 | 12 | 1 | 0 | 0 | 0 |
| 108 | 10 | 191 | 214 | 19 | 1 | 0 | 0 | 1 |
| 109 | 10 | 941 | 970 | 20 | 0 | 0 | 2 | 1 |
| 110 | 10 | 719 | 765 | 38 | 3 | 0 | 1 | 0 |
| 111 | 10 | 305 | 345 | 37 | 0 | 0 | 1 | 1 |
| 112 | 10 | 347 | 348 | 0 | 0 | 0 | 0 | 0 |
| 113 | 10 | 387 | 393 | 3 | 0 | 0 | 0 | 1 |
| 114 | 10 | 357 | 373 | 6 | 4 | 0 | 1 | 0 |

## A. Marker not at line start

Count: **0**

## B. Duplicate marker on one line

Count: **0**

## C. Unknown marker key

Count: **0**

## D. Marked line contains no dialogue quote

Count: **0**

## E. HIGH-RISK: existing marker conflicts with explicit named attribution

Count: **1**

**S95 Chapter 304 P132 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

- marker: `sera` expected: `rhen` (Rhen)
- [[speaker:sera]]“What happened?” she asked Rhen.

## F. HIGH-RISK: existing standalone marker conflicts with preceding announced speaker

Count: **277**

**S1 Episode 6 P55 — A Life That Wasn't Useful** — `src/data/seasons/season-001.json`

```text
before: Sera asked what he did before traveling.
>>> [[speaker:rhen]]“Healing.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S1 Episode 6 P59 — A Life That Wasn't Useful** — `src/data/seasons/season-001.json`

```text
before: [[speaker:sera]]“You called a thirty-kilo crate anatomy.”
>>> [[speaker:rhen]]“Medical terminology varies by region.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S1 Episode 9 P43 — Who Are You?** — `src/data/seasons/season-001.json`

```text
before: [[speaker:sera]]“You said you were a healer.”
>>> [[speaker:rhen]]“I am.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S2 Episode 3 P89 — Seven Debts** — `src/data/seasons/season-002.json`

```text
before: [[speaker:sera]]“You answered immediately.”
>>> [[speaker:rhen]]“I think quickly.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S3 Episode 3 P65 — The Duke Who Came Back for Tea** — `src/data/seasons/season-003.json`

```text
before: [[speaker:sera]]“That is the most suspicious sentence anyone has ever said in my shop.”
>>> [[speaker:rhen]]“Competition is strong.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S3 Episode 3 P86 — The Duke Who Came Back for Tea** — `src/data/seasons/season-003.json`

```text
before: [[speaker:sera]]“You said something similar before.”
>>> [[speaker:rui]]“Because you keep asking the same dangerous question in different forms.”
```

Existing `rui`, preceding prose announces **Sera** (`sera`).

**S3 Episode 4 P16 — The Five Outside the Walls** — `src/data/seasons/season-003.json`

```text
before: Rhen knew why before she spoke.
>>> [[speaker:sera]]“Five.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S8 Episode 2 P23 — The Empty Throne** — `src/data/seasons/season-008.json`

```text
before: [[speaker:sera]]“You called a Duke-level formation annoying.”
>>> [[speaker:rhen]]“It was.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S9 Episode 8 P26 — The Woman in Red Snow** — `src/data/seasons/season-009.json`

```text
before: [[speaker:rhen]]“You answered quickly.”
>>> [[speaker:sera]]“Drink your tea.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S10 Episode 9 P17 — The Wrong Weakness** — `src/data/seasons/season-010.json`

```text
before: [[speaker:rhen]]“I haven't said anything.”
>>> [[speaker:sera]]“Your face was offering.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S13 Episode 2 P4 — A Date Nobody Named** — `src/data/seasons/season-013.json`

```text
before: [[speaker:rhen]]“You could have said you wanted a day together.”
>>> [[speaker:sera]]“I did.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S13 Episode 2 P6 — A Date Nobody Named** — `src/data/seasons/season-013.json`

```text
before: [[speaker:rhen]]“You said we were investigating.”
>>> [[speaker:sera]]“Both can be true.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S14 Episode 9 P52 — Rhen's Quiet Compliment** — `src/data/seasons/season-014.json`

```text
before: Rhen remained motionless until she whispered:
>>> [[speaker:sera]]“You can breathe.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S18 Episode 6 P51 — Black Storm, Uncrowned Emperor** — `src/data/seasons/season-018.json`

```text
before: [[speaker:rhen]]“You have said that before.”
>>> [[speaker:lei]]“Still true.”
```

Existing `lei`, preceding prose announces **Rhen** (`rhen`).

**S21 Episode 2 P7 — Liang Walks Again** — `src/data/seasons/season-021.json`

```text
before: [[speaker:sera]]“Rhen said three months.”
>>> [[speaker:liang]]“It has been seven weeks.”
```

Existing `liang`, preceding prose announces **Sera** (`sera`).

**S21 Episode 2 P18 — Liang Walks Again** — `src/data/seasons/season-021.json`

```text
before: Liang rarely spoke of people she loved.
>>> [[speaker:sera]]“Thank you.”
```

Existing `sera`, preceding prose announces **Liang Yue** (`liang`).

**S23 Episode 8 P13 — The First Grave Opens** — `src/data/seasons/season-023.json`

```text
before: [[speaker:sera]]“I haven't said anything.”
>>> [[speaker:han]]“Your face has.”
```

Existing `han`, preceding prose announces **Sera** (`sera`).

**S26 Episode 1 P15 — The Ranking Gathering** — `src/data/seasons/season-026.json`

```text
before: [[speaker:sera]]“You've said.”
>>> [[speaker:rhen]]“Repeatedly.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S31 Episode 9 P23 — Eternal Spring** — `src/data/seasons/season-031.json`

```text
before: Rhen continued.
>>> [[speaker:yun]]“Absolutely not.”
```

Existing `yun`, preceding prose announces **Rhen** (`rhen`).

**S44 Episode 1 P9 — Two Years Quiet** — `src/data/seasons/season-044.json`

```text
before: Rhen grew herbs behind the shop and continued moving her tea tins.
>>> [[speaker:sera]]“You promised retirement.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S49 Episode 8 P23 — Rhen Does Nothing** — `src/data/seasons/season-049.json`

```text
before: [[speaker:rhen]]“I haven't said anything.”
>>> [[speaker:sera]]“Your face is saying things.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S64 Episode 1 P16 — Two Years Later** — `src/data/seasons/season-064.json`

```text
before: Rhen continued wiping the counter.
>>> [[speaker:sera]]“Retired.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S64 Episode 2 P52 — Visitors From Another Life** — `src/data/seasons/season-064.json`

```text
before: [[speaker:sera]]“I asked.”
>>> [[speaker:ilyra]]“And?”
```

Existing `ilyra`, preceding prose announces **Sera** (`sera`).

**S64 Episode 3 P118 — The Quiet Regular** — `src/data/seasons/season-064.json`

```text
before: [[speaker:rhen]]“You said that two years ago.”
>>> [[speaker:sera]]“I'm stronger now.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S65 Chapter 1 P66 — The Sign Is Still Crooked** — `src/data/seasons/season-065.json`

```text
before: [[speaker:rhen]]“Has anyone asked?”
>>> [[speaker:sera]]“They will.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S65 Chapter 1 P122 — The Sign Is Still Crooked** — `src/data/seasons/season-065.json`

```text
before: [[speaker:sera]]“He asked for hot tea.”
>>> [[speaker:rhen]]“River green responds well to the morning humidity.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S65 Chapter 2 P22 — Soil Behind the Kitchen** — `src/data/seasons/season-065.json`

```text
before: [[speaker:sera]]“You said a small patch.”
>>> [[speaker:rhen]]“It is smaller than a province.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S65 Chapter 2 P289 — Soil Behind the Kitchen** — `src/data/seasons/season-065.json`

```text
before: Rhen added a heading: WHAT THE WATER TAUGHT.
>>> [[speaker:sera]]“That is not an accounting category.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S66 Chapter 15 P48 — Ledgers That Do Not Heal** — `src/data/seasons/season-066.json`

```text
before: [[speaker:rhen]]“You said that three pages ago.”
>>> [[speaker:sera]]“This page is different.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S66 Chapter 19 P22 — The Governor Without a Province** — `src/data/seasons/season-066.json`

```text
before: [[speaker:sera]]“You could have asked the salary.”
>>> [[speaker:rhen]]“Would you have accepted the title?”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S67 Chapter 24 P35 — Qin Hears the Network** — `src/data/seasons/season-067.json`

```text
before: At the final cup, Sera asked how far he could hear.
>>> [[speaker:qin]]“Farther in rain. Less through loose sand. Rhen remains irritating.”
```

Existing `qin`, preceding prose announces **Sera** (`sera`).

**S68 Chapter 33 P33 — The Woman Behind Every Route** — `src/data/seasons/season-068.json`

```text
before: [[speaker:sera]]“It needed half what you added.”
>>> [[speaker:rhen]]“The customer finished it.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S68 Chapter 35 P34 — Healers Who Can Leave Alive** — `src/data/seasons/season-068.json`

```text
before: Rhen examined the injuries when they returned. He approved the wrist binding, corrected the rib wrap and asked why one cart panel now had a spear hole.
>>> [[speaker:renshuo]]“Defensive ventilation.”
```

Existing `renshuo`, preceding prose announces **Rhen** (`rhen`).

**S68 Chapter 38 P13 — The Two Inner Petals** — `src/data/seasons/season-068.json`

```text
before: Han asked whether the senior apprentices should fill them.
>>> [[speaker:sera]]“Not because the drawing looks incomplete.”
```

Existing `sera`, preceding prose announces **Han Myeong** (`han`).

**S69 Chapter 50 P4 — The Upper Room** — `src/data/seasons/season-069.json`

```text
before: Rhen called it the upper room.
>>> [[speaker:luweiran]]“There are seventeen mapped chambers.”
```

Existing `luweiran`, preceding prose announces **Rhen** (`rhen`).

**S73 Chapter 85 P10 — Two Generals and One Bad Pot of Tea** — `src/data/seasons/season-073.json`

```text
before: [[speaker:huo]]“You called it boiled roof water.”
>>> [[speaker:tae]]“I said it resembled boiled roof water.”
```

Existing `tae`, preceding prose announces **Huo Wujin** (`huo`).

**S74 Chapter 92 P11 — The Garden Withdraws** — `src/data/seasons/season-074.json`

```text
before: [[speaker:sera]]“You said it was complete.”
>>> [[speaker:rhen]]“Confirmation is a medical virtue.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S74 Chapter 94 P16 — Help Chosen Freely** — `src/data/seasons/season-074.json`

```text
before: [[speaker:rhen]]“You asked.”
>>> [[speaker:sera]]“You waited.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S76 Chapter 119 P9 — The First Hearth Under Snow** — `src/data/seasons/season-076.json`

```text
before: [[speaker:sera]]“I said I kept accounts.”
>>> [[speaker:captain]]“Then count what each side loses.”
```

Existing `captain`, preceding prose announces **Sera** (`sera`).

**S76 Chapter 120 P6 — Forty Footprints Become Four** — `src/data/seasons/season-076.json`

```text
before: [[speaker:sera]]“She added that without permission.”
>>> [[speaker:rhen]]“Accuracy may not require permission.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S78 Chapter 135 P11 — Tae Finds His Old Poison** — `src/data/seasons/season-078.json`

```text
before: [[speaker:huo]]“You said that on the ship.”
>>> [[speaker:tae]]“It remains true.”
```

Existing `tae`, preceding prose announces **Huo Wujin** (`huo`).

**S79 Chapter 147 P12 — The Fourth Sovereign Goes North** — `src/data/seasons/season-079.json`

```text
before: [[speaker:lei]]“You say that as though I asked permission.”
>>> [[speaker:qin]]“You waited.”
```

Existing `qin`, preceding prose announces **Lei Zhen** (`lei`).

**S88 Chapter 234 P14 — Sera Cannot Call It Orchid Dominion** — `src/data/seasons/season-088.json`

```text
before: “It buys time,” Jin said through the signal officer.
>>> [[speaker:sera]]“With a lie that becomes a battlefield order.”
```

Existing `sera`, preceding prose announces **Jin Seoryu** (`jin`).

**S89 Chapter 249 P17 — Kael Trusts the Army He Left** — `src/data/seasons/season-089.json`

```text
before: She added her martial authorization before Jin requested it.
>>> [[speaker:liang]]“This does not release the remaining eighteen thousand.”
```

Existing `liang`, preceding prose announces **Jin Seoryu** (`jin`).

**S91 Chapter 261 P6 — Sera Must Command While Fighting** — `src/data/seasons/season-091.json`

```text
before: Sera intercepted the third attack with **Petal-Severing Touch**. The contact broke its outer circulation once. The force continued through the point she had touched.
>>> [[speaker:aldric]]“You answer one technique at a time.”
```

Existing `aldric`, preceding prose announces **Sera** (`sera`).

**S95 Chapter 301 P73 — Two Years Beneath the Crooked Sign** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You walked outside because you brought tea,” Sera said.
>>> [[speaker:qin]]“I can regret several things.”
```

Existing `qin`, preceding prose announces **Sera** (`sera`).

**S95 Chapter 301 P88 — Two Years Beneath the Crooked Sign** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]Lu called back, “I did not ask you.”
>>> [[speaker:huo]]“Still not me.”
```

Existing `huo`, preceding prose announces **Lu Weiran** (`luweiran`).

**S95 Chapter 301 P117 — Two Years Beneath the Crooked Sign** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“There are no paying customers here,” Luo said.
>>> [[speaker:sera]]“That is because you are both standing in front of the register.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S95 Chapter 301 P199 — Two Years Beneath the Crooked Sign** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Was that about the sign?” he asked.
>>> [[speaker:sera]]“No.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S95 Chapter 302 P128 — The Garden Is Asked For, Not Imposed** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“How do you know?” Sera asked.
>>> [[speaker:luweiran]]“You have been arguing for ten minutes.”
```

Existing `luweiran`, preceding prose announces **Sera** (`sera`).

**S95 Chapter 302 P221 — The Garden Is Asked For, Not Imposed** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:qin]]“You asked again?”
>>> [[speaker:rhen]]“Yes.”
```

Existing `rhen`, preceding prose announces **Qin Luo** (`qin`).

**S95 Chapter 303 P39 — What Two Years Did Not Repair** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You know they asked for resin.”
>>> [[speaker:rhen]]“I brought resin.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S95 Chapter 304 P70 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Which part?” Yun asked.
>>> [[speaker:luo]]“All of it.”
```

Existing `luo`, preceding prose announces **Yun Shizhen** (`yun`).

**S95 Chapter 304 P129 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:huo]]“You were not here when they said it.”
>>> [[speaker:tae]]“I have ears.”
```

Existing `tae`, preceding prose announces **Huo Wujin** (`huo`).

**S95 Chapter 305 P50 — Physician and Poisoner** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]After a moment she added, “Professionally.”
>>> [[speaker:luo]]“Of course.”
```

Existing `luo`, preceding prose announces **Yun Shizhen** (`yun`).

**S95 Chapter 306 P62 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You said the body is repaired.”
>>> [[speaker:rhen]]“It is.”
```

Existing `rhen`, preceding prose announces **Yun Shizhen** (`yun`).

**S95 Chapter 306 P230 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Faster again?” she asked.
>>> [[speaker:rhen]]“Yes.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S95 Chapter 307 P27 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]Sera said, “He means useful.”
>>> [[speaker:luweiran]]“I said good.”
```

Existing `luweiran`, preceding prose announces **Sera** (`sera`).

**S95 Chapter 307 P71 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:qin]]Qin said, “You look disappointed.”
>>> [[speaker:luweiran]]“I am surrounded by children.”
```

Existing `luweiran`, preceding prose announces **Qin Luo** (`qin`).

**S95 Chapter 307 P151 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“How long?” Sera asked.
>>> [[speaker:luo]]“Unknown.”
```

Existing `luo`, preceding prose announces **Sera** (`sera`).

**S95 Chapter 307 P202 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Meaning?” Luo asked.
>>> [[speaker:luweiran]]“Meaning somebody did not merely hide the cargo.”
```

Existing `luweiran`, preceding prose announces **Luo Wen** (`luo`).

**S95 Chapter 309 P165 — The Wind That Would Not Stay** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“We noticed,” Lu said.
>>> [[speaker:xie_wuchen]]“So I helped.”
```

Existing `xie_wuchen`, preceding prose announces **Lu Weiran** (`luweiran`).

**S96 Chapter 311 P19 — Strength With a Dosage Table** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“You said that three times.”
>>> [[speaker:yun]]“And you were wrong twice.”
```

Existing `yun`, preceding prose announces **Luo Wen** (`luo`).

**S96 Chapter 311 P22 — Strength With a Dosage Table** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You called the first layer a stimulant.”
>>> [[speaker:luo]]“It is a stimulant.”
```

Existing `luo`, preceding prose announces **Yun Shizhen** (`yun`).

**S96 Chapter 311 P43 — Strength With a Dosage Table** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“You said the second one was ugly.”
>>> [[speaker:yun]]“I was being polite.”
```

Existing `yun`, preceding prose announces **Luo Wen** (`luo`).

**S96 Chapter 312 P85 — Frost Where Rhen Did Not Mean It** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]Rhen added, “If dinner were inside my meridians.”
>>> [[speaker:sera]]“That is a terrible explanation.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S96 Chapter 312 P140 — Frost Where Rhen Did Not Mean It** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]After a moment she said, “You owe me a teapot.”
>>> [[speaker:rhen]]“I’ll buy one tomorrow.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S96 Chapter 313 P43 — Leaving Is Still a Choice** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Fine,” she said. “Be dramatic.”
>>> [[speaker:xie_wuchen]]“I’m eating fruit.”
```

Existing `xie_wuchen`, preceding prose announces **Sera** (`sera`).

**S96 Chapter 313 P53 — Leaving Is Still a Choice** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]“He said too much.”
>>> [[speaker:sera]]“He said he was chasing them because his intelligence was compromised.”
```

Existing `sera`, preceding prose announces **Xie Wuchen** (`xie_wuchen`).

**S96 Chapter 313 P54 — Leaving Is Still a Choice** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“He said he was chasing them because his intelligence was compromised.”
>>> [[speaker:xie_wuchen]]“He was younger.”
```

Existing `xie_wuchen`, preceding prose announces **Sera** (`sera`).

**S96 Chapter 313 P56 — Leaving Is Still a Choice** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“He said you beat him.”
>>> [[speaker:xie_wuchen]]“Also younger.”
```

Existing `xie_wuchen`, preceding prose announces **Sera** (`sera`).

**S96 Chapter 313 P112 — Leaving Is Still a Choice** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]Behind her, he said, “You were waiting to say that.”
>>> [[speaker:sera]]“No.”
```

Existing `sera`, preceding prose announces **Xie Wuchen** (`xie_wuchen`).

**S96 Chapter 313 P122 — Leaving Is Still a Choice** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Tell Rui I said he’s banned from tea for a week.”
>>> [[speaker:xie_wuchen]]“I’m not your courier.”
```

Existing `xie_wuchen`, preceding prose announces **Sera** (`sera`).

**S96 Chapter 314 P20 — Yun Asks for the Road** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Shinsei?” Sera asked.
>>> [[speaker:luweiran]]“Name appears on permits and tax forms,” Lu said. “Could be state. Could be regulator. Could be guild. Could be all three. We do not know yet.”
```

Existing `luweiran`, preceding prose announces **Sera** (`sera`).

**S96 Chapter 314 P44 — Yun Asks for the Road** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I said I leave. I did not say elegantly.”
>>> [[speaker:luo]]“You also said the last black-market laboratory would take one day.”
```

Existing `luo`, preceding prose announces **Yun Shizhen** (`yun`).

**S96 Chapter 314 P45 — Yun Asks for the Road** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“You also said the last black-market laboratory would take one day.”
>>> [[speaker:yun]]“It did.”
```

Existing `yun`, preceding prose announces **Luo Wen** (`luo`).

**S96 Chapter 314 P80 — Yun Asks for the Road** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]Lu said, “Route time alone is six to eight days each way depending on ship transfer.”
>>> [[speaker:sera]]“Then call it three.”
```

Existing `sera`, preceding prose announces **Lu Weiran** (`luweiran`).

**S96 Chapter 315 P19 — Three Weeks** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“There’s a knife in the sleeve,” he said.
>>> [[speaker:yun]]“There are two.”
```

Existing `yun`, preceding prose announces **Luo Wen** (`luo`).

**S96 Chapter 315 P80 — Three Weeks** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]After a while he said, “Use the second notebook.”
>>> [[speaker:yun]]“I know.”
```

Existing `yun`, preceding prose announces **Luo Wen** (`luo`).

**S96 Chapter 320 P57 — The Third Week Ends** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“What do you want to do?” Sera asked.
>>> [[speaker:luo]]“Go.”
```

Existing `luo`, preceding prose announces **Sera** (`sera`).

**S96 Chapter 320 P72 — The Third Week Ends** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“She said three weeks.”
>>> [[speaker:sera]]“I know.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S96 Chapter 320 P74 — The Third Week Ends** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“She said if she found nothing, she’d come back.”
>>> [[speaker:sera]]“I know.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S96 Chapter 320 P90 — The Third Week Ends** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“I know what she said.”
>>> [[speaker:sera]]“Then don’t make her wrong because you’re scared.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S97 Chapter 323 P79 — The Aura That Would Not Stay Small** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“And the answer is what you said before. Make the qi take less space.”
>>> [[speaker:rhen]]“Yes.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S97 Chapter 323 P96 — The Aura That Would Not Stay Small** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]Sera said, “This is unrelated.”
>>> [[speaker:rhen]]“Yes.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S97 Chapter 323 P107 — The Aura That Would Not Stay Small** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“That is cheating,” she said.
>>> [[speaker:rhen]]“I’m durable.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S97 Chapter 324 P97 — Shunto Takamori** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“Wet floor?” he asked.
>>> [[speaker:yun]]“Dangerous.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S97 Chapter 325 P16 — Poison the Room, Not the Man** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You’re improving,” she said.
>>> [[speaker:shunto]]“I’ve had a good teacher.”
```

Existing `shunto`, preceding prose announces **Yun Shizhen** (`yun`).

**S97 Chapter 325 P49 — Poison the Room, Not the Man** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]Shunto said, “Come with me.”
>>> [[speaker:yun]]“No.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S97 Chapter 325 P63 — Poison the Room, Not the Man** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“Interesting,” he murmured.
>>> [[speaker:yun]]“You say that often?”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S97 Chapter 326 P23 — The Gale Brings One More Ledger** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“Where?” Lu asked.
>>> [[speaker:xie_wuchen]]“Eastern port.”
```

Existing `xie_wuchen`, preceding prose announces **Lu Weiran** (`luweiran`).

**S97 Chapter 326 P42 — The Gale Brings One More Ledger** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:rui]]“You said you were going south.”
>>> [[speaker:xie_wuchen]]“I went east.”
```

Existing `xie_wuchen`, preceding prose announces **Shen Rui** (`rui`).

**S97 Chapter 326 P87 — The Gale Brings One More Ledger** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]Xie said, “False transfer.”
>>> [[speaker:luweiran]]“Yes.”
```

Existing `luweiran`, preceding prose announces **Xie Wuchen** (`xie_wuchen`).

**S97 Chapter 326 P99 — The Gale Brings One More Ledger** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:rui]]Rui said, “I can send Azure people.”
>>> [[speaker:luweiran]]“No visible sect detachment,” Lu said. “Not yet.”
```

Existing `luweiran`, preceding prose announces **Shen Rui** (`rui`).

**S97 Chapter 326 P100 — The Gale Brings One More Ledger** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“No visible sect detachment,” Lu said. “Not yet.”
>>> [[speaker:rui]]“Why?”
```

Existing `rui`, preceding prose announces **Lu Weiran** (`luweiran`).

**S97 Chapter 327 P12 — Shunto Changes His Bloodflow** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“No wet floors today?” he asked.
>>> [[speaker:yun]]“Seasonal.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S97 Chapter 327 P29 — Shunto Changes His Bloodflow** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You’ve been practicing,” Yun said.
>>> [[speaker:shunto]]“So have you.”
```

Existing `shunto`, preceding prose announces **Yun Shizhen** (`yun`).

**S97 Chapter 329 P60 — He Learns From Pain** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “If I’m so expensive, stop looking.”
>>> [[speaker:shunto]]“You are a foreign Sovereign moving through restricted medical and military infrastructure.”
```

Existing `shunto`, preceding prose announces **Yun Shizhen** (`yun`).

**S97 Chapter 329 P71 — He Learns From Pain** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“What are you trying to find?” he asked.
>>> [[speaker:yun]]“Good tea.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S97 Chapter 329 P84 — He Learns From Pain** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “You could have surrounded this place.”
>>> [[speaker:shunto]]“I did.”
```

Existing `shunto`, preceding prose announces **Yun Shizhen** (`yun`).

**S98 Chapter 334 P127 — Proof That Can Survive Her** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“The qi needs to become denser,” he said. “Same amount. Less space.”
>>> [[speaker:sera]]“How long?”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S98 Chapter 334 P155 — Proof That Can Survive Her** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“When it crosses from annoying to unsafe,” she said, “you tell me.”
>>> [[speaker:rhen]]“I will.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S98 Chapter 337 P33 — No Needless Contact** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You disappoint me,” she said.
>>> [[speaker:shunto]]“I have had three months to become comfortable with that.”
```

Existing `shunto`, preceding prose announces **Yun Shizhen** (`yun`).

**S98 Chapter 337 P50 — No Needless Contact** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“Needle?” he asked.
>>> [[speaker:yun]]“Handkerchief.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S98 Chapter 337 P68 — No Needless Contact** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“You want out,” he said.
>>> [[speaker:yun]]“Everyone eventually does.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S98 Chapter 337 P100 — No Needless Contact** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You learned,” she said.
>>> [[speaker:shunto]]“So did you.”
```

Existing `shunto`, preceding prose announces **Yun Shizhen** (`yun`).

**S98 Chapter 340 P161 — The Open Door** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“Three months,” he called.
>>> [[speaker:yun]]“Your hospitality needs work.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S98 Chapter 340 P181 — The Open Door** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]Shunto said, “Give me the material.”
>>> [[speaker:yun]]“No.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S99 Chapter 341 P146 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“How are the locks?” he asked.
>>> [[speaker:yun]]“Amateurish.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S99 Chapter 341 P155 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “You rehearsed the road for how long?”
>>> [[speaker:shunto]]“Twenty-seven days.”
```

Existing `shunto`, preceding prose announces **Yun Shizhen** (`yun`).

**S99 Chapter 341 P169 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]Shunto said, “You knew the road was a trap.”
>>> [[speaker:yun]]“Yes.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S99 Chapter 342 P42 — She Does Not Give Him the War** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“Your physician,” he said.
>>> [[speaker:yun]]“Many people are physicians.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S99 Chapter 343 P83 — What Shunto Chose** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]He said, “You should have—”
>>> [[speaker:yun]]“Do not finish that sentence.”
```

Existing `yun`, preceding prose announces **Shunto Takamori** (`shunto`).

**S99 Chapter 346 P115 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “That is not enough reason to risk a High Paragon.”
>>> [[speaker:black_radiance]]“For some people it is.”
```

Existing `black_radiance`, preceding prose announces **Yun Shizhen** (`yun`).

**S99 Chapter 346 P139 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]She said, “The evidence cannot be left behind.”
>>> [[speaker:black_radiance]]“Where?”
```

Existing `black_radiance`, preceding prose announces **Yun Shizhen** (`yun`).

**S99 Chapter 346 P145 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yurushi]]“Your priority?” Yurushi asked.
>>> [[speaker:yun]]“Get me far enough north that I can reach an Isgard-linked route.”
```

Existing `yun`, preceding prose announces **Yurushi Amagiri** (`yurushi`).

**S99 Chapter 346 P172 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun answered, “I need seven.”
>>> [[speaker:black_radiance]]“Why not take ten?”
```

Existing `black_radiance`, preceding prose announces **Yun Shizhen** (`yun`).

**S99 Chapter 347 P154 — The Roads He Built for Other People** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “If I get out, Shunto will look for who helped.”
>>> [[speaker:black_radiance]]“I know.”
```

Existing `black_radiance`, preceding prose announces **Yun Shizhen** (`yun`).

**S99 Chapter 348 P20 — Hana Moves One Patrol** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]Hana said, “What do you want?”
>>> [[speaker:black_radiance]]“One patrol moved.”
```

Existing `black_radiance`, preceding prose announces **Hana Arakawa** (`hana`).

**S99 Chapter 348 P95 — Hana Moves One Patrol** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]Hana said, “Who is she?”
>>> [[speaker:black_radiance]]“I do not know exactly.”
```

Existing `black_radiance`, preceding prose announces **Hana Arakawa** (`hana`).

**S99 Chapter 348 P115 — Hana Moves One Patrol** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]“You said ten.”
>>> [[speaker:black_radiance]]“Plans improve.”
```

Existing `black_radiance`, preceding prose announces **Hana Arakawa** (`hana`).

**S99 Chapter 349 P123 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Humiliating,” she muttered.
>>> [[speaker:black_radiance]]“Alive.”
```

Existing `black_radiance`, preceding prose announces **Yun Shizhen** (`yun`).

**S99 Chapter 349 P162 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “How far to the old clan path?”
>>> [[speaker:black_radiance]]“Three districts.”
```

Existing `black_radiance`, preceding prose announces **Yun Shizhen** (`yun`).

**S99 Chapter 350 P116 — Yurushi Stays Behind** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Then survive,” Yun said.
>>> [[speaker:black_radiance]]“I plan to.”
```

Existing `black_radiance`, preceding prose announces **Yun Shizhen** (`yun`).

**S100 Chapter 351 P84 — Too Full** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You said that before.”
>>> [[speaker:rhen]]“I was hoping not to need the full version.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S100 Chapter 351 P98 — Too Full** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You asked for less annoying.”
>>> [[speaker:sera]]“I did.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S100 Chapter 351 P122 — Too Full** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]Sera said, “You are going to close the door.”
>>> [[speaker:rhen]]“Yes.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S100 Chapter 351 P131 — Too Full** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]Instead she asked, “Can the Garden keep running while you are inside?”
>>> [[speaker:rhen]]“Yes. The long-term passive is already established. It does not require me to consciously maintain every cycle.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S100 Chapter 351 P144 — Too Full** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]Rhen said, “I am sorry.”
>>> [[speaker:sera]]“For needing medical treatment?”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S100 Chapter 353 P171 — Before the Door Closes** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You said that.”
>>> [[speaker:rhen]]“I remain correct.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S100 Chapter 354 P72 — Closed Garden** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]Sera said, “You owe me rent.”
>>> [[speaker:rhen]]“I remember.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S100 Chapter 357 P59 — The Warning Reaches Wuyue** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]Tae said, “Two hundred thousand?”
>>> [[speaker:sera]]“Lower bound.”
```

Existing `sera`, preceding prose announces **Tae Muyeon** (`tae`).

**S100 Chapter 357 P81 — The Warning Reaches Wuyue** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]Tae said, “All one thousand?”
>>> [[speaker:sera]]“Prepare all. Move only on command.”
```

Existing `sera`, preceding prose announces **Tae Muyeon** (`tae`).

**S100 Chapter 357 P84 — The Warning Reaches Wuyue** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“Where are you going?” Tae asked.
>>> [[speaker:huo]]“To make sure your company does not pack six months of tea and no bandages.”
```

Existing `huo`, preceding prose announces **Tae Muyeon** (`tae`).

**S100 Chapter 357 P129 — The Warning Reaches Wuyue** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“She said my name?”
>>> [[speaker:sera]]“Yes.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S100 Chapter 359 P45 — Shen Rui Names the Gale** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:rui]]Rui said, “Hear me.”
>>> [[speaker:xie_wuchen]]“I heard enough.”
```

Existing `xie_wuchen`, preceding prose announces **Shen Rui** (`rui`).

**S100 Chapter 359 P86 — Shen Rui Names the Gale** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:huo]]Huo whispered, “You knew that.”
>>> [[speaker:tae]]“I like hearing it again.”
```

Existing `tae`, preceding prose announces **Huo Wujin** (`huo`).

**S100 Chapter 359 P103 — Shen Rui Names the Gale** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]Lu said, “Probably.”
>>> [[speaker:rui]]“You brought us ledgers.” Rui continued. “Stopped extortion. Identified routes. Went where officials could not move without announcing themselves.”
```

Existing `rui`, preceding prose announces **Lu Weiran** (`luweiran`).

**S100 Chapter 359 P104 — Shen Rui Names the Gale** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:rui]]“You brought us ledgers.” Rui continued. “Stopped extortion. Identified routes. Went where officials could not move without announcing themselves.”
>>> [[speaker:xie_wuchen]]“I was nearby.”
```

Existing `xie_wuchen`, preceding prose announces **Shen Rui** (`rui`).

**S100 Chapter 360 P26 — The Empty Number Is Still a Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:huo]]Huo said, “Weather.”
>>> [[speaker:tae]]“Dramatic weather.”
```

Existing `tae`, preceding prose announces **Huo Wujin** (`huo`).

**S100 Chapter 360 P69 — The Empty Number Is Still a Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]Jin said, “You wanted the work.”
>>> [[speaker:xie_wuchen]]“I did not say wanted.”
```

Existing `xie_wuchen`, preceding prose announces **Jin Seoryu** (`jin`).

**S101 Chapter 361 P78 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“I have not asked anything.”
>>> [[speaker:tae]]“I know what your face means.”
```

Existing `tae`, preceding prose announces **Jin Seoryu** (`jin`).

**S101 Chapter 361 P193 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]Shunto said, “We can still contain—”
>>> [[speaker:tsubasa]]“No.”
```

Existing `tsubasa`, preceding prose announces **Shunto Takamori** (`shunto`).

**S101 Chapter 362 P55 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]Lu said, “We can leave a watch.”
>>> [[speaker:sera]]“We already have one.”
```

Existing `sera`, preceding prose announces **Lu Weiran** (`luweiran`).

**S101 Chapter 362 P127 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]Tae said, “That sounded like Jin.”
>>> [[speaker:sera]]“I have been near him too long.”
```

Existing `sera`, preceding prose announces **Tae Muyeon** (`tae`).

**S101 Chapter 363 P139 — Luo Reads What Yun Left Him** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“What are you doing?” Sera asked.
>>> [[speaker:luo]]“Separating the useful parts.”
```

Existing `luo`, preceding prose announces **Sera** (`sera`).

**S101 Chapter 364 P21 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Yurushi continued.
>>> [[speaker:black_radiance]]“South road is watched. Take the dyers' canal west, then the old kiln track. There will be a cart at the broken shrine.”
```

Existing `black_radiance`, preceding prose announces **Yurushi Amagiri** (`yurushi`).

**S101 Chapter 364 P84 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]Hana said, “Shunto knows someone helped the foreign woman.”
>>> [[speaker:black_radiance]]“He should investigate harder.”
```

Existing `black_radiance`, preceding prose announces **Hana Arakawa** (`hana`).

**S101 Chapter 364 P119 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]Hana said, “If you leave, you lose what access you have.”
>>> [[speaker:black_radiance]]“If I stay, my access becomes a reason to keep lending the rest of myself to people I no longer trust.”
```

Existing `black_radiance`, preceding prose announces **Hana Arakawa** (`hana`).

**S101 Chapter 364 P140 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]“Where will you go?” she asked.
>>> [[speaker:black_radiance]]“Somewhere with tea.”
```

Existing `black_radiance`, preceding prose announces **Hana Arakawa** (`hana`).

**S101 Chapter 365 P103 — Tsubasa Moves the Calendar** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:kai]]Kai said, “And if we rush?”
>>> [[speaker:tsubasa]]“We arrive against an enemy that knows we're coming but has not finished becoming ready.”
```

Existing `tsubasa`, preceding prose announces **Kai Moriyama** (`kai`).

**S101 Chapter 365 P135 — Tsubasa Moves the Calendar** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:kai]]Kai said, “Then trade with them.”
>>> [[speaker:tsubasa]]“We tried.”
```

Existing `tsubasa`, preceding prose announces **Kai Moriyama** (`kai`).

**S101 Chapter 365 P208 — Tsubasa Moves the Calendar** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:kai]]Kai said, “You are accepting the intelligence gap.”
>>> [[speaker:tsubasa]]“Yes.”
```

Existing `tsubasa`, preceding prose announces **Kai Moriyama** (`kai`).

**S101 Chapter 366 P76 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]Jin said, “Yes.”
>>> [[speaker:mo]]“My ministers will complain.”
```

Existing `mo`, preceding prose announces **Jin Seoryu** (`jin`).

**S101 Chapter 366 P125 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]Kael said, “I already do.”
>>> [[speaker:sera]]“Good.”
```

Existing `sera`, preceding prose announces **Kael Veyran** (`kael`).

**S101 Chapter 366 P144 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]Tae said, “We have not reached that agenda item.”
>>> [[speaker:sera]]“We have now.”
```

Existing `sera`, preceding prose announces **Tae Muyeon** (`tae`).

**S101 Chapter 367 P94 — The Man Who Says He Has Not Joined** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]Luo asked, “Did she tell you?”
>>> [[speaker:black_radiance]]“No.”
```

Existing `black_radiance`, preceding prose announces **Luo Wen** (`luo`).

**S101 Chapter 367 P101 — The Man Who Says He Has Not Joined** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Yurushi continued before grief could force the conversation into certainty he did not possess.
>>> [[speaker:black_radiance]]“I asked her once what he had done.”
```

Existing `black_radiance`, preceding prose announces **Yurushi Amagiri** (`yurushi`).

**S101 Chapter 367 P139 — The Man Who Says He Has Not Joined** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]Sera said, “And now?”
>>> [[speaker:black_radiance]]“Now I think I spent years hiding people from a government I kept claiming I still served.”
```

Existing `black_radiance`, preceding prose announces **Sera** (`sera`).

**S101 Chapter 368 P91 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:halvek]]Halvek said, “Already moving.”
>>> [[speaker:solveig]]“Primary roads?”
```

Existing `solveig`, preceding prose announces **Halvek Veyrhald** (`halvek`).

**S101 Chapter 368 P119 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:varok]]Varok said, “I can take mobile reserve south.”
>>> [[speaker:solveig]]“You take center until we know which landing is real.”
```

Existing `solveig`, preceding prose announces **Varok Skeldran** (`varok`).

**S101 Chapter 369 P141 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:nao]]Nao said, “Regulation.”
>>> [[speaker:kenji]]“Worse.”
```

Existing `kenji`, preceding prose announces **Nao Shibasaki** (`nao`).

**S102 Chapter 373 P61 — Raska's Last Charge** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:kenji]]“I like fighting,” Kenji answered.
>>> [[speaker:raska]]“Bad place for it.”
```

Existing `raska`, preceding prose announces **Kenji Narukami** (`kenji`).

**S102 Chapter 373 P127 — Raska's Last Charge** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:kenji]]“You are very annoying,” Kenji said.
>>> [[speaker:raska]]“Good.”
```

Existing `raska`, preceding prose announces **Kenji Narukami** (`kenji`).

**S102 Chapter 376 P110 — Graven Dominion** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:sigrun]]Sigrun answered, “I know.”
>>> [[speaker:kenji]]“You cannot keep standing.”
```

Existing `kenji`, preceding prose announces **Sigrun Veyrhald** (`sigrun`).

**S102 Chapter 377 P67 — Last Body Standing Ends** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:sigrun]]“Merciful?” she asked.
>>> [[speaker:kenji]]“Efficient.”
```

Existing `kenji`, preceding prose announces **Sigrun Veyrhald** (`sigrun`).

**S102 Chapter 378 P154 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]Solveig said, “Where were you?”
>>> [[speaker:astrid]]“Finding a road.”
```

Existing `astrid`, preceding prose announces **Solveig Skeldran** (`solveig`).

**S102 Chapter 379 P56 — Sixth Petal** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]Lu answered, “I hoped.”
>>> [[speaker:black_radiance]]“That is worse.”
```

Existing `black_radiance`, preceding prose announces **Lu Weiran** (`luweiran`).

**S102 Chapter 379 P77 — Sixth Petal** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:qin]]Qin said, “The title is senior. The authority is specific.”
>>> [[speaker:black_radiance]]“That sounds like Lu wrote it.”
```

Existing `black_radiance`, preceding prose announces **Qin Luo** (`qin`).

**S102 Chapter 380 P115 — You Are Staying Here** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:qin]]“What?” Qin asked.
>>> [[speaker:black_radiance]]“Medical credentials. Useful if Shinsei tries to move through western ports.”
```

Existing `black_radiance`, preceding prose announces **Qin Luo** (`qin`).

**S103 Chapter 383 P15 — Three Paragons in Beds** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Eirik?” Sera asked.
>>> [[speaker:aldric]]“Alive.”
```

Existing `aldric`, preceding prose announces **Sera** (`sera`).

**S103 Chapter 383 P56 — Three Paragons in Beds** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Jun?” Sera asked.
>>> [[speaker:eldran]]“Breach Dominion.”
```

Existing `eldran`, preceding prose announces **Sera** (`sera`).

**S103 Chapter 384 P90 — Where Yun Died** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“I asked for alone.”
>>> [[speaker:sera]]“You have been alone for two hours.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S103 Chapter 384 P118 — Where Yun Died** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]After a long time he asked, “Did she say his name?”
>>> [[speaker:sera]]“No.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S103 Chapter 384 P139 — Where Yun Died** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]Then he said, “I hate you sometimes.”
>>> [[speaker:sera]]“I know.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S104 Chapter 392 P132 — Tae Muyeon Takes Both** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]“Stop forcing it,” she said.
>>> [[speaker:haru]]“I know.”
```

Existing `haru`, preceding prose announces **Hana Arakawa** (`hana`).

**S104 Chapter 393 P37 — Huo Changes the Answer** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:huo]]“Not bad,” Huo said.
>>> [[speaker:hana]]“Stop complimenting us.”
```

Existing `hana`, preceding prose announces **Huo Wujin** (`huo`).

**S104 Chapter 394 P30 — Qin Ends the First Attack** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]“Do less,” Hana said.
>>> [[speaker:haru]]“I know.”
```

Existing `haru`, preceding prose announces **Hana Arakawa** (`hana`).

**S104 Chapter 395 P105 — Qin Opens the Map** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“Why?” Tae asked.
>>> [[speaker:black_radiance]]“Too much fixed weight. Even without Kael, thirty-eight thousand plus fortress systems. Haru does not enjoy problems that cannot be narrowed.”
```

Existing `black_radiance`, preceding prose announces **Tae Muyeon** (`tae`).

**S104 Chapter 397 P128 — Twilight Dominion** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]“What?” Hana asked.
>>> [[speaker:haru]]“He changed scale.”
```

Existing `haru`, preceding prose announces **Hana Arakawa** (`hana`).

**S104 Chapter 398 P94 — One Dose Becomes Three** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]“Haru,” Hana said, quieter. “Tsubasa said no heroics.”
>>> [[speaker:haru]]“This is not heroics.”
```

Existing `haru`, preceding prose announces **Hana Arakawa** (`hana`).

**S105 Chapter 402 P62 — Thousands Open the Same Seal** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Luo said roughly five minutes.”
>>> [[speaker:sera]]“Then we don’t fight five minutes.”
```

Existing `sera`, preceding prose announces **Jin Seoryu** (`jin`).

**S105 Chapter 407 P60 — Kai Moriyama Arrives** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:eirik]]“Two major,” Eirik said. “Several smaller.”
>>> [[speaker:kai]]“Aya?”
```

Existing `kai`, preceding prose announces **Eirik Voss** (`eirik`).

**S105 Chapter 407 P80 — Kai Moriyama Arrives** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:eirik]]“Peak Paragon,” Eirik said.
>>> [[speaker:kai]]“Kael?”
```

Existing `kai`, preceding prose announces **Eirik Voss** (`eirik`).

**S105 Chapter 407 P98 — Kai Moriyama Arrives** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:eirik]]“Tsubasa already said the same.”
>>> [[speaker:kai]]“Good. He remembers things.”
```

Existing `kai`, preceding prose announces **Eirik Voss** (`eirik`).

**S106 Chapter 411 P139 — You Were Not Dying** — `docs/prose/FINAL_ARC_SEASON106_PROSE_DRAFT*.md`

```text
before: [[speaker:haru]]“What happens now?” he asked.
>>> [[speaker:aya]]“I repair what can be repaired.”
```

Existing `aya`, preceding prose announces **Haru Ishikawa** (`haru`).

**S106 Chapter 412 P56 — After the War** — `docs/prose/FINAL_ARC_SEASON106_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“I have not answered yet.”
>>> [[speaker:aya]]“You will.”
```

Existing `aya`, preceding prose announces **Tsubasa Kurokawa** (`tsubasa`).

**S106 Chapter 412 P119 — After the War** — `docs/prose/FINAL_ARC_SEASON106_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“I am not dismissing what you said.”
>>> [[speaker:aya]]“No.”
```

Existing `aya`, preceding prose announces **Tsubasa Kurokawa** (`tsubasa`).

**S106 Chapter 416 P42 — Aya Gives Kenji Back His Body** — `docs/prose/FINAL_ARC_SEASON106_PROSE_DRAFT*.md`

```text
before: [[speaker:kenji]]“If she beats me again?” he asked.
>>> [[speaker:aya]]“That is not medical.”
```

Existing `aya`, preceding prose announces **Kenji Narukami** (`kenji`).

**S106 Chapter 420 P48 — Eirik Voss Returns at One Hundred Percent** — `docs/prose/FINAL_ARC_SEASON106_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“No,” Sera answered.
>>> [[speaker:jin]]“It’s that killing the same Paragon is apparently required if we want them permanently removed.”
```

Existing `jin`, preceding prose announces **Sera** (`sera`).

**S107 Chapter 422 P15 — Jun Finishes Healing** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I said you are medically cleared.”
>>> [[speaker:jun]]“That means I can go back.”
```

Existing `jun`, preceding prose announces **Aya Katsuragi** (`aya`).

**S107 Chapter 422 P38 — Jun Finishes Healing** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:jun]]“I used to think recovery meant we were harder to defeat,” Jun said.
>>> [[speaker:aya]]“We are.”
```

Existing `aya`, preceding prose announces **Jun Kajihara** (`jun`).

**S107 Chapter 422 P60 — Jun Finishes Healing** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:jun]]“For healing me,” he added.
>>> [[speaker:aya]]“You do not owe me obedience because I treated you.”
```

Existing `aya`, preceding prose announces **Jun Kajihara** (`jun`).

**S107 Chapter 424 P4 — The Unseen Gale Takes Number Ten Into Battle** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:rui]]“Put me down,” Rui said.
>>> [[speaker:xie_wuchen]]“No.”
```

Existing `xie_wuchen`, preceding prose announces **Shen Rui** (`rui`).

**S107 Chapter 424 P43 — The Unseen Gale Takes Number Ten Into Battle** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:rui]]Rui said, “Xie.”
>>> [[speaker:xie_wuchen]]“No.”
```

Existing `xie_wuchen`, preceding prose announces **Shen Rui** (`rui`).

**S108 Chapter 431 P59 — One Hundred Thousand Without One Battlefield** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Home reserve?” Sera asked.
>>> [[speaker:jin]]“Can absorb some. Not indefinitely.”
```

Existing `jin`, preceding prose announces **Sera** (`sera`).

**S108 Chapter 432 P71 — The Map That Refuses to Get Better** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Aya?” Sera asked.
>>> [[speaker:luo]]“Still appears to be pushing accurate disclosure from inside,” Luo said. “Likely more than we can prove.”
```

Existing `luo`, preceding prose announces **Sera** (`sera`).

**S108 Chapter 432 P72 — The Map That Refuses to Get Better** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Still appears to be pushing accurate disclosure from inside,” Luo said. “Likely more than we can prove.”
>>> [[speaker:sera]]“Then we do not plan around what we cannot prove.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S108 Chapter 433 P29 — Ten People Cannot Be Ten Armies** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“No one said we could.”
>>> [[speaker:jin]]“Your schedules disagree.”
```

Existing `jin`, preceding prose announces **Kael Veyran** (`kael`).

**S108 Chapter 435 P41 — Sera Commands While Hurt** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Send Ilyra?” Jin asked.
>>> [[speaker:sera]]“Restricted duty.”
```

Existing `sera`, preceding prose announces **Jin Seoryu** (`jin`).

**S108 Chapter 437 P12 — Tsubasa Has Still Not Entered the Field** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Hold still,” he said.
>>> [[speaker:sera]]“I am holding still.”
```

Existing `sera`, preceding prose announces **Luo Wen** (`luo`).

**S108 Chapter 437 P29 — Tsubasa Has Still Not Entered the Field** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Relative to the forward Paragons,” Jin said. “Yes.”
>>> [[speaker:kael]]“Peak Paragon.”
```

Existing `kael`, preceding prose announces **Jin Seoryu** (`jin`).

**S108 Chapter 437 P78 — Tsubasa Has Still Not Entered the Field** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: Liang, seated farther back, said, “You call all strong people annoying.”
>>> [[speaker:kael]]“I call you annoying and you are not even Paragon.”
```

Existing `kael`, preceding prose announces **Liang Yue** (`liang`).

**S108 Chapter 437 P99 — Tsubasa Has Still Not Entered the Field** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“Still good?” Kael asked.
>>> [[speaker:sera]]“Yes.”
```

Existing `sera`, preceding prose announces **Kael Veyran** (`kael`).

**S108 Chapter 439 P56 — The Frost Changes Colour** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“No,” Lu said.
>>> [[speaker:huo]]“Good.”
```

Existing `huo`, preceding prose announces **Lu Weiran** (`luweiran`).

**S108 Chapter 439 P66 — The Frost Changes Colour** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“Different?” Tae asked him.
>>> [[speaker:qin]]“Yes.”
```

Existing `qin`, preceding prose announces **Tae Muyeon** (`tae`).

**S108 Chapter 439 P76 — The Frost Changes Colour** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]Lu said, “No.”
>>> [[speaker:huo]]“You sound certain.”
```

Existing `huo`, preceding prose announces **Lu Weiran** (`luweiran`).

**S109 Chapter 441 P40 — How Long?** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“That was not what I asked.”
>>> [[speaker:luweiran]]“I know.”
```

Existing `luweiran`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 442 P94 — Six Months of Names** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Who ran Isgard?” Rhen asked.
>>> [[speaker:luweiran]]“Someone had to.”
```

Existing `luweiran`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 442 P130 — Six Months of Names** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Two Paragons?” he asked.
>>> [[speaker:luweiran]]“Yes.”
```

Existing `luweiran`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 442 P152 — Six Months of Names** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Thirty-five years,” he said.
>>> [[speaker:luweiran]]“Approximately.”
```

Existing `luweiran`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 443 P95 — The Three Who Stayed Home** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“You were here,” Tae said.
>>> [[speaker:huo]]“I missed him annoying you.”
```

Existing `huo`, preceding prose announces **Tae Muyeon** (`tae`).

**S109 Chapter 443 P126 — The Three Who Stayed Home** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:qin]]“Yes,” Qin replied.
>>> [[speaker:rhen]]“You fought them separately.”
```

Existing `rhen`, preceding prose announces **Qin Luo** (`qin`).

**S109 Chapter 443 P191 — The Three Who Stayed Home** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“What?” Tae asked suspiciously.
>>> [[speaker:rhen]]“Nothing.”
```

Existing `rhen`, preceding prose announces **Tae Muyeon** (`tae`).

**S109 Chapter 443 P194 — The Three Who Stayed Home** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You hated when I said things too.”
>>> [[speaker:tae]]“That is because most things you say are irritating.”
```

Existing `tae`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 443 P206 — The Three Who Stayed Home** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Sera left you here,” Rhen said. “She had a reason.”
>>> [[speaker:huo]]“We're not children guarding the shop.”
```

Existing `huo`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 443 P225 — The Three Who Stayed Home** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“What emergencies?” Tae asked.
>>> [[speaker:huo]]“I was thirsty.”
```

Existing `huo`, preceding prose announces **Tae Muyeon** (`tae`).

**S109 Chapter 444 P39 — Black Radiance and the Hidden Petal** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“He likes systems,” Lu said.
>>> [[speaker:black_radiance]]“So do I.”
```

Existing `black_radiance`, preceding prose announces **Lu Weiran** (`luweiran`).

**S109 Chapter 444 P77 — Black Radiance and the Hidden Petal** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“That is all?” Rhen asked.
>>> [[speaker:black_radiance]]“Was there supposed to be more?”
```

Existing `black_radiance`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 444 P105 — Black Radiance and the Hidden Petal** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: Yurushi breathed out slowly.
>>> [[speaker:black_radiance]]“She poisoned me the first time I tried to help.”
```

Existing `black_radiance`, preceding prose announces **Yurushi Amagiri** (`yurushi`).

**S109 Chapter 444 P111 — Black Radiance and the Hidden Petal** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]Rhen continued, “She didn't know you.”
>>> [[speaker:black_radiance]]“I know.”
```

Existing `black_radiance`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 444 P230 — Black Radiance and the Hidden Petal** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“I am,” Lu said.
>>> [[speaker:rhen]]“Today.”
```

Existing `rhen`, preceding prose announces **Lu Weiran** (`luweiran`).

**S109 Chapter 445 P12 — North Without an Army** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“This is excessive,” Rhen said.
>>> [[speaker:luweiran]]“You were sealed in stone for six months.”
```

Existing `luweiran`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 445 P55 — North Without an Army** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“That is different from what you said earlier.”
>>> [[speaker:rhen]]“I have had breakfast since then.”
```

Existing `rhen`, preceding prose announces **Tae Muyeon** (`tae`).

**S109 Chapter 446 P127 — Sera** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Don't,” she said into his coat.
>>> [[speaker:rhen]]“I didn't say anything.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S109 Chapter 446 P161 — Sera** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Tae said that too.”
>>> [[speaker:sera]]“Then Tae was right.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 447 P31 — Sanctuary of Petals** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Better?” he asked.
>>> [[speaker:sera]]“Don't look smug.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 447 P160 — Sanctuary of Petals** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“One is for him?” he asked.
>>> [[speaker:sera]]“Yes.”
```

Existing `sera`, preceding prose announces **Jin Seoryu** (`jin`).

**S109 Chapter 448 P21 — Aya Watches Another Physician** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I am not offended,” she said.
>>> [[speaker:luo]]“Good.”
```

Existing `luo`, preceding prose announces **Aya Katsuragi** (`aya`).

**S109 Chapter 448 P152 — Aya Watches Another Physician** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Did you approve three-times use?” he asked.
>>> [[speaker:aya]]“I signed the medical viability assessment.”
```

Existing `aya`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 448 P187 — Aya Watches Another Physician** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“The war is separate,” he continued. “Do not confuse repairing a person with endorsing every order that person may receive afterward.”
>>> [[speaker:aya]]“That is convenient.”
```

Existing `aya`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 448 P220 — Aya Watches Another Physician** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Fourth row,” Rhen answered.
>>> [[speaker:aya]]“Paragon-level circulation instability.”
```

Existing `aya`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 448 P267 — Aya Watches Another Physician** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]Then Aya said, “I started writing the numbers into every Redline record.”
>>> [[speaker:rhen]]“I heard.”
```

Existing `rhen`, preceding prose announces **Aya Katsuragi** (`aya`).

**S109 Chapter 449 P48 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:aldric]]“Maedra?” he asked.
>>> [[speaker:rhen]]“Threatening a surgeon.”
```

Existing `rhen`, preceding prose announces **Aldric Veyrhald** (`aldric`).

**S109 Chapter 449 P120 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Working,” Sera said.
>>> [[speaker:maedra]]“Of course she is.”
```

Existing `maedra`, preceding prose announces **Sera** (`sera`).

**S109 Chapter 449 P151 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:sigrun]]“You changed,” she said.
>>> [[speaker:rhen]]“Apparently.”
```

Existing `rhen`, preceding prose announces **Sigrun Veyrhald** (`sigrun`).

**S109 Chapter 449 P275 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Happy?” she asked.
>>> [[speaker:rhen]]“Yes.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S109 Chapter 450 P135 — Rhen Does Not Take Command** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“What?” Rhen asked.
>>> [[speaker:jin]]“Nothing.”
```

Existing `jin`, preceding prose announces **Rhen** (`rhen`).

**S109 Chapter 450 P164 — Rhen Does Not Take Command** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You're smiling,” she whispered.
>>> [[speaker:rhen]]“Am I?”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S109 Chapter 450 P203 — Rhen Does Not Take Command** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“So we plan for all of them,” she said.
>>> [[speaker:jin]]“Yes.”
```

Existing `jin`, preceding prose announces **Sera** (`sera`).

**S109 Chapter 450 P235 — Rhen Does Not Take Command** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You're really okay with this?” she asked.
>>> [[speaker:rhen]]“With what?”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S110 Chapter 451 P121 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Rhen said you forgot breakfast.”
>>> [[speaker:jin]]“I did not forget it.”
```

Existing `jin`, preceding prose announces **Sera** (`sera`).

**S110 Chapter 451 P182 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Rhen said the same.”
>>> [[speaker:jin]]“I know.”
```

Existing `jin`, preceding prose announces **Sera** (`sera`).

**S110 Chapter 455 P86 — The Sealed Account** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]Lu added, “Neither does the person until the final exchange point.”
>>> [[speaker:black_radiance]]“You are unsettling.”
```

Existing `black_radiance`, preceding prose announces **Lu Weiran** (`luweiran`).

**S110 Chapter 457 P73 — Hana's Changed Patrol** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]“You asked for me.”
>>> [[speaker:shunto]]“Yes.”
```

Existing `shunto`, preceding prose announces **Hana Arakawa** (`hana`).

**S110 Chapter 457 P122 — Hana's Changed Patrol** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“That is not what I asked.”
>>> [[speaker:hana]]“It is what I am answering.”
```

Existing `hana`, preceding prose announces **Shunto Takamori** (`shunto`).

**S110 Chapter 458 P59 — Tsubasa Asks Once** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“No follow-up?” Shunto said.
>>> [[speaker:tsubasa]]“I said once.”
```

Existing `tsubasa`, preceding prose announces **Shunto Takamori** (`shunto`).

**S110 Chapter 458 P60 — Tsubasa Asks Once** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“I said once.”
>>> [[speaker:shunto]]“You came here for one question.”
```

Existing `shunto`, preceding prose announces **Tsubasa Kurokawa** (`tsubasa`).

**S110 Chapter 459 P21 — The Three Who Say No** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:hana]]“No,” Hana said.
>>> [[speaker:aya]]“We are not sabotaging the army.”
```

Existing `aya`, preceding prose announces **Hana Arakawa** (`hana`).

**S110 Chapter 459 P88 — The Three Who Say No** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Did you?” Aya asked.
>>> [[speaker:hana]]“No.”
```

Existing `hana`, preceding prose announces **Aya Katsuragi** (`aya`).

**S110 Chapter 460 P58 — The Second Seat Is Stripped** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“I asked whether anything material was omitted.”
>>> [[speaker:shunto]]“You asked a vague question about a chaotic detention.”
```

Existing `shunto`, preceding prose announces **Tsubasa Kurokawa** (`tsubasa`).

**S110 Chapter 460 P59 — The Second Seat Is Stripped** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“You asked a vague question about a chaotic detention.”
>>> [[speaker:tsubasa]]“I asked once so there would be no confusion.”
```

Existing `tsubasa`, preceding prose announces **Shunto Takamori** (`shunto`).

**S110 Chapter 460 P60 — The Second Seat Is Stripped** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“I asked once so there would be no confusion.”
>>> [[speaker:shunto]]“You came to me having already decided.”
```

Existing `shunto`, preceding prose announces **Tsubasa Kurokawa** (`tsubasa`).

**S111 Chapter 462 P104 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“I said I dislike the timing.”
>>> [[speaker:luo]]“Your instincts are not medicine.”
```

Existing `luo`, preceding prose announces **Kael Veyran** (`kael`).

**S111 Chapter 462 P171 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]Luo added, “And yours.”
>>> [[speaker:kael]]“That was not comforting.”
```

Existing `kael`, preceding prose announces **Luo Wen** (`luo`).

**S111 Chapter 470 P237 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Do not restore Shunto to combat condition,” Luo said.
>>> [[speaker:rhen]]“I wasn't planning to.”
```

Existing `rhen`, preceding prose announces **Luo Wen** (`luo`).

**S112 Chapter 471 P40 — Shunto Is Not a Martyr** — `docs/prose/FINAL_ARC_SEASON112_PROSE_DRAFT*.md`

```text
before: [[speaker:eirik]]“No,” Eirik said. “I am surprised.”
>>> [[speaker:tsubasa]]“By what?”
```

Existing `tsubasa`, preceding prose announces **Eirik Voss** (`eirik`).

**S112 Chapter 473 P57 — Tsubasa Refuses** — `docs/prose/FINAL_ARC_SEASON112_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]Sera said, “And therefore?”
>>> [[speaker:tsubasa]]“Therefore if the institution that ended them can be forced to kneel whenever a stronger foreign coalition arrives, every clan chief in Shinrin learns the wrong lesson.”
```

Existing `tsubasa`, preceding prose announces **Sera** (`sera`).

**S112 Chapter 474 P100 — Rhen Says He Can End It** — `docs/prose/FINAL_ARC_SEASON112_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]Rhen added, “Probably.”
>>> [[speaker:sera]]“Wonderful.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S112 Chapter 477 P109 — Orchid Dominion** — `docs/prose/FINAL_ARC_SEASON112_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]Tsubasa said, “Your Domain doesn't punish patience.”
>>> [[speaker:sera]]“No.”
```

Existing `sera`, preceding prose announces **Tsubasa Kurokawa** (`tsubasa`).

**S113 Chapter 481 P49 — No Debt Between Us** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“What are you doing?” she asked.
>>> [[speaker:rhen]]“Finishing the treatment faster.”
```

Existing `rhen`, preceding prose announces **Aya Katsuragi** (`aya`).

**S113 Chapter 481 P237 — No Debt Between Us** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You said it hurt.”
>>> [[speaker:sera]]“I did not.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S113 Chapter 483 P111 — Fifty Thousand Redlines** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Yes,” Rhen said.
>>> [[speaker:sera]]“How much?”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S113 Chapter 489 P136 — Tsubasa Without Heaven** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“You healed me,” Tsubasa said.
>>> [[speaker:rhen]]“Yes.”
```

Existing `rhen`, preceding prose announces **Tsubasa Kurokawa** (`tsubasa`).

**S113 Chapter 490 P63 — The Last Argument** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: [[speaker:nao]]“That may be the smartest thing you've said.”
>>> [[speaker:haru]]“Don't ruin it.”
```

Existing `haru`, preceding prose announces **Nao Shibasaki** (`nao`).

**S113 Chapter 490 P274 — The Last Argument** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You said that yesterday.”
>>> [[speaker:sera]]“I was wrong yesterday.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S114 Chapter 491 P29 — After the Snow** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Are they safe?” she asked.
>>> [[speaker:rhen]]“Yes.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S114 Chapter 495 P120 — The Numbers Remember** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“You said you weren't coming.”
>>> [[speaker:liang]]“I said nothing of the sort.”
```

Existing `liang`, preceding prose announces **Kael Veyran** (`kael`).

**S114 Chapter 495 P122 — The Numbers Remember** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“You called it a terrible idea.”
>>> [[speaker:liang]]“It is.”
```

Existing `liang`, preceding prose announces **Kael Veyran** (`kael`).

**S114 Chapter 497 P117 — No Throne in the North** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You're smiling,” he said.
>>> [[speaker:sera]]“Am I?”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S114 Chapter 499 P68 — Xue Ra and Ri Xue** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:qin]]One afternoon Qin asked, “What brings you here?”
>>> [[speaker:arin]]“Regional coordination.”
```

Existing `arin`, preceding prose announces **Qin Luo** (`qin`).

**S114 Chapter 499 P105 — Xue Ra and Ri Xue** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“Nine minutes early,” Lu said.
>>> [[speaker:xie_wuchen]]“Wind.”
```

Existing `xie_wuchen`, preceding prose announces **Lu Weiran** (`luweiran`).

**S114 Chapter 499 P154 — Xue Ra and Ri Xue** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Huo shouted Petals Monarch from across the street yesterday.”
>>> [[speaker:rhen]]“He also forgets.”
```

Existing `rhen`, preceding prose announces **Sera** (`sera`).

**S114 Chapter 499 P164 — Xue Ra and Ri Xue** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Your idea,” he said.
>>> [[speaker:sera]]“Our idea.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S114 Chapter 499 P166 — Xue Ra and Ri Xue** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You said clinic.”
>>> [[speaker:sera]]“You said people keep finding us anyway.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S114 Chapter 500 P41 — My Minis** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You're staring,” he said.
>>> [[speaker:sera]]“Yes.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

**S114 Chapter 500 P82 — My Minis** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You said the future.”
>>> [[speaker:sera]]“Same thing.”
```

Existing `sera`, preceding prose announces **Rhen** (`rhen`).

## G. Marked paragraph contains multiple explicitly attributed named speakers

Count: **1**

**S114 Chapter 499 P48 — Xue Ra and Ri Xue** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

- marker: `kael` speakers: liang:Liang Yue, kael:Kael Veyran
- [[speaker:kael]]“Why are you here?” Kael asked once at a coastal inn six hundred miles from Liang's territory.

## H. Marked mixed paragraph uses only ASCII quotes

Count: **0**

## I. HIGH-VALUE: unmarked quote with one explicit named speech attribution

Count: **20**

**S87 Chapter 221 P10 — Three Gates Open at Once** — `src/data/seasons/season-087.json`

```text
before: He felt the difference through his weapon.
>>> “Again,” Sigrun said.
after: Kael did not mistake invitation for confidence. She wanted his strength committed where her law could learn its weight.
```

Candidate: **Sigrun Veyrhald** (`sigrun`).

**S88 Chapter 234 P13 — Sera Cannot Call It Orchid Dominion** — `src/data/seasons/season-088.json`

```text
before: [[speaker:sera]]“No.”
>>> “It buys time,” Jin said through the signal officer.
after: [[speaker:sera]]“With a lie that becomes a battlefield order.”
```

Candidate: **Jin Seoryu** (`jin`).

**S96 Chapter 311 P130 — Strength With a Dosage Table** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“It is my ledger.”
>>> Yun, without looking up, said, “He loves those more than he loves people.”
after: Lu considered this.
```

Candidate: **Yun Shizhen** (`yun`).

**S96 Chapter 314 P81 — Yun Asks for the Road** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Then call it three.”
>>> “Three weeks,” Luo repeated.
after: Yun nodded.
```

Candidate: **Luo Wen** (`luo`).

**S100 Chapter 353 P13 — Before the Door Closes** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Neither had said much about it during the day because Quaint contained one thousand people and apparently all one thousand could detect private emotion through walls when given sufficient opportunity.
>>> Tae had offered to “guard the chamber by punching anyone suspicious.”
after: Huo had told him the chamber was underground and punching the mountain was unnecessary.
```

Candidate: **Tae Muyeon** (`tae`).

**S100 Chapter 359 P169 — Shen Rui Names the Gale** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Huo covered it with one hand.
>>> Xie finally said, “Publicly?”
after: Sera nodded.
```

Candidate: **Xie Wuchen** (`xie_wuchen`).

**S101 Chapter 366 P84 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:mo]]“If the quartermasters are not complaining, somebody forgot to move an army.”
>>> Lu, from the other side of the room, said, “Correct.”
after: Mo looked pleased to receive the highest available logistical blessing.
```

Candidate: **Lu Weiran** (`luweiran`).

**S101 Chapter 366 P179 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Lu made a note.
>>> “What are you writing?” Tae demanded.
after: [[speaker:luweiran]]“Evidence.”
```

Candidate: **Tae Muyeon** (`tae`).

**S102 Chapter 372 P56 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: Executing a schedule.
>>> “Push,” Jun ordered.
after: Shinsei moved through the breach.
```

Candidate: **Jun Kajihara** (`jun`).

**S102 Chapter 379 P5 — Sixth Petal** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: On the fourth, Qin Luo asked him to explain which kinds of Shinsei requisition orders could be forged by regional officers and which required central authentication.
>>> On the seventh, Tae Muyeon handed him a crate and said, “If you are not one of us, carry this like an outsider.”
after: Yurushi carried it.
```

Candidate: **Tae Muyeon** (`tae`).

**S102 Chapter 379 P13 — Sixth Petal** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]He said, “I have not accepted wages.”
>>> Lu, without looking up from a ledger, said, “You have eaten fourteen meals.”
after: Yurushi stared at him.
```

Candidate: **Lu Weiran** (`luweiran`).

**S107 Chapter 430 P57 — We Beat Them Yesterday** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Separate disabled from unrecoverable.”
>>> The medic beside Sera muttered, “Physicians have been telling armies to do that for centuries.”
after: Jin looked at her.
```

Candidate: **Sera** (`sera`).

**S108 Chapter 437 P77 — Tsubasa Has Still Not Entered the Field** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“Annoying.”
>>> Liang, seated farther back, said, “You call all strong people annoying.”
after: [[speaker:kael]]“I call you annoying and you are not even Paragon.”
```

Candidate: **Liang Yue** (`liang`).

**S110 Chapter 457 P168 — Hana's Changed Patrol** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: Outside, they walked in silence until the security tents were behind them.
>>> Nao finally said, “That was stupid.”
after: Hana looked at her.
```

Candidate: **Nao Shibasaki** (`nao`).

**S110 Chapter 458 P114 — Tsubasa Asks Once** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: Silence.
>>> “Consistent,” Tsubasa repeated.
after: [[speaker:aya]]“Yes. Not proof by themselves.”
```

Candidate: **Tsubasa Kurokawa** (`tsubasa`).

**S110 Chapter 460 P16 — The Second Seat Is Stripped** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: She verbally refused him before the door closed.
>>> Shunto later ordered the medical log rewritten under “resistance-related restraint injury.”
after: The guard did not see the assault itself.
```

Candidate: **Shunto Takamori** (`shunto`).

**S114 Chapter 491 P68 — After the Snow** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: Shen Rui sat down on a broken supply crate without dignity.
>>> Ilyra Serath simply sheathed her weapon and said, “Finally.”
after: Mo Qingzhao looked toward the sleeping Shinsei army.
```

Candidate: **Ilyra Serath** (`ilyra`).

**S114 Chapter 493 P49 — Strength Is Not Government** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“Enough to be dangerous.”
>>> Maedra Dravaryn, joining by sealed field relay from another Isgard command point, said, “That was not the question.”
after: Tsubasa nodded.
```

Candidate: **Maedra Dravaryn** (`maedra`).

**S114 Chapter 495 P77 — The Numbers Remember** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: That produced more confusion than the retirement.
>>> Liang Yue, standing beside the second pillar, muttered, “Terrible idea.”
after: Kael looked at him.
```

Candidate: **Liang Yue** (`liang`).

**S114 Chapter 497 P17 — No Throne in the North** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:maedra]]“I hate symbolism.”
>>> Solveig, standing between them, said, “Sign the document.”
after: They did.
```

Candidate: **Solveig Skeldran** (`solveig`).

## J. HIGH-VALUE: unmarked standalone quote after explicit announced-speaker narration

Count: **16**

**S95 Chapter 306 P120 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“For how long?” Luo asked.
>>> “Minutes.”
after: [[speaker:luo]]“What cost?”
```

Candidate: **Luo Wen** (`luo`).

**S95 Chapter 308 P69 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“To what?” Luo asked.
>>> “Everything I already had.”
after: Rhen's gaze sharpened slightly.
```

Candidate: **Luo Wen** (`luo`).

**S95 Chapter 308 P124 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]Luo asked, “What were you told recovery would be?”
>>> “Two days tired. Maybe nausea.”
after: “Anything about future vitality?”
```

Candidate: **Luo Wen** (`luo`).

**S95 Chapter 308 P234 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“A chart?” Luo asked.
>>> “Different colors. Different weights.”
after: [[speaker:luo]]“How many?”
```

Candidate: **Luo Wen** (`luo`).

**S96 Chapter 316 P45 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“What happens there?” she asked, nodding toward the dispute hall.
>>> “Depends who is lying.”
after: [[speaker:yun]]“Clan court?”
```

Candidate: **Yun Shizhen** (`yun`).

**S96 Chapter 316 P72 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Children still do that?” Yun asked.
>>> “Every spring.”
after: [[speaker:yun]]“For Shinsei?”
```

Candidate: **Yun Shizhen** (`yun`).

**S96 Chapter 318 P98 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: He stared at Yun as though she had asked whether rain still fell.
>>> “She’s one of the Ten.”
after: Yun kept her face neutral.
```

Candidate: **Yun Shizhen** (`yun`).

**S97 Chapter 322 P57 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “My math is usually polite.”
>>> “Then perhaps the country is rude.”
after: She looked at him.
```

Candidate: **Yun Shizhen** (`yun`).

**S97 Chapter 328 P72 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “Possibly.”
>>> “That is not reassuring.”
after: [[speaker:yun]]“I’m not here to hurt you.”
```

Candidate: **Yun Shizhen** (`yun`).

**S98 Chapter 331 P147 — Safehouses Become Calendar Marks** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“He is unreliable,” she said.
>>> “I told you river men were useless.”
after: [[speaker:yun]]“You were right.”
```

Candidate: **Yun Shizhen** (`yun`).

**S100 Chapter 356 P116 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“At whom?” Yun asked.
>>> “You.”
after: [[speaker:yun]]“Fair.”
```

Candidate: **Yun Shizhen** (`yun`).

**S100 Chapter 358 P39 — The Empty Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]Jin said, “How much?”
>>> “Best case, hours. Worst case, a day if the road relay is interrupted.”
after: A day.
```

Candidate: **Jin Seoryu** (`jin`).

**S101 Chapter 361 P13 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Do not count grain carriers twice,” Jin said.
>>> “I did not.”
after: [[speaker:jin]]“You did yesterday.”
```

Candidate: **Jin Seoryu** (`jin`).

**S101 Chapter 368 P137 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“What has moved?” Solveig asked.
>>> “Medicine. Preserved food. Surgical supplies. Two fast naval escorts. Wuyue says the main expedition is not ready to sail without becoming a supply failure halfway north.”
after: Varok muttered something impolite.
```

Candidate: **Solveig Skeldran** (`solveig`).

**S101 Chapter 370 P18 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:varok]]Varok said, “That is a defensive method.”
>>> “No.”
after: Orven looked at him.
```

Candidate: **Varok Skeldran** (`varok`).

**S105 Chapter 403 P56 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“How many doses?” she asked.
>>> “One.”
after: [[speaker:aya]]“Duration?”
```

Candidate: **Aya Katsuragi** (`aya`).

## K. REVIEW: unmarked mixed quote with pronoun speech attribution

Count: **21**

**S87 Chapter 228 P9 — Kael Holds the Centre Alone** — `src/data/seasons/season-087.json`

```text
before: Kael did not turn.
>>> “You heard it,” she said.
after: [[speaker:kael]]“So did you.”
```

Named mentions in paragraph: _none_.

**S88 Chapter 235 P31 — Kael Carries a Retreat Instead of a Victory** — `src/data/seasons/season-088.json`

```text
before: Sigrun did not declare herself stronger than everything he was. She had prepared the battlefield, chosen the plea and required three other Sovereigns to close the roads.
>>> “You carried them,” she said.
after: Kael tried to rise. His weapon arm did not answer.
```

Named mentions in paragraph: _none_.

**S95 Chapter 304 P208 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Recognition arrived too late.
>>> “Oh,” he whispered.
after: Huo smiled.
```

Named mentions in paragraph: _none_.

**S95 Chapter 304 P230 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Silence did the work.
>>> Finally he whispered, “Enough to get out.”
after: [[speaker:sera]]“Did you?” Sera asked.
```

Named mentions in paragraph: _none_.

**S96 Chapter 316 P9 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: Disciplined spacing. Clean equipment. No swaggering at merchants. No demanding “inspection gifts.” One stepped into the road only after the convoy stopped at the marked gate.
>>> “Medical cargo?” he asked.
after: Yun handed over the permit Lu had arranged.
```

Named mentions in paragraph: _none_.

**S96 Chapter 318 P4 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The clerk had sent her there because one of Axtaya’s precursor ingredients appeared in an old emergency-tonic registry.
>>> “Third cabinet,” he said without looking up. “Circulatory supports. Pre-unification formats are red-tagged.”
after: Yun paused.
```

Named mentions in paragraph: _none_.

**S97 Chapter 328 P90 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Of course.”
>>> “Also,” he added, “Second Seat does not usually bring this many people for harmless merchants.”
after: Yun’s expression flattened.
```

Named mentions in paragraph: _none_.

**S99 Chapter 341 P81 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Wonderful.
>>> When the physician finished, he said, “You will be questioned.”
after: [[speaker:yun]]“I was hoping for a holiday.”
```

Named mentions in paragraph: _none_.

**S99 Chapter 342 P59 — She Does Not Give Him the War** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Good.
>>> “Who is waiting for this?” he asked.
after: [[speaker:yun]]“No one.”
```

Named mentions in paragraph: _none_.

**S99 Chapter 344 P74 — The Prison Is Still a Laboratory** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Shunto did not.
>>> “Treatment?” he asked.
after: Yun answered before the doctor.
```

Named mentions in paragraph: _none_.

**S99 Chapter 349 P222 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: No attempt to turn her escape into his anger.
>>> “Isgard first,” he agreed.
after: By dusk, they reached the forgotten ridge path.
```

Named mentions in paragraph: _none_.

**S100 Chapter 355 P83 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“How long?” she asked.
>>> He said, “Do not talk.”
after: [[speaker:yun]]“Bad answer.”
```

Named mentions in paragraph: _none_.

**S101 Chapter 364 P17 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A woman waited there with two children and a travel bundle.
>>> “South road?” she asked.
after: [[speaker:black_radiance]]“No.”
```

Named mentions in paragraph: _none_.

**S102 Chapter 375 P123 — Eldran Stands Where Maedra Would Have Died** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: Not two bodies for a story.
>>> “Take the junction,” he ordered.
after: Shinsei moved.
```

Named mentions in paragraph: _none_.

**S102 Chapter 378 P14 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: A courier stood at the main table holding a sealed supply order.
>>> “Whose mark?” he asked.
after: Silence.
```

Named mentions in paragraph: _none_.

**S102 Chapter 378 P200 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: She had no intention of becoming comfortable in it.
>>> “Next,” she said.
after: The next messenger stepped forward.
```

Named mentions in paragraph: _none_.

**S109 Chapter 445 P181 — North Without an Army** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: A Wuyue naval officer on the hospital ship looked over the rail when a line of tiny frost crystals appeared across the water fifty yards away.
>>> “Did you see that?” she asked.
after: The sailor beside her squinted.
```

Named mentions in paragraph: _none_.

**S109 Chapter 447 P96 — Sanctuary of Petals** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: Whichever pipe carried the water fastest should be used.
>>> “What are you going to do?” she asked.
after: Rhen looked up at the morning sky.
```

Named mentions in paragraph: _none_.

**S110 Chapter 454 P207 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: At one bed, a nineteen-year-old soldier held the amended notice with both hands.
>>> “Five years?” he asked.
after: Aya stopped.
```

Named mentions in paragraph: _none_.

**S111 Chapter 470 P147 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The Shinsei captain stopped well outside range.
>>> “Shunto Takamori acted without Shinsei authority!” he shouted. “We request joint custody pending medical stabilization and formal judgment!”
after: Nobody answered.
```

Named mentions in paragraph: _none_.

**S114 Chapter 492 P45 — What Cannot Be Returned** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You're both unbearable.”
>>> “Bed,” they said together.
after: Sera walked away muttering about conspiracy.
```

Named mentions in paragraph: _none_.

## L. REVIEW: unmarked standalone quote after single named action cue

Count: **17**

**S85 Chapter 203 P8 — Sixty Percent Must Remain** — `src/data/seasons/season-085.json`

```text
before: An imperial officer looked from the stones to Kael.
>>> “Yet Kael is crossing north.”
after: [[speaker:kael]]“My army is not my shadow.”
```

Action-cue candidate: **Kael Veyran** (`kael`).

**S87 Chapter 228 P7 — Kael Holds the Centre Alone** — `src/data/seasons/season-087.json`

```text
before: Sigrun looked toward the southern smoke.
>>> “A settlement beyond the east road sent a civilian bell.”
after: Kael did not turn.
```

Action-cue candidate: **Sigrun Veyrhald** (`sigrun`).

**S95 Chapter 304 P233 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: He looked down at Huo's hands holding him to the table.
>>> “No.”
after: Outside, the mountain remained quiet.
```

Action-cue candidate: **Huo Wujin** (`huo`).

**S95 Chapter 308 P259 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Then looked at Rhen.
>>> “Can you give back what I lost?”
after: Rhen did not lie.
```

Action-cue candidate: **Rhen** (`rhen`).

**S95 Chapter 310 P23 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The broker looked at Yun.
>>> “That is what it was called on the invoices.”
after: [[speaker:yun]]“By whom?”
```

Action-cue candidate: **Yun Shizhen** (`yun`).

**S96 Chapter 318 P98 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: He stared at Yun as though she had asked whether rain still fell.
>>> “She’s one of the Ten.”
after: Yun kept her face neutral.
```

Action-cue candidate: **Yun Shizhen** (`yun`).

**S99 Chapter 349 P149 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Inside, the owner looked at Yurushi’s seal and swore.
>>> “Again?”
after: [[speaker:black_radiance]]“Sorry.”
```

Action-cue candidate: **Yurushi Amagiri** (`yurushi`).

**S100 Chapter 358 P32 — The Empty Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Sera looked up.
>>> “The Top Ten command relay has a vacancy.”
after: Silence.
```

Action-cue candidate: **Sera** (`sera`).

**S101 Chapter 370 P13 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Orven stared at the shieldwork report from Brynja's coast.
>>> “Read the brace again.”
after: A clerk did.
```

Action-cue candidate: **Brynja Kharvorn** (`brynja`).

**S103 Chapter 381 P86 — The Crossing** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A young swordswoman looked up as Arin passed.
>>> “Lady Arin.”
after: [[speaker:arin]]“Sleep.”
```

Action-cue candidate: **Arin Vale** (`arin`).

**S103 Chapter 388 P10 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: He looked at Sera when she approached and swallowed.
>>> “Do it.”
after: Sera stopped.
```

Action-cue candidate: **Sera** (`sera`).

**S103 Chapter 388 P49 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A Dravaryn sergeant stopped beside a row of captured Shinsei infantry and looked at Sera.
>>> “They did this to us.”
after: Sera understood what he meant.
```

Action-cue candidate: **Sera** (`sera`).

**S105 Chapter 406 P35 — The First Five-Minute Retreat** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: A nervous officer looked at Jin.
>>> “We’re losing the ridge.”
after: “Yes.”
```

Action-cue candidate: **Jin Seoryu** (`jin`).

**S108 Chapter 436 P36 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: The medic looked at Luo.
>>> “What am I feeling?”
after: [[speaker:luo]]“Vital reserve after expenditure.”
```

Action-cue candidate: **Luo Wen** (`luo`).

**S109 Chapter 446 P16 — Sera** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You should have that looked at.”
>>> “Yes, sir.”
after: [[speaker:rhen]]“Now.”
```

Action-cue candidate: **Rhen** (`rhen`).

**S111 Chapter 461 P214 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: Tsubasa looked at him.
>>> “Former Second Seat used still-live supply authorization at West Three.”
after: [[speaker:tsubasa]]“Destination?”
```

Action-cue candidate: **Tsubasa Kurokawa** (`tsubasa`).

**S113 Chapter 482 P25 — Five Years** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: Then looked at Aya.
>>> “Is that real?”
after: [[speaker:aya]]“Yes.”
```

Action-cue candidate: **Aya Katsuragi** (`aya`).

## M. OPTIONAL: unmarked dialogue with one neutral-role speech attribution

Count: **3**

**S88 Chapter 233 P6 — Unbroken Dominion** — `src/data/seasons/season-088.json`

```text
before: The first rank discovered they could not lower their shields. Releasing one would let the unfinished thrust complete through the soldiers behind them. The second rank reinforced the first and became responsible for sustaining the same attack. A thousand correct defensive actions turned into one continuing obligation.
>>> “Rotate!” an imperial captain shouted.
after: The replacement formation touched the shield line and inherited the pressure before the exhausted soldiers could leave.
```

Neutral-role candidate: **Captain** (`captain`).

**S99 Chapter 341 P81 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Wonderful.
>>> When the physician finished, he said, “You will be questioned.”
after: [[speaker:yun]]“I was hoping for a holiday.”
```

Neutral-role candidate: **Physician Su** (`physician`).

**S100 Chapter 355 P130 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: “Can she speak?”
>>> The physician said, “Briefly.”
after: [[speaker:yun]]Yun said, “Long enough.”
```

Neutral-role candidate: **Physician Su** (`physician`).

## N. All remaining unmarked standalone dialogue

Count: **841**

**S1 Episode 2 P14 — The Pale Orchid** — `src/data/seasons/season-001.json`

```text
before: Then at her.
>>> “No.”
after: [[speaker:sera]]“Good answer.”
```

**S1 Episode 2 P58 — The Pale Orchid** — `src/data/seasons/season-001.json`

```text
before: The assassin swallowed.
>>> “The House remembers.”
after: Sera stopped.
```

**S1 Episode 9 P6 — Who Are You?** — `src/data/seasons/season-001.json`

```text
before: His face changed.
>>> “...You.”
after: Rhen's expression lost every trace of humor.
```

**S1 Episode 9 P11 — Who Are You?** — `src/data/seasons/season-001.json`

```text
before: That was enough.
>>> “You're supposed to be dead.”
after: Rhen tilted his head.
```

**S2 Episode 1 P27 — The Man Who Couldn't Fall** — `src/data/seasons/season-002.json`

```text
before: The physician shook his head.
>>> “That's what the body says.”
after: Rhen spoke from behind her.
```

**S2 Episode 1 P31 — The Man Who Couldn't Fall** — `src/data/seasons/season-002.json`

```text
before: The physician looked up.
>>> “Excuse me?”
after: [[speaker:rhen]]“One attacker.”
```

**S2 Episode 1 P33 — The Man Who Couldn't Fall** — `src/data/seasons/season-002.json`

```text
before: [[speaker:rhen]]“One attacker.”
>>> “You haven't examined him.”
after: [[speaker:rhen]]“No.”
```

**S2 Episode 1 P35 — The Man Who Couldn't Fall** — `src/data/seasons/season-002.json`

```text
before: [[speaker:rhen]]“No.”
>>> “Then how would you know?”
after: Rhen lifted his cup.
```

**S3 Episode 9 P37 — Prepared for the Wrong Monster** — `src/data/seasons/season-003.json`

```text
before: The Court master finally understood.
>>> “You were supposed to bring him.”
after: Sera removed her translucent veil.
```

**S8 Episode 10 P26 — The Others** — `src/data/seasons/season-008.json`

```text
before: He spoke one sentence.
>>> “Is the snow still falling?”
after: The old seal held, but the world beyond it no longer felt empty.
```

**S17 Episode 10 P21 — The Quiet Regular** — `src/data/seasons/season-017.json`

```text
before: A voice whispered:
>>> “Not yet.”
after: Somewhere beyond the city, something had begun to move.
```

**S85 Chapter 201 P7 — The Order Nobody Explains Twice** — `src/data/seasons/season-085.json`

```text
before: [[speaker:lei]]“How long?”
>>> “Seven hours until the vanguard can move. Two days until the full column clears the western roads.”
after: [[speaker:lei]]“Make it eight hours. Check every axle twice.”
```

**S85 Chapter 203 P8 — Sixty Percent Must Remain** — `src/data/seasons/season-085.json`

```text
before: An imperial officer looked from the stones to Kael.
>>> “Yet Kael is crossing north.”
after: [[speaker:kael]]“My army is not my shadow.”
```

**S85 Chapter 206 P3 — Qin Commands Armies That Are Not His** — `src/data/seasons/season-085.json`

```text
before: Stonecrown’s deputy marshal stood on the western side of the table. White Vein’s chief inspector stood on the eastern side. Behind each waited officers who had served their own Sovereign longer than Qin had possessed a repaired meridian.
>>> “The Stonecrown Army answers to Kael Veyran.”
after: “The White Vein Reserve answers to Liang Yue.”
```

**S85 Chapter 206 P4 — Qin Commands Armies That Are Not His** — `src/data/seasons/season-085.json`

```text
before: “The Stonecrown Army answers to Kael Veyran.”
>>> “The White Vein Reserve answers to Liang Yue.”
after: Qin rested two fingers on the map. Through the wood, he heard guarded heartbeats, tightened boots and the faint vibration of soldiers outside repositioning when neither delegation had ordered them to.
```

**S85 Chapter 207 P10 — The Regent Opens the Imperial Seal** — `src/data/seasons/season-085.json`

```text
before: [[speaker:mo]]“Yes.”
>>> “Then why not issue the order yourself?”
after: Mo looked at the child above him.
```

**S85 Chapter 207 P16 — The Regent Opens the Imperial Seal** — `src/data/seasons/season-085.json`

```text
before: Mo presented the honest range. The lower number changed several faces. The upper number silenced the room. He did not hide either beneath words like acceptable.
>>> “Will you return them?”
after: [[speaker:mo]]“I will return everyone I can. I will account by name for everyone I cannot.”
```

**S85 Chapter 207 P22 — The Regent Opens the Imperial Seal** — `src/data/seasons/season-085.json`

```text
before: Mo stood beside the child monarch as the first column passed beneath the eastern gate.
>>> “Regent.”
after: [[speaker:mo]]“Your Majesty.”
```

**S85 Chapter 207 P24 — The Regent Opens the Imperial Seal** — `src/data/seasons/season-085.json`

```text
before: [[speaker:mo]]“Your Majesty.”
>>> “Bring back the seal.”
after: Mo closed his hand around the campaign copy.
```

**S85 Chapter 208 P6 — Three Thousand Swords Leave Home** — `src/data/seasons/season-085.json`

```text
before: [[speaker:arin]]“Problem?”
>>> “My younger sister was assigned to the field body.”
after: [[speaker:arin]]“Is she unqualified?”
```

**S85 Chapter 208 P8 — Three Thousand Swords Leave Home** — `src/data/seasons/season-085.json`

```text
before: [[speaker:arin]]“Is she unqualified?”
>>> “No.”
after: [[speaker:arin]]“Then do not ask rank inside this sect to purchase her safety with someone else’s sister.”
```

**S85 Chapter 209 P11 — The Crownless Host Chooses Its Road** — `src/data/seasons/season-085.json`

```text
before: The Returning Wing captain beside her struck one fist against his chest.
>>> “Returning Wing crosses.”
after: One by one, the eight cohort captains placed their tallies beside the strip. The fifth captain waited longer than the others.
```

**S85 Chapter 209 P13 — The Crownless Host Chooses Its Road** — `src/data/seasons/season-085.json`

```text
before: One by one, the eight cohort captains placed their tallies beside the strip. The fifth captain waited longer than the others.
>>> “My cohort lost thirty-seven people holding the neutral roads while you were gone.”
after: Ilyra descended from the command stone until they stood at the same height.
```

**S85 Chapter 209 P16 — The Crownless Host Chooses Its Road** — `src/data/seasons/season-085.json`

```text
before: [[speaker:ilyra]]“I read every name.”
>>> “Do we abandon those roads now?”
after: [[speaker:ilyra]]“No. Local companies inherit them with Compact funding, and our rear cohort trains the replacements until the final ship departs. If the transfer fails, your cohort stays.”
```

**S86 Chapter 211 P6 — One Hundred Twenty-Nine Thousand Need Water** — `src/data/seasons/season-086.json`

```text
before: An imperial general looked toward the harbour mouth. The tide markers were already turning.
>>> “If we miss this window, the main fleet waits six days.”
after: [[speaker:rui]]“Then we wait six days.”
```

**S86 Chapter 211 P8 — One Hundred Twenty-Nine Thousand Need Water** — `src/data/seasons/season-086.json`

```text
before: [[speaker:rui]]“Then we wait six days.”
>>> “Isgard gains six days.”
after: Rui pushed the ledger back across the table.
```

**S86 Chapter 212 P4 — Kael Boards Without Stonecrown** — `src/data/seasons/season-086.json`

```text
before: The deputy marshal met Kael at the final mountain marker. Grey showed in hair that had been black when Kael first appointed him.
>>> “Sovereign. Final authority.”
after: He offered a sealed command plate capable of countermanding any Stonecrown order from across the Black Current.
```

**S86 Chapter 212 P8 — Kael Boards Without Stonecrown** — `src/data/seasons/season-086.json`

```text
before: [[speaker:kael]]“Whose gate is the western pass?”
>>> “Mine until your return.”
after: [[speaker:kael]]“Then why are you giving it away?”
```

**S86 Chapter 212 P11 — Kael Boards Without Stonecrown** — `src/data/seasons/season-086.json`

```text
before: The marshal’s grip tightened around the plate. Five years of exercises had ended the same way: an unexpected report arrived, officers argued, and someone asked what Kael would have done. Kael had begun leaving those questions unanswered. The habit remained harder to kill than any enemy.
>>> “If the invasion exceeds our preparation—”
after: [[speaker:kael]]“Change the preparation.”
```

**S86 Chapter 213 P12 — Liang Leaves Twenty Thousand Knives Behind** — `src/data/seasons/season-086.json`

```text
before: The deputy inspector received Liang’s sealed limitation. Foreign deployment required Qin’s security certification, Liang’s martial authorization and Jin’s campaign order.
>>> “If one seal cannot be reached?”
after: [[speaker:liang]]“Then you have two reasons to remain.”
```

**S86 Chapter 213 P14 — Liang Leaves Twenty Thousand Knives Behind** — `src/data/seasons/season-086.json`

```text
before: [[speaker:liang]]“Then you have two reasons to remain.”
>>> “If Stonecrown requests the field elites?”
after: [[speaker:liang]]“Qin coordinates the request. You decide whether the circulation work is lawful. Kael’s absence does not make his neighbour your owner.”
```

**S86 Chapter 214 P11 — The Fleet Becomes a Moving Country** — `src/data/seasons/season-086.json`

```text
before: The local captain pointed toward a lantern boat fighting the cross-current.
>>> “The wind separated it from the verification vessel.”
after: Jin’s system had prevented a false alarm. It had also made the truth slow.
```

**S86 Chapter 215 P3 — The First Ships Burn** — `src/data/seasons/season-086.json`

```text
before: It carried no crew. Black oil covered its forward deck, and its steering chains had been fixed toward the rear supply line. Three more shapes emerged behind it before the warning lantern completed its second swing.
>>> “Fire ships!”
after: The rear fleet tried to open. Grain barges turned more slowly than warships. One transport swung sideways and trapped the hospital vessel behind it. Rain flattened ordinary flame and spread burning oil across wet rope.
```

**S86 Chapter 216 P5 — Forty Cross, One Hundred Sixty Remain** — `src/data/seasons/season-086.json`

```text
before: [[speaker:sera]]“No.”
>>> “We lost forty-three people.”
after: [[speaker:sera]]“Which is why I will not spend the only anti-sabotage cells we have pretending to be better infantry.”
```

**S86 Chapter 217 P9 — Rhen’s Sanctuary Has a Boundary** — `src/data/seasons/season-086.json`

```text
before: An officer reached Rhen at the upper ward.
>>> “Expand it.”
after: Rhen’s hand remained on the central support beam. The Sanctuary held hull, water and eight hundred separate lives in one complete circulation.
```

**S86 Chapter 217 P12 — Rhen’s Sanctuary Has a Boundary** — `src/data/seasons/season-086.json`

```text
before: [[speaker:rhen]]“Then its protection becomes too thin for the ship already breaking.”
>>> “You are Rhen.”
after: [[speaker:rhen]]“And this is the boundary.”
```

**S86 Chapter 219 P11 — Eirholt Draws a White Road** — `src/data/seasons/season-086.json`

```text
before: [[speaker:eira]]“Your soldiers may seek another physician.”
>>> “You would deny Isgard treatment for foreigners?”
after: [[speaker:eira]]“I deny your command over my hands.”
```

**S87 Chapter 222 P5 — Stormreach Breaks the False Gate** — `src/data/seasons/season-087.json`

```text
before: Stormreach officers saw victory trying to escape.
>>> “Cavalry forward!”
after: Lei raised one hand.
```

**S87 Chapter 222 P13 — Stormreach Breaks the False Gate** — `src/data/seasons/season-087.json`

```text
before: His quartermaster unfolded the latest road count.
>>> “Rui’s nearest secure convoy is seventeen miles south. If we pursue, the cavalry reaches the marked column before sunset. The infantry does not.”
after: “Enemy riders?”
```

**S87 Chapter 222 P14 — Stormreach Breaks the False Gate** — `src/data/seasons/season-087.json`

```text
before: “Rui’s nearest secure convoy is seventeen miles south. If we pursue, the cavalry reaches the marked column before sunset. The infantry does not.”
>>> “Enemy riders?”
after: “Moving toward the road we leave behind.”
```

**S87 Chapter 222 P15 — Stormreach Breaks the False Gate** — `src/data/seasons/season-087.json`

```text
before: “Enemy riders?”
>>> “Moving toward the road we leave behind.”
after: Stormreach could destroy the visible wagons and return hungry, separated and proud. A younger Lei would already have been thunder on the northern road.
```

**S87 Chapter 222 P19 — Stormreach Breaks the False Gate** — `src/data/seasons/season-087.json`

```text
before: One captain placed the captured map before him.
>>> “They will say we lost our nerve.”
after: [[speaker:lei]]“They built us a victory that required no enemy to defend it.”
```

**S87 Chapter 224 P9 — Arin Cuts Only the Siege** — `src/data/seasons/season-087.json`

```text
before: [[speaker:arin]]“The siege. Not the hands.”
>>> “He can rebuild it.”
after: [[speaker:arin]]“So can the person you kill beside him.”
```

**S87 Chapter 225 P7 — Skeldran Hunts the Hospital** — `src/data/seasons/season-087.json`

```text
before: Solveig did not slow.
>>> “Wuyue hides military movement beneath physicians.”
after: [[speaker:varok]]“Duskvein used medicine as bait.”
```

**S87 Chapter 225 P9 — Skeldran Hunts the Hospital** — `src/data/seasons/season-087.json`

```text
before: [[speaker:varok]]“Duskvein used medicine as bait.”
>>> “And Wuyue crossed with an army.”
after: Both accusations carried evidence. Neither changed the bodies on the road.
```

**S87 Chapter 225 P19 — Skeldran Hunts the Hospital** — `src/data/seasons/season-087.json`

```text
before: Solveig stopped within sight of the white stakes.
>>> “Move.”
after: [[speaker:varok]]“Not through Eirholt.”
```

**S87 Chapter 226 P9 — Luo Wen Buries No Patient Early** — `src/data/seasons/season-087.json`

```text
before: [[speaker:lei]]“How many cannot walk?”
>>> “Three hundred fourteen. Seventy cannot survive ordinary transport.”
after: Lei looked at the distance to the second station.
```

**S87 Chapter 226 P13 — Luo Wen Buries No Patient Early** — `src/data/seasons/season-087.json`

```text
before: A wounded commander caught his sleeve.
>>> “Take me on the next passage.”
after: [[speaker:lei]]“Can you walk?”
```

**S87 Chapter 226 P15 — Luo Wen Buries No Patient Early** — `src/data/seasons/season-087.json`

```text
before: [[speaker:lei]]“Can you walk?”
>>> “I am a field general.”
after: [[speaker:lei]]“That was not the question.”
```

**S87 Chapter 227 P12 — Ilyra Returns What the Host Receives** — `src/data/seasons/season-087.json`

```text
before: An imperial captain pointed at Raska’s exposed rear.
>>> “We can countercharge.”
after: [[speaker:ilyra]]“Nobody chases.”
```

**S87 Chapter 227 P14 — Ilyra Returns What the Host Receives** — `src/data/seasons/season-087.json`

```text
before: [[speaker:ilyra]]“Nobody chases.”
>>> “They will reform.”
after: [[speaker:ilyra]]“So will the people behind you if you keep the road open.”
```

**S87 Chapter 228 P7 — Kael Holds the Centre Alone** — `src/data/seasons/season-087.json`

```text
before: Sigrun looked toward the southern smoke.
>>> “A settlement beyond the east road sent a civilian bell.”
after: Kael did not turn.
```

**S87 Chapter 228 P11 — Kael Holds the Centre Alone** — `src/data/seasons/season-087.json`

```text
before: [[speaker:kael]]“So did you.”
>>> “I know which army occupies the road between.”
after: The bell rang again, distant and irregular.
```

**S88 Chapter 235 P7 — Kael Carries a Retreat Instead of a Victory** — `src/data/seasons/season-088.json`

```text
before: Sigrun raised her shield.
>>> “The Mountain came.”
after: [[speaker:kael]]“The wounded leave.”
```

**S88 Chapter 235 P9 — Kael Carries a Retreat Instead of a Victory** — `src/data/seasons/season-088.json`

```text
before: [[speaker:kael]]“The wounded leave.”
>>> “If you can carry them through the First Wall.”
after: Kael released **The Mountain Does Not Move**.
```

**S88 Chapter 237 P7 — Arin’s Inner Disciples Refuse the Gap** — `src/data/seasons/season-088.json`

```text
before: One inner disciple saw field fighters replacing a damaged front rank.
>>> “Outer cohort forward! Inner school rotates!”
after: Arin struck the command badge from her shoulder.
```

**S88 Chapter 237 P15 — Arin’s Inner Disciples Refuse the Gap** — `src/data/seasons/season-088.json`

```text
before: She remained beside the disciples instead of chasing the distant lancer.
>>> “Final column clear!”
after: The inner and field ranks withdrew in alternating lines. Nobody ran simply because the people behind them had reached safety; the last formation still needed someone to become last.
```

**S88 Chapter 240 P6 — Wuyue Retreats to Rimewall** — `src/data/seasons/season-088.json`

```text
before: [[speaker:jin]]“What does the gate give us?”
>>> “The plain.”
after: [[speaker:jin]]“What does the plain give us?”
```

**S89 Chapter 242 P4 — Stonecrown Closes Without Kael** — `src/data/seasons/season-089.json`

```text
before: The deputy marshal received the first coastal warning while still wearing the same command plate Kael had returned at departure.
>>> “Outer fleet count?”
after: “Incomplete. Enough transports for an army.”
```

**S89 Chapter 242 P5 — Stonecrown Closes Without Kael** — `src/data/seasons/season-089.json`

```text
before: “Outer fleet count?”
>>> “Incomplete. Enough transports for an army.”
after: “Kael?”
```

**S89 Chapter 242 P6 — Stonecrown Closes Without Kael** — `src/data/seasons/season-089.json`

```text
before: “Incomplete. Enough transports for an army.”
>>> “Kael?”
after: The question came from an officer who had trained five years not to ask it.
```

**S89 Chapter 242 P9 — Stonecrown Closes Without Kael** — `src/data/seasons/season-089.json`

```text
before: The marshal placed one hand on the western gate seal.
>>> “Across the sea. Close section four.”
after: Stone moved before the habit could become command.
```

**S89 Chapter 242 P14 — Stonecrown Closes Without Kael** — `src/data/seasons/season-089.json`

```text
before: The marshal pointed toward the two coastal approaches.
>>> “Your distances.”
after: Tae accepted only the ground assigned to him.
```

**S90 Chapter 251 P12 — Five Pairs, One Exit** — `src/data/seasons/season-090.json`

```text
before: Kellan Haldren met Mo before six thousand lowered spearheads.
>>> “You crossed into Isgard with an army.”
after: [[speaker:mo]]“Yes.”
```

**S90 Chapter 251 P14 — Five Pairs, One Exit** — `src/data/seasons/season-090.json`

```text
before: [[speaker:mo]]“Yes.”
>>> “You broke our gates.”
after: [[speaker:mo]]“Yes.”
```

**S90 Chapter 251 P16 — Five Pairs, One Exit** — `src/data/seasons/season-090.json`

```text
before: [[speaker:mo]]“Yes.”
>>> “And now you lecture us on law?”
after: Mo unfolded the oath.
```

**S90 Chapter 254 P9 — Kael Leaves the Perfect Wall** — `src/data/seasons/season-090.json`

```text
before: Sigrun lowered her shield.
>>> “Leave this wall and you do not take it back.”
after: Kael felt the perfect geometry of Rimewall beneath his feet. If he remained, the central fortress could hold another day. If he crossed east, Norrvek would occupy the structure behind him and turn it against Wuyue.
```

**S90 Chapter 255 P11 — Six Hundred Eleven Swords Still Stand** — `src/data/seasons/season-090.json`

```text
before: When the final name entered the snow, one of the inner disciples stepped forward.
>>> “Do we still call ourselves a sword sect?”
after: Arin looked beyond her. Three thousand had left home. The standing body before her was smaller than the inner school that once occupied one protected courtyard.
```

**S90 Chapter 255 P15 — Six Hundred Eleven Swords Still Stand** — `src/data/seasons/season-090.json`

```text
before: [[speaker:arin]]“Can you still choose what your sword protects?”
>>> “Yes.”
after: [[speaker:arin]]“Then stand if you can. Serve another way if you cannot. Nobody disappears because the battlefield changed the work available to her.”
```

**S91 Chapter 262 P10 — Veiled Moon Cannot Hide an Army** — `src/data/seasons/season-091.json`

```text
before: Astrid Vardrenn emerged beneath a black-pine standard.
>>> “You surrendered your advantage.”
after: [[speaker:sera]]“I removed yours.”
```

**S91 Chapter 262 P16 — Veiled Moon Cannot Hide an Army** — `src/data/seasons/season-091.json`

```text
before: Astrid lowered one hand. The eastern bows remained drawn.
>>> “Maedra ordered the corridor closed.”
after: [[speaker:sera]]“Then close it after the Hearth passes.”
```

**S91 Chapter 262 P18 — Veiled Moon Cannot Hide an Army** — `src/data/seasons/season-091.json`

```text
before: [[speaker:sera]]“Then close it after the Hearth passes.”
>>> “And your wounded?”
after: [[speaker:sera]]“They pass with them under my name.”
```

**S91 Chapter 270 P29 — Isgard Sees Orchid Dominion** — `src/data/seasons/season-091.json`

```text
before: The deputy marshal bowed.
>>> “Which army do we fight?”
after: [[speaker:liang]]“Not an army.”
```

**S92 Chapter 271 P12 — Maedra Chooses the Army, Not Sera** — `src/data/seasons/season-092.json`

```text
before: A Dravaryn officer called across the field.
>>> “The Crimson Road does not need your Domain, Orchid.”
after: Sera watched grain wagons halt as their escorts lost timing.
```

**S92 Chapter 273 P11 — Kael Does Not Win the Wall Back** — `src/data/seasons/season-092.json`

```text
before: Sigrun’s shield drove Kael backward through three sand ridges. He did not reverse the exchange. Her boundary remained. Her control of the fortress remained.
>>> “You left this wall once.”
after: [[speaker:kael]]“Yes.”
```

**S92 Chapter 273 P13 — Kael Does Not Win the Wall Back** — `src/data/seasons/season-092.json`

```text
before: [[speaker:kael]]“Yes.”
>>> “You will not take it back today.”
after: [[speaker:kael]]“No.”
```

**S92 Chapter 276 P8 — Rui Moves the Ground as Water** — `src/data/seasons/season-092.json`

```text
before: [[speaker:rui]]“Your wound is a road into everyone obeying you.”
>>> “I can still command.”
after: [[speaker:rui]]“Then command from behind the ice.”
```

**S92 Chapter 278 P6 — Chainforge Falls in One Night** — `src/data/seasons/season-092.json`

```text
before: Jin entered beneath a white lantern.
>>> “Chainforge does not surrender.”
after: [[speaker:jin]]“Chainforge is no longer functioning.”
```

**S92 Chapter 278 P8 — Chainforge Falls in One Night** — `src/data/seasons/season-092.json`

```text
before: [[speaker:jin]]“Chainforge is no longer functioning.”
>>> “We have eight thousand soldiers.”
after: [[speaker:jin]]“You have eight thousand people alive enough to decide whether walls, contracts and a vacant Ledger rank are worth dying after the decision has already failed.”
```

**S92 Chapter 280 P7 — The World Remembers Number Three** — `src/data/seasons/season-092.json`

```text
before: A soldier near the map stared at the lost territory.
>>> “We are retreating.”
after: [[speaker:jin]]“Yes.”
```

**S92 Chapter 280 P9 — The World Remembers Number Three** — `src/data/seasons/season-092.json`

```text
before: [[speaker:jin]]“Yes.”
>>> “Then how are we winning?”
after: Jin turned the four markers sideways.
```

**S93 Chapter 284 P4 — Maedra Stands Beside the First Banner** — `src/data/seasons/season-093.json`

```text
before: The Crimson Marshal remained mounted before formations that had followed her across two years of conquest, retreat and winter burial roads.
>>> “Those riders would not strengthen your Domain. Their wounds would give you roads.”
after: [[speaker:maedra]]“Their sacrifice restores the invasion.”
```

**S93 Chapter 284 P6 — Maedra Stands Beside the First Banner** — `src/data/seasons/season-093.json`

```text
before: [[speaker:maedra]]“Their sacrifice restores the invasion.”
>>> “It restores your political claim.”
after: Raska did not join Wuyue. She did not apologize for the Red Miles or surrender the cavalry she had preserved. She placed the Crimson Host beneath its lawful field officers and withdrew it from the Paragon contest Maedra meant to purchase with bodies.
```

**S94 Chapter 292 P5 — The Silver Horizon Returns Every Sword** — `src/data/seasons/season-094.json`

```text
before: A field disciple woke after Rhen repaired her sword arm.
>>> “Can I return to formation?”
after: [[speaker:rhen]]“Physically, after recovery.”
```

**S94 Chapter 292 P7 — The Silver Horizon Returns Every Sword** — `src/data/seasons/season-094.json`

```text
before: [[speaker:rhen]]“Physically, after recovery.”
>>> “Must I?”
after: [[speaker:rhen]]“No.”
```

**S94 Chapter 295 P10 — Maedra Wakes Without Command** — `src/data/seasons/season-094.json`

```text
before: [[speaker:rhen]]“No.”
>>> “How much did you hold back?”
after: Rhen checked the repaired meridian once more.
```

**S95 Chapter 301 P176 — Two Years Beneath the Crooked Sign** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Too hot?”
>>> “No.”
after: [[speaker:rhen]]“Good.”
```

**S95 Chapter 302 P182 — The Garden Is Asked For, Not Imposed** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: A captain stood.
>>> “Mountain clinic rotation. Two Duke lieutenants at the northern shelter. Twenty-six Peak Marquis split between caravan escort and medicine staging. Forty High Marquis on route security. Thirty Marquis on distribution and village support.”
after: Routine.
```

**S95 Chapter 303 P25 — What Two Years Did Not Repair** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: A young swordswoman in the front rank lifted her chin.
>>> “Master.”
after: [[speaker:arin]]“What?”
```

**S95 Chapter 303 P27 — What Two Years Did Not Repair** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:arin]]“What?”
>>> “You said we were rebuilding the east practice wall today.”
after: Arin looked toward the wall.
```

**S95 Chapter 303 P136 — What Two Years Did Not Repair** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The man stared at him.
>>> “That's it?”
after: [[speaker:rhen]]“That is generally the goal.”
```

**S95 Chapter 304 P7 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The courier looked exhausted.
>>> “The stretcher broke.”
after: Huo nodded as though this were a complete and respectable explanation.
```

**S95 Chapter 304 P10 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:huo]]“Good door.”
>>> “It was.”
after: The man strapped to it convulsed.
```

**S95 Chapter 304 P27 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The courier caught his sleeve.
>>> “He's dangerous.”
after: Rhen looked at the man.
```

**S95 Chapter 304 P36 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The courier swallowed.
>>> “For five minutes? I thought he was Duke.”
after: Sera's eyes narrowed.
```

**S95 Chapter 304 P39 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Thought?”
>>> “He wasn't.”
after: The courier struggled to explain.
```

**S95 Chapter 304 P43 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Then everything changed.
>>> “He didn't feel different,” the courier said. “Not like a breakthrough. No new pressure. No realm shift. But his speed—”
after: He stopped.
```

**S95 Chapter 304 P47 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:huo]]“Faster?”
>>> “Three times, maybe. More. He hit like he had no reason to preserve himself. Ran through two spear lines. Broke a wagon axle with his shoulder.”
after: Tae had arrived without anyone noticing.
```

**S95 Chapter 304 P51 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“And then?”
>>> “Five minutes.”
after: The courier's face tightened.
```

**S95 Chapter 304 P53 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The courier's face tightened.
>>> “Then he collapsed.”
after: Rhen placed one hand over the man's sternum.
```

**S95 Chapter 304 P85 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Where did you capture him?”
>>> “Northwest Isgard. Trade road feeding the epidemic clinics.”
after: [[speaker:sera]]“Smuggling what?”
```

**S95 Chapter 304 P87 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Smuggling what?”
>>> “Medical compounds. Some legitimate. Some mislabeled. We only knew the escort was wrong because one crate carried a clinic seal from a hospital that burned last winter.”
after: Lu arrived at the word crate.
```

**S95 Chapter 304 P217 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: That did not help him.
>>> “I don't know.”
after: Yun watched his pupils.
```

**S95 Chapter 304 P220 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Lie.”
>>> “I don't know what it was.”
after: [[speaker:yun]]“That is different.”
```

**S95 Chapter 304 P223 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: He swallowed.
>>> “They said it was strength.”
after: Luo's eyes hardened.
```

**S95 Chapter 304 P233 — The Man Who Was Strong for Five Minutes** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: He looked down at Huo's hands holding him to the table.
>>> “No.”
after: Outside, the mountain remained quiet.
```

**S95 Chapter 306 P13 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The patient looked back.
>>> “Am I dying?”
after: [[speaker:rhen]]“No.”
```

**S95 Chapter 306 P45 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The patient swallowed.
>>> “That is not comforting.”
after: Rhen looked at him.
```

**S95 Chapter 306 P48 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You are alive.”
>>> “That part was comforting.”
after: [[speaker:rhen]]“You are not currently deteriorating.”
```

**S95 Chapter 306 P50 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You are not currently deteriorating.”
>>> “Better.”
after: [[speaker:rhen]]“I cannot restore what is missing.”
```

**S95 Chapter 306 P54 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The patient stared.
>>> “What is missing?”
after: Rhen did not answer immediately.
```

**S95 Chapter 306 P72 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The patient looked at his hands.
>>> “What did they take from me?”
after: Rhen's jaw tightened slightly.
```

**S95 Chapter 306 P83 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“The drug made your body spend something it normally protects.”
>>> “I didn't agree to that.”
after: [[speaker:yun]]“No.”
```

**S95 Chapter 306 P118 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The man hesitated.
>>> “That it would make me stronger.”
after: [[speaker:luo]]“For how long?” Luo asked.
```

**S95 Chapter 306 P120 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“For how long?” Luo asked.
>>> “Minutes.”
after: [[speaker:luo]]“What cost?”
```

**S95 Chapter 306 P122 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“What cost?”
>>> “Sickness after.”
after: [[speaker:luo]]“How much sickness?”
```

**S95 Chapter 306 P124 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“How much sickness?”
>>> “A day. Maybe two.”
after: Yun's face went flat.
```

**S95 Chapter 306 P127 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The man continued.
>>> “They said the body would feel emptied because the drug burns qi fast.”
after: [[speaker:luo]]“It does burn qi fast,” Luo said.
```

**S95 Chapter 306 P135 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Who gave it to you?”
>>> “A broker.”
after: [[speaker:sera]]“Name.”
```

**S95 Chapter 306 P143 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“How old are you?”
>>> “Thirty-two.”
after: [[speaker:rhen]]“Any chronic illness?”
```

**S95 Chapter 306 P145 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Any chronic illness?”
>>> “No.”
after: [[speaker:rhen]]“Family heart weakness?”
```

**S95 Chapter 306 P147 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Family heart weakness?”
>>> “No.”
after: [[speaker:rhen]]“Previous stimulants?”
```

**S95 Chapter 306 P155 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The man looked at him.
>>> “Tomorrow?”
after: Rhen's face stayed calm.
```

**S95 Chapter 306 P158 — Something Was Spent** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“I do not make jokes about mortality with frightened patients.”
>>> “That was not a joke.”
after: [[speaker:rhen]]“I know.”
```

**S95 Chapter 307 P17 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The young woman swallowed.
>>> “Crate entered Isgard at South Fen relay on the ninth day of early spring.”
after: [[speaker:luweiran]]“Origin?”
```

**S95 Chapter 307 P19 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“Origin?”
>>> “Listed as Greywater medical consortium.”
after: [[speaker:luweiran]]“Does Greywater exist?”
```

**S95 Chapter 307 P21 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“Does Greywater exist?”
>>> “Yes.”
after: [[speaker:luweiran]]“Does the consortium?”
```

**S95 Chapter 307 P23 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“Does the consortium?”
>>> “No.”
after: [[speaker:luweiran]]“Good.”
```

**S95 Chapter 307 P29 — Lu Follows the Box, Not the Poison** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The courier continued.
>>> “Seal matches an Isgard epidemic clinic destroyed by fire eight months earlier.”
after: Lu tapped the manifest.
```

**S95 Chapter 308 P13 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Then at the door.
>>> “Can I leave?”
after: Sera nodded.
```

**S95 Chapter 308 P17 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: He looked surprised.
>>> “Now?”
after: [[speaker:sera]]“Yes.”
```

**S95 Chapter 308 P19 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Yes.”
>>> “Before I tell you anything?”
after: [[speaker:sera]]“Yes.”
```

**S95 Chapter 308 P22 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae frowned.
>>> “That feels like a trap.”
after: [[speaker:sera]]“It is not.”
```

**S95 Chapter 308 P24 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“It is not.”
>>> “People said the Pale Orchid was terrifying.”
after: [[speaker:yun]]Yun said, “She is.”
```

**S95 Chapter 308 P32 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae's fingers tightened around the cup.
>>> “What if I bought something illegal?”
after: Lu answered without looking up.
```

**S95 Chapter 308 P36 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae glanced at him.
>>> “That sounded suspiciously precise.”
after: [[speaker:luweiran]]“It is.”
```

**S95 Chapter 308 P38 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“It is.”
>>> “Am I in trouble?”
after: [[speaker:luweiran]]“Possibly with your wife.”
```

**S95 Chapter 308 P41 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae closed his eyes.
>>> “She knows?”
after: [[speaker:luweiran]]“No.”
```

**S95 Chapter 308 P43 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“No.”
>>> “Oh.”
after: Lu finally looked up.
```

**S95 Chapter 308 P56 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae inhaled slowly.
>>> “I thought it was temporary.”
after: The room settled.
```

**S95 Chapter 308 P60 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“What did they tell you it did?”
>>> “Opened the meridians. Increased circulation. Made your body use everything at once.”
after: [[speaker:luo]]“Did they say it raised cultivation?”
```

**S95 Chapter 308 P63 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae hesitated.
>>> “They said it would feel like I was one level stronger.”
after: Yun's mouth flattened.
```

**S95 Chapter 308 P67 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae nodded.
>>> “The broker said it wasn't a breakthrough. Just... access.”
after: [[speaker:luo]]“To what?” Luo asked.
```

**S95 Chapter 308 P69 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“To what?” Luo asked.
>>> “Everything I already had.”
after: Rhen's gaze sharpened slightly.
```

**S95 Chapter 308 P74 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae looked ashamed.
>>> “My younger brother got into debt with a dock gang.”
after: Nobody interrupted.
```

**S95 Chapter 308 P76 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Nobody interrupted.
>>> “I was going to pull him out. They had six men. Two were Marquis. I knew I could beat one. Maybe two. Not six.”
after: [[speaker:yun]]“So you bought strength,” Yun said.
```

**S95 Chapter 308 P79 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae looked at her.
>>> “Yes.”
after: [[speaker:yun]]“Did it work?”
```

**S95 Chapter 308 P82 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: His expression changed.
>>> “For a while.”
after: He described it carefully.
```

**S95 Chapter 308 P97 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“And then?”
>>> “My left hand stopped closing.”
after: Yun sat straighter.
```

**S95 Chapter 308 P100 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“During the effect?”
>>> “Yes.”
after: “Then?”
```

**S95 Chapter 308 P101 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Yes.”
>>> “Then?”
after: “My hearing went strange. Like everyone was underwater.”
```

**S95 Chapter 308 P102 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Then?”
>>> “My hearing went strange. Like everyone was underwater.”
after: “Then?”
```

**S95 Chapter 308 P103 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “My hearing went strange. Like everyone was underwater.”
>>> “Then?”
after: “I threw up.”
```

**S95 Chapter 308 P104 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Then?”
>>> “I threw up.”
after: “Still fighting?”
```

**S95 Chapter 308 P105 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “I threw up.”
>>> “Still fighting?”
after: “Yes.”
```

**S95 Chapter 308 P106 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Still fighting?”
>>> “Yes.”
after: Luo looked at Yun.
```

**S95 Chapter 308 P110 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae continued.
>>> “I remember knowing I should stop. I remember thinking that very clearly.”
after: His fingers trembled around the tea cup.
```

**S95 Chapter 308 P112 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: His fingers trembled around the tea cup.
>>> “But I didn't feel like I had to.”
after: Yun's expression turned cold.
```

**S95 Chapter 308 P120 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae swallowed.
>>> “Seven minutes, maybe eight.”
after: “Then?”
```

**S95 Chapter 308 P121 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Seven minutes, maybe eight.”
>>> “Then?”
after: “I woke up the next afternoon.”
```

**S95 Chapter 308 P122 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Then?”
>>> “I woke up the next afternoon.”
after: [[speaker:luo]]Luo asked, “What were you told recovery would be?”
```

**S95 Chapter 308 P124 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]Luo asked, “What were you told recovery would be?”
>>> “Two days tired. Maybe nausea.”
after: “Anything about future vitality?”
```

**S95 Chapter 308 P125 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Two days tired. Maybe nausea.”
>>> “Anything about future vitality?”
after: Dae frowned.
```

**S95 Chapter 308 P127 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae frowned.
>>> “No.”
after: “Lifespan?”
```

**S95 Chapter 308 P128 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “No.”
>>> “Lifespan?”
after: His face changed.
```

**S95 Chapter 308 P130 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: His face changed.
>>> “No.”
after: “Long-term organ stress?”
```

**S95 Chapter 308 P131 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “No.”
>>> “Long-term organ stress?”
after: “No.”
```

**S95 Chapter 308 P132 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Long-term organ stress?”
>>> “No.”
after: “Permanent depletion?”
```

**S95 Chapter 308 P133 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “No.”
>>> “Permanent depletion?”
after: “No.”
```

**S95 Chapter 308 P134 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: “Permanent depletion?”
>>> “No.”
after: The last answer came sharper.
```

**S95 Chapter 308 P137 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae looked from Luo to Rhen.
>>> “Permanent?”
after: Rhen stepped away from the wall.
```

**S95 Chapter 308 P151 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“When did you take it?”
>>> “Four months ago.”
after: [[speaker:rhen]]“Any second dose?”
```

**S95 Chapter 308 P153 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Any second dose?”
>>> “No.”
after: [[speaker:rhen]]“Any other stimulants?”
```

**S95 Chapter 308 P155 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Any other stimulants?”
>>> “No.”
after: Rhen looked at Luo.
```

**S95 Chapter 308 P159 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae went pale.
>>> “What absence?”
after: Sera intervened before fear filled the gap with something worse.
```

**S95 Chapter 308 P162 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“We do not know exactly yet.”
>>> “That sounds bad.”
after: [[speaker:sera]]“It is why we are asking.”
```

**S95 Chapter 308 P167 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae frowned.
>>> “Money.”
after: [[speaker:yun]]“Besides money.”
```

**S95 Chapter 308 P169 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Besides money.”
>>> “Weight.”
after: Everyone looked at him.
```

**S95 Chapter 308 P172 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae noticed.
>>> “What?”
after: Yun stepped closer.
```

**S95 Chapter 308 P175 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Exact wording.”
>>> “He asked how much I weighed.”
after: [[speaker:yun]]“Height?”
```

**S95 Chapter 308 P177 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Height?”
>>> “Yes.”
after: [[speaker:yun]]“Age?”
```

**S95 Chapter 308 P179 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Age?”
>>> “Yes.”
after: [[speaker:yun]]“Resting pulse?”
```

**S95 Chapter 308 P182 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae blinked.
>>> “He counted it himself.”
after: Luo's face changed.
```

**S95 Chapter 308 P185 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Where?”
>>> “Wrist.”
after: [[speaker:luo]]“What else?”
```

**S95 Chapter 308 P187 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“What else?”
>>> “He asked if I had heart weakness. If my father died young. If I had ever coughed blood after cultivation. If I used fire qi.”
after: Yun looked at Luo.
```

**S95 Chapter 308 P194 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae watched them.
>>> “What does that mean?”
after: Yun answered.
```

**S95 Chapter 308 P204 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae looked confused.
>>> “You know who sold it?”
after: [[speaker:luweiran]]“We know which company touched your purchase.”
```

**S95 Chapter 308 P206 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“We know which company touched your purchase.”
>>> “Then arrest him.”
after: Lu's tone stayed calm.
```

**S95 Chapter 308 P210 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae looked down.
>>> “I could identify him.”
after: [[speaker:luweiran]]“That helps.”
```

**S95 Chapter 308 P214 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae frowned.
>>> “Not writing I could read.”
after: [[speaker:yun]]“What kind?”
```

**S95 Chapter 308 P216 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“What kind?”
>>> “Small marks near the base.”
after: Lu slid a blank page toward him.
```

**S95 Chapter 308 P229 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“Merchant shorthand?”
>>> “Maybe.”
after: Dae added one more detail.
```

**S95 Chapter 308 P231 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae added one more detail.
>>> “The broker had a chart.”
after: Everyone looked at him again.
```

**S95 Chapter 308 P234 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“A chart?” Luo asked.
>>> “Different colors. Different weights.”
after: [[speaker:luo]]“How many?”
```

**S95 Chapter 308 P236 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“How many?”
>>> “I don't know. Rows.”
after: [[speaker:luo]]“Did he choose your ampoule from the chart?”
```

**S95 Chapter 308 P238 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Did he choose your ampoule from the chart?”
>>> “Yes.”
after: Yun exhaled once through her nose.
```

**S95 Chapter 308 P253 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: He stiffened.
>>> “Prisoner?”
after: [[speaker:sera]]“Patient.”
```

**S95 Chapter 308 P259 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Then looked at Rhen.
>>> “Can you give back what I lost?”
after: Rhen did not lie.
```

**S95 Chapter 308 P267 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae stared at the cup.
>>> “People said you were the world's greatest healer.”
after: Rhen looked at him.
```

**S95 Chapter 308 P271 — He Thought It Was Temporary** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Dae took a careful sip.
>>> “Are they wrong?”
after: Rhen considered.
```

**S95 Chapter 309 P18 — The Wind That Would Not Stay** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Do not spook him?”
>>> “Yes.”
after: [[speaker:sera]]“Did we spook him?”
```

**S95 Chapter 309 P147 — The Wind That Would Not Stay** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rui]]“So did you.”
>>> “Yes.”
after: [[speaker:rui]]“That is all?”
```

**S95 Chapter 309 P153 — The Wind That Would Not Stay** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:rui]]“Enough to beat you?”
>>> “No.”
after: The smile vanished.
```

**S95 Chapter 309 P173 — The Wind That Would Not Stay** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]“I assume you are following that one.”
>>> “Yes.”
after: [[speaker:xie_wuchen]]“Then I am done.”
```

**S95 Chapter 309 P188 — The Wind That Would Not Stay** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]“The problem is no longer immediate.”
>>> “No.”
after: [[speaker:xie_wuchen]]“Then I am leaving.”
```

**S95 Chapter 309 P221 — The Wind That Would Not Stay** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]“You were about to.”
>>> “No.”
after: [[speaker:xie_wuchen]]“You have the face.”
```

**S95 Chapter 310 P6 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The broker swallowed.
>>> “Axtaya.”
after: The word sounded wrong in Wuyue speech.
```

**S95 Chapter 310 P23 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The broker looked at Yun.
>>> “That is what it was called on the invoices.”
after: [[speaker:yun]]“By whom?”
```

**S95 Chapter 310 P25 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“By whom?”
>>> “I don't know.”
after: [[speaker:yun]]“You sold it.”
```

**S95 Chapter 310 P27 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You sold it.”
>>> “I brokered sealed cargo.”
after: [[speaker:yun]]“To cultivators.”
```

**S95 Chapter 310 P29 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“To cultivators.”
>>> “Yes.”
after: [[speaker:yun]]“Using weight charts.”
```

**S95 Chapter 310 P31 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Using weight charts.”
>>> “Yes.”
after: [[speaker:yun]]“Pulse screening.”
```

**S95 Chapter 310 P33 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Pulse screening.”
>>> “Yes.”
after: [[speaker:yun]]“Risk questions.”
```

**S95 Chapter 310 P35 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Risk questions.”
>>> “Yes.”
after: [[speaker:yun]]“And you did not know what it did?”
```

**S95 Chapter 310 P38 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The broker's face tightened.
>>> “I knew what I was told.”
after: Yun leaned closer.
```

**S95 Chapter 310 P41 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“What were you told?”
>>> “Temporary combat amplification.”
after: Luo's expression did not change.
```

**S95 Chapter 310 P44 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Not cultivation breakthrough.”
>>> “No.”
after: [[speaker:luo]]“Not permanent strengthening.”
```

**S95 Chapter 310 P46 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Not permanent strengthening.”
>>> “No.”
after: [[speaker:luo]]“Recovery?”
```

**S95 Chapter 310 P48 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Recovery?”
>>> “One or two days.”
after: [[speaker:luo]]“Long-term cost?”
```

**S95 Chapter 310 P53 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“So there was one.”
>>> “I did not know the number.”
after: [[speaker:yun]]“That was not my question.”
```

**S95 Chapter 310 P56 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: He looked at the table.
>>> “The supplier said repeated use was dangerous.”
after: Luo's voice went cold.
```

**S95 Chapter 310 P59 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Repeated.”
>>> “Yes.”
after: [[speaker:luo]]“What about one dose?”
```

**S95 Chapter 310 P61 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“What about one dose?”
>>> “They said healthy users recover.”
after: [[speaker:luo]]“Recover what?”
```

**S95 Chapter 310 P70 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“Three went north through Isgard intermediaries. Two remained in Wuyue. One disappeared from your books.”
>>> “I told you—”
after: [[speaker:luweiran]]“You told me the warehouse burned.”
```

**S95 Chapter 310 P72 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:luweiran]]“You told me the warehouse burned.”
>>> “It did.”
after: [[speaker:luweiran]]“The warehouse burned two weeks before the shipment arrived.”
```

**S95 Chapter 310 P86 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The broker swallowed.
>>> “Military buyers.”
after: The room changed.
```

**S95 Chapter 310 P90 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Whose military?”
>>> “I don't know.”
after: [[speaker:sera]]“Wuyue?”
```

**S95 Chapter 310 P92 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Wuyue?”
>>> “No.”
after: [[speaker:sera]]“Isgard?”
```

**S95 Chapter 310 P94 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Isgard?”
>>> “No.”
after: [[speaker:sera]]“How do you know?”
```

**S95 Chapter 310 P96 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“How do you know?”
>>> “Different payment notes. Different script. Foreign weights.”
after: Lu leaned forward.
```

**S95 Chapter 310 P107 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The broker shook his head.
>>> “No. Those match the screening charts.”
after: Yun's eyes sharpened.
```

**S95 Chapter 310 P129 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: He shook his head.
>>> “I never met them.”
after: [[speaker:sera]]“Route.”
```

**S95 Chapter 310 P131 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Route.”
>>> “Sea.”
after: [[speaker:sera]]“From where?”
```

**S95 Chapter 310 P133 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“From where?”
>>> “I don't know.”
after: Lu placed another document in front of him.
```

**S95 Chapter 310 P141 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Familiarity.
>>> “I saw that on outer crates.”
after: Yun looked at Lu.
```

**S95 Chapter 310 P147 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Why?”
>>> “I don't know.”
after: [[speaker:yun]]“Another useful sentence,” Yun muttered.
```

**S95 Chapter 310 P160 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Then aloud.
>>> “Shinrin.”
after: The broker nodded too quickly.
```

**S95 Chapter 310 P162 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The broker nodded too quickly.
>>> “Yes.”
after: Everyone looked at him.
```

**S95 Chapter 310 P168 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: He closed his eyes.
>>> “Only as a place-name.”
after: [[speaker:yun]]“Where?”
```

**S95 Chapter 310 P170 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Where?”
>>> “Far east by sea routes. Merchant networks. Not direct from here.”
after: Sera looked at Lu.
```

**S95 Chapter 310 P182 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Government?”
>>> “Unknown.”
after: [[speaker:sera]]“Martial strength?”
```

**S95 Chapter 310 P184 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Martial strength?”
>>> “Unknown.”
after: [[speaker:sera]]“Army?”
```

**S95 Chapter 310 P186 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Army?”
>>> “Unknown.”
after: Sera exhaled.
```

**S95 Chapter 310 P195 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: The broker looked miserable.
>>> “I am beginning to feel underappreciated.”
after: Yun stared at him.
```

**S95 Chapter 310 P206 — Axtaya** — `docs/prose/FINAL_ARC_SEASON095_PROSE_DRAFT*.md`

```text
before: Sera looked at Yun.
>>> “What do you need?”
after: Yun did not answer immediately.
```

**S96 Chapter 313 P133 — Leaving Is Still a Choice** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The apprentice who had given him the pear looked up.
>>> “Did he join?”
after: [[speaker:sera]]“No.”
```

**S96 Chapter 313 P135 — Leaving Is Still a Choice** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“No.”
>>> “Will he?”
after: Sera considered the empty roof.
```

**S96 Chapter 316 P16 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: Routine.
>>> “Any live cultures?”
after: [[speaker:yun]]“No.”
```

**S96 Chapter 316 P18 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“No.”
>>> “Animal material?”
after: [[speaker:yun]]“No.”
```

**S96 Chapter 316 P20 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“No.”
>>> “Restricted meridian tonics?”
after: [[speaker:yun]]“None.”
```

**S96 Chapter 316 P23 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: He returned the paper.
>>> “Clinic road is east if you need storage certification. West market inspectors are slower after midday.”
after: Yun blinked.
```

**S96 Chapter 316 P35 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: A woman selling steamed buns noticed.
>>> “Foreign?”
after: Yun looked at her.
```

**S96 Chapter 316 P38 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Is it obvious?”
>>> “You read notices.”
after: [[speaker:yun]]“That is how you identify foreigners?”
```

**S96 Chapter 316 P40 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“That is how you identify foreigners?”
>>> “Locals complain without reading.”
after: Yun almost smiled.
```

**S96 Chapter 316 P45 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“What happens there?” she asked, nodding toward the dispute hall.
>>> “Depends who is lying.”
after: [[speaker:yun]]“Clan court?”
```

**S96 Chapter 316 P48 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The woman snorted.
>>> “Not anymore.”
after: [[speaker:yun]]“Shinsei?”
```

**S96 Chapter 316 P53 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: Recognition.
>>> “Guild arbitration. Local magistrate sits with one guild clerk. Used to be the families handled it.”
after: [[speaker:yun]]“Better now?”
```

**S96 Chapter 316 P56 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The woman looked toward the two waiting merchants.
>>> “My uncle lost three fingers because his neighbor’s cousin insulted the wrong branch family.”
after: Yun said nothing.
```

**S96 Chapter 316 P58 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: Yun said nothing.
>>> “Now they argue over water rights and go home angry.”
after: She shrugged.
```

**S96 Chapter 316 P60 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: She shrugged.
>>> “I prefer angry.”
after: Yun ate the bun.
```

**S96 Chapter 316 P72 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Children still do that?” Yun asked.
>>> “Every spring.”
after: [[speaker:yun]]“For Shinsei?”
```

**S96 Chapter 316 P75 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The woman wiped her hands on her apron.
>>> “For the bridge.”
after: Yun looked at her.
```

**S96 Chapter 316 P79 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The question earned genuine surprise.
>>> “You really are foreign.”
after: [[speaker:yun]]“So I have been told.”
```

**S96 Chapter 316 P81 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“So I have been told.”
>>> “Seven Bridges.”
after: Yun waited.
```

**S96 Chapter 316 P83 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: Yun waited.
>>> “Before Shinsei held the river country properly, three clans fought over the crossings. Not soldiers fighting soldiers. Everyone. Farmers searched. Ferries burned. Houses emptied because somebody's cousin wore the wrong crest.”
after: Her face changed while she spoke.
```

**S96 Chapter 316 P87 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: Memory inherited from somebody else's fear.
>>> “My mother was six.”
after: Yun said nothing.
```

**S96 Chapter 316 P89 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: Yun said nothing.
>>> “By the last night, six bridges were gone. Burned or broken. The clans were fighting over the seventh while families were still trying to cross.”
after: [[speaker:yun]]“Tsubasa Kurokawa?”
```

**S96 Chapter 316 P92 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The woman nodded.
>>> “He was young then. Not what he is now.”
after: [[speaker:yun]]“What did he do?”
```

**S96 Chapter 316 P94 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“What did he do?”
>>> “Stayed.”
after: Yun waited for more.
```

**S96 Chapter 316 P97 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The woman shrugged.
>>> “That is the story.”
after: [[speaker:yun]]“He fought three clans.”
```

**S96 Chapter 316 P99 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“He fought three clans.”
>>> “Probably.”
after: [[speaker:yun]]“You don't know?”
```

**S96 Chapter 316 P101 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You don't know?”
>>> “I know my mother crossed.”
after: That stopped Yun.
```

**S96 Chapter 316 P103 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: That stopped Yun.
>>> “They say he held the last bridge through the night. Kept the supports standing. Kept the fighting away from the families. Didn't chase anyone when the clans pulled back. Didn't leave when people started saying the road was clear.”
after: The woman's voice softened.
```

**S96 Chapter 316 P105 — A Country That Works** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The woman's voice softened.
>>> “He stayed until the last family crossed.”
after: The road moved around them.
```

**S96 Chapter 317 P15 — The Guild That Became the State** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The clerk looked confused.
>>> “Of course.”
after: [[speaker:yun]]“For taxes?”
```

**S96 Chapter 317 P17 — The Guild That Became the State** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“For taxes?”
>>> “Yes.”
after: [[speaker:yun]]“And disputes?”
```

**S96 Chapter 317 P19 — The Guild That Became the State** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“And disputes?”
>>> “Yes.”
after: [[speaker:yun]]“And medical licensing?”
```

**S96 Chapter 317 P21 — The Guild That Became the State** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“And medical licensing?”
>>> “Different division.”
after: Yun rested both palms on the counter.
```

**S96 Chapter 317 P25 — The Guild That Became the State** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The clerk’s confusion deepened.
>>> “This is the civil administration.”
after: The answer sat in plain sight.
```

**S96 Chapter 318 P4 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The clerk had sent her there because one of Axtaya’s precursor ingredients appeared in an old emergency-tonic registry.
>>> “Third cabinet,” he said without looking up. “Circulatory supports. Pre-unification formats are red-tagged.”
after: Yun paused.
```

**S96 Chapter 318 P7 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Pre-unification?”
>>> “Old standards.”
after: He dipped his brush again.
```

**S96 Chapter 318 P9 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: He dipped his brush again.
>>> “Half of them are useless. Don’t copy dosages without checking current tables.”
after: That was excellent advice.
```

**S96 Chapter 318 P87 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The clerk passed behind her.
>>> “Find what you need?”
after: Yun covered the page with one hand and looked up.
```

**S96 Chapter 318 P91 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: He smiled without interest.
>>> “Those are popular.”
after: [[speaker:yun]]“Does Katsuragi still practice?”
```

**S96 Chapter 318 P95 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The clerk looked at the name.
>>> “Aya Katsuragi?”
after: [[speaker:yun]]“Yes.”
```

**S96 Chapter 318 P98 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: He stared at Yun as though she had asked whether rain still fell.
>>> “She’s one of the Ten.”
after: Yun kept her face neutral.
```

**S96 Chapter 318 P102 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The clerk’s expression became mildly suspicious.
>>> “You really are foreign.”
after: [[speaker:yun]]“So I’m told.”
```

**S96 Chapter 318 P105 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: He shook his head.
>>> “Shinsei Ten. Ranked officers.”
after: [[speaker:yun]]“Physician and officer?”
```

**S96 Chapter 318 P107 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Physician and officer?”
>>> “Katsuragi is medical command.”
after: [[speaker:yun]]“What rank?”
```

**S96 Chapter 318 P109 — Aya’s Old Safeguards** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“What rank?”
>>> “Seven.”
after: Yun’s pulse did not change.
```

**S96 Chapter 319 P53 — Do Not Let Him Touch You** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: Then heard a man behind her say, conversationally:
>>> “Foreign physicians walk very quickly here.”
after: Yun did not turn.
```

**S96 Chapter 319 P57 — Do Not Let Him Touch You** — `docs/prose/FINAL_ARC_SEASON096_PROSE_DRAFT*.md`

```text
before: The voice came closer.
>>> “Merchant, then?”
after: [[speaker:yun]]“Whichever permits are cheaper.”
```

**S97 Chapter 321 P39 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The inspector’s eyes moved over the room.
>>> “Foreign medical trader?”
after: [[speaker:yun]]“Yes.”
```

**S97 Chapter 321 P41 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “Permit.”
after: Yun handed it over.
```

**S97 Chapter 321 P44 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The woman checked the seal.
>>> “What are you doing in a grain office?”
after: [[speaker:yun]]“Trying to understand why fever bark costs twelve percent more here than at the southern port.”
```

**S97 Chapter 321 P46 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Trying to understand why fever bark costs twelve percent more here than at the southern port.”
>>> “That requires military transport schedules?”
after: The visible paper had one protected-route stamp on it.
```

**S97 Chapter 321 P60 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: Read it.
>>> “This is restricted.”
after: [[speaker:yun]]“Then your broker has poor filing discipline.”
```

**S97 Chapter 321 P62 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Then your broker has poor filing discipline.”
>>> “Where is he?”
after: [[speaker:yun]]“Downstairs, unless you’ve arrested him on the way up.”
```

**S97 Chapter 321 P66 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: Then returned the permit.
>>> “Stay out of protected logistics.”
after: Yun gave her the exact amount of offense a legitimate merchant would feel.
```

**S97 Chapter 321 P69 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I was comparing prices.”
>>> “Compare less deeply.”
after: The inspector left.
```

**S97 Chapter 321 P76 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: He poked his head into the attic.
>>> “What did you do?”
after: [[speaker:yun]]“Read.”
```

**S97 Chapter 321 P78 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Read.”
>>> “That is what I feared.”
after: Yun gave him the agreed coin and packed the remaining ledger copies.
```

**S97 Chapter 321 P81 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Did she ask about me?”
>>> “Everyone asks about you now.”
after: Yun’s hands stopped.
```

**S97 Chapter 321 P84 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The broker swallowed.
>>> “I mean foreign merchants. Archives. Clinics. Nothing specific.”
after: [[speaker:yun]]“Specific enough.”
```

**S97 Chapter 321 P89 — Too Much Medicine for a Black Market** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You did not see me again after tonight.”
>>> “I would prefer not to.”
after: [[speaker:yun]]“Wise.”
```

**S97 Chapter 322 P20 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: A corporal-looking woman slapped one of the men in the shoulder.
>>> “Stop spending your pay before inspection.”
after: “I’m eating.”
```

**S97 Chapter 322 P21 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: “Stop spending your pay before inspection.”
>>> “I’m eating.”
after: “You ordered three bowls.”
```

**S97 Chapter 322 P22 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: “I’m eating.”
>>> “You ordered three bowls.”
after: “I’m cultivating.”
```

**S97 Chapter 322 P23 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: “You ordered three bowls.”
>>> “I’m cultivating.”
after: “So is everyone.”
```

**S97 Chapter 322 P24 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: “I’m cultivating.”
>>> “So is everyone.”
after: The shop laughed.
```

**S97 Chapter 322 P57 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “My math is usually polite.”
>>> “Then perhaps the country is rude.”
after: She looked at him.
```

**S97 Chapter 322 P60 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: He grinned.
>>> “Foreign?”
after: [[speaker:yun]]“Apparently obvious.”
```

**S97 Chapter 322 P62 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Apparently obvious.”
>>> “You stare at soldiers.”
after: [[speaker:yun]]“That seems unsafe.”
```

**S97 Chapter 322 P64 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“That seems unsafe.”
>>> “Locals stopped staring years ago.”
after: Yun watched a patrol cross the bridge.
```

**S97 Chapter 322 P68 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The fisherman snorted.
>>> “Before Shinsei? Every clan had soldiers. More flags. Less discipline.”
after: [[speaker:yun]]“I meant cultivators.”
```

**S97 Chapter 322 P70 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I meant cultivators.”
>>> “Ah.”
after: He considered.
```

**S97 Chapter 322 P72 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: He considered.
>>> “No. Training got better when the guild stopped letting every house keep techniques locked in family vaults.”
after: Yun’s attention sharpened.
```

**S97 Chapter 322 P75 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Shared training?”
>>> “Some. Standards. Medicine. Common basics. Big clans still hoard their pretty secrets.”
after: He cast the line.
```

**S97 Chapter 322 P77 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: He cast the line.
>>> “But a farmer’s son can join now and learn enough not to die to the first arrogant young master who dislikes his face.”
after: The line landed in the canal.
```

**S97 Chapter 322 P86 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Catch anything?”
>>> “Not yet.”
after: [[speaker:yun]]“How long have you been here?”
```

**S97 Chapter 322 P88 — Peak Marquis Is Ordinary Here** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“How long have you been here?”
>>> “Twenty years.”
after: Yun stared.
```

**S97 Chapter 324 P30 — Shunto Takamori** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The stall owner noticed her expression.
>>> “Foreigners always hate the smoked leaves.”
after: [[speaker:yun]]“Correctly.”
```

**S97 Chapter 324 P35 — Shunto Takamori** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Second Seat handles fugitives personally?”
>>> “Depends on the fugitive.”
after: [[speaker:yun]]“Seems excessive.”
```

**S97 Chapter 324 P37 — Shunto Takamori** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Seems excessive.”
>>> “Not if he wants them alive.”
after: That matched.
```

**S97 Chapter 324 P40 — Shunto Takamori** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The owner leaned closer as if sharing gossip.
>>> “Old saying from the border families.”
after: Yun waited.
```

**S97 Chapter 324 P42 — Shunto Takamori** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: Yun waited.
>>> “Don’t let Takamori touch you.”
after: She stared at him.
```

**S97 Chapter 324 P45 — Shunto Takamori** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: He grinned.
>>> “Everyone knows that one.”
after: Apparently everyone except the foreign Sovereign who had learned it with half her body numb in a market lane.
```

**S97 Chapter 328 P59 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The man squinted.
>>> “Mouse?”
after: Yun did not answer.
```

**S97 Chapter 328 P61 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: Yun did not answer.
>>> “Big mouse.”
after: He dragged a stool beneath the crawlspace hatch.
```

**S97 Chapter 328 P70 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: Then through the tower window toward the Shinsei patrols.
>>> “Are you the one they’re looking for?”
after: [[speaker:yun]]Yun said, “Possibly.”
```

**S97 Chapter 328 P72 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]Yun said, “Possibly.”
>>> “That is not reassuring.”
after: [[speaker:yun]]“I’m not here to hurt you.”
```

**S97 Chapter 328 P74 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I’m not here to hurt you.”
>>> “Also what people say before hurting you.”
after: Fair.
```

**S97 Chapter 328 P78 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The bellkeeper raised one hand.
>>> “No.”
after: She stopped.
```

**S97 Chapter 328 P81 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: He pointed toward the back stair.
>>> “Roof drainage connects to the old shrine wall.”
after: Yun blinked.
```

**S97 Chapter 328 P85 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: The old man looked offended.
>>> “I am helping my bell tower.”
after: He glanced at the soldiers below.
```

**S97 Chapter 328 P87 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: He glanced at the soldiers below.
>>> “If they search properly, they’ll tear everything apart.”
after: Yun almost smiled.
```

**S97 Chapter 328 P90 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Of course.”
>>> “Also,” he added, “Second Seat does not usually bring this many people for harmless merchants.”
after: Yun’s expression flattened.
```

**S97 Chapter 328 P94 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: He looked away.
>>> “Whatever you did, leave before they decide my roof is evidence.”
after: Yun moved.
```

**S97 Chapter 328 P98 — The Arm He Could Not Feel** — `docs/prose/FINAL_ARC_SEASON097_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Thank you.”
>>> “Do not come back.”
after: [[speaker:yun]]“Reasonable.”
```

**S98 Chapter 331 P143 — Safehouses Become Calendar Marks** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: Yun’s hand went to a hidden needle.
>>> “Cousin?” the woman called. “Your husband sent nothing again.”
after: Yun looked at the ceiling.
```

**S98 Chapter 331 P147 — Safehouses Become Calendar Marks** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“He is unreliable,” she said.
>>> “I told you river men were useless.”
after: [[speaker:yun]]“You were right.”
```

**S98 Chapter 332 P93 — Ten Seats** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“He sounds unpleasant.”
>>> “He is efficient.”
after: [[speaker:yun]]“Worse.”
```

**S98 Chapter 332 P101 — Ten Seats** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: Memory.
>>> “Different.”
after: [[speaker:yun]]“How?”
```

**S98 Chapter 332 P104 — Ten Seats** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: The old man considered.
>>> “You know when someone strong enters a room and everyone notices?”
after: [[speaker:yun]]“Yes.”
```

**S98 Chapter 332 P106 — Ten Seats** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “With Kurokawa, the room notices before you do.”
after: Not useful mechanically.
```

**S98 Chapter 332 P111 — Ten Seats** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: The old man looked at her as though she had asked whether winter was colder than rain.
>>> “Of course.”
after: She had what she could defend and did not ask for secret techniques.
```

**S98 Chapter 333 P93 — Two Hundred Thousand Is Not a Rumor** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes?”
>>> “Your husband has become worse.”
after: Yun looked toward the ceiling.
```

**S98 Chapter 333 P96 — Two Hundred Thousand Is Not a Rumor** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“What did he do now?”
>>> “Nothing. That is the problem. Three months and no letter.”
after: The fictional marriage was deteriorating faster than Yun’s real one.
```

**S98 Chapter 333 P99 — Two Hundred Thousand Is Not a Rumor** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I will speak to him.”
>>> “When?”
after: [[speaker:yun]]“When he returns.”
```

**S98 Chapter 333 P101 — Two Hundred Thousand Is Not a Rumor** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“When he returns.”
>>> “He is imaginary, isn’t he?”
after: Yun went still.
```

**S98 Chapter 333 P105 — Two Hundred Thousand Is Not a Rumor** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: Then the landlord laughed through the door.
>>> “I’m joking. River men all feel imaginary.”
after: Footsteps receded.
```

**S98 Chapter 336 P68 — What Paper Cannot Carry** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: A man’s voice drifted up the stairs.
>>> “Municipal fire inspection.”
after: Of course.
```

**S98 Chapter 336 P74 — What Paper Cannot Carry** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: The knock came again.
>>> “Inspection.”
after: The landlord answered below.
```

**S98 Chapter 336 P76 — What Paper Cannot Carry** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: The landlord answered below.
>>> “You came last month.”
after: “Updated district requirement.”
```

**S98 Chapter 336 P77 — What Paper Cannot Carry** — `docs/prose/FINAL_ARC_SEASON098_PROSE_DRAFT*.md`

```text
before: “You came last month.”
>>> “Updated district requirement.”
after: Shunto.
```

**S99 Chapter 341 P51 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: The physician’s hand paused.
>>> “You are awake.”
after: [[speaker:yun]]“I had noticed.”
```

**S99 Chapter 341 P53 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I had noticed.”
>>> “You have internal strain from forced circulation.”
after: [[speaker:yun]]“Your Second Seat caused it.”
```

**S99 Chapter 341 P63 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“What is that?”
>>> “Anti-inflammatory.”
after: [[speaker:yun]]“Name.”
```

**S99 Chapter 341 P83 — Captured Alive** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I was hoping for a holiday.”
>>> “No unnecessary movement.”
after: [[speaker:yun]]“Does your government issue that sentence with every room?”
```

**S99 Chapter 344 P85 — The Prison Is Still a Laboratory** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: The physician looked offended.
>>> “Was not.”
after: [[speaker:yun]]“You were.”
```

**S99 Chapter 344 P87 — The Prison Is Still a Laboratory** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“You were.”
>>> “I was assessing.”
after: [[speaker:yun]]“Slowly.”
```

**S99 Chapter 345 P41 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: The guard entered angry.
>>> “Key stuck.”
after: The physician shrugged.
```

**S99 Chapter 345 P60 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: The guard beside her pulled the restraint lead.
>>> “Move.”
after: Yun moved.
```

**S99 Chapter 345 P89 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Yun heard the argument before she saw the man.
>>> “I have authorization.”
after: “You have old authorization.”
```

**S99 Chapter 345 P90 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: “I have authorization.”
>>> “You have old authorization.”
after: “Old medicine works on new fevers.”
```

**S99 Chapter 345 P91 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: “You have old authorization.”
>>> “Old medicine works on new fevers.”
after: “That is not how authorization works.”
```

**S99 Chapter 345 P92 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: “Old medicine works on new fevers.”
>>> “That is not how authorization works.”
after: “It should be.”
```

**S99 Chapter 345 P93 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: “That is not how authorization works.”
>>> “It should be.”
after: A guard sighed with the exhaustion of someone who had lost this argument before.
```

**S99 Chapter 345 P107 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Yun watched him through the small observation gap as he argued with the clinic steward.
>>> “Feverroot goes to the lower ward.”
after: “That corridor is under security restriction.”
```

**S99 Chapter 345 P108 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: “Feverroot goes to the lower ward.”
>>> “That corridor is under security restriction.”
after: “So fever agreed to stay downstairs?”
```

**S99 Chapter 345 P109 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: “That corridor is under security restriction.”
>>> “So fever agreed to stay downstairs?”
after: The steward looked murderous.
```

**S99 Chapter 345 P130 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Later, the evening physician called him by name while complaining about inventory.
>>> “Amagiri, if you keep bringing outside stock into secured wards—”
after: Yun stored it.
```

**S99 Chapter 345 P136 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“Then people will keep receiving medicine.”
>>> “You are not Shinsei medical command.”
after: [[speaker:black_radiance]]“I noticed.”
```

**S99 Chapter 345 P138 — Black Radiance Notices** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“I noticed.”
>>> “You are not Shinsei anything.”
after: A pause.
```

**S99 Chapter 346 P76 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Very low.
>>> “Can you walk?”
after: Yun did not answer immediately.
```

**S99 Chapter 346 P82 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: A soft breath that might have been laughter.
>>> “Own feet. No carrying.”
after: [[speaker:yun]]“Then yes.”
```

**S99 Chapter 346 P84 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Then yes.”
>>> “Fast?”
after: [[speaker:yun]]“No.”
```

**S99 Chapter 346 P86 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“No.”
>>> “Fight?”
after: [[speaker:yun]]“Briefly.”
```

**S99 Chapter 346 P88 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Briefly.”
>>> “Poison?”
after: [[speaker:yun]]“Always.”
```

**S99 Chapter 346 P90 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Always.”
>>> “That was the answer I expected.”
after: Yun moved closer to the door.
```

**S99 Chapter 346 P93 — Yun Does Not Trust a Convenient Savior** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Name.”
>>> “Yurushi Amagiri.”
after: [[speaker:yun]]“Affiliation.”
```

**S99 Chapter 349 P52 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Then at Yun.
>>> “Transfer?”
after: Yun nodded tiredly.
```

**S99 Chapter 349 P56 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: The nurse pointed the wrong direction.
>>> “Other hall.”
after: [[speaker:yun]]“Thank you.”
```

**S99 Chapter 349 P65 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: The guard frowned.
>>> “Where is your escort?”
after: Yun coughed.
```

**S99 Chapter 349 P70 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Physician sent me downstairs.”
>>> “Which physician?”
after: Yun gave the name of the midnight doctor.
```

**S99 Chapter 349 P74 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Bad.
>>> “He is not on shift.”
after: [[speaker:yun]]“Then he should stop signing forms while sleeping.”
```

**S99 Chapter 349 P149 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: Inside, the owner looked at Yurushi’s seal and swore.
>>> “Again?”
after: [[speaker:black_radiance]]“Sorry.”
```

**S99 Chapter 349 P151 — She Escapes on Her Own Feet** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“Sorry.”
>>> “You are never sorry.”
after: [[speaker:black_radiance]]“True.”
```

**S99 Chapter 350 P209 — Yurushi Stays Behind** — `docs/prose/FINAL_ARC_SEASON099_PROSE_DRAFT*.md`

```text
before: A guard bowed.
>>> “And the person?”
after: Shunto looked at the open door.
```

**S100 Chapter 355 P27 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The physician looked at the pattern and stopped treating her like an ordinary traveler.
>>> “Who did this?”
after: Yun opened her eyes.
```

**S100 Chapter 355 P30 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Later.”
>>> “You need treatment now.”
after: [[speaker:yun]]“I need an officer.”
```

**S100 Chapter 355 P32 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I need an officer.”
>>> “You need a bed.”
after: [[speaker:yun]]“Both.”
```

**S100 Chapter 355 P39 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The word changed the type of foreign.
>>> “Name?”
after: [[speaker:yun]]“Yun Shizhen.”
```

**S100 Chapter 355 P49 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The senior physician looked at the junior.
>>> “You know her?”
after: “Wuyue Top Ten.”
```

**S100 Chapter 355 P50 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: “You know her?”
>>> “Wuyue Top Ten.”
after: Silence.
```

**S100 Chapter 355 P57 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The physician turned toward the door.
>>> “Get the pact liaison.”
after: Yun caught his sleeve.
```

**S100 Chapter 355 P66 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: He nodded.
>>> “Both.”
after: Good.
```

**S100 Chapter 355 P76 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The healer looked embarrassed.
>>> “Sorry.”
after: [[speaker:yun]]“I agree with you.”
```

**S100 Chapter 355 P85 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Bad answer.”
>>> “We are stabilizing you.”
after: [[speaker:yun]]“Also not an answer.”
```

**S100 Chapter 355 P88 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The senior physician returned and leaned over her.
>>> “We are going to try.”
after: Yun looked at him.
```

**S100 Chapter 355 P104 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The physician frowned.
>>> “Why?”
after: [[speaker:yun]]“Inside seam.”
```

**S100 Chapter 355 P113 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Do not open it here.”
>>> “What is it?”
after: [[speaker:yun]]“Axtaya.”
```

**S100 Chapter 355 P119 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The physician’s eyes sharpened.
>>> “From where?”
after: [[speaker:yun]]“Shinrin.”
```

**S100 Chapter 355 P129 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The liaison looked at her once, then at the physician.
>>> “Can she speak?”
after: The physician said, “Briefly.”
```

**S100 Chapter 355 P135 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The liaison pulled a chair close.
>>> “Yun Shizhen?”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 355 P137 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “Wuyue No.10?”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 355 P139 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “I am Commander Hallen, northern pact liaison. Whatever you tell me now goes directly to central command and Wuyue.”
after: Yun looked at him.
```

**S100 Chapter 355 P143 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: He paused.
>>> “I need cause.”
after: [[speaker:yun]]“Foreign invasion preparation against Isgard.”
```

**S100 Chapter 355 P146 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen’s face hardened. He had heard enough.
>>> “Confirmed?”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 355 P148 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “How soon?”
after: [[speaker:yun]]“Weeks possible.”
```

**S100 Chapter 355 P161 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The physician touched her shoulder.
>>> “Enough for now.”
after: Yun shook her head.
```

**S100 Chapter 355 P164 — One Day Later** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“No.”
>>> “You will kill yourself finishing a report.”
after: She looked at him.
```

**S100 Chapter 356 P9 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen looked up.
>>> “One institution?”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 356 P11 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “Continue.”
after: [[speaker:yun]]“Axtaya.”
```

**S100 Chapter 356 P15 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Circulatory stimulant program. Multiplies combat throughput temporarily. Does not raise cultivation realm or skill.”
>>> “Military issue?”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 356 P17 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “How strong?”
after: [[speaker:yun]]“Multiple tiers. I confirmed escalation beyond safe medical origin. Highest field tier can produce roughly triple throughput for a short window.”
```

**S100 Chapter 356 P20 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The physician stopped writing treatment notes.
>>> “Cost?”
after: [[speaker:yun]]“Future vitality. Also acute physical damage. Not the same thing.”
```

**S100 Chapter 356 P31 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Wider trained apparatus exceeds two hundred thousand by conservative reconstruction. Regional forces, reserves, support-connected trained units. I did not confirm all would deploy at once.”
>>> “Quality?”
after: [[speaker:yun]]“High.”
```

**S100 Chapter 356 P33 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“High.”
>>> “How high?”
after: [[speaker:yun]]“Peak Marquis appears ordinary enough inside trained elite cohorts that Isgard must not plan around Wuyue scarcity assumptions.”
```

**S100 Chapter 356 P48 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “Confirmed?”
after: [[speaker:yun]]“Multiple independent medical and administrative sources. Treat all ten as Paragon until disproven.”
```

**S100 Chapter 356 P50 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Multiple independent medical and administrative sources. Treat all ten as Paragon until disproven.”
>>> “Names?”
after: [[speaker:yun]]“I do not have a complete reliable ten-name operational list. Do not invent one from my report.”
```

**S100 Chapter 356 P54 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen nodded.
>>> “Known?”
after: [[speaker:yun]]“Shunto Takamori. No.2. High Paragon. Capture specialist.”
```

**S100 Chapter 356 P63 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“I do not know.”
>>> “Estimate?”
after: [[speaker:yun]]“No.”
```

**S100 Chapter 356 P71 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The physician stepped closer.
>>> “Stop.”
after: [[speaker:yun]]“One more section.”
```

**S100 Chapter 356 P73 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“One more section.”
>>> “You said that three sections ago.”
after: [[speaker:yun]]“This is the important one.”
```

**S100 Chapter 356 P75 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“This is the important one.”
>>> “They were all important.”
after: [[speaker:yun]]“Good physician.”
```

**S100 Chapter 356 P77 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Good physician.”
>>> “Terrible patient.”
after: [[speaker:yun]]“Frequently.”
```

**S100 Chapter 356 P88 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“No master order recovered. Independent systems converge on Isgard.”
>>> “Launch timing?”
after: [[speaker:yun]]“Four-month readiness architecture from initial staging. I left late month three.”
```

**S100 Chapter 356 P91 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen’s face lost what little color remained.
>>> “Weeks.”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 356 P93 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “Could be delayed.”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 356 P95 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “Could be accelerated.”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 356 P98 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: He stood.
>>> “Send full emergency activation. Not preliminary. Defensive pact.”
after: The clerk looked up.
```

**S100 Chapter 356 P100 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The clerk looked up.
>>> “Before central verification?”
after: Hallen pointed at Yun.
```

**S100 Chapter 356 P102 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen pointed at Yun.
>>> “A Wuyue Top Ten officer crossed a continent carrying physical evidence and a coherent logistics reconstruction while half-dead. Verification continues while the pact activates.”
after: Good.
```

**S100 Chapter 356 P116 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“At whom?” Yun asked.
>>> “You.”
after: [[speaker:yun]]“Fair.”
```

**S100 Chapter 356 P119 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen returned to the chair.
>>> “You said Takamori captured you.”
after: [[speaker:yun]]“Yes.”
```

**S100 Chapter 356 P121 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Yes.”
>>> “How did you escape?”
after: [[speaker:yun]]“Insider assistance.”
```

**S100 Chapter 356 P123 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Insider assistance.”
>>> “Name?”
after: Yun looked at him.
```

**S100 Chapter 356 P126 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“No.”
>>> “For protection?”
after: [[speaker:yun]]“For theirs.”
```

**S100 Chapter 356 P128 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“For theirs.”
>>> “Shinsei insider?”
after: [[speaker:yun]]“Close enough to its systems to create a route.”
```

**S100 Chapter 356 P131 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen accepted the boundary.
>>> “Did Takamori obtain your evidence?”
after: [[speaker:yun]]“Notebook, probably. Not all meaning. Physical sample survived. Essential facts memorized. One coded packet may have left Shinrin earlier.”
```

**S100 Chapter 356 P133 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Notebook, probably. Not all meaning. Physical sample survived. Essential facts memorized. One coded packet may have left Shinrin earlier.”
>>> “Destination?”
after: [[speaker:yun]]“Wuyue medical channels. Luo Wen may recognize it if it arrives.”
```

**S100 Chapter 356 P141 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen nodded.
>>> “Anything else about Takamori?”
after: Yun’s eyes stayed on the ceiling.
```

**S100 Chapter 356 P153 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Has Wuyue been sent?”
>>> “Yes.”
after: [[speaker:yun]]“Pact?”
```

**S100 Chapter 356 P155 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Pact?”
>>> “Activated.”
after: [[speaker:yun]]“Good.”
```

**S100 Chapter 356 P160 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Sample.”
>>> “We have it.”
after: [[speaker:yun]]“Luo Wen.”
```

**S100 Chapter 356 P162 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:yun]]“Luo Wen.”
>>> “We will make sure Wuyue medical command receives the findings and the sample as soon as transport allows.”
after: Yun frowned.
```

**S100 Chapter 356 P170 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Hallen nodded.
>>> “Luo Wen.”
after: Yun relaxed by a fraction.
```

**S100 Chapter 356 P177 — The Last Report of the Pale Venom** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: He understood what she meant.
>>> “The warning is moving.”
after: She closed her eyes.
```

**S100 Chapter 358 P30 — The Empty Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: He looked exhausted enough to be honest.
>>> “First Inner Petal.”
after: Sera looked up.
```

**S100 Chapter 358 P32 — The Empty Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: Sera looked up.
>>> “The Top Ten command relay has a vacancy.”
after: Silence.
```

**S100 Chapter 358 P37 — The Empty Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“What requires the number?”
>>> “Public mobilization authority in two eastern formations. They are structured to receive emergency orders through ranked holders or regional sovereign command. We can reroute through Jin, but it creates delay.”
after: [[speaker:jin]]Jin said, “How much?”
```

**S100 Chapter 358 P39 — The Empty Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]Jin said, “How much?”
>>> “Best case, hours. Worst case, a day if the road relay is interrupted.”
after: A day.
```

**S100 Chapter 359 P124 — Shen Rui Names the Gale** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]“No.”
>>> “No Dominion.”
after: [[speaker:xie_wuchen]]“No.”
```

**S100 Chapter 359 P134 — Shen Rui Names the Gale** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]“You are both making a poor recruitment pitch.”
>>> “We are describing the job.”
after: [[speaker:xie_wuchen]]“That is worse.”
```

**S100 Chapter 360 P34 — The Empty Number Is Still a Number** — `docs/prose/FINAL_ARC_SEASON100_PROSE_DRAFT*.md`

```text
before: The record clerk opened the appointment ledger.
>>> “Wuyue public ranking seat No.10, vacant following the death of Yun Shizhen, the Pale Venom—”
after: Xie raised one hand.
```

**S101 Chapter 361 P11 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A naval clerk swallowed.
>>> “Forty-six deep-hull transports confirmed within nine days. Another nineteen if Stonecrown releases civilian grain carriers.”
after: [[speaker:jin]]“Do not count grain carriers twice,” Jin said.
```

**S101 Chapter 361 P13 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Do not count grain carriers twice,” Jin said.
>>> “I did not.”
after: [[speaker:jin]]“You did yesterday.”
```

**S101 Chapter 361 P15 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“You did yesterday.”
>>> “That was another clerk.”
after: Jin looked at him.
```

**S101 Chapter 361 P18 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The clerk amended himself.
>>> “That was the office.”
after: [[speaker:jin]]“Better.”
```

**S101 Chapter 361 P37 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Yes.”
>>> “If the fleet launches—”
after: [[speaker:jin]]“If Isgard loses hospitals before we arrive, troops become decorative.”
```

**S101 Chapter 361 P53 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A runner entered.
>>> “Message from the northern pact office.”
after: Sera took it.
```

**S101 Chapter 361 P113 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The clerk stopped.
>>> “Sir?”
after: [[speaker:xie_wuchen]]“Xie is shorter.”
```

**S101 Chapter 361 P115 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:xie_wuchen]]“Xie is shorter.”
>>> “The regulation says—”
after: [[speaker:xie_wuchen]]“Then the regulation has too many syllables.”
```

**S101 Chapter 361 P126 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The assistant froze.
>>> “The tea?”
after: [[speaker:luo]]“The sample.”
```

**S101 Chapter 361 P128 — The First Day After the Warning** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“The sample.”
>>> “I meant the tea.”
after: Luo looked at the cup as if seeing it for the first time.
```

**S101 Chapter 362 P14 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Core did not ask what.
>>> “Do not open the door.”
after: [[speaker:sera]]“Why?”
```

**S101 Chapter 362 P16 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Why?”
>>> “The condensation has already passed the first reversible stage.”
after: Sera's eyes stayed on the stone.
```

**S101 Chapter 362 P20 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Core exhaled.
>>> “The first hours were compression. If he had stopped then, he would have been sick and furious but probably safe.”
after: [[speaker:sera]]“And now?”
```

**S101 Chapter 362 P22 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“And now?”
>>> “Now his old circulation structure is being rebuilt around the denser reserve.”
after: He tapped one slate.
```

**S101 Chapter 362 P24 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: He tapped one slate.
>>> “The meridians are not simply carrying qi. They are changing how they carry it. If the process is forced open from outside, the pressure can tear through channels that are only half stabilized.”
after: [[speaker:sera]]“Can he repair that?”
```

**S101 Chapter 362 P26 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Can he repair that?”
>>> “Maybe.”
after: Sera turned.
```

**S101 Chapter 362 P29 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Core held her gaze.
>>> “You asked for plain language.”
after: [[speaker:sera]]“I did.”
```

**S101 Chapter 362 P31 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“I did.”
>>> “Maybe he repairs it. Maybe he wakes with enough of himself intact to repair the rest. Maybe the damage propagates faster than he can reorganize from inside it.”
after: Lu said nothing.
```

**S101 Chapter 362 P34 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Core continued.
>>> “We do not know because nobody else has ever had this problem.”
after: That was the medical summary of Rhen's life.
```

**S101 Chapter 362 P39 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“How long before interruption becomes safe?”
>>> “It becomes safe when he finishes.”
after: [[speaker:sera]]“That was not my question.”
```

**S101 Chapter 362 P41 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“That was not my question.”
>>> “It is the only honest answer.”
after: The corridor stayed quiet.
```

**S101 Chapter 362 P63 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Core nodded.
>>> “That is reasonable.”
after: [[speaker:sera]]“Then do it.”
```

**S101 Chapter 362 P68 — The Door Cannot Be Opened** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Core watched her.
>>> “You are not going to ask me a fourth time?”
after: [[speaker:sera]]“No.”
```

**S101 Chapter 363 P16 — Luo Reads What Yun Left Him** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The courier placed it on the table.
>>> “Recovered through a merchant relay in the western ports. Three transfers. One dead-drop failed. This copy kept moving.”
after: Luo looked at the seal.
```

**S101 Chapter 364 P22 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“South road is watched. Take the dyers' canal west, then the old kiln track. There will be a cart at the broken shrine.”
>>> “Whose cart?”
after: [[speaker:black_radiance]]“You do not want to know.”
```

**S101 Chapter 364 P24 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“You do not want to know.”
>>> “That sounds reassuring.”
after: [[speaker:black_radiance]]“It is not.”
```

**S101 Chapter 364 P31 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“Do not show this unless someone stops the cart.”
>>> “What if Shinsei stops it?”
after: [[speaker:black_radiance]]“Especially then.”
```

**S101 Chapter 364 P34 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: She looked at the mark.
>>> “Will it work?”
after: [[speaker:black_radiance]]“For another day.”
```

**S101 Chapter 364 P36 — Black Radiance Burns the Last Safehouse** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“For another day.”
>>> “And after that?”
after: Yurushi looked back at the safehouse.
```

**S101 Chapter 366 P7 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The youngest clerk stared at the deployment board.
>>> “Sixty percent of continental combat strength—”
after: [[speaker:jin]]“No.”
```

**S101 Chapter 366 P9 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“No.”
>>> “Sixty percent of available soldiers—”
after: [[speaker:jin]]“No.”
```

**S101 Chapter 366 P11 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“No.”
>>> “Sixty percent of—”
after: Jin put down his brush.
```

**S101 Chapter 366 P17 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Strategic defence weight.”
>>> “Yes, Lord Jin.”
after: [[speaker:jin]]“Not bodies.”
```

**S101 Chapter 366 P19 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Not bodies.”
>>> “Yes.”
after: [[speaker:jin]]“Not every sixth man out of ten.”
```

**S101 Chapter 366 P21 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Not every sixth man out of ten.”
>>> “Yes.”
after: [[speaker:jin]]“Not a mystical number that forces armies to become equal sizes.”
```

**S101 Chapter 366 P27 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The clerk decided survival mattered.
>>> “Yes.”
after: Jin continued.
```

**S101 Chapter 366 P106 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The youngest clerk stared.
>>> “That is less than the last Black March.”
after: The room changed.
```

**S101 Chapter 366 P111 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The clerk immediately looked horrified.
>>> “I did not mean—”
after: [[speaker:sera]]“You meant the number is lower.”
```

**S101 Chapter 366 P113 — Sixty Percent Does Not Mean Sixty Percent of the Men** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You meant the number is lower.”
>>> “Yes.”
after: [[speaker:sera]]“It is.”
```

**S101 Chapter 368 P16 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Old enough to remember carrying his mother's body to a winter trench.
>>> “Commander?”
after: [[speaker:brynja]]“The bell.”
```

**S101 Chapter 368 P44 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:brynja]]“Use infantry.”
>>> “That will exhaust them before—”
after: [[speaker:brynja]]“Use infantry.”
```

**S101 Chapter 368 P63 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A runner climbed the stairs too fast.
>>> “Western tower confirms additional hulls.”
after: [[speaker:brynja]]“How many?”
```

**S101 Chapter 368 P65 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:brynja]]“How many?”
>>> “Twenty-two visible. More behind fog.”
after: [[speaker:brynja]]“Landing craft?”
```

**S101 Chapter 368 P67 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:brynja]]“Landing craft?”
>>> “Mixed.”
after: [[speaker:brynja]]“Paragon signs?”
```

**S101 Chapter 368 P70 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The runner swallowed.
>>> “None confirmed.”
after: Brynja looked back at the sea.
```

**S101 Chapter 368 P73 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:brynja]]“Then stop looking for fireworks.”
>>> “Commander?”
after: [[speaker:brynja]]“A Paragon who wants to arrive unnoticed will not announce himself because our report form has a box.”
```

**S101 Chapter 368 P130 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“From south?”
>>> “Yes.”
after: [[speaker:solveig]]“Army?”
```

**S101 Chapter 368 P133 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The messenger's face answered before his mouth.
>>> “Still assembling.”
after: Nobody cursed.
```

**S101 Chapter 368 P137 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“What has moved?” Solveig asked.
>>> “Medicine. Preserved food. Surgical supplies. Two fast naval escorts. Wuyue says the main expedition is not ready to sail without becoming a supply failure halfway north.”
after: Varok muttered something impolite.
```

**S101 Chapter 368 P141 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Sera?”
>>> “Still in Wuyue.”
after: That hurt more.
```

**S101 Chapter 368 P146 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The messenger continued quickly.
>>> “She says the pact is active. They are coming.”
after: Solveig looked at the map.
```

**S101 Chapter 368 P150 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The messenger blinked.
>>> “Those exact words?”
after: [[speaker:solveig]]“Yes.”
```

**S101 Chapter 368 P160 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:brynja]]“Range?”
>>> “Not yet.”
after: She waited.
```

**S101 Chapter 368 P201 — Fourteen Days** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The lookout looked at her.
>>> “Why?”
after: [[speaker:brynja]]“Because somebody older than me may hate it for a reason.”
```

**S101 Chapter 369 P19 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A medic raised one hand.
>>> “Third boat. Four crushed ribs, one open fracture, two concussions.”
after: [[speaker:aya]]“Redline?”
```

**S101 Chapter 369 P21 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Redline?”
>>> “None.”
after: [[speaker:aya]]“Keep it that way.”
```

**S101 Chapter 369 P29 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A captain approached.
>>> “Lady Aya, command asks whether the medical line can move closer to—”
after: [[speaker:aya]]“No.”
```

**S101 Chapter 369 P33 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“The wounded come here. I do not move the hospital into siege range because a map wants symmetry.”
>>> “Yes, Lady Aya.”
after: [[speaker:aya]]“Also stop calling me Lady in a treatment tent.”
```

**S101 Chapter 369 P35 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Also stop calling me Lady in a treatment tent.”
>>> “Yes, Lady—”
after: He left before finishing.
```

**S101 Chapter 369 P45 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:kenji]]“What?”
>>> “The ramp!”
after: [[speaker:kenji]]“I have legs.”
```

**S101 Chapter 369 P47 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:kenji]]“I have legs.”
>>> “You also have regulations!”
after: Kenji looked genuinely offended.
```

**S101 Chapter 369 P88 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: He stared straight ahead.
>>> “No, Lady Nao.”
after: [[speaker:nao]]“You are lying to somebody who grew up running a bathhouse.”
```

**S101 Chapter 369 P97 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: He swallowed.
>>> “Are we going to win?”
after: Nao looked toward the Isgard hills.
```

**S101 Chapter 369 P101 — Five Paragons Step Ashore** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The soldier hesitated.
>>> “Will you be here?”
after: [[speaker:nao]]“Yes.”
```

**S101 Chapter 370 P5 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Then as if neither was safe.
>>> “Voss.”
after: The command tent went silent.
```

**S101 Chapter 370 P13 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Orven stared at the shieldwork report from Brynja's coast.
>>> “Read the brace again.”
after: A clerk did.
```

**S101 Chapter 370 P15 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A clerk did.
>>> “Impact received at shield rim. Force distributed through shoulder, hip and rear leg rather than direct arm absorption. Commander remained planted despite unstable deck.”
after: Orven's face had gone pale.
```

**S101 Chapter 370 P18 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:varok]]Varok said, “That is a defensive method.”
>>> “No.”
after: Orven looked at him.
```

**S101 Chapter 370 P20 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Orven looked at him.
>>> “That is **his** defensive method.”
after: Solveig felt the room change.
```

**S101 Chapter 370 P25 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: It contained no humor.
>>> “So we believed.”
after: Another old officer stepped closer.
```

**S101 Chapter 370 P27 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Another old officer stepped closer.
>>> “What else?”
after: The clerk read.
```

**S101 Chapter 370 P29 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: The clerk read.
>>> “Short battle signal. Three downward fingers, one lateral sweep. Landing boats shifted staggered shield coverage immediately.”
after: The second officer sat down.
```

**S101 Chapter 370 P34 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Orven closed his eyes.
>>> “That was the old King's Guard landing order.”
after: Nobody used the title **king** officially anymore.
```

**S101 Chapter 370 P56 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: Orven answered quietly.
>>> “Maybe because they built what he failed to.”
after: Nobody liked that answer.
```

**S101 Chapter 370 P60 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A messenger entered at speed.
>>> “Contact at the western inland road.”
after: Solveig stood.
```

**S101 Chapter 370 P63 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Who?”
>>> “Shinsei command delegation under flag.”
after: [[speaker:solveig]]“Terms?”
```

**S101 Chapter 370 P65 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Terms?”
>>> “They requested Aldric.”
after: The room went colder.
```

**S101 Chapter 370 P103 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A younger soldier looked at him.
>>> “What?”
after: “Before him, two clans charged tolls on the same bridge.”
```

**S101 Chapter 370 P104 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: “What?”
>>> “Before him, two clans charged tolls on the same bridge.”
after: Another older woman said, “My village ate because of his grain law.”
```

**S101 Chapter 370 P107 — Isgard Recognizes Its Dead King** — `docs/prose/FINAL_ARC_SEASON101_PROSE_DRAFT*.md`

```text
before: A third voice, harsher:
>>> “My uncle disappeared during one of his emergency levies.”
after: History refused to simplify itself for the convenience of battle.
```

**S102 Chapter 372 P25 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: An officer pointed.
>>> “Two miles inland.”
after: [[speaker:jun]]“Evacuation traffic?”
```

**S102 Chapter 372 P27 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:jun]]“Evacuation traffic?”
>>> “Continuous.”
after: [[speaker:jun]]“Then the wall is not the objective.”
```

**S102 Chapter 372 P64 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: The officer beside him looked furious.
>>> “They destroyed their own town.”
after: [[speaker:jun]]“They destroyed our timetable.”
```

**S102 Chapter 372 P80 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:halvek]]“Last medical wagon?”
>>> “Passed.”
after: [[speaker:halvek]]“Civilians?”
```

**S102 Chapter 372 P82 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:halvek]]“Civilians?”
>>> “Western villages clear.”
after: [[speaker:halvek]]“Rear infantry?”
```

**S102 Chapter 372 P84 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:halvek]]“Rear infantry?”
>>> “Crossing the fork now.”
after: Halvek looked toward the gate.
```

**S102 Chapter 372 P95 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: The officer's face changed.
>>> “Commander—”
after: [[speaker:halvek]]“Somebody has to make them believe this gate still matters for another ten minutes.”
```

**S102 Chapter 372 P97 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:halvek]]“Somebody has to make them believe this gate still matters for another ten minutes.”
>>> “We can leave a company.”
after: [[speaker:halvek]]“No.”
```

**S102 Chapter 372 P99 — Halvek Holds the Road After the Gate Is Gone** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:halvek]]“No.”
>>> “Then a squad.”
after: [[speaker:halvek]]“No.”
```

**S102 Chapter 373 P17 — Raska's Last Charge** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: His lieutenant looked at the Shinsei line.
>>> “Only two?”
after: [[speaker:raska]]“After two, we are tired horses pretending otherwise.”
```

**S102 Chapter 373 P39 — Raska's Last Charge** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: His lieutenant stared.
>>> “What?”
after: [[speaker:raska]]“Off the horses!”
```

**S102 Chapter 375 P18 — Eldran Stands Where Maedra Would Have Died** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: A scout came running.
>>> “Breach unit.”
after: Maedra's face hardened.
```

**S102 Chapter 375 P21 — Eldran Stands Where Maedra Would Have Died** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:maedra]]“Jun?”
>>> “Yes.”
after: Eldran swore.
```

**S102 Chapter 377 P112 — Last Body Standing Ends** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: A Shinsei officer stared.
>>> “Lady Sigrun is enemy command.”
after: [[speaker:kenji]]“Medic!”
```

**S102 Chapter 377 P130 — Last Body Standing Ends** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:kenji]]“Keep her alive.”
>>> “Prisoner?”
after: He looked at Sigrun.
```

**S102 Chapter 377 P135 — Last Body Standing Ends** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: The medic blinked.
>>> “Sir?”
after: Kenji's expression hardened.
```

**S102 Chapter 378 P19 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: Another messenger entered.
>>> “Western field requests reinforcement.”
after: Varok Skeldran looked up.
```

**S102 Chapter 378 P22 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:varok]]“How many?”
>>> “Two companies.”
after: A second runner arrived behind him.
```

**S102 Chapter 378 P24 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: A second runner arrived behind him.
>>> “Eastern retreat requests Varok personally.”
after: Of course it did.
```

**S102 Chapter 378 P32 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: An officer looked at the empty chair.
>>> “When Aldric wakes—”
after: [[speaker:solveig]]Solveig said, “He is not awake.”
```

**S102 Chapter 378 P35 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: The officer stopped.
>>> “Maedra—”
after: [[speaker:solveig]]“Cannot stand.”
```

**S102 Chapter 378 P37 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Cannot stand.”
>>> “Sigrun—”
after: [[speaker:solveig]]“May not survive the night.”
```

**S102 Chapter 378 P43 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: An old staff captain asked the question nobody wanted responsibility for.
>>> “Then who has command?”
after: Solveig looked at him.
```

**S102 Chapter 378 P47 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: He swallowed.
>>> “Yes.”
after: [[speaker:solveig]]“Me.”
```

**S102 Chapter 378 P55 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Halvek's seal is dead. Route this under emergency theatre authority.”
>>> “Does that exist?”
after: [[speaker:solveig]]“It does now.”
```

**S102 Chapter 378 P57 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“It does now.”
>>> “Can you do that?”
after: Solveig looked at him.
```

**S102 Chapter 378 P60 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: He reconsidered the philosophical value of the question.
>>> “Yes, Acting Commander.”
after: [[speaker:solveig]]“Good.”
```

**S102 Chapter 378 P90 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Why?”
>>> “We do not know.”
after: Then the door opened and a coastal runner stumbled in covered in soot.
```

**S102 Chapter 378 P92 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: Then the door opened and a coastal runner stumbled in covered in soot.
>>> “Because the signal tower is gone.”
after: Solveig's face tightened.
```

**S102 Chapter 378 P95 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Brynja?”
>>> “Alive.”
after: The room exhaled.
```

**S102 Chapter 378 P98 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Port?”
>>> “Still ours.”
after: **Brynja had held it with engines, mud and bad manners.**
```

**S102 Chapter 378 P108 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: Her officers stared at her.
>>> “Commander—”
after: [[speaker:brynja]]“Wait.”
```

**S102 Chapter 378 P147 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“Missing how?”
>>> “No contact for eleven hours.”
after: Solveig closed her eyes.
```

**S102 Chapter 378 P169 — Until One of Them Can Stand Again — Me** — `docs/prose/FINAL_ARC_SEASON102_PROSE_DRAFT*.md`

```text
before: A clerk blinked.
>>> “Why goats?”
after: [[speaker:astrid]]“Food has legs.”
```

**S103 Chapter 381 P6 — The Crossing** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The harbor officer looked at the manifest.
>>> “It is not.”
after: Jin pointed.
```

**S103 Chapter 381 P86 — The Crossing** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A young swordswoman looked up as Arin passed.
>>> “Lady Arin.”
after: [[speaker:arin]]“Sleep.”
```

**S103 Chapter 381 P88 — The Crossing** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:arin]]“Sleep.”
>>> “I’m not tired.”
after: [[speaker:arin]]“You’re lying badly.”
```

**S103 Chapter 382 P66 — Sera Sends Healers Before Fighters** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A messenger ran toward them.
>>> “Commander. West quay.”
after: Solveig turned.
```

**S103 Chapter 382 P69 — Sera Sends Healers Before Fighters** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:solveig]]“What?”
>>> “Second casualty barge. More than capacity.”
after: Solveig swore.
```

**S103 Chapter 382 P82 — Sera Sends Healers Before Fighters** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A Quaint physician looked up from the first patient.
>>> “Leader.”
after: [[speaker:sera]]“What do you need?”
```

**S103 Chapter 382 P84 — Sera Sends Healers Before Fighters** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“What do you need?”
>>> “Space.”
after: Sera turned.
```

**S103 Chapter 382 P88 — Sera Sends Healers Before Fighters** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: An Isgard clerk protested immediately.
>>> “That holds winter grain.”
after: [[speaker:sera]]“Move it.”
```

**S103 Chapter 382 P90 — Sera Sends Healers Before Fighters** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Move it.”
>>> “We don’t have carts.”
after: Mo Qingzhao’s first Imperial quartermaster had just stepped onto the dock.
```

**S103 Chapter 382 P96 — Sera Sends Healers Before Fighters** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: Then bowed.
>>> “Yes.”
after: Within fifteen minutes, grain was moving.
```

**S103 Chapter 383 P90 — Three Paragons in Beds** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A physician stood beside the bed.
>>> “She kept moving after she should have lost function.”
after: [[speaker:sera]]“Last Body Standing.”
```

**S103 Chapter 383 P93 — Three Paragons in Beds** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The physician nodded.
>>> “It delayed consequences. It did not remove them.”
after: Sera looked at Sigrun.
```

**S103 Chapter 383 P96 — Three Paragons in Beds** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Kenji?”
>>> “Stormstep Dominion was part of it. Repeated Thunder-Qi pursuit every planted step. She held the evacuation corridor anyway.”
after: [[speaker:sera]]“How long?”
```

**S103 Chapter 383 P98 — Three Paragons in Beds** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“How long?”
>>> “Long enough.”
after: That was becoming Isgard’s favorite unit of measurement.
```

**S103 Chapter 383 P114 — Three Paragons in Beds** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The physician gave a tired laugh.
>>> “Everyone who was left.”
after: That answer followed her back to the command hall.
```

**S103 Chapter 385 P52 — Jin Chooses One Beachhead** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: That bothered one Isgard colonel enough to finally ask.
>>> “Pale Orchid. You agree?”
after: Sera looked at him.
```

**S103 Chapter 385 P55 — Jin Chooses One Beachhead** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Yes.”
>>> “That’s all?”
after: [[speaker:sera]]“What else do you need?”
```

**S103 Chapter 385 P58 — Jin Chooses One Beachhead** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The man hesitated.
>>> “You’re the strongest person in this room.”
after: Kael raised one eyebrow.
```

**S103 Chapter 385 P74 — Jin Chooses One Beachhead** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Jun is Stable Paragon.”
>>> “Yes.”
after: [[speaker:sera]]“Kael is newly Paragon.”
```

**S103 Chapter 385 P76 — Jin Chooses One Beachhead** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Kael is newly Paragon.”
>>> “Yes.”
after: [[speaker:sera]]“So Kael needs Paragon battlefield experience.”
```

**S103 Chapter 386 P231 — Worldweight Meets Breach** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“You were told to stay out.”
>>> “The fight is over.”
after: Kael considered that.
```

**S103 Chapter 388 P10 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: He looked at Sera when she approached and swallowed.
>>> “Do it.”
after: Sera stopped.
```

**S103 Chapter 388 P14 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: His mouth tightened.
>>> “Kill me.”
after: The soldiers beside him glanced at one another.
```

**S103 Chapter 388 P19 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: He stared.
>>> “I know.”
after: [[speaker:sera]]“Then stop talking.”
```

**S103 Chapter 388 P26 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The prisoner looked between them.
>>> “You’re treating me.”
after: “Yes.”
```

**S103 Chapter 388 P27 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: “You’re treating me.”
>>> “Yes.”
after: “Why?”
```

**S103 Chapter 388 P28 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: “Yes.”
>>> “Why?”
after: The physician knelt.
```

**S103 Chapter 388 P30 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The physician knelt.
>>> “Because this is a leg.”
after: The soldier blinked.
```

**S103 Chapter 388 P33 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The physician cut away fabric.
>>> “Try not to make it a philosophy.”
after: That became the tone of the beachhead.
```

**S103 Chapter 388 P49 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A Dravaryn sergeant stopped beside a row of captured Shinsei infantry and looked at Sera.
>>> “They did this to us.”
after: Sera understood what he meant.
```

**S103 Chapter 388 P56 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Yes.”
>>> “And we feed them.”
after: [[speaker:sera]]“Yes.”
```

**S103 Chapter 388 P59 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The sergeant’s jaw tightened.
>>> “Why?”
after: [[speaker:sera]]“Because they surrendered.”
```

**S103 Chapter 388 P61 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Because they surrendered.”
>>> “That’s it?”
after: [[speaker:sera]]“That’s enough.”
```

**S103 Chapter 388 P99 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The man looked away.
>>> “One.”
after: “When?”
```

**S103 Chapter 388 P100 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: “One.”
>>> “When?”
after: “Six days ago.”
```

**S103 Chapter 388 P101 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: “When?”
>>> “Six days ago.”
after: [[speaker:luo]]“Why?”
```

**S103 Chapter 388 P103 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Why?”
>>> “Formation breach.”
after: [[speaker:luo]]“Were you dying?”
```

**S103 Chapter 388 P105 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Were you dying?”
>>> “No.”
after: [[speaker:luo]]“Were your people?”
```

**S103 Chapter 388 P107 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Were your people?”
>>> “Yes.”
after: Luo nodded.
```

**S103 Chapter 388 P115 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The soldier frowned.
>>> “About what?”
after: [[speaker:luo]]“The cost.”
```

**S103 Chapter 388 P117 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“The cost.”
>>> “Recovery?”
after: Luo became still.
```

**S103 Chapter 388 P121 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The soldier shrugged.
>>> “Severe fatigue. Meridian strain. Several months before full vitality recovery if overused.”
after: The number on the page was the difference.
```

**S103 Chapter 388 P137 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The man frowned.
>>> “I’m a prisoner.”
after: [[speaker:luo]]“Yes.”
```

**S103 Chapter 388 P139 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Yes.”
>>> “So?”
after: [[speaker:luo]]“So prisoners also have hearts.”
```

**S103 Chapter 388 P148 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The medic stood with hands bound in front.
>>> “I can identify Redline crash patterns.”
after: Luo looked at him.
```

**S103 Chapter 388 P151 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Training?”
>>> “Field medicine.”
after: [[speaker:luo]]“Under Aya Katsuragi?”
```

**S103 Chapter 388 P154 — Wuyue Takes Prisoners** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The man hesitated.
>>> “Her manuals.”
after: Luo untied one hand.
```

**S103 Chapter 389 P19 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A medic raised one hand.
>>> “I did.”
after: “How?”
```

**S103 Chapter 389 P20 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: “I did.”
>>> “How?”
after: “Spine board. No qinggong.”
```

**S103 Chapter 389 P21 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: “How?”
>>> “Spine board. No qinggong.”
after: [[speaker:aya]]“Good.”
```

**S103 Chapter 389 P44 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“It came out.”
>>> “Right.”
after: [[speaker:aya]]“Do not react to blood as though blood itself is failure.”
```

**S103 Chapter 389 P46 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Do not react to blood as though blood itself is failure.”
>>> “Yes, Physician.”
after: Jun’s pulse dropped.
```

**S103 Chapter 389 P130 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A clerk entered with a captured-status bulletin.
>>> “Western corridor lost. Jun’s formation withdrew successfully. One hundred-plus personnel captured.”
after: Jun looked at him.
```

**S103 Chapter 389 P134 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: The clerk checked.
>>> “No.”
after: A pause.
```

**S103 Chapter 389 P136 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: A pause.
>>> “Wuyue is treating them.”
after: Jun’s eyes narrowed.
```

**S103 Chapter 389 P140 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Treating?”
>>> “Yes.”
after: [[speaker:aya]]“Same standard as their own?”
```

**S103 Chapter 389 P142 — Aya Keeps Jun Alive** — `docs/prose/FINAL_ARC_SEASON103_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Same standard as their own?”
>>> “Report says yes.”
after: Jun stared at the ceiling.
```

**S104 Chapter 391 P89 — Two Paragons Enter Sera’s Home** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: He set the baskets down.
>>> “Visitors?”
after: Haru looked at him.
```

**S104 Chapter 391 P97 — Two Paragons Enter Sera’s Home** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: He turned and shouted:
>>> “RED TWO.”
after: The teahouse changed.
```

**S104 Chapter 395 P86 — Qin Opens the Map** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“Civilians?”
>>> “Safe.”
after: [[speaker:black_radiance]]“Patients?”
```

**S104 Chapter 395 P88 — Qin Opens the Map** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“Patients?”
>>> “Safe.”
after: [[speaker:black_radiance]]“Quaint?”
```

**S104 Chapter 395 P90 — Qin Opens the Map** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“Quaint?”
>>> “Eleven significant injuries. No deaths.”
after: Yurushi nodded.
```

**S104 Chapter 396 P2 — The Central Region** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: Yurushi recognized the attack before the messenger finished speaking.
>>> “Central road-command node,” the runner said. “Pressure spike. Two Paragon signatures.”
after: Qin turned toward him.
```

**S104 Chapter 396 P66 — The Central Region** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: Both froze when they saw him.
>>> “Black Radiance?”
after: [[speaker:black_radiance]]“Later.”
```

**S104 Chapter 396 P71 — The Central Region** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: One pointed.
>>> “Road command.”
after: Yurushi moved.
```

**S104 Chapter 400 P115 — Take Him Before I Change My Mind** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: The physician blinked.
>>> “Change your mind about treatment?”
after: [[speaker:tae]]“About carrying him.”
```

**S104 Chapter 400 P125 — Take Him Before I Change My Mind** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: The physician started cutting away blood-soaked cloth.
>>> “Outside.”
after: Tae did not move.
```

**S104 Chapter 400 P127 — Take Him Before I Change My Mind** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: Tae did not move.
>>> “Lord Tae.”
after: [[speaker:tae]]“I’m not a lord.”
```

**S104 Chapter 400 P129 — Take Him Before I Change My Mind** — `docs/prose/FINAL_ARC_SEASON104_PROSE_DRAFT*.md`

```text
before: [[speaker:tae]]“I’m not a lord.”
>>> “Outside.”
after: He went.
```

**S105 Chapter 401 P56 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The quartermaster stopped.
>>> “Forward Third and Sixth.”
after: [[speaker:aya]]“How many?”
```

**S105 Chapter 401 P61 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“How many?”
>>> “Formation allocation.”
after: [[speaker:aya]]“That is not a number.”
```

**S105 Chapter 401 P65 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The officer approached.
>>> “Physician Katsuragi.”
after: [[speaker:aya]]“How many 3× seals?”
```

**S105 Chapter 401 P67 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“How many 3× seals?”
>>> “Operationally restricted.”
after: Aya’s face went still.
```

**S105 Chapter 401 P70 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I designed the medical screening protocol for the drug you are carrying.”
>>> “This is command authorization.”
after: [[speaker:aya]]“That did not answer me.”
```

**S105 Chapter 401 P75 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The officer lowered his voice.
>>> “Several thousand.”
after: Aya’s hand tightened around the chart.
```

**S105 Chapter 401 P78 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“For emergency distribution?”
>>> “Formation activation.”
after: The words landed badly.
```

**S105 Chapter 401 P86 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The officer blinked.
>>> “Excuse me?”
after: [[speaker:aya]]“No mass same-window 3× activation.”
```

**S105 Chapter 401 P88 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“No mass same-window 3× activation.”
>>> “Command approved it.”
after: [[speaker:aya]]“I am objecting medically.”
```

**S105 Chapter 401 P90 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I am objecting medically.”
>>> “I will record that.”
after: [[speaker:aya]]“And then?”
```

**S105 Chapter 401 P98 — Jun Returns Before He Is Finished Healing** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The officer answered him.
>>> “Wuyue is preparing another push. If Third and Sixth break, the coastal supply spine becomes vulnerable.”
after: Jun’s jaw tightened.
```

**S105 Chapter 402 P13 — Thousands Open the Same Seal** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The aide stared.
>>> “We’re winning.”
after: [[speaker:jin]]“Signal withdrawal.”
```

**S105 Chapter 402 P40 — Thousands Open the Same Seal** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The aide stared.
>>> “New orders?”
after: [[speaker:jin]]“Everything changes.”
```

**S105 Chapter 402 P42 — Thousands Open the Same Seal** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Everything changes.”
>>> “What about the ridge?”
after: [[speaker:jin]]“Give it back.”
```

**S105 Chapter 402 P44 — Thousands Open the Same Seal** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Give it back.”
>>> “The beachhead?”
after: [[speaker:jin]]“Keep only the hospital road.”
```

**S105 Chapter 402 P46 — Thousands Open the Same Seal** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Keep only the hospital road.”
>>> “We just spent—”
after: [[speaker:jin]]“I know what we spent.”
```

**S105 Chapter 402 P95 — Thousands Open the Same Seal** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: Aide shouted:
>>> “Which one?”
after: [[speaker:jin]]“Since first activation.”
```

**S105 Chapter 402 P97 — Thousands Open the Same Seal** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Since first activation.”
>>> “Not simultaneous!”
after: Jin swore.
```

**S105 Chapter 403 P18 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: A soldier protested.
>>> “I’m fine.”
after: Aya pointed without looking.
```

**S105 Chapter 403 P49 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: One assistant noticed.
>>> “Physician?”
after: [[speaker:aya]]“Continue.”
```

**S105 Chapter 403 P56 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“How many doses?” she asked.
>>> “One.”
after: [[speaker:aya]]“Duration?”
```

**S105 Chapter 403 P58 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Duration?”
>>> “Four minutes something.”
after: [[speaker:aya]]“Prior use?”
```

**S105 Chapter 403 P60 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Prior use?”
>>> “No.”
after: Aya stabilized the pulse.
```

**S105 Chapter 403 P80 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: A colonel entered.
>>> “Physician Katsuragi.”
after: Aya did not look up.
```

**S105 Chapter 403 P83 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“What?”
>>> “Command requests readiness estimate for surviving Redline formations.”
after: Her hand stopped.
```

**S105 Chapter 403 P86 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Readiness.”
>>> “Yes.”
after: [[speaker:aya]]“When?”
```

**S105 Chapter 403 P88 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“When?”
>>> “Tomorrow morning.”
after: Aya looked at him.
```

**S105 Chapter 403 P92 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Tomorrow.”
>>> “Yes.”
after: She pointed at the room.
```

**S105 Chapter 403 P96 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: He swallowed.
>>> “Yes.”
after: [[speaker:aya]]“No. You see wounded soldiers.”
```

**S105 Chapter 403 P109 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“None of those sentences restore what Redline spent.”
>>> “I understand.”
after: [[speaker:aya]]“No.”
```

**S105 Chapter 403 P126 — Hundred Pulse Hospital** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Readiness estimate tomorrow.”
>>> “Yes?”
after: [[speaker:aya]]“Alive.”
```

**S105 Chapter 404 P8 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: He looked at her.
>>> “Nothing.”
after: [[speaker:aya]]“Your pulse disagrees.”
```

**S105 Chapter 404 P12 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: Then didn’t.
>>> “How long?”
after: Aya understood the question as recovery.
```

**S105 Chapter 404 P16 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The soldier stared.
>>> “That’s all?”
after: Aya paused.
```

**S105 Chapter 404 P19 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“What did you think?”
>>> “They said months.”
after: [[speaker:aya]]“Yes.”
```

**S105 Chapter 404 P21 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “So I got lucky.”
after: Something cold moved through Aya.
```

**S105 Chapter 404 P25 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The young man frowned.
>>> “That it’s an emergency stimulant.”
after: [[speaker:aya]]“Yes.”
```

**S105 Chapter 404 P27 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “Three-times output for around five minutes.”
after: [[speaker:aya]]“Yes.”
```

**S105 Chapter 404 P29 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “Severe fatigue. Meridian damage. Recovery can take months. Repeated use is dangerous.”
after: Aya’s hands went still.
```

**S105 Chapter 404 P33 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: He looked at her.
>>> “What?”
after: [[speaker:aya]]“What were you told about lifespan?”
```

**S105 Chapter 404 P40 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: Honest confusion.
>>> “No one said anything about lifespan.”
after: The hospital disappeared around her for one second.
```

**S105 Chapter 404 P57 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: For half a beat, it almost slowed too much.
>>> “What?”
after: Aya did not soften it.
```

**S105 Chapter 404 P61 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The soldier looked at his hands.
>>> “No.”
after: Aya said nothing.
```

**S105 Chapter 404 P63 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: Aya said nothing.
>>> “They said months.”
after: [[speaker:aya]]“I know.”
```

**S105 Chapter 404 P65 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I know.”
>>> “No, they said recovery could take months.”
after: [[speaker:aya]]“I know.”
```

**S105 Chapter 404 P68 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: He looked at her.
>>> “Did you know?”
after: The question had finally arrived. Aya could have explained.
```

**S105 Chapter 404 P83 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: He was entitled to it.
>>> “Then why didn’t you tell us?”
after: Aya’s throat tightened.
```

**S105 Chapter 404 P86 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I thought the warnings remained in operational briefing.”
>>> “That isn’t an answer.”
after: No.
```

**S105 Chapter 404 P93 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I believed being inside meant I could control dosage, screening, recovery, repeat use.”
>>> “And?”
after: Aya looked around the hospital.
```

**S105 Chapter 404 P114 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The clerk beside her stared.
>>> “Physician—”
after: [[speaker:aya]]“Copy it.”
```

**S105 Chapter 404 P116 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Copy it.”
>>> “Command has not approved—”
after: [[speaker:aya]]“Copy it.”
```

**S105 Chapter 404 P125 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: A supply officer arrived.
>>> “What are you doing?”
after: [[speaker:aya]]“Medicine.”
```

**S105 Chapter 404 P127 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Medicine.”
>>> “You’re cutting Redline availability.”
after: [[speaker:aya]]“Yes.”
```

**S105 Chapter 404 P129 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “On whose authority?”
after: [[speaker:aya]]“Mine.”
```

**S105 Chapter 404 P131 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Mine.”
>>> “You cannot block command issue.”
after: [[speaker:aya]]“I can classify bodies medically unfit.”
```

**S105 Chapter 404 P133 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I can classify bodies medically unfit.”
>>> “This many?”
after: Aya looked at him.
```

**S105 Chapter 404 P137 — They Told Him Months** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: The officer’s jaw tightened.
>>> “This will affect battlefield readiness.”
after: Aya looked back at the nineteen-year-old soldier.
```

**S105 Chapter 406 P9 — The First Five-Minute Retreat** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:arin]]“Did I say debate?”
>>> “No.”
after: [[speaker:arin]]“Then move.”
```

**S105 Chapter 406 P35 — The First Five-Minute Retreat** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: A nervous officer looked at Jin.
>>> “We’re losing the ridge.”
after: “Yes.”
```

**S105 Chapter 406 P36 — The First Five-Minute Retreat** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: “We’re losing the ridge.”
>>> “Yes.”
after: “Do we—”
```

**S105 Chapter 406 P37 — The First Five-Minute Retreat** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: “Yes.”
>>> “Do we—”
after: “No.”
```

**S105 Chapter 406 P38 — The First Five-Minute Retreat** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: “Do we—”
>>> “No.”
after: Three minutes.
```

**S105 Chapter 406 P93 — The First Five-Minute Retreat** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Yes.”
>>> “Good.”
after: Arin arrived carrying a cracked helmet under one arm.
```

**S105 Chapter 410 P99 — The Second Wave Opens at Minute Four** — `docs/prose/FINAL_ARC_SEASON105_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Write them all.”
>>> “They are being written.”
after: [[speaker:jin]]“I know.”
```

**S106 Chapter 412 P128 — After the War** — `docs/prose/FINAL_ARC_SEASON106_PROSE_DRAFT*.md`

```text
before: The clerk blinked.
>>> “All of them?”
after: [[speaker:tsubasa]]“Every one.”
```

**S106 Chapter 412 P130 — After the War** — `docs/prose/FINAL_ARC_SEASON106_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“Every one.”
>>> “Lifespan estimate included?”
after: [[speaker:tsubasa]]“Yes.”
```

**S106 Chapter 412 P132 — After the War** — `docs/prose/FINAL_ARC_SEASON106_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“Yes.”
>>> “3× remains authorized?”
after: [[speaker:tsubasa]]“Yes.”
```

**S107 Chapter 426 P55 — You Do Not Have Three Thousand Anymore** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: At one point a Shinsei officer shouted across the line:
>>> “Running?”
after: Arin looked at the hundreds of civilians and wounded passing behind her.
```

**S107 Chapter 427 P14 — Lei Holds the Second Wave** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: His officers looked at the Redline wave.
>>> “Lord Lei—”
after: [[speaker:lei]]“Hold.”
```

**S107 Chapter 427 P39 — Lei Holds the Second Wave** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: One captain stared.
>>> “He’s collapsing.”
after: [[speaker:mo]]“I know.”
```

**S107 Chapter 427 P41 — Lei Holds the Second Wave** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:mo]]“I know.”
>>> “Then—”
after: [[speaker:mo]]“If we feed people into that wave before the road opens, we lose both.”
```

**S107 Chapter 429 P80 — Sera Keeps the Corridor** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: One Quaint medic appeared instantly.
>>> “Leader.”
after: [[speaker:sera]]“I’m fine.”
```

**S107 Chapter 429 P85 — Sera Keeps the Corridor** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Bad habit.”
>>> “Yes.”
after: “Internal damage.”
```

**S107 Chapter 429 P86 — Sera Keeps the Corridor** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: “Yes.”
>>> “Internal damage.”
after: [[speaker:sera]]“Yes.”
```

**S107 Chapter 429 P88 — Sera Keeps the Corridor** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“Yes.”
>>> “Dehydration.”
after: [[speaker:sera]]“Yes.”
```

**S107 Chapter 429 P91 — Sera Keeps the Corridor** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“You’ve been spending time with Luo.”
>>> “Yes.”
after: Sera sat.
```

**S107 Chapter 429 P101 — Sera Keeps the Corridor** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: The medic misunderstood.
>>> “Next time what?”
after: Sera closed her eyes.
```

**S107 Chapter 430 P48 — We Beat Them Yesterday** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:sera]]“I’m sitting.”
>>> “You were lying down better.”
after: Sera ignored that and looked at Jin.
```

**S107 Chapter 430 P60 — We Beat Them Yesterday** — `docs/prose/FINAL_ARC_SEASON107_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Armies have been ignoring physicians for centuries.”
>>> “Also true.”
after: Sera almost laughed and immediately regretted it when her ribs answered.
```

**S108 Chapter 434 P8 — Isgard Still Has a Government** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: The clan representative read the answer twice.
>>> “Those are our grain stores.”
after: [[speaker:aldric]]“And the coast is where the next ships arrive.”
```

**S108 Chapter 434 P10 — Isgard Still Has a Government** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:aldric]]“And the coast is where the next ships arrive.”
>>> “If the grain burns—”
after: [[speaker:aldric]]“If the coast falls, your grain becomes somebody else’s.”
```

**S108 Chapter 434 P40 — Isgard Still Has a Government** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: “We need the southern reserve,” the steward said.
>>> “No,” one delegate answered. “You need what is left of our winter.”
after: Aldric looked at Solveig.
```

**S108 Chapter 434 P50 — Isgard Still Has a Government** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:aldric]]“No.”
>>> “My lord—”
after: [[speaker:aldric]]“We purchase what can be purchased, borrow against the Wuyue shipment, and cut military issue before taking seed grain.”
```

**S108 Chapter 434 P52 — Isgard Still Has a Government** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:aldric]]“We purchase what can be purchased, borrow against the Wuyue shipment, and cut military issue before taking seed grain.”
>>> “That reduces readiness.”
after: [[speaker:aldric]]“Yes.”
```

**S108 Chapter 436 P3 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: That made the accusation useful.
>>> “Five years?”
after: Luo nodded.
```

**S108 Chapter 436 P7 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: The medic stared at him as though the approximation were the offensive part.
>>> “That is absurd.”
after: [[speaker:luo]]“Yes.”
```

**S108 Chapter 436 P9 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Yes.”
>>> “I mean your claim.”
after: [[speaker:luo]]“I know.”
```

**S108 Chapter 436 P17 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: The medic frowned.
>>> “You are asking me to verify your accusation.”
after: [[speaker:luo]]“I am asking you to examine a patient.”
```

**S108 Chapter 436 P36 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: The medic looked at Luo.
>>> “What am I feeling?”
after: [[speaker:luo]]“Vital reserve after expenditure.”
```

**S108 Chapter 436 P38 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Vital reserve after expenditure.”
>>> “That is not how vitality loss presents.”
after: [[speaker:luo]]“Not from illness.”
```

**S108 Chapter 436 P43 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: The patient stared at both physicians.
>>> “They told us recovery could take months.”
after: Luo’s jaw tightened.
```

**S108 Chapter 436 P46 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“I know.”
>>> “How?”
after: [[speaker:luo]]“Because we found the same language in captured issue material.”
```

**S108 Chapter 436 P52 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: One of the other prisoners spoke from a cot.
>>> “Can Physician Katsuragi restore it?”
after: [[speaker:luo]]“No.”
```

**S108 Chapter 436 P54 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“No.”
>>> “Can you?”
after: [[speaker:luo]]“No.”
```

**S108 Chapter 436 P57 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: A third voice:
>>> “The Petals Monarch?”
after: The tent became quieter.
```

**S108 Chapter 436 P63 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: The first medic stood.
>>> “If this is true, why tell us?”
after: Luo looked at him.
```

**S108 Chapter 436 P66 — The Soldiers Learn What Five Years Means** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“You think I should keep your government’s secret because we are at war?”
>>> “I think you gain something by frightening prisoners.”
after: [[speaker:luo]]“Of course we gain something.”
```

**S108 Chapter 438 P30 — Shunto Guards the Center** — `docs/prose/FINAL_ARC_SEASON108_PROSE_DRAFT*.md`

```text
before: The clerk froze.
>>> “What lines?”
after: [[speaker:hana]]“Good answer.”
```

**S109 Chapter 444 P9 — Black Radiance and the Hidden Petal** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“In Shinsei depots, blue-marked compounds were often stored one aisle from circulation stabilizers.”
>>> “We are not Shinsei.”
after: [[speaker:black_radiance]]“I noticed.”
```

**S109 Chapter 444 P11 — Black Radiance and the Hidden Petal** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:black_radiance]]“I noticed.”
>>> “Then why are you reorganizing our stores like them?”
after: [[speaker:black_radiance]]“So if anyone trained in their system looks at this yard, they'll know which assumptions are dangerous.”
```

**S109 Chapter 444 P33 — Black Radiance and the Hidden Petal** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: Then back at Rhen.
>>> “Should I—”
after: [[speaker:luweiran]]“Yes,” Lu said.
```

**S109 Chapter 445 P183 — North Without an Army** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: The sailor beside her squinted.
>>> “See what?”
after: The crystals were gone.
```

**S109 Chapter 446 P16 — Sera** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“You should have that looked at.”
>>> “Yes, sir.”
after: [[speaker:rhen]]“Now.”
```

**S109 Chapter 446 P18 — Sera** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:rhen]]“Now.”
>>> “Yes, sir.”
after: The sentry ran toward the hospital instead of the command post.
```

**S109 Chapter 447 P74 — Sanctuary of Petals** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: A Wuyue officer raised a hand.
>>> “What about Shinsei prisoners?”
after: Rhen looked at him.
```

**S109 Chapter 447 P143 — Sanctuary of Petals** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: The toxin separated from circulation in a pale shimmer, moved toward harmless collection points and broke down under controlled qi pressure.
>>> “Sector One!”
after: “Sector Six!”
```

**S109 Chapter 447 P144 — Sanctuary of Petals** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: “Sector One!”
>>> “Sector Six!”
after: “Prison ward four!”
```

**S109 Chapter 447 P145 — Sanctuary of Petals** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: “Sector Six!”
>>> “Prison ward four!”
after: The calls began coming faster.
```

**S109 Chapter 447 P179 — Sanctuary of Petals** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: At sunset, a Wuyue captain approached Sera.
>>> “How long can he keep this up?”
after: Sera looked toward Rhen.
```

**S109 Chapter 449 P5 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: The Isgard nurse beside him did not look up from the chart.
>>> “Because Eirik Voss nearly killed you.”
after: Aldric frowned.
```

**S109 Chapter 449 P8 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:aldric]]“I remember that part.”
>>> “Then why ask?”
after: [[speaker:aldric]]“Why am I still here?”
```

**S109 Chapter 449 P11 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: The nurse finally looked at him.
>>> “Because every time we let you stand, you tore something else.”
after: Aldric considered this.
```

**S109 Chapter 449 P18 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: The nurse immediately pointed at the bed.
>>> “He is yours.”
after: Aldric looked offended.
```

**S109 Chapter 449 P54 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: The surgeon, a Wuyue woman half her size, did not move.
>>> “I heard you.”
after: [[speaker:maedra]]“Then move.”
```

**S109 Chapter 449 P56 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:maedra]]“Then move.”
>>> “No.”
after: Maedra's eyes narrowed.
```

**S109 Chapter 449 P59 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: [[speaker:maedra]]“I was ruling armies before your grandmother learned to braid her hair.”
>>> “My grandmother is bald.”
after: Maedra paused.
```

**S109 Chapter 449 P62 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: The surgeon held out one hand.
>>> “Sit.”
after: Maedra sat.
```

**S109 Chapter 449 P84 — Isgard Stands Again** — `docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT*.md`

```text
before: The surgeon patted her shoulder.
>>> “No, it wasn't.”
after: Rhen checked Maedra's circulation himself.
```

**S110 Chapter 451 P18 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The junior officer swallowed.
>>> “Active combat-capable Wuyue personnel as of dawn: fifty-three thousand, eight hundred and—”
after: Jin lifted one finger.
```

**S110 Chapter 451 P21 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Yesterday.”
>>> “Fifty-one thousand, four hundred and eleven.”
after: [[speaker:jin]]“The day before.”
```

**S110 Chapter 451 P23 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“The day before.”
>>> “Fifty thousand, nine hundred and six.”
after: Jin looked up.
```

**S110 Chapter 451 P28 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Hospitalized but expected back within seven days.”
>>> “Yesterday, seven thousand two hundred and twelve.”
after: [[speaker:jin]]“Today.”
```

**S110 Chapter 451 P30 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Today.”
>>> “Four thousand eight hundred and ninety.”
after: [[speaker:jin]]“Permanent or long-duration removal?”
```

**S110 Chapter 451 P32 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Permanent or long-duration removal?”
>>> “Unchanged except for reclassification of one hundred and six cases after the Sanctuary review.”
after: [[speaker:jin]]“Dead?”
```

**S110 Chapter 451 P35 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The officer's voice changed.
>>> “Unchanged.”
after: Of course.
```

**S110 Chapter 451 P40 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Isgard?”
>>> “Operational strength rising. Three Paragons returned to fighting condition. Senior Sovereign and Duke numbers are still being reconciled because—”
after: [[speaker:jin]]“Because people who had spent months on reduced duty have started walking out of hospitals and commanders are claiming them before the physicians sign the paper.”
```

**S110 Chapter 451 P43 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The junior officer hesitated.
>>> “Yes.”
after: Jin rubbed his forehead.
```

**S110 Chapter 451 P46 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“Make the physicians sign first.”
>>> “I told them.”
after: [[speaker:jin]]“And?”
```

**S110 Chapter 451 P48 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:jin]]“And?”
>>> “They told me to tell the commanders.”
after: Jin looked at him.
```

**S110 Chapter 451 P68 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The junior officer shifted.
>>> “Sir?”
after: Jin pointed to the line.
```

**S110 Chapter 451 P72 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The officer looked.
>>> “Recovery.”
after: [[speaker:jin]]“No.”
```

**S110 Chapter 451 P75 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: He frowned.
>>> “Readiness?”
after: “No.”
```

**S110 Chapter 451 P76 — Jin Recalculates the War** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: “Readiness?”
>>> “No.”
after: Jin tapped the page harder.
```

**S110 Chapter 453 P15 — Tsubasa Consolidates** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The scout captain beside her looked confused.
>>> “They left.”
after: [[speaker:ilyra]]“Yes.”
```

**S110 Chapter 453 P17 — Tsubasa Consolidates** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:ilyra]]“Yes.”
>>> “Without a fight.”
after: [[speaker:ilyra]]“Yes.”
```

**S110 Chapter 453 P19 — Tsubasa Consolidates** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:ilyra]]“Yes.”
>>> “That's good.”
after: Ilyra looked at him.
```

**S110 Chapter 453 P27 — Tsubasa Consolidates** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The scout nodded.
>>> “They withdrew on schedule.”
after: [[speaker:ilyra]]“They consolidated.”
```

**S110 Chapter 454 P16 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The colonel stood opposite her desk for several breaths.
>>> “Lady Katsuragi.”
after: Aya did not look up.
```

**S110 Chapter 454 P19 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“That title is not necessary in a field hospital.”
>>> “The wording is.”
after: [[speaker:aya]]“Yes.”
```

**S110 Chapter 454 P21 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “It is causing concern.”
after: [[speaker:aya]]“Yes.”
```

**S110 Chapter 454 P23 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “That was not praise.”
after: [[speaker:aya]]“I know.”
```

**S110 Chapter 454 P27 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The colonel placed both hands on the desk.
>>> “Five years is an estimate.”
after: [[speaker:aya]]“Yes.”
```

**S110 Chapter 454 P29 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “Not a guaranteed cost.”
after: [[speaker:aya]]“Yes.”
```

**S110 Chapter 454 P31 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “Then writing it like that is misleading.”
after: Aya finally looked at him.
```

**S110 Chapter 454 P35 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: He stiffened.
>>> “That language came from medical command.”
after: [[speaker:aya]]“From my office.”
```

**S110 Chapter 454 P40 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The colonel's jaw tightened.
>>> “Soldiers do not need a lifespan estimate in the middle of active war.”
after: [[speaker:aya]]“Why?”
```

**S110 Chapter 454 P42 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Why?”
>>> “Because it affects willingness.”
after: Aya's expression became very still.
```

**S110 Chapter 454 P45 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“That is the purpose of informed consent.”
>>> “This is an army.”
after: [[speaker:aya]]“They still possess bodies.”
```

**S110 Chapter 454 P48 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The colonel exhaled sharply.
>>> “Redline is issued for catastrophic battlefield necessity.”
after: [[speaker:aya]]“Then catastrophic battlefield necessity can survive the truth.”
```

**S110 Chapter 454 P62 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The colonel watched the pen move.
>>> “Command will challenge this.”
after: [[speaker:aya]]“Then command may come here.”
```

**S110 Chapter 454 P64 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Then command may come here.”
>>> “They will.”
after: [[speaker:aya]]“Good.”
```

**S110 Chapter 454 P211 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: He looked at the sealed vial tied inside his emergency pouch.
>>> “They told us recovery could take months.”
after: [[speaker:aya]]“I know.”
```

**S110 Chapter 454 P213 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“I know.”
>>> “Did they know?”
after: Aya did not lie.
```

**S110 Chapter 454 P217 — Aya Writes the Years** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: The soldier looked at her.
>>> “Did you?”
after: Aya's throat tightened.
```

**S110 Chapter 455 P129 — The Sealed Account** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: A Quaint medic placed the lacquer tube on the table.
>>> “From Lu.”
after: Sera's hand stopped.
```

**S110 Chapter 457 P66 — Hana's Changed Patrol** — `docs/prose/FINAL_ARC_SEASON110_PROSE_DRAFT*.md`

```text
before: A guard entered.
>>> “Lord Takamori. Lady Arakawa is here.”
after: Shunto smiled faintly.
```

**S111 Chapter 461 P12 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The hatch opened three fingers wide.
>>> “Water.”
after: Shunto remained seated on the narrow cot.
```

**S111 Chapter 461 P16 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The guard's jaw tightened.
>>> “You have been stripped of command.”
after: [[speaker:shunto]]“I heard.”
```

**S111 Chapter 461 P27 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:shunto]]“For nine years, if I told you to open a corridor, you opened it.”
>>> “You do not command me now.”
after: [[speaker:shunto]]“No.”
```

**S111 Chapter 461 P57 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: Shunto heard the clerk arguing with the gate captain.
>>> “Central authorization has removed Redline access.”
after: “I have that.”
```

**S111 Chapter 461 P58 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: “Central authorization has removed Redline access.”
>>> “I have that.”
after: “Prisoner-system clearance too.”
```

**S111 Chapter 461 P59 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: “I have that.”
>>> “Prisoner-system clearance too.”
after: “I have that.”
```

**S111 Chapter 461 P60 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: “Prisoner-system clearance too.”
>>> “I have that.”
after: “Supply routing?”
```

**S111 Chapter 461 P61 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: “I have that.”
>>> “Supply routing?”
after: The captain paused.
```

**S111 Chapter 461 P63 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The captain paused.
>>> “No.”
after: “Then sign.”
```

**S111 Chapter 461 P64 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: “No.”
>>> “Then sign.”
after: Paper scratched.
```

**S111 Chapter 461 P94 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The guard stiffened.
>>> “What happened?”
after: Shunto let his shoulder sag.
```

**S111 Chapter 461 P98 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The guard did not move.
>>> “Call medical.”
after: Shunto breathed shallowly.
```

**S111 Chapter 461 P140 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: But it was reacting to its former No.2, and that distinction changed how fast orders moved.
>>> “Stop him!”
after: Some soldiers moved instantly.
```

**S111 Chapter 461 P145 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: A captain stepped into his path.
>>> “Former Second Seat, halt!”
after: Shunto almost laughed at the title.
```

**S111 Chapter 461 P149 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The supply officer at the checkpoint held up a hand.
>>> “Seal.”
after: Shunto showed the old travel token on instinct.
```

**S111 Chapter 461 P212 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: A messenger ran into the lane.
>>> “Supreme Commander.”
after: Tsubasa looked at him.
```

**S111 Chapter 461 P214 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: Tsubasa looked at him.
>>> “Former Second Seat used still-live supply authorization at West Three.”
after: [[speaker:tsubasa]]“Destination?”
```

**S111 Chapter 461 P216 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“Destination?”
>>> “Unclear. The route grants access toward the western recovered corridors.”
after: Hana went still.
```

**S111 Chapter 461 P223 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The messenger unfolded a slate.
>>> “Several rotating commands. Wuyue No.1 Kael Veyran is recovering near the Greywater corridor. Luo Wen is inspecting recovered medical stores there.”
after: Silence.
```

**S111 Chapter 461 P228 — A Disgraced Number Two** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:tsubasa]]“Send warning to Wuyue command.”
>>> “Already moving.”
after: [[speaker:tsubasa]]“Send our own pursuit.”
```

**S111 Chapter 462 P66 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: A scout entered the shed.
>>> “Lord Kael.”
after: Kael turned.
```

**S111 Chapter 462 P69 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“What?”
>>> “Western ridge patrol missed a signal window.”
after: Luo looked up.
```

**S111 Chapter 462 P77 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“How long?”
>>> “Seven minutes.”
after: [[speaker:kael]]“Weather?”
```

**S111 Chapter 462 P79 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“Weather?”
>>> “Clear.”
after: [[speaker:kael]]“Other relays?”
```

**S111 Chapter 462 P81 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“Other relays?”
>>> “Normal.”
after: Kael walked outside.
```

**S111 Chapter 462 P85 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The corridor commander met them halfway.
>>> “Could be equipment failure.”
after: Kael looked toward the western ridge.
```

**S111 Chapter 462 P89 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The commander frowned.
>>> “You know that?”
after: [[speaker:kael]]“No.”
```

**S111 Chapter 462 P91 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“No.”
>>> “Then—”
after: [[speaker:kael]]“I dislike the timing.”
```

**S111 Chapter 462 P95 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:kael]]“Pull noncombatants behind Bridge Two. Prisoners too.”
>>> “Lord Kael, that will jam the road.”
after: [[speaker:kael]]“Jam it.”
```

**S111 Chapter 462 P155 — The Corridor** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The commander swallowed.
>>> “Back!”
after: Troops withdrew toward Bridge Two.
```

**S111 Chapter 470 P50 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The Isgard medic dropped beside him.
>>> “What about the other one?”
after: Luo looked at Shunto.
```

**S111 Chapter 470 P67 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: A corridor soldier grabbed his sleeve.
>>> “Doctor.”
after: Luo looked at him.
```

**S111 Chapter 470 P75 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The soldier's hand tightened.
>>> “You don't have to.”
after: Luo looked at the hand.
```

**S111 Chapter 470 P147 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The Shinsei captain stopped well outside range.
>>> “Shunto Takamori acted without Shinsei authority!” he shouted. “We request joint custody pending medical stabilization and formal judgment!”
after: Nobody answered.
```

**S111 Chapter 470 P161 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The medic stopped breathing.
>>> “Doctor.”
after: Luo did not look up.
```

**S111 Chapter 470 P164 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: [[speaker:luo]]“Busy.”
>>> “Doctor.”
after: [[speaker:luo]]“What?”
```

**S111 Chapter 470 P242 — Live Long Enough** — `docs/prose/FINAL_ARC_SEASON111_PROSE_DRAFT*.md`

```text
before: The Shinsei captain called again.
>>> “We request joint custody.”
after: Rhen looked at Luo.
```

**S113 Chapter 482 P25 — Five Years** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: Then looked at Aya.
>>> “Is that real?”
after: [[speaker:aya]]“Yes.”
```

**S113 Chapter 482 P27 — Five Years** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“Yes.”
>>> “One dose?”
after: [[speaker:aya]]“Yes.”
```

**S113 Chapter 482 P30 — Five Years** — `docs/prose/FINAL_ARC_SEASON113_PROSE_DRAFT*.md`

```text
before: The woman swallowed.
>>> “How long have you known?”
after: Aya did not defend herself.
```

**S114 Chapter 494 P19 — Burn Every Red Vial** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: The quartermaster swallowed.
>>> “Physician Katsuragi, if another continental invasion—”
after: [[speaker:aya]]“No.”
```

**S114 Chapter 494 P21 — Burn Every Red Vial** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: [[speaker:aya]]“No.”
>>> “What if—”
after: [[speaker:aya]]“No.”
```

**S114 Chapter 495 P41 — The Numbers Remember** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: He stood before the first pillar while an official read the declaration.
>>> “The ranking records active responsibility. The memorial records service.”
after: The wind moved through the plaza.
```

**S114 Chapter 495 P43 — The Numbers Remember** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: The wind moved through the plaza.
>>> “No successor inherits a life already lived. No new holder erases the one before.”
after: Luo Wen looked toward Yun's name.
```

**S114 Chapter 499 P24 — Xue Ra and Ri Xue** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: The governor looked between them.
>>> “Which of you is the physician?”
after: Sera pointed at Rhen.
```

**S114 Chapter 499 P30 — Xue Ra and Ri Xue** — `docs/prose/FINAL_ARC_SEASON114_PROSE_DRAFT*.md`

```text
before: The governor frowned.
>>> “Are you related to the Petals Monarch?”
after: [[speaker:rhen]]Rhen said, “No.”
```

## O. Unmarked ASCII-quoted text candidates

Count: **2**

**S2 Episode 9 P65 — The Hollow Duke** — `src/data/seasons/season-002.json`

```text
before: The next he stood beside Sera.
>>> <span class="novel-skill-supreme"><strong>✦ TRANSCENDED SKILL — TEN THOUSAND LI BENEATH ONE STEP</strong></span>
after: Distance did not vanish through magic.
```

**S2 Episode 10 P19 — One Petal** — `src/data/seasons/season-002.json`

```text
before: A single frozen petal hovered above his fingers.
>>> <span class="novel-skill-supreme"><strong>✦ TRANSCENDED SKILL — ONE PETAL</strong></span>
after: It did not overpower Wei Zhen's mountain-wide art.
```
