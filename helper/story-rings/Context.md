# Story rings: Context

> Living document for the **Story rings** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Horizontally scrolling row of avatars with a gradient ring for unseen stories and a muted ring once seen.

Brand: none (generic sample content). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/StoryRings.tsx  (the example shown in the preview)`
- `src/components/AppUI/StoryRing.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `StoryRow({ stories })` (`Story = { name, initials, seen? }`).

## What it does
- Gradient ring is 4px with a 2px gap around the avatar
- Seen stories use a muted gray ring
- Each button names whether the story is new

## Known gaps
- Presentational only: no navigation or persistence

## How it is wired into the library
- The library entry is `Story rings` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
