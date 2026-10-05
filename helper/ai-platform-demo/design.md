# AI platform demo: Design

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
- Popovers close on outside click through the shared `useOutside` hook
- Page styles in Harbor.css

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

- Measured: 2026-10-05, at `/?template=ai-platform-demo&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 27 probes. Dark: 27 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["aside|.hb-side#1",20,20,210,700,13,"400","rgb(28, 28, 27)","rgb(250, 250, 249)","0px",0,0,0,0],["nav|Primary#1",30,82,189,170,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Chat#1",30,82,189,34,13,"500","rgb(28, 28, 27)","rgb(241, 241, 239)","9px",66,91,29,16],["button|Assistants#1",30,116,189,34,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","9px",66,125,63,16],["button|Knowledge#1",30,150,189,34,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","9px",66,159,69,16],["button|Integrations#1",30,184,189,34,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","9px",66,193,73,16],["button|Console#1",30,218,189,34,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","9px",66,227,50.5,16],["button|Getting started#1",30,624,189,36,13,"400","rgb(28, 28, 27)","rgb(244, 244, 242)","10px",64,634,91.5,16],["button|Light#1",33,675,91.5,28,13,"400","rgb(28, 28, 27)","rgb(255, 255, 255)","8px",74.5,681,30.5,16],["button|Dark#1",124.5,675,91.5,28,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","8px",167,681,29,16],["main|.ag-main#1",230,20,950,700,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["h1|What are we working on?#1",376.5,259,657,34,26,"600","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",549.5,260,311.5,31],["button|Summarize our refund policy#1",376.5,329,203,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",389.5,336,177,16],["button|Plan next week with my calendar#1",585.5,329,227.5,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",598.5,336,201.5,16],["button|Draft a reply to the latest ticket#1",819,329,214.5,30,13,"400","rgb(119, 119, 111)","rgb(244, 244, 242)","999px",832,336,188.5,16],["textarea|Message#1",377,610,656,44,13,"400","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",0,0,0,0],["button|Harbor Swift#1",377,662,112,28,12,"500","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","8px",387,668,72,15],["button|Attach#1",497,662,79.5,28,12,"500","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","8px",529,668,37.5,15],["button|Send#1",961.5,662,71.5,28,12,"500","rgb(255, 255, 255)","rgb(28, 28, 27)","8px",993.5,668,29.5,15],["div|Harbor#1",30,34,189,44,15,"600","rgb(28, 28, 27)","rgba(0, 0, 0, 0)","0px",72,40.5,50.5,19],["span|1 /4#1",174.5,631,34.5,22,11.5,"400","rgb(47, 111, 237)","rgb(232, 239, 255)","999px",183.5,635,16.5,14],["p|Chat with your company knowledge, assistants and#1",376.5,293,657,18,13,"400","rgb(119, 119, 111)","rgba(0, 0, 0, 0)","0px",528.5,294,353,16],["div|Harbor AI platform demo#1",0,0,1200,740,13,"400","rgb(28, 28, 27)","rgb(245, 245, 244)","0px",0,0,0,0],["div|.ag-win#1",20,20,1160,700,13,"400","rgb(28, 28, 27)","rgb(255, 255, 255)","18px",0,0,0,0],["span|.hb-mark#1",36,36,28,28,15,"600","rgb(255, 255, 255)","rgb(47, 111, 237)","9px",0,0,0,0],["div[group]|Appearance#1",30,672,189,34,13,"400","rgb(28, 28, 27)","rgb(244, 244, 242)","10px",0,0,0,0],["form|.hb-composer#1",365,598,680,104,13,"400","rgb(28, 28, 27)","rgb(255, 255, 255)","16px",0,0,0,0]],"dark":[["aside|.hb-side#1","rgb(236, 236, 234)","rgb(20, 20, 19)"],["nav|Primary#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Chat#1","rgb(236, 236, 234)","rgb(35, 35, 33)"],["button|Assistants#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Knowledge#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Integrations#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Console#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Getting started#1","rgb(236, 236, 234)","rgb(31, 31, 29)"],["button|Light#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["button|Dark#1","rgb(236, 236, 234)","rgb(23, 23, 22)"],["main|.ag-main#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["h1|What are we working on?#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Summarize our refund policy#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["button|Plan next week with my calendar#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["button|Draft a reply to the latest ticket#1","rgb(140, 140, 133)","rgb(31, 31, 29)"],["textarea|Message#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Harbor Swift#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Attach#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["button|Send#1","rgb(18, 18, 17)","rgb(239, 239, 237)"],["div|Harbor#1","rgb(236, 236, 234)","rgba(0, 0, 0, 0)"],["span|1 /4#1","rgb(108, 155, 255)","rgb(23, 38, 74)"],["p|Chat with your company knowledge, assistants and#1","rgb(140, 140, 133)","rgba(0, 0, 0, 0)"],["div|Harbor AI platform demo#1","rgb(236, 236, 234)","rgb(15, 15, 14)"],["div|.ag-win#1","rgb(236, 236, 234)","rgb(23, 23, 22)"],["span|.hb-mark#1","rgb(255, 255, 255)","rgb(108, 155, 255)"],["div[group]|Appearance#1","rgb(236, 236, 234)","rgb(31, 31, 29)"],["form|.hb-composer#1","rgb(236, 236, 234)","rgb(28, 28, 27)"]]}
```
