# Landing page: Context

> Living document for the **Landing page** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Marketing page on a fixed 720x440 canvas: top nav, centered hero with badge, headline, supporting text and two calls to action over a soft accent glow.

Brand: Acme (placeholder). Open it full window at `/?template=landing-page`.

## Real files
- `src/pages/Library/templates.tsx  (function LandingTemplate)`
- `src/pages/Library/templates.css  (Landing section)`
- `src/components/Button/Button.tsx`
- `src/components/Badge/Badge.tsx`
- `src/components/Logo/Logo.tsx`

Public API: none (static layout).

## What it does
- Nav: logo, brand, three text links, small primary button
- Hero: accent badge, 40px headline, muted paragraph, large primary and secondary buttons
- Soft radial accent glow behind the hero

## Known gaps
- Static: links and buttons are not wired
- No responsive layout (fixed canvas scaled with CSS zoom by the library)

## How it is wired into the library
- The library entry is `Landing page` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 11 light probes and 11 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=landing-page&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
