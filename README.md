# The Quiet Regular — Lore Repository

Interactive single-page browser for the *Quiet Regular* lore (characters,
skills, rankings, legends, 64 seasons of episodes). Originally a single 6 MB
HTML file with everything inlined; now split into a small Vite + TypeScript
project.

## Layout

```
index.html          # markup shell (loads src/main.ts as a module)
src/
  main.ts           # all render/interaction logic
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

This is the first migration pass. To keep the diff safe, the extracted logic
was moved verbatim and TypeScript runs in a lenient mode
(`strict: false`, `noImplicitAny: false`). The data model in `src/types.ts`
is fully typed and applied to the `DB` object.

Recommended follow-ups:

- Turn on `strict` / `noImplicitAny` and annotate function parameters and
  DOM lookups (add a `getEl(id)` helper that throws on missing elements).
- Replace the two remaining inline `onclick="renderCharacter(...)"` /
  `onclick="showSeraPortrait(...)"` handlers (generated in `main.ts`) with
  delegated event listeners so nothing needs to hang off `window`.
- Split `main.ts` into per-tab render modules.
