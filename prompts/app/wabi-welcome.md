# Wabi welcome

Build a React + TypeScript `<WabiWelcomeExample>` screen for Devus UI, shown in a 320x640 phone frame (`PhoneFrame bare height={640}`), from the reference image. Draw only what the image shows. Only the screen is built, not the phone bezel.

## Purpose

A white welcome screen for a personal software platform called Wabi: a cluster of glass spheres holding photos with a plus button, a three-line pitch and Continue with Google / Apple buttons. It is a cropped screenshot, so the status bar is cut off at the top (a TestFlight back label and the lower edge of the signal and battery icons).

## Layout

Drawn on a 736x1472 canvas, scaled to the phone width. Coordinates are canvas pixels.

- Logo: five overlapping light-gray circles (96x60) centered at (368, 112).
- Spheres (circle crop of a photo with a white rim, soft inner shading and a highlight), cropped by the edges: jumping woman (685, 288, r 64), swirl (105, 360, r 92), iridescent (62, 452, r 94), neon mushroom (265, 402, r 72), rainbow vase (403, 372, r 68), ball (630, 365, r 62), sunglasses (722, 416, r 50), hills (190, 476, r 76), teal marble (355, 436, r 60), hikers (503, 410, r 82), dalmatian (43, 556, r 62), smoke (142, 578, r 50), glass flower (278, 555, r 102), laughing man (646, 532, r 112), headphones woman (460, 552, r 118).
- Plus button: white circle 132px centered at (368, 670) with a soft shadow, a gray reflection at its top and a dark plus.
- Pitch: "Meet Wabi. / The first personal / software platform." 54px/500, line height 70, centered at x 368, first line at y 810.
- Button "Continue with Google": `#fafafa` pill 648x100 at (44, 1222) with soft shadow, Google mark at the left, label 27px/500. Button "Continue with Apple": `#2b2b2b` pill 648x100 at (44, 1345), white Apple mark and label.

## Assets

Fifteen sphere images generated with the Stitch MCP (swirl, iridescent glass, neon mushroom, hills, teal marble, rainbow vase, hikers, woman with headphones, laughing man, glass flower, dalmatian, smoke, jumping woman, sunglasses, glossy ball), stored in `src/components/AppUI/assets/wabi/`. Do not hotlink images, do not use stock photos; keep the files in the repo. Prompts and the review loop for the images are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.

## Accessibility

- Buttons are real buttons with labels or `aria-label`; decorative images use `alt=""` or `aria-hidden`.

## Reference implementation (real files)

- `src/components/AppUI/examples/WabiWelcome.tsx` (the example)
- `src/components/AppUI/Wabi.tsx`
- `src/components/AppUI/Wabi.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`wb-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
