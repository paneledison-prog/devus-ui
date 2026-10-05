# SearchField

Build a React + TypeScript `<SearchField>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a search input with a magnifier icon on the left and a round clear button that only appears once there is text.

## API

- `label?`: `string`
- `placeholder?`
- `onSubmit(query)`

## Accessibility

- SearchField from react-aria-components: role="searchbox", Enter submits, Escape clears, the clear button is excluded from the tab order.

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
