# Call flow

Build a React + TypeScript `<CallFlowExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Only the screen is built, not the phone bezel. The screen is interactive (see below), but it must not add elements that are not needed for those interactions.

## Purpose

An iOS in-call screen with a running timer and six round controls, extended into a small flow: In call -> Keypad (dial pad with typed digits) and In call -> Call Ended -> back to the call.

## Flow

This item is a small flow, not a single screen: An iOS in-call screen with a running timer and six round controls, extended into a small flow: In call -> Keypad (dial pad with typed digits) and In call -> Call Ended -> back to the call.

## Layout

Canvas: 923x1996, scaled to the phone width. Coordinates are canvas pixels.

- Warm gray-brown vertical gradient (`#5d5d5c` to `#4a3a37`). Status bar "11:00" at x 88, Dynamic Island 421x85 at (242, 27) with a green link icon, signal bars, "5G", a gray battery pill "55" and an orange dot. Waveform+record icon at (46, 156) and an info circle at (855, 180).
- Timer "03:36" 50px at 62% white centered at y 290; name "Mimi" 80px/700 centered at y 372.
- Controls: 183px circles in three columns (centers x 185, 461, 737), rows at y 1437 and 1730; translucent white at 20%. Row 1: Speaker (selected: white disc, black icon), FaceTime, Mute. Row 2: Add, End (red `#ff453a`), Keypad. Labels 36px.
- Keypad view: typed digits at y 560 (76px), a 3x4 dial pad of 183px circles with letters, End at the bottom center and a "Hide" link at the right. Call Ended view: the timer reads "Call Ended" and the controls dim.
- Home indicator white 330x12 at (297, 1966).

## Interaction

- The timer counts up every second
- Speaker and Mute toggle (white disc)
- Keypad opens a dial pad; digits appear at the top; Hide returns
- End shows "Call Ended" with dimmed controls, then returns to the call after 2.6 seconds
- FaceTime and Add press only (their destinations are not in the image)
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state, and a visible focus ring. Animations respect `prefers-reduced-motion`.

## Assets

No image assets (all icons are SVG). Do not hotlink images or use stock photos. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Reference implementation (real files)

- `src/components/AppUI/examples/CallFlow.tsx` (the example)
- `src/components/AppUI/Call.tsx`
- `src/components/AppUI/Call.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`cl-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
