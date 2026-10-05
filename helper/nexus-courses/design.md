# Nexus courses: Design

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
- Drawn on a 454x982 canvas (`NexusCanvas`) scaled to the 320px phone width; coordinates in Nexus.css are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={692}`, 39px radius): the screen draws its own status bar and home indicator
- Colors are fixed by the image (white, grays, blue to violet gradient accents); text is Inter (`--font-sans`), not the original SF Pro
- Cards use 28px corners and a 1px `#eceef2` border; big cards use 40px corners
- Tab bar from y 869 with a 1px top border; active tab uses a `#4c8df6` to `#9566f2` gradient on icon and label

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

- Measured: 2026-10-05, at `/?template=nexus-courses&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 25 probes. Dark: 25 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["h2|Suggested for you#1",13.5,61.5,174.5,25.5,29,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",13.5,61.5,174.5,25],["section|Suggested lesson#1",8.5,100,303,282,14,"400","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","40px",0,0,0,0],["h3|Mastering The Art Of Handcrafted#1",36,317.5,137,43.5,23,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",36,317.5,137,42],["button|Play lesson#1",248.5,320.5,35,35,13.3333,"400","rgb(142, 142, 147)","rgb(243, 243, 245)","50%",0,0,0,0],["h2|Learn by doing#1",13.5,405.5,141.5,25.5,29,"500","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",13.5,405.5,141.5,25],["h3|Nature And Wildlife#1",25,599.5,123,17,19,"600","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",25,599.5,123,16],["h3|Debt Management#1",177,599.5,117,17,19,"600","rgb(42, 42, 46)","rgba(0, 0, 0, 0)","0px",177,599.5,117,16],["nav|Primary#1",0,612.5,320,79.5,14,"400","rgb(42, 42, 46)","rgb(255, 255, 255)","0px",0,0,0,0],["button|.nx-tabs__item#1",4,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.nx-tabs__item#2",66.5,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.nx-tabs__item#3",129,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.nx-tabs__item#4",191,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.nx-tabs__item#5",253.5,613.5,62,58,13.3333,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["span|Lesson 34#1",22,113,74,24.5,16,"400","rgb(142, 142, 147)","rgb(255, 255, 255)","18px",31.5,118.5,55.5,14],["p|Photography#1",25,581,68,15.5,16,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",25,581,68,14],["p|Financial#1",177,581,47.5,15.5,16,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",177,581,47.5,14],["span|Home#1",4,648.5,62,15.5,17,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",18.5,648.5,33,15],["span|Courses#1",66.5,648.5,62,15.5,17,"400","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","0px",74,648.5,46.5,15],["span|Today#1",129,648.5,62,15.5,17,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",143,648.5,34,15],["span|Profile#1",191,648.5,62,15.5,17,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",204,648.5,35.5,15],["span|More#1",253.5,648.5,62,15.5,17,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",270.5,648.5,29,15],["div|.nx#1",0,0,320,692,14,"400","rgb(42, 42, 46)","rgb(255, 255, 255)","0px",0,0,0,0],["div|.nx-sug__panel#1",18.5,302.5,283.5,70.5,14,"400","rgb(42, 42, 46)","rgb(255, 255, 255)","28px",0,0,0,0],["article|.nx-course#1",14,442.5,139.5,225.5,14,"400","rgb(42, 42, 46)","rgb(255, 255, 255)","28px",0,0,0,0],["article|.nx-course#2",166.5,442.5,139.5,225.5,14,"400","rgb(42, 42, 46)","rgb(255, 255, 255)","28px",0,0,0,0]],"dark":[["h2|Suggested for you#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["section|Suggested lesson#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["h3|Mastering The Art Of Handcrafted#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["button|Play lesson#1","rgb(142, 142, 147)","rgb(243, 243, 245)"],["h2|Learn by doing#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["h3|Nature And Wildlife#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["h3|Debt Management#1","rgb(42, 42, 46)","rgba(0, 0, 0, 0)"],["nav|Primary#1","rgb(42, 42, 46)","rgb(255, 255, 255)"],["button|.nx-tabs__item#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["button|.nx-tabs__item#2","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["button|.nx-tabs__item#3","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["button|.nx-tabs__item#4","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["button|.nx-tabs__item#5","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|Lesson 34#1","rgb(142, 142, 147)","rgb(255, 255, 255)"],["p|Photography#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["p|Financial#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|Home#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|Courses#1","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"],["span|Today#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|Profile#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|More#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["div|.nx#1","rgb(42, 42, 46)","rgb(255, 255, 255)"],["div|.nx-sug__panel#1","rgb(42, 42, 46)","rgb(255, 255, 255)"],["article|.nx-course#1","rgb(42, 42, 46)","rgb(255, 255, 255)"],["article|.nx-course#2","rgb(42, 42, 46)","rgb(255, 255, 255)"]]}
```
