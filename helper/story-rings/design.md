# Story rings: Design

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

- Measured: 2026-10-05, at `/?template=story-rings&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 13 probes. Dark: 13 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.app-bar#1",12,38,296,36,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","16px",0,0,0,0],["h2|Friends#1",16,46,76.5,28,22,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",16,47,76.5,26],["button|You, new story#1",16,94,60,68,13.3333,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Ada, new story#1",88,94,60,68,13.3333,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Linus#1",160,94,60,68,13.3333,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["span|ME#1",26,99,40,40,14,"500","rgb(24, 24, 27)","rgb(235, 235, 236)","50%",35.5,110,21,17],["span|You#1",36,147,20,14,11,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",36,147,20,14],["span|AL#1",98,99,40,40,14,"500","rgb(24, 24, 27)","rgb(235, 235, 236)","50%",109,110,18,17],["span|Ada#1",107.5,147,21,14,11,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",107.5,147,21,14],["span|LT#1",170,99,40,40,14,"500","rgb(24, 24, 27)","rgb(235, 235, 236)","50%",182,110,15.5,17],["span|Linus#1",176,147,28,14,11,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",176,147,28,14],["div|.app-phone#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","30px",0,0,0,0],["div|.app-phone__screen#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0]],"dark":[["header|.app-bar#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h2|Friends#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|You, new story#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Ada, new story#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Linus#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|ME#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["span|You#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|AL#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["span|Ada#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|LT#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["span|Linus#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["div|.app-phone#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.app-phone__screen#1","rgb(252, 252, 252)","rgb(24, 24, 27)"]]}
```
