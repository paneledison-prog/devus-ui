# BalanceCard

Build a React + TypeScript `<BalanceCard>` component for Devus UI.

## Purpose

High-contrast dark card with a label, a large amount, a white primary pill and two secondary actions.

## API

- label?, amount: string, primary?: string, actions?: ReactNode

## Accessibility

- Labelled `<section>`.
- white-on-black text meets WCAG AA.
- Pills are real buttons with 32px+ height, actions 40px.

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

- `src/components/AppUI/examples/BalanceCardExample.tsx` (the example, with its data)
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
