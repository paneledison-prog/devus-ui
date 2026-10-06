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
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `BalanceCard({ label?, amount, primary?, actions? })`.

## What it does
- White-on-black text that meets WCAG AA
- Primary pill plus secondary actions as real buttons
- Gesture: Flip - the card flips in 3D to a back with the card number, expiry, holder and limit (flip button, or swipe sideways); the hidden face is `inert`
- Gesture: Swipe - swipe the card sideways to flip it

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Balance card` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 12 light probes and 12 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=balance-card&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
