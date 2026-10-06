---
name: edit-balance-card
description: Use when changing, extending or fixing the Balance card template of Devus UI.
---

# Edit the Balance card template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/BalanceCardExample.tsx  (the example shown in the preview)`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/icons.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

## Steps
1. Edit `BalanceCard` in `Cards.tsx`
2. Pass actions as buttons through the `actions` prop
3. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
4. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
