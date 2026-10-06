# Bookshelf flow

Build a React + TypeScript `<BookshelfFlowExample>` for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference images. This is a real flow: every screen shown in the references exists, and the controls move between them and change state. Only screens are built, not phone bezels.

## Purpose

A book app: Explore (search, recent searches, Trending, categories) and Library (My Bookmarks with filter chips and shelves), connected by the tab bar.

## Layout

Canvas: 390x843, scaled to the phone width. Coordinates are canvas pixels.

- White screens, 16px margins, 48px round controls, 14px type, black active states.
- Explore: search field with a filter button, "Recent Search" with removable chips and Clear All, "Trending This Weeks" with three-and-a-half book cards, "Explore by Categories" box.
- Library: "My Bookmarks" with a more button, filter chips (All, Recent, Pinned, To Read, In Progress), "Recently Saved" shelves ("Mindset & Money", "Design & Craft") with fanned covers, reader and book-count chips, and a black round add button.
- Bottom tab bar: Home, Explore, Store, Library, Profile (Explore and Library are live).

## Flow

- Tab bar: Explore and Library switch screens (Home, Store and Profile only press)
- Explore: typing filters Trending by title or author; recent chips are removable and Clear All removes them; books select; the filter button toggles
- Library: filter chips filter the shelves; the add and more buttons press
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state and a visible focus ring. Screen changes animate and respect `prefers-reduced-motion`.

## Assets

No image assets: the covers are original CSS and SVG artwork that use real titles and authors as text only. 

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Pan:** the trending books, the categories and the filter pills pan sideways (mouse drag, touch scroll, coasting).
- **Pull:** pull Explore down at the top to refresh (the trending order rotates, a toast says Updated just now).
- **Long press:** press and hold a trending book to save it to My Bookmarks (toast).
- **Swipe:** swipe a shelf card sideways to remove it from the library; Undo brings it back.
- **Typing:** the search field filters Trending as you type.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/BookshelfFlow.tsx` (the example)
- `src/components/AppUI/Books.tsx`
- `src/components/AppUI/Books.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`bk-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
