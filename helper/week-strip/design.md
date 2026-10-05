# Week strip: Design

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
- Each day is a toggle button with `aria-pressed`

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

- Measured: 2026-10-05, at `/?template=week-strip&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 23 probes. Dark: 23 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.app-bar#1",12,38,296,36,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","16px",0,0,0,0],["h2|Schedule#1",16,46,96,28,22,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",16,47,96,26],["button|.app-week__day#1",18,92,45.5,46,13.3333,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","12px",0,0,0,0],["button|.app-week__day#2",65.5,92,45.5,46,13.3333,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","12px",0,0,0,0],["button|.app-week__day#3",113.5,92,45.5,46,13.3333,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","12px",0,0,0,0],["button|.app-week__day#4",161,92,45.5,46,13.3333,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","12px",0,0,0,0],["button|.app-week__day#5",208.5,92,45.5,46,13.3333,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","12px",0,0,0,0],["button|.app-week__day#6",256.5,92,45.5,46,13.3333,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","12px",0,0,0,0],["small|Mon#1",30,98,21,12,10,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",30,98,21,12],["strong|8#1",36.5,112,9,20,14,"600","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",36.5,113,9,17],["small|Tue#1",79.5,98,17.5,12,10,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",79.5,98,17.5,12],["strong|9#1",84,112,9,20,14,"600","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",84,113,9,17],["small|Wed#1",125.5,98,21.5,12,10,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",125.5,98,21.5,12],["strong|10#1",128.5,112,15,20,14,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",128.5,113,15,17],["small|Thu#1",174.5,98,18.5,12,10,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",174.5,98,18.5,12],["strong|11#1",178,112,12,20,14,"600","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",178,113,12,17],["small|Fri#1",225.5,98,12,12,10,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",225.5,98,12,12],["strong|12#1",224,112,14.5,20,14,"600","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",224,113,14.5,17],["small|Sat#1",271.5,98,15.5,12,10,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",271.5,98,15.5,12],["strong|13#1",272,112,15,20,14,"600","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",272,113,15,17],["div|.app-phone#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","30px",0,0,0,0],["div|.app-phone__screen#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0],["div[group]|Choose a day#1",12,86,296,58,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","16px",0,0,0,0]],"dark":[["header|.app-bar#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h2|Schedule#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|.app-week__day#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["button|.app-week__day#2","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["button|.app-week__day#3","rgb(252, 252, 252)","rgb(24, 24, 27)"],["button|.app-week__day#4","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["button|.app-week__day#5","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["button|.app-week__day#6","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["small|Mon#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["strong|8#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["small|Tue#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["strong|9#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["small|Wed#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["strong|10#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["small|Thu#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["strong|11#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["small|Fri#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["strong|12#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["small|Sat#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["strong|13#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["div|.app-phone#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.app-phone__screen#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div[group]|Choose a day#1","rgb(252, 252, 252)","rgb(39, 39, 42)"]]}
```
