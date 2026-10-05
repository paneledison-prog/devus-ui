# Floating tab bar: Context

> Living document for the **Floating tab bar** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Pill-shaped bottom navigation that floats above content; only the active tab shows its label inside a raised pill; an optional round action sits beside it.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/FloatingTabBar.tsx  (the example shown in the preview)`
- `src/components/AppUI/TabBar.tsx`
- `src/components/AppUI/Fab.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `TabBar({ items, label?, value?, defaultValue?, onChange?, floating?, action? })`.

## What it does
- Items fill the bar width; the active item is wider and animated
- Bar uses a light-gray fill in light mode; the active pill is lifted above the bar in dark mode
- Optional action button (Fab)

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Floating tab bar` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 8 light probes and 8 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=floating-tab-bar&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
