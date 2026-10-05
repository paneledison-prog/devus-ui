# Nexus home

Build a React + TypeScript `<NexusHomeExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Draw only what the image shows.

## Purpose

The home screen of a learning app named Nexus: header, two stat cards, a week strip, and a hero card with a felt graduation-cap character.

## Layout

Drawn on a 454x982 canvas (`NexusCanvas`, scaled by 320/454 to the phone width). Coordinates are canvas pixels.

- Status bar: dark "9:41" at left, signal, wifi and battery at right.
- Header: 42px blue-to-purple gradient circle with a white three-blade lotus at (40, 96); "Nexus" 30px/500 at x 75; outline search icon at (368, 95); gray rounded-square icon button with a small notification dot at (420, 95).
- Stat cards (198x111, 28px corners, 1px `#eceef2` border, soft shadow) at x 20 and x 236, y 145: icon and label ("Enrollment" / "Lesson Done", 18px gray), value row ("86 Video" with a large bold number and a small unit; "8h 35m" the same way) and a 30px progress ring at the right (green arc on the first, blue on the second).
- Week strip at y 290: Mon 22, Tue 23, Wed 24, Thu 25, Fri 26, Sat 27 (name 17px gray over a 24px/600 date, a faded lotus below). Thu 25 sits in a 60x100 white card with a 1px light border and a blue-purple gradient lotus.
- Hero card (430x421, 40px corners) at (12, 424): pale-blue gradient with soft blue clouds, the blue felt graduation-cap character with two googly eyes and a few white spark lines, the centered title "Create a consistent / learning routine" (31px/500, two lines) and a white 386x52 pill "Register Now".
- Tab bar from y 869 (1px top border): Home (active, gradient icon and label), Courses, Today, Profile, More; 26px icons, 17px labels, centers at x 50, 138, 227, 315, 404.
- Home indicator: 155x5 dark bar at the bottom center.

## Rules

- Draw only the elements in the image. No extra content, states, flows or animation; the screen is a static replica.
- Text is exactly as in the image.
- The felt characters are original SVG (gradient, blurred light and shadow blobs, a displacement filter for the fuzzy edge); do not use image files.

## Accessibility

- Search and notification are buttons with `aria-label`; stat cards are labelled sections; the week strip is a group and the selected day carries `aria-current="date"`.
- The tab bar is a `nav` and the active tab carries `aria-current="page"`.
- The characters and lotus marks are decorative (`aria-hidden`).

## Reference implementation (real files)

- `src/components/AppUI/examples/NexusHome.tsx` (the example, with its data)
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`nx-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
