# Toolchain Majors Migration Roadmap

Replaces Dependabot PR **#28** (which bundled five major upgrades into one
un-reviewable bump) and folds in **#29** (`@eslint/js` 10, which only makes sense
alongside the ESLint 9 → 10 move).

The strategy: **one tool per commit**, each validated against the full `quality`
gate plus `build` and `build:single`, in an order that respects how the tools
depend on each other and puts the riskiest change last.

## Baseline (main)

`npm run quality` green: typecheck + ESLint + 107 unit tests + asset validation +
prod audit. Node 22 locally / Node 24 in CI. ESLint already uses flat config
(`eslint.config.js`), which ESLint 10 requires.

## Sequence

| Phase | Upgrade | Why here | Validated by |
|-------|---------|----------|--------------|
| 1 | jsdom `^25` → `^30` | Isolated to the test DOM; no peer coupling | 9 `@vitest-environment jsdom` test files |
| 2 | typescript-eslint `^8.1` → `^8.68` | Within-major; ships TS 7 + ESLint 10 support without changing either yet | `eslint .` |
| 3 | Vite `^5` → `^8` | Vitest builds on Vite, so Vite moves first | `build` + `build:single` |
| 4 | Vitest `^2` → `^4` | Test runner; peers with Vite | unit tests (incl. jsdom envs) |
| 5 | ESLint `^9` → `^10` + `@eslint/js` `^9` → `^10` | Flat config already in place; folds in #29 | `eslint .` |
| 6 | TypeScript `^5` → `^7` | Underpins typecheck, `vite build` (`tsc --noEmit`), and typescript-eslint — do last so everything else is stable | full `quality` + `build` + `build:single` |
| 7 | — | Final green + push; CI runs e2e; open PR; close #28 and #29 | CI `quality` + `test:e2e` + Pages deploy |

## Rules per phase

- Bump exactly one tool (phase 5 is the ESLint pair; they version together).
- `npm install` to refresh the lockfile, then run the targeted check **and** full
  `quality`.
- Commit only when green. If a phase needs source changes, keep them minimal and
  scoped to what the new major requires.
- If a phase needs a judgment call (behavioral change, non-trivial rewrite), stop
  and surface it rather than guessing.

## Rollback

Each phase is its own commit, so any single upgrade can be reverted without
unwinding the others. The legacy renderer (`legacy.html`) remains the runtime
rollback path for the reader itself.
