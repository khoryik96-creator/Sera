# The Quiet Regular — Canonical Product Roadmap

This file is the source of truth for product-development status on the Sera / The Quiet Regular reader.

## Rules for future chats and agents

1. **Read this file before proposing or implementing the next phase.**
2. Do **not** repeat a phase marked `DONE` unless a regression or explicit new requirement reopens it.
3. Before starting work, inspect current `main`, recent merged PRs, and the latest successful Pages deployment. Do not assume the chat history is newer than GitHub.
4. A phase becomes `DONE` only after it is merged to `main`, the permanent quality/build/browser pipeline passes, and GitHub Pages deploys successfully.
5. Keep `legacy.html` as the tested pre-React rollback path unless explicitly instructed otherwise.
6. Keep `react-preview.html` only as the tested historical-link compatibility alias unless explicitly instructed otherwise.
7. Do not change portrait/image assets during architecture/UI work unless the user explicitly asks for portrait changes.
8. Do not rewrite story/canon prose as part of reader architecture or UI work.
9. Reuse canonical sources (`src/data.json`, generated season/search data, registry/rank helpers, Reader Library state) instead of creating duplicate lore/state stores.
10. When this roadmap reaches the end, **do not invent another major refactor automatically**. Present concrete options and wait for user direction.

## Current production baseline

Latest feature release at the time this roadmap was audited:

- **PR #56 — Phase 11: Reading Journey and history v2**
- feature merge commit: `c2f0a088f3f563aa5e3b6e15f8121aafe8369e6c`
- Pages run: `33194144096`
- deployment result: **success**

Documentation-only commits may exist after that SHA. The runtime baseline above is the feature state to preserve.

---

# Original reader roadmap — COMPLETE

## Phase 1 — React production migration — DONE

Production moved from the legacy DOM reader to React 19 + TypeScript + Vite while preserving a tested rollback reader.

Delivered across the React migration / cutover PRs before the roadmap below:

- desktop sidebar + mobile section tabs
- hash routing + old-link aliases
- lazy season data
- bookmarks / Continue Reading
- PWA + controlled service-worker updates
- legacy fallback
- mobile-safe reading layout

## Phase 2 — Mobile reader polish + rank-state system — DONE

Delivered before/through PR #34:

- 13-arc / 64-season browser
- contained mobile navigation
- font size / family / spacing / reading-width controls
- active mobile tab auto-visibility
- current / `FORMER` / `RET` / deceased `†` / `UNRANKED` badge states
- PWA update prompt

## Phase 3 — Visual cohesion + Overview dashboard — DONE

**PR #35 — Visual polish + reader dashboard redesign**

Delivered:

- reader-first Overview dashboard
- Continue Reading / current arc / bookmark summary
- protagonist cards
- Top Ten overview
- archive shortcuts
- shared visual polish across production sections

## Phase 4 — Reader UX v3 + persistent story progress — DONE

**PR #36 — Reader UX v3 + persistent story progress**

Delivered:

- opened-episode progress
- per-season / per-arc / whole-story progress
- completed-season count
- read/unread episode states
- Next Unread
- Back to Season
- stronger Previous / Next episode controls
- Arc / Season / Episode reader metadata

## Phase 5 — Characters v2 — DONE

**PR #37 — Characters v2: rank history, relationships, legends, episode links**

Delivered:

- richer profile hierarchy and summary stats
- canonical seasonal rank journey
- relationship links derived from existing profile data
- linked legends
- season footprint from `seasonCast`
- lazy exact-appearance scan
- direct character-to-reader episode links
- dedicated Pixel/mobile + desktop regression coverage

**Do not rebuild Characters v2.**

## Phase 6 — Search v2 — DONE

**PR #38 — Search v2 command palette**

Delivered:

- grouped command-palette results
- Characters / Rankings / Techniques / Seasons / Episodes / Legends / Canon
- lazy episode search index
- keyboard navigation
- mobile-friendly result navigation
- direct episode/season routing

**Do not rebuild Search v2.**

## Phase 7 — Performance pass — DONE

**PR #39 — Performance pass: lazy feature routes**

Delivered:

- lazy React route boundaries
- direct chapter visits avoid eagerly executing inactive feature pages
- lazy Search v2 loading
- production performance budget based on actual chunk output

Further hardening continued in PR #48.

**Do not repeat the original performance pass unless a measured regression exists.**

## Phase 8 — Production cleanup — DONE

**PR #40 — Production cleanup after React migration**

Delivered:

- production architecture documentation
- migration terminology cleanup
- compatibility entry clarification
- preserved `legacy.html`

## Phase 9 — Final Pixel/mobile visual audit — DONE

**PR #41 — Final mobile visual audit polish**

Delivered:

- structured lazy-route loading state
- sticky Character profile section navigator
- resolved-screen visual diagnostics
- mobile long-profile / overflow guards

The original roadmap is complete at this point.

---

# Post-roadmap product work — ALSO COMPLETE

These features were added after the original roadmap. Future chats must treat them as existing production behavior, not new ideas.

## Reader Library v2 — DONE

**PR #42 — Reader Library v2: history and portable backups**

- Saved / Recently Read / Backup
- bounded recent-reading history
- portable validated reader-state backup/import
- progress + Continue Reading restoration

## Contextual lore inside chapters — DONE

**PR #43 — Contextual lore links inside the chapter reader**

- known character/dialogue references become interactive in the focused reader
- compact in-flow lore tray
- seasonal rank context
- profile routing while preserving chapter navigation

## Private episode notes — DONE

**PR #44 — Private episode notes in Reader Library**

- device-local notes per episode
- searchable Notes library tab
- notes included in validated portable backups

## Historical Qin / Han rank-state fix — DONE

**PR #45 — Fix historical Qin and Han rank states**

- Qin Luo active #6 through Season 22, retired Former #6 from Season 23
- Han Myeong active #8 through Season 22, deceased Former #8 from Season 23

## Saved passages — DONE

**PR #46 — Reader Library v3: saved passages**

- save selected rendered prose
- searchable Passages library tab
- direct chapter links
- backup/import support

## Route-boundary cleanup — DONE

**PR #48 — Finalize production route boundaries and cleanup**

- explicit lazy route entry for every production section
- performance budget expanded across all guarded route chunks
- compatibility terminology cleanup

## Reading Insights — DONE

**PR #49 — Reading Insights: private progress analytics**

- device-local `#insights` dashboard
- story / season / arc completion
- streak + active days
- recent activity views
- furthest opened episode
- in-progress seasons
- Reader Library footprint
- no backend or analytics beacon

## Current architecture documentation — DONE

**PR #50 — Document current Reader Library and Insights architecture**

Documentation-only current-state consolidation after the Library / Insights work.

## Reader UX v4 — DONE

**PR #52 — Reader UX v4: exact chapter resume + focus mode**

Delivered:

- exact per-chapter 0–100% reading location
- validated local resume position
- live in-chapter progress
- chapter positions included in portable Reader Library backups
- backward compatibility with older backups
- distraction-free Focus Mode
- persisted Focus Mode state
- Escape exits Focus Mode immediately
- Pixel/mobile + desktop coverage for resume/focus behavior

## In-chapter season episode switcher — DONE

**PR #53 — Reader episode switcher inside focused chapters**

Delivered:

- compact in-flow switcher for the already-loaded current season
- current episode and opened/read state
- direct episode-to-episode jumps without returning to the archive
- remains usable in Focus Mode
- single-column mobile and two-column desktop layout
- Pixel/mobile + desktop regression coverage

## Phase 10 — Reader Library v4 organization — DONE

**PR #54 — Reader Library v4: collections, tags, and favorites**

Delivered:

- custom collections across bookmarks, private notes, and saved passages
- Favorites as a built-in Reader Library filter
- normalized, bounded, de-duplicated free-form tags
- unified **Organize** tab with search, filtering, rename/delete, direct chapter return, and per-item controls
- device-local `tqr:readerOrganization:v1` state; no backend/account introduced
- organization included in validated Reader Library export/import
- backward compatibility with older v1 backups that have no organization field
- cleanup of organization metadata when its underlying bookmark/note/passage is deleted
- malformed and dangling collection references rejected during backup validation
- Pixel/mobile + desktop browser coverage for create/assign/favorite/tag/filter/reload/rename/delete/overflow

**Do not rebuild Reader Library organization.**

## Phase 11 — Reading Journey / History v2 — DONE

**PR #56 — Phase 11: Reading Journey and history v2**

Delivered:

- separate device-local `tqr:readingJourney:v2` timeline while preserving `tqr:readingHistory:v1` for compatibility
- bounded history of up to **500 visit events**, including rereads/revisits rather than overwriting earlier timestamps
- short-window duplicate-mount suppression so React/browser remounts do not create fake rereads
- automatic migration from existing Recent Reading history when no v2 Journey state exists
- reading sessions reconstructed with a **30-minute inactivity gap**
- recent-session resume cards that return directly to the last chapter in that session
- Reader Library **Journey** tab with search, date filtering, season filtering, visit timeline, direct chapter return, unique/revisit counts, busiest season/arc, and session summaries
- season-completion milestones recorded from this version onward when a season transitions from incomplete to complete
- Reading Insights uses Journey visits when available so rereads count as real reading activity
- Reading Insights adds session count, revisit count, busiest-season context, and completion-milestone summary
- Journey data included in validated Reader Library backup/export/import
- older v1 backups with no Journey field remain compatible by deriving Journey visits from legacy history
- malformed, phantom, duplicate-completion, and oversized Journey imports are rejected; imported Journey state remains bounded to 500 visits / 64 completion milestones
- dedicated unit coverage plus Pixel/mobile + desktop browser coverage for migration, repeat visits, sessions, filters, session resume, milestones, backup validation, and overflow containment
- no backend/account/sync layer, analytics beacon, story/canon changes, ranking changes, or portrait changes

**Do not rebuild Reading Journey / History v2.**

---

# Closed / stale work that must NOT be revived

- **PR #47** — superseded documentation PR; replaced by PR #50.
- **PR #51** — accidental stale draft against an old Characters branch; explicitly closed and must not be merged or used as a development base.
- Any stale `feature/characters-v2` branch created from pre-current `main` must be ignored. Characters v2 is already production via PR #37.

---

# Current next step

## No pre-authorized major phase after Reading Journey / History v2

The previously agreed roadmap and subsequently approved Reader Library organization and Reading Journey phases have been fully delivered.

A new chat should **not** automatically restart Characters v2, Search v2, the original performance pass, production cleanup, Reader Library history/backups, Reading Insights, Reader UX v4, the in-chapter episode switcher, Reader Library v4 organization, or Reading Journey / History v2.

Before implementing anything new:

1. read `docs/ROADMAP.md`
2. read `docs/HANDOVER.md`
3. inspect current `main`
4. inspect the most recent merged PRs after #56, if any
5. compare the live site with current code
6. then ask / infer from the user's newest instruction what genuinely new feature or fix is wanted

## Candidate future directions — NOT STARTED / NOT COMMITTED

These are only options, not approved roadmap phases:

- cross-device sync (would require a deliberate backend/account decision)
- targeted accessibility/manual QA improvements discovered by real testing
- measured performance regressions if future bundles grow beyond current budgets
- new lore/content features requested by the user
- story/canon work requested by the user

Do not select one automatically solely because it appears here.
