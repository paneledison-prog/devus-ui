# Book onboarding flow: Context

> Living document for the **Book onboarding flow** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A three-step onboarding flow for a book summaries app: a Learn Smarter intro over a wall of covers, a topic picker with a progress bar, and a book-by-book "Are you interested?" step.

Brand: none (text and art taken from the reference images). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/BookOnboardingFlow.tsx  (the example shown in the preview)`
- `src/components/AppUI/Books.tsx`
- `src/components/AppUI/Books.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `Books.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Flow: Intro: the pager dots select; Continue opens Topics
- Flow: Topics: chips toggle (at least one is needed to continue); Continue opens the book step
- Flow: Book step: Yes or No moves to the next of three books and fills the progress bar; after the last book the flow returns to the intro

## Known gaps
- Covers are original artwork, not the real covers
- The returning loop and the progress fill are inferred from the three screens
- Pager dots do not change the intro art
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Book onboarding flow` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 7 light probes and 7 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=book-onboarding-flow&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
