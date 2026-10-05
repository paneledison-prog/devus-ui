# AI platform demo: Context

> Living document for the **AI platform demo** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A secure AI platform: chat, assistants, knowledge, integrations and a developer console in one app.

Brand: Harbor (fictional). Open it full window at `/?template=ai-platform-demo`.

## Real files
- `src/components/Agents/Harbor.tsx`
- `src/components/Agents/Harbor.css`
- `src/components/Agents/shared.tsx`
- `src/components/Agents/Agents.css`
- `src/styles/tokens.css`

Public API: `HarborDemo({ startAt?: View, defaultTheme? })`.

## What it does
- Chat with suggestion chips, typing indicator and keyword-matched replies
- Model picker with hover tooltips
- Assistants and Knowledge toggles
- Integrations connect/disconnect
- Console with API keys (spend bars, revoke) and a three-step create-key wizard
- Getting started popover that reacts to user actions

## Known gaps
- Replies are keyword-matched, not real
- Built from a description card

## How it is wired into the library
- The library entry is `AI platform demo` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
