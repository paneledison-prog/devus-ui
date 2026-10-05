# Moimoi sign in: Design

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
- Drawn on a 558x1208 canvas (`MoimoiCanvas`) scaled to the 320px phone width; coordinates in Moimoi.css and Moimoi.tsx are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={692}`, 39px radius): the screen draws its own island, status bar and home indicator
- Sky gradient `#f5f1fb` to `#dcefff` above a flat `#f6f3ef` panel from y 758
- Buttons 468x70, fully rounded; Google white with soft shadow, Apple black; labels 25px/600
- Wordmark stroke weight 27, x-height 79

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

- Measured: 2026-10-05, at `/?template=moimoi-sign-in&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 7 probes. Dark: 7 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["section|Sign in#1",0,434.5,320,258,14,"400","rgb(17, 17, 17)","rgb(246, 243, 239)","0px",0,0,0,0],["button|.mm-btn#1",19,502.5,268.5,40,25,"600","rgb(17, 17, 17)","rgb(255, 255, 255)","35px",0,0,0,0],["button|.mm-btn#2",19,562,268.5,39.5,25,"600","rgb(255, 255, 255)","rgb(0, 0, 0)","35px",0,0,0,0],["p|Sign in to get started#1",0,467,320,16,22,"400","rgb(74, 74, 76)","rgba(0, 0, 0, 0)","0px",99,467,122.5,15],["span|Sign in with Google#1",101,514,130.5,17,25,"600","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",101,514,130.5,17],["span|Sign in with Apple#1",106,573,122,17,25,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",106,573,122,17],["div|.mm#1",0,0,320,692,14,"400","rgb(17, 17, 17)","rgb(246, 243, 239)","0px",0,0,0,0]],"dark":[["section|Sign in#1","rgb(17, 17, 17)","rgb(246, 243, 239)"],["button|.mm-btn#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["button|.mm-btn#2","rgb(255, 255, 255)","rgb(0, 0, 0)"],["p|Sign in to get started#1","rgb(74, 74, 76)","rgba(0, 0, 0, 0)"],["span|Sign in with Google#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["span|Sign in with Apple#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["div|.mm#1","rgb(17, 17, 17)","rgb(246, 243, 239)"]]}
```
