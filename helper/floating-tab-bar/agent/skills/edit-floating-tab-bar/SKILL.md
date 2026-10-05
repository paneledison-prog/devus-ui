---
name: edit-floating-tab-bar
description: Use when changing, extending or fixing the Floating tab bar template of Devus UI.
---

# Edit the Floating tab bar template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/FloatingTabBar.tsx  (the example shown in the preview)`
- `src/components/AppUI/TabBar.tsx`
- `src/components/AppUI/Fab.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Edit behavior in `TabBar.tsx`, look in the TabBar section of AppUI.css
2. Keep the dark-mode pill lighter than the bar
3. Keep items filling the bar so there is no empty stretch beside the action
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
