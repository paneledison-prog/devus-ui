# Book onboarding flow

Build a React + TypeScript `<BookOnboardingFlowExample>` for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference images. This is a real flow: every screen shown in the references exists, and the controls move between them and change state. Only screens are built, not phone bezels.

## Purpose

A three-step onboarding flow for a book summaries app: a Learn Smarter intro over a wall of covers, a topic picker with a progress bar, and a book-by-book "Are you interested?" step.

## Layout

Canvas: 390x843, scaled to the phone width. Coordinates are canvas pixels.

- White screens; black 57px pill buttons; segmented progress bar at y 80; a centered tag pill ("Profile", "Like time").
- Intro: a wall of covers fading to white, a white round logo button, "Learn Smarter Not Longer", copy, a three-dot pager and Continue.
- Topics: "What Topics Interest You Most?", ten two-per-row topic chips (selected chips are black with a check) and Continue.
- Interested: a stack of three covers (the center one raised in a white card), a pager and No / Yes buttons.

## Flow

- Intro: the pager dots select; Continue opens Topics
- Topics: chips toggle (at least one is needed to continue); Continue opens the book step
- Book step: Yes or No moves to the next of three books and fills the progress bar; after the last book the flow returns to the intro
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state and a visible focus ring. Screen changes animate and respect `prefers-reduced-motion`.

## Assets

No image assets: the covers are original CSS and SVG artwork that use real titles and authors as text only. 

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Swipe:** swipe the intro left or right to change the page dot.
- **Drag:** drag the book card; a green ring means Yes, a red ring means No, and the card tilts with the finger.
- **Flick:** a quick flick of the card counts even when the drag is short.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/BookOnboardingFlow.tsx` (the example)
- `src/components/AppUI/Books.tsx`
- `src/components/AppUI/Books.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`bk-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
