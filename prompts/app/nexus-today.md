# Nexus today

Build a React + TypeScript `<NexusTodayExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Draw only what the image shows.

## Purpose

The Today tab of the Nexus learning app: a peach scene with an orange felt trophy character, a title, a week strip and a challenge card cut off by the tab bar.

## Layout

Drawn on the same 454x982 canvas as the other Nexus screens (`NexusCanvas dim`, scaled by 320/454 to the phone width). Coordinates are canvas pixels. The image is slightly grayed, so the screen background is `#eae8e9` and the white surfaces are `#efedee` to `#f4f2f2`.

- Status bar and header (logo, "Nexus", search, icon button) as on the other Nexus screens, over a soft peach gradient that fades to the gray background by y 650.
- Orange felt trophy character (bowl with a darker rim, two handles, stem, round base, two googly eyes looking up-left) spanning x 103-367, y 157-421, with a white pill "Challenge!" (party icon, 19px, 141x37) at (34, 309), three short orange spark lines at its right and two small white dots under the bowl.
- Title "Focusing on two key / challenges", 34px/42px weight 500, left 19, line centers y 493 and 535.
- Week strip (flat, no card): names (14px, faded) at y 598, dates (20px/500) at y 621, faded lotus at y 656; centers x 40, 111, 182, 256, 330, 401. Thu 25 has the blue-purple lotus.
- Heading "100 day challenge" (27px/500) at left 19, center y 731.
- Top of a lavender card (430x400 at (12, 767)) with a white pill "110,732 People" (16px, 29px high) at its top left and the tops of the purple felt X arms; the card is cut off by the tab bar.
- Tab bar from y 869 with Today active (gradient calendar icon and label), and the home indicator.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.
- The felt characters are original SVG (gradient, blurred light and shadow blobs, a displacement filter for the fuzzy edge); do not use image files.

## Accessibility

- Search and notification are buttons with `aria-label`; the week strip is a group and the selected day carries `aria-current="date"`.
- The tab bar is a `nav` and the active tab carries `aria-current="page"`.
- The characters and lotus marks are decorative (`aria-hidden`).

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Swipe:** swipe the screen left or right to change tab; swipe the week strip to move the selected day.
- **Pull:** pull down to refresh.
- **Long press:** press and hold a challenge card to join it.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/NexusToday.tsx` (the example, with its data)
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`nx-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
