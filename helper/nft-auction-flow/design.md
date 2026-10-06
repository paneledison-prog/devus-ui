# NFT auction flow: Design

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
- Canvas 327x703 scaled to the 320px phone width; coordinates in Auction.css are canvas pixels taken from the reference images
- Phone frame is bare (`PhoneFrame bare height={688}`, 39px radius): the screens draw their own status bar
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

- Measured: 2026-10-05, at `/?template=nft-auction-flow&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 20 probes. Dark: 20 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Back#1",13.5,40,51,51,13.3333,"400","rgb(255, 255, 255)","rgba(24, 24, 24, 0.78)","16px",0,0,0,0],["button|Notifications#1",259.5,40,51,51,13.3333,"400","rgb(255, 255, 255)","rgba(24, 24, 24, 0.78)","16px",0,0,0,0],["h1|Live Bids#1",0,86,320,39,32,"700","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",95,86,130,38],["button|Like#1",218,156.5,33.5,33.5,13.3333,"400","rgb(255, 255, 255)","rgba(60, 50, 40, 0.5)","50%",0,0,0,0],["button|Open#1",259.5,156.5,33.5,33.5,13.3333,"400","rgb(255, 255, 255)","rgba(60, 50, 40, 0.5)","50%",0,0,0,0],["button|Like#2",218,460,33.5,33.5,13.3333,"400","rgb(255, 255, 255)","rgba(60, 50, 40, 0.5)","50%",0,0,0,0],["button|Open#2",259.5,460,33.5,33.5,13.3333,"400","rgb(255, 255, 255)","rgba(60, 50, 40, 0.5)","50%",0,0,0,0],["span|08 h 40 m 20 s#1",26.5,156.5,105,29.5,13,"500","rgb(255, 255, 255)","rgba(60, 50, 40, 0.55)","15px",38,163.5,81.5,15],["b|Shedd Aquarium#1",40,362,239,21.5,17,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",40,362,134,20],["span|Bull will#1",40,393.5,76,19.5,14,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",67.5,394.5,48.5,16],["span|1.12 ETH#1",221.5,378,57.5,35,14,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",225,395.5,54,16],["small|Current bid#1",221.5,378,57.5,17.5,11,"400","rgba(255, 255, 255, 0.7)","rgba(0, 0, 0, 0)","0px",221.5,380,57.5,13],["span|08 h 40 m 20 s#2",26.5,460,105,29.5,13,"500","rgb(255, 255, 255)","rgba(60, 50, 40, 0.55)","15px",38,467,81.5,15],["b|Shedd Aquarium#2",40,665.5,239,21.5,17,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",40,665.5,134,20],["span|Bull will#2",40,697,76,19.5,14,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",67.5,697.5,48.5,16],["span|1.12 ETH#2",221.5,681,57.5,35,14,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",225,698.5,54,16],["small|Current bid#2",221.5,681,57.5,17.5,11,"400","rgba(255, 255, 255, 0.7)","rgba(0, 0, 0, 0)","0px",221.5,683,57.5,13],["div|.au#1",0,0,320,688,14,"400","rgb(255, 255, 255)","rgb(21, 21, 21)","0px",0,0,0,0],["div|.au-card__panel#1",26.5,352.5,266,70.5,14,"400","rgb(255, 255, 255)","rgba(70, 56, 40, 0.6)","18px",0,0,0,0],["div|.au-card__panel#2",26.5,655.5,266,70.5,14,"400","rgb(255, 255, 255)","rgba(70, 56, 40, 0.6)","18px",0,0,0,0]],"dark":[["button|Back#1","rgb(255, 255, 255)","rgba(24, 24, 24, 0.78)"],["button|Notifications#1","rgb(255, 255, 255)","rgba(24, 24, 24, 0.78)"],["h1|Live Bids#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Like#1","rgb(255, 255, 255)","rgba(60, 50, 40, 0.5)"],["button|Open#1","rgb(255, 255, 255)","rgba(60, 50, 40, 0.5)"],["button|Like#2","rgb(255, 255, 255)","rgba(60, 50, 40, 0.5)"],["button|Open#2","rgb(255, 255, 255)","rgba(60, 50, 40, 0.5)"],["span|08 h 40 m 20 s#1","rgb(255, 255, 255)","rgba(60, 50, 40, 0.55)"],["b|Shedd Aquarium#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Bull will#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|1.12 ETH#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|Current bid#1","rgba(255, 255, 255, 0.7)","rgba(0, 0, 0, 0)"],["span|08 h 40 m 20 s#2","rgb(255, 255, 255)","rgba(60, 50, 40, 0.55)"],["b|Shedd Aquarium#2","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Bull will#2","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|1.12 ETH#2","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|Current bid#2","rgba(255, 255, 255, 0.7)","rgba(0, 0, 0, 0)"],["div|.au#1","rgb(255, 255, 255)","rgb(21, 21, 21)"],["div|.au-card__panel#1","rgb(255, 255, 255)","rgba(70, 56, 40, 0.6)"],["div|.au-card__panel#2","rgb(255, 255, 255)","rgba(70, 56, 40, 0.6)"]]}
```
