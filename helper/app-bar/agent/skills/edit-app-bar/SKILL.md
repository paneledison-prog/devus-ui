---
name: edit-app-bar
description: Use when changing, extending or fixing the App bar template of Devus UI.
---

# Edit the App bar template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/AppBarExample.tsx  (the example shown in the preview)`
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/icons.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Edit `AppBar.tsx` for behavior and the `.app-bar*` rules in AppUI.css for look
2. Keep the title an `<h2>` and the back button labelled "Back"
3. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
4. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
