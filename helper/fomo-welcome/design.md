# Fomo welcome: Design

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
- Drawn on a 473x1023 canvas scaled to the 320px phone width; coordinates in Fomo.css are canvas pixels taken from the reference image
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

- Measured: 2026-10-05, at `/?template=fomo-welcome&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 8 probes. Dark: 8 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["section|Welcome#1",0,0,320,692,14,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h1|Welcome to Fomo#1",0,458,320,40.5,40,"800","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",46,461,227.5,33],["button|.fm-btn#1",30,544.5,260.5,45.5,23,"800","rgb(0, 0, 0)","rgb(255, 255, 255)","34px",0,0,0,0],["button|.fm-btn#2",30,600,260.5,45.5,23,"800","rgb(255, 255, 255)","rgba(255, 255, 255, 0.09)","34px",0,0,0,0],["p|Trade the hottest memecoins#1",0,504.5,320,20.5,23,"500","rgb(124, 145, 132)","rgba(0, 0, 0, 0)","0px",52.5,504.5,215,19],["span|Continue with Apple#1",98,558,149.5,19,23,"800","rgb(0, 0, 0)","rgba(0, 0, 0, 0)","0px",98,557,149.5,19],["span|Continue with Phone#1",83.5,613.5,153,19,23,"800","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",83.5,612.5,153,19],["div|.fm#1",0,0,320,692,14,"400","rgb(255, 255, 255)","rgb(10, 34, 24)","0px",0,0,0,0]],"dark":[["section|Welcome#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["h1|Welcome to Fomo#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.fm-btn#1","rgb(0, 0, 0)","rgb(255, 255, 255)"],["button|.fm-btn#2","rgb(255, 255, 255)","rgba(255, 255, 255, 0.09)"],["p|Trade the hottest memecoins#1","rgb(124, 145, 132)","rgba(0, 0, 0, 0)"],["span|Continue with Apple#1","rgb(0, 0, 0)","rgba(0, 0, 0, 0)"],["span|Continue with Phone#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["div|.fm#1","rgb(255, 255, 255)","rgb(10, 34, 24)"]]}
```
