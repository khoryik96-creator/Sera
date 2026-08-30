# The Quiet Regular — Handover Notes

Generated for continuity into a new ChatGPT/Codex conversation.

## Start here in the next chat

Before proposing, coding, opening a PR, or repeating a prior phase:

1. Read `docs/ROADMAP.md` completely.
2. Read this `docs/HANDOVER.md` completely.
3. Inspect the current `main` branch and recent merged PRs after the baseline listed below.
4. Treat GitHub as newer than conversational memory if they disagree.
5. Do not restart a phase that `docs/ROADMAP.md` marks `DONE`.

Suggested first instruction in a new chat:

> Read `docs/ROADMAP.md` and `docs/HANDOVER.md` in `khoryik96-creator/Sera`, inspect current `main` and the latest successful Pages deployment, then continue only with genuinely unfinished/new work. Do not repeat completed roadmap phases.

---

## Repository

- GitHub: `khoryik96-creator/Sera`
- Live reader: `https://khoryik96-creator.github.io/Sera/`
- Default branch: `main`
- App: React 19 + TypeScript + Vite
- Story size: 64 seasons / 633 episodes / 13 story arcs
- Primary runtime entry: `index.html`
- Historical-link compatibility alias: `react-preview.html`
- The pre-React `legacy.html` reader has been retired (removed in PR #86); React is the sole reader.

## Latest audited feature baseline

Latest feature release audited when this handover was written:

- **PR #56 — Phase 11: Reading Journey and history v2**
- merge commit: `c2f0a088f3f563aa5e3b6e15f8121aafe8369e6c`
- GitHub Pages workflow run: `33194144096`
- workflow status: **completed / success**

The production deployment independently re-ran quality, build, performance, single-file compatibility, Pixel/mobile + desktop browser regressions, artifact upload, and the actual Pages deployment successfully.

Documentation-only continuity commits may follow that runtime feature release. Recheck `main` for anything merged after PR #56 before starting new work.

---

## Important: the original roadmap and approved post-roadmap phases are complete

Do **not** repeat these:

- React production migration
- mobile reader / navigation cleanup
- rank-state pills
- arc-based episode browser
- typography / width reader controls
- PWA controlled updates
- Overview dashboard / visual cohesion
- Reader UX v3 + persistent reading progress
- Characters v2
- Search v2
- route-splitting performance pass
- production cleanup
- final Pixel/mobile visual audit

The repository also progressed beyond that original roadmap. These are already production features too:

- Reader Library history + portable backups
- contextual character/lore links inside chapters
- private episode notes
- saved passages
- historical Qin/Han rank-state correction
- Reading Insights
- Reader UX v4 exact chapter position + Focus Mode
- in-chapter current-season episode switcher
- Reader Library v4 collections, tags, favorites, and unified organization
- Reading Journey / History v2 with rereads, sessions, filters, milestones, and richer Insights activity

See `docs/ROADMAP.md` for PR numbers and status.

---

## Current reader/product behavior

### Reader

The focused chapter reader supports:

- lazy season loading
- persistent opened-episode progress
- story / arc / season completion
- Next Unread
- Back to Season
- Previous / Next episode navigation
- in-chapter switcher across the already-loaded current season
- current/opened episode state inside that switcher
- persisted font size
- persisted font family
- persisted line spacing
- persisted reading width
- exact per-chapter reading position / resume position (Reader UX v4)
- Focus Mode (Reader UX v4)
- contextual lore links for known character names/dialogue speakers
- private per-episode notes
- save selected prose passages
- bookmark state
- Reading Journey visit recording, including rereads/revisits
- season-completion milestone recording when a season transitions to complete

The episode switcher remains usable in Focus Mode and is intentionally compact rather than a full-screen picker.

### Reader Library

The historical `#bookmarks` route is the Reader Library.

It includes:

- Saved
- Journey
- Notes
- Passages
- Organize
- Backup

Reader Library v4 organization is already implemented and device-local. It supports:

- custom named collections spanning bookmarks, notes, and saved passages
- Favorites as a built-in filter
- normalized, bounded, de-duplicated free-form tags
- unified search/filtering across organized items
- assign/remove collection membership
- favorite/unfavorite
- tag editing
- collection rename/delete
- direct return to the underlying chapter
- responsive contained mobile layout

Organization persists in validated local state under `tqr:readerOrganization:v1` and does **not** add accounts, backend sync, or analytics.

Reading Journey / History v2 is also device-local. It uses a separate `tqr:readingJourney:v2` state while preserving `tqr:readingHistory:v1` for compatibility. It supports:

- up to **500 visit events** rather than only one latest timestamp per episode
- repeated visits/rereads
- short-window duplicate-mount suppression
- automatic migration from legacy Recent Reading history when no Journey v2 state exists
- reading sessions reconstructed using a **30-minute inactivity gap**
- recent-session resume cards
- search by title / arc / season / episode notation
- date filters
- season filters
- direct chapter return from timeline/session/milestone rows
- revisit and unique-episode counts
- busiest-season / busiest-arc summaries
- season-completion milestones recorded from Journey v2 onward

Backups are validated and can include supported local reader state such as bookmarks, Continue Reading, opened-episode progress, legacy recent history, Reading Journey visits and completion milestones, notes, passages, reader preferences, exact chapter positions, and Reader Library organization. Older v1 backups without Journey or organization remain compatible. Journey can be derived from legacy history during import, while malformed, phantom, duplicate-completion, dangling organization, or oversized Journey payloads are rejected.

Deleting an underlying bookmark, note, or saved passage also cleans its organization metadata so invisible stale collection/tag/favorite records do not accumulate.

### Reading Insights

`#insights` is device-local. It does not add server analytics or an account.

It includes:

- story completion
- completed seasons
- current/furthest reading position
- reading streak / active days
- recent activity views
- all 13 arc progress states
- in-progress seasons
- Reader Library footprint
- Reading Journey visit-based activity when Journey data exists
- reconstructed reading-session count
- reread/revisit count
- busiest-season context
- season-completion milestone count

Because Journey preserves repeat visits, rereads count as real activity instead of being overwritten by the older Recent Reading list.

### Characters v2

Already implemented. Profiles derive from existing canon/state sources and include:

- rank journey
- relationships
- linked legends
- season footprint
- lazy exact-episode appearance scanning
- direct episode links
- long-profile section navigation

Do not rebuild this page from the old Characters implementation.

### Search v2

Already implemented as a grouped command palette with lazy episode indexing, keyboard navigation and mobile-friendly routing.

Do not replace it with the old flat search result implementation.

---

## Architecture landmarks

Primary React structure:

```text
src/react/
  main.tsx
  app/
  components/
  features/
    overview/
    characters/
    villains/
    techniques/
    chapters/
    reader/
    bookmarks/
    insights/
    rankings/
    legends/
    former/
    timeline/
    canon/
    search/
  routes/
  shared/
  styles/
```

Important shared/runtime files:

```text
src/data.json                 canonical lore authoring data (pretty-printed; object rows; build-validated)
src/db.ts                     core loader / identity bridge (rows stored in runtime shape)
src/characterRegistry.ts      canonical identity/alias/rank + colour keys (single source of truth)
src/react/shared/skillTier.ts power-tier label derivation (Characters + search)
src/seasonStore.ts            lazy season loading/cache
src/readingProgress.ts        opened-episode progress calculations
src/readingInsights.ts        device-local Insights + Journey session/summary calculations
src/readerLibrary.ts          legacy history + backup model
src/readerJourney.ts          Reading Journey v2 visit/milestone state
src/readerOrganization.ts     collections / favorites / tags state
src/readerNotes.ts            private episode notes
src/readerPassages.ts         saved passage state
src/bookmarks.ts              bookmark + Continue Reading state
src/novel.ts                  focused prose/rank/dialogue/context renderer
src/pwa.ts                    service-worker/update integration
src/types.ts                  runtime data types
src/images.ts                 portrait discovery
```

### Data model & authoring

- `src/data.json` is the single source of truth for all core lore. It is
  **pretty-printed** (line-scoped diffs) and edited by hand and by the ChatGPT
  story workflow. `topSkills`, `ranks` and `seasonCast` rows are **named
  objects**, not positional arrays.
- `npm run prepare:data` (`scripts/prepare-data.mjs`) splits it into
  `src/generated/` (core + 64 season payloads + search index) and **validates
  it at build time** — a missing character name/subtitle, a malformed skill/rank/
  cast row, or a row left as a positional array fails the build with a precise
  message.
- `test/character-consistency.test.ts` enforces the character render contract:
  every profiled character needs a `.character-<key>` colour class and a
  registry entry; the colour-key legend and portraits must map to real
  characters. Adding a character without its wiring fails CI.

### How to add a character (technical checklist)

1. Add the profile object to `characters` in `src/data.json` (name + subtitle
   are required; other prose fields are optional and render as "Not recorded.").
2. Add a `characterRegistry.ts` entry (`key`, `displayName`, `colorKey`,
   `aliases`, `speakerKeys`) if the character speaks or needs alias colouring.
3. Add a `--char-<colorKey>` variable and a `.character-<key>` class in
   `src/react/styles/global.css` (the consistency test enforces both).
4. Drop `src/assets/<key>.jpg` for the portrait — `images.ts` auto-discovers it
   (gallery images: `<key>-extra-<n>.jpg`). No portrait ⇒ initial-letter
   placeholder.
5. Signature-art rosters (`topSkills`) are authored by the ChatGPT story
   workflow, not here — see the story-ownership boundary in `CLAUDE.md`.

Reader Library / Journey UI is primarily in:

```text
src/react/features/bookmarks/BookmarksPage.tsx
src/react/features/bookmarks/ReadingJourneyPanel.tsx
src/react/features/reader/ReaderContext.tsx
src/react/styles/library.css
src/react/styles/reading-journey.css
```

Build/data tooling:

```text
scripts/prepare-data.mjs
scripts/check-performance-budget.mjs
scripts/validate-assets.mjs
```

`prepare-data.mjs` generates core lore, 64 independently loadable season payloads and lazy search assets.

---

## Canon / data guardrails for engineering work

- `src/data.json` is the lore source of truth.
- Do not create a second manually maintained character/legend/ranking database for UI convenience.
- Rhen is explicitly `UNRANKED` and must not receive a numeric world rank.
- Current / former / retired / deceased rank states use the shared rank-state model.
- Qin Luo historical behavior: active #6 through Season 22; retired Former #6 from Season 23 onward.
- Han Myeong historical behavior: active #8 through Season 22; deceased Former #8 from Season 23 onward.
- Existing legacy hash aliases must keep working.
- Direct chapter route: `#chapter/<season>/<episode>`.
- Historical episode deep-link alias: `#episodes/<season>/<episode>`.

For story/canon writing specifics, inspect the canonical data rather than inferring from UI text.

---

## Portrait/image constraint

Architecture/UI work must **not** alter portrait files unless the user explicitly requests portrait/image work.

Do not automatically:

- resize portraits
- compress them
- convert them to WebP/AVIF
- recolor them
- crop them
- replace them
- generate thumbnails from them

Portrait discovery is already handled by `src/images.ts` / asset naming conventions. Keep portrait work isolated from reader refactors.

---

## Mobile constraint

The user reads heavily on mobile. Existing regression work intentionally protects:

- no page-level horizontal overflow
- contained mobile tab strip
- contained character browser
- contained arc/season browsers
- contained Reader Library organization controls
- contained Reading Journey filters, sessions, milestones, and timeline
- reader controls remain in normal document flow
- mobile chrome can move away while reading
- active navigation remains visible
- long character profiles remain navigable
- in-chapter episode switcher remains compact and contained

Do not reintroduce a fixed bottom navigator or a screen-covering season/episode picker.

---

## Performance constraint

Production already uses route-level lazy boundaries and performance budgets.

Current documented budget model includes:

- initial JS ceiling
- initial CSS ceiling
- core JSON ceiling
- required lazy route chunks for production features

Before attempting another optimization pass:

1. run the existing budget/build
2. measure an actual regression
3. optimize the measured problem

Do not repeat the original route-splitting project merely because performance is mentioned.

Portrait optimization remains excluded unless explicitly approved.

---

## Testing / release expectations

Normal local/repo commands include:

```bash
npm install
npm run typecheck
npm run lint
npm run test
npm run validate:assets
npm run quality
npm run build
npm run budget:perf
npm run build:single
npm run test:e2e
```

The permanent Pages pipeline blocks publication on failed quality/build/performance/browser checks.

Expected production verification includes:

- unit/canon/data integrity
- TypeScript + ESLint
- production dependency audit
- normal Vite build
- performance budget
- self-contained single-file build
- Pixel/mobile browser regressions
- desktop browser regressions
- accessibility checks
- PWA/service-worker behavior
- legacy/compatibility reader checks
- visual diagnostics

Reader Library v4 has unit/browser coverage for collection creation, assignment, favorites, tags, filtering, persistence/reload, collection rename/delete, cleanup, backup validation/compatibility, and mobile overflow containment.

Reading Journey / History v2 has unit/browser coverage for repeat visits, duplicate-mount suppression, session reconstruction, Journey summaries, migration from legacy history, Journey filters, recent-session resume, season-completion milestones, backup validation/bounds, Reading Insights integration, and mobile/desktop overflow containment.

Never claim a release is live until the `main` Pages deployment itself is successful.

---

## PRs / branches to ignore

- **PR #47** — documentation work superseded by PR #50.
- **PR #51** — accidental stale Characters branch marker; explicitly closed, never merge it.
- Any stale `feature/characters-v2` branch based on old main is not a valid work base. Characters v2 is already live through PR #37.

Always branch from current `main` after checking its SHA.

---

## Current roadmap state

There is **no pre-authorized major phase after Reading Journey / History v2 / PR #56** in the canonical roadmap.

The next chat should not invent or repeat a large phase automatically. In particular, do not rebuild Reading Journey / History v2, Reader Library organization, the in-chapter switcher, Reader UX v4, Reading Insights, Search v2, Characters v2, or the original architecture/performance phases.

Possible future ideas are listed in `docs/ROADMAP.md`, but they are deliberately marked as candidates rather than approved work. Cross-device sync would require a deliberate backend/account decision rather than being silently added to the current private local model.

---

## Recommended new-chat workflow

1. Open repo `khoryik96-creator/Sera`.
2. Read `docs/ROADMAP.md`.
3. Read `docs/HANDOVER.md`.
4. Fetch current `main` SHA.
5. List recent merged PRs newer than #56.
6. Verify the latest Pages run for current `main`.
7. Only then plan genuinely new work from the user's newest instruction.
8. Create a fresh branch from current `main`.
9. Preserve portraits/canon unless explicitly part of the request.
10. Run full CI before merge and follow Pages through deployment.
