# Highlighted Lore Audit — 2026-09-03

Scope: every entry in `characterRegistry` that is actually used in episode prose. The audit resolves the same quick-card fields used by the reader: Strength, Affiliation, Role, and Summary.

## Totals

- Registry highlighted characters: 87
- Used in prose: 87
- Complete: 52
- Incomplete: 35
- Used in prose with no rich source in `characters`, `arcFigures`, `former`, or `seasonCast`: 12

## Severe gaps — no rich metadata source

These characters are actually used in prose but currently have no rich source record. Affiliation may still be inferred from surname for Isgard figures, but Strength / Role / Summary remain missing.

- Ren Qiao — used S13 — missing Strength, Affiliation, Role, Summary
- Jae Miri — used S23 — missing Strength, Affiliation, Role, Summary
- Mareth Duskvein — used S80–S83 — missing Strength, Role, Summary
- Garran Duskvein — used S77, S80–S82 — missing Strength, Role, Summary
- Eira Eirholt — used S80, S83, S86–S87, S93–S94 — missing Strength, Role, Summary
- Tor Veyrhald — used S80, S83–S86, S91, S93–S94 — missing Strength, Role, Summary
- Brynja Kharvorn — used S90, S93 — missing Strength, Role, Summary
- Oskar Solvane — used S90, S93 — missing Strength, Role, Summary
- Astrid Vardrenn — used S91 — missing Strength, Role, Summary
- Jorek Norrvek — used S92 — missing Strength, Role, Summary
- Freya Ysmark — used S90 — missing Strength, Role, Summary
- Kellan Haldren — used S90 — missing Strength, Role, Summary

## Partial gaps

- Luo Wen — missing Affiliation only
- Jian Ruo — missing Strength only
- Mo Qian — missing Strength only
- Yeon Hwa — missing Strength only
- Ji Wuye — missing Strength only
- Cao Tian — missing Strength only
- Ye Mo — missing Strength only
- Lin Yao — missing Strength only
- Yan Shou — missing Strength only
- Mei Zhen — missing Strength only
- Yun Ke — missing Strength only
- Gao Ren — missing Strength only
- Shu Fen — missing Strength only
- Bao Tien — missing Strength only
- Yun Shiyue — missing Strength only
- Chun Baek — missing Strength only
- Gwon Myeong — missing Strength only
- Dae Mun — missing Strength only
- Baek Cheon — missing Strength only
- Gong Seok — missing Strength only
- Mi Suyun — missing Strength only
- Zhao Renkai — missing Strength only
- Draven Sol — missing Strength only

## Notes

- Varok Skeldran is no longer in the incomplete set after PR #125.
- Raska Dravaryn, Aldric Veyrhald, Maedra Dravaryn, Sigrun Veyrhald, Halvek Veyrhald, Solveig Skeldran and Eldran Dravaryn also resolve without missing quick-card fields.
- `Not ranked` is not treated as a missing field for Isgard figures because the registry explicitly defines those northern factions as outside Wuyue's numeric world ranking.
- Several recent Isgard gaps are recoverable from story outlines rather than requiring invented canon. For example, the `WHEN_WUYUE_MARCHES_NORTH_OUTLINE.md` commander table explicitly gives cultivation tiers for Brynja Kharvorn, Oskar Solvane, Astrid Vardrenn, Jorek Norrvek, Freya Ysmark and Kellan Haldren.
