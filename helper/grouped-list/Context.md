# Grouped list: Context

> Living document for the **Grouped list** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Inset grouped list like a mobile settings screen: icon tile, title, optional value, then a chevron or a control.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/GroupedList.tsx  (the example shown in the preview)`
- `src/components/AppUI/ListRow.tsx`
- `src/components/AppUI/icons.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `ListRow({ icon?, title, value?, trailing?, onClick? })`, `ListGroup({ label?, children })`.

## What it does
- Rows with icon, title, value and a Switch
- Rows are buttons only when clickable
- Rows are at least 48px tall

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Grouped list` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 15 light probes and 15 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=grouped-list&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
