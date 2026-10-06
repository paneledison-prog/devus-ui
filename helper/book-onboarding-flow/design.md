# Book onboarding flow: Design

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
- Canvas 390x843 scaled to the 320px phone width; coordinates in Books.css are canvas pixels taken from the reference images
- Phone frame is bare (`PhoneFrame bare height={692}`, 39px radius): the screens draw their own status bar
- Colors and sizes are fixed by the images; text is Inter (`--font-sans`) unless noted

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

- Measured: 2026-10-05, at `/?template=book-onboarding-flow&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 7 probes. Dark: 7 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["h1|Learn Smarter Not Longer#1",0,471,320,24.5,23,"600","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",46.5,471,227,23],["button[tab]|Page 1#1",143.5,578.5,6.5,6.5,13.3333,"400","rgb(17, 17, 17)","rgb(17, 17, 17)","50%",0,0,0,0],["button[tab]|Page 2#1",156.5,578.5,6.5,6.5,13.3333,"400","rgb(17, 17, 17)","rgb(207, 207, 210)","50%",0,0,0,0],["button[tab]|Page 3#1",170,578.5,6.5,6.5,13.3333,"400","rgb(17, 17, 17)","rgb(207, 207, 210)","50%",0,0,0,0],["button|Continue#1",17,619.5,285.5,47,16,"500","rgb(255, 255, 255)","rgb(10, 10, 10)","16px",131.5,634.5,56.5,16],["div|.bk#1",0,0,320,691.5,14,"400","rgb(17, 17, 17)","rgb(255, 255, 255)","0px",0,0,0,0],["div[tablist]|Pages#1",131.5,569.5,57.5,24.5,14,"400","rgb(17, 17, 17)","rgb(238, 238, 239)","15px",0,0,0,0]],"dark":[["h1|Learn Smarter Not Longer#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["button[tab]|Page 1#1","rgb(17, 17, 17)","rgb(17, 17, 17)"],["button[tab]|Page 2#1","rgb(17, 17, 17)","rgb(207, 207, 210)"],["button[tab]|Page 3#1","rgb(17, 17, 17)","rgb(207, 207, 210)"],["button|Continue#1","rgb(255, 255, 255)","rgb(10, 10, 10)"],["div|.bk#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["div[tablist]|Pages#1","rgb(17, 17, 17)","rgb(238, 238, 239)"]]}
```
