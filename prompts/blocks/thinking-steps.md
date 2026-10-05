# Thinking steps

Build a React + TypeScript "Thinking steps" block for Devus UI by composing existing components (a disclosure button with aria-expanded, an ordered list).

## Purpose

Collapsible progress list for an AI answer. The header shows a spinner and Thinking... while a step is running, then a check and Worked for Ns. Open, it lists steps on a thin vertical rail: done steps are filled with a time, the running step spins, upcoming steps are dimmed.

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
