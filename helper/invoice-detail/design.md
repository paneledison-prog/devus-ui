# Invoice detail: Design

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
- Touch targets are at least 40px; pills and buttons use `--radius-full` or 16 to 22px radii
- Cards use `--app-card-bg` (gray on the white screen); the total is 30px bold with tabular figures
- Dashed divider below the summary; the primary action uses `--accent`
- Avatar is initials on a soft pink tile

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

- Measured: 2026-10-05, at `/?template=invoice-detail&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 37 probes. Dark: 37 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.app-bar#1",0,38,320,56,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","16px",0,0,0,0],["button|Back#1",8,42,44,44,13.3333,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","50%",0,0,0,0],["h2|Invoice detail#1",108.5,52,102.5,24,16,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",108.5,54,102.5,20],["section|Invoice summary#1",16,94,288,137,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["section|.inv-card#1",16,247,288,108,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","20px",0,0,0,0],["h2|Billed to#1",32,263,256,20,15,"700","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",32,263,56.5,19],["section|.inv-card#2",16,371,288,264,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","20px",0,0,0,0],["h2|Item details#1",32,387,256,20,15,"700","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",32,387,82,19],["button|Download PDF#1",16,590,138,44,13,"600","rgb(24, 24, 27)","rgb(245, 245, 245)","9999px",50,604,91.5,16],["button|Share#1",166,590,138,44,13,"600","rgb(252, 252, 252)","rgb(4, 133, 247)","9999px",228,604,36.5,16],["span|INV-110450#1",40,101,72,18,13,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",40,102,72,16],["span|Paid#1",120,98,45,24,12,"500","rgb(14, 138, 67)","rgba(23, 201, 100, 0.15)","9999px",130,102,25,15],["p|$4,950.00#1",16,130,288,34,30,"700","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",16,129,146.5,36],["dt|Issued date#1",16,176,136,16,12,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",16,176,66.5,15],["dd|24 Aug, 2026#1",16,196,136,18,13,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",16,197,85.5,16],["dt|Due date#1",168,176,136,16,12,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",168,176,51.5,15],["dd|7 Sep, 2026#1",168,196,136,18,13,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",168,197,75.5,16],["p|Acme Studio#1",88,298,173.5,20,14,"600","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",88,299,86,17],["span|acmestudio@example.com#1",108,320,153.5,16,12,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",108,320,153.5,15],["th|Description#1",32,419,177.5,27.5,12,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",33,421,66,15],["th|Qty#1",209.5,419,26,27.5,12,"500","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",212,421,20.5,15],["td|Mobile app development#1",32,446.5,177.5,34.5,13,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",32,456,153.5,16],["td|1#1",209.5,446.5,26,34.5,13,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",218,456,8.5,16],["td|$3,000#1",235.5,446.5,53,34.5,13,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",242.5,456,45.5,16],["td|Website design#1",32,481,177.5,34,13,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",32,490,95.5,16],["td|1#2",209.5,481,26,34,13,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",218,490,8.5,16],["td|$1,500#1",235.5,481,53,34,13,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",242.5,490,45.5,16],["dt|Subtotal#1",32,528,50.5,18,13,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",32,529,50.5,16],["dd|$4,500#1",242.5,528,45.5,18,13,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",242.5,529,45.5,16],["dt|Tax ( 10 %)#1",32,554,61.5,18,13,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",32,555,61.5,16],["dd|$450#1",254.5,554,33.5,18,13,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",254.5,555,33.5,16],["dt|Total#1",32,597,33.5,18,14,"700","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",32,597,33.5,17],["div|.app-phone#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","30px",0,0,0,0],["div|.app-phone__screen#1",0,0,320,660,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0],["dl|.inv-totals#1",32,515,256,104,13,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["div|.inv-totals__total#1",32,584,256,35,13,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["div|.inv-actions#1",0,582,320,78,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","0px",0,0,0,0]],"dark":[["header|.app-bar#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Back#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h2|Invoice detail#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["section|Invoice summary#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["section|.inv-card#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["h2|Billed to#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["section|.inv-card#2","rgb(252, 252, 252)","rgb(39, 39, 42)"],["h2|Item details#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["button|Download PDF#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["button|Share#1","rgb(252, 252, 252)","rgb(4, 133, 247)"],["span|INV-110450#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["span|Paid#1","rgb(91, 228, 155)","rgba(23, 201, 100, 0.15)"],["p|$4,950.00#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["dt|Issued date#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["dd|24 Aug, 2026#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["dt|Due date#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["dd|7 Sep, 2026#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["p|Acme Studio#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["span|acmestudio@example.com#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["th|Description#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["th|Qty#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["td|Mobile app development#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["td|1#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["td|$3,000#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["td|Website design#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["td|1#2","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["td|$1,500#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["dt|Subtotal#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["dd|$4,500#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["dt|Tax ( 10 %)#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["dd|$450#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["dt|Total#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["div|.app-phone#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["div|.app-phone__screen#1","rgb(252, 252, 252)","rgb(24, 24, 27)"],["dl|.inv-totals#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["div|.inv-totals__total#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["div|.inv-actions#1","rgb(252, 252, 252)","rgb(24, 24, 27)"]]}
```
