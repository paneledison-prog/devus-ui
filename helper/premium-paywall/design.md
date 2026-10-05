# Premium paywall: Design

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
- Drawn on a 446x970 canvas (`PayCanvas`) scaled to the 320px phone width; coordinates in the Paywall.css rules are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={696}`, 39px radius): the screen draws its own status bar and home indicator
- Colors are fixed by the image (`#62C5FF`, `#191919`, white, grays); text is Inter (`--font-sans`), not the original SF Pro
- Hero 446x612 `#62C5FF` with 56px bottom corners; black `#191919` strip under it; white sheet from y 675 with 48px top corners
- Title 30px/36px weight 600; subtitle 17px/22px white at 60%; plan name 17px/500; price 17px/600; CTA 393x53 pill `#62C5FF`

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

- Measured: 2026-10-05, at `/?template=premium-paywall&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 18 probes. Dark: 18 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Close#1",16,58,31.5,31.5,13.3333,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.22)","50%",0,0,0,0],["h1|Level Up with Premium#1",0,145.5,320,51.5,30,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",90,144.5,139.5,52],["button|Restore Purchases#1",0,452,320,20,17,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",117.5,454,109,15],["section|Plans#1",0,484.5,320,211.5,14,"400","rgb(17, 17, 17)","rgb(255, 255, 255)","48px",0,0,0,0],["button|Start Free Trial#1",19.5,599,282,38,17,"600","rgb(255, 255, 255)","rgb(98, 197, 255)","27px",117,610,86.5,15],["button|Terms of Service#1",0,647,320,14.5,16,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",114,647,92.5,14],["p|Because basic just isn’t enough.#1",0,203,320,31.5,17,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",106,203,108,31],["span|Annual#1",44.5,503,40.5,16,17,"500","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",44.5,503,40.5,15],["span|$35.99 /year#1",44.5,520,102,13,14,"400","rgb(123, 123, 130)","rgba(0, 0, 0, 0)","0px",44.5,520,61,12],["s|$69.99#1",112.5,520,34,12,14,"400","rgb(127, 182, 224)","rgba(0, 0, 0, 0)","0px",112.5,520,34,12],["span|$2.99/month#1",223.5,511,77,16,17,"600","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",223.5,511,77,15],["span|Monthly#1",44.5,551,47.5,16,17,"500","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",44.5,551,47.5,15],["span|$59.99/year#1",44.5,568,58,13,14,"400","rgb(123, 123, 130)","rgba(0, 0, 0, 0)","0px",44.5,568,58,12],["span|$5.99/month#1",224,559,76.5,16,17,"600","rgb(17, 17, 17)","rgba(0, 0, 0, 0)","0px",224,559,76.5,15],["div|.pw#1",0,0,320,696,14,"400","rgb(17, 17, 17)","rgb(25, 25, 25)","0px",0,0,0,0],["div|.pw__hero#1",0,0,320,439,14,"400","rgb(17, 17, 17)","rgb(98, 197, 255)","0px",0,0,0,0],["div|.pw__strip#1",0,439,320,86,14,"400","rgb(17, 17, 17)","rgb(25, 25, 25)","0px",0,0,0,0],["span|.pw__restore-icon#1",93.5,453.5,17,17,17,"500","rgb(255, 255, 255)","rgb(98, 197, 255)","50%",0,0,0,0]],"dark":[["button|Close#1","rgb(255, 255, 255)","rgba(255, 255, 255, 0.22)"],["h1|Level Up with Premium#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Restore Purchases#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["section|Plans#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["button|Start Free Trial#1","rgb(255, 255, 255)","rgb(98, 197, 255)"],["button|Terms of Service#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["p|Because basic just isn’t enough.#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["span|Annual#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["span|$35.99 /year#1","rgb(123, 123, 130)","rgba(0, 0, 0, 0)"],["s|$69.99#1","rgb(127, 182, 224)","rgba(0, 0, 0, 0)"],["span|$2.99/month#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["span|Monthly#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["span|$59.99/year#1","rgb(123, 123, 130)","rgba(0, 0, 0, 0)"],["span|$5.99/month#1","rgb(17, 17, 17)","rgba(0, 0, 0, 0)"],["div|.pw#1","rgb(17, 17, 17)","rgb(25, 25, 25)"],["div|.pw__hero#1","rgb(17, 17, 17)","rgb(98, 197, 255)"],["div|.pw__strip#1","rgb(17, 17, 17)","rgb(25, 25, 25)"],["span|.pw__restore-icon#1","rgb(255, 255, 255)","rgb(98, 197, 255)"]]}
```
