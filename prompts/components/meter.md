# Meter

Build a React + TypeScript `<Meter>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a labelled gauge for a known quantity (storage, quota). Thin rounded track, accent fill that turns amber above 70% and red above 90%, value shown on the right.

## API

- `label`: `string`
- `value`: `number`
- `max?`: `number`

## Accessibility

- Meter from react-aria-components: role="meter" with aria-valuenow, aria-valuemin, aria-valuemax and a readable valueText.

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
