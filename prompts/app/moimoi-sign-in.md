# Moimoi sign in

Build a React + TypeScript `<MoimoiSignInExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Draw only what the image shows. The real phone bezel in the image is not part of the design: only the screen is built.

## Purpose

A playful sign-in screen for an app called moimoi: a big wordmark, six round characters and two sign-in buttons.

## Layout

Drawn on a 558x1208 canvas (`MoimoiCanvas`, scaled by 320/558 to the phone width). Coordinates are canvas pixels.

- Screen background: a vertical gradient from `#f5f1fb` (top) through `#e9f2fb` to `#dcefff` down to y 758, then a flat warm `#f6f3ef` panel to the bottom.
- Dynamic Island: black pill 176x52 at (190, 16) with a camera dot. Status bar: "9:41" bold 25px at x 72; signal, wifi and battery ending at x 510.
- Wordmark "moimoi": heavy rounded black letters built from 27px strokes, x 7 to 525, baseline y 220, x-height 79; the two `i` dots at (248, 121) and (511, 121).
- Six round characters with soft gradients and a soft drop shadow, cropped by the screen edges: lime green (center (44, 382), r 88) with a winking eye, a smile and a black hair curve; small pink (242, 298, r 49) with two dash eyes; coral red (463, 379, r 93) with two eyes, an open smile and a hair curve with a loop; blue (75, 626, r 133) with two big eyes, a smile and a thick hair curve; yellow (450, 638, r 120) with a big eye, a winking eye, a smile and two hair strokes; small orange (253, 698, r 41) wearing round glasses with a small "o" mouth and three motion marks.
- Loose black lines: a loop around the green character, and a long swoosh from the green one over the pink one to the coral one.
- A tiny pink sprout character with two short black marks at (220, 450).
- A black speech bubble "Hello~" (white, 35px, weight 800), rotated -14 degrees, centered at (310, 514).
- Lead text "Sign in to get started" (22px, `#4a4a4c`) centered at y 828.
- Button "Sign in with Google": white, 468x70, fully rounded, soft shadow, at (33, 876); Google mark and label 25px/600.
- Button "Sign in with Apple": black, 468x69, fully rounded, at (33, 980); Apple mark and white label 25px/600.
- Home indicator: black 198x6 bar centered at y 1193.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.
- All artwork is original SVG; do not use image files. No Stitch assets were needed.

## Accessibility

- The wordmark is an SVG with `role="img"` and an `aria-label`; the characters are decorative (`aria-hidden`).
- The two sign-in buttons are real buttons with visible labels.

## Reference implementation (real files)

- `src/components/AppUI/examples/MoimoiSignIn.tsx` (the example)
- `src/components/AppUI/Moimoi.tsx`
- `src/components/AppUI/Moimoi.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`mm-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
