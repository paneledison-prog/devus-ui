# Pink tulip digital

Create a "Pink tulip digital" image background for Devus UI.

## Look

A coral-pink tulip with a leaf, against a blue sky with warm out-of-focus highlights in the corners, with a grid of glowing `2`, `*`, `+`, `/` and `e` characters laid over the bloom and the leaf like a digital halftone. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-tulip-digital`) that sets background properties only: `background-color: #9dbfe0`, `background-image: url(...)` pointing at `src/components/Backgrounds/assets/tulip-digital.jpg`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (about 500 KB, 1024x1024). It must scale to any container; put text on a solid or blurred panel, because the pattern in the picture is busy.

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
