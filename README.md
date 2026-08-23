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
  data.json         # the lore database (was `const DB = {...}` inline)
  styles.css        # all styles (was 5 inline <style> blocks)
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
```

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

`npm run typecheck`, `npm run lint` and `npm run build` all pass.

Possible further work: code-split the bundle (the inlined `data.json` makes
it large) and add automated tests.
