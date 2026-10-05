# AI platform demo

Build a full-page "AI platform demo" template for Devus UI by composing existing components (role=listbox for the model picker, role=tooltip, role=dialog wizard, switches with aria-checked, aria-current on navigation).

## Layout

A secure AI platform that brings chat, company knowledge, assistants, integrations and a developer console into one app, with its own light and dark theme. Chat: empty state with suggestion chips, a composer, a model picker whose options show a tooltip explaining each model, simulated replies with a typing indicator. Assistants cards, Knowledge sources with toggles, Integrations with connect and disconnect. Console: API keys table with per-key spend bars that turn red above 80 percent, revoke, and a three-step create-key wizard (name, access and monthly limit slider, one-time secret with copy). Sidebar Getting started popover with progress that updates as the user acts. All data is fictional.

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
