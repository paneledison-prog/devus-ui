# Sidebar nav cards

Build a React + TypeScript "Sidebar nav cards" block for Devus UI by composing existing components (icons, links with aria-current="page").

## Purpose

Two grouped navigation cards (Overview and Account), each with a small label and icon links; the current page gets a soft filled pill.

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
