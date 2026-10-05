# Liquid glass chat: Design

Visual specification. Match it exactly; do not restyle from memory.

## Tokens
This template defines its own scoped theme variables on `.lq` (light) and `.lq[data-theme="dark"]`. Use those variables for colors; fall back to library tokens for spacing, radius and type.

Library tokens (`src/styles/tokens.css`):
- Colors: `--background`, `--foreground`, `--muted`, `--surface`, `--overlay`, `--separator`, `--link`
- Accent and states: `--accent`, `--accent-foreground`, `--accent-soft`, `--accent-soft-foreground`, `--danger`, `--danger-soft`, `--warning`
- Neutrals: `--default`, `--default-hover`, `--default-foreground`
- Fields: `--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`, `--focus-ring`
- Shadows: `--shadow-field`, `--shadow-surface`, `--shadow-overlay`, `--shadow-switch`
- Space (4px scale): `--space-0-5` ... `--space-6`; radii `--radius-sm` ... `--radius-3xl`, `--radius-full`, `--radius-field`
- Type: Inter via `--font-sans`; sizes `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`; leading `--leading-sm`, `--leading-base`, `--leading-lg`

## Specification
- Own tokens on `.lq`, dark values on `.lq[data-theme="dark"]`
- Glass = translucent fill + backdrop blur/saturate + specular top edge + sheen
- Hidden screens use `inert`

## Typography
- Inter (`--font-sans`). Body 14px/20px, small 12px, headings 16-18px weight 600 unless the specification above says otherwise.
- Numbers that update use tabular figures.

## States every interactive element must have
- Default, hover, focus-visible (2px ring, `--focus-ring` or the template's own ring variable), pressed, disabled (50% opacity, `not-allowed`).
- Selected / current state is shown with more than color (weight, outline or marker).

## Light and dark
- Has its own light/dark switch on its root; the initial value is the site theme or the `defaultTheme` prop.
- Never hard-code a color that is not defined for both themes.

## Motion
- 150-250ms ease-out for state changes. No bounce except where the specification says so.
- Everything animated must stop under `prefers-reduced-motion: reduce`.

## Bench reference
This is the real design, measured from the running app. It is the only accepted definition of "the design is right". Do not edit it to make a failure pass.

- Measured: 2026-10-05, at `/?template=liquid-glass-chat&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 27 probes. Dark: 27 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Switch to dark#1",470,13,36,36,14,"400","rgb(21, 21, 21)","rgba(255, 255, 255, 0.62)","50%",0,0,0,0],["section|.lq-screen#1",343,39,314,680,17,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h1|Messages#1",362,102.5,179,35.5,36,"700","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",362,102.5,136.5,35.5],["button|.lq-circlebtn#1",547.5,102.5,42,35.5,17,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|New message#1",596,99.5,42,42,17,"400","rgb(21, 21, 21)","rgba(255, 255, 255, 0.62)","50%",0,0,0,0],["label|.lq-search#1",362,163,275.5,43.5,17,"400","rgb(138, 138, 142)","rgba(255, 255, 255, 0.62)","999px",0,0,0,0],["input|Find a conversation#1",404,175,217.5,20,19,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|All#1",362,222.5,52,35.5,17,"500","rgb(21, 21, 21)","rgb(228, 234, 238)","999px",380,232.5,16.5,16],["button|Unread#1",425.5,222.5,83,35.5,17,"400","rgb(21, 21, 21)","rgba(255, 255, 255, 0.62)","999px",443.5,232.5,47.5,16],["button|Groups#1",519.5,222.5,82.5,35.5,17,"400","rgb(21, 21, 21)","rgba(255, 255, 255, 0.62)","999px",537.5,232.5,47,16],["button|.lq-row#1",362,264.5,275.5,84.5,17,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.lq-row#2",362,349,275.5,84.5,17,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.lq-row#3",362,434,275.5,84.5,17,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|.lq-row#4",362,518.5,275.5,84.5,17,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["b|Noor Alvarez#1",431.5,286,159.5,21,21,"600","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",431.5,286,106.5,20],["span|A little farther from everything.#1",431.5,310,159.5,17.5,18,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",431.5,310,210,17],["span|now#1",613.5,284,24,17.5,15,"400","rgb(138, 138, 142)","rgba(0, 0, 0, 0)","0px",613.5,284.5,24,15.5],["b|The Saturday Crew#1",431.5,370.5,159.5,21,21,"600","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",431.5,370.5,156,20],["span|You: Always.#1",431.5,394.5,159.5,17.5,18,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",431.5,394.5,87.5,17],["span|4m#1",619.5,368.5,18.5,17.5,15,"400","rgb(138, 138, 142)","rgba(0, 0, 0, 0)","0px",619.5,369.5,18.5,15.5],["b|Idris Cole#1",431.5,455,159.5,21,21,"600","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",431.5,455,77.5,20],["span|This has your name all over it.#1",431.5,479.5,159.5,17.5,18,"400","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",431.5,479.5,204,17],["span|12m#1",615,453,23,17.5,15,"400","rgb(138, 138, 142)","rgba(0, 0, 0, 0)","0px",615,454,23,15.5],["b|Hana Mori#1",431.5,539.5,159.5,21,21,"600","rgb(21, 21, 21)","rgba(0, 0, 0, 0)","0px",431.5,539.5,84,20],["span|You: Saving you the window seat.#1",431.5,564,159.5,17.5,18,"400","rgb(138, 138, 142)","rgba(0, 0, 0, 0)","0px",431.5,564,230.5,17],["span|28m#1",612.5,537.5,25.5,17.5,15,"400","rgb(138, 138, 142)","rgba(0, 0, 0, 0)","0px",612.5,538.5,25.5,15.5],["div|.lq-phone#1",343,39,314,680,17,"400","rgb(21, 21, 21)","rgb(242, 242, 243)","52px",0,0,0,0]],"dark":[["button|Switch to light#1","rgb(243, 243, 244)","rgba(48, 48, 52, 0.55)"],["section|.lq-screen#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["h1|Messages#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["button|.lq-circlebtn#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["button|New message#1","rgb(243, 243, 244)","rgba(48, 48, 52, 0.55)"],["label|.lq-search#1","rgb(142, 142, 147)","rgba(48, 48, 52, 0.55)"],["input|Find a conversation#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["button|All#1","rgb(243, 243, 244)","rgb(44, 58, 70)"],["button|Unread#1","rgb(243, 243, 244)","rgba(48, 48, 52, 0.55)"],["button|Groups#1","rgb(243, 243, 244)","rgba(48, 48, 52, 0.55)"],["button|.lq-row#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["button|.lq-row#2","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["button|.lq-row#3","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["button|.lq-row#4","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["b|Noor Alvarez#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["span|A little farther from everything.#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["span|now#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["b|The Saturday Crew#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["span|You: Always.#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["span|4m#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["b|Idris Cole#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["span|This has your name all over it.#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["span|12m#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["b|Hana Mori#1","rgb(243, 243, 244)","rgba(0, 0, 0, 0)"],["span|You: Saving you the window seat.#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["span|28m#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["div|.lq-phone#1","rgb(243, 243, 244)","rgb(13, 13, 15)"]]}
```
