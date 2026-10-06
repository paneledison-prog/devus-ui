# Moodboard canvas: Context

> Living document for the **Moodboard canvas** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A pinboard workspace: sticky notes, photos, slides, notes and cards you can drag, edit, link and draw over, with a pen wheel, a left tool rail and a top pill for search, history, spaces and sync.

Brand: none (own copy and artwork). Open it full window at `/?template=moodboard-canvas`.

## Real files
- `src/components/Moodboard/Moodboard.tsx`
- `src/components/Moodboard/MoodboardArt.tsx`
- `src/components/Moodboard/Moodboard.css`
- `src/styles/tokens.css`

Public API: `MoodboardDemo({ initialSpace?: "Main" | "Ideas" | "Archive" })`.

## What it does
- Drag, resize (corner handle), edit (double-click), recolor, duplicate, bring to front and delete any card; keyboard: arrows nudge, Delete removes, Ctrl+Z / Ctrl+Y undo and redo, Escape clears
- Connectors: drag the dark dot of a selected card onto another card to link them; links follow the cards; double-click an end dot to remove a link
- Pen wheel: pen, marker, eraser, text tool, eight inks, undo and redo; strokes are part of the history
- Left rail: new card, duplicate, space swatch, sticky, text box, circle, attach a picture; settings (snap to grid, show connectors, background), inbox of removed items with Restore, and a trash you can drop cards on
- Top pill: search highlights matching cards, history lists changes with Undo and Redo, a space switcher (Main, Ideas, Archive, each with its own board and history) and a sync indicator
- Filmstrip picks which slide the "A Year of Curiosity" card shows; the reading list and the Feb / Mar cards are editable

## Known gaps
- The pictures (pressed flowers, cat, latte, shell, framed sprig, two flower photos) are own SVG drawings, not photographs
- No panning or zoom; the board is one fixed stage scaled to fit
- Sync is simulated (a short saving state), nothing is stored

## How it is wired into the library
- The library entry is `Moodboard canvas` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 46 light probes and 46 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=moodboard-canvas&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
