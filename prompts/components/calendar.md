# Calendar

Build a React + TypeScript `<Calendar>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a month calendar on a white card with previous/next buttons, a month and year heading, weekday initials and round day cells; the selected day is an accent circle.

## API

- `defaultValue?`: `CalendarDate (from @internationalized/date)`

## Accessibility

- Calendar, CalendarGrid, CalendarCell from react-aria-components: a grid with arrow-key day navigation, PageUp/PageDown for months, locale-aware weekday names.

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
