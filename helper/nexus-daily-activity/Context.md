# Nexus daily activity: Context

> Living document for the **Nexus daily activity** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Daily activity screen of a learning app: a week strip with Thu 25 selected, a 100 Day Challenge card with a purple felt X and an action panel, and the top of a Science & Engineering card with a green felt character.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/NexusDaily.tsx  (the example shown in the preview)`
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `NexusCanvas({ dim })`, `NexusStatusBar`, `WeekStrip`, `ChallengeCard` and the `Felt*` characters (in Nexus.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows: status bar, heading, week strip with dividers, 100 Day Challenge card with panel and arrow button, Science & Engineering heading and card top; no tab bar
- The arrow button has an `aria-label`
- Characters are decorative (`aria-hidden`)
- Gesture: Swipe - swipe the week strip to move the selected day
- Gesture: Long press - press and hold a challenge card to join it (the chip says Joined)

## Known gaps
- Static replica: no handlers, no state, no animation (as in the image)
- The felt characters are hand-built SVG approximations of the 3D renders; fur texture and shading differ from the image in detail
- The image is slightly grayed, so surfaces use its measured grays (`#eae8e9` background) instead of pure white
- Built with the Stitch MCP as a first pass; the image, not the Stitch output, was the source of truth

## How it is wired into the library
- The library entry is `Nexus daily activity` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 29 light probes and 29 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=nexus-daily-activity&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
