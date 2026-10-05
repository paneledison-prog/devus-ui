# Accordion

Build a React + TypeScript `<Accordion>` component for Devus UI.

## Purpose

Built on react-aria-components (npm i react-aria-components): a stack of expandable sections inside one rounded surface, separated by hairlines. The chevron rotates and the panel height animates (use the --disclosure-panel-height variable).

## API

- `items`: `{ id, title, body }[]`
- `defaultExpanded?`: `string[]`

## Accessibility

- DisclosureGroup, Disclosure, DisclosurePanel from react-aria-components: header is a heading containing the trigger button, aria-expanded, Enter/Space toggle.
- Only one open at a time.

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
