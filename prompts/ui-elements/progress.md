# Progress

Build a React + TypeScript `<Progress>` component for Devus UI.

## Purpose

Determinate progress bar with optional label and percentage.

## API

- `value`: `number (0-100, clamped)`
- `label?`: `string`

## Accessibility

- role='progressbar' with aria-valuenow / aria-valuemin / aria-valuemax and an accessible name.

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
