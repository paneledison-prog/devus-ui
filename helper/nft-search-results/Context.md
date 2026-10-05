# NFT search results: Context

> Living document for the **NFT search results** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A dark glass search-results screen for NFT collections: a search field, Results heading, collection avatars, a Top-Seller list as two stacked cards (one tilted in front with a large ape), and a tab bar.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/NftSearchResults.tsx  (the example shown in the preview)`
- `src/components/AppUI/Nft.tsx`
- `src/components/AppUI/Nft.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `Nft.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Interactive: The search field is a real input
- Interactive: Collections select (gold ring)
- Interactive: Tapping a card swaps front and back with a tilt animation
- Interactive: The tab bar is live: the purple square moves to the tapped tab
- Image assets generated with the Stitch MCP using the review loop in `.claude/skills/stitch-image-assets/SKILL.md`

## Known gaps
- The ape pictures are Stitch look-alikes, not the exact NFTs
- The back card title is cut off in the image; "Apes" is a guess for the part that is hidden
- Search does not filter anything
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `NFT search results` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 32 light probes and 32 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=nft-search-results&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
