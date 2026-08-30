# The Quiet Regular — Lore Repository

## 📖 Read it online

**➡️ [https://khoryik96-creator.github.io/Sera/](https://khoryik96-creator.github.io/Sera/)**

Interactive browser for *The Quiet Regular* lore: characters, martial arts,
rankings, legends, chronology and all 74 seasons / 733 story chapters.

The primary reader is a **React 19 + TypeScript + Vite** application with
mobile-first navigation, route-level code splitting, lazy season/search data,
persistent reading progress and preferences, Reader Library tools, contextual
lore links, private Reading Insights, PWA/offline support, and an optional
self-contained single-file build.

The pre-React reader remains at **`legacy.html`** as a tested rollback path.
`react-preview.html` is retained only as a tested compatibility alias for
historical links; the normal root `index.html` is the production reader.

## Architecture

```text
index.html                       production React shell
legacy.html                      pre-React rollback reader
react-preview.html               historical-link compatibility alias
src/
  react/
    main.tsx                     React bootstrap + PWA initialization
    app/
      App.tsx                    root routing/application shell
      navigation.ts              repository section definitions
    components/
      Shared.tsx                 shared presentation + RankBadge
    features/
      overview/                  reader dashboard
      characters/                Characters v2 profiles + portrait galleries
      villains/                  Other Characters / Villains archive
      techniques/                Rhen + Sera arts
      chapters/                  arc/season/episode browser
      reader/                    focused reader + progress/preferences/context
      bookmarks/                 Reader Library
      insights/                  private Reading Insights dashboard
      rankings/                  current ranking board
      legends/                   legends archive
      former/                    former rank holders
      timeline/                  Sera chronology
      canon/                     canon rules
      search/                    Search v2 command palette
    routes/                      lazy entry point for every production section
    shared/
      rankState.ts               canonical rank-state parsing/semantics
      characterInsights.ts       derived character links/appearances
    styles/                      shell + feature-owned responsive styles
  db.ts                          core lore loader / normalization
  data.json                      canonical lore database
  seasonStore.ts                 independently loaded season cache
  readingProgress.ts             device-local story progress model
  readingInsights.ts             device-local progress/activity calculations
  readerLibrary.ts               history + portable reader backup model
  readerNotes.ts                 private per-episode notes
  readerPassages.ts              saved prose passages
  generated/                     generated core/season/search payloads
  images.ts                      automatic portrait discovery
  bookmarks.ts                   bookmarks + Continue Reading persistence
  novel.ts                       dialogue/technique/rank/context prose renderer
  pwa.ts                         offline/update/service-worker setup
  types.ts                       canonical runtime types
  assets/                        portrait assets
  main.ts + legacy renderers     retained only for legacy.html rollback
scripts/
  prepare-data.mjs               core + 74 season + search-index generation
  check-performance-budget.mjs   production bundle/data/route budget guard
  validate-assets.mjs            portrait naming/dimension validation
e2e/
  production-reader.spec.ts      production/mobile/PWA regressions
  performance.spec.ts            lazy-route and initial-load regressions
  characters-v2.spec.ts          character profile regressions
  search-v2.spec.ts              command-palette/search regressions
  reader-progress.spec.ts        reading-progress regressions
  reading-insights.spec.ts       private analytics regressions
  reader.spec.ts                 reader/legacy compatibility regressions
test/                            unit + canon/data integrity tests
public/
  manifest.webmanifest           install metadata
  sw.js                          offline/cache/update worker
```

## Episode archive and Reader UX v3

The production reader does not render all 733 chapters on startup. Core lore is
loaded first and each season is an independently loadable payload through
`seasonStore.ts`.

The archive is organized as **14 story arcs / 74 seasons**. Opening a chapter
records device-local reading progress. The same progress model drives Home,
Reading Insights, the archive and focused reader, including:

- story, arc and season completion percentages
- completed-season count
- read/unread episode states
- **Next Unread** navigation
- **Back to Season**
- persistent last-read / Continue Reading position
- Arc / Season / Episode chapter metadata
- previous / next episode navigation in normal document flow

Reader presentation controls include persistent A− / A+ sizing, Serif / Book /
Sans fonts, Compact / Comfort / Relaxed line spacing, and Narrow / Standard /
Wide reading columns. Mobile navigation chrome moves out of the way while
reading and returns on upward scrolling.

## Reader Library

The historical `#bookmarks` route is preserved, but the screen is now the
**Reader Library**. All reader state is device-local unless the reader explicitly
exports a backup.

Library tabs include:

- **Saved** — bookmarked episodes
- **Recently Read** — a deduplicated local history of the latest 50 opened episodes
- **Notes** — searchable private notes attached to individual episodes
- **Passages** — selected prose saved directly from the focused reader
- **Backup** — portable JSON export/import for supported reader state

The portable backup includes bookmarks, Continue Reading, opened-episode
progress, recent history, notes, saved passages and reader typography settings.
Import validates real season/episode IDs and remains backward compatible with
older Reader Library backups that did not yet contain notes or passages.

## Reading Insights

`#insights` is a separate lazy route that derives private reader analytics from
the Reader Library state already stored on the device. It does **not** add a
tracking beacon, account, server database or analytics network request.

The dashboard provides:

- whole-story completion and completed-season count
- Continue Reading and global Next Unread actions
- current reading streak and active days
- recent seven-day activity and a 14-day activity view
- furthest opened episode
- progress across all 14 story arcs
- in-progress seasons with direct continuation links
- Reader Library footprint for bookmarks, recent episodes, notes and passages

Activity timestamps come from the existing bounded Recent Reading history, so
Insights intentionally reflects the locally retained reader-history window
rather than claiming to be an unlimited lifetime activity log.

## Contextual lore inside chapters

Known character names and dialogue speakers become interactive only inside the
focused Reader route. Tapping a reference opens a compact in-flow lore tray,
not a modal or fixed bottom sheet.

The tray can show the character's canonical name, seasonal rank state and
profile context, and can route directly to a Characters v2 profile when one is
available. Browser history preserves the chapter route so returning to the
story remains natural.

## Characters v2

Character profiles derive additional navigation and history from existing canon
sources rather than maintaining a second lore database. Profiles expose:

- current/historical rank state and seasonal rank journey
- relationships linked to other known character profiles where possible
- related legends and the profile's existing legend text
- season footprint from the canonical season-cast index
- a user-triggered lazy appearance scan that turns relevant seasons into direct
  episode links without loading all 733 chapter bodies on profile open
- a compact long-profile navigator on mobile and desktop

Portrait files themselves are not modified by character/profile refactors.

## Search v2

The global search experience is a keyboard- and mobile-friendly command palette
with grouped results across characters, rankings, techniques, seasons, episodes,
legends and canon. Episode lookup uses a generated search index that is loaded
only when search needs it; opening the app or going directly to a chapter does
not load all episode prose for search.

## Ranking badges

The same `RankBadge` state model is used across Characters, Rankings, Former
Rank Holders, Legends and search. Current ranks use compact dark-gold pills;
former holders use `FORMER`; retired rankers use `RET`; deceased rankers use a
red dagger treatment; Rhen remains explicitly `UNRANKED` and never receives a
numeric rank. Episode prose uses matching semantics through the novel renderer.

Historical seasonal states are also enforced where needed: Qin Luo remains
active #6 through Season 22 before becoming retired Former #6, while Han Myeong
remains active #8 through Season 22 before becoming deceased Former #8.

## Performance model

Normal web builds split every production section behind a stable route entry so
a direct chapter visit loads the app shell and Reader route instead of eagerly
executing Characters, Rankings, Canon, Timeline, Reader Library, Reading
Insights, Search and other inactive screens. Feature CSS is split with routes
where practical.

`npm run budget:perf` enforces production ceilings after `npm run build`.
Current guarded limits are:

- initial JavaScript: **220 KiB**
- initial CSS: **48 KiB**
- core lore JSON: **210 KiB**
- **14 required lazy route chunks** covering Reader, Chapters, Overview,
  Characters, Villains, Techniques, Rankings, Reader Library, Reading Insights,
  Legends, Former, Timeline, Canon and Search

The generated episode search index is a lazy data asset and is not part of the
initial JavaScript payload.

## Mobile and PWA behavior

Mobile is a first-class target. The section navigator, character browser, story
arc browser and season browser are contained horizontal scrollers and may not
expand the document width. The active top-level section is automatically kept
visible in the mobile tab strip.

The app exposes `manifest.webmanifest` and registers `sw.js`. Previously opened
resources can be served from cache when offline. Service-worker updates do not
replace the active reader silently: when a new build is waiting, a compact
**Update Reader** prompt lets the reader choose when to activate it.

`legacy.html` and the historical-link compatibility alias are deliberately kept
inside the cached shell so emergency rollback and old links remain testable.

## Routing and old links

Existing hash routes remain valid:

| Route | Destination |
| --- | --- |
| `#others` | Other Characters / Villains |
| `#skills` | Arts & Techniques |
| `#sera-timeline` | Sera Timeline |
| `#episodes` | Episode browser |
| `#episodes/<season>/<episode>` | Focused episode reader |
| `#bookmarks` | Reader Library |
| `#insights` | Reading Insights |

Native chapter links also support `#chapter/<season>/<episode>` and character
links remain `#characters/<key>`.

## Character portraits

Portraits are discovered automatically from `src/assets/`:

```text
<key>.jpg            main portrait
<key>-extra-1.jpg    first gallery portrait
<key>-extra-2.jpg    second gallery portrait
...
```

`<key>` must match a key in `DB.characters` (`wen` is Luo Wen, for example).
Portrait assets are intentionally outside reader-architecture refactors. The
React and legacy readers both keep a single active portrait stage so changing
thumbnails cannot leave translucent image layers behind.

Before committing new portraits run `npm run validate:assets`.

## Development

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run test
npm run validate:assets
npm run quality
npm run build
npm run budget:perf
npm run build:single
npm run preview
```

`npm run quality` runs data preparation, TypeScript, ESLint, Vitest, portrait
validation and the production dependency audit.

## Automated regression guards

The browser/unit suite covers, among other things:

- all 74 seasons / 733 chapters and the 14-arc archive
- Continue Reading, reading progress, Next Unread and Back to Season
- persistent typography/reading-width preferences
- Reader Library history, notes, saved passages and backup validation
- contextual chapter lore links and character-profile routing
- Reading Insights progress, activity, continuation links and mobile containment
- mobile navigation behavior and page-level overflow
- current, former, retired, deceased and unranked badge semantics
- Characters v2 rank history, relationships and lazy episode appearances
- Search v2 grouped results, keyboard navigation and lazy episode lookup
- all 14 production lazy-route boundaries and deferred inactive feature chunks
- dialogue speaker colour-key integrity
- portrait discovery and reversible galleries
- PWA manifest, waiting-worker update protocol and service-worker registration
- critical automated accessibility violations
- the preserved `legacy.html` and historical compatibility alias

## CI and GitHub Pages

Every push to `main` uses the permanent Pages pipeline:

1. `npm ci`
2. `npm run quality`
3. normal multi-page web build
4. production performance budget
5. self-contained single-file compatibility build
6. mobile + desktop Playwright regressions
7. browser-diagnostic screenshot upload
8. GitHub Pages deployment

A failed data, TypeScript, production dependency, performance, portrait,
single-file, mobile, accessibility or browser regression prevents publication.

## Build outputs

```bash
npm run build         # web build -> dist/
npm run build:single  # self-contained React reader -> dist-single/index.html
```

The normal web build keeps lore data, season payloads, the search index and
images as cacheable assets. The single-file build deliberately inlines
JavaScript, CSS, lore and portraits so `dist-single/index.html` can be opened
directly without a server.
