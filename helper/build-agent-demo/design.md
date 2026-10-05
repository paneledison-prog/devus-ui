# Build agent demo: Design

Visual specification. Match it exactly; do not restyle from memory.

## Tokens
This template defines its own scoped theme variables on `.ba` (light) and `.ba[data-theme="dark"]`. Use those variables for colors; fall back to library tokens for spacing, radius and type.

Library tokens (`src/styles/tokens.css`):
- Colors: `--background`, `--foreground`, `--muted`, `--surface`, `--overlay`, `--separator`, `--link`
- Accent and states: `--accent`, `--accent-foreground`, `--accent-soft`, `--accent-soft-foreground`, `--danger`, `--danger-soft`, `--warning`
- Neutrals: `--default`, `--default-hover`, `--default-foreground`
- Fields: `--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`, `--focus-ring`
- Shadows: `--shadow-field`, `--shadow-surface`, `--shadow-overlay`, `--shadow-switch`
- Space (4px scale): `--space-0-5` ... `--space-6`; radii `--radius-sm` ... `--radius-3xl`, `--radius-full`, `--radius-field`
- Type: Inter via `--font-sans`; sizes `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`; leading `--leading-sm`, `--leading-base`, `--leading-lg`

## Specification
- Uses the shared `--a-*` tokens plus `ba-` layout classes
- Simulator is a generic phone, scaled to fit its pane
- Annotation outlines are green

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

- Measured: 2026-10-05, at `/?template=build-agent-demo&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 23 probes. Dark: 23 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["header|.ba-title#1",14,14,1172,44,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Back#1",92,21.5,28,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",0,0,0,0],["button|Forward#1",126,21.5,28,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",0,0,0,0],["button|Switch to dark theme#1",1112,21.5,28,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",0,0,0,0],["button|Toggle browser pane#1",1146,21.5,28,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",0,0,0,0],["h1|What should we build in ChirpApp ?#1",371,237,458.5,34,28,"500","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",371,237,458.5,34],["button|Build iOS Apps#1",296,307,142.5,26,12.5,"500","rgb(47, 111, 237)","rgb(232, 239, 255)","8px",326,312,88.5,15],["textarea|Describe what to build#1",446.5,307,457.5,48,14,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Add#1",292,366,30,30,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","50%",0,0,0,0],["button|Approve for me#1",326,367,151,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",354,373,95,16],["button|Pro 5 · Low#1",733,367,105,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",741,373,69,16],["button|Dictate#1",842,366,30,30,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","50%",0,0,0,0],["button|Send#1",876,365,32,32,13,"400","rgb(255, 255, 255)","rgb(28, 28, 27)","50%",0,0,0,0],["button|ChirpApp#1",430.5,431,114,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",458.5,437,58,16],["button|Work locally#1",548.5,431,131.5,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",576.5,437,75.5,16],["button|main#1",684,431,85.5,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",712,437,29.5,16],["button|Show me the PostRow SwiftUI previews#1",351,481,269.5,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",364,488,243.5,16],["button|Open the share menu and test it#1",626.5,481,222,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",639.5,488,196,16],["button|Rotate to landscape and check every row#1",460,517,280,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",473,524,254,16],["span|New thread#1",168,26.5,71.5,18,13,"500","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",168,27.5,71.5,16],["div|Build agent demo#1",0,0,1200,740,13,"400","rgb(28, 28, 27)","rgb(245, 245, 244)","0px",0,0,0,0],["div|.ag-win#1",14,14,1172,712,13,"400","rgb(28, 28, 27)","rgb(255, 255, 255)","18px",0,0,0,0],["form|.ba-composer#1",280,293,640,116,13,"400","rgb(28, 28, 27)","rgb(255, 255, 255)","20px",0,0,0,0]],"dark":[["header|.ba-title#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Back#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Forward#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Switch to light theme#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Toggle browser pane#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["h1|What should we build in ChirpApp ?#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Build iOS Apps#1","rgb(108, 155, 255)","rgb(23, 38, 74)"],["textarea|Describe what to build#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Add#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Approve for me#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Pro 5 · Low#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Dictate#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Send#1","rgb(18, 18, 17)","rgb(239, 239, 237)"],["button|ChirpApp#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Work locally#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|main#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Show me the PostRow SwiftUI previews#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["button|Open the share menu and test it#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["button|Rotate to landscape and check every row#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["span|New thread#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["div|Build agent demo#1","rgb(236, 236, 234)","rgb(15, 15, 14)"],["div|.ag-win#1","rgb(236, 236, 234)","rgb(23, 23, 22)"],["form|.ba-composer#1","rgb(236, 236, 234)","rgb(28, 28, 27)"]]}
```
