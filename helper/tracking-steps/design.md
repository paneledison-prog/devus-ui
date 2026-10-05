# Tracking steps: Design

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

- Measured: 2026-10-05, at `/?template=tracking-steps&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 14 probes. Dark: 14 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.app-bar#1",12,38,296,56,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","16px",0,0,0,0],["button|Back#1",20,42,44,44,13.3333,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","50%",0,0,0,0],["h2|Details#1",133.5,52,53,24,16,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",133.5,54,53,20],["section|Shipment#1",12,106,296,120,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","24px",0,0,0,0],["h3|PAQ-327-P21#1",28,118,264,20,14,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",28,119,90.5,17],["button|Track shipping#1",12,238,296,40,14,"500","rgb(252, 252, 252)","rgb(4, 133, 247)","24px",110.5,249,98.5,17],["span|Received#1",28,172,53,20,12,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",28,174,53,15],["small|10:30am#1",28,194,41,20,10,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",28,198,41,12],["span|In transit#1",135,172,50,20,12,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",135,174,50,15],["small|12:30pm#1",139.5,194,41,20,10,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",139.5,198,41,12],["span|Delivered#1",237.5,172,54.5,20,12,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",237.5,174,54.5,15],["small|Pending#1",253,194,39,20,10,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",253,198,39,12],["div|.app-phone#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","30px",0,0,0,0],["div|.app-phone__screen#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0]],"dark":[["header|.app-bar#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Back#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h2|Details#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["section|Shipment#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["h3|PAQ-327-P21#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Track shipping#1","rgb(252, 252, 252)","rgb(4, 133, 247)"],["span|Received#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["small|10:30am#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|In transit#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["small|12:30pm#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|Delivered#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["small|Pending#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["div|.app-phone#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.app-phone__screen#1","rgb(252, 252, 252)","rgb(24, 24, 27)"]]}
```
