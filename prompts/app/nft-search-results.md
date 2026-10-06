# NFT search results

Build a React + TypeScript `<NftSearchResultsExample>` screen for Devus UI, shown in a 320x697 phone frame (`PhoneFrame bare height={697}`), from the reference image. Only the screen is built, not the phone bezel. The screen is interactive (see below), but it must not add elements that are not needed for those interactions.

## Purpose

A dark glass search-results screen for NFT collections: a search field, Results heading, collection avatars, a Top-Seller list as two stacked cards (one tilted in front with a large ape), and a tab bar.

## Layout

Canvas: 517x1126, scaled to the phone width. Coordinates are canvas pixels.

- Dark background with a blurred warm orange glow behind the middle and soft blue at the sides; Dynamic Island 160x47 at (175, 14).
- Search field: 466x103 at (26, 109), 44px corners, translucent, text "Solana Monkeys" 24px, search icon at the right.
- Heading "Results" 35px/600 at (26, 233); "Collections" with a count badge 8 at y 281; four 86px avatar circles at x 26, 126, 226 (the second has a gold ring) and a translucent circle with a chevron at x 327, y 342.
- "Top - Seller NFT" with a count badge 12 at y 491. Back card 346x380 at (26, 563): "5 SOL", "Floor price", an Ethereum button, a large title and "Apiens". Front card tilted -8 degrees at (132, 625): "12 SOL", "Floor price", Ethereum button, "Hawaii" 56px/600, "Chill Monkeys", a white round chevron button and a large ape overlapping the card edge. Both cards are cut off by the tab bar.
- Tab bar: 466x93 pill at (26, 988): add friend, chat, home (active, purple rounded square), stats, inbox with a red badge 5. Home indicator white.

## Interaction

- The search field is a real input
- Collections select (gold ring)
- Tapping a card swaps front and back with a tilt animation
- The tab bar is live: the purple square moves to the tapped tab
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state, and a visible focus ring. Animations respect `prefers-reduced-motion`.

## Assets

Three ape avatars and a large ape cut out with a white-free edge, generated with the Stitch MCP, in `src/components/AppUI/assets/nft/`. Do not hotlink images or use stock photos. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Pan:** pan the collections row sideways (eight collections, the chevron scrolls it).
- **Flick:** flick or swipe a card to throw it to the front or the back.
- **Typing:** the search field is a real input.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/NftSearchResults.tsx` (the example)
- `src/components/AppUI/Nft.tsx`
- `src/components/AppUI/Nft.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`nf-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
