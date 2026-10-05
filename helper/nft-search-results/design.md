# NFT search results: Design

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
- Canvas 517x1126 scaled to the 320px phone width; coordinates in Nft.css are canvas pixels taken from the reference image
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

- Measured: 2026-10-05, at `/?template=nft-search-results&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 32 probes. Dark: 32 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["label|.nf-search#1",16,67.5,288.5,64,14,"400","rgb(255, 255, 255)","rgba(70, 72, 76, 0.45)","44px",0,0,0,0],["input|Search collections#1",41,68.5,226.5,62,24,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h2|Results#1",16,144,74,26,35,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",16,144,74,26],["button[radio]|Collection 1#1",16,211.5,53,53,13.3333,"400","rgb(0, 0, 0)","rgba(255, 255, 255, 0.1)","50%",0,0,0,0],["button[radio]|Collection 2#1",78,211.5,53,53,13.3333,"400","rgb(0, 0, 0)","rgba(255, 255, 255, 0.1)","50%",0,0,0,0],["button[radio]|Collection 3#1",140,211.5,53,53,13.3333,"400","rgb(0, 0, 0)","rgba(255, 255, 255, 0.1)","50%",0,0,0,0],["button|More collections#1",202.5,211.5,53,53,13.3333,"400","rgb(0, 0, 0)","rgba(100, 100, 104, 0.5)","50%",0,0,0,0],["nav|Primary#1",16,611.5,288.5,57.5,14,"400","rgb(255, 255, 255)","rgba(50, 50, 52, 0.72)","46px",0,0,0,0],["button|Add friends#1",25,621,38.5,38.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","18px",0,0,0,0],["button|Chats#1",79.5,621,38.5,38.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","18px",0,0,0,0],["button|Home#1",141.5,621,38.5,38.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","18px",0,0,0,0],["button|Stats#1",203.5,621,38.5,38.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","18px",0,0,0,0],["button|Inbox, 5 new#1",258,621,38.5,38.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","18px",0,0,0,0],["p|Collections#1",16,174,103.5,20,24,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",16,174.5,75,18],["span|8#1",99.5,174,20,20,18,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)","16px",106,176.5,6.5,14],["p|Top - Seller NFT#1",16,304,140.5,20,24,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",16,304.5,110,18],["span|12#1",135,304,22,20,18,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)","16px",140.5,306,10.5,14],["p|5 SOL#1",35.5,368,44,20,26,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",35.5,367,44,20],["p|Floor price#1",35.5,388,63,16,21,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",35.5,388,63,16],["p|Apes#1",35.5,476.5,82,39.5,56,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",35.5,474.5,82,42],["p|Apiens#1",35.5,519.5,40.5,16,21,"400","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)","0px",35.5,519.5,40.5,16],["p|12 SOL#1",88.5,412.5,53,26.5,26,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",88.5,411.5,53,27],["p|Floor price#2",91,430.5,65,24.5,21,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",91,430.5,65,24.5],["p|Hawaii#1",108.5,547,111,54,56,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",108,545,111.5,56.5],["p|Chill Monkeys#1",115,595.5,84,27.5,21,"400","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)","0px",115,595.5,84,27.5],["b|5#1",281.5,621,13.5,13.5,13,"700","rgb(255, 255, 255)","rgb(255, 59, 48)","11px",285.5,623,5,10],["div|.nf#1",0,0,320,697,14,"400","rgb(255, 255, 255)","rgb(12, 11, 12)","0px",0,0,0,0],["article|Apiens, 5 SOL floor price#1",16,348.5,214,235,14,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","40px",0,0,0,0],["span|.nf-card__eth#1",164,362,53,53,14,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)","50%",0,0,0,0],["article|Hawaii by Chill Monkeys, 12 SOL floor price#1",66.5,373,245,262.5,14,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","40px",0,0,0,0],["span|.nf-card__eth#2",214.5,388,60,60,14,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)","50%",0,0,0,0],["span|.nf-card__go#1",247,553.5,60,60,14,"400","rgb(255, 255, 255)","rgb(255, 255, 255)","50%",0,0,0,0]],"dark":[["label|.nf-search#1","rgb(255, 255, 255)","rgba(70, 72, 76, 0.45)"],["input|Search collections#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["h2|Results#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button[radio]|Collection 1#1","rgb(0, 0, 0)","rgba(255, 255, 255, 0.1)"],["button[radio]|Collection 2#1","rgb(0, 0, 0)","rgba(255, 255, 255, 0.1)"],["button[radio]|Collection 3#1","rgb(0, 0, 0)","rgba(255, 255, 255, 0.1)"],["button|More collections#1","rgb(0, 0, 0)","rgba(100, 100, 104, 0.5)"],["nav|Primary#1","rgb(255, 255, 255)","rgba(50, 50, 52, 0.72)"],["button|Add friends#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Chats#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Home#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Stats#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Inbox, 5 new#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|Collections#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|8#1","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)"],["p|Top - Seller NFT#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|12#1","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)"],["p|5 SOL#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|Floor price#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["p|Apes#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|Apiens#1","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)"],["p|12 SOL#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|Floor price#2","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["p|Hawaii#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["p|Chill Monkeys#1","rgba(255, 255, 255, 0.55)","rgba(0, 0, 0, 0)"],["b|5#1","rgb(255, 255, 255)","rgb(255, 59, 48)"],["div|.nf#1","rgb(255, 255, 255)","rgb(12, 11, 12)"],["article|Apiens, 5 SOL floor price#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|.nf-card__eth#1","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)"],["article|Hawaii by Chill Monkeys, 12 SOL floor price#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|.nf-card__eth#2","rgb(255, 255, 255)","rgba(255, 255, 255, 0.16)"],["span|.nf-card__go#1","rgb(255, 255, 255)","rgb(255, 255, 255)"]]}
```
