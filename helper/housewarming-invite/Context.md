# Housewarming invite: Context

> Living document for the **Housewarming invite** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A party invitation over a blurred teal portrait: title, date and place, an RSVP control (Going / Not Going / Maybe), a host card and a "Scroll Down" chip.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/HousewarmingInvite.tsx  (the example shown in the preview)`
- `src/components/AppUI/Party.tsx`
- `src/components/AppUI/Party.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `Party.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Interactive: The RSVP control is a radio group: tapping an option slides the white pill under it and tints the icon and label
- Interactive: Close, more and the chip press
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`

## Known gaps
- The photo and avatar are Stitch look-alikes, not the exact images
- The chip does not scroll anything (the full post is not in the image)
- Selected colors for Not Going and Maybe are chosen, the image only shows Going selected
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Housewarming invite` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 17 light probes and 17 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=housewarming-invite&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
