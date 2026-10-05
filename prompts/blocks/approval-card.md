# Approval card

Build a React + TypeScript "Approval card" block for Devus UI by composing existing components (Button, native radio inputs inside a fieldset with a legend).

## Purpose

A card an AI agent shows when it pauses and needs a human decision: a Paused pill, a question, a radio list of options each with a one-line hint, and Confirm / Skip buttons. After choosing, the card locks, dims the other options and shows the result line.

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
