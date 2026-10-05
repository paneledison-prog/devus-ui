# Avatar

Build a React + TypeScript `<Avatar>` component for Devus UI.

## Purpose

Circular user image with initials fallback, plus an overlapping AvatarGroup.

## API

- src?, alt?, fallback?: string, size: 'sm' | 'md' | 'lg'. Falls back when the image errors

## Accessibility

- Images need alt text.
- Fallback text is the accessible name when there is no image.

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
