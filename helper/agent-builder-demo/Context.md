# Agent builder demo: Context

> Living document for the **Agent builder demo** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A platform for building and running autonomous agents from a prompt: sign-in, plan, run, approval, publish and credits.

Brand: Pairwise (fictional). Open it full window at `/?template=agent-builder-demo`.

## Real files
- `src/components/Agents/Pairwise.tsx`
- `src/components/Agents/Pairwise.css`
- `src/components/Agents/shared.tsx`
- `src/components/Agents/Agents.css`
- `src/styles/tokens.css`

Public API: `PairwiseDemo({ startAt?: Stage, defaultTheme? })`.

## What it does
- Validated split sign-in
- Prompt becomes a plan that runs, pauses for approval, then shows a chat post with a code diff
- Publish and Share dialogs
- Discover with search and category pills
- Credits page with slider and tier highlight, credits menu

## Known gaps
- The run is a timed script
- Built from a description card

## How it is wired into the library
- The library entry is `Agent builder demo` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 37 light probes and 37 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=agent-builder-demo&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
