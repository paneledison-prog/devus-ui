# Nexus today: Design

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
- Drawn on a 454x982 canvas (`NexusCanvas dim`) scaled to the 320px phone width; coordinates in Nexus.css are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={692}`, 39px radius): the screen draws its own status bar
- Colors are fixed by the image (grayed whites, peach, lavender, light green, blue to violet accents); text is Inter (`--font-sans`), not the original SF Pro
- Big cards use 40px corners and a 1px border; chips are 29px high pills; headings are 27-28px weight 500
- Week strip is flat: 14px names, 20px dates, 26px lotus marks

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

- Measured: 2026-10-05, at `/?template=nexus-today&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 40 probes. Dark: 40 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["section|Challenge#1",0,0,320,535.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h2|Focusing on two key challenges#1",13.5,332.5,226,59,34,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",13.5,332.5,226,58.5],["header|.nx-header#1",0,0,320,91.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h1|Nexus#1",53,53.5,63,28,30,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",53,54.5,63,25],["button|Search#1",247.5,55,25.5,25.5,13.3333,"400","rgb(154, 154, 160)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Notifications#1",282.5,55,25.5,25.5,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h2|100 day challenge#1",13.5,502.5,159.5,25.5,27,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",13.5,503.5,159.5,23],["section|110,732 People#1",8.5,540.5,303,282,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","40px",0,0,0,0],["nav|Primary#1",0,612.5,320,79.5,14,"400","rgb(42, 42, 46)","rgb(255, 255, 255)","0px",0,0,0,0],["button|.nx-tabs__item#1",4,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.nx-tabs__item#2",66.5,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.nx-tabs__item#3",129,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.nx-tabs__item#4",191,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.nx-tabs__item#5",253.5,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["span|Challenge!#1",24,218,107.5,26,19,"400","rgb(74, 74, 78)","rgb(244, 242, 242)","19px",53,222.5,66,16],["span|Mon#1",8,415.5,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",18,416.5,20.5,12],["span|22#1",8,430,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",19.5,431,17.5,17],["span|Tue#1",58,415.5,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",69.5,416.5,17,12],["span|23#1",58,430,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",69.5,431,17.5,17],["span|Wed#1",108,415.5,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",118,416.5,21,12],["span|24#1",108,430,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",119.5,431,17.5,17],["span|Thu#1",160.5,415.5,40.5,15.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",171.5,416.5,18,12],["span|25#1",160.5,430,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",172,431,17,17],["span|Fri#1",212.5,415.5,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",226.5,416.5,11.5,12],["span|26#1",212.5,430,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",224,431,17.5,17],["span|Sat#1",262.5,415.5,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",275,416.5,15,12],["span|27#1",262.5,430,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",274.5,431,16.5,17],["span|110,732 People#1",24.5,555,98.5,20.5,16,"400","rgb(119, 117, 122)","rgb(242, 240, 241)","15px",34,558,79,14],["span|Home#1",4,648.5,62,15.5,17,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",18.5,648.5,33,15],["span|Courses#1",66.5,648.5,62,15.5,17,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",74,648.5,46.5,15],["span|Today#1",129,648.5,62,15.5,17,"400","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","0px",143,648.5,34,15],["span|Profile#1",191,648.5,62,15.5,17,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",204,648.5,35.5,15],["span|More#1",253.5,648.5,62,15.5,17,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",270.5,648.5,29,15],["div|.nx#1",0,0,320,692,14,"400","rgb(42, 42, 46)","rgb(234, 232, 233)","0px",0,0,0,0],["div|.nx-week__day#1",7,409.5,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#2",57,409.5,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#3",107,409.5,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#4",159.5,409.5,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#5",211.5,409.5,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#6",261.5,409.5,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0]],"dark":[["section|Challenge#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["h2|Focusing on two key challenges#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["header|.nx-header#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["h1|Nexus#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["button|Search#1","rgb(154, 154, 160)","rgba(0, 0, 0, 0)"],["button|Notifications#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["h2|100 day challenge#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["section|110,732 People#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["nav|Primary#1","rgb(42, 42, 46)","rgb(255, 255, 255)"],["button|.nx-tabs__item#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["button|.nx-tabs__item#2","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["button|.nx-tabs__item#3","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["button|.nx-tabs__item#4","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["button|.nx-tabs__item#5","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|Challenge!#1","rgb(74, 74, 78)","rgb(244, 242, 242)"],["span|Mon#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|22#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Tue#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|23#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Wed#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|24#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Thu#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|25#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Fri#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|26#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Sat#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|27#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|110,732 People#1","rgb(119, 117, 122)","rgb(242, 240, 241)"],["span|Home#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|Courses#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|Today#1","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"],["span|Profile#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|More#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["div|.nx#1","rgb(42, 42, 46)","rgb(234, 232, 233)"],["div|.nx-week__day#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#2","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#3","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#4","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#5","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#6","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"]]}
```
