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

## Phase 6 status: BLOCKED — TypeScript 7 held

TypeScript 7.0.2 (the native compiler, npm `latest`) itself works here — `tsc
--noEmit`, `vite build`, `vite build --config vite.singlefile.config.ts`, and the
performance budget all pass on it.

The blocker is **typescript-eslint**: its latest release (8.68.0) and canary both
declare `typescript: ">=4.8.4 <6.1.0"` and hard-error at lint time with
*"typescript-eslint does not support TS 7.0."* Adopting TS 7 today would mean
dropping type-aware linting from the `quality` gate, which is not an acceptable
trade.

**Decision:** ship phases 1–5, keep TypeScript on the 5.x line, and revisit TS 7
once typescript-eslint publishes a version whose peer range includes it. At that
point this becomes a two-line change (bump `typescript`, bump `typescript-eslint`)
validated by the same gate. Dependabot PR #28 stays closed; a fresh bump will
reopen the TS 7 question when the ecosystem is ready.

Phases 1–5 delivered: jsdom 30, typescript-eslint 8.68, Vite 8, Vitest 4,
ESLint 10 + @eslint/js 10.0.1 (the latter folding in #29).

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
