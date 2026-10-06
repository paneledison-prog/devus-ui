# Voice rooms flow

Build a React + TypeScript `<VoiceRoomsFlowExample>` for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference images. This is a real flow: every screen shown in the references exists, and the controls move between them and change state. Only screens are built, not phone bezels.

## Purpose

A live audio and video rooms app as one flow of eight screens: Home (feed, cards, Universe/Room switch), Live room, Participants, Chat, a Teaser sheet, Your Universe, the Creator Card and Your voice stats.

## Layout

Canvas: 390x843, scaled to the phone width. Coordinates are canvas pixels.

- Dark app with 22px-radius media cards, lime (`#e2ff1f`) and orange (`#ff5a1f` LIVE) accents, a 54px segmented Universe | Room switch at the bottom of Home.
- Home: status row (messages, VISA chip, avatar, 219 ring), two cards (MUSIC, Behind the Scenes), a feed of four rows (two LIVE), the switch.
- Live room: full-bleed photo, picture-in-picture, "LIVE Michael" label, five round controls (flip, camera, mic, invite, leave) and three pills (people, chat, hand).
- Participants: reward line, two video tiles, a 3x2 avatar grid, controls and pills. Chat: blurred photo, translucent panel with tabs, bubbles, attachments and an input.
- Teaser: grayscale portrait, title "Inside: Cliff Notez", schedule row, description with a chevron, a "Sold out" button. Universe: "Your Universe", copy, four option buttons (Free, Paid, NFT, Other).
- Creator Card: gradient card with $812.17, an Instant payouts switch, payout totals, "Add to Apple Wallet" and "Withdraw & Settings". Your voice: a 1.6K gauge, copy, rate and a "Sell some voices" button.

## Flow

- Home: tapping a LIVE row or the MUSIC card opens the Live room; the Behind the Scenes card or the "Tomorrow" row opens the Teaser; the Universe switch opens Your Universe; the VISA chip opens the Creator Card; the 219 ring opens Your voice; the message count opens Chat
- Live room: camera and mic toggle, the people or hand pill opens Participants, the chat pill opens Chat, the white arrow leaves to Home
- Participants: mic and hand toggle, the people pill returns to the Live room, the chat pill opens Chat
- Chat: send a message (appears as a lime bubble), react to a message, the chevron returns to the Live room
- Sheets (Teaser, Universe, Creator Card, Your voice): the grab handle returns to Home; Universe options select; the payouts switch toggles; "Sell some voices" opens the Creator Card
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state and a visible focus ring. Screen changes animate and respect `prefers-reduced-motion`.

## Assets

Fifteen pictures generated with the Stitch MCP (a concert-stage photo, portraits and small avatars, a cartoon dog), stored in `src/components/AppUI/assets/voice/`. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Swipe:** swipe any screen down to go back; swipe Home left for the Universe; swipe a feed row sideways to hide it.
- **Pull:** pull Home down to refresh (spinner, the viewer counts grow).
- **Hold:** press and hold the hand in a room for 0.7 s to raise it (toast).
- **Long press:** press and hold a chat message to react with a thumbs up.
- **Typing:** the chat input sends messages.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/VoiceRoomsFlow.tsx` (the example)
- `src/components/AppUI/Voice.tsx`
- `src/components/AppUI/Voice.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`vc-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
