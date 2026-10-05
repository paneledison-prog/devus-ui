# Checkbox

Build a React + TypeScript `<Checkbox>` component for Devus UI.

## Purpose

Boolean input with checked, indeterminate and disabled states.

## API

- `All native input props plus label?`: string and indeterminate?: boolean (synced to the DOM property)

## Accessibility

- Native checkbox wrapped in a `<label>`, so the label click toggles it.
- Keyboard Space toggles.

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
