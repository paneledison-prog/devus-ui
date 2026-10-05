# Select

Build a React + TypeScript `<Select>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a dropdown that picks one option from a list. A 40px field-style trigger shows the value (muted placeholder) and a chevron; the popover is a rounded overlay with items that highlight on hover or keyboard focus and show an accent check on the chosen one.

## API

- `label`: `string`
- `options`: `{ id, label }[]`
- `placeholder?`
- `defaultValue?`

## Accessibility

- Use Select, Button, SelectValue, Popover, ListBox, ListBoxItem from react-aria-components: type-ahead, arrow keys, Escape to close, label linked to the trigger. Style with the data-focused, data-selected and data-focus-visible attributes.

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
