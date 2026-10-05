# Task list: Design

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

- Measured: 2026-10-05, at `/?template=task-list&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 22 probes. Dark: 22 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.app-bar#1",12,38,296,36,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","16px",0,0,0,0],["h2|Today#1",16,46,63,28,22,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",16,47,63,26],["section|Tasks#1",12,86,296,252,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","24px",0,0,0,0],["label|.ui-segmented__item#1",32,102,84,28,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["label|.ui-segmented__item#2",118,102,84,28,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["label|.ui-segmented__item#3",204,102,84,28,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h3|Morning#1",28,146,264,20,14,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",28,147,56.5,17],["label|Wake up on time#1",28,178,264,20,12,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",52,180,94.5,15],["input|#1",28,180,16,16,13.3333,"400","rgb(0, 0, 0)","rgb(255, 255, 255)","6px",0,0,0,0],["label|Gym / workout#1",28,210,264,20,12,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",52,212,83.5,15],["input|#2",28,212,16,16,13.3333,"400","rgb(0, 0, 0)","rgb(255, 255, 255)","6px",0,0,0,0],["h3|Workload#1",28,242,264,20,14,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",28,243,65,17],["label|Polish UI components#1",28,274,264,20,12,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",52,276,123.5,15],["input|#3",28,276,16,16,13.3333,"400","rgb(0, 0, 0)","rgb(255, 255, 255)","6px",0,0,0,0],["label|Share updates with team#1",28,306,264,20,12,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",52,308,140.5,15],["input|#4",28,308,16,16,13.3333,"400","rgb(0, 0, 0)","rgb(255, 255, 255)","6px",0,0,0,0],["span|To do#1",32,102,84,28,12,"500","rgb(24, 24, 27)","rgb(255, 255, 255)","9999px",58,108,32,15],["span|Completed#1",118,102,84,28,12,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","9999px",128.5,108,62.5,15],["span|Pending#1",204,102,84,28,12,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","9999px",222.5,108,47,15],["div|.app-phone#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","30px",0,0,0,0],["div|.app-phone__screen#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0],["div[radiogroup]|Filter#1",28,98,264,36,14,"400","rgb(24, 24, 27)","rgb(225, 225, 226)","9999px",0,0,0,0]],"dark":[["header|.app-bar#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h2|Today#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["section|Tasks#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["label|.ui-segmented__item#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["label|.ui-segmented__item#2","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["label|.ui-segmented__item#3","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h3|Morning#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["label|Wake up on time#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input|#1","rgb(0, 0, 0)","rgb(39, 39, 42)"],["label|Gym / workout#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input|#2","rgb(0, 0, 0)","rgb(39, 39, 42)"],["h3|Workload#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["label|Polish UI components#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input|#3","rgb(0, 0, 0)","rgb(39, 39, 42)"],["label|Share updates with team#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input|#4","rgb(0, 0, 0)","rgb(39, 39, 42)"],["span|To do#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["span|Completed#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|Pending#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["div|.app-phone#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.app-phone__screen#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div[radiogroup]|Filter#1","rgb(252, 252, 252)","rgb(63, 63, 70)"]]}
```
