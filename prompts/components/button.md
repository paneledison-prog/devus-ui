# Button

Build a React + TypeScript `<Button>` component for Devus UI.

## Purpose

Clickable action with seven emphasis levels.

## API

- `variant`: `'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'dangerSoft'`
- `size`: `'sm' (32px) | 'md' (24px) | 'lg' (40px)`
- `iconOnly (square)`
- startContent / endContent slots. Pill radius, states: default, hover, focus, pressed, disabled

## Accessibility

- Native `<button>`, type defaults to "button", icon-only buttons require aria-label, visible focus ring.

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
