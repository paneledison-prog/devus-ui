# CRM workspace demo: Context

> Living document for the **CRM workspace demo** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A working CRM app with its own light/dark theme: sign-up, company setup, companies table, inbox, Coworker, compose email.

Brand: Meridian-style (fictional). Open it full window at `/?template=crm-workspace-demo`.

## Real files
- `src/components/Crm/Crm.tsx`
- `src/components/Crm/Crm.css`
- `src/styles/tokens.css`

Public API: `CrmDemo({ startAt?: "signup" | "app", defaultTheme? })`.

## What it does
- Sign-up with validation and an animated company-setup checklist (respects reduced motion)
- Quick Actions command box (compose, new company, theme, open pages)
- Getting Started checklist popover with progress ring and Finish All
- Companies table: view/category select, sort by revenue, search, column settings, row select, New Company dialog, totals footer
- Inbox with 8 conversations, activity timeline, simulated reply, status control and a Coworker side panel
- Compose email dialog with recipient chips and an @ variable picker

## Known gaps
- Column-settings menu closes with Esc or its button, not on outside click
- Agents, Schedule, Customers, Escalations, Report and Apps pages are placeholders

## How it is wired into the library
- The library entry is `CRM workspace demo` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 50 light probes and 50 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=crm-workspace-demo&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
