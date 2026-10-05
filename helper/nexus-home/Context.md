# Nexus home: Context

> Living document for the **Nexus home** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Home screen of a learning app: header, Enrollment and Lesson Done stat cards, a week strip with Thu 25 selected, a hero card with a blue felt graduation-cap character, and the tab bar.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/NexusHome.tsx  (the example shown in the preview)`
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `NexusCanvas`, `NexusStatusBar`, `NexusTabs`, `NexusHomeBar` and the screen pieces (in Nexus.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows: status bar, logo and name, search and notification buttons, two stat cards with progress rings, six-day week strip, hero card with title and Register Now button, tab bar, home indicator
- Week strip is a group; the selected day has `aria-current="date"`
- Characters and lotus marks are decorative (`aria-hidden`)

## Known gaps
- Static replica: no handlers, no state, no animation (as in the image)
- The felt characters are hand-built SVG approximations of the 3D renders; fur texture and shading differ from the image in detail
- Built with the Stitch MCP as a first pass; the image, not the Stitch output, was the source of truth

## How it is wired into the library
- The library entry is `Nexus home` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 44 light probes and 44 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=nexus-home&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
