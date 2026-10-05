---
name: edit-dashboard
description: Use when changing, extending or fixing the Dashboard template of Devus UI.
---

# Edit the Dashboard template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/pages/Library/templates.tsx  (function DashboardTemplate)`
- `src/pages/Library/templates.css  (Dashboard + shell section)`
- `src/components/Logo/Logo.tsx`
- `src/components/Badge/Badge.tsx`
- `src/components/Progress/Progress.tsx`
- `src/components/Avatar/Avatar.tsx`

## Steps
1. Add or change stat cards in the `tpl-stats` grid
2. Keep three columns at 720px
3. Use existing Badge tones; no new colors
4. Run the `verify-template` skill.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
