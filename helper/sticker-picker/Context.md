# Sticker picker: Context

> Living document for the **Sticker picker** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A camera screen with a sticker sheet: the photo is blurred behind a white sheet that shows three sticker packs, four stickers, a "stickers" title and a close button.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/StickerPicker.tsx  (the example shown in the preview)`
- `src/components/AppUI/Stickers.tsx`
- `src/components/AppUI/Stickers.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `StickersCanvas` and the screen pieces (in Stickers.tsx); `PhoneFrame({ bare, height })`.

## What it does
- Only what the reference image shows (see the layout list in the prompt)
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`
- Decorative images use `alt=""`; buttons are real buttons
- Gesture: Swipe - swipe the sheet down to close it; swipe it sideways to change the pack
- Gesture: Long press - press and hold a sticker to peek at it full size; let go to dismiss

## Known gaps
- The stickers and the photo are Stitch-generated look-alikes, not the exact images
- The italic serif of the title is Georgia italic, the reference uses a display italic
- The blur is CSS, not the real camera feed
- Static replica: no handlers, no state, no animation (as in the image)

## How it is wired into the library
- The library entry is `Sticker picker` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 8 light probes and 8 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=sticker-picker&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
