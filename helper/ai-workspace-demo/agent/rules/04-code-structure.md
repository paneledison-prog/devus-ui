# Rule 04: Code structure

## Files
- `src/components/Workspace/Workspace.tsx`
- `src/components/Workspace/Workspace.css`
- `src/components/Switch/Switch.tsx`
- `src/components/Switch/Switch.css`
- `src/styles/tokens.css`

## Conventions
- Entry component: `src/components/Workspace/Workspace.tsx`. Public API: `WorkspaceDemo({ defaultTheme?: "light" | "dark" })`.
- CSS class prefix: `ws-`. Root selector: `.ws-frame`. Do not use unprefixed class names.
- Plain CSS next to the component. No Tailwind, no CSS-in-JS, no new runtime dependency.
- TypeScript strict: no `any`, no non-null assertions on user data. `npm run typecheck` must pass.
- Function components and hooks only. Derived values are computed, not stored.
- Timers, intervals, observers and listeners are created in effects and cleaned up on unmount.
- Keep files focused. If a file grows past a clear boundary, split by feature inside the same folder.
- Comments explain why, not what. Keep the existing density.
