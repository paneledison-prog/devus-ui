# Finance dashboard: Context

> Living document for the **Finance dashboard** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Banking home screen: a blue gradient hero with greeting, total balance and quick actions, a savings suggestion card, a filterable bill list and a bottom tab bar.

Brand: none (fictional sample data). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/FinanceDashboard.tsx  (the example shown in the preview)`
- `src/components/AppUI/Finance.tsx`
- `src/components/AppUI/Finance.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`

Public API: `FinanceHeader`, `BalanceHero`, `QuickActions`, `NegotiatorCard`, `BillList`, `FinanceTabs`, `FinanceScroll` (all in Finance.tsx); `PhoneFrame({ hero? })`.

## What it does
- Eye button hides and shows the balance and today's amount
- Bills filter: All bills / Needs action (only bills marked `urgent`)
- "Start negotiation" changes to a disabled "Request sent" state
- Tab bar marks the pressed item with `aria-current="page"`
- Content scrolls inside the phone; the tab bar stays pinned
- Tab bar top edge is iOS-style: the scrolling content fades into the bar (28px gradient) and a 1px hairline fades out toward both sides, with no hard border

## Known gaps
- Presentational: no real accounts, navigation or persistence
- Built from the layout of a Stitch design; brand names and the photo avatar were replaced with fictional content and initials

## How it is wired into the library
- The library entry is `Finance dashboard` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 46 light probes and 46 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=finance-dashboard&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
