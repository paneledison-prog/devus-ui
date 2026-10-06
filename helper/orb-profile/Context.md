# Orb profile: Context

> Living document for the **Orb profile** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A social profile over a full-bleed photo: three floating badges, a round avatar, name, counts, bio, two chips, friend and club stacks, and a Friends button.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/OrbProfile.tsx  (the example shown in the preview)`
- `src/components/AppUI/Orb.tsx`
- `src/components/AppUI/Orb.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `Orb.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Interactive: Badges pop when tapped
- Interactive: Close, more and the chips press
- Interactive: The Friends button toggles to "Add Friend" (white pill) and back
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`
- Gesture: Gyroscope - tilt the phone and the photo and the three badges drift at different depths; a desktop pointer stands in; iOS gets an Enable tilt button
- Gesture: Swipe - swipe the screen down (or tap close) to dismiss it; a button reopens it
- Gesture: Long press - press and hold the avatar to enlarge it; tap to close

## Known gaps
- The photos are Stitch look-alikes, not the exact images
- The frosted bottom is a blurred copy of the hero photo under gradients
- Badge artwork is hand-drawn SVG approximating the 3D badges
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Orb profile` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 23 light probes and 23 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=orb-profile&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
