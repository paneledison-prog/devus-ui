# Restoring purchases: Context

> Living document for the **Restoring purchases** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Loading screen "Restoring Purchases": plan cards scattered mid-motion above a clay flower ring, a title, a subtitle and a spinner ring on a flat sky-blue background.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/RestoringPurchases.tsx  (the example shown in the preview)`
- `src/components/AppUI/Paywall.tsx`
- `src/components/AppUI/Paywall.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `PayCanvas`, `PayStatusBar`, `PayHomeBar`, `PlanCard`, `ClayFlower` (in Paywall.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows: status bar, back chevron, four tilted plan cards (right-edge card -8 degrees, "$5.99/month" card 7.6 degrees, Monthly -15 degrees, Annual 1.5 degrees in front), flower ring, title, subtitle, spinner ring, home indicator
- The spinner ring turns continuously (1s per turn, 2.8s under reduced motion), the only motion; added on request, the image shows it static
- Cards and artwork are `aria-hidden`; the spinner has `role="status"` and a label

## Known gaps
- No handlers; the spinner is the only animation
- The clay flower is a hand-built approximation of the 3D render
- The partly hidden card at the right edge shows only "9/m" in the image; its full text ("$4.99/month") is not known and was chosen to fit

## How it is wired into the library
- The library entry is `Restoring purchases` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 4 light probes and 4 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=restoring-purchases&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
