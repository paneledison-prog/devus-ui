# Balance card: Context

> Living document for the **Balance card** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
High-contrast dark card with a label, a large amount, a white primary pill and two secondary actions.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/BalanceCardExample.tsx  (the example shown in the preview)`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/icons.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `BalanceCard({ label?, amount, primary?, actions? })`.

## What it does
- White-on-black text that meets WCAG AA
- Primary pill plus secondary actions as real buttons

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Balance card` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
