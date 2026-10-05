---
name: edit-story-rings
description: Use when changing, extending or fixing the Story rings template of Devus UI.
---

# Edit the Story rings template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/StoryRings.tsx  (the example shown in the preview)`
- `src/components/AppUI/StoryRing.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Edit `StoryRing.tsx` and the `.app-story*` rules
2. The ring is decorative; keep the accessible name on the button
3. Run the `verify-template` skill.
4. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
