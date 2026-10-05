# Sourced answer

Build a React + TypeScript "Sourced answer" block for Devus UI by composing existing components (toggle buttons with aria-pressed, sup for markers).

## Purpose

An AI answer with small numbered citation badges inline and a Sources row of pill chips below, each chip showing its number. Clicking a chip or a citation badge opens a small card above it with the source: number and name, a kind label, a quoted excerpt and when it was updated. The open chip gets a ring and the open badge fills with the accent color.

## API

- `sources`: `{ id, name, kind?, excerpt?, updated? }[]`
- `Cite`: `{ n }` (the number of the source it points to)

## Accessibility

- Chips and badges are real buttons with `aria-expanded` and `aria-controls`; the badge label names the source.
- The card is a labelled region; only one is open at a time.
- Escape closes it and returns focus to the button that opened it; a click outside also closes it.
- Visible focus; the card entrance animation is off under reduced motion.

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
