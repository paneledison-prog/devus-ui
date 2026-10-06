# Bookshelf flow: Context

> Living document for the **Bookshelf flow** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A book app: Explore (search, recent searches, Trending, categories) and Library (My Bookmarks with filter chips and shelves), connected by the tab bar.

Brand: none (text and art taken from the reference images). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/BookshelfFlow.tsx  (the example shown in the preview)`
- `src/components/AppUI/Books.tsx`
- `src/components/AppUI/Books.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `Books.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Flow: Tab bar: Explore and Library switch screens (Home, Store and Profile only press)
- Flow: Explore: typing filters Trending by title or author; recent chips are removable and Clear All removes them; books select; the filter button toggles
- Flow: Library: filter chips filter the shelves; the add and more buttons press
- Gesture: Pan - the trending books, the categories and the filter pills pan sideways (mouse drag, touch scroll, coasting)
- Gesture: Pull - pull Explore down at the top to refresh (the trending order rotates, a toast says Updated just now)
- Gesture: Long press - press and hold a trending book to save it to My Bookmarks (toast)
- Gesture: Swipe - swipe a shelf card sideways to remove it from the library; Undo brings it back
- Gesture: Typing - the search field filters Trending as you type

## Known gaps
- Covers are original artwork, so they do not reproduce the real book covers
- Home, Store and Profile have no screens in the image
- Chip-to-shelf tags are chosen
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Bookshelf flow` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 58 light probes and 58 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=bookshelf-flow&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
