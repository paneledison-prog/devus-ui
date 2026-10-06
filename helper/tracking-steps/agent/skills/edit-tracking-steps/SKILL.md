---
name: edit-tracking-steps
description: Use when changing, extending or fixing the Tracking steps template of Devus UI.
---

# Edit the Tracking steps template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/TrackingSteps.tsx  (the example shown in the preview)`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

## Steps
1. Edit `TrackSteps` in `Cards.tsx`
2. Never convey state by color alone
3. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
4. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
