# Lilac grid

Create a pure-CSS "Lilac grid" background for Devus UI.

## Look

A white field with a fine light-gray grid (1px lines every 96px across and 64px down, `#f0f0f0`, drawn above the glow so they stay visible in it) and a soft lilac glow (`#d5c5ff`) that spills in from the upper right corner and fades to transparent. Light theme, no hard edges. Frame: 16:10 landscape, 1px white border, 24px radius.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-lilac-grid`) that sets background properties only: `background-color: #fff`, three layered `background-image`s (the two grid lines on top: `linear-gradient(to right, #f0f0f0 1px, transparent 1px)` and `linear-gradient(#f0f0f0 1px, transparent 1px)`, over the glow `radial-gradient(800px at 100% 200px, #d5c5ff, transparent)`) and `background-size: 96px 64px, 96px 64px, 100% 100%`. No images, no JavaScript, no utility framework.
- It must scale to any container size and keep dark text on top readable (WCAG AA).

## Design tokens

Prefer the Devus UI tokens so the background adapts to `[data-theme="light"]` and `[data-theme="dark"]`: `--surface`, `--separator`, `--muted`, `--accent`.
