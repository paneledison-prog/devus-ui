# Music profile banners: Design

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

- Measured: 2026-10-05, at `/?template=music-profile-banners&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: 39 probes. Dark: 39 probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{"light":[["button|Поделиться#1",271,74,26.5,26.5,13.3333,"400","rgb(255, 255, 255)","rgb(51, 51, 54)","50%",0,0,0,0],["button|.ms-card__invite#1",23,211.5,274,23,13.3333,"400","rgb(255, 255, 255)","rgb(45, 45, 48)","12px",0,0,0,0],["button|.ms-tile#1",11.5,253,145,147.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["button|.ms-tile#2",163.5,253,145,147.5,13.3333,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","20px",0,0,0,0],["h2|Новое сегодня#1",11.5,541.5,297,19.5,19,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",11.5,541.5,113.5,19],["button|Pause#1",274,582.5,23,23,13.3333,"400","rgb(255, 255, 255)","rgba(255, 255, 255, 0.18)","50%",0,0,0,0],["button|.ms-latest__row#1",11.5,646.5,297,28,11.5,"400","rgb(255, 255, 255)","rgb(29, 44, 92)","0px",0,0,0,0],["button|.ms-latest__row#2",11.5,674.5,297,28,11.5,"400","rgb(255, 255, 255)","rgb(79, 76, 52)","0px",0,0,0,0],["h2|Достижения#1",11.5,709,297,19.5,19,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",11.5,709,97.5,19],["h2|Настройки#1",11.5,820.5,297,19.5,19,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",11.5,820.5,83.5,19],["button|.ms-tile#3",11.5,847,297,51.5,13,"500","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0],["button|.ms-tile#4",11.5,934.5,297,51.5,13,"500","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0],["button|Очистить кэш#1",11.5,993,297,36,13,"500","rgb(255, 255, 255)","rgb(43, 43, 45)","16px",123,1003.5,73.5,13],["b|Елена Сахарова#1",64,71.5,92.5,14,14,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",64,71.5,92.5,14],["small|Ценитель джаза#1",64,87,198.5,16.5,11,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",64,89,72,11],["b|1 946#1",23,134.5,87,19.5,20,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",23,133.5,43,20],["sup|+5#1",67.5,138.5,10.5,10,10,"600","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",67.5,138.5,10.5,10],["b|146#1",116.5,136.5,87,22,20,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",116.5,135.5,28.5,20],["small|Треки#1",210,115,87,25.5,10,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",210,118,24,10],["small|+50 за каждого приглашенного друга#1",31,218,257.5,10,10.5,"400","rgb(142, 142, 147)","rgba(0, 0, 0, 0)","0px",31,218,159.5,10],["b|Чёрная пятница в Мегамаркете!#1",23,305.5,122.5,26.5,13,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",23,305.5,85.5,26],["small|СберПрайм+ активен до 23 сен. 2023#1",175,318,122.5,22,11,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",175,318,96,22],["span|SLAVA MARLOW#1",23,459.5,184.5,23,12,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",23,470,80,12],["span|234 часа#1",214,418.5,83,64,13,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",249,418.5,48,13],["span|ПОСЛЕДНИЙ ГЕРОЙ#1",80.5,581,127.5,28,13,"600","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",80.5,581,113,13],["b|E#1",196.5,583,11.5,11.5,9,"700","rgb(17, 17, 17)","rgb(255, 255, 255)","3px",200,584,4.5,9],["span|· Сингл#1",21.5,627,277.5,13,11,"400","rgba(255, 255, 255, 0.75)","rgba(0, 0, 0, 0)","0px",69,628,31.5,11],["em|GSPD#1",39.5,627,25,13,11,"400","rgba(255, 255, 255, 0.75)","rgba(0, 0, 0, 0)","0px",39.5,628,25,11],["span|Arca · Сингл#1",42.5,655,235.5,11.5,11.5,"400","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",42.5,655,56,11],["i|4 ч#1",284.5,655,14,11.5,11.5,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",284.5,655,14,11],["i|5 ч#1",285,682.5,13.5,11.5,11.5,"400","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)","0px",285,682.5,13.5,11],["span|12/54#1",115.5,710.5,35.5,16.5,12,"500","rgb(199, 199, 204)","rgb(58, 58, 61)","10px",120.5,712,25.5,12],["small|Прослушать 100 часов одного исполнителя#1",88.5,774,96.5,21.5,10.5,"400","rgba(255, 255, 255, 0.7)","rgba(0, 0, 0, 0)","0px",88.5,774,96.5,20.5],["span|Ограничение кэша#1",23,858.5,100,28.5,13,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",23,858.5,100,13],["span|Занято кэша#1",23,946,66,28.5,13,"500","rgb(255, 255, 255)","rgba(0, 0, 0, 0)","0px",23,946,66,13],["div|.ms#1",0,0,320,691.5,14,"400","rgb(255, 255, 255)","rgb(17, 17, 18)","0px",0,0,0,0],["div|.ms-tile#1",11.5,59,297,187,14,"400","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0],["div|.ms-tile#2",11.5,407,297,128,14,"400","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0],["div|.ms-latest#1",11.5,568,297,134.5,14,"400","rgb(255, 255, 255)","rgb(35, 35, 37)","20px",0,0,0,0]],"dark":[["button|Поделиться#1","rgb(255, 255, 255)","rgb(51, 51, 54)"],["button|.ms-card__invite#1","rgb(255, 255, 255)","rgb(45, 45, 48)"],["button|.ms-tile#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.ms-tile#2","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["h2|Новое сегодня#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|Pause#1","rgb(255, 255, 255)","rgba(255, 255, 255, 0.18)"],["button|.ms-latest__row#1","rgb(255, 255, 255)","rgb(29, 44, 92)"],["button|.ms-latest__row#2","rgb(255, 255, 255)","rgb(79, 76, 52)"],["h2|Достижения#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["h2|Настройки#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["button|.ms-tile#3","rgb(255, 255, 255)","rgb(35, 35, 37)"],["button|.ms-tile#4","rgb(255, 255, 255)","rgb(35, 35, 37)"],["button|Очистить кэш#1","rgb(255, 255, 255)","rgb(43, 43, 45)"],["b|Елена Сахарова#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|Ценитель джаза#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["b|1 946#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["sup|+5#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["b|146#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|Треки#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["small|+50 за каждого приглашенного друга#1","rgb(142, 142, 147)","rgba(0, 0, 0, 0)"],["b|Чёрная пятница в Мегамаркете!#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["small|СберПрайм+ активен до 23 сен. 2023#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|SLAVA MARLOW#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|234 часа#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|ПОСЛЕДНИЙ ГЕРОЙ#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["b|E#1","rgb(17, 17, 17)","rgb(255, 255, 255)"],["span|· Сингл#1","rgba(255, 255, 255, 0.75)","rgba(0, 0, 0, 0)"],["em|GSPD#1","rgba(255, 255, 255, 0.75)","rgba(0, 0, 0, 0)"],["span|Arca · Сингл#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["i|4 ч#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["i|5 ч#1","rgba(255, 255, 255, 0.6)","rgba(0, 0, 0, 0)"],["span|12/54#1","rgb(199, 199, 204)","rgb(58, 58, 61)"],["small|Прослушать 100 часов одного исполнителя#1","rgba(255, 255, 255, 0.7)","rgba(0, 0, 0, 0)"],["span|Ограничение кэша#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["span|Занято кэша#1","rgb(255, 255, 255)","rgba(0, 0, 0, 0)"],["div|.ms#1","rgb(255, 255, 255)","rgb(17, 17, 18)"],["div|.ms-tile#1","rgb(255, 255, 255)","rgb(35, 35, 37)"],["div|.ms-tile#2","rgb(255, 255, 255)","rgb(35, 35, 37)"],["div|.ms-latest#1","rgb(255, 255, 255)","rgb(35, 35, 37)"]]}
```
