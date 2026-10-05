# Case study

Build a full-page "Case study" template for Devus UI by composing existing components (a ScaledShot wrapper (ResizeObserver + CSS transform), app shell with sidebar, plan cards, dialog, composer).

## Layout

Dark portfolio case-study page. A thin sticky header (logo, mono nav, two buttons). Below it, two columns: on the left a sticky details list (Name, Overview, Scope) in small monospace labels; on the right a vertical stack of light product screens: a sky-gradient banner with an asterisk mark, a Starter / Pro plan chooser, a welcome screen, the same screen dimmed under a connect-your-apps dialog, a new-chat screen and an artifacts grid. Each product screen is designed on a fixed 1140x662 canvas and scaled to the column width.

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
