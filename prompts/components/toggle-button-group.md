# ToggleButtonGroup

Build a React + TypeScript `<ToggleButtonGroup>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a pill-shaped group of toggle buttons on a gray track; the selected button turns solid foreground. Supports single or multiple selection.

## API

- `label`: `string`
- `options`: `{ id, label }[]`
- `mode?`: `"single" | "multiple"`
- `defaultSelected?`: `string[]`

## Accessibility

- ToggleButtonGroup and ToggleButton from react-aria-components: role="radiogroup" (single) or "toolbar" (multiple), aria-pressed on each button, arrow-key navigation.

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
