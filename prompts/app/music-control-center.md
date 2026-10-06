# Music control center

Build a React + TypeScript `<MusicControlCenterExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Only the screen is built, not the phone bezel. The screen is interactive (see below), but it must not add elements that are not needed for those interactions.

## Purpose

The third variant of the music profile page: a "Новый центр управления" row, a profile tile with controls, counts, notifications, bonus and СберПрайм tiles, the noodle banner, listening hours, a "Начинающий меломан" progress card, settings, kids mode and cache.

## Layout

Canvas: 390 wide, scrolling, scaled to the phone width. Coordinates are canvas pixels.

- News row with a colorful icon, "Новый центр управления / Пользоваться Звуком стало еще удобнее" and a chevron.
- Grid: "Елена С. +7 (999) 999-99-99 ›" tile and a 2x2 control tile; count tiles "1 946 +5 Подписчики" and "146 Плейлисты".
- Notifications card; tiles "919 Баланс бонусов" and "СберПрайм Подключить"; the banner; listening hours; a "Начинающий меломан" card with a holographic disc and "Слушать"; "(6)Показать все"; "Настройки" with "Детский режим" and "Занято кэша 780 MB" and an "Очистить кэш" button.

## Interaction

- The page scrolls
- Kids mode toggles
- "Очистить кэш" clears the cache (780 MB to 0 MB) after a short wait
- Controls select, notification rows select
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state, and a visible focus ring. Animations respect `prefers-reduced-motion`.

## Assets

Banner picture, avatars, album cover and a holographic disc generated with the Stitch MCP, in `src/components/AppUI/assets/music/`. Do not hotlink images or use stock photos. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Scroll:** the page scrolls.
- **Pan:** a mouse can drag the page to scroll it.
- **Pull:** pull down at the top to refresh (spinner, toast Обновлено).
- **Swipe:** swipe a notification row sideways to dismiss it; Вернуть restores them.
- **Scrub:** drag along the listening bars to see the hours at that point.
- **Slide:** slide the Детский режим switch.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/MusicControlCenter.tsx` (the example)
- `src/components/AppUI/Music.tsx`
- `src/components/AppUI/Music.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`ms-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
