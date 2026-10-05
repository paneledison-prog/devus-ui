# Split sign in: Design

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
- Left panel uses the aurora background look; text is white
- Right panel centers a Card on `--background`
- Inputs use `--field-*` tokens via TextField

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

- Measured: 2026-10-05, at `/?template=split-sign-in&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 12 probes. Dark: 12 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["h2|Welcome back#1",24,356,312,32,24,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",24,357,171,29],["section|.ui-card#1",390,72,300,296,14,"400","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","24px",0,0,0,0],["h3|Sign in#1",406,88,268,28,16,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",406,92,52,20],["label|Email#1",406,160,268,24,14,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",406,163,36,17],["input|you@example.com#1",406,190,268,36,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","12px",0,0,0,0],["label|Password#1",406,238,268,24,14,"500","rgb(24, 24, 27)","rgba(0, 0, 0, 0)","0px",406,241,65.5,17],["input|Password#1",406,268,268,36,14,"400","rgb(24, 24, 27)","rgb(255, 255, 255)","12px",0,0,0,0],["button|Continue#1",406,316,268,36,14,"500","rgb(252, 252, 252)","rgb(4, 133, 247)","24px",509.5,325,60.5,17],["p|Pick up right where you left off.#1",24,396,312,20,14,"400","rgba(255, 255, 255, 0.7)","rgba(0, 0, 0, 0)","0px",24,397,206.5,17],["p|Use your work email.#1",406,128,268,20,14,"400","rgb(113, 113, 122)","rgba(0, 0, 0, 0)","0px",406,129,139,17],["div|.tpl#1",0,0,720,440,14,"400","rgb(24, 24, 27)","rgb(245, 245, 245)","16px",0,0,0,0],["div|.tpl-split__art#1",0,0,360,440,14,"400","rgb(255, 255, 255)","rgb(5, 8, 22)","0px",0,0,0,0]],"dark":[["h2|Welcome back#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["section|.ui-card#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["h3|Sign in#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["label|Email#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input|you@example.com#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["label|Password#1","rgb(252, 252, 252)","rgba(0, 0, 0, 0)"],["input|Password#1","rgb(252, 252, 252)","rgb(39, 39, 42)"],["button|Continue#1","rgb(252, 252, 252)","rgb(4, 133, 247)"],["p|Pick up right where you left off.#1","rgba(255, 255, 255, 0.7)","rgba(0, 0, 0, 0)"],["p|Use your work email.#1","rgb(161, 161, 170)","rgba(0, 0, 0, 0)"],["div|.tpl#1","rgb(252, 252, 252)","rgb(0, 0, 0)"],["div|.tpl-split__art#1","rgb(255, 255, 255)","rgb(5, 8, 22)"]]}
```
