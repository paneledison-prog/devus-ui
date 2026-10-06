# Blue cut

Create a "Blue cut" image background for Devus UI.

## Look

A warm off-white field with a vivid cobalt blue shape blurred on the right and sliced into vertical bands, like a sphere seen through glass. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-blue-cut`) that sets background properties only: `background-color: #f6f3ef` (shown while the picture loads), `background-image: url(...)` pointing at `src/components/Backgrounds/assets/blue-cut.webp`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (WebP). It must scale to any container; put text on a solid or blurred panel unless the picture is a plain gradient, and check contrast (WCAG AA).

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
