# Rule 04: Code structure

## Files
- `src/components/AppUI/examples/TrackingSteps.tsx  (the example shown in the preview)`
- `src/components/AppUI/Cards.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

## Conventions
- Entry component: `src/components/AppUI/examples/TrackingSteps.tsx`. Public API: `TrackSteps({ steps })` (`TrackStep = { label, time, state }`).
- CSS class prefix: `app-`. Root selector: `.app-phone`. Do not use unprefixed class names.
- Plain CSS next to the component. No Tailwind, no CSS-in-JS, no new runtime dependency.
- TypeScript strict: no `any`, no non-null assertions on user data. `npm run typecheck` must pass.
- Function components and hooks only. Derived values are computed, not stored.
- Timers, intervals, observers and listeners are created in effects and cleaned up on unmount.
- Keep files focused. If a file grows past a clear boundary, split by feature inside the same folder.
- Comments explain why, not what. Keep the existing density.
