# Moodboard canvas

Build a React + TypeScript `<MoodboardDemo>` template for Devus UI from the reference screenshot of a pinboard app. Everything works: nothing is a picture of a control.

## Purpose

A calm moodboard workspace on a cream background. Cards, stickies, photos, slides and notes are placed on a board, connected with black connector lines, and drawn over with a pen.

## Layout (stage 1023x717, scaled to fit)

- Top pill, centered at y 41: search, history, "Main" space name, cloud/sync (42px round buttons on `#e9e3d8`).
- Pen wheel at top left: a 142px cream ring, eight ink swatches on an arc (olive, sage, lime, gray, pale pink, pink, salmon, dark red selected and larger), tool icons on the left, a large "A" in the center.
- Left rail: a pill with seven tools (new card, duplicate, folder swatch, sticky note, text box, circle, attach) and a second pill with settings, inbox and trash.
- Board items (x, y, w, h): "Hello" orchid sticky (358, 77, 161, 53); peach handwriting card (251, 169, 241, 155); framed sprig on linen (662, 69, 140, 140); pressed flowers (535, 108, 105, 135); black cat from above (638, 176, 96, 96); lilac "New Space" swatch (526, 256, 31, 31); latte (592, 262, 70, 70); shell with "Morning Pages" caption (714, 291, 55, 62); filmstrip (152, 309, 209, 41); "A YEAR OF CURIOSITY" slide with a sheet of shapes (100, 353, 312, 175); reading-list notepad with torn edge (74, 477, 295, 145); February card (440, 405, 311, 174) and March card (516, 521, 311, 174), each with a photo; peach "FEBRUARY – Connection" and lilac "MARCH – Momentum" tags at x 866.
- Connectors: black 3px lines with dark dots from the Hello sticky to the handwriting card, and from each tag to its card.

## Interaction

- Select, drag, resize (corner handle), edit text (double-click), recolor, duplicate, bring to front, delete; arrows nudge; Delete removes; Ctrl+Z / Ctrl+Y undo and redo; Escape clears.
- Drag the dark dot of a selected card onto another card to create a connector; links follow the cards; double-click an end dot to remove one.
- Pen wheel: pen, marker, eraser, text tool, ink colors, undo, redo.
- Rail: add cards, swatches, stickies, text, circles and pictures; settings popover (snap to grid, show connectors, background color); inbox lists removed items with Restore; the trash button deletes the selection and cards can be dropped on it.
- Top pill: search highlights matches and dims others; history lists changes with Undo and Redo; the space name opens Main, Ideas and Archive (each with its own board and history); the cloud button shows a saving state after every change.
- The filmstrip chooses which slide the "A Year of Curiosity" card shows.

## Rules

- All artwork is own SVG (no image files, no photos). Text is original.
- Every control is a real `<button>` or `<input>` with a label, a focus ring and a pressed state. Animations respect `prefers-reduced-motion`.
- Plain CSS, no extra runtime dependencies. Also write a Storybook story (CSF3, autodocs).

## Reference implementation (real files)

- `src/components/Moodboard/Moodboard.tsx`
- `src/components/Moodboard/MoodboardArt.tsx`
- `src/components/Moodboard/Moodboard.css`

Match their structure and class names (`mb-` prefix).
