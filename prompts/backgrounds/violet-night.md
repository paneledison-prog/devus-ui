# Violet night

Create a pure-CSS "Violet night" background for Devus UI.

## Look

The dark twin of Violet radial: a black field with a soft radial light near the top center that stays black for the first 40%, then glows into a saturated violet (`#6633ee`) toward the edges and the bottom. No hard edges. Frame: 16:10 landscape, 1px white border, 24px radius.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-violet-night`) that sets background properties only: `background-color: #000` and `background-image: radial-gradient(125% 125% at 50% 10%, #000 40%, #6633ee 100%)`. No images, no JavaScript, no utility framework.
- It must scale to any container size and keep light text on top readable (WCAG AA) inside the black area; keep text away from the violet edges.

## Design tokens

Prefer the Devus UI tokens so the background adapts to `[data-theme="light"]` and `[data-theme="dark"]`: `--surface`, `--separator`, `--muted`, `--accent`.
