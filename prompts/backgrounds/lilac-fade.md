# Lilac fade

Create a pure-CSS "Lilac fade" background for Devus UI.

## Look

Pale lavender-white light at the top that melts through a violet band into pure black at the bottom, with a soft glow on the right and a soft mauve glow in the top-left corner. No hard edges. Frame: 16:10 landscape, 1px white border, 24px radius.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-dots`) that sets background properties only: no images, no JavaScript.
- It must scale to any container size and keep text on top readable (WCAG AA).

## Design tokens

Prefer the Devus UI tokens so the background adapts to `[data-theme="light"]` and `[data-theme="dark"]`: `--surface`, `--separator`, `--muted`, `--accent`.
