# Sun hat portrait

Create a "Sun hat portrait" image background for Devus UI.

## Look

A woman in a wide-brim straw hat and a floral dress, lit by low sunlight with green leaves and bright lens flares behind her. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-sun-hat-portrait`) that sets background properties only: `background-color: #5a8fbf` (shown while the picture loads), `background-image: url(...)` pointing at `src/components/Backgrounds/assets/sun-hat-portrait.webp`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (WebP). It must scale to any container; put text on a solid or blurred panel unless the picture is a plain gradient, and check contrast (WCAG AA).

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
