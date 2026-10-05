# Navigation widget

Build a React + TypeScript `<NavigationWidget>` for Devus UI from the reference image (one tile of a six-tile widget sheet). Draw only what the image shows.

## Purpose

A 305x360 map tile: a light gray street map filling the tile, a blue route that winds from under a distance pill down to a position arrow.

## Layout

A 305x360 tile: white, 46px corners, 2px white border and a soft shadow (`0 12px 30px rgb(0 0 0 / .12)`). Coordinates are tile pixels.

- Map fills the tile (light gray ground, white streets).
- Pill: 245x68 at (30, 25), fully rounded, white, soft shadow. Inside: a 56px light-blue circle with a blue runner icon, "416 m" 24px/500 and "Kottayam" 14px gray under it, and a blue up arrow at the right.
- Route: blue 7px round-capped line, from the top edge (hidden behind the pill) then winding from (97, 100) to (129, 240).
- Position arrow: blue navigation arrow with a thin white outline at (139, 264), rotated about -28 degrees.

## Assets

The street map is a generated asset (Stitch), stored in `src/components/Widgets/assets/`. Do not use stock photos and do not hotlink images; keep the files in the repo.

## Usage

```tsx
<NavigationWidget distance="416 m" street="Kottayam" />
```

## Rules

- Draw only the elements in the image. Text exactly as in the image.
- Plain CSS, no extra runtime dependencies. Fonts: `--font-sans`.

## Accessibility

- The route and arrow are decorative SVG; the pill text is real text.

## Reference implementation (real files)

- `src/components/Widgets/Widgets.tsx`
- `src/components/Widgets/Widgets.css`

Match their structure and class names (`wg-` / `wg__` prefix).
