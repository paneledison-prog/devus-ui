---
name: edit-settings-page
description: Use when changing, extending or fixing the Settings page template of Devus UI.
---

# Edit the Settings page template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/pages/Library/templates.tsx  (function SettingsTemplate)`
- `src/pages/Library/templates.css  (shell + panel section)`
- `src/components/TextField/TextField.tsx`
- `src/components/Switch/Switch.tsx`
- `src/components/Button/Button.tsx`
- `src/components/Logo/Logo.tsx`

## Steps
1. Add settings as panels in `tpl-main`
2. Keep the Save button in the header
3. Group related toggles in one panel
4. Run the `verify-template` skill.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
