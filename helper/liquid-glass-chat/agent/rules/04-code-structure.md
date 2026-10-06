# Rule 04: Code structure

## Files
- `src/components/AppUI/examples/LiquidChat.tsx  (the example shown in the preview)`
- `src/components/LiquidChat/LiquidChat.tsx`
- `src/components/LiquidChat/LiquidChat.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

## Conventions
- Entry component: `src/components/AppUI/examples/LiquidChat.tsx`. Public API: `LiquidChatDemo({ startAt?: "inbox" | "chat", defaultTheme?, embedded? })` (App uses `embedded`).
- CSS class prefix: `lq-`. Root selector: `.app-phone`. Do not use unprefixed class names.
- Plain CSS next to the component. No Tailwind, no CSS-in-JS, no new runtime dependency.
- TypeScript strict: no `any`, no non-null assertions on user data. `npm run typecheck` must pass.
- Function components and hooks only. Derived values are computed, not stored.
- Timers, intervals, observers and listeners are created in effects and cleaned up on unmount.
- Keep files focused. If a file grows past a clear boundary, split by feature inside the same folder.
- Comments explain why, not what. Keep the existing density.
