# Heart rate widget

Build a React + TypeScript `<HeartRateWidget>` for Devus UI from the reference image (one tile of a six-tile widget sheet). Draw only what the image shows.

## Purpose

A 305x360 reading tile: a large number with "BPM" under it and a filled orange line chart across the bottom.

## Layout

A 305x360 tile: white, 46px corners, 2px white border and a soft shadow (`0 12px 30px rgb(0 0 0 / .12)`). Coordinates are tile pixels.

- Number "92" 56px/500 centered at top 94; "BPM" 18px `#8e8e93` at top 162.
- Chart: an orange line (`#e8821e`, 3.2px, round joins) with a vertical gradient fill from `#fbb98a` to `#feebdc`, spanning the full width inset 4px and ending at the tile bottom with 40px bottom corners.

## Assets

No image assets. Do not use stock photos and do not hotlink images; keep the files in the repo.

## Usage

```tsx
<HeartRateWidget bpm={92} />
```

## Rules

- Draw only the elements in the image. Text exactly as in the image.
- Plain CSS, no extra runtime dependencies. Fonts: `--font-sans`.

## Accessibility

- The chart is decorative; the reading and unit are real text.

## Reference implementation (real files)

- `src/components/Widgets/Widgets.tsx`
- `src/components/Widgets/Widgets.css`

Match their structure and class names (`wg-` / `wg__` prefix).
