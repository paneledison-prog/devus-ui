# AI workspace demo: Context

> Living document for the **AI workspace demo** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A working AI-assistant app with its own light/dark theme: chat, agent mode, apps marketplace, artifacts, plans and mobile pairing.

Brand: Orbit (fictional). Open it full window at `/?template=ai-workspace-demo`.

## Real files
- `src/components/Workspace/Workspace.tsx`
- `src/components/Workspace/Workspace.css`
- `src/components/Switch/Switch.tsx`
- `src/components/Switch/Switch.css`
- `src/styles/tokens.css`

Public API: `WorkspaceDemo({ defaultTheme?: "light" | "dark" })`.

## What it does
- Chat / Agent mode tabs and sidebar navigation
- Search box (Ctrl+K inside the app) that jumps to pages, projects, chats and apps
- Connect-your-apps dialog
- New chat composer with simulated replies and a model menu with usage bars
- Projects, Artifacts (New artifact adds a card), Apps marketplace (search, connect, disconnect)
- Plans (toasts), Active runs, Plugins (trigger and skill switches), Mobile pairing
- State persists while the preview dialog is closed (the dialog keeps content mounted)

## Known gaps
- Replies are simulated
- App tiles use generic icons, not real brand logos

## How it is wired into the library
- The library entry is `AI workspace demo` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
