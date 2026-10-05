# Landing page: Design

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
- Canvas 720x440, radius `--radius-2xl`, background `--background`
- Headline 40px/44px, weight 600, letter-spacing -0.02em, max width 480px
- Hero glow: `radial-gradient(60% 70% at 50% 0%, var(--accent-soft), transparent 70%)`

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

- Measured: 2026-10-05, at `/?template=landing-page&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 11 probes. Dark: 11 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.tpl-nav#1",0,0,720,57,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Get started#1",597.5,12,98.5,32,14,"500","rgb(252, 252, 252)","rgb(4, 133, 247)","24px",609.5,19,74.5,17],["h1|Ship polished interfaces in half the time#1",120,164.5,480,88,40,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",136,161.5,448,93],["button|Start free#1",248,332.5,103,40,14,"500","rgb(252, 252, 252)","rgb(4, 133, 247)","24px",268,343.5,63,17],["button|Live demo#1",363,332.5,109,40,14,"500","rgb(24, 24, 27)","rgb(235, 235, 236)","24px",383,343.5,69,17],["b|Acme#1",62,18,39,20,14,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",62,19,39,17],["span|Features#1",386.5,18,57.5,20,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",386.5,19,57.5,17],["span|Docs#1",459.5,18,34,20,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",459.5,19,34,17],["span|Changelog#1",509.5,18,72,20,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",509.5,19,72,17],["span|New release#1",314.5,124.5,91,24,12,"500","rgb(29, 99, 174)","color(srgb 0.0156863 0.521569 0.968628 / 0.15)","9999px",324.5,128.5,71,15],["div|.tpl#1",0,0,720,440,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","16px",0,0,0,0]],"dark":[["header|.tpl-nav#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Get started#1","rgb(252, 252, 252)","rgb(4, 133, 247)"],["h1|Ship polished interfaces in half the time#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Start free#1","rgb(252, 252, 252)","rgb(4, 133, 247)"],["button|Live demo#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["b|Acme#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|Features#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|Docs#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|Changelog#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|New release#1","rgb(124, 192, 251)","color(srgb 0.0156863 0.521569 0.968628 / 0.15)"],["div|.tpl#1","rgb(252, 252, 252)","rgb(0, 0, 0)"]]}
```
