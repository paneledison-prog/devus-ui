---
name: edit-crm-workspace-demo
description: Use when changing, extending or fixing the CRM workspace demo template of Devus UI.
---

# Edit the CRM workspace demo template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/Crm/Crm.tsx`
- `src/components/Crm/Crm.css`
- `src/styles/tokens.css`

## Steps
1. Add a page: sidebar item + page component + Quick Actions entry
2. Keep `--c-*` variables for every color
3. Clear every timer on unmount
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
