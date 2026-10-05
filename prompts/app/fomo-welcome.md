# Fomo welcome

Build a React + TypeScript `<FomoWelcomeExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Draw only what the image shows. Only the screen is built, not the phone bezel.

## Purpose

A dark green welcome screen for a memecoin trading app called Fomo: round meme avatars on rays around the FOMO logo, a welcome title, a subtitle and two sign-in buttons.

## Layout

Drawn on a 473x1023 canvas, scaled to the phone width. Coordinates are canvas pixels.

- Background: near-black radial center (`#050806`) fading to deep green (`#0c2a1e`) at the bottom, with 24 thin olive rays fanning out from (237, 376).
- Avatars (circles with a white ring and a black outer ring, soft shadow): cowboy (236, 175, r 51), screaming cat (30, 380, r 37, cropped by the left edge), cobra (430, 380, r 41), duck (380, 520, r 39), brown creature (236, 582, r 63). Blurred, ringless: frog (93, 235, r 45), mushroom (380, 235, r 40), small teal glow (91, 524). Large and cropped by the edges: dog (top center, r 100), astronaut cat (left, r 88), anime girl (right, r 100), red circles with a golden figure at the bottom left and bottom right.
- Logo "FOMO": heavy white italic, about 88px, centered at y 376.
- Title "Welcome to Fomo": white, 40px/800, centered at y 707. Subtitle "Trade the hottest memecoins": 23px/500, `#7c9184`, centered at y 760.
- Button "Continue with Apple": white pill 385x67 at (44, 805), black Apple mark and label 23px/800. Button "Continue with Phone": 385x67 at (44, 887), white at 9% over the dark background, white label.
- Status bar "1:43" with signal, wifi and battery; white home indicator 167x6 at the bottom center.

## Assets

Eleven avatar images generated with the Stitch MCP (groundhog in a cowboy hat, meme frog, mushroom, screaming cat, blue cobra, rubber duck, brown creature, astronaut cat, anime girl, cartoon dog, golden figure), stored in `src/components/AppUI/assets/fomo/`. Do not hotlink images, do not use stock photos; keep the files in the repo. Prompts and the review loop for the images are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.

## Accessibility

- Buttons are real buttons with labels or `aria-label`; decorative images use `alt=""` or `aria-hidden`.

## Reference implementation (real files)

- `src/components/AppUI/examples/FomoWelcome.tsx` (the example)
- `src/components/AppUI/Fomo.tsx`
- `src/components/AppUI/Fomo.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`fm-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
