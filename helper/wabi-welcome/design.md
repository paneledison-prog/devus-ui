# Wabi welcome: Design

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
- Drawn on a 736x1472 canvas scaled to the 320px phone width; coordinates in Wabi.css are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={640}`, 39px radius): the screen draws its own status bar
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

- Measured: 2026-10-05, at `/?template=wabi-welcome&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 19 probes. Dark: 19 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Add#1",131.5,262.5,57.5,57.5,13.3333,"400","rgb(0, 0, 0)","rgba(0, 0, 0, 0)","50%",0,0,0,0],["section|Welcome#1",0,0,320,640,14,"400","rgb(0, 0, 0)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h1|Meet Wabi. The first personal software platform.#1",0,337,320,91.5,54,"500","rgb(0, 0, 0)","rgba(0, 0, 0, 0)","0px",62.5,337,195,90],["button|.wb-btn#1",19,531.5,281.5,43.5,27,"500","rgb(17, 17, 17)","rgb(250, 250, 250)","50px",0,0,0,0],["button|.wb-btn#2",19,585,281.5,43.5,27,"500","rgb(255, 255, 255)","rgb(43, 43, 43)","50px",0,0,0,0],["span|Continue with Google#1",101,545.5,118.5,15,27,"500","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",101,545.5,118.5,14],["span|Continue with Apple#1",104.5,599,111,15,27,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",104.5,599,111,14],["div|.wb#1",0,0,320,640,14,"400","rgb(0, 0, 0)","rgb(255, 255, 255)","0px",0,0,0,0],["span|.wb-sphere#1",270,97.5,55.5,55.5,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#2",5.5,116.5,80,80,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#4",84,143.5,62.5,62.5,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#5",145.5,132,59,59,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#6",247,131.5,54,54,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#8",49.5,174,66,66,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#9",128.5,163.5,52,52,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#10",183,142.5,71.5,71.5,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#12",40,229.5,43.5,43.5,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#13",76.5,197,88.5,88.5,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0],["span|.wb-sphere#14",232,182.5,97.5,97.5,14,"400","rgb(0, 0, 0)","rgb(232, 236, 242)","50%",0,0,0,0]],"dark":[["button|Add#1","rgb(0, 0, 0)","rgba(0, 0, 0, 0)"],["section|Welcome#1","rgb(0, 0, 0)","rgba(0, 0, 0, 0)"],["h1|Meet Wabi. The first personal software platform.#1","rgb(0, 0, 0)","rgba(0, 0, 0, 0)"],["button|.wb-btn#1","rgb(17, 17, 17)","rgb(250, 250, 250)"],["button|.wb-btn#2","rgb(255, 255, 255)","rgb(43, 43, 43)"],["span|Continue with Google#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["span|Continue with Apple#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["div|.wb#1","rgb(0, 0, 0)","rgb(255, 255, 255)"],["span|.wb-sphere#1","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#2","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#4","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#5","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#6","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#8","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#9","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#10","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#12","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#13","rgb(0, 0, 0)","rgb(232, 236, 242)"],["span|.wb-sphere#14","rgb(0, 0, 0)","rgb(232, 236, 242)"]]}
```
