# Jellyfish blue

Create a "Jellyfish blue" image background for Devus UI.

## Look

A dense cluster of translucent jellyfish in electric and navy blue, in a grainy deep-sea light. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-jellyfish-blue`) that sets background properties only: `background-color: #0a3a8a` (shown while the picture loads), `background-image: url(...)` pointing at `src/components/Backgrounds/assets/jellyfish-blue.webp`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (WebP). It must scale to any container; put text on a solid or blurred panel unless the picture is a plain gradient, and check contrast (WCAG AA).

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
