# Task list

Build a React + TypeScript `<Task list>` component for Devus UI.

## Purpose

Checklist card with a To do / Completed / Pending filter and titled sections of checkboxes.

## API

- Composes AppCard, SegmentedControl and Checkbox
- section titles are `<h3>`

## Accessibility

- Real checkboxes with visible labels.
- The filter is a radio group.
- Whole rows are tappable.

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

- `src/components/AppUI/examples/TaskList.tsx` (the example, with its data)
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
