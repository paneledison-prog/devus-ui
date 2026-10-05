# Music profile tiles

Build a React + TypeScript `<MusicProfileTilesExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Only the screen is built, not the phone bezel. The screen is interactive (see below), but it must not add elements that are not needed for those interactions.

## Purpose

The long tile variant of the music profile page: a "Вечер с лапшой" banner, profile and СберПрайм tiles, count tiles, notifications, a listening-hours card, a 12-slot achievements grid, settings controls and a kids-mode switch.

## Layout

Canvas: 390 wide, scrolling, scaled to the phone width. Coordinates are canvas pixels.

- Banner card with a green-tinted gradient and a 3D shopping-cart picture at the right.
- Two-column grid: profile tile ("Елена Сахарова / Ценитель джаза"), an ID tile with "653" and a green "СберПрайм до 23 сен. 2023" tile; count tiles "1 946 +5 Подписчики", "146 Плейлисты"; an invite tile with "Пригласить" and "1 184 Треки".
- Notifications card as on the compact page; a listening card "234 часа / За последний месяц" with a bar graph and the favorite artist "SLAVA MARLOW".
- "Достижения 12/54" with a 4x3 grid of 3D shapes with small progress bars; "Настройки" with a "Написать в поддержку" tile and a 2x2 control grid (HiFi, loop, moon, sun); a "Детский режим" row with a switch.

## Interaction

- The page scrolls
- The kids-mode switch toggles
- Controls (HiFi, loop, moon, sun) behave as a one-of-four selector
- Achievements select
- Notification rows select and the pause button toggles
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state, and a visible focus ring. Animations respect `prefers-reduced-motion`.

## Assets

Banner picture, avatars, album cover and six 3D achievement shapes generated with the Stitch MCP (shapes cut out), in `src/components/AppUI/assets/music/`. Do not hotlink images or use stock photos. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Reference implementation (real files)

- `src/components/AppUI/examples/MusicProfileTiles.tsx` (the example)
- `src/components/AppUI/Music.tsx`
- `src/components/AppUI/Music.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`ms-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
