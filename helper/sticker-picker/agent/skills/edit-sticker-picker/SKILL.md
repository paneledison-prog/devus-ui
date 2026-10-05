---
name: edit-sticker-picker
description: Use when changing, extending or fixing the Sticker picker template of Devus UI.
---

# Edit the Sticker picker template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/StickerPicker.tsx  (the example shown in the preview)`
- `src/components/AppUI/Stickers.tsx`
- `src/components/AppUI/Stickers.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Change the layout through the canvas coordinates in `Stickers.css`
2. Regenerate an image with the Stitch skill if it does not match the reference
3. Do not add elements that are not in the image
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
