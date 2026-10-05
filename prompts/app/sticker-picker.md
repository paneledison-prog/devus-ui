# Sticker picker

Build a React + TypeScript `<StickerPickerExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Draw only what the image shows. Only the screen is built, not the phone bezel.

## Purpose

A camera screen with a sticker sheet: the photo is blurred behind a white sheet that shows three sticker packs, four stickers, a "stickers" title and a close button.

## Layout

Drawn on a 357x773 canvas, scaled to the phone width. Coordinates are canvas pixels.

- Dynamic Island 111x33 at (123, 11); signal, wifi and battery at x 259-329, y 22 (no time, as in the image).
- Behind: the selfie photo blurred (22px) under a gray-lavender veil, filling the top 380px.
- Sheet: white, 353 wide, top corners 36px, from y 346 to the bottom. Grab handle 34x5 above it at x 160.
- Pack row: a pale pill 327x88 at (15, 366) with three tabs; the first (rainbow) is selected: a blue gradient tile 103x80 with a soft blue shadow; the others show the egg plate and the autumn leaves.
- Stickers (about 118px): rainbow (97, 513), beer mug (245, 533), peace hand (107, 638), winged heart (260, 643).
- Title "stickers": italic serif 36px at (21, 727). Close button: 34px circle, blue 2.5px ring, light-blue fill, blue x, at (306, 727).
- Home indicator black 128x5 at x 115, y 766.

## Assets

Six sticker images (rainbow, fried egg and sausage, autumn leaves, beer mug, peace hand, winged heart) and a selfie photo, generated with the Stitch MCP on a flat gray background, then cut out and given a white outline by `.claude/skills/stitch-image-assets/cutout.py`. Stored in `src/components/AppUI/assets/stickers/`. Do not hotlink images, do not use stock photos; keep the files in the repo. Prompts and the review loop for the images are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.

## Accessibility

- Buttons are real buttons with labels or `aria-label`; decorative images use `alt=""` or `aria-hidden`.

## Reference implementation (real files)

- `src/components/AppUI/examples/StickerPicker.tsx` (the example)
- `src/components/AppUI/Stickers.tsx`
- `src/components/AppUI/Stickers.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`sk-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
