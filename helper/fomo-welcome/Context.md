# Fomo welcome: Context

> Living document for the **Fomo welcome** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A dark green welcome screen for a memecoin trading app called Fomo: round meme avatars on rays around the FOMO logo, a welcome title, a subtitle and two sign-in buttons.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/FomoWelcome.tsx  (the example shown in the preview)`
- `src/components/AppUI/Fomo.tsx`
- `src/components/AppUI/Fomo.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `FomoCanvas` and the screen pieces (in Fomo.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows (see the layout list in the prompt)
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`
- Decorative images use `alt=""`; buttons are real buttons
- Gesture: Gyroscope - tilt the phone and the avatars drift at different depths; a desktop pointer over the phone stands in; iOS gets an Enable tilt button for the permission
- Gesture: Drag - drag any avatar
- Gesture: Flick - let go and it flies off and springs back

## Known gaps
- The avatars are Stitch-generated look-alikes (same subject and framing), not the exact images of the reference
- The heavy rounded font of the reference is approximated with Inter 800/900
- Rays and glow are hand-tuned by eye
- Static replica: no handlers, no state, no animation (as in the image)

## How it is wired into the library
- The library entry is `Fomo welcome` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 8 light probes and 8 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=fomo-welcome&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
