---
name: edit-agent-builder-demo
description: Use when changing, extending or fixing the Agent builder demo template of Devus UI.
---

# Edit the Agent builder demo template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/Agents/Pairwise.tsx`
- `src/components/Agents/Pairwise.css`
- `src/components/Agents/shared.tsx`
- `src/components/Agents/Agents.css`
- `src/styles/tokens.css`

## Steps
1. Add a stage by extending the Stage type and the run script
2. Keep every timer cancelable
3. Never auto-approve
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
