---
name: edit-liquid-glass-chat
description: Use when changing, extending or fixing the Liquid glass chat template of Devus UI.
---

# Edit the Liquid glass chat template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/LiquidChat/LiquidChat.tsx`
- `src/components/LiquidChat/LiquidChat.css`
- `src/styles/tokens.css`

## Steps
1. Keep glass values in the `.lq` variables
2. Faces and the coastal scene are own SVG; never add photos
3. Respect reduced motion for the enter animation
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
