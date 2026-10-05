---
name: edit-ai-workspace-demo
description: Use when changing, extending or fixing the AI workspace demo template of Devus UI.
---

# Edit the AI workspace demo template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/Workspace/Workspace.tsx`
- `src/components/Workspace/Workspace.css`
- `src/components/Switch/Switch.tsx`
- `src/components/Switch/Switch.css`
- `src/styles/tokens.css`

## Steps
1. Add a page: new nav entry + a page component + search index entry
2. Keep theme colors in the `--ws-*` variables
3. Simulated work must be cancelable and cleared on unmount
4. Run the `verify-template` skill.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
