# Call flow: Context

> Living document for the **Call flow** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
An iOS in-call screen with a running timer and six round controls, extended into a small flow: In call -> Keypad (dial pad with typed digits) and In call -> Call Ended -> back to the call.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/CallFlow.tsx  (the example shown in the preview)`
- `src/components/AppUI/Call.tsx`
- `src/components/AppUI/Call.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `Call.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Interactive: The timer counts up every second
- Interactive: Speaker and Mute toggle (white disc)
- Interactive: Keypad opens a dial pad; digits appear at the top; Hide returns
- Interactive: End shows "Call Ended" with dimmed controls, then returns to the call after 2.6 seconds
- Interactive: FaceTime and Add press only (their destinations are not in the image)
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`

## Known gaps
- The keypad and call-ended views are not in the image; they were added as the requested flow in the same style
- The 5G icon cluster is approximated
- Font is Inter, not SF Pro
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Call flow` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 22 light probes and 22 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=call-flow&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
