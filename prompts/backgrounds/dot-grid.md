# Dot grid

Create a pure-CSS "Dot grid" background for Devus UI.

## Look

A clean white field with a regular grid of small light-gray dots (1px radius, `#d4d4d4`, one dot every 20px in both directions). Quiet and neutral, like dotted paper. Frame: 16:10 landscape, 1px white border, 24px radius.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-dots`) that sets background properties only: `background-color: #fff`, `background-image: radial-gradient(circle, #d4d4d4 1px, transparent 1px)` and `background-size: 20px 20px`. No images, no JavaScript, no utility framework.
- It must scale to any container size, must not intercept pointer events (it is only a background), and keep dark text on top readable (WCAG AA).

## Design tokens

Prefer the Devus UI tokens so the background adapts to `[data-theme="light"]` and `[data-theme="dark"]`: `--surface`, `--separator`, `--muted`, `--accent`.
