# The Quiet Regular — Lore Repository

## 📖 Read it online

**➡️ [https://khoryik96-creator.github.io/Sera/](https://khoryik96-creator.github.io/Sera/)**

Interactive browser for *The Quiet Regular* lore: characters, martial arts,
rankings, legends, chronology and all 64 seasons / 633 short-novel episodes.

The project began as a single multi-megabyte HTML file, then moved through a
modular Vite + TypeScript DOM architecture. The primary reader is now a
**React 19 + TypeScript + Vite** application with mobile-first navigation,
lazy season loading, persistent reading preferences, bookmarks, PWA/offline
support, and an optional self-contained single-file build.

The pre-React reader is intentionally preserved at **`legacy.html`** as a tested
rollback path. `react-preview.html` is also retained as a compatibility/debug
entry point; the normal root `index.html` is the production React shell.

## Architecture

```text
index.html                       production React shell
legacy.html                      byte-preserved pre-React rollback reader
react-preview.html               secondary React compatibility entry
src/
  react/
    main.tsx                     React bootstrap + PWA initialization
    app/
      App.tsx                    root routing/search/application shell
      navigation.ts              repository section definitions
    components/
      Shared.tsx                 shared React presentation components
    features/
      overview/                  archive landing page
      characters/                character browser + portrait galleries
      villains/                  Other Characters / Villains archive
      techniques/                Rhen + Sera arts
      chapters/                  season/episode browser
      reader/                    focused episode reader + preferences
      bookmarks/                 saved chapters / resume reading
      rankings/                  current ranking board
      legends/                   legends archive
      former/                    former rank holders
      timeline/                  Sera chronology
      canon/                     canon rules
    shared/
      rankState.tsx              rank-state parsing + badge semantics
    styles/
      global.css                 React shell / desktop foundation
      archive.css                archive feature layouts
      reader.css                 focused reading surface
      mobile.css                 Pixel/mobile containment rules
      pwa.css                    offline banner + skip-link rules
  db.ts                          core lore loader / normalization
  data.json                      canonical lore database
  seasonStore.ts                 independently loaded season cache
  generated/                     generated season payloads
  images.ts                      automatic portrait discovery
  bookmarks.ts                   shared local persistence
  novel.ts                       dialogue/technique/rank prose renderer
  pwa.ts                         install/offline/service-worker setup
  types.ts                       canonical runtime types
  assets/                        portrait assets
  main.ts + legacy renderers     retained for legacy.html rollback
scripts/
  prepare-data.mjs               generates core + 64 season payloads
  validate-assets.mjs            portrait naming/dimension validation
e2e/
  react-preview.spec.ts          production React + mobile/PWA regressions
  reader.spec.ts                 legacy rollback regressions
test/                            unit + canon/data integrity tests
public/
  manifest.webmanifest           install metadata
  sw.js                          offline/cache worker for React + legacy
```

## Routing and old links

The React reader keeps the old hash routes working so existing bookmarks and
shared links remain valid after the migration.

| Legacy route | React destination |
| --- | --- |
| `#others` | Other Characters / Villains |
| `#skills` | Arts & Techniques |
| `#sera-timeline` | Sera Timeline |
| `#episodes` | Episode browser |
| `#episodes/<season>/<episode>` | Focused episode reader |

Native React chapter links also support `#chapter/<season>/<episode>`.
Character links remain `#characters/<key>`.

## Character portraits

Portraits are discovered automatically from `src/assets/`:

```text
<key>.jpg            main portrait
<key>-extra-1.jpg    first gallery portrait
<key>-extra-2.jpg    second gallery portrait
...
```

`<key>` must match a key in `DB.characters` (`wen` is Luo Wen, for example).
Any character with extras receives the same generic gallery. The React and
legacy readers both keep a single active portrait stage, so changing thumbnails
cannot leave translucent image layers behind.

Before committing new portraits run:

```bash
npm run validate:assets
```

The validator checks character keys, duplicate main portraits, contiguous extra
indices, readable dimensions, minimum resolution, aspect ratio and file size.
Lower-than-preferred source resolution is reported as a warning.

## Ranking badges

Current numeric ranks use compact dark-gold pills. Former/retired and deceased
states are visually distinct, while Rhen remains explicitly unranked and never
receives a numeric rank. The browser regression suite locks these states so a
future renderer change cannot silently flatten them together.

## Episode reader

The production reader does not render all 633 episodes on startup. Core lore is
loaded first and each season is an independently loadable payload through
`seasonStore.ts`.

The focused reader supports:

- persistent A− / A+ text sizing
- relaxed-spacing toggle
- bookmark / resume state in `localStorage`
- previous / next episode navigation kept in normal document flow on mobile
- Lucy-style ranked-name pills inside prose
- explicit speaker colour coding from canonical speaker tags
- gold Supreme / Transcended technique callouts

## Mobile and PWA behavior

The React shell is tested at a Pixel-sized viewport as well as desktop Chromium.
The mobile character index and top-level section navigation are contained
horizontal scrollers rather than page-width expanders, and browser tests assert
that the document itself has no horizontal overflow.

The same app exposes `manifest.webmanifest` and registers `sw.js`. Previously
opened resources can be served from cache when offline. The service worker knows
about the production React shell, `react-preview.html`, and `legacy.html` so the
rollback reader remains reachable too.

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

The test suite covers, among other things:

- all 64 seasons and 633 episode data integrity
- Season 1 locked/archive rules
- Rhen remaining unranked and his Ultimate remaining last in the archive
- current, former, retired and deceased rank states
- dialogue speaker colour-key integrity
- portrait discovery and reversible galleries
- production React routing plus legacy hash aliases
- Pixel/mobile page-level overflow
- reader font-size / spacing persistence
- in-flow mobile reader controls and episode navigation
- PWA manifest + service-worker registration
- critical automated accessibility violations
- the preserved `legacy.html` reader on both mobile and desktop

## CI and GitHub Pages

Every push to `main` uses the permanent Pages pipeline:

1. `npm ci`
2. `npm run quality`
3. normal multi-page web build
4. **self-contained single-file compatibility build**
5. mobile + desktop Playwright browser regressions
6. browser-diagnostic screenshot upload
7. GitHub Pages deployment

A failed data, TypeScript, portrait, single-file, mobile, accessibility or browser
regression prevents the Pages artifact from being published.

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
