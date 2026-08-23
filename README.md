# The Quiet Regular — Lore Repository

Interactive single-page browser for the *Quiet Regular* lore (characters,
skills, rankings, legends, 64 seasons of episodes). Originally a single 6 MB
HTML file with everything inlined; now split into a small Vite + TypeScript
project.

## Layout

```
index.html          # markup shell (loads src/main.ts as a module, no inline JS)
src/
  main.ts           # entry: wires tab/search/quicklink events + initial render
  db.ts             # DB import + cast, image maps, colour-key map
  dom.ts            # getEl() helper + regex escaping
  novel.ts          # dialogue / skill / ranked-name annotation
  characters.ts     # character tab: profile, nav, legends, Sera gallery
  skills.ts         # Rhen + Sera skill tables and cards
  legends.ts        # legends tab
  ranks.ts          # rankings tab
  former.ts         # former rank-holders tab
  seraTimeline.ts   # Sera chronology tab
  episodes.ts       # 64-season episode archive + season cast
  arcFigures.ts     # "Others" / villains tab
  colorKey.ts       # character colour legend
  types.ts          # interfaces for the data model
  data.json         # the lore database (fetched at runtime, not bundled into JS)
  styles.css        # all styles (was 5 inline <style> blocks)
  vite-env.d.ts     # Vite client types (for the data.json?url import)
test/               # vitest unit + data-integrity tests
public/assets/      # character portraits (were base64 data: URIs)
```

## Develop

```bash
npm install
npm run dev        # start the dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the built dist/
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run test       # vitest (unit + data-integrity tests)
```

## Two build outputs

```bash
npm run build         # web build  -> dist/         (code-split; needs a server)
npm run build:single  # single file -> dist-single/index.html
```

- **`dist/`** is the normal web build: small JS, `data.json` and images as
  separate cacheable assets. Serve it (e.g. `npm run preview`) or deploy the
  folder.
- **`dist-single/index.html`** is one self-contained file with the JS, CSS,
  images, and lore data all inlined. **Double-click it to open** — no server,
  no install. Handy for sharing or offline use.

Both are produced from the same source; the data/image strategy is switched
at build time by the `__SINGLEFILE__` flag (fetched assets vs. inlined).

### Windows one-click

Double-click **`Run-App.bat`**. On the first run it installs dependencies
(needs Node.js and internet once), builds the single file, and opens it in
your browser. Later runs just rebuild and open.

## Migration notes

Originally one 6 MB HTML file; migrated to Vite + TypeScript and then tightened:

- **Strict TypeScript** — `strict`, `noImplicitAny`, `noUnusedLocals`,
  `noUnusedParameters` are all on. Function parameters, callbacks and DOM
  lookups are typed; `getEl<T>()` in `src/dom.ts` throws on missing elements
  rather than using scattered non-null assertions.
- **Per-tab modules** — logic is split across focused modules (see Layout);
  `main.ts` is a thin entry point.
- **No inline JavaScript** — all interactions use delegated event listeners
  (`data-char`, `data-idx`, `data-scroll`); nothing hangs off `window`.
- **Code-split data** — `data.json` is imported with Vite's `?url` and
  fetched at runtime by `loadDB()`, so it ships as a cacheable static asset
  instead of being inlined into the JS bundle (JS bundle ~22 kB vs ~970 kB
  before). Render code reads the live `DB` binding after the initial load.
- **Automated tests** — Vitest covers the novel/rank logic, the
  per-character legend filter (regression guard for the empty-label bug),
  and data-integrity invariants (all 64 seasons present, every character
  and portrait key valid, row widths).

`npm run typecheck`, `npm run lint`, `npm run test` and `npm run build`
all pass.
