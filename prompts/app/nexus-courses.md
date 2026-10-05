# Nexus courses

Build a React + TypeScript `<NexusCoursesExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Draw only what the image shows.

## Purpose

The Courses tab of the Nexus learning app: a suggested-lesson card with a felt bucket character, and two course cards cut off by the tab bar.

## Layout

Drawn on a 454x982 canvas (`NexusCanvas`, scaled by 320/454 to the phone width). Coordinates are canvas pixels.

- Status bar as on the home screen.
- Heading "Suggested for you" (29px/500) at (19, 105).
- Suggested card (430x400, 40px corners) at (12, 142): lavender-to-white gradient with soft violet clouds; a white 105x35 pill "Lesson 34" at the top left; the purple felt bucket character (tilted, with a handle and two googly eyes); at the bottom a white 402x100 panel with the title "Mastering The Art / Of Handcrafted" (23px/500) and a 50px light-gray round play button at the right.
- Heading "Learn by doing" at (19, 593).
- Two course cards (198 wide, 28px corners, 1px border) at x 20 and x 236, y 628, cut off by the tab bar: a 190x178 rounded image (orange felt camera on peach; green felt character on light green), a gray caption ("Photography" / "Financial", 16px) and a title ("Nature And Wildlife" / "Debt Management", 19px/600).
- Tab bar with Courses active, and the home indicator, as on the home screen.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.
- The felt characters are original SVG (gradient, blurred light and shadow blobs, a displacement filter for the fuzzy edge); do not use image files.

## Accessibility

- The play button has an `aria-label`; the cards are articles or labelled sections.
- The tab bar is a `nav` and the active tab carries `aria-current="page"`.
- The characters are decorative (`aria-hidden`).

## Reference implementation (real files)

- `src/components/AppUI/examples/NexusCourses.tsx` (the example, with its data)
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`nx-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
