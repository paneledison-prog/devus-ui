# Voice rooms flow: Context

> Living document for the **Voice rooms flow** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A live audio and video rooms app as one flow of eight screens: Home (feed, cards, Universe/Room switch), Live room, Participants, Chat, a Teaser sheet, Your Universe, the Creator Card and Your voice stats.

Brand: none (text and art taken from the reference images). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/VoiceRoomsFlow.tsx  (the example shown in the preview)`
- `src/components/AppUI/Voice.tsx`
- `src/components/AppUI/Voice.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `Voice.tsx` exports; `PhoneFrame({ bare, height })`.

## What it does
- Flow: Home: tapping a LIVE row or the MUSIC card opens the Live room; the Behind the Scenes card or the "Tomorrow" row opens the Teaser; the Universe switch opens Your Universe; the VISA chip opens the Creator Card; the 219 ring opens Your voice; the message count opens Chat
- Flow: Live room: camera and mic toggle, the people or hand pill opens Participants, the chat pill opens Chat, the white arrow leaves to Home
- Flow: Participants: mic and hand toggle, the people pill returns to the Live room, the chat pill opens Chat
- Flow: Chat: send a message (appears as a lime bubble), react to a message, the chevron returns to the Live room
- Flow: Sheets (Teaser, Universe, Creator Card, Your voice): the grab handle returns to Home; Universe options select; the payouts switch toggles; "Sell some voices" opens the Creator Card

## Known gaps
- The portraits are Stitch look-alikes (same kind of subject, not the exact photos); a few are small crops of Stitch design screenshots
- Several small details (reward line, tabs) are read from a small poster and approximated
- No audio or video; room states are visual
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Voice rooms flow` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 32 light probes and 32 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=voice-rooms-flow&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
