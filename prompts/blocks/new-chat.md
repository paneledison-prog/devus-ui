# New chat

Build a React + TypeScript "New chat" block for Devus UI by composing existing components (Button-style icon buttons, textarea, send button).

## Purpose

Empty-state AI chat card: header with a refresh button, centered greeting with an icon, and a composer with attach and send buttons. Fixed 560px height, scrollable message area above the composer.

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
