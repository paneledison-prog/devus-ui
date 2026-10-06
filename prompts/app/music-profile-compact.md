# Music profile compact

Build a React + TypeScript `<MusicProfileCompactExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Only the screen is built, not the phone bezel. The screen is interactive (see below), but it must not add elements that are not needed for those interactions.

## Purpose

The compact variant of a dark music-app profile page (Russian UI): a profile card with counts, a bonus pill and "Добавить витрину" tile, a notifications list, a "last 7 days" avatar card and quick controls. Scrolls inside the phone.

## Layout

Canvas: 390 wide, scrolling, scaled to the phone width. Coordinates are canvas pixels.

- Near-black page (`#111112`), 14px side margins, cards `#232325` with 20px corners, 8px gaps. Grab handle under the status bar.
- Profile card: "Elena Saharova", "1,946 +5 Подписчиков", "146 Плейлистов" and an avatar pair; at the right a green-to-blue pill "653" and an add tile "Добавить витрину".
- "Уведомления 8" heading, then a card with three rows: a brown release row ("ПОСЛЕДНИЙ ГЕРОЙ E / GSPD" with check and pause), a navy row ("Arca · Сингл 4 ч") and an olive row ("Dmitry K · Новый плейлист 5 ч").
- Card "За последние 7 дней / Слушали чаще других" with four 54px avatars; a "hifi" button and a wide blue-gray gear button; a row of four round controls.

## Interaction

- The page scrolls
- The pause button toggles play and pause
- Release rows select
- hifi toggles; one round control is on at a time
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state, and a visible focus ring. Animations respect `prefers-reduced-motion`.

## Assets

Album cover, artist and profile avatars generated with the Stitch MCP, in `src/components/AppUI/assets/music/`. Do not hotlink images or use stock photos. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Scroll:** the page scrolls.
- **Pan:** a mouse can drag the page to scroll it.
- **Pull:** pull down at the top to refresh.
- **Swipe:** swipe a notification row sideways to dismiss it.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/MusicProfileCompact.tsx` (the example)
- `src/components/AppUI/Music.tsx`
- `src/components/AppUI/Music.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`ms-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
