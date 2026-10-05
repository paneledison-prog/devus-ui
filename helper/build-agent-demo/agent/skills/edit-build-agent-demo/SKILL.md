---
name: edit-build-agent-demo
description: Use when changing, extending or fixing the Build agent demo template of Devus UI.
---

# Edit the Build agent demo template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/BuildAgent/BuildAgent.tsx`
- `src/components/BuildAgent/BuildAgent.css`
- `src/components/Agents/shared.tsx`
- `src/components/Agents/Agents.css`
- `src/styles/tokens.css`

## Steps
1. Extend the run script, never add unbounded timers
2. Every script step must be cancelable
3. Keep the simulator generic (no brand marks)
4. Run the `verify-template` skill.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
