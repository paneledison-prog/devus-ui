# Bottom sheet: Design

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
- When used as a modal it must trap focus, close on Escape and restore focus

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

- Measured: 2026-10-05, at `/?template=bottom-sheet&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 10 probes. Dark: 10 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.app-bar#1",12,38,296,36,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","16px",0,0,0,0],["h2|Projects#1",16,46,83.5,28,22,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",16,47,83.5,26],["section|Share project#1",0,355,320,305,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","24px",0,0,0,0],["h3|Share project#1",16,380,288,24,16,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",108.5,382,103,20],["button|Copy link#1",16,528,288,48,14,"500","rgb(252, 252, 252)","rgb(4, 133, 247)","24px",129,543,62,17],["button|Cancel#1",16,584,288,48,14,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","24px",137,599,46.5,17],["span|Message#1",32,430,228,20,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",32,431,60,17],["span|Email#1",32,482,228,20,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",32,483,35.5,17],["div|.app-phone#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","30px",0,0,0,0],["div|.app-phone__screen#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0]],"dark":[["header|.app-bar#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h2|Projects#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["section|Share project#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["h3|Share project#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Copy link#1","rgb(252, 252, 252)","rgb(4, 133, 247)"],["button|Cancel#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|Message#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|Email#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["div|.app-phone#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.app-phone__screen#1","rgb(252, 252, 252)","rgb(24, 24, 27)"]]}
```
