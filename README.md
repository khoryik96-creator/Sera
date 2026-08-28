# The Quiet Regular — Lore Repository

## 📖 Read it online

**➡️ [https://khoryik96-creator.github.io/Sera/](https://khoryik96-creator.github.io/Sera/)**

Interactive browser for *The Quiet Regular* lore: characters, martial arts,
rankings, legends, chronology and all 64 seasons / 633 short-novel episodes.

The primary reader is a **React 19 + TypeScript + Vite** application with
mobile-first navigation, lazy season loading, persistent reading preferences,
bookmarks, PWA/offline support, and an optional self-contained single-file
build.

The pre-React reader is intentionally preserved at **`legacy.html`** as a tested
rollback path. `react-preview.html` remains only as a backward-compatible URL
alias for links created during the migration; the normal root `index.html` is
the production reader.

## Architecture

```text
index.html                       production React shell
legacy.html                      byte-preserved pre-React rollback reader
react-preview.html               backward-compatible React URL alias
src/
  react/
    main.tsx                     React bootstrap + PWA initialization
    app/
      App.tsx                    root routing/search/application shell
      navigation.ts              repository section definitions
    components/
      Shared.tsx                 shared presentation + RankBadge
    features/
      overview/                  archive landing page
      characters/                character browser + portrait galleries
      villains/                  Other Characters / Villains archive
      techniques/                Rhen + Sera arts
      chapters/                  arc/season/episode browser
      reader/                    focused episode reader + device preferences
      bookmarks/                 saved chapters / resume reading
      rankings/                  current ranking board
      legends/                   legends archive
      former/                    former rank holders
      timeline/                  Sera chronology
      canon/                     canon rules
    shared/
      rankState.ts               canonical rank-state parsing/semantics
    styles/
      global.css                 shell / desktop foundation
      archive.css                archive feature layouts
      reader.css                 archive + focused reading surface
      mobile.css                 mobile containment + reading chrome behavior
      pwa.css                    offline/update/boot UI
  db.ts                          core lore loader / normalization
  data.json                      canonical lore database
  seasonStore.ts                 independently loaded season cache
  generated/                     generated season payloads
  images.ts                      automatic portrait discovery
  bookmarks.ts                   shared local persistence
  novel.ts                       dialogue/technique/rank prose renderer
  pwa.ts                         install/offline/update/service-worker setup
  types.ts                       canonical runtime types
  assets/                        portrait assets
  main.ts + legacy renderers     retained for legacy.html rollback
scripts/
  prepare-data.mjs               generates core + 64 season payloads
  validate-assets.mjs            portrait naming/dimension validation
e2e/
  production-reader.spec.ts      production React/mobile/PWA regressions
  reader.spec.ts                 legacy rollback regressions
test/                            unit + canon/data integrity tests
public/
  manifest.webmanifest           install metadata
  sw.js                          offline/cache/update worker for React + legacy
```

## Episode archive and reader

The production reader does not render all 633 episodes on startup. Core lore is
loaded first and each season is an independently loadable payload through
`seasonStore.ts`.

The archive is organized as **13 story arcs / 64 seasons** instead of one giant
season wall. It keeps the device's last-read episode prominent, exposes the
current arc and season clearly, and only renders season cards for the selected
arc.

The focused reader supports:

- persistent A− / A+ text sizing
- three font presets: Serif, Book, Sans
- Compact / Comfort / Relaxed line spacing
- Narrow / Standard / Wide reading columns
- bookmark / Continue Reading state in `localStorage`
- previous / next episode navigation in normal document flow
- mobile navigation chrome that moves out of the way while scrolling down and
  returns when scrolling up
- Lucy-style ranked-name pills inside prose
- explicit speaker colour coding from canonical speaker tags
- gold Supreme / Transcended technique callouts

## Ranking badges

The same `RankBadge` component/state model is used across Characters, Rankings,
Former Rank Holders, Legends, and global search. Current ranks use compact
dark-gold pills; former holders use `FORMER`; retired rankers use `RET`;
deceased rankers use a red dagger treatment; Rhen remains explicitly
`UNRANKED` and never receives a numeric rank. Episode prose uses matching badge
semantics through the novel renderer.

## Mobile and PWA behavior

Mobile is a first-class target. The section navigator, character browser, story
arc browser, and season browser are contained horizontal scrollers and may not
expand the document width. The active top-level section is automatically kept
visible in the mobile tab strip.

While reading on a phone, the top navigation chrome hides when the reader
scrolls down and returns on upward scrolling. Reader preferences remain in a
small sticky control strip rather than a screen-covering dock.

The app exposes `manifest.webmanifest` and registers `sw.js`. Previously opened
resources can be served from cache when offline. Service-worker updates no
longer replace the active reader silently: when a new build is waiting, a small
**Update Reader** prompt lets the reader choose when to activate it and reload.

## Routing and old links

Existing hash routes remain valid:

| Legacy route | React destination |
| --- | --- |
| `#others` | Other Characters / Villains |
| `#skills` | Arts & Techniques |
| `#sera-timeline` | Sera Timeline |
| `#episodes` | Episode browser |
| `#episodes/<season>/<episode>` | Focused episode reader |

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
npm run build:single
npm run preview
```

`npm run quality` runs data preparation, TypeScript, ESLint, Vitest, portrait
validation and the production dependency audit.

## Automated regression guards

The browser/unit suite covers, among other things:

- all 64 seasons and 633 episode data integrity
- 13-arc archive navigation and all 64 season entries across those arcs
- Continue Reading and season → episode entry flow
- persistent text size, font, spacing and reading width
- mobile navigation hiding/reappearing while reading
- mobile active-tab visibility and page-level overflow
- current, former, retired, deceased and unranked badge semantics
- dialogue speaker colour-key integrity
- portrait discovery and reversible galleries
- PWA manifest, waiting-worker update protocol and service-worker registration
- critical automated accessibility violations
- the preserved `legacy.html` reader on mobile and desktop

## CI and GitHub Pages

Every push to `main` uses the permanent Pages pipeline:

1. `npm ci`
2. `npm run quality`
3. normal multi-page web build
4. self-contained single-file compatibility build
5. mobile + desktop Playwright browser regressions
6. browser-diagnostic screenshot upload
7. GitHub Pages deployment

A failed data, TypeScript, portrait, single-file, mobile, accessibility or browser
regression prevents publication.

## Build outputs

```bash
npm run build         # web build -> dist/
npm run build:single  # self-contained React reader -> dist-single/index.html
```

The normal web build keeps lore data, season payloads and images as cacheable
assets. The single-file build deliberately inlines JavaScript, CSS, lore and
portraits so `dist-single/index.html` can be opened directly without a server.

### Windows one-click

Double-click `Run-App.bat`. The first run installs dependencies (Node.js and an
internet connection are required once), builds the single-file reader and opens
it. Later runs rebuild and open it again.
