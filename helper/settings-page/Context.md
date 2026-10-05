# Settings page: Context

> Living document for the **Settings page** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Settings screen on a fixed 720x440 canvas: sidebar navigation, a profile form and preference toggles, with a primary save action.

Brand: Acme (placeholder). Open it full window at `/?template=settings-page`.

## Real files
- `src/pages/Library/templates.tsx  (function SettingsTemplate)`
- `src/pages/Library/templates.css  (shell + panel section)`
- `src/components/TextField/TextField.tsx`
- `src/components/Switch/Switch.tsx`
- `src/components/Button/Button.tsx`
- `src/components/Logo/Logo.tsx`

Public API: none (static layout).

## What it does
- Sidebar: Profile, Notifications, Security, Billing
- Profile panel: display name and email fields
- Preferences panel: two Switch toggles
- Small primary Save changes button in the header

## Known gaps
- Save is not wired
- Only the Profile page exists

## How it is wired into the library
- The library entry is `Settings page` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
