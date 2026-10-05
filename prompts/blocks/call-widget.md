# Call widget

Build a React + TypeScript `<CallWidget>` for Devus UI from the reference image (one tile of a six-tile widget sheet). Draw only what the image shows.

## Purpose

A 305x360 incoming-call tile: a caller photo across the top, the name and call status centered under it, and a green accept button beside a pale-red decline button.

## Layout

A 305x360 tile: white, 46px corners, 2px white border and a soft shadow (`0 12px 30px rgb(0 0 0 / .12)`). Coordinates are tile pixels.

- Photo: 293x179 at (4, 4), 40px top corners.
- Name "Jason Lambert" 21px/500 centered at top 196; status "Incoming Call" 14px `#8e8e93` at top 223.
- Accept: 76px green circle (`#2fc14a`) with a soft green halo and a white handset, centered at x 108.
- Decline: 76px circle `#fde5e5` with a red hang-up handset, centered at x 203.

## Assets

The photo is a generated asset (Stitch), stored in `src/components/Widgets/assets/`. Do not use stock photos and do not hotlink images; keep the files in the repo.

## Usage

```tsx
<CallWidget name="Jason Lambert" status="Incoming Call" />
```

## Rules

- Draw only the elements in the image. Text exactly as in the image.
- Plain CSS, no extra runtime dependencies. Fonts: `--font-sans`.

## Accessibility

- Accept and decline are buttons with `aria-label`; the photo is decorative.

## Reference implementation (real files)

- `src/components/Widgets/Widgets.tsx`
- `src/components/Widgets/Widgets.css`

Match their structure and class names (`wg-` / `wg__` prefix).
