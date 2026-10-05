---
name: edit-company-intelligence-demo
description: Use when changing, extending or fixing the Company intelligence demo template of Devus UI.
---

# Edit the Company intelligence demo template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/Agents/Beacon.tsx`
- `src/components/Agents/Beacon.css`
- `src/components/Agents/shared.tsx`
- `src/components/Agents/Agents.css`
- `src/styles/tokens.css`

## Steps
1. Put reusable pieces in shared.tsx, page styles in Beacon.css
2. Keep the palette keyboard-operable
3. Fictional company names only
4. Run the `verify-template` skill.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
