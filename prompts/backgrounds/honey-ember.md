# Honey ember

Create a pure-CSS "Honey ember" background for Devus UI, with no text on it.

## Look

A warm cream field (`#FFFDF7`) with four large soft glows that overlap like embers: amber (`#FBBF24`) in the top left, deeper amber (`#F59E0B`) on the right, orange (`#FB923C`) rising from the bottom, and a pale rose (`#FECACA`) near the bottom center. Over everything, a barely visible dot texture (4px grid, 1px dots in `#78350F` at about 3.4% opacity). Frame: 16:10 landscape, 1px white border, 24px radius.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-honey-ember`) that sets background properties only: `background-color: #fffdf7`, one layer for the dots (`background-size: 4px 4px`) and four `radial-gradient` layers for the glows (each `background-size: 100% 100%`, fading to transparent). No images, no JavaScript, no utility framework, no heading or other content.
- It must scale to any container size and keep dark text (`#78350F` or darker) on top readable (WCAG AA).

## Design tokens

Prefer the Devus UI tokens so the background adapts to `[data-theme="light"]` and `[data-theme="dark"]`: `--surface`, `--separator`, `--muted`, `--accent`.
