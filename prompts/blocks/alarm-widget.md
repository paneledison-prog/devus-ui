# Alarm widget

Build a React + TypeScript `<AlarmWidget>` for Devus UI from the reference image (one tile of a six-tile widget sheet). Draw only what the image shows.

## Purpose

A 305x360 alarm tile: page dots at the top, the alarm time in large type, and a pale slider track with "Snooze" and "Stop" labels and a round blue alarm button in the middle.

## Layout

A 305x360 tile: white, 46px corners, 2px white border and a soft shadow (`0 12px 30px rgb(0 0 0 / .12)`). Coordinates are tile pixels.

- Dots: three 8px dots centered at top 24, the first blue `#2d8cf0`, the others `#e8edf3`.
- Time "7:30 AM" 49px/500, letter-spacing -0.035em, centered at top 104.
- Track: 275x62 at (14, 249), fully rounded, pale gray gradient. "Snooze" at the left and "Stop" at the right, 15px `#8e8e93`.
- Alarm button: 63px blue circle with a soft blue halo and a white alarm-clock icon, centered in the track.

## Assets

No image assets. Do not use stock photos and do not hotlink images; keep the files in the repo.

## Usage

```tsx
<AlarmWidget time="7:30 AM" />
```

## Rules

- Draw only the elements in the image. Text exactly as in the image.
- Plain CSS, no extra runtime dependencies. Fonts: `--font-sans`.

## Accessibility

- The alarm button has an `aria-label`; the dots are decorative.

## Reference implementation (real files)

- `src/components/Widgets/Widgets.tsx`
- `src/components/Widgets/Widgets.css`

Match their structure and class names (`wg-` / `wg__` prefix).
