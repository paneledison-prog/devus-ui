# Agent builder demo

Build a full-page "Agent builder demo" template for Devus UI by composing existing components (validated form with aria-invalid, role=dialog, aria-pressed pills, switch with aria-checked, reduced-motion respected).

## Layout

A platform for building and running autonomous agents from a simple prompt, with its own light and dark theme. Sign-in: split layout with an email form (validated) and line-art on the right. App: a prompt box with example chips that builds a plan; the plan runs step by step, pauses for approval before posting, then shows a chat post with a code diff. Finished runs can be Published (name, show in Discover toggle) or Shared (copyable link). Discover: search and category pills with Add buttons. Credits: a slider that estimates monthly credits and price with the matching tier highlighted, plus a credits menu with top-up and a theme switch. All data is fictional.

## Requirements

- Make it responsive (stack columns under 720px), use semantic landmarks (header, nav, main, aside) and keep all copy as placeholder text.

## Design tokens

Use the Devus UI tokens as CSS variables.

| Group | Tokens |
| --- | --- |
| Colors | `--background`, `--surface`, `--foreground`, `--muted`, `--separator`, `--accent` |
| Radii | `--radius-2xl` |
| Spacing | `--space-*` |
| Type | Inter |
| Themes | `[data-theme="light"]` and `[data-theme="dark"]` |
