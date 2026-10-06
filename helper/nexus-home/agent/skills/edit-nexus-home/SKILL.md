---
name: edit-nexus-home
description: Use when changing, extending or fixing the Nexus home template of Devus UI.
---

# Edit the Nexus home template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/NexusHome.tsx  (the example shown in the preview)`
- `src/components/AppUI/Nexus.tsx`
- `src/components/AppUI/Nexus.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

## Steps
1. Change the layout through the canvas coordinates in `Nexus.css`
2. Change the artwork in the `Felt*` components (gradient, light blobs, eyes)
3. Do not add elements that are not in the image
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
