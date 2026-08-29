# Claude Working Boundary — The Quiet Regular

Claude is responsible for **technical / architecture / implementation work** in this repository unless the user explicitly changes that responsibility split.

Before technical work:

1. Read `docs/ROADMAP.md`.
2. Read `docs/HANDOVER.md`.
3. Inspect current `main`, recent merged PRs, and the latest successful Pages deployment.
4. Do not repeat roadmap phases marked `DONE`.

## Story-planning ownership boundary

`docs/STORY_SKELETON_LOCK.md` is a **read-only story-planning source owned by the user's ChatGPT story-planning workflow**.

Claude / Claude Code must NOT:

- edit `docs/STORY_SKELETON_LOCK.md`
- rewrite or reorganize it
- expand its blank/TBD sections
- invent missing character development
- compose chapters/scenes from it
- migrate its planned facts into `src/data.json`
- update season/chapter prose from it
- change canon, rankings, techniques, timelines, or character story content merely because the skeleton contains future plans
- treat future skeleton material as already implemented story canon

Claude may read the file only when technical work needs awareness of future story constraints.

If technical work would conflict with the story skeleton, preserve the skeleton and flag the conflict rather than altering story material.

If asked to perform story-authoring work, defer that work to the ChatGPT story-planning workflow unless the user explicitly states that this ownership boundary is being revoked.

## Technical guardrail

Continue to follow the architecture, mobile, testing, release, portrait, and canon-preservation rules in `docs/ROADMAP.md` and `docs/HANDOVER.md`.
