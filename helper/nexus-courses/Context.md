# Nexus courses: Context

> Living document for the **Nexus courses** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Courses tab of a learning app: a Suggested for you lesson card with a purple felt bucket character and two Learn by doing course cards cut off by the tab bar.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/NexusCourses.tsx  (the example shown in the preview)`
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `NexusCanvas`, `NexusStatusBar`, `NexusTabs`, `NexusHomeBar` and the screen pieces (in Nexus.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows: status bar, two headings, suggested card with Lesson 34 chip, title and play button, two course cards (Photography, Financial), tab bar with Courses active, home indicator
- Active tab carries `aria-current="page"`
- Characters are decorative (`aria-hidden`)
- Gesture: Swipe - swipe the screen left or right to go to the next or the previous tab
- Gesture: Pull - pull down to refresh (spinner, toast Up to date)
- Gesture: Long press - press and hold a course card to save it (blue ring, Saved chip)

## Known gaps
- Static replica: no handlers, no state, no animation (as in the image)
- The felt characters are hand-built SVG approximations of the 3D renders; fur texture and shading differ from the image in detail
- Built with the Stitch MCP as a first pass; the image, not the Stitch output, was the source of truth

## How it is wired into the library
- The library entry is `Nexus courses` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 25 light probes and 25 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=nexus-courses&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
