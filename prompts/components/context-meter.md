# ContextMeter

Build a React + TypeScript `<ContextMeter>` component for Devus UI.

## Purpose

A pill with a model select on the left and a thin usage bar with a "132K / 200K" label on the right. The bar is foreground-colored, amber above 70% and red above 90%.

## API

- `used`: `number`
- `total`: `number`
- `models?`: `string[]`
- `model?`: `string`
- `onModelChange(model)`

## Accessibility

- A native select with a hidden label, role="meter" with aria-valuenow and aria-valuetext.

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
