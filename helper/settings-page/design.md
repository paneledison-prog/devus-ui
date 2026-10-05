# Settings page: Design

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
- Same shell as the Dashboard template
- Panels are `--surface` cards with `--shadow-surface`
- Toggles use the library Switch (40x20 track)

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

- Measured: 2026-10-05, at `/?template=settings-page&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 19 probes. Dark: 19 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["aside|.tpl-side#1",0,0,168,440,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0],["a|Profile#1",16,56,135,32,14,"500","rgb(24, 24, 27)","rgb(235, 235, 236)","8px",28,63,43,17],["a|Notifications#1",16,92,135,32,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","8px",28,99,83.5,17],["a|Security#1",16,128,135,32,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","8px",28,135,55,17],["a|Billing#1",16,164,135,32,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","8px",28,171,39.5,17],["h2|Profile#1",192,26,56.5,28,18,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",192,29,56.5,21],["button|Save changes#1",578,24,118,32,14,"500","rgb(252, 252, 252)","rgb(4, 133, 247)","24px",590,31,94,17],["label|Display name#1",208,88,256,24,14,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",208,91,90,17],["input|Ada Lovelace#1",208,118,256,36,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","12px",0,0,0,0],["label|Email#1",208,166,256,24,14,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",208,169,36,17],["input|ada@example.com#1",208,196,256,36,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","12px",0,0,0,0],["label|Email me product updates#1",208,280,472,20,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",260,281,172.5,17],["input[switch]|#1",208,280,40,20,13.3333,"400","rgb(0, 0, 0)","rgb(4, 133, 247)","9999px",0,0,0,0],["label|Show my profile publicly#1",208,312,472,20,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",260,313,162.5,17],["input[switch]|#2",208,312,40,20,13.3333,"400","rgb(0, 0, 0)","rgb(235, 235, 236)","9999px",0,0,0,0],["div|Settings#1",16,16,135,20,14,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",44,17,56,17],["div|.tpl#1",0,0,720,440,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","16px",0,0,0,0],["div|.tpl-panel#1",192,72,504,176,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","16px",0,0,0,0],["div|.tpl-panel#2",192,264,504,84,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","16px",0,0,0,0]],"dark":[["aside|.tpl-side#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["a|Profile#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["a|Notifications#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["a|Security#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["a|Billing#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["h2|Profile#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Save changes#1","rgb(252, 252, 252)","rgb(4, 133, 247)"],["label|Display name#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input|Ada Lovelace#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["label|Email#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input|ada@example.com#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["label|Email me product updates#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input[switch]|#1","rgb(0, 0, 0)","rgb(4, 133, 247)"],["label|Show my profile publicly#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input[switch]|#2","rgb(0, 0, 0)","rgb(39, 39, 42)"],["div|Settings#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["div|.tpl#1","rgb(252, 252, 252)","rgb(0, 0, 0)"],["div|.tpl-panel#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.tpl-panel#2","rgb(252, 252, 252)","rgb(24, 24, 27)"]]}
```
