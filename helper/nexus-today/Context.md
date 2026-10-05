# Nexus today: Context

> Living document for the **Nexus today** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Today tab of a learning app: header over a peach scene with an orange felt trophy character and a "Challenge!" pill, a two-line title, a week strip, a 100 day challenge heading and the top of a challenge card, with the tab bar (Today active).

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/NexusToday.tsx  (the example shown in the preview)`
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `NexusCanvas({ dim })`, `NexusStatusBar`, `WeekStrip`, `ChallengeCard` and the `Felt*` characters (in Nexus.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows: status bar, header, trophy scene, title, week strip, heading, card top with the 110,732 People pill, tab bar, home indicator
- Week strip is a group; the selected day has `aria-current="date"`
- Characters and lotus marks are decorative (`aria-hidden`)

## Known gaps
- Static replica: no handlers, no state, no animation (as in the image)
- The felt characters are hand-built SVG approximations of the 3D renders; fur texture and shading differ from the image in detail
- The image is slightly grayed, so surfaces use its measured grays (`#eae8e9` background) instead of pure white
- Built with the Stitch MCP as a first pass; the image, not the Stitch output, was the source of truth

## How it is wired into the library
- The library entry is `Nexus today` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 40 light probes and 40 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=nexus-today&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
