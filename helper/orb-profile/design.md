# Orb profile: Design

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
- Canvas 825x1790 scaled to the 320px phone width; coordinates in Orb.css are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={694}`, 39px radius): the screen draws its own status bar
- Colors and sizes are fixed by the image; text is Inter (`--font-sans`) unless noted

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

- Measured: 2026-10-05, at `/?template=orb-profile&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 23 probes. Dark: 23 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Close#1",13,46,34,34,13.3333,"400","rgb(0, 0, 0)","rgba(96, 96, 98, 0.78)","50%",0,0,0,0],["button|More#1",241,46,34,34,13.3333,"400","rgb(0, 0, 0)","rgba(96, 96, 98, 0.78)","50%",0,0,0,0],["h1|Evelyn Smith#1",0,437,320,24,48,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",103.5,438,113.5,22],["button|.ob-chip#1",63,519.5,63.5,20,26,"500","rgba(255, 255, 255, 0.85)","rgba(80, 82, 88, 0.42)","26px",0,0,0,0],["button|.ob-chip#2",131.5,519.5,125,20,26,"500","rgba(255, 255, 255, 0.85)","rgba(80, 82, 88, 0.42)","26px",0,0,0,0],["button|.ob-friends#1",13,623.5,294,37,38,"600","rgb(255, 255, 255)","rgba(98, 100, 106, 0.55)","48px",0,0,0,0],["p|orb.club/@evelynsmith#1",0,54.5,320,17,36,"500","rgba(255, 255, 255, 0.5)","rgba(0, 0, 0, 0)","0px",84,54.5,152,17],["span|Orb Featured#1",19.5,196.5,62,12.5,26,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",19.5,196.5,62,12],["span|Top Artist#1",88,180.5,46,12.5,26,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",88,180.5,46,12],["span|Top Collector#1",230,174,63,12.5,26,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",230,174,63,12],["span|2,425 Followers#1",60.5,464,80,14,28,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",60.5,463,80,14],["span|377 Follow#1",151.5,464,54,14,28,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",151.5,463,54,14],["span|14 Clubs#1",216.5,464,43,14,28,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",216.5,463,43,14],["p|nft artist / visual designer passionate about we#1",0,484.5,320,28,27,"400","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)","0px",99,484.5,122.5,27],["span|ABOUT#1",85.5,523,35.5,12.5,26,"500","rgba(255, 255, 255, 0.85)","rgba(0, 0, 0, 0)","0px",85.5,523,35.5,12],["span|EVELYNSMITH.COM#1",153,523,98.5,12.5,26,"500","rgba(255, 255, 255, 0.85)","rgba(0, 0, 0, 0)","0px",153,523,98.5,12],["b|+33#1",118,552.5,35.5,35.5,30,"600","rgb(17, 17, 17)","rgb(255, 255, 255)","50%",124.5,562.5,22.5,14],["p|friends follow#1",69,599,69.5,14,28,"400","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)","0px",69,598,69.5,14],["b|+2#1",235.5,552.5,39,35.5,30,"600","rgb(17, 17, 17)","rgb(255, 255, 255)","16px",247.5,562.5,15,14],["p|mutual clubs#1",185.5,599,65.5,14,28,"400","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)","0px",185.5,598,65.5,14],["span|Friends#1",147.5,633,52,18,38,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",147.5,632,52,18],["div|.ob#1",0,0,320,694,14,"400","rgb(255, 255, 255)","rgb(110, 122, 142)","0px",0,0,0,0],["div|.ob-avatar#1",101.5,311,116.5,116.5,14,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","50%",0,0,0,0]],"dark":[["button|Close#1","rgb(0, 0, 0)","rgba(96, 96, 98, 0.78)"],["button|More#1","rgb(0, 0, 0)","rgba(96, 96, 98, 0.78)"],["h1|Evelyn Smith#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.ob-chip#1","rgba(255, 255, 255, 0.85)","rgba(80, 82, 88, 0.42)"],["button|.ob-chip#2","rgba(255, 255, 255, 0.85)","rgba(80, 82, 88, 0.42)"],["button|.ob-friends#1","rgb(255, 255, 255)","rgba(98, 100, 106, 0.55)"],["p|orb.club/@evelynsmith#1","rgba(255, 255, 255, 0.5)","rgba(0, 0, 0, 0)"],["span|Orb Featured#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Top Artist#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Top Collector#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|2,425 Followers#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|377 Follow#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|14 Clubs#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|nft artist / visual designer passionate about we#1","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)"],["span|ABOUT#1","rgba(255, 255, 255, 0.85)","rgba(0, 0, 0, 0)"],["span|EVELYNSMITH.COM#1","rgba(255, 255, 255, 0.85)","rgba(0, 0, 0, 0)"],["b|+33#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["p|friends follow#1","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)"],["b|+2#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["p|mutual clubs#1","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)"],["span|Friends#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["div|.ob#1","rgb(255, 255, 255)","rgb(110, 122, 142)"],["div|.ob-avatar#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"]]}
```
