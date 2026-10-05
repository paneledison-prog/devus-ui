# AutonomyPicker

Build a React + TypeScript `<AutonomyPicker>` component for Devus UI.

## Purpose

A three-segment control (Ask first, Plan then act, Autonomous) for how much freedom an AI agent has. The selected segment lifts onto a surface pill and a one-line hint below explains the current level.

## API

- `defaultValue?`: `"ask" | "plan" | "auto"`
- `onChange(level)`

## Accessibility

- role="radiogroup" with role="radio" segments, roving tabindex, Left/Right arrow keys, hint in an aria-live region.

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
