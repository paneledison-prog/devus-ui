# Emerald glow

Create a pure-CSS "Emerald glow" background for Devus UI.

## Look

Soft blurred mesh gradient on black: two emerald light beams falling from the top and a bright mint glow rising from the bottom edge. No hard edges; keep it smooth. Frame: 16:10 landscape, 1px white border, 24px radius.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-dots`) that sets background properties only: no images, no JavaScript.
- It must scale to any container size and keep text on top readable (WCAG AA).

## Design tokens

Prefer the Devus UI tokens so the background adapts to `[data-theme="light"]` and `[data-theme="dark"]`: `--surface`, `--separator`, `--muted`, `--accent`.
