# TrackSteps

Build a React + TypeScript `<TrackSteps>` component for Devus UI.

## Purpose

Horizontal progress line with a dot per step: done steps are filled and connected, the active step is filled, the rest are muted.

## API

- `steps`: `{ label, time, state: 'done' | 'active' | 'todo' }[]`

## Accessibility

- Ordered list.
- aria-current='step' on the active step.
- Progress is also conveyed by text and a check mark, not color alone.

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

- **Scrub:** drag along the steps to move the shipment forward or back (Left and Right arrow keys too).

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/TrackingSteps.tsx` (the example, with its data)
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
