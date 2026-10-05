---
name: edit-case-study
description: Use when changing, extending or fixing the Case study template of Devus UI.
---

# Edit the Case study template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/CaseStudy/CaseStudy.tsx`
- `src/components/CaseStudy/CaseStudy.css`
- `src/styles/tokens.css`

## Steps
1. Edit copy through the name, overview and scope props
2. Add a screen by adding a 1140x662 block to the screen stack
3. Keep the sticky behavior of the left panel
4. Run the `verify-template` skill.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
