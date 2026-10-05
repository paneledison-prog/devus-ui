# Tooltip

Build a React + TypeScript `<Tooltip>` component for Devus UI.

## Purpose

A tooltip with a bold title, an optional dimmer description and an optional keyboard shortcut chip, in a foreground-colored bubble with a small arrow. Opens after a short delay on hover or focus and closes on leave, blur or Escape.

## API

- `title`: `string`
- `description?`: `string`
- `shortcut?`: `string`
- `side?`: `"top" | "bottom"`
- `delay?`: `number`
- `children`: `ReactNode`

## Accessibility

- role="tooltip", aria-describedby on the trigger only while open, works with keyboard focus.

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
