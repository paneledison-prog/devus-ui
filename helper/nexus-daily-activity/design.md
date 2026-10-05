# Nexus daily activity: Design

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

- Measured: 2026-10-05, at `/?template=nexus-daily-activity&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 29 probes. Dark: 29 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["h2|Daily activity#1",17,56.5,113,25.5,27,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",17,57.5,113,23],["h2|100 Day Challenge#1",13.5,187,176.5,25.5,29,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",13.5,187,176.5,25],["section|110,732 People#1",8.5,225,303,282,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","40px",0,0,0,0],["h3|Applying ‘Into Equations’ in problem solving#1",36,440,180,42.5,22,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",36,441,180,40],["button|Open#1",248.5,445,35,35,13.3333,"400","rgb(111, 109, 114)","rgb(230, 227, 229)","50%",0,0,0,0],["h2|Science & Engineering#1",13.5,529.5,213,25.5,29,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",13.5,529.5,213,25],["section|8,240 People#1",8.5,566.5,303,282,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","40px",0,0,0,0],["span|Mon#1",12.5,99,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",22,100,20.5,12],["span|22#1",12.5,114,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",23.5,115,17.5,17],["span|Tue#1",61.5,99,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",73,100,17,12],["span|23#1",61.5,114,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",73,115,17.5,17],["span|Wed#1",111.5,99,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",121.5,100,21,12],["span|24#1",111.5,114,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",123,115,17.5,17],["span|Thu#1",164,99,40.5,15.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",175,100,18,12],["span|25#1",164,114,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",175.5,115,17,17],["span|Fri#1",216,99,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",230,100,11.5,12],["span|26#1",216,114,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",227.5,115,17.5,17],["span|Sat#1",266,99,40.5,15.5,14,"400","rgb(169, 167, 170)","rgba(0, 0, 0, 0)","0px",278.5,100,15,12],["span|27#1",266,114,40.5,19.5,20,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",278,115,16.5,17],["span|110,732 People#1",24.5,239,98.5,20.5,16,"400","rgb(119, 117, 122)","rgb(242, 240, 241)","15px",34,242.5,79,14],["span|8,240 People#1",24.5,581,90.5,20.5,16,"400","rgb(119, 117, 122)","rgb(242, 240, 241)","15px",34,584.5,71,14],["div|.nx#1",0,0,320,692,14,"400","rgb(42, 42, 46)","rgb(234, 232, 233)","0px",0,0,0,0],["div|.nx-week__day#1",11.5,93,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#2",60.5,93,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#3",110.5,93,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#4",163,93,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#5",215,93,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-week__day#6",265,93,42.5,70.5,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["div|.nx-sug__panel#1",18.5,427.5,283.5,70.5,14,"400","rgb(42, 42, 46)","rgb(239, 237, 238)","28px",0,0,0,0]],"dark":[["h2|Daily activity#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["h2|100 Day Challenge#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["section|110,732 People#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["h3|Applying ‘Into Equations’ in problem solving#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["button|Open#1","rgb(111, 109, 114)","rgb(230, 227, 229)"],["h2|Science & Engineering#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["section|8,240 People#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Mon#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|22#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Tue#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|23#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Wed#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|24#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Thu#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|25#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Fri#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|26#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|Sat#1","rgb(169, 167, 170)","rgba(0, 0, 0, 0)"],["span|27#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["span|110,732 People#1","rgb(119, 117, 122)","rgb(242, 240, 241)"],["span|8,240 People#1","rgb(119, 117, 122)","rgb(242, 240, 241)"],["div|.nx#1","rgb(42, 42, 46)","rgb(234, 232, 233)"],["div|.nx-week__day#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#2","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#3","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#4","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#5","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-week__day#6","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["div|.nx-sug__panel#1","rgb(42, 42, 46)","rgb(239, 237, 238)"]]}
```
