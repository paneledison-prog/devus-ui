# SlideToConfirm

Build a React + TypeScript `<SlideToConfirm>` component for Devus UI.

## Purpose

Deliberate-action control: drag the thumb to the end to confirm, otherwise it snaps back.

## API

- label?, confirmedLabel?, onConfirm()

## Accessibility

- Built on a native range input so keyboard arrows work.
- Resets on blur or pointer release before the end.
- Exposes aria-valuetext.

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
