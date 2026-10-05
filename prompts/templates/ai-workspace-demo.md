# AI workspace demo

Build a full-page "AI workspace demo" template for Devus UI by composing existing components (Switch, native form controls, role=tablist, role=dialog, aria-live thread).

## Layout

A working AI-assistant app with its own light and dark theme. Top bar with Chat / Agent mode tabs, a search box (Ctrl+K) that jumps to pages, projects, chats and apps, a theme toggle, notifications and invite. Left sidebar with navigation, projects, recents and a connect-apps footer. Views: Welcome (copy-to-clipboard command boxes, a terminal card, and a connect-your-apps dialog), New chat (a working composer with a model menu that shows usage bars, suggestion cards, simulated replies), Projects, Artifacts (New artifact adds a card), Apps marketplace (search, connect and disconnect toggles), Plans (Starter and Pro), Agent views (Active runs with progress, Plugins with trigger and skill switches, Mobile pairing with a phone mock). Light surface is white on #f2f2f2, dark surface is #1b1b1b on #2a2a2a, with a blue accent. No real third-party logos.

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
