# Widget board

Build a React + TypeScript `<WidgetBoardExample>` for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image of twelve widgets. Every widget is live.

## Purpose

A board of twelve small live widgets (weather, calendar, timer, AI photo suggestion, social profile, contact, drone battery, flight board, balance card, USDC balance, music player, lamp).

## Layout

- A dark page (`#0f1319`) with twelve 286x286 tiles (46px corners) in a scrolling column, 16px gaps; the phone shows about two tiles at a time.
- Row 1 of the reference: weather text, meeting card with a street photo, orange timer with a black lucky-cat figure.
- Row 2: blurred AI-suggested photo, pink profile with pills, contact card with call, message and video buttons.
- Row 3: drone battery, dot-matrix flight board (TOKYO / 15 JAN / 13:30 in lime and white dots), green balance card.
- Row 4: lilac USDC balance with Send and Swap, music player with stacked cover cards and a player pill, a pink lamp with a light switch.

## Interaction

- Weather: tapping toggles degrees Celsius and Fahrenheit
- Meeting: the date chip toggles "Added to calendar"
- Timer: play/pause runs the clock; tapping the time resets it
- AI photo: the pencil toggles editing; the chip toggles "accepted"
- Profile: the heart, comment and share pills toggle and count up
- Contact: call, message and video buttons show their action under the name
- Drone: the battery bar charges up; the dots button pauses it
- Flight: tapping switches the time between 24-hour and 12-hour on the dot-matrix board
- Balance: the pill switches between the card and a small chart; the dots select a card
- USDC: Send lowers the balance by 25 and the change; Swap toggles USDC/USD
- Music: play/pause runs the progress bar and time
- Lamp: the two buttons turn the light off and on (glow and dimming)
- Every control is a real `<button>` with a label or `aria-label`, a pressed state and a visible focus ring. The bench (`?bench=1`) freezes clocks. Animations respect `prefers-reduced-motion`.

## Assets

Eight pictures generated with the Stitch MCP (a man in a cap, a Tokyo street at night, a black lucky-cat figure cut out from a gray background, a motion-blurred couple, a portrait, an orange classic car, a night street, a pastel table lamp cut out from a gray background), stored in `src/components/AppUI/assets/widgets/`. Icons, the dot-matrix board and the card art are drawn in SVG/CSS. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Reference implementation (real files)

- `src/components/AppUI/examples/WidgetBoard.tsx` (the example)
- `src/components/AppUI/WidgetBoard.tsx`
- `src/components/AppUI/WidgetBoard.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`wd-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
