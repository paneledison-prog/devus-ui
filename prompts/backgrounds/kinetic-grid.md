# Kinetic grid

Build a React + TypeScript `<KineticGrid>` interactive background for Devus UI, with no text on it.

## Look

A near-black canvas (`#050509`) with a fine grid of faint white lines. The grid bends toward the pointer, and the lines near it glow violet (`124, 92, 255`). Every click or tap sends a ripple through the grid: a ring that travels outward at about 420 px per second, pushing the lines and fading out after about 1.6 s. Frame: 16:10 landscape, 1px white border, 24px radius.

## Props

- `spacing?`: grid spacing in px (default 30)
- `reach?`: radius of the pointer pull in px (default 170)
- `color?`: glow color as `"r, g, b"` (default `"124, 92, 255"`)

## Behavior and requirements

- The component fills its parent (absolute, inset 0), is `aria-hidden`, and renders on one `<canvas>` (device pixel ratio capped at 2) that follows size changes with a `ResizeObserver`.
- Pointer events only (mouse, pen, touch). The animation loop runs only while the pointer is over the grid or a ripple is alive, and stops otherwise.
- With `prefers-reduced-motion: reduce` it draws a still grid and ignores pointer input.
- Clean up the listeners, the observer and the animation frame on unmount. No dependencies, no heading or other content.
- Keep text placed on top readable (WCAG AA): use white text and keep it away from the glow.

## Reference implementation (real files)

- `src/components/Backgrounds/KineticGrid.tsx`
