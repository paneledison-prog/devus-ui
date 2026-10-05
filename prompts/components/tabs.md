# Tabs

Build a React + TypeScript `<Tabs>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a pill-shaped tab list (gray track, selected tab lifts onto a white surface) with a content panel below.

## API

- `tabs`: `{ id, label, content }[]`
- `label?`: `string`

## Accessibility

- Tabs, TabList, Tab, TabPanel from react-aria-components: roving tabindex, Left/Right arrows, Home/End, panels linked by aria-controls.

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
