# Controls showcase

Build a React + TypeScript "Controls showcase" block for Devus UI by composing existing components (Button, Checkbox, Switch, Badge-style pills, pill fields).

## Purpose

One card that previews the whole control set: primary, secondary and outline buttons, a search field, a textarea, badges, radio, checkbox and switch, plus an outline button and a split button group.

## Accessibility

- Accessible form semantics: labels, fieldset/legend where grouped, visible focus.

## Constraints

- Keep it presentational: accept callbacks (for example onSubmit) as props, no data fetching.

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
