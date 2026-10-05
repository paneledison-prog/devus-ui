# Split sign in: Context

> Living document for the **Split sign in** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Two-column authentication page on a fixed 720x440 canvas: an aurora art panel on the left and the sign-in form on the right.

Brand: Acme (placeholder). Open it full window at `/?template=split-sign-in`.

## Real files
- `src/pages/Library/templates.tsx  (function SignInTemplate)`
- `src/pages/Library/templates.css  (Split section)`
- `src/components/Card/Card.tsx`
- `src/components/TextField/TextField.tsx`
- `src/components/Button/Button.tsx`
- `src/components/Logo/Logo.tsx`

Public API: none (static layout).

## What it does
- Art panel with logo, "Welcome back" and a supporting line over the aurora background
- Form card with email and password TextFields and a Continue button

## Known gaps
- No validation or submit handler
- No social sign-in or forgot-password link

## How it is wired into the library
- The library entry is `Split sign in` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 12 light probes and 12 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=split-sign-in&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
