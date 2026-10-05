# DateField

Build a React + TypeScript `<DateField>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a typed date input split into month, day and year segments inside a field-style box; the focused segment is highlighted in the accent color.

## API

- `label`: `string`
- `defaultValue?`: `CalendarDate`

## Accessibility

- DateField, DateInput, DateSegment from react-aria-components: each segment is editable, Up/Down arrows step it, digits auto-advance, localized order and separators.

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
