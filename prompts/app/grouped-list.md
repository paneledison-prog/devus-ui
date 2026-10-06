# ListGroup / ListRow

Build a React + TypeScript `<ListGroup / ListRow>` component for Devus UI.

## Purpose

Inset grouped list like a mobile settings screen: icon tile, title, optional value, then a chevron or a control.

## API

- `ListRow`: icon?, title, value?, trailing? (ReactNode, or false to hide the chevron), onClick?. ListGroup: label?, children

## Accessibility

- Rows are buttons only when clickable.
- Rows are at least 48px tall.
- ListGroup has role='group' with a label.

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

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Swipe:** swipe a row left to reveal Delete; swipe right to close it.
- **Slide:** the row slides over the red action; Restore rows brings the deleted rows back.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/GroupedList.tsx` (the example, with its data)
- `src/components/AppUI/ListRow.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (app- prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `.ui-*` classes), `forwardRef` where it wraps a native element, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every variant and state.
