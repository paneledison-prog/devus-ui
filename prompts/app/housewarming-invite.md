# Housewarming invite

Build a React + TypeScript `<HousewarmingInviteExample>` screen for Devus UI, shown in a 320x697 phone frame (`PhoneFrame bare height={697}`), from the reference image. Only the screen is built, not the phone bezel. The screen is interactive (see below), but it must not add elements that are not needed for those interactions.

## Purpose

A party invitation over a blurred teal portrait: title, date and place, an RSVP control (Going / Not Going / Maybe), a host card and a "Scroll Down" chip.

## Layout

Canvas: 517x1126, scaled to the phone width. Coordinates are canvas pixels.

- Blurred teal photo background with a darkening gradient from y 520 to the bottom; Dynamic Island 160x47 at (176, 14); close and more buttons (56px, translucent white) at (25, 86) and (435, 86).
- Title "Housewarming / Party" 47px/600 centered, lines at y 524 and 568; date lines "19 September, 12 pm", "1559 Airdubon Ave"-style address "1559 Audubon Ave", "New York, NY" 20px at 60% white, y 617-669.
- RSVP control: 461x68 pill at (30, 699), translucent dark. Options Going (green check), Not Going, Maybe (gray icons, 18px labels); the selected option sits in a white pill (Going is selected in the image).
- Host card: 468x244 at (25, 793), 32px corners, translucent: memoji avatar 52px, "Hosted by Andre Lorico" in lavender 18px, three centered lead lines 18px white, three smaller lines 17px at 82% white.
- Chip "Scroll Down to see full post" with a double-chevron circle, 256x30 at (131, 1060). Home indicator white 172x6.

## Interaction

- The RSVP control is a radio group: tapping an option slides the white pill under it and tints the icon and label
- Close, more and the chip press
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state, and a visible focus ring. Animations respect `prefers-reduced-motion`.

## Assets

A motion-blurred portrait background and a 3D memoji host avatar generated with the Stitch MCP, in `src/components/AppUI/assets/party/`. Do not hotlink images or use stock photos. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Reference implementation (real files)

- `src/components/AppUI/examples/HousewarmingInvite.tsx` (the example)
- `src/components/AppUI/Party.tsx`
- `src/components/AppUI/Party.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`pt-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
