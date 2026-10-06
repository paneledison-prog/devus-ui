---
name: edit-ai-chat-studio
description: Use when changing, extending or fixing the AI chat studio template of Devus UI.
---

# Edit the AI chat studio template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/ChatStudio/ChatStudio.tsx`
- `src/components/ChatStudio/ChatStudioArt.tsx`
- `src/components/ChatStudio/ChatStudio.css`
- `src/styles/tokens.css`

## Steps
1. Add scripted replies in `REPLIES` and `reply()`
2. Keep every control a real button with a label
3. Never add photos; draw new art in `ChatStudioArt.tsx`
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
