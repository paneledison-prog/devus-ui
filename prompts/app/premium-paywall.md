# Premium paywall

Build a React + TypeScript `<PremiumPaywall>` screen for Devus UI, shown in a 320x696 phone frame (`PhoneFrame bare height={696}`), from the reference image. Draw only what the image shows.

## Purpose

A subscription paywall titled "Level Up with Premium": a sky-blue hero with soft 3D clay artwork, a "Restore Purchases" row on a black strip, and a white bottom sheet with two plans, a "Start Free Trial" button and a "Terms of Service" link.

## Layout

The screen is drawn on a 446x970 canvas (`PayCanvas`) that is scaled to the phone width (zoom 320/446). Coordinates below are canvas pixels.

- Status bar (white): "9:41" at x 59, signal, Wi-Fi and battery icons on the right.
- Hero: 446x612, color `#62C5FF`, bottom corners 56px.
- Clay cloud: soft white/cream cloud with two lobes hanging from the top edge (x 81 to 356, down to y about 133), cropped by the top.
- Close button: 44px circle, white at 22% opacity, white X, at left 22 and top 81.
- Title: "Level Up" / "with Premium", white, centered, 30px/36px, weight 600 (lines centered at y 221 and 257).
- Subtitle: "Because basic just" / "isn't enough.", white at 60%, centered, 17px/22px (lines centered at y 294 and 316).
- Clay ring: a light-blue clay cloud-shaped ring (bumpy rounded frame with a square hole), x 16 to 432, from y 389, cropped by the bottom of the hero.
- Strip: `#191919` under the hero; centered "Restore Purchases" in white, 17px/500, with a 24px sky-blue circle holding a white up arrow (row centered at y 644).
- Sheet: white, top at y 675, top corners 48px.
  - Annual (selected): black 24px circle with a white check at x 25, "Annual" 17px/500, "$35.99 /year" 14px gray followed by "$69.99" struck through in light blue, price "$2.99/month" 17px/600 right-aligned 27px from the edge.
  - Monthly: empty 24px ring in light gray, "Monthly", "$59.99/year", price "$5.99/month".
  - Button: 393x53 pill at left 27, top 835, `#62C5FF`, "Start Free Trial" white 17px/600.
  - Link: "Terms of Service", 16px gray `#8E8E93`, centered at y 912.
- Home indicator: 154x5 near-black bar at the bottom center.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation.
- Text is exactly as in the image.
- The clay artwork is original SVG (layered gradients clipped to the shapes); do not use image files.

## Accessibility

- The close, restore, trial and terms controls are buttons with visible names (the close button has `aria-label`).
- Each plan row has an `aria-label` that states its name, price and whether it is selected.
- The artwork is `aria-hidden`.

## Design tokens

Colors on this screen are fixed by the image (`#62C5FF`, `#191919`, white, grays); fonts use the library `--font-sans` (Inter).

## Reference implementation (real files)

- `src/components/AppUI/examples/PremiumPaywall.tsx` (the example, with its data)
- `src/components/AppUI/Paywall.tsx`
- `src/components/AppUI/Paywall.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`pw-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
