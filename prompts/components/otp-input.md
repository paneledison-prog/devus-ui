# OtpInput

Build a React + TypeScript `<OtpInput>` component for Devus UI.

## Purpose

One-time code entry with one numeric cell per digit.

## API

- `length?`: `number (default 4)`
- `label?`: `string`
- `onComplete(code`: `string)`

## Accessibility

- Digits only, auto-advance on input, Backspace and arrow keys move between cells, paste fills all cells, autocomplete='one-time-code' on the first cell, each cell has an aria-label.

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
