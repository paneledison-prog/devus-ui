# TabBar (floating)

Build a React + TypeScript `<TabBar (floating)>` component for Devus UI.

## Purpose

Pill-shaped bottom navigation that floats above content. Only the active tab shows its label inside a raised pill; an optional round action button sits beside it.

## API

- `items`: `{ id, label, icon }[]`
- `floating?`: `boolean`
- `action?`: `ReactNode`
- `value / defaultValue`
- `onChange(id)`

## Accessibility

- `<nav>` with aria-label.
- Every tab keeps an aria-label even when its text is hidden.
- aria-current='page' on the active tab.
- 44px targets.

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

- `src/components/AppUI/examples/FloatingTabBar.tsx` (the example, with its data)
- `src/components/AppUI/TabBar.tsx`
- `src/components/AppUI/Fab.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
