# Nexus daily activity

Build a React + TypeScript `<NexusDailyExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Draw only what the image shows.

## Purpose

A "Daily activity" screen of the Nexus learning app: a week strip and two challenge cards with felt characters.

## Layout

Drawn on the same 454x982 canvas as the other Nexus screens (`NexusCanvas dim`, scaled by 320/454 to the phone width). Coordinates are canvas pixels. The image is slightly grayed, so the screen background is `#eae8e9` and the white surfaces are `#efedee` to `#f4f2f2`.

- Status bar as on the other Nexus screens. No tab bar, no home indicator.
- Heading "Daily activity" (27px/500) at left 24, center y 99.
- Week strip (flat): names at y 149, dates at y 173, lotus at y 206; centers x 46, 116, 187, 261, 335, 406. Thu 25 has the gradient lotus and a 1px divider on each side (x 238 and 284, y 144-229).
- Heading "100 Day Challenge" (28px/500) at left 19, center y 283.
- Lavender card (430x400 at (12, 319), 40px corners): white pill "110,732 People" at the top left, the purple felt X character with two googly eyes (centered at about (230, 479), 177 wide), and a white panel (402x100) at the bottom with the title "Applying 'Into Equations' / in problem solving" (22px/500) and a 50px round gray button with a right arrow.
- Heading "Science & Engineering" at left 19, center y 769.
- Top of a second card (light green gradient, at (12, 804)) with a white pill "8,240 People" and the green felt V-shaped character with two googly eyes, cut off by the screen bottom.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.
- The felt characters are original SVG (gradient, blurred light and shadow blobs, a displacement filter for the fuzzy edge); do not use image files.

## Accessibility

- The arrow button has an `aria-label`; the week strip is a group and the selected day carries `aria-current="date"`.
- Cards are labelled sections; the characters are decorative (`aria-hidden`).

## Reference implementation (real files)

- `src/components/AppUI/examples/NexusDaily.tsx` (the example, with its data)
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`nx-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
