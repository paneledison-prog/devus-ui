# AppBar

Build a React + TypeScript `<AppBar>` component for Devus UI.

## Purpose

Top bar for mobile screens: either a centered title with a back button, or a large greeting with a muted italic subtitle and a raised icon action.

## API

- `title`: `string`
- `subtitle?`: `string`
- `large?`: `boolean`
- `onBack?()`
- `action?`: `ReactNode`

## Accessibility

- Renders `<header>`.
- The back button has aria-label='Back' and a 44px target.
- The title is an `<h2>`.

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

## Reference implementation (real files)

- `src/components/AppUI/examples/AppBarExample.tsx` (the example, with its data)
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
