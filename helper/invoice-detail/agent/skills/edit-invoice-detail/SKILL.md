---
name: edit-invoice-detail
description: Use when changing, extending or fixing the Invoice detail template of Devus UI.
---

# Edit the Invoice detail template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/InvoiceDetail.tsx  (the example shown in the preview)`
- `src/components/AppUI/Finance.tsx`
- `src/components/AppUI/Finance.css`
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Compose in `examples/InvoiceDetail.tsx`
2. Change pieces in `Finance.tsx` and their look in `Finance.css` (`inv-` classes)
3. Money is formatted in `InvoiceItems`; keep totals derived, never typed twice
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
