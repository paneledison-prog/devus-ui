# Dither shader

Build a React + TypeScript `<DitherShader>` background for Devus UI, with no text on it, in the style of an ordered-dither shader.

## Look

A slowly drifting soft light field (layered sine waves) turned into a two-color pattern with 5 tone steps and an 8x8 ordered Bayer matrix, drawn in square cells (3 px by default). Default colors: ink `#1a1233` (dark violet) and paper `#efe9ff` (pale lilac), so the shadows are a dense dot pattern and the highlights are clean paper. Frame: 16:10 landscape, 1px white border, 24px radius.

## Props

- `cell?`: size of one dither cell in CSS px (default 3)
- `ink?` / `paper?`: hex colors of the shadows and the highlights
- `speed?`: animation speed multiplier (default 1, 0 draws one still frame)

## Behavior and requirements

- One `<canvas>` that fills its parent (absolute, inset 0), `aria-hidden`, rendered with a WebGL fragment shader (no libraries). Device pixel ratio capped at 2; the canvas follows size changes with a `ResizeObserver`; `image-rendering: pixelated`.
- The Bayer threshold is computed in the shader from the cell coordinate (no texture).
- The loop stops while the element is off screen (`IntersectionObserver`) or the tab is hidden, and restarts when it returns.
- With `prefers-reduced-motion: reduce` it draws one still frame. Without WebGL it falls back to a plain gradient between the two colors.
- Delete the GL program and buffer and remove every observer and listener on unmount. Do not force-lose the context in cleanup: React strict mode re-runs the effect on the same canvas.
- Keep text placed on top readable (WCAG AA): put it on a solid or blurred panel, because the dither pattern is high contrast.

## Reference implementation (real files)

- `src/components/Backgrounds/DitherShader.tsx`
