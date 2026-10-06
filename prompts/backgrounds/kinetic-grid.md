# Kinetic grid

Build a React + TypeScript `<KineticGrid>` interactive background for Devus UI, with no text on it.

## Look

A deep indigo-black canvas (radial vignette from `#0f0e1c` to `#040408`) with a fine grid (28 px): faint white lines, a brighter major line every fourth line, and a small dot on every intersection (larger on the major ones). The grid bends toward the pointer, a soft violet light (`132, 104, 255`) follows it, and the lines and dots near it glow. While nobody is pointing, the light drifts across the grid on its own. Every click or tap sends a ripple through the grid: a ring that travels outward at about 440 px per second, pushing the lines, drawing a thin violet ring and fading out after about 1.6 s. Frame: 16:10 landscape, 1px white border, 24px radius.

## Props

- `spacing?`: grid spacing in px (default 28)
- `reach?`: radius of the pointer pull in px (default 190)
- `color?`: glow color as `"r, g, b"` (default `"132, 104, 255"`)

## Behavior and requirements

- The component fills its parent (absolute, inset 0), is `aria-hidden`, and renders on one `<canvas>` (device pixel ratio capped at 2) that follows size changes with a `ResizeObserver`.
- Pointer events only (mouse, pen, touch). The animation loop runs while the grid is on screen and the tab is visible (`IntersectionObserver`, `visibilitychange`) and stops otherwise.
- With `prefers-reduced-motion: reduce` it draws a still grid and ignores pointer input.
- Clean up the listeners, the observer and the animation frame on unmount. No dependencies, no heading or other content.
- Keep text placed on top readable (WCAG AA): use white text and keep it away from the glow.

## Reference implementation (real files)

- `src/components/Backgrounds/KineticGrid.tsx`
