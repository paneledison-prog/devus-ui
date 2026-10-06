# Restoring purchases

Build a React + TypeScript `<RestoringPurchases>` screen for Devus UI, shown in a 320x696 phone frame (`PhoneFrame bare height={696}`), from the reference image. Draw only what the image shows.

## Purpose

A loading screen titled "Restoring Purchases" on a flat sky-blue background, with three plan cards scattered mid-motion above a small clay flower ring, a subtitle and a spinner ring.

## Layout

Drawn on the same 446x970 canvas as the paywall (`PayCanvas`, scaled to the phone width). Coordinates are canvas pixels.

- Background: flat `#62C5FF`. White status bar like the paywall.
- Back chevron: white, about 14x22, centered at x 35, y 95.
- Plan cards (white, 393x81, 30px corners, soft blue-tinted shadow), tilted and cropped by the screen edges. From back to front:
  1. A card on the right edge, rotated -8 degrees, behind the others; only the end of its price ("9/m") shows.
  2. A card rotated 7.6 degrees, extending off the left edge, showing only "$5.99/month" (17px/600 black).
  3. "Monthly" card rotated -15 degrees, cropped by the right edge: empty gray ring, "Monthly", "$59.99/year" in gray.
  4. "Annual" card, rotated 1.5 degrees, fully visible, in front: black check circle, "Annual", "$35.99 /year" in gray, price "$2.99/month" 17px/600.
- Clay flower ring: small white/cream clay flower-shaped frame with a tilted rounded-square hole, about 112px, centered at x 220, y 616.
- Title: "Restoring Purchases", white, 28px/34px, weight 600, centered at y 728.
- Subtitle: "Just a sec - restoring" / "what's yours" (with an em dash), white at 60%, 17px/22px, centered at y 770 and 792.
- Spinner ring: about 36px, centered at x 222, y 859. A full muted ring (white at 30%) with a white arc (about 110 degrees) that turns on top of it. The arc turns continuously (one turn per second, slowed to 2.8s when reduced motion is requested); this is the only motion on the screen.
- Home indicator: 154x5 white bar at the bottom center.

## Rules

- Draw only the elements in the image. No extra content, states or flows. The only motion is the spinner turning (added at the user's request).
- Text is exactly as in the image.
- The artwork is original SVG; do not use image files.

## Accessibility

- The back control is a button with `aria-label`; the spinner has `role="status"` and a label.
- The cards and artwork are decorative (`aria-hidden`).
- Text is white on `#62C5FF`; the large title meets 3:1, the smaller subtitle is the image's own 60% white and is below AA, as in the reference.

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Swipe:** swipe the screen to the right to go back to the paywall.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/RestoringPurchases.tsx` (the example, with its data)
- `src/components/AppUI/Paywall.tsx`
- `src/components/AppUI/Paywall.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`pw-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
