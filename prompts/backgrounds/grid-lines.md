# Grid lines

Create a pure-CSS "Grid lines" background for Devus UI.

## Look

blueprint-style 32px grid drawn with the separator color. Frame: 16:10 landscape, 1px white border, 24px radius.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-dots`) that sets background properties only: no images, no JavaScript.
- It must scale to any container size and keep text on top readable (WCAG AA).

## Design tokens

Prefer the Devus UI tokens so the background adapts to `[data-theme="light"]` and `[data-theme="dark"]`: `--surface`, `--separator`, `--muted`, `--accent`.
