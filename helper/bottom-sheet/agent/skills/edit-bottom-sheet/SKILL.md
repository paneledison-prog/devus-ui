---
name: edit-bottom-sheet
description: Use when changing, extending or fixing the Bottom sheet template of Devus UI.
---

# Edit the Bottom sheet template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/BottomSheetExample.tsx  (the example shown in the preview)`
- `src/components/AppUI/BottomSheet.tsx`
- `src/components/AppUI/ListRow.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

## Steps
1. Edit `BottomSheet.tsx`
2. Mount it inside your own overlay or `<dialog>`; it is presentational
3. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
4. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
