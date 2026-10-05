# Rule 04: Code structure

## Files
- `src/pages/Library/templates.tsx  (function LandingTemplate)`
- `src/pages/Library/templates.css  (Landing section)`
- `src/components/Button/Button.tsx`
- `src/components/Badge/Badge.tsx`
- `src/components/Logo/Logo.tsx`

## Conventions
- Entry component: `src/pages/Library/templates.tsx`. Public API: none (static layout).
- CSS class prefix: `tpl-`. Root selector: `.tpl`. Do not use unprefixed class names.
- Plain CSS next to the component. No Tailwind, no CSS-in-JS, no new runtime dependency.
- TypeScript strict: no `any`, no non-null assertions on user data. `npm run typecheck` must pass.
- Function components and hooks only. Derived values are computed, not stored.
- Timers, intervals, observers and listeners are created in effects and cleaned up on unmount.
- Keep files focused. If a file grows past a clear boundary, split by feature inside the same folder.
- Comments explain why, not what. Keep the existing density.
