---
name: edit-week-strip
description: Use when changing, extending or fixing the Week strip template of Devus UI.
---

# Edit the Week strip template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/WeekStripExample.tsx  (the example shown in the preview)`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Edit `WeekStrip` in `Cards.tsx`
2. Keep the group labelled and each day a 44px target
3. Run the `verify-template` skill.
4. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
