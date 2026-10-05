# Menu

Build a React + TypeScript `<Menu>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a dropdown action menu opened from a button. Items highlight on hover or keyboard focus, may show a muted shortcut hint on the right, and a destructive item is red.

## API

- `label`: `string`
- `items`: `{ id, label, shortcut?, danger? }[]`
- `onAction(id)`

## Accessibility

- MenuTrigger, Menu, MenuItem, Popover from react-aria-components: role="menu", arrow keys, type-ahead, Escape returns focus to the trigger.

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
