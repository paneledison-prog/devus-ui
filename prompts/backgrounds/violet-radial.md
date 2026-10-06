# Violet radial

Create a pure-CSS "Violet radial" background for Devus UI.

## Look

A white field with a soft radial light near the top center that stays white for the first 40%, then fades into a saturated violet (`#6633ee`) toward the edges and the bottom. Light theme, no hard edges. Frame: 16:10 landscape, 1px white border, 24px radius.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-violet`) that sets background properties only: `background-color: #fff` and `background-image: radial-gradient(125% 125% at 50% 10%, #fff 40%, #6633ee 100%)`. No images, no JavaScript, no utility framework.
- It must scale to any container size and keep dark text on top readable (WCAG AA) inside the white area; keep text away from the violet edges.

## Design tokens

Prefer the Devus UI tokens so the background adapts to `[data-theme="light"]` and `[data-theme="dark"]`: `--surface`, `--separator`, `--muted`, `--accent`.
