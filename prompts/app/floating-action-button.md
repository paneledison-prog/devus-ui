# Fab

Build a React + TypeScript `<Fab>` component for Devus UI.

## Purpose

Round primary action button that floats above content; accent or dark tone; extended pill when it has a label.

## API

- `icon?`: `ReactNode (defaults to a plus)`
- `label?`: `string`
- `tone?`: `'accent' | 'dark'`
- `all native button props`

## Accessibility

- Icon-only FAB has aria-label='Create' by default.
- 52px target.
- Press feedback scales to 94%.

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

- **Drag:** drag the buttons anywhere; they spring back to the dock.
- **Flick:** flick them left or right to move the dock to the other side.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/FloatingActionButton.tsx` (the example, with its data)
- `src/components/AppUI/Fab.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
