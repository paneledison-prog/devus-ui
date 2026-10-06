# Company intelligence demo

Build a full-page "Company intelligence demo" template for Devus UI by composing existing components (tab roles, listbox with aria-selected, role=dialog palette, aria-pressed on watch stars, reduced-motion respected).

## Layout

A private-market research platform for tracking companies, people, funding and growth signals, with its own light and dark theme. Home: a top bar with brand, a search button that opens a command palette (Ctrl or Cmd K) with Companies, People and Investors tabs and arrow-key navigation, and a workspace menu with an appearance switch, a weekly email toggle, export and sign out. Below it a plain header with the title and a short line (no background art) and tabs Featured, New this week and Watchlist, a filter box and a companies table with sector, stage pill, sortable funding column, growth bars and a watch star. Company page: hero with logo tile and pills, funding rounds bar chart, growth signals with a score bar, people and investors. All data is fictional; no real company logos.

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
