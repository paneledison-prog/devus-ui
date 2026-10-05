# Music profile banners: Context

> Living document for the **Music profile banners** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
The fourth variant of the music profile page: one profile card with three counts, two green promo banners (sneakers, armchair), listening hours, "Новое сегодня", a glowing "Настоящий фанат" achievement and cache settings.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/MusicProfileBanners.tsx  (the example shown in the preview)`
- `src/components/AppUI/Music.tsx`
- `src/components/AppUI/Music.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `Music.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Interactive: The page scrolls
- Interactive: "Очистить кэш" clears the cache
- Interactive: Notification rows select and the pause button toggles
- Interactive: Tiles press
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`

## Known gaps
- Pictures are Stitch look-alikes
- Russian strings are transcribed from a small image
- Spacing is tuned by eye
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Music profile banners` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 39 light probes and 39 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=music-profile-banners&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
