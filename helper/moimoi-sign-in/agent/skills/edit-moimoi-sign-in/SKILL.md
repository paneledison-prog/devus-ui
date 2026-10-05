---
name: edit-moimoi-sign-in
description: Use when changing, extending or fixing the Moimoi sign in template of Devus UI.
---

# Edit the Moimoi sign in template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/MoimoiSignIn.tsx  (the example shown in the preview)`
- `src/components/AppUI/Moimoi.tsx`
- `src/components/AppUI/Moimoi.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Change the layout through the canvas coordinates in `Moimoi.css` and the SVG in `Moimoi.tsx`
2. Change a character in `Cast` (gradient, face, hair strokes)
3. Do not add elements that are not in the image
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
