---
name: edit-music-profile-banners
description: Use when changing, extending or fixing the Music profile banners template of Devus UI.
---

# Edit the Music profile banners template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
- `src/components/AppUI/examples/MusicProfileBanners.tsx  (the example shown in the preview)`
- `src/components/AppUI/Music.tsx`
- `src/components/AppUI/Music.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Steps
1. Change the layout through the coordinates in `Music.css`
2. Regenerate an image with the Stitch skill if it does not match the reference
3. Keep every control a real button with a pressed and focus state
4. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
5. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
