---
name: edit-home-screen
description: Use when changing, extending or fixing the Home screen template of Devus UI.
---

# Edit the Home screen template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/HomeScreen.tsx  (the example shown in the preview)`
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/TabBar.tsx`
- `src/components/AppUI/Fab.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Compose changes in `examples/HomeScreen.tsx`
2. Change a part in its own file (AppBar, Cards, TabBar, Fab), not in the example
3. Keep the phone safe areas clear (status bar, home indicator)
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
