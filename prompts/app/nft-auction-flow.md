# NFT auction flow

Build a React + TypeScript `<NftAuctionFlowExample>` for Devus UI, shown in a 320x688 phone frame (`PhoneFrame bare height={688}`), from the reference images. This is a real flow: every screen shown in the references exists, and the controls move between them and change state. Only screens are built, not phone bezels.

## Purpose

An NFT auction flow: Live Bids (two image cards) opens an item page with a countdown, tags, creator row, description, Bids / Offers and sticky Purchase / Place a bid actions; a bottom sheet places a bid.

## Layout

Canvas: 327x703, scaled to the phone width. Coordinates are canvas pixels.

- Dark `#151515` pages with glass cards, 16px glass back button, lime (`#e2f47c`) primary actions.
- Live Bids: title centered at y 106; two 296x296 cards (orange, blue) with a time chip, heart and send buttons and a glass panel with the item name, creator and current bid.
- Detail: full-bleed grayscale hero 448px, a glass auction card (countdown and current bid), "Shedd Aquarium", tags Art and Photography, creator row with Follow, views, description, Bids / Offers tabs and a bids list.
- Sticky bottom actions appear after scrolling: outlined "Purchase" and lime "Place a bid". The More button opens a Share / Report menu.

## Flow

- Live Bids: a card (or its send button) opens the item; the heart toggles
- Detail: the countdown runs; heart and Follow toggle; More opens Share / Report; Bids / Offers switch lists; scrolling reveals the sticky actions
- Place a bid: a sheet with a stepper (min above the current bid); Confirm adds your bid to the list and raises the current bid; Purchase shows a toast
- The back button returns to Live Bids
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state and a visible focus ring. Screen changes animate and respect `prefers-reduced-motion`.

## Assets

Five pictures generated with the Stitch MCP (a black-and-white dog character with a beanie and headphones, a black head sculpture with an orange splash, a turquoise sheep with heart sunglasses and a halo, an orb and an astronaut avatar), stored in `src/components/AppUI/assets/auction/`. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Reference implementation (real files)

- `src/components/AppUI/examples/NftAuctionFlow.tsx` (the example)
- `src/components/AppUI/Auction.tsx`
- `src/components/AppUI/Auction.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`au-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
