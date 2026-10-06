# Circle editor

Build a React + TypeScript `<CircleEditorExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Draw only what the image shows. Only the screen is built, not the phone bezel.

## Purpose

A video-circle editor: a round recording with a pearly rim and a blue progress arc, two stickers placed on it inside selection frames with count chips, delete buttons, a Pause label and the sticker pack bar at the bottom.

## Layout

Drawn on a 357x773 canvas, scaled to the phone width. Coordinates are canvas pixels.

- Dynamic Island and right status icons as in the Sticker picker. White background.
- Label "Pause" (14px) centered at y 74; small white delete button (30px) at (53, 86).
- Video circle: 330px at (15, 130) (center (180, 295)); a pearly conic-gradient rim 13px wide, the selfie inside, a blue (`#3b8ef0`) 15px round-capped arc from -93 to -54 degrees at the top, and a white rounded-triangle play button in the middle.
- Placed sticker 1: winged heart 135px centered at (68, 173), inside a thin white frame with four blue corner dots (150x150, rotated -6 degrees), chip "x9" at (99, 253).
- Placed sticker 2: egg plate 118px centered at (275, 426), frame 150x140 at (203, 348), chip "x12" at (252, 510); a delete button at (288, 341).
- Bottom bar: white card 352x110 at (3, 638), radius 28, soft shadow, grab handle on top, the three pack tabs (blue selected tile).
- Home indicator black 128x5 at x 115, y 766.

## Assets

The same Stitch-generated stickers and selfie as the Sticker picker (cut out with `cutout.py`), stored in `src/components/AppUI/assets/stickers/`. Do not hotlink images, do not use stock photos; keep the files in the repo. Prompts and the review loop for the images are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.

## Accessibility

- Buttons are real buttons with labels or `aria-label`; decorative images use `alt=""` or `aria-hidden`.

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Drag:** drag a sticker around the circle.
- **Pinch:** two fingers (or ctrl + wheel) resize and rotate the selected sticker.
- **Long press:** press and hold a sticker to place a copy.
- **Scrub:** drag around the blue ring to scrub the video; Left and Right arrows on the play button step by 5 %.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/CircleEditor.tsx` (the example)
- `src/components/AppUI/Stickers.tsx`
- `src/components/AppUI/Stickers.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`sk-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
