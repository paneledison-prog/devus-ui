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

Public API: `BottomSheet({ title, children, footer? })`.

## What it does
- White sheet over a dimmed (32% black) scrim so the borderless phone stays visually whole
- Footer buttons are 48px tall

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Bottom sheet` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
