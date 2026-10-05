# DynamicIsland

Build a React + TypeScript `<DynamicIsland>` component for Devus UI.

## Purpose

A black pill that morphs between three states with a springy width/height transition: idle (a small dot), timer (progress ring, mm:ss and a Focus label) and call (avatar, name, live duration and a red end button that returns to idle). A segmented control below switches state for the demo.

## API

- `defaultState?`: `"idle" | "timer" | "call"`

## Accessibility

- role="status" with aria-live and a text label per state, end-call button has aria-label, transitions disabled for reduced motion.

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
