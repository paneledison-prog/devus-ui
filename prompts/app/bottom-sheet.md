# BottomSheet

Build a React + TypeScript `<BottomSheet>` component for Devus UI.

## Purpose

Panel that slides up from the bottom of a mobile screen: drag handle, title, content rows and stacked full-width actions.

## API

- `title`: `string`
- `children`
- `footer?`: ReactNode. Presentational: mount it inside your own overlay or `<dialog>`

## Accessibility

- Labelled region.
- When used as a modal it must trap focus, close on Escape and restore focus. Footer buttons are 48px tall.

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

- `src/components/AppUI/examples/BottomSheetExample.tsx` (the example, with its data)
- `src/components/AppUI/BottomSheet.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
