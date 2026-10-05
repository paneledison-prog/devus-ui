# Dashboard: Design

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
- Sidebar 168px, hairline right border; main padding `--space-6`
- Stat cards: `--surface`, `--shadow-surface`, `--radius-2xl`, value 24px/32px weight 600
- Delta badges use tones success, accent and danger

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

- Measured: 2026-10-05, at `/?template=dashboard&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 27 probes. Dark: 27 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["aside|.tpl-side#1",0,0,168,440,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0],["a|Overview#1",16,56,135,32,14,"500","rgb(24, 24, 27)","rgb(235, 235, 236)","8px",28,63,63.5,17],["a|Projects#1",16,92,135,32,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","8px",28,99,54,17],["a|Reports#1",16,128,135,32,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","8px",28,135,51.5,17],["a|Team#1",16,164,135,32,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","8px",28,171,36.5,17],["h2|Overview#1",192,26,83,28,18,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",192,29,83,21],["div|Acme#1",16,16,135,20,14,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",44,17,39,17],["span|AB#1",640,24,32,32,14,"500","rgb(24, 24, 27)","rgb(235, 235, 236)","50%",646.5,31,19,17],["span|CD#1",664,24,32,32,14,"500","rgb(24, 24, 27)","rgb(235, 235, 236)","50%",670,31,20.5,17],["small|Revenue#1",208,88,128,20,12,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",208,90,49,15],["strong|$48.2k#1",208,112,128,32,24,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",208,113,82.5,29],["span|+12%#1",208,148,128,24,12,"500","rgb(14, 138, 67)","rgba(23, 201, 100, 0.15)","9999px",218,152,32.5,15],["small|Active users#1",380,88,128,20,12,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",380,90,70,15],["strong|2,931#1",380,112,128,32,24,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",380,113,63,29],["span|+4%#1",380,148,128,24,12,"500","rgb(29, 99, 174)","color(srgb 0.0156863 0.521569 0.968628 / 0.15)","9999px",390,152,28,15],["small|Errors#1",552,88,128,20,12,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",552,90,34.5,15],["strong|18#1",552,112,128,32,24,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",552,113,25.5,29],["span|-2%#1",552,148,128,24,12,"500","rgb(164, 53, 50)","rgba(255, 56, 60, 0.15)","9999px",562,152,24.5,15],["span|Quarterly goal#1",208,220,95.5,20,14,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",208,221,95.5,17],["span|72 %#1",433.5,220,30.5,20,14,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",433.5,221,30.5,17],["span|Onboarding#1",208,268,79,20,14,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",208,269,79,17],["span|41 %#1",435.5,268,28.5,20,14,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",435.5,269,28.5,17],["div|.tpl#1",0,0,720,440,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","16px",0,0,0,0],["div|.tpl-stat#1",192,72,160,116,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","16px",0,0,0,0],["div|.tpl-stat#2",364,72,160,116,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","16px",0,0,0,0],["div|.tpl-stat#3",536,72,160,116,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","16px",0,0,0,0],["div|.tpl-panel#1",192,204,504,116,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","16px",0,0,0,0]],"dark":[["aside|.tpl-side#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["a|Overview#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["a|Projects#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["a|Reports#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["a|Team#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["h2|Overview#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["div|Acme#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|AB#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["span|CD#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["small|Revenue#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["strong|$48.2k#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|+12%#1","rgb(91, 228, 155)","rgba(23, 201, 100, 0.15)"],["small|Active users#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["strong|2,931#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|+4%#1","rgb(124, 192, 251)","color(srgb 0.0156863 0.521569 0.968628 / 0.15)"],["small|Errors#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["strong|18#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|-2%#1","rgb(255, 122, 125)","rgba(255, 56, 60, 0.15)"],["span|Quarterly goal#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|72 %#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|Onboarding#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|41 %#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["div|.tpl#1","rgb(252, 252, 252)","rgb(0, 0, 0)"],["div|.tpl-stat#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.tpl-stat#2","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.tpl-stat#3","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.tpl-panel#1","rgb(252, 252, 252)","rgb(24, 24, 27)"]]}
```
