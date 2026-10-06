# Lakeside picnic

Create a "Lakeside picnic" image background for Devus UI.

## Look

A sunny lakeside scene seen from under a big tree: a group of people sitting in lawn chairs on the grass by the water, pines on the far shore and a bright blue sky with light clouds. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-lakeside-picnic`) that sets background properties only: `background-color: #7fb2dd` (shown while the picture loads), `background-image: url(...)` pointing at `src/components/Backgrounds/assets/lakeside-picnic.webp`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (WebP). It must scale to any container; put text on a solid or blurred panel unless the picture is a plain gradient, and check contrast (WCAG AA).

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
