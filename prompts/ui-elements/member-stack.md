# MemberStack

Build a React + TypeScript `<MemberStack>` component for Devus UI.

## Purpose

Overlapping round avatars that spread apart when the stack is hovered or focused. The hovered avatar lifts and shows a small tooltip with name and role.

## API

- `members`: `{ name: string`
- `role?`: `string`
- `color?`: `string }[]`

## Accessibility

- A list of real buttons, aria-label "Name, role", tooltip is decorative (aria-hidden) because the label carries the text, visible focus ring.

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
