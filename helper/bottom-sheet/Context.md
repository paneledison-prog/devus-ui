# Bottom sheet: Context

> Living document for the **Bottom sheet** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Panel that slides up from the bottom of a mobile screen: drag handle, title, content rows and stacked full-width actions.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/BottomSheetExample.tsx  (the example shown in the preview)`
- `src/components/AppUI/BottomSheet.tsx`
- `src/components/AppUI/ListRow.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `BottomSheet({ title, children, footer? })`.

## What it does
- White sheet over a dimmed (32% black) scrim so the borderless phone stays visually whole
- Footer buttons are 48px tall
- Gesture: Drag - drag the handle or the sheet; it follows the finger and springs back if released early
- Gesture: Slide - the sheet slides down and away when dismissed; a Share project button brings it back
- Gesture: Swipe - swipe the sheet down to dismiss it
- Gesture: Flick - a quick flick down dismisses it even when the drag is short

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Bottom sheet` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 10 light probes and 10 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=bottom-sheet&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
