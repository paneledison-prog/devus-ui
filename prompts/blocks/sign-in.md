# Sign in

Build a React + TypeScript "Sign in" block for Devus UI by composing existing components (Card, TextField, Button).

## Purpose

Email and password form inside a Card with a primary submit button.

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
