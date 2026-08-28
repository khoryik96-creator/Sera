# The Quiet Regular — Lore Repository

## 📖 Read it online

**➡️ [https://khoryik96-creator.github.io/Sera/](https://khoryik96-creator.github.io/Sera/)**

Interactive browser for *The Quiet Regular* lore: characters, martial arts,
rankings, legends, chronology and 64 seasons of short-novel episodes.

The project began as a single multi-megabyte HTML file. It is now a Vite +
TypeScript application with a normal web build and an optional self-contained
single-file build.

## Architecture

```text
index.html                  markup shell + app containers/canon text
src/
  main.ts                   application bootstrap
  db.ts                     data loader + legacy-row normalization
  data.json                 canon/lore database
  types.ts                  persisted + normalized runtime types
  images.ts                 automatic portrait discovery
  portraitGallery.ts        generic reversible portrait gallery
  characters.ts             character index/profile rendering
  skills.ts                 Rhen + Sera martial-art archives
  ranks.ts                  ranking renderer + rank-pill semantics
  legends.ts                legends archive
  former.ts                 historical rank holders
  seraTimeline.ts           Sera chronology
  arcFigures.ts             Other Characters / Villains
  novel.ts                  dialogue, skill and ranked-name annotation
  episodeMeta.ts            canonical typed arc/season metadata
  episodeStructure.ts       generated archive shell
  episodes.ts               lazy season/episode rendering
  episodeNav.ts             season/episode jump navigation
  bookmarks.ts              local bookmark + resume-reading persistence
  tabs.ts                   tab activation/search reset
  colorKey.ts               dialogue colour legend
  dom.ts                    DOM helpers
  styles.css                shared/legacy visual foundation
  styles/
    portraits.css           isolated portrait/gallery rules
    rank-badges.css         compact Lucy-inspired rank pills
    episodes.css            episode archive performance rules
  assets/                   portrait assets
scripts/
  validate-assets.mjs       portrait naming/dimension/aspect validation
test/                       unit + regression + canon-integrity tests
```

### Data model

`src/data.json` still uses compact positional arrays for a few historical data
sets so the large lore file does not need a risky one-shot migration.
`normalizeDatabase()` converts those rows once during startup into named objects:

- ranking rows → `{ rank, name, className, description }`
- signature arts → `{ name, category, signature, rating, description }`
- season cast → `{ name, role, description }`

Render modules only consume the typed runtime objects.

## Character portraits

Portraits are discovered automatically from `src/assets/`:

```text
<key>.jpg            main portrait
<key>-extra-1.jpg    first gallery portrait
<key>-extra-2.jpg    second gallery portrait
...
```

`<key>` must match a key in `DB.characters` (`wen` is Luo Wen, for example).
Any character with extras automatically receives the same generic gallery —
there is no Sera-specific gallery implementation anymore.

The gallery keeps one main image in the stage and switches its `src` when a
thumbnail is selected, so moving forward and backward through portraits cannot
leave translucent layers behind.

Before committing new portraits run:

```bash
npm run validate:assets
```

The validator checks character keys, duplicate main portraits, contiguous extra
indices, readable dimensions, hard minimum resolution, aspect ratio and file
size. Lower-than-preferred source resolution is reported as a warning.

## Ranking badges

Ranking labels use compact dark-gold pills inspired by the Lucy reader in the
`Despicable-Heretic` project. Current ranks use gold; former/retired ranks use a
muted slate treatment; Rhen uses an explicit unranked treatment and never gains
a numeric rank.

## Episode archive

The browser no longer renders all 64 seasons and 633 episodes on startup.

`episodeMeta.ts` is the source of truth for the 13 arcs and 64 season headings.
At startup `episodeStructure.ts` builds the archive shell from that typed
metadata. `episodes.ts` then renders prose only when a season is opened or
directly requested by the jump/bookmark navigator. Global episode search
intentionally renders filtered results across all seasons and returns to lazy
mode when the query is cleared.

Bookmarks and resume-reading state stay in `localStorage` and survive reloads
on the same browser/device.

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

`npm run quality` runs typecheck, lint, the Vitest suite and portrait validation.

## Automated regression guards

Tests cover, among other things:

- all 64 seasons exist
- Season 1 remains marked LOCKED in archive metadata
- episode arc/season metadata captures seasons 1–64 exactly once
- current/former rank identity is retained while Rhen stays unranked
- Rhen's Ultimate remains the last archived Rhen technique
- exact long-form episode prose is not duplicated across chapters
- every explicit `[[speaker:key]]` tag maps to a known colour key
- all portrait keys resolve to characters
- Sera and Rhen gallery extras are discovered in numeric order
- generic portrait galleries can switch forward and backward
- ranking colour mappings remain collision-safe (`Ilyra Serath` is not Sera)

## CI and GitHub Pages

Pull requests run the Quality workflow:

1. `npm ci`
2. `npm run quality`
3. normal web build
4. self-contained single-file build

Pushes to `main` run the same quality gate before GitHub Pages is built and
deployed. This prevents a data, TypeScript, portrait or regression-test failure
from publishing a broken reader.

## Build outputs

```bash
npm run build         # web build -> dist/
npm run build:single  # self-contained file -> dist-single/index.html
```

The normal web build keeps lore data and images as cacheable assets. The
single-file build deliberately inlines JavaScript, CSS, lore and portraits so
`dist-single/index.html` can be opened directly without a server.

### Windows one-click

Double-click `Run-App.bat`. The first run installs dependencies (Node.js and an
internet connection are required once), builds the single-file version and
opens it. Later runs rebuild and open it again.
