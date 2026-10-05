# Breadcrumbs

Build a React + TypeScript `<Breadcrumbs>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a path trail with slash separators. Earlier crumbs are muted links that darken and underline on hover; the last crumb is the current page in medium weight.

## API

- `items`: `{ id, label, href }[]`

## Accessibility

- Breadcrumbs, Breadcrumb, Link from react-aria-components: an `<ol>` in a nav, the last link gets aria-current="page".

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
