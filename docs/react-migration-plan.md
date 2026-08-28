# React Migration Plan

The Quiet Regular will migrate its presentation layer toward the feature-based React architecture proven in the Despicable-Heretic reader while preserving the existing lore data, portraits, generated season payloads, bookmarks, canon rules, and current production reader until parity is reached.

## Phase 1 — Parallel preview
- React app shell with desktop sidebar and mobile horizontal tabs.
- Shared hash routing and global search.
- Reader context for progress, bookmarks, text scale, and line spacing.
- React Characters, Chapters/Reader, Rankings, and Bookmarks pages first.
- Reuse current generated core/season data and portrait asset discovery.

## Phase 2 — Parity
- Migrate remaining tabs: Other Characters/Villains, Rhen's Arts, Legends, Former Rank Holders, Sera Timeline, Canon.
- Preserve rank history, dialogue colours, technique tiers, portrait galleries, deep links, and offline behaviour.
- Add browser regression coverage for mobile and desktop preview surfaces.

## Phase 3 — Cutover
- Only after parity and screenshot/mobile validation, switch GitHub Pages to the React shell.
- Keep the existing reader available as a fallback until the first stable React release is verified.

## Rules
- Do not rewrite or duplicate canon prose.
- Do not alter portrait assets as part of the React migration.
- Keep episode data lazy-loaded per season.
- Mobile reading experience is a first-class target.
