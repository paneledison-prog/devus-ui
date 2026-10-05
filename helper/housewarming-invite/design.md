# Housewarming invite: Design

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
- Canvas 517x1126 scaled to the 320px phone width; coordinates in Party.css are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={697}`, 39px radius): the screen draws its own status bar
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

- Measured: 2026-10-05, at `/?template=housewarming-invite&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 17 probes. Dark: 17 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Close#1",15.5,53,34.5,34.5,13.3333,"400","rgb(0, 0, 0)","rgba(255, 255, 255, 0.22)","50%",0,0,0,0],["button|More#1",269,53,34.5,34.5,13.3333,"400","rgb(0, 0, 0)","rgba(255, 255, 255, 0.22)","50%",0,0,0,0],["h1|Housewarming Party#1",0,297,320,54.5,47,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",59,293,202,62],["button[radio]|.pt-rsvp__opt#1",18.5,432.5,91,42,18,"500","rgb(31, 163, 74)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button[radio]|.pt-rsvp__opt#2",109.5,432.5,97,42,18,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button[radio]|.pt-rsvp__opt#3",206.5,432.5,97,42,18,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["section|Hosted by Andre Lorico#1",15.5,491,289.5,151,14,"400","rgb(255, 255, 255)","rgba(70, 84, 84, 0.5)","32px",0,0,0,0],["button|Scroll Down to see full post#1",81,656,158.5,18.5,17,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)","15px",83,658.5,130,13],["p|19 September, 12 pm 1559 Audubon Ave New York, N#1",0,374,320,48.5,20,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",100.5,374,118.5,47],["span|Going#1",49,454.5,30.5,13.5,18,"500","rgb(31, 163, 74)","rgba(0, 0, 0, 0)","0px",49,453.5,30.5,14],["span|Not Going#1",132.5,454.5,51.5,13.5,18,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",132.5,453.5,51.5,14],["span|Maybe#1",238,454.5,35,13.5,18,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",238,453.5,35,14],["p|Hosted by Andre Lorico#1",16.5,534,287.5,15,18,"500","rgb(174, 180, 238)","rgba(0, 0, 0, 0)","0px",100,534,121,14],["p|We’ve just moved to New York! And warmer weather#1",16.5,549,287.5,33.5,18,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",82,547,157,36.5],["div|.pt#1",0,0,320,697,14,"400","rgb(255, 255, 255)","rgb(13, 74, 76)","0px",0,0,0,0],["div[radiogroup]|Your RSVP#1",18.5,432.5,285.5,42,14,"400","rgb(255, 255, 255)","rgba(60, 76, 78, 0.55)","34px",0,0,0,0],["img|.pt-card__avatar#1",145,504,32,32,14,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","50%",0,0,0,0]],"dark":[["button|Close#1","rgb(0, 0, 0)","rgba(255, 255, 255, 0.22)"],["button|More#1","rgb(0, 0, 0)","rgba(255, 255, 255, 0.22)"],["h1|Housewarming Party#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button[radio]|.pt-rsvp__opt#1","rgb(31, 163, 74)","rgba(0, 0, 0, 0)"],["button[radio]|.pt-rsvp__opt#2","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button[radio]|.pt-rsvp__opt#3","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["section|Hosted by Andre Lorico#1","rgb(255, 255, 255)","rgba(70, 84, 84, 0.5)"],["button|Scroll Down to see full post#1","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)"],["p|19 September, 12 pm 1559 Audubon Ave New York, N#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["span|Going#1","rgb(31, 163, 74)","rgba(0, 0, 0, 0)"],["span|Not Going#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Maybe#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|Hosted by Andre Lorico#1","rgb(174, 180, 238)","rgba(0, 0, 0, 0)"],["p|We’ve just moved to New York! And warmer weather#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["div|.pt#1","rgb(255, 255, 255)","rgb(13, 74, 76)"],["div[radiogroup]|Your RSVP#1","rgb(255, 255, 255)","rgba(60, 76, 78, 0.55)"],["img|.pt-card__avatar#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"]]}
```
