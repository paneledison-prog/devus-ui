# Music profile compact: Design

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
- Canvas 390 wide, scrolling scaled to the 320px phone width; coordinates in Music.css are canvas pixels taken from the reference image
- Phone frame is bare (`PhoneFrame bare height={692}`, 39px radius): the screen draws its own status bar
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

- Measured: 2026-10-05, at `/?template=music-profile-compact&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 38 probes. Dark: 38 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|.ms-pill#1",216.5,59,92,28,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","17px",0,0,0,0],["button|.ms-tile#1",216.5,93.5,92,69,13.3333,"400","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0],["h2|Уведомления#1",11.5,193,297,19.5,19,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",11.5,193,104.5,19],["button|Pause#1",274,234,23,23,13.3333,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.18)","50%",0,0,0,0],["button|.ms-latest__row#1",11.5,298,297,28,11.5,"400","rgb(255, 255, 255)","rgb(29, 44, 92)","0px",0,0,0,0],["button|.ms-latest__row#2",11.5,326,297,28,11.5,"400","rgb(255, 255, 255)","rgb(79, 76, 52)","0px",0,0,0,0],["button|hifi#1",11.5,477,57.5,39.5,14,"600","rgb(255, 255, 255)","rgb(43, 43, 45)","16px",31.5,489,17.5,14],["button|Настройки#1",75.5,477,233,39.5,14,"600","rgb(255, 255, 255)","rgb(59, 74, 98)","16px",0,0,0,0],["button|Ночной режим#1",11.5,523,46,46,13.3333,"400","rgb(255, 255, 255)","rgb(74, 74, 79)","50%",0,0,0,0],["button|Наушники#1",95,523,46,46,13.3333,"400","rgb(255, 255, 255)","rgb(46, 46, 49)","50%",0,0,0,0],["button|Повтор#1",179,523,46,46,13.3333,"400","rgb(255, 255, 255)","rgb(46, 46, 49)","50%",0,0,0,0],["button|Эквалайзер#1",262.5,523,46,46,13.3333,"400","rgb(255, 255, 255)","rgb(46, 46, 49)","50%",0,0,0,0],["span|Elena Saharova#1",21.5,69,179,26.5,14,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",54,74.5,85.5,14],["b|1,946#1",21.5,105.5,44,20,20,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",21.5,105.5,44,20],["sup|+5#1",67,109.5,10.5,10,10,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",67,109.5,10.5,10],["small|Подписчиков#1",21.5,126.5,56,16.5,10,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",21.5,129.5,53.5,10],["b|146#1",88.5,105.5,28.5,20,20,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",88.5,105.5,28.5,20],["small|Плейлистов#1",88.5,126.5,48,16.5,10,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",88.5,129.5,48,10],["b|653#1",246,67.5,20,10.5,13,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",246,65.5,20,13],["span|+#1",255.5,110,14,21.5,26,"300","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",255.5,107,14,26],["small|Добавить витрину#1",222,135,81.5,11,11,"400","rgb(199, 199, 204)","rgba(0, 0, 0, 0)","0px",222,135,81.5,11],["span|8#1",122.5,194.5,18,16.5,12,"500","rgb(199, 199, 204)","rgb(58, 58, 61)","10px",128.5,196,6,12],["span|ПОСЛЕДНИЙ ГЕРОЙ#1",80.5,232.5,127.5,28,13,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",80.5,232.5,113,13],["b|E#1",196.5,234.5,11.5,11.5,9,"700","rgb(17, 17, 17)","rgb(255, 255, 255)","3px",200,235.5,4.5,9],["small|GSPD#1",80.5,247.5,127.5,13,11,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",80.5,248.5,25,11],["span|· Сингл#1",21.5,278.5,277.5,13,11,"400","rgba(255, 255, 255, 0.75)","rgba(0, 0, 0, 0)","0px",69,279.5,31.5,11],["em|GSPD#1",39.5,278.5,25,13,11,"400","rgba(255, 255, 255, 0.75)","rgba(0, 0, 0, 0)","0px",39.5,279.5,25,11],["i|Только что#1",250.5,278.5,48,13,11,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",250.5,279.5,48,11],["span|Arca · Сингл#1",42.5,306.5,235.5,11.5,11.5,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",42.5,306.5,56,11],["i|4 ч#1",284.5,306.5,14,11.5,11.5,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",284.5,306.5,14,11],["span|Dmitry K · Новый плейлист#1",42.5,334,236,11.5,11.5,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",42.5,334,122.5,11],["i|5 ч#1",285,334,13.5,11.5,11.5,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",285,334,13.5,11],["b|За последние 7 дней#1",23,374,110.5,13,13,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",23,374,110.5,13],["small|Слушали чаще других#1",23,388.5,274,16.5,11,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",23,390.5,98,11],["div|.ms#1",0,0,320,691.5,14,"400","rgb(255, 255, 255)","rgb(17, 17, 18)","0px",0,0,0,0],["div|.ms-tile#1",11.5,59,198.5,127.5,14,"400","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0],["div|.ms-latest#1",11.5,219.5,297,134.5,14,"400","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0],["div|.ms-tile#2",11.5,360.5,297,110,14,"400","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0]],"dark":[["button|.ms-pill#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.ms-tile#1","rgb(255, 255, 255)","rgb(35, 35, 37)"],["h2|Уведомления#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Pause#1","rgb(255, 255, 255)","rgba(255, 255, 255, 0.18)"],["button|.ms-latest__row#1","rgb(255, 255, 255)","rgb(29, 44, 92)"],["button|.ms-latest__row#2","rgb(255, 255, 255)","rgb(79, 76, 52)"],["button|hifi#1","rgb(255, 255, 255)","rgb(43, 43, 45)"],["button|Настройки#1","rgb(255, 255, 255)","rgb(59, 74, 98)"],["button|Ночной режим#1","rgb(255, 255, 255)","rgb(74, 74, 79)"],["button|Наушники#1","rgb(255, 255, 255)","rgb(46, 46, 49)"],["button|Повтор#1","rgb(255, 255, 255)","rgb(46, 46, 49)"],["button|Эквалайзер#1","rgb(255, 255, 255)","rgb(46, 46, 49)"],["span|Elena Saharova#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["b|1,946#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["sup|+5#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["small|Подписчиков#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["b|146#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|Плейлистов#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["b|653#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|+#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|Добавить витрину#1","rgb(199, 199, 204)","rgba(0, 0, 0, 0)"],["span|8#1","rgb(199, 199, 204)","rgb(58, 58, 61)"],["span|ПОСЛЕДНИЙ ГЕРОЙ#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["b|E#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["small|GSPD#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["span|· Сингл#1","rgba(255, 255, 255, 0.75)","rgba(0, 0, 0, 0)"],["em|GSPD#1","rgba(255, 255, 255, 0.75)","rgba(0, 0, 0, 0)"],["i|Только что#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["span|Arca · Сингл#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["i|4 ч#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["span|Dmitry K · Новый плейлист#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["i|5 ч#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["b|За последние 7 дней#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|Слушали чаще других#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["div|.ms#1","rgb(255, 255, 255)","rgb(17, 17, 18)"],["div|.ms-tile#1","rgb(255, 255, 255)","rgb(35, 35, 37)"],["div|.ms-latest#1","rgb(255, 255, 255)","rgb(35, 35, 37)"],["div|.ms-tile#2","rgb(255, 255, 255)","rgb(35, 35, 37)"]]}
```
