# App bar: Context

> Living document for the **App bar** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Top bar for mobile screens: a centered title with a back button, or a large greeting with a muted italic subtitle and a raised icon action.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/AppBarExample.tsx  (the example shown in the preview)`
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/icons.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `AppBar({ title, subtitle?, large?, onBack?, action? })`.

## What it does
- Compact variant with back button
- Large variant with subtitle and action
- An empty action slot is hidden (no empty circle)

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `App bar` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
