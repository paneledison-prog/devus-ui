# ComboBox

Build a React + TypeScript `<ComboBox>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a text input with a filterable suggestion list, plus a chevron button that opens all options. Shows a "No matches" empty state.

## API

- `label`: `string`
- `options`: `{ id, label }[]`
- `placeholder?`

## Accessibility

- ComboBox, Input, Button, Popover, ListBox from react-aria-components: aria-autocomplete combobox pattern, arrow keys move through suggestions, Enter selects, Escape closes.

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
