# StoryRow

Build a React + TypeScript `<StoryRow>` component for Devus UI.

## Purpose

Horizontally scrolling row of avatars with a gradient ring for unseen stories and a muted ring once seen.

## API

- `stories`: `{ name, initials, seen? }[]`

## Accessibility

- A list of buttons.
- Each has an accessible name that says whether the story is new.
- The ring is decorative.

## Design tokens

Use the Devus UI tokens from `src/styles/tokens.css` (CSS variables).

| Group | Tokens |
| --- | --- |
| Colors | `--accent`, `--default`, `--danger`, `--surface`, `--foreground`, `--muted`, `--separator` |
| Radii | `--radius-3xl` (pills, cards), `--radius-field` |
| Spacing | 4px scale, `--space-*` |
| Type | Inter |
| Focus | `--focus-ring` |
| Themes | `[data-theme="light"]` and `[data-theme="dark"]` |

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Pan:** pan the row sideways (seven stories).
- **Long press:** press and hold a story to mark it as new again; a tap marks it seen.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/StoryRings.tsx` (the example, with its data)
- `src/components/AppUI/StoryRing.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
