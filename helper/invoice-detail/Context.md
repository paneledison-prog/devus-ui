# Invoice detail: Context

> Living document for the **Invoice detail** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
Mobile invoice screen: top bar, invoice number with a paid badge, total and two dates, a billed-to card, an item table with subtotal, tax and total, and Download and Share actions.

Brand: none (fictional sample data). Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).

## Real files
- `src/components/AppUI/examples/InvoiceDetail.tsx  (the example shown in the preview)`
- `src/components/AppUI/Finance.tsx`
- `src/components/AppUI/Finance.css`
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`
- `src/styles/tokens.css`
- `src/components/AppUI/gestures.tsx  (gesture hooks)`

Public API: `InvoiceSummary`, `InvoiceParty`, `InvoiceItems`, `InvoiceActions` (in Finance.tsx); `AppBar`.

## What it does
- Subtotal, tax and total are computed from the line items, and the header total matches the table total
- Download PDF briefly shows "Saved"; Share briefly shows "Link copied" (about 1.6s, timer cleared on unmount)
- Table has column headers with `scope="col"`; dates and totals are description lists
- Content scrolls inside the phone; the actions stay pinned above the home indicator
- Gesture: Scroll - the invoice scrolls
- Gesture: Pan - a mouse can drag the page to scroll it
- Gesture: Pull - pull the page down at the top to refresh

## Known gaps
- Presentational: no real invoice data, PDF or share sheet
- Built from the layout of a Stitch design; the second date label (a duplicate "Issued date" in the original) became "Due date", and the header total (it disagreed with the table) now equals the table total

## How it is wired into the library
- The library entry is `Invoice detail` in `src/pages/Library/libraryItems.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 37 light probes and 37 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=invoice-detail&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
