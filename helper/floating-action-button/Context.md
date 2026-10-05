# Floating action button: Context

> Living document for the **Floating action button** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Round primary action button that floats above content; accent or dark tone; an extended pill when it has a label.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/FloatingActionButton.tsx  (the example shown in the preview)`
- `src/components/AppUI/Fab.tsx`
- `src/components/AppUI/icons.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `Fab({ icon?, label?, tone?: "accent" | "dark", ...button props })`.

## What it does
- Default plus icon with `aria-label="Create"`
- 52px target; press feedback scales to 94%

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Floating action button` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 7 light probes and 7 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=floating-action-button&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
