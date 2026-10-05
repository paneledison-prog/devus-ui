# Home screen

Build a React + TypeScript `<Home screen>` component for Devus UI.

## Purpose

Mobile home in a phone viewport: greeting app bar, week strip, a task card with a filter, and a floating tab bar with a round action button.

## API

- Composes PhoneFrame, AppBar (large + subtitle), WeekStrip, AppCard, SegmentedControl, Checkbox, TabBar (floating) and Fab (dark)

## Accessibility

- Landmarks: header, nav, lists.
- Touch targets of at least 44px.
- Works in light and dark themes.
- Respects the phone safe areas (status bar and home indicator)

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

- `src/components/AppUI/examples/HomeScreen.tsx` (the example, with its data)
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/TabBar.tsx`
- `src/components/AppUI/Fab.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
