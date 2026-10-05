# TagGroup

Build a React + TypeScript `<TagGroup>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): selectable, removable pill tags. Idle tags are gray, selected tags use the soft accent fill, and each has a small × button that removes it.

## API

- `label`: `string`
- `tags`: `{ id, label }[]`
- `removable?`: `boolean`

## Accessibility

- TagGroup, TagList, Tag from react-aria-components: a grid with arrow-key navigation, Space selects, Backspace/Delete removes, the remove button has an aria-label.

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
