# Progress ring widget

Build a React + TypeScript `<ProgressRingWidget>` for Devus UI from the reference image (one tile of a six-tile widget sheet). Draw only what the image shows.

## Purpose

A 305x360 progress tile: a small date at the top, a large ring with the percentage inside, and a caption at the bottom.

## Layout

A 305x360 tile: white, 46px corners, 2px white border and a soft shadow (`0 12px 30px rgb(0 0 0 / .12)`). Coordinates are tile pixels.

- Date "JUL 26" 14px `#8e8e93` centered at top 41; caption "TRACK PROGRESS" 14px `#8e8e93` centered at top 299.
- Ring: 210px SVG at (45, 73): a faint outer circle (r 98, 2px `#f1f1f3`), a track (r 82, 11px `#f4f4f6`) and a blue arc (`#2d8cf0`, 11px, round caps) covering the given percent, starting at about 20 degrees right of the top.
- Percentage "60%" 58px/500 centered inside the ring.

## Assets

No image assets. Do not use stock photos and do not hotlink images; keep the files in the repo.

## Usage

```tsx
<ProgressRingWidget percent={60} date="JUL 26" caption="TRACK PROGRESS" />
```

## Rules

- Draw only the elements in the image. Text exactly as in the image.
- Plain CSS, no extra runtime dependencies. Fonts: `--font-sans`.

## Accessibility

- The value is real text; the ring is decorative SVG (`aria-hidden`).

## Reference implementation (real files)

- `src/components/Widgets/Widgets.tsx`
- `src/components/Widgets/Widgets.css`

Match their structure and class names (`wg-` / `wg__` prefix).
