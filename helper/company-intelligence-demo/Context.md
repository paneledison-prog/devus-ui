# Company intelligence demo: Context

> Living document for the **Company intelligence demo** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A private-market research app: animated ASCII sky banner, company lists, command palette and a company detail page.

Brand: Beacon (fictional). Open it full window at `/?template=company-intelligence-demo`.

## Real files
- `src/components/Agents/Beacon.tsx`
- `src/components/Agents/Beacon.css`
- `src/components/Agents/shared.tsx`
- `src/components/Agents/Agents.css`
- `src/styles/tokens.css`

Public API: `BeaconDemo({ startAt?: "list" | "detail", defaultTheme? })`.

## What it does
- Animated ASCII-art sky banner (static under reduced motion)
- Featured / New this week / Watchlist tabs, filter, sortable funding column, growth bars, watch stars
- Command palette with Companies / People / Investors tabs, arrow keys and Enter (Ctrl/Cmd K once focus is inside the demo)
- Company page with funding chart, signals, people and investors
- Workspace menu with an appearance switch

## Known gaps
- Data is fictional and static
- Built from a description card, not from the original screens

## How it is wired into the library
- The library entry is `Company intelligence demo` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.
