# Moimoi sign in: Context

> Living document for the **Moimoi sign in** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Playful sign-in screen: a heavy "moimoi" wordmark over six round characters and a "Hello~" bubble, then a warm panel with a lead line and Sign in with Google / Apple buttons.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/MoimoiSignIn.tsx  (the example shown in the preview)`
- `src/components/AppUI/Moimoi.tsx`
- `src/components/AppUI/Moimoi.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `MoimoiCanvas`, `MoimoiStatusBar`, `Wordmark`, `Cast`, `SignInPanel` (in Moimoi.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows: Dynamic Island, status bar, wordmark, six characters, loose lines, sprout, Hello~ bubble, lead text, two buttons, home indicator
- The wordmark is a labelled SVG; the characters are decorative (`aria-hidden`)
- All artwork is original SVG (radial gradients, drop shadows, black strokes); no image files

## Known gaps
- Static replica: no handlers, no state, no animation (as in the image)
- The characters and the wordmark letters are hand-drawn approximations; details (hair curves, faces) differ slightly from the image
- The real phone bezel in the image is not reproduced
- Font is Inter, not the original rounded sans
- Stitch was not used: the screen has no photo assets and the interface is built by hand

## How it is wired into the library
- The library entry is `Moimoi sign in` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 7 light probes and 7 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=moimoi-sign-in&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
