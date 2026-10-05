# Build agent demo: Context

> Living document for the **Build agent demo** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A desktop-style coding-agent workspace for building and testing mobile apps, with a live phone simulator and annotation mode.

Brand: ChirpApp (fictional). Open it full window at `/?template=build-agent-demo`.

## Real files
- `src/components/BuildAgent/BuildAgent.tsx`
- `src/components/BuildAgent/BuildAgent.css`
- `src/components/Agents/shared.tsx`
- `src/components/Agents/Agents.css`
- `src/styles/tokens.css`

Public API: `BuildAgentDemo({ startAt?: "home" | "thread", defaultTheme? })`.

## What it does
- New-thread screen: composer, plugin chip, approval-mode and model dropdowns, dictation button, project/where/branch pickers, idea chips
- Thread with a live Working-for-Ns divider, streamed messages and step lines, permission request (Allow/Deny) and a Stop button
- Environment card: changes counter, branch, Commit or push dialog, tasks, browser
- Live iPhone simulator pane: favorites, overflow and share menus, rotate, reload, dark
- Annotation mode: click an element, type feedback, send; the fix visibly changes the phone, with Undo and a diff Review dialog

## Known gaps
- All run logic is a timed script
- Fictional app ChirpApp and fictional file names; no real product names

## How it is wired into the library
- The library entry is `Build agent demo` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 23 light probes and 23 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=build-agent-demo&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
