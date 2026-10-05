# Tracking steps: Context

> Living document for the **Tracking steps** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Horizontal progress line with a dot per step: done steps are filled and connected, the active step is filled, the rest are muted.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/TrackingSteps.tsx  (the example shown in the preview)`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `TrackSteps({ steps })` (`TrackStep = { label, time, state }`).

## What it does
- Ordered list with `aria-current="step"` on the active step
- State is also shown with text and a check mark, not color alone

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Tracking steps` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 14 light probes and 14 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=tracking-steps&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
