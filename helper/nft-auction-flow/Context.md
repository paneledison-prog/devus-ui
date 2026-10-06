# NFT auction flow: Context

> Living document for the **NFT auction flow** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
An NFT auction flow: Live Bids (two image cards) opens an item page with a countdown, tags, creator row, description, Bids / Offers and sticky Purchase / Place a bid actions; a bottom sheet places a bid.

Brand: none (text and art taken from the reference images). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/NftAuctionFlow.tsx  (the example shown in the preview)`
- `src/components/AppUI/Auction.tsx`
- `src/components/AppUI/Auction.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `Auction.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Flow: Live Bids: a card (or its send button) opens the item; the heart toggles
- Flow: Detail: the countdown runs; heart and Follow toggle; More opens Share / Report; Bids / Offers switch lists; scrolling reveals the sticky actions
- Flow: Place a bid: a sheet with a stepper (min above the current bid); Confirm adds your bid to the list and raises the current bid; Purchase shows a toast
- Flow: The back button returns to Live Bids
- Gesture: Swipe - swipe a live card right to like it, left to unlike it
- Gesture: Pull - pull Live Bids down to refresh (spinner, new current bid, toast)
- Gesture: Pinch - two fingers (or ctrl + wheel) zoom the item picture; it eases back when released
- Gesture: Scroll - the item page scrolls and the sticky actions appear
- Gesture: Slide - swipe the Place a bid sheet down to close it
- Gesture: Scrub - drag along the bar to set the bid amount (arrow keys step by 0.05 ETH)
- Gesture: Hold - press and hold Confirm for 0.8 s to place the bid; a tap only shows the hint
- Gesture: Long press - press and hold a bid row to copy its details (toast)

## Known gaps
- The artwork is Stitch-generated to match the references but is not the exact NFTs
- The bid sheet, toast and Offers empty state are not in the image; they were added so the flow works
- The bench freezes the countdown
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `NFT auction flow` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 20 light probes and 20 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=nft-auction-flow&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
