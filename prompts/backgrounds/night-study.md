# Night study

Create a "Night study" image background for Devus UI.

## Look

A starry night sky over a flower meadow where a person works at a glowing laptop among stacks of books, lit warmly by yellow flowers and lamps. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-night-study`) that sets background properties only: `background-color: #0b2a4d` (shown while the picture loads), `background-image: url(...)` pointing at `src/components/Backgrounds/assets/night-study.webp`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (WebP). It must scale to any container; put text on a solid or blurred panel unless the picture is a plain gradient, and check contrast (WCAG AA).

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
