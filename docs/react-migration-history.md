# React Migration History — Completed

The Quiet Regular's production presentation layer was migrated from the modular
DOM reader to a feature-based React 19 architecture while preserving the
canonical lore database, portrait assets, generated season payloads, bookmarks,
rank semantics, deep links, and the pre-React rollback reader.

## Completed stages

1. **Parallel reader** — React shell, routing, search, reader context,
   Characters, Episodes, Rankings, and Bookmarks were built beside production.
2. **Feature parity** — Other Characters/Villains, Arts, Legends, Former Rank
   Holders, Sera Timeline, Canon, PWA/offline behavior, legacy hashes, and
   mobile/browser regression coverage were added.
3. **Production cutover** — React became `index.html`; the previous reader was
   frozen at `legacy.html` and remains part of CI.
4. **Post-cutover hardening** — mobile season flow, arc browsing, adjustable
   typography/column width, unified rank-state badges, scroll-away reading
   chrome, and user-controlled service-worker updates were added.

## Permanent rules

- Canon prose and portrait assets are independent from UI refactors.
- Episode data stays lazy-loaded per season.
- Existing deep links remain supported.
- Mobile reading is a first-class release gate.
- `legacy.html` remains the tested rollback surface until explicitly retired.
