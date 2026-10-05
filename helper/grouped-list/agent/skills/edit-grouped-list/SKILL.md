---
name: edit-grouped-list
description: Use when changing, extending or fixing the Grouped list template of Devus UI.
---

# Edit the Grouped list template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/GroupedList.tsx  (the example shown in the preview)`
- `src/components/AppUI/ListRow.tsx`
- `src/components/AppUI/icons.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Edit `ListRow.tsx`
2. Pass `trailing={false}` to hide the chevron
3. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
4. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
