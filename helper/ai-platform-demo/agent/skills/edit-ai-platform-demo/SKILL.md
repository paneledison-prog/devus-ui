---
name: edit-ai-platform-demo
description: Use when changing, extending or fixing the AI platform demo template of Devus UI.
---

# Edit the AI platform demo template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/Agents/Harbor.tsx`
- `src/components/Agents/Harbor.css`
- `src/components/Agents/shared.tsx`
- `src/components/Agents/Agents.css`
- `src/styles/tokens.css`

## Steps
1. Add a view: nav item + view component + Getting started step if relevant
2. Reuse the shared Modal and Toggle
3. Keep copy generic, no real vendors
4. Run the `verify-template` skill.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
