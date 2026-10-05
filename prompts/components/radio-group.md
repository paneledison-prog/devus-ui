# RadioGroup

Build a React + TypeScript `<RadioGroup>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): radio options rendered as selectable cards with a title and a muted description; the chosen card gets an accent outline and a filled dot.

## API

- `label`: `string`
- `options`: `{ id, label, description? }[]`
- `defaultValue?`

## Accessibility

- RadioGroup and Radio from react-aria-components: one tab stop, arrow keys move and select, description linked with aria-describedby.

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
