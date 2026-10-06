# Contact widget

Build a React + TypeScript `<ContactWidget>` block for Devus UI from the reference image of a sheet of 286x286 widgets.

## Purpose

One live glance widget on a 286x286 tile with a 46px radius. Call, message and video; press and hold the avatar to favorite.

## Behavior

- Every control is a real `<button>` with an accessible name, a focus ring and a pressed state.
- Gestures use pointer events (`src/components/AppUI/gestures.tsx`): they work with mouse, pen and touch, and respect `prefers-reduced-motion`.
- Timers stop in the design bench (`?bench=1`).

## Rules

- Original artwork only; names and numbers are made up. Pictures are image assets in `src/components/Widgets/assets/board/`.
- Plain CSS with the `wd-` prefix, no extra runtime dependencies.

## Reference implementation (real files)

- `src/components/Widgets/Board.tsx` (function `ContactWidget`)
- `src/components/Widgets/Board.css`
- `src/components/AppUI/gestures.tsx`

Match their structure and class names.
