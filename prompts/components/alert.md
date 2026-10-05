# Alert

Build a React + TypeScript `<Alert>` component for Devus UI.

## Purpose

Inline status message with a colored dot, title and description.

## API

- `status`: `'default' | 'success' | 'warning' | 'danger'`
- `title`: `ReactNode`
- `children?`: `ReactNode`

## Accessibility

- role='alert' for danger, role='status' otherwise.
- Decorative dot is aria-hidden.

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
