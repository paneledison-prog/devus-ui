# MagneticDock

Build a React + TypeScript `<MagneticDock>` component for Devus UI.

## Purpose

A floating rounded dock of icon buttons. Icons grow smoothly (up to about 1.7x) as the pointer gets close, falling off with a Gaussian curve, and a label appears above the largest one. The selected item shows a dot below it. Keyboard focus enlarges the focused icon. No scaling when reduced motion is requested.

## API

- `items`: `{ id`
- `label`
- icon }[]
- `onSelect?(id)`

## Accessibility

- role="toolbar", each item is a real button with aria-label and aria-pressed.

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

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
