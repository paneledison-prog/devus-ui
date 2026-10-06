# Music control center: Context

> Living document for the **Music control center** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
The third variant of the music profile page: a "Новый центр управления" row, a profile tile with controls, counts, notifications, bonus and СберПрайм tiles, the noodle banner, listening hours, a "Начинающий меломан" progress card, settings, kids mode and cache.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/MusicControlCenter.tsx  (the example shown in the preview)`
- `src/components/AppUI/Music.tsx`
- `src/components/AppUI/Music.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `Music.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Interactive: The page scrolls
- Interactive: Kids mode toggles
- Interactive: "Очистить кэш" clears the cache (780 MB to 0 MB) after a short wait
- Interactive: Controls select, notification rows select
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`
- Gesture: Scroll - the page scrolls
- Gesture: Pan - a mouse can drag the page to scroll it
- Gesture: Pull - pull down at the top to refresh (spinner, toast Обновлено)
- Gesture: Swipe - swipe a notification row sideways to dismiss it; Вернуть restores them
- Gesture: Scrub - drag along the listening bars to see the hours at that point
- Gesture: Slide - slide the Детский режим switch

## Known gaps
- Pictures are Stitch look-alikes
- Russian strings are transcribed from a small image
- Spacing is tuned by eye
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Music control center` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 49 light probes and 49 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=music-control-center&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
