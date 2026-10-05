# Restoring purchases: Design

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
- Drawn on a 446x970 canvas (`PayCanvas`) scaled to the 320px phone width; coordinates in the Paywall.css rules are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={696}`, 39px radius): the screen draws its own status bar and home indicator
- Colors are fixed by the image (`#62C5FF`, `#191919`, white, grays); text is Inter (`--font-sans`), not the original SF Pro
- Cards are 393x81 with 30px corners and a soft blue-tinted shadow, positioned by center and rotation (see `examples/RestoringPurchases.tsx`)
- Title 28px/34px weight 600 centered at y 728; subtitle 17px/22px white at 60%

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

- Measured: 2026-10-05, at `/?template=restoring-purchases&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 4 probes. Dark: 4 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Back#1",10,52.5,31.5,31.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h1|Restoring Purchases#1",0,510,320,24.5,28,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",61.5,510,196.5,24],["p|Just a sec — restoring what’s yours#1",0,544.5,320,31.5,17,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",95.5,544.5,129.5,31],["div|.pw#1",0,0,320,696,14,"400","rgb(17, 17, 17)","rgb(98, 197, 255)","0px",0,0,0,0]],"dark":[["button|Back#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["h1|Restoring Purchases#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|Just a sec — restoring what’s yours#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["div|.pw#1","rgb(17, 17, 17)","rgb(98, 197, 255)"]]}
```
