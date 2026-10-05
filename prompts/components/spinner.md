# Spinner

Build a React + TypeScript `<Spinner>` component for Devus UI.

## Purpose

Indeterminate loading indicator.

## API

- `size`: `'sm' (16px) | 'md' (24px) | 'lg' (32px)`
- `label?`: `string`

## Accessibility

- role='status' with aria-label.
- Slows the animation under prefers-reduced-motion.

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
