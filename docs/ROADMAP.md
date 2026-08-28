# The Quiet Regular — Product Roadmap

This file is the source of truth for product work on the Sera / The Quiet Regular reader.

## Working rules

- Do **not** repeat a completed phase unless a regression or new requirement explicitly reopens it.
- Update this file whenever a roadmap phase changes state.
- A phase is only `DONE` after it is merged to `main`, the normal production CI passes, and GitHub Pages deploys successfully.
- Keep `legacy.html` as the tested rollback reader unless a future roadmap item explicitly removes it.
- Do not change portrait/image assets unless explicitly requested.
- Do not rewrite canon/story prose as part of UI/architecture work.
- Reuse canonical data sources (`src/data.json`, generated season data, character registry, rank state helpers) instead of inventing parallel lore data.

## Completed phases

### 1. React production migration — DONE
- React production shell replaces the legacy root reader.
- Desktop sidebar, mobile tabs, routing, search, bookmarks, reader context, PWA and legacy fallback are in production.
- Legacy hashes remain supported.

### 2. Rank-state + mobile navigation cleanup — DONE
- Active, `FORMER`, `RET`, deceased `†`, and `UNRANKED` states are standardized.
- Mobile navigation no longer blocks the reading surface.
- Active mobile tabs keep themselves visible.

### 3. Arc archive + reader preferences + PWA update flow — DONE
- 13 arcs / 64 seasons archive.
- Font size, font family, spacing, and reading-width controls persist per device.
- Controlled PWA update prompt.
- Mobile reading chrome moves away while reading.

### 4. Lucy-style visual cohesion + Overview dashboard — DONE
- Overview redesigned as a reader dashboard.
- Continue Reading, protagonist shortcuts, Top Ten, archive shortcuts and consistent visual hierarchy are live.
- Shared spacing/border/interaction polish applied across the app.

### 5. Reader UX v3 + persistent story progress — DONE
- Opened-episode progress persisted locally.
- Per-season, per-arc, completed-season and full-story progress.
- Read/unread episode state.
- `Next Unread`, `Back to Season`, stronger Previous/Next navigation.
- Reader Arc / Season / Episode metadata and progress bars.
- Production deployment: PR #36 / merge commit `37e825c60b1a77da54e582080a0c3f816dea7ae2`.

## Remaining roadmap

### 6. Characters v2 — IN PROGRESS
Goal: turn Characters into proper lore profiles without adding a second lore source.

Planned scope:
- stronger profile hierarchy and quick facts
- rank/current-status and rank-history presentation
- relationships/connections with links to known character profiles where data supports it
- major feats / legends derived from existing character + legend data
- story appearances derived from existing season/cast metadata
- direct links from character profiles to relevant story locations where reliable metadata exists
- mobile and desktop character-page visual QA
- portrait files remain untouched

Working branch: `feature/characters-v2`

### 7. Search v2 — NEXT
Goal: replace the flat global result list with a command-palette-style repository search.

Planned scope:
- grouped results: Characters, Episodes, Seasons/Arcs, Techniques, Rankings, Legends, Canon
- keyboard navigation on desktop
- touch-friendly result navigation on mobile
- direct episode/season routing
- preserve rank-state pills in character/ranking results
- test no-result, large-result and mobile overflow states

### 8. Performance pass — QUEUED
Goal: reduce what a phone must load before reading a chapter without touching portrait compression/formatting.

Planned scope:
- measure production bundle/chunk sizes and initial requests
- lazy-load non-reader feature pages where useful
- reduce initial core data/code work where safe
- verify season lazy loading and service-worker caching
- audit runtime rendering and route transitions
- establish bundle-size regression checks where practical
- **exclude portrait/image conversion, resizing, compression or replacement unless explicitly approved**

### 9. Final repository cleanup + production QA — QUEUED
Goal: finish the migration era cleanly and lock the app into a maintainable state.

Planned scope:
- remove/rename remaining `react-preview` migration terminology where no longer needed
- consolidate clearly duplicated CSS/components only when low-risk
- remove obsolete migration comments/docs while keeping useful history
- final accessibility audit
- final Pixel/mobile + desktop visual audit of every production section
- README architecture update
- verify `legacy.html` rollback still works
- final production deployment verification

## After the roadmap

Do not invent another major refactor automatically. Once Phase 9 is `DONE`, stop and propose only concrete, user-requested product improvements or regressions discovered by testing.
