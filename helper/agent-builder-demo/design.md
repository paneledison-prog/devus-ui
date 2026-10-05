# Agent builder demo: Design

Visual specification. Match it exactly; do not restyle from memory.

## Tokens
This template defines its own scoped theme variables on `.ag` (light) and `.ag[data-theme="dark"]`. Use those variables for colors; fall back to library tokens for spacing, radius and type.

Library tokens (`src/styles/tokens.css`):
- Colors: `--background`, `--foreground`, `--muted`, `--surface`, `--overlay`, `--separator`, `--link`
- Accent and states: `--accent`, `--accent-foreground`, `--accent-soft`, `--accent-soft-foreground`, `--danger`, `--danger-soft`, `--warning`
- Neutrals: `--default`, `--default-hover`, `--default-foreground`
- Fields: `--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`, `--focus-ring`
- Shadows: `--shadow-field`, `--shadow-surface`, `--shadow-overlay`, `--shadow-switch`
- Space (4px scale): `--space-0-5` ... `--space-6`; radii `--radius-sm` ... `--radius-3xl`, `--radius-full`, `--radius-field`
- Type: Inter via `--font-sans`; sizes `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`; leading `--leading-sm`, `--leading-base`, `--leading-lg`

## Specification
- Shared tokens `--a-*` on `.ag`
- Approval step must block until the user chooses
- Page styles in Pairwise.css

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

- Measured: 2026-10-05, at `/?template=agent-builder-demo&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 37 probes. Dark: 37 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.pw-top#1",20,20,1160,54,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["nav|Primary#1",154,30.5,204.5,32,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Build#1",154,30.5,55,32,13,"500","rgb(28, 28, 27)","rgb(241, 241, 239)","8px",166,38.5,31,16],["button|Discover#1",211,30.5,78,32,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",223,38.5,54,16],["button|Credits#1",290.5,30.5,68,32,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",302.5,38.5,44,16],["button|1,240 credits#1",1000,32.5,116,28,12,"500","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","8px",1032,38.5,74,15],["h1|What should your agent do?#1",260,122,680,34,28,"600","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",414,122,372.5,34],["textarea|Describe the outcome#1",274,188,652,64,14,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Build agent#1",806.5,262,119.5,34,13,"500","rgb(255, 255, 255)","rgb(28, 28, 27)","10px",842.5,271,69.5,16],["button|Review new pull requests each morning and post a#1",378,328,443.5,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",391,335,417.5,16],["button|Watch the support inbox and tag urgent tickets#1",289.5,364,313.5,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",302.5,371,287.5,16],["button|Send me a weekly digest of competitor news#1",609,364,302,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",622,371,276,16],["h3|Recent actions#1",276,436,648,16,13,"600","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",276,436,93,16],["div|Pairwise#1",38,32.5,98,28,15,"600","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",74,37,62,19],["span|D#1",1134,32.5,28,28,11,"600","rgb(255, 255, 255)","rgb(217, 130, 43)","50%",1144,39.5,8,14],["span|Connected: Chat, Code host, Mail#1",274,270,206.5,18,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","0px",274,271,206.5,16],["span|Done#1",276,467.5,46.5,22,11.5,"400","rgb(31, 157, 85)","color(srgb 0.121569 0.615686 0.333333 / 0.16)","999px",285,471.5,28.5,14],["span|Posted PR summary to #eng#1",332.5,469.5,531,18,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",332.5,470.5,174.5,16],["span|9:02 am#1",873.5,469.5,50.5,18,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","0px",873.5,470.5,50.5,16],["span|Done#2",276,503.5,46.5,22,11.5,"400","rgb(31, 157, 85)","color(srgb 0.121569 0.615686 0.333333 / 0.16)","999px",285,507.5,28.5,14],["span|Tagged 4 urgent tickets#1",332.5,505.5,520.5,18,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",332.5,506.5,145.5,16],["span|Yesterday#1",863,505.5,61,18,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","0px",863,506.5,61,16],["span|Done#3",276,539.5,46.5,22,11.5,"400","rgb(31, 157, 85)","color(srgb 0.121569 0.615686 0.333333 / 0.16)","999px",285,543.5,28.5,14],["span|Weekly digest sent#1",332.5,541.5,554,18,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",332.5,542.5,116.5,16],["span|Mon#1",897,541.5,27,18,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","0px",897,542.5,27,16],["span|Paused#1",276,575.5,58.5,22,11.5,"400","rgb(217, 138, 11)","color(srgb 0.85098 0.541176 0.0431373 / 0.18)","999px",285,579.5,40.5,14],["span|Invoice reminder paused#1",344.5,577.5,546,18,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",344.5,578.5,151.5,16],["span|Sun#1",900.5,577.5,23.5,18,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","0px",900.5,578.5,23.5,16],["div|Pairwise agent platform demo#1",0,0,1200,740,13,"400","rgb(28, 28, 27)","rgb(245, 245, 244)","0px",0,0,0,0],["div|.ag-win#1",20,20,1160,700,13,"400","rgb(28, 28, 27)","rgb(255, 255, 255)","18px",0,0,0,0],["span|.pw-mark#1",38,32.5,28,28,15,"600","rgb(255, 255, 255)","rgb(28, 28, 27)","9px",0,0,0,0],["div|.pw-prompt#1",260,174,680,136,13,"400","rgb(28, 28, 27)","rgb(255, 255, 255)","16px",0,0,0,0],["div|.pw-hist#1",260,422,680,196,13,"400","rgb(28, 28, 27)","rgb(255, 255, 255)","14px",0,0,0,0],["div|.pw-hist__row#1",276,460,648,36,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["div|.pw-hist__row#2",276,496,648,36,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["div|.pw-hist__row#3",276,532,648,36,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["div|.pw-hist__row#4",276,568,648,36,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0]],"dark":[["header|.pw-top#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["nav|Primary#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Build#1","rgb(236, 236, 234)","rgb(35, 35, 33)"],["button|Discover#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Credits#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|1,240 credits#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["h1|What should your agent do?#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["textarea|Describe the outcome#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Build agent#1","rgb(18, 18, 17)","rgb(239, 239, 237)"],["button|Review new pull requests each morning and post a#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["button|Watch the support inbox and tag urgent tickets#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["button|Send me a weekly digest of competitor news#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["h3|Recent actions#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["div|Pairwise#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["span|D#1","rgb(255, 255, 255)","rgb(217, 130, 43)"],["span|Connected: Chat, Code host, Mail#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["span|Done#1","rgb(31, 157, 85)","color(srgb 0.121569 0.615686 0.333333 / 0.16)"],["span|Posted PR summary to #eng#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["span|9:02 am#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["span|Done#2","rgb(31, 157, 85)","color(srgb 0.121569 0.615686 0.333333 / 0.16)"],["span|Tagged 4 urgent tickets#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["span|Yesterday#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["span|Done#3","rgb(31, 157, 85)","color(srgb 0.121569 0.615686 0.333333 / 0.16)"],["span|Weekly digest sent#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["span|Mon#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["span|Paused#1","rgb(217, 138, 11)","color(srgb 0.85098 0.541176 0.0431373 / 0.18)"],["span|Invoice reminder paused#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["span|Sun#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["div|Pairwise agent platform demo#1","rgb(236, 236, 234)","rgb(15, 15, 14)"],["div|.ag-win#1","rgb(236, 236, 234)","rgb(23, 23, 22)"],["span|.pw-mark#1","rgb(23, 23, 22)","rgb(236, 236, 234)"],["div|.pw-prompt#1","rgb(236, 236, 234)","rgb(28, 28, 27)"],["div|.pw-hist#1","rgb(236, 236, 234)","rgb(28, 28, 27)"],["div|.pw-hist__row#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["div|.pw-hist__row#2","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["div|.pw-hist__row#3","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["div|.pw-hist__row#4","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"]]}
```
