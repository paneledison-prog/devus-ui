# Orb profile

Build a React + TypeScript `<OrbProfile>` screen for Devus UI, shown in a 320x694 phone frame (`PhoneFrame bare height={694}`), from the reference image. Only the screen is built, not the phone bezel. The screen is interactive (see below), but it must not add elements that are not needed for those interactions.

## Purpose

A social profile over a full-bleed photo: three floating badges, a round avatar, name, counts, bio, two chips, friend and club stacks, and a Friends button.

## Layout

Canvas: 825x1790, scaled to the phone width. Coordinates are canvas pixels.

- Full-bleed hero photo with a frosted gray blur fading in from y 900 to the bottom; Dynamic Island 262x76 at (282, 12); round close and more buttons (88px, translucent gray) at (34, 118) and (621, 118); URL "orb.club/@evelynsmith" in white at 50% centered at y 162.
- Badges (white 6px outline, soft shadow): "Orb Featured" a rotated rounded square (purple-to-red gradient, stacked blocks icon) at (134, 394); "Top Artist" a scalloped gray blob with an orange flame at (288, 329); "Top Collector" a blue-to-red ellipse with a white lightning bolt at (674, 343); labels 26px white under each.
- Avatar circle 300px at (262, 802). Name "Evelyn Smith" 48px/600 centered at y 1158; stats "2,425 Followers  377 Follow  14 Clubs" 28px at y 1214; bio 2 lines 27px at 55% white at y 1267 and 1302.
- Chips: "ABOUT" (x 163, 164 wide) and "EVELYNSMITH.COM" (x 339, 322 wide), 52px high, translucent, with an info and a globe icon, y 1339.
- Friends stack: three 90px circles plus a white "+33" circle at (140, 1424); label "friends follow". Clubs stack: three rounded squares plus a white "+2" square at (437, 1424); label "mutual clubs".
- Friends button: translucent pill 758x95 at (34, 1607), person-check icon and "Friends" 38px/600. Home indicator white 281x12.

## Interaction

- Badges pop when tapped
- Close, more and the chips press
- The Friends button toggles to "Add Friend" (white pill) and back
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state, and a visible focus ring. Animations respect `prefers-reduced-motion`.

## Assets

Eight images generated with the Stitch MCP (hero photo of a woman in wraparound sunglasses, round avatar photo, three friend avatars, three club logos), in `src/components/AppUI/assets/orb/`. Do not hotlink images or use stock photos. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Gyroscope:** tilt the phone and the photo and the three badges drift at different depths; a desktop pointer stands in; iOS gets an Enable tilt button.
- **Swipe:** swipe the screen down (or tap close) to dismiss it; a button reopens it.
- **Long press:** press and hold the avatar to enlarge it; tap to close.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/OrbProfile.tsx` (the example)
- `src/components/AppUI/Orb.tsx`
- `src/components/AppUI/Orb.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`ob-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
