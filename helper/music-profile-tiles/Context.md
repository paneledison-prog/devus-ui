# Music profile tiles: Context

> Living document for the **Music profile tiles** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
The long tile variant of the music profile page: a "Вечер с лапшой" banner, profile and СберПрайм tiles, count tiles, notifications, a listening-hours card, a 12-slot achievements grid, settings controls and a kids-mode switch.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/MusicProfileTiles.tsx  (the example shown in the preview)`
- `src/components/AppUI/Music.tsx`
- `src/components/AppUI/Music.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `Music.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Interactive: The page scrolls
- Interactive: The kids-mode switch toggles
- Interactive: Controls (HiFi, loop, moon, sun) behave as a one-of-four selector
- Interactive: Achievements select
- Interactive: Notification rows select and the pause button toggles
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`

## Known gaps
- Pictures are Stitch look-alikes (the achievement shapes repeat across slots)
- Russian strings are transcribed from a small image
- Spacing is tuned by eye
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Music profile tiles` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 55 light probes and 55 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=music-profile-tiles&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
