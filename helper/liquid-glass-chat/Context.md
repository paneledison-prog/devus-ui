# Liquid glass chat: Context

> Living document for the **Liquid glass chat** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
An iOS-style messaging demo in the Liquid Glass look, shown inside a scaled 390x844 phone with its own light/dark theme.

Brand: fictional names and messages. Open it full window at `/?template=liquid-glass-chat`.

## Real files
- `src/components/LiquidChat/LiquidChat.tsx`
- `src/components/LiquidChat/LiquidChat.css`
- `src/styles/tokens.css`

Public API: `LiquidChatDemo({ startAt?: "inbox" | "chat", defaultTheme? })`.

## What it does
- Messages inbox, "Your circle" ribbon (tap or drag vertically), compose sheet, live search, All / Unread / Groups
- Chat with glass header buttons, bubbles, photo bubble with caption chip and tap-to-zoom viewer
- Double-click hearts, glass composer and send button, enter animation, typing dots and a simulated reply
- More menu (mute, share photo, clear chat) and attach menu

## Known gaps
- Lens rim uses SVG feTurbulence + feDisplacementMap via backdrop-filter (Chromium only; others get a plain rim)
- No story rail, voice or video

## How it is wired into the library
- The library entry is `Liquid glass chat` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 27 light probes and 27 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=liquid-glass-chat&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
