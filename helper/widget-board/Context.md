# Widget board: Context

> Living document for the **Widget board** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A board of twelve live widgets in a scrolling phone page: weather, meeting, timer, AI photo, social profile, contact, drone battery, flight dot-matrix board, balance card, USDC, music player and lamp.

Brand: none (text and art taken from the reference image). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/WidgetBoard.tsx  (the example shown in the preview)`
- `src/components/AppUI/WidgetBoard.tsx`
- `src/components/AppUI/WidgetBoard.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `WidgetBoard`; `PhoneFrame({ bare, height })`.

## What it does
- Interactive: Weather: tapping toggles degrees Celsius and Fahrenheit
- Interactive: Meeting: the date chip toggles "Added to calendar"
- Interactive: Timer: play/pause runs the clock; tapping the time resets it
- Interactive: AI photo: the pencil toggles editing; the chip toggles "accepted"
- Interactive: Profile: the heart, comment and share pills toggle and count up
- Interactive: Contact: call, message and video buttons show their action under the name
- Interactive: Drone: the battery bar charges up; the dots button pauses it
- Interactive: Flight: tapping switches the time between 24-hour and 12-hour on the dot-matrix board
- Interactive: Balance: the pill switches between the card and a small chart; the dots select a card
- Interactive: USDC: Send lowers the balance by 25 and the change; Swap toggles USDC/USD
- Interactive: Music: play/pause runs the progress bar and time
- Interactive: Lamp: the two buttons turn the light off and on (glow and dimming)

## Known gaps
- Pictures are Stitch look-alikes, not the exact photos
- The reference is a 3x4 grid; here the tiles are one scrolling column so each stays readable at phone width
- Mastercard and music-service marks are drawn as generic shapes, not the real logos
- The second view of the Balance widget (chart) and the 12-hour flight time are added to give the controls something to do
- Mobile touch cursor tested in the large preview

## How it is wired into the library
- The library entry is `Widget board` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 57 light probes and 57 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=widget-board&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
