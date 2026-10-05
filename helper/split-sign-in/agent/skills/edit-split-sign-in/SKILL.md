---
name: edit-split-sign-in
description: Use when changing, extending or fixing the Split sign in template of Devus UI.
---

# Edit the Split sign in template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/pages/Library/templates.tsx  (function SignInTemplate)`
- `src/pages/Library/templates.css  (Split section)`
- `src/components/Card/Card.tsx`
- `src/components/TextField/TextField.tsx`
- `src/components/Button/Button.tsx`
- `src/components/Logo/Logo.tsx`

## Steps
1. Add fields inside the Card, keep labels on every field
2. Wire `onSubmit` through props if the template becomes functional
3. Do not change the aurora colors
4. Run the `verify-template` skill.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
