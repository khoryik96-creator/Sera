# Unattributed dialogue — final arc (Seasons 95–114)

## What this is

Chapters 95–114 are generated from the prose drafts in `docs/prose/`. Those
drafts are plain writing, so a build script has to work out who is speaking
before the reader can show a name on each line of dialogue.

The script only labels a line when the text actually supports it — the
paragraph names the speaker, or the sentence before it does. It used to also
guess by assuming people speak in turns. That is reliable with two people in a
scene and unreliable with three, so it produced visible mistakes (for example
Huo's line in Chapter 301 was labelled Lu Weiran). The guessing has been
removed.

The result is that **755 quoted lines now have no speaker name.** They
render as plain quoted text. Nothing is wrong with them — the speaker is simply
not recoverable automatically. This folder lists every one of them so a human or
an assistant with full story context can resolve them.

## Instructions

For each line you can confidently attribute:

1. Open the matching **source draft** in `docs/prose/` (see the table below).
   Do **not** edit the files in this folder — they are a generated worklist.
2. Find the quoted line.
3. Put a speaker marker immediately in front of the opening quotation mark, on
   the same line, with no space:

   ```
   [[speaker:huo]]“Not me.”
   ```

4. Change nothing else. Do not reword the prose, add narration, alter
   punctuation, or move the line. The marker is the whole edit.

If you cannot tell who is speaking, **leave the line alone.** An unlabelled line
is fine. A wrong name is worse than no name — that is the entire reason this
list exists.

## Rules

- Use only the keys in the table below. An unknown key will fail the build.
- One marker per line, always at the very start of the paragraph.
- The marker is invisible in the reader; it only sets the name on the card.
- Lines already labelled appear in the worklist as `[key]` for context. Leave
  those alone unless one is clearly wrong, in which case correct the marker.
- For an all-dialogue paragraph, the marker applies to that quoted line.
- A mixed dialogue+narration paragraph may also be marked when the prose itself
  makes the named speaker unambiguous. In the reader, only the quoted spans are
  emphasized; narration remains normal-weight. Do not mark mixed paragraphs from
  turn-taking alone.

## Speaker keys

| Key | Character |
|---|---|
| `rhen` | Rhen |
| `sera` | Sera |
| `kael` | Kael Veyran |
| `liang` | Liang Yue |
| `jin` | Jin Seoryu |
| `lei` | Lei Zhen |
| `rui` | Shen Rui |
| `ilyra` | Ilyra Serath |
| `tae` | Tae Muyeon |
| `mo` | Mo Qingzhao |
| `arin` | Arin Vale |
| `luo` | Luo Wen |
| `yun` | Yun Shizhen |
| `qin` | Qin Luo |
| `han` | Han Myeong |
| `jianruo` | Jian Ruo |
| `xuweng` | Xu Weng |
| `moqian` | Mo Qian |
| `yeonhwa` | Yeon Hwa |
| `wei` | Wei Zhen |
| `ji` | Ji Wuye |
| `cao` | Cao Tian |
| `ye` | Ye Mo |
| `zhao` | Zhao Keshan |
| `lin` | Lin Yao |
| `yan` | Yan Shou |
| `meizhen` | Mei Zhen |
| `yunke` | Yun Ke |
| `gaoren` | Gao Ren |
| `shufen` | Shu Fen |
| `baotien` | Bao Tien |
| `meilin` | Jian Meilin |
| `song` | Song Qiren |
| `shiyue` | Yun Shiyue |
| `huo` | Huo Wujin |
| `nam` | Nam Gyeol |
| `chun` | Chun Baek |
| `haejin` | Seo Haejin |
| `gwon` | Gwon Myeong |
| `daemun` | Dae Mun |
| `baek` | Baek Cheon |
| `gong` | Gong Seok |
| `jiang` | Jiang Taixuan |
| `duan` | Duan He |
| `mi` | Mi Suyun |
| `qiu` | Qiu Shen |
| `zhao_renkai` | Zhao Renkai |
| `mu` | Mu Gyeong |
| `seo` | Seo Mujin |
| `gu` | Gu Xian |
| `ren` | Ren Qiao |
| `qiao` | Qiao Ren |
| `miri` | Jae Miri |
| `sorin` | Sorin Vael |
| `valeria` | Valeria Nox |
| `draven` | Draven Sol |
| `aurel` | Aurel Veyr |
| `vaelor` | Vaelor Veyr |
| `orun` | Orun Vhal |
| `iscaryn` | Iscaryn Voss |
| `rhavenn` | Rhavenn Korr |
| `tor` | Tor Veydan |
| `caedros` | Caedros Marr |
| `varesh` | Varesh Nhal |
| `amon` | Amon Serath |
| `aethon` | Aethon Vael |
| `mareth` | Mareth Duskvein |
| `garran` | Garran Duskvein |
| `neris` | Neris Duskvein |
| `sivra` | Sivra Duskvein |
| `oren` | Oren Duskvein |
| `varok` | Varok Skeldran |
| `raska` | Raska Dravaryn |
| `eira` | Eira Eirholt |
| `tor_veyrhald` | Tor Veyrhald |
| `aldric` | Aldric Veyrhald |
| `maedra` | Maedra Dravaryn |
| `sigrun` | Sigrun Veyrhald |
| `halvek` | Halvek Veyrhald |
| `solveig` | Solveig Skeldran |
| `eldran` | Eldran Dravaryn |
| `brynja` | Brynja Kharvorn |
| `oskar` | Oskar Solvane |
| `astrid` | Astrid Vardrenn |
| `jorek` | Jorek Norrvek |
| `freya` | Freya Ysmark |
| `kellan` | Kellan Haldren |
| `luweiran` | Lu Weiran |
| `xie_wuchen` | Xie Wuchen |
| `black_radiance` | Yurushi Amagiri |
| `tsubasa` | Tsubasa Kurokawa |
| `shunto` | Shunto Takamori |
| `kai` | Kai Moriyama |
| `haru` | Haru Ishikawa |
| `eirik` | Eirik Voss |
| `hana` | Hana Arakawa |
| `aya` | Aya Katsuragi |
| `kenji` | Kenji Narukami |
| `jun` | Jun Kajihara |
| `nao` | Nao Shibasaki |

## Worklist

| Season | Lines | Worklist file | Source draft to edit |
|---|---|---|---|
| Season 95 | 159 | `season-095.md` | `FINAL_ARC_SEASON095_PROSE_DRAFT*.md` |
| Season 96 | 47 | `season-096.md` | `FINAL_ARC_SEASON096_PROSE_DRAFT*.md` |
| Season 97 | 47 | `season-097.md` | `FINAL_ARC_SEASON097_PROSE_DRAFT*.md` |
| Season 98 | 16 | `season-098.md` | `FINAL_ARC_SEASON098_PROSE_DRAFT*.md` |
| Season 99 | 34 | `season-099.md` | `FINAL_ARC_SEASON099_PROSE_DRAFT*.md` |
| Season 100 | 67 | `season-100.md` | `FINAL_ARC_SEASON100_PROSE_DRAFT*.md` |
| Season 101 | 80 | `season-101.md` | `FINAL_ARC_SEASON101_PROSE_DRAFT*.md` |
| Season 102 | 34 | `season-102.md` | `FINAL_ARC_SEASON102_PROSE_DRAFT*.md` |
| Season 103 | 57 | `season-103.md` | `FINAL_ARC_SEASON103_PROSE_DRAFT*.md` |
| Season 104 | 12 | `season-104.md` | `FINAL_ARC_SEASON104_PROSE_DRAFT*.md` |
| Season 105 | 64 | `season-105.md` | `FINAL_ARC_SEASON105_PROSE_DRAFT*.md` |
| Season 106 | 3 | `season-106.md` | `FINAL_ARC_SEASON106_PROSE_DRAFT*.md` |
| Season 107 | 12 | `season-107.md` | `FINAL_ARC_SEASON107_PROSE_DRAFT*.md` |
| Season 108 | 19 | `season-108.md` | `FINAL_ARC_SEASON108_PROSE_DRAFT*.md` |
| Season 109 | 20 | `season-109.md` | `FINAL_ARC_SEASON109_PROSE_DRAFT*.md` |
| Season 110 | 38 | `season-110.md` | `FINAL_ARC_SEASON110_PROSE_DRAFT*.md` |
| Season 111 | 37 | `season-111.md` | `FINAL_ARC_SEASON111_PROSE_DRAFT*.md` |
| Season 112 | 0 | `season-112.md` | `FINAL_ARC_SEASON112_PROSE_DRAFT*.md` |
| Season 113 | 3 | `season-113.md` | `FINAL_ARC_SEASON113_PROSE_DRAFT*.md` |
| Season 114 | 6 | `season-114.md` | `FINAL_ARC_SEASON114_PROSE_DRAFT*.md` |
| **Total** | **755** | | |

## Checking your work

From the repository root:

```
npm run prepare:data     # rebuilds the chapters; fails loudly on a bad key
npm test                 # full test suite
```

`prepare:data` prints how many lines carry a speaker. That number should rise as
lines are resolved. Re-running the generator for this folder will refresh the
worklist so resolved lines drop out of it.
