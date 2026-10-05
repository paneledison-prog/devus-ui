# Dashboard: Context

> Living document for the **Dashboard** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
App shell on a fixed 720x440 canvas: sidebar, header with team avatars, three stat cards and progress panels.

Brand: Acme (placeholder). Open it full window at `/?template=dashboard`.

## Real files
- `src/pages/Library/templates.tsx  (function DashboardTemplate)`
- `src/pages/Library/templates.css  (Dashboard + shell section)`
- `src/components/Logo/Logo.tsx`
- `src/components/Badge/Badge.tsx`
- `src/components/Progress/Progress.tsx`
- `src/components/Avatar/Avatar.tsx`

Public API: none (static layout).

## What it does
- Sidebar 168px with brand and four links, current page marked with aria-current
- Header with title and an AvatarGroup
- Three stat cards (revenue, active users, errors) with delta badges
- Panel with two Progress bars

## Known gaps
- Numbers are placeholders
- No charts
- Static: navigation is not wired

## How it is wired into the library
- The library entry is `Dashboard` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 27 light probes and 27 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=dashboard&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
