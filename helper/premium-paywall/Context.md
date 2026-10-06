# Premium paywall: Context

> Living document for the **Premium paywall** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Subscription paywall "Level Up with Premium": sky-blue hero with clay artwork, a Restore Purchases row on a black strip, and a white sheet with two plans, a Start Free Trial button and Terms of Service.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/PremiumPaywall.tsx  (the example shown in the preview)`
- `src/components/AppUI/Paywall.tsx`
- `src/components/AppUI/Paywall.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `PayCanvas`, `PayStatusBar`, `PayHomeBar`, `ClayCloud`, `ClayRing`, `PlanRow` (in Paywall.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows: status bar, clay cloud, close button, title, subtitle, clay ring, restore row, Annual (selected, with struck-through $69.99) and Monthly plans, trial button, terms link, home indicator
- Plan rows carry an `aria-label` with name, price and selected state
- Clay artwork is original SVG (vertical gradient plus blurred light and shadow blobs clipped to the shape), no image files
- Gesture: Swipe - swipe the plan sheet left for Monthly, right for Annual

## Known gaps
- Static replica: no handlers, no selection state, no animation (as in the image)
- The clay artwork is a hand-built approximation of the 3D renders; shading differs from the image in detail
- Built with the Stitch MCP as a first pass; the image, not the Stitch output, was the source of truth

## How it is wired into the library
- The library entry is `Premium paywall` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 20 light probes and 20 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=premium-paywall&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
