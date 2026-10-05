# Grouped list: Design

Visual specification. Match it exactly; do not restyle from memory.

## Tokens
Use the library tokens directly.

Library tokens (`src/styles/tokens.css`):
- Colors: `--background`, `--foreground`, `--muted`, `--surface`, `--overlay`, `--separator`, `--link`
- Accent and states: `--accent`, `--accent-foreground`, `--accent-soft`, `--accent-soft-foreground`, `--danger`, `--danger-soft`, `--warning`
- Neutrals: `--default`, `--default-hover`, `--default-foreground`
- Fields: `--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`, `--focus-ring`
- Shadows: `--shadow-field`, `--shadow-surface`, `--shadow-overlay`, `--shadow-switch`
- Space (4px scale): `--space-0-5` ... `--space-6`; radii `--radius-sm` ... `--radius-3xl`, `--radius-full`, `--radius-field`
- Type: Inter via `--font-sans`; sizes `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`; leading `--leading-sm`, `--leading-base`, `--leading-lg`

## Specification
- Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`
- Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`

## Typography
- Inter (`--font-sans`). Body 14px/20px, small 12px, headings 16-18px weight 600 unless the specification above says otherwise.
- Numbers that update use tabular figures.

## States every interactive element must have
- Default, hover, focus-visible (2px ring, `--focus-ring` or the template's own ring variable), pressed, disabled (50% opacity, `not-allowed`).
- Selected / current state is shown with more than color (weight, outline or marker).

## Light and dark
- Follows the site theme through `[data-theme]` on `<html>`.
- Never hard-code a color that is not defined for both themes.

## Motion
- 150-250ms ease-out for state changes. No bounce except where the specification says so.
- Everything animated must stop under `prefers-reduced-motion: reduce`.

## Bench reference
This is the real design, measured from the running app. It is the only accepted definition of "the design is right". Do not edit it to make a failure pass.

- Measured: 2026-10-05, at `/?template=grouped-list&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 15 probes. Dark: 15 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.app-bar#1",12,38,296,56,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","16px",0,0,0,0],["button|Back#1",20,42,44,44,13.3333,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","50%",0,0,0,0],["h2|Settings#1",128,52,64,24,16,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",128,54,64,20],["label|.ui-switch#1",252,216,40,20,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["input[switch]|Dark mode#1",252,216,40,20,13.3333,"400","rgb(0, 0, 0)","rgb(235, 235, 236)","9999px",0,0,0,0],["span|Profile#1",68,120,196,20,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",68,121,42.5,17],["span|Notifications#1",68,168,165,20,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",68,169,83.5,17],["span|On#1",245,168,19,20,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",245,169,19,17],["span|Dark mode#1",68,216,172,20,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",68,217,72.5,17],["div|.app-phone#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","30px",0,0,0,0],["div|.app-phone__screen#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0],["div[group]|Account#1",12,106,296,144,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","16px",0,0,0,0],["span|.app-row__icon#1",28,116,28,28,14,"400","rgb(252, 252, 252)","rgb(4, 133, 247)","8px",0,0,0,0],["span|.app-row__icon#2",28,164,28,28,14,"400","rgb(252, 252, 252)","rgb(4, 133, 247)","8px",0,0,0,0],["span|.app-row__icon#3",28,212,28,28,14,"400","rgb(252, 252, 252)","rgb(4, 133, 247)","8px",0,0,0,0]],"dark":[["header|.app-bar#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Back#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h2|Settings#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["label|.ui-switch#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input[switch]|Dark mode#1","rgb(0, 0, 0)","rgb(39, 39, 42)"],["span|Profile#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|Notifications#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|On#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|Dark mode#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["div|.app-phone#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.app-phone__screen#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div[group]|Account#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["span|.app-row__icon#1","rgb(252, 252, 252)","rgb(4, 133, 247)"],["span|.app-row__icon#2","rgb(252, 252, 252)","rgb(4, 133, 247)"],["span|.app-row__icon#3","rgb(252, 252, 252)","rgb(4, 133, 247)"]]}
```
