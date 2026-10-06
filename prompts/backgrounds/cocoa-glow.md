# Cocoa glow

Create a "Cocoa glow" image background for Devus UI.

## Look

A dark chocolate top that glows to a pale peach center and back to cream at the bottom. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-cocoa-glow`) that sets background properties only: `background-color: #3a1a0a` (shown while the picture loads), `background-image: url(...)` pointing at `src/components/Backgrounds/assets/cocoa-glow.webp`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (WebP). It must scale to any container; put text on a solid or blurred panel unless the picture is a plain gradient, and check contrast (WCAG AA).

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
