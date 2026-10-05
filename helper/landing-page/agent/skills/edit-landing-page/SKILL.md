---
name: edit-landing-page
description: Use when changing, extending or fixing the Landing page template of Devus UI.
---

# Edit the Landing page template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/pages/Library/templates.tsx  (function LandingTemplate)`
- `src/pages/Library/templates.css  (Landing section)`
- `src/components/Button/Button.tsx`
- `src/components/Badge/Badge.tsx`
- `src/components/Logo/Logo.tsx`

## Steps
1. Change copy and structure in `LandingTemplate` (templates.tsx)
2. Change layout in the Landing block of templates.css
3. Reuse Button, Badge, Logo; do not restyle them here
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
