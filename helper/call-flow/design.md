# Call flow: Design

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
- Canvas 923x1996 scaled to the 320px phone width; coordinates in Call.css are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={692}`, 39px radius): the screen draws its own status bar
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

- Measured: 2026-10-05, at `/?template=call-flow&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 22 probes. Dark: 22 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Contact info#1",287,53,18.5,18.5,34,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","50%",0,0,0,0],["h1|Mimi#1",0,111.5,320,34.5,80,"700","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",128,111.5,64,34],["button|.cl-btn#1",31,466.5,66,90,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.cl-btn#2",127,466.5,66,90,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.cl-btn#3",222.5,466.5,66,90,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.cl-btn#4",31,568,66,90,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.cl-btn#5",127,568,66,90,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.cl-btn#6",222.5,568,66,90,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["span|i#1",295,56.5,3,12,34,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",295,54.5,3,14],["p|03:36#1",0,89.5,320,22,50,"500","rgba(255, 255, 255, 0.62)","rgba(0, 0, 0, 0)","0px",134.5,89.5,51,21],["span|Speaker#1",24.5,537.5,79.5,15.5,36,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",40,537.5,48,15],["span|FaceTime#1",120,537.5,79.5,15.5,36,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",131.5,537.5,56.5,15],["span|Mute#1",215.5,537.5,79.5,15.5,36,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",240.5,537.5,29.5,15],["span|Add#1",24.5,639.5,79.5,15.5,36,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",52.5,639.5,23.5,15],["span|End#1",120,639.5,79.5,15.5,36,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",148.5,639.5,22.5,15],["span|Keypad#1",215.5,639.5,79.5,15.5,36,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",233.5,639.5,44,15],["span|.cl-btn__disc#1",32.5,466.5,63.5,63.5,13.3333,"400","rgb(17, 17, 17)","rgb(255, 255, 255)","50%",0,0,0,0],["span|.cl-btn__disc#2",128.5,466.5,63.5,63.5,13.3333,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.2)","50%",0,0,0,0],["span|.cl-btn__disc#3",224,466.5,63.5,63.5,13.3333,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.2)","50%",0,0,0,0],["span|.cl-btn__disc#4",32.5,568,63.5,63.5,13.3333,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.2)","50%",0,0,0,0],["span|.cl-btn__disc#5",128.5,568,63.5,63.5,13.3333,"400","rgb(255, 255, 255)","rgb(255, 69, 58)","50%",0,0,0,0],["span|.cl-btn__disc#6",224,568,63.5,63.5,13.3333,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.2)","50%",0,0,0,0]],"dark":[["button|Contact info#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["h1|Mimi#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.cl-btn#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.cl-btn#2","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.cl-btn#3","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.cl-btn#4","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.cl-btn#5","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.cl-btn#6","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|i#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|03:36#1","rgba(255, 255, 255, 0.62)","rgba(0, 0, 0, 0)"],["span|Speaker#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|FaceTime#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Mute#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Add#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|End#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Keypad#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|.cl-btn__disc#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["span|.cl-btn__disc#2","rgb(255, 255, 255)","rgba(255, 255, 255, 0.2)"],["span|.cl-btn__disc#3","rgb(255, 255, 255)","rgba(255, 255, 255, 0.2)"],["span|.cl-btn__disc#4","rgb(255, 255, 255)","rgba(255, 255, 255, 0.2)"],["span|.cl-btn__disc#5","rgb(255, 255, 255)","rgb(255, 69, 58)"],["span|.cl-btn__disc#6","rgb(255, 255, 255)","rgba(255, 255, 255, 0.2)"]]}
```
