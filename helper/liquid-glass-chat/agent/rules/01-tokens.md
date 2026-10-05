# Rule 01: Design tokens only

- Use CSS variables for every color, spacing step, radius and font size.
- No new hex colors in this template unless they are added to its scoped variables for BOTH light and dark.
- Scope for this template: scoped variables on `.lq` plus library tokens.
- Dark mode is `[data-theme="dark"]`. A shadow list must never contain the bare word `none` between commas (it invalidates the whole declaration); use a zero shadow such as `0 0 0 0 #0000`.

## Available tokens
- Colors: `--background`, `--foreground`, `--muted`, `--surface`, `--overlay`, `--separator`, `--link`
- Accent and states: `--accent`, `--accent-foreground`, `--accent-soft`, `--accent-soft-foreground`, `--danger`, `--danger-soft`, `--warning`
- Neutrals: `--default`, `--default-hover`, `--default-foreground`
- Fields: `--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`, `--focus-ring`
- Shadows: `--shadow-field`, `--shadow-surface`, `--shadow-overlay`, `--shadow-switch`
- Space (4px scale): `--space-0-5` ... `--space-6`; radii `--radius-sm` ... `--radius-3xl`, `--radius-full`, `--radius-field`
- Type: Inter via `--font-sans`; sizes `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`; leading `--leading-sm`, `--leading-base`, `--leading-lg`
