# Voice rooms flow: Design

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
- Canvas 390x843 scaled to the 320px phone width; coordinates in Voice.css are canvas pixels taken from the reference images
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

- Measured: 2026-10-05, at `/?template=voice-rooms-flow&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 32 probes. Dark: 32 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Messages, 9#1",15,60,47.5,18,12,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Creator card#1",181,57.5,37,23,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Your voice, 219#1",269,51,36,36,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.vc-card#1",15,97,138,246,13.3333,"400","rgb(255, 255, 255)","rgb(51, 51, 51)","22px",0,0,0,0],["button|.vc-card#2",161,97,138,246,13.3333,"400","rgb(255, 255, 255)","rgb(242, 213, 23)","22px",0,0,0,0],["button|#1",15,357.5,290.5,31,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|#2",15,400.5,290.5,39.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|#3",15,451.5,290.5,31,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|#4",15,494,290.5,31,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button[tab]|Universe#1",18,615.5,138.5,37.5,15,"500","rgb(255, 255, 255)","rgba(255, 255, 255, 0.06)","26px",70.5,626,52.5,15],["button[tab]|Room#1",163.5,615.5,138.5,37.5,15,"500","rgb(17, 17, 17)","rgb(255, 255, 255)","26px",228,626,33.5,15],["span|9#1",37.5,61.5,24.5,15,12,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",37.5,62,6.5,12],["b|219#1",279,64,16.5,10,12,"700","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",279,62,16.5,12],["span|MUSIC#1",26.5,228,72.5,16.5,20,"800","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",46,226,53,20],["span|VOICE SS22#1",172.5,268.5,53,7.5,8,"600","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",183,267.5,42.5,8],["b|Behind the Scenes#1",172.5,287,96,42.5,24,"800","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",172.5,285,96,45.5],["span|LIVE#1",56,359,25.5,13,9,"700","rgb(255, 255, 255)","rgb(255, 90, 31)","4px",60,361,17.5,9],["span|2#1",87,360,30,11.5,11,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",87,360,5.5,11],["b|Moxie Marlinspike Show#1",56,374.5,216.5,13,13,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",56,374.5,124,13],["em|7#1",282.5,364.5,18,18,11,"600","rgb(17, 17, 17)","rgb(255, 255, 255)","6px",288.5,368,5,11],["span|LIVE#2",56,400.5,25.5,13,9,"700","rgb(255, 255, 255)","rgb(255, 90, 31)","4px",60,402.5,17.5,9],["span|12#1",87,401,34,11.5,11,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",87,401,9.5,11],["b|Town Hall: celebrating the Learn DAO launch#1",56,413.5,216.5,26.5,13,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",56,413.5,190,26],["small|Tomorrow, 8:30am#1",56,453,216.5,11.5,12,"400","rgb(170, 170, 170)","rgba(0, 0, 0, 0)","0px",56,452,87.5,12],["b|Can I help you?#1",56,467.5,216.5,13,13,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",56,467.5,78,13],["em|18#1",282.5,458,18,18,11,"600","rgb(17, 17, 17)","rgb(255, 255, 255)","6px",286.5,461.5,9.5,11],["small|January 29, 4pm#1",56,495.5,216.5,11.5,12,"400","rgb(170, 170, 170)","rgba(0, 0, 0, 0)","0px",56,494.5,79,12],["b|5 minutes with Griffin#1",56,510.5,216.5,13,13,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",56,510.5,108.5,13],["div|.vc#1",0,0,320,691.5,14,"400","rgb(255, 255, 255)","rgb(27, 27, 28)","0px",0,0,0,0],["div|.vc-home#1",0,0,320,691.5,14,"400","rgb(255, 255, 255)","rgb(24, 24, 25)","0px",0,0,0,0],["img|.vc-pinkav#1",15,451.5,31,31,13.3333,"400","rgb(255, 255, 255)","rgb(240, 106, 160)","10px",0,0,0,0],["div[tablist]|.vc-switch#1",15,612,290.5,44.5,14,"400","rgb(255, 255, 255)","rgba(40, 40, 42, 0.85)","30px",0,0,0,0]],"dark":[["button|Messages, 9#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Creator card#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Your voice, 219#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.vc-card#1","rgb(255, 255, 255)","rgb(51, 51, 51)"],["button|.vc-card#2","rgb(255, 255, 255)","rgb(242, 213, 23)"],["button|#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|#2","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|#3","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|#4","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button[tab]|Universe#1","rgb(255, 255, 255)","rgba(255, 255, 255, 0.06)"],["button[tab]|Room#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["span|9#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["b|219#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|MUSIC#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|VOICE SS22#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["b|Behind the Scenes#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["span|LIVE#1","rgb(255, 255, 255)","rgb(255, 90, 31)"],["span|2#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["b|Moxie Marlinspike Show#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["em|7#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["span|LIVE#2","rgb(255, 255, 255)","rgb(255, 90, 31)"],["span|12#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["b|Town Hall: celebrating the Learn DAO launch#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|Tomorrow, 8:30am#1","rgb(170, 170, 170)","rgba(0, 0, 0, 0)"],["b|Can I help you?#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["em|18#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["small|January 29, 4pm#1","rgb(170, 170, 170)","rgba(0, 0, 0, 0)"],["b|5 minutes with Griffin#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["div|.vc#1","rgb(255, 255, 255)","rgb(27, 27, 28)"],["div|.vc-home#1","rgb(255, 255, 255)","rgb(24, 24, 25)"],["img|.vc-pinkav#1","rgb(255, 255, 255)","rgb(240, 106, 160)"],["div[tablist]|.vc-switch#1","rgb(255, 255, 255)","rgba(40, 40, 42, 0.85)"]]}
```
