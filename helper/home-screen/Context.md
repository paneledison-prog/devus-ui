# Home screen: Context

> Living document for the **Home screen** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Mobile home: greeting app bar, week strip, a task card with a filter and a floating tab bar with a round action button.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/HomeScreen.tsx  (the example shown in the preview)`
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/TabBar.tsx`
- `src/components/AppUI/Fab.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: none (the example is self-contained).

## What it does
- Large app bar with greeting, italic subtitle and a sun icon action
- WeekStrip with Wednesday selected
- Task card: segmented filter and two titled checkbox sections
- Floating TabBar with a dark Fab

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Home screen` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 46 light probes and 46 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=home-screen&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
