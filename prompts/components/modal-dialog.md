# Modal

Build a React + TypeScript `<Modal>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a centered confirmation dialog over a dimmed overlay. Title, muted description and right-aligned Cancel and Confirm buttons (the confirm can be danger red). Fades and scales in; clicking outside or pressing Escape dismisses it.

## API

- `trigger`: `string`
- `title`
- `description`
- `confirmLabel?`
- `danger?`

## Accessibility

- DialogTrigger, ModalOverlay, Modal, Dialog, Heading from react-aria-components: focus is trapped and restored, the page behind is inert, the heading names the dialog, autoFocus on the primary action.

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
