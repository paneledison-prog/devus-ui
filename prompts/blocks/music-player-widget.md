# Music player widget

Build a React + TypeScript `<MusicWidget>` for Devus UI from the reference image (one tile of a six-tile widget sheet). Draw only what the image shows.

## Purpose

A 305x360 now-playing tile: a cover photo across the top, the track title and artist centered under it, and transport controls (previous, a large blue pause button, next).

## Layout

A 305x360 tile: white, 46px corners, 2px white border and a soft shadow (`0 12px 30px rgb(0 0 0 / .12)`). Coordinates are tile pixels.

- Photo: 293x179 at (4, 4), 40px top corners, square bottom corners.
- Title "What you need" 21px/500, letter-spacing -0.035em, centered, top 196. Artist "Don Toliver" 14px `#8e8e93`, centered, top 223.
- Pause button: 76px circle, vertical gradient `#4ca6f7` to `#1c70d8`, white pause bars, centered at x 150, top 258.
- Previous and next: double triangles 42x24 in `#a9c9ee`, centered at x 65 and x 237.

## Assets

The photo is a generated asset (Stitch), stored in `src/components/Widgets/assets/`. Do not use stock photos and do not hotlink images; keep the files in the repo.

## Usage

```tsx
<MusicWidget title="What you need" artist="Don Toliver" />
```

## Rules

- Draw only the elements in the image. Text exactly as in the image.
- Plain CSS, no extra runtime dependencies. Fonts: `--font-sans`.

## Accessibility

- Both skip controls and the play/pause control are buttons with `aria-label`; the photo is decorative (`alt=""`).

## Reference implementation (real files)

- `src/components/Widgets/Widgets.tsx`
- `src/components/Widgets/Widgets.css`

Match their structure and class names (`wg-` / `wg__` prefix).
