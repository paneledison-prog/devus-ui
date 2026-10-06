# Music profile banners

Build a React + TypeScript `<MusicProfileBannersExample>` screen for Devus UI, shown in a 320x692 phone frame (`PhoneFrame bare height={692}`), from the reference image. Only the screen is built, not the phone bezel. The screen is interactive (see below), but it must not add elements that are not needed for those interactions.

## Purpose

The fourth variant of the music profile page: one profile card with three counts, two green promo banners (sneakers, armchair), listening hours, "Новое сегодня", a glowing "Настоящий фанат" achievement and cache settings.

## Layout

Canvas: 390 wide, scrolling, scaled to the phone width. Coordinates are canvas pixels.

- Profile card: avatar, "Елена Сахарова / Ценитель джаза", a share button, three counts "Подписки 1 946 +5", "Плейлисты 146", "Треки 1 184" and an invite line "+50 за каждого приглашенного друга".
- Two green banners: "Чёрная пятница в Мегамаркете! Скидки до 50%" with sneakers and "СберПрайм+ активен до 23 сен. 2023" with an armchair.
- Listening hours card; "Новое сегодня" notifications; "Достижения 12/54" with a glowing "Настоящий фанат" card; "Настройки" with "Ограничение кэша 1 GB · 20-30 треков" plus a note, "Занято кэша 780 MB" and "Очистить кэш".

## Interaction

- The page scrolls
- "Очистить кэш" clears the cache
- Notification rows select and the pause button toggles
- Tiles press
- Every control is a real `<button>` (or input) with a label or `aria-label`, a pressed state, and a visible focus ring. Animations respect `prefers-reduced-motion`.

## Assets

Promo pictures (sneakers, armchair), avatars, a glowing ring and the album cover generated with the Stitch MCP, in `src/components/AppUI/assets/music/`. Do not hotlink images or use stock photos. Prompts and the review loop are in `.claude/skills/stitch-image-assets/SKILL.md`.

## Gestures

Pointer events (`src/components/AppUI/gestures.tsx`), so mouse, pen and touch all work; every gesture has a keyboard or tap alternative, respects `prefers-reduced-motion`, and nothing can leave the phone.

- **Scroll:** the page scrolls.
- **Pan:** a mouse can drag the page to scroll it.
- **Pull:** pull down at the top to refresh.
- **Swipe:** swipe a notification row sideways to dismiss it.
- **Scrub:** drag along the listening bars.

## Reference implementation (real files)

- `src/components/AppUI/gestures.tsx` (the gesture hooks)
- `src/components/AppUI/examples/MusicProfileBanners.tsx` (the example)
- `src/components/AppUI/Music.tsx`
- `src/components/AppUI/Music.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure and class names (`ms-` prefix).

## Implementation rules

- Plain CSS, no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs).
