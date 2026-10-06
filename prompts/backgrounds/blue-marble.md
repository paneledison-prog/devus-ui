# Blue marble

Create a "Blue marble" image background for Devus UI.

## Look

Soft liquid swirls of cobalt blue and white, like marbled paper with a pearly gloss. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-blue-marble`) that sets background properties only: `background-color: #a9c3ee` (shown while the picture loads), `background-image: url(...)` pointing at `src/components/Backgrounds/assets/blue-marble.webp`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (WebP). It must scale to any container; put text on a solid or blurred panel unless the picture is a plain gradient, and check contrast (WCAG AA).

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
