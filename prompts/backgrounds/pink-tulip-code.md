# Pink tulip code

Create a "Pink tulip code" image background for Devus UI.

## Look

A soft pink tulip against a pale sky-blue field, with a glowing layer of source code over the flower (an `if (x<10)` block, `function_call()`, `data_stream`, `loop_end`), an ASCII-art silhouette made of `2`, `*` and `=` on the left petals and thin circuit traces fanning out to the right. Frame: 16:10 landscape, 1px white border, 24px radius; the picture is cropped with `cover`, centered.

## Deliverable and requirements

- Deliver a single utility class (for example `.bg-tulip-code`) that sets background properties only: `background-color: #9dbfe0`, `background-image: url(...)` pointing at `src/components/Backgrounds/assets/tulip-code.jpg`, `background-size: cover` and `background-position: center`. No JavaScript.
- Keep the picture as a bundled asset (about 500 KB, 1024x1024). It must scale to any container; put text on a solid or blurred panel, because the pattern in the picture is busy.

## Design tokens

Prefer the Devus UI tokens for anything around the picture: `--surface`, `--separator`, `--muted`, `--accent`.
