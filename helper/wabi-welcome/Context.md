# Wabi welcome: Context

> Living document for the **Wabi welcome** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A white welcome screen for a personal software platform called Wabi: a cluster of glass spheres holding photos with a plus button, a three-line pitch and Continue with Google / Apple buttons. It is a cropped screenshot, so the status bar is cut off at the top (a TestFlight back label and the lower edge of the signal and battery icons).

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/WabiWelcome.tsx  (the example shown in the preview)`
- `src/components/AppUI/Wabi.tsx`
- `src/components/AppUI/Wabi.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `WabiCanvas` and the screen pieces (in Wabi.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows (see the layout list in the prompt)
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`
- Decorative images use `alt=""`; buttons are real buttons
- Gesture: Gyroscope - tilt the phone and the spheres drift at different depths; a desktop pointer stands in; iOS gets an Enable tilt button
- Gesture: Drag - drag any sphere
- Gesture: Flick - let go and it flies off and springs back
- Gesture: Pinch - two fingers (or ctrl + wheel) zoom the whole field; it eases back when released

## Known gaps
- The sphere photos are Stitch-generated look-alikes (same subjects), not the exact images of the reference
- Glass rims and highlights are CSS approximations of the 3D bubbles
- Font is Inter, not the original grotesque
- Static replica: no handlers, no state, no animation (as in the image)

## How it is wired into the library
- The library entry is `Wabi welcome` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 19 light probes and 19 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=wabi-welcome&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
