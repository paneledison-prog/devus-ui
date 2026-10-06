---
name: edit-moodboard-canvas
description: Use when changing, extending or fixing the Moodboard canvas template of Devus UI.
---

# Edit the Moodboard canvas template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/Moodboard/Moodboard.tsx`
- `src/components/Moodboard/MoodboardArt.tsx`
- `src/components/Moodboard/Moodboard.css`
- `src/styles/tokens.css`

## Steps
1. Add a card kind by extending `Kind`, its face in `body()` and its CSS
2. Keep every control a real button with a label
3. Never add photos; draw new art in `MoodboardArt.tsx`
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
