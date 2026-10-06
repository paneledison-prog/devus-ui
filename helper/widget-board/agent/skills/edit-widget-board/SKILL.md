---
name: edit-widget-board
description: Use when changing, extending or fixing the Widget board template of Devus UI.
---

# Edit the Widget board template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/WidgetBoard.tsx  (the example shown in the preview)`
- `src/components/AppUI/WidgetBoard.tsx`
- `src/components/AppUI/WidgetBoard.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Change a widget in its function in `WidgetBoard.tsx` and its `wd-` rules
2. Keep every control a real button with a pressed and focus state
3. The 5x7 dot-matrix font lives in `FONT`; add letters there
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
