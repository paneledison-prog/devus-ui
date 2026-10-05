---
name: edit-finance-dashboard
description: Use when changing, extending or fixing the Finance dashboard template of Devus UI.
---

# Edit the Finance dashboard template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/FinanceDashboard.tsx  (the example shown in the preview)`
- `src/components/AppUI/Finance.tsx`
- `src/components/AppUI/Finance.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Compose in `examples/FinanceDashboard.tsx`
2. Change pieces in `Finance.tsx` and their look in `Finance.css` (`fin-` classes)
3. Pass `hero` to `PhoneFrame` for the gradient
4. Keep every sample name, amount and merchant fictional
5. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
6. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
