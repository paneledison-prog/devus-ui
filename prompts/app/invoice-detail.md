# Invoice detail

Build a React + TypeScript `<InvoiceDetail>` screen for Devus UI, shown inside the 320x660 phone frame, by composing the invoice pieces from `src/components/AppUI/Finance.tsx`.

## Purpose

A mobile invoice screen: a top bar, the invoice number with a status badge, the total and two dates, who it was billed to, a table of line items with subtotal, tax and total, and two actions at the bottom.

## Layout

- App bar: back button, centered "Invoice detail" title, and a more (three dots) action.
- Summary: receipt icon, number, a green "Paid" badge; a 30px bold total; Issued date and Due date side by side; a dashed divider below.
- Billed to: a gray card with an initials avatar, the name and an email line with a mail icon (ellipsis if too long).
- Item details: a gray card with a table (Description, Qty, Price), then Subtotal, Tax (10%) and a bold Total row.
- Actions: a secondary Download PDF pill and a primary Share pill, pinned to the bottom above the home indicator.
- The middle content scrolls inside the phone (scrollbar hidden).

## Behavior

- The total shown in the header equals the table total (subtotal + tax). `InvoiceItems` computes subtotal, tax and total from the lines, so the numbers cannot disagree.
- Download PDF briefly shows "Saved"; Share briefly shows "Link copied" (about 1.6s), and the timer is cleared on unmount.

## API

- `InvoiceSummary`: `{ number, status, amount, dates: { label, value }[] }`
- `InvoiceParty`: `{ name, email, initials }`
- `InvoiceItems`: `{ lines: { description, qty, price }[], taxRate }`
- `InvoiceActions`: no props
- `AppBar`: `{ title, onBack?, action? }`

## Accessibility

- Cards are sections labelled by their headings; the items table has column headers with `scope="col"`.
- Dates and totals use description lists.
- Buttons have text labels; the icon-only more button has `aria-label`; confirmations are announced politely.
- Touch targets are at least 44px; focus is always visible.

## Design tokens

Use the Devus UI tokens from `src/styles/tokens.css` (CSS variables).

| Group | Tokens |
| --- | --- |
| Colors | `--accent`, `--surface`, `--foreground`, `--muted`, `--separator`, `--default` |
| Cards | `--app-card-bg` (gray cards on the white screen) |
| Radii | `--radius-full`, 20px cards |
| Spacing | 4px scale, `--space-*` |
| Type | Inter, tabular figures for money |
| Themes | `[data-theme="light"]` and `[data-theme="dark"]` |

## Content

All names, emails and amounts are fictional placeholders (`example.com` addresses). No real brands or photos.

## Reference implementation (real files)

- `src/components/AppUI/examples/InvoiceDetail.tsx` (the example, with its data)
- `src/components/AppUI/Finance.tsx`
- `src/components/AppUI/Finance.css`
- `src/components/AppUI/AppBar.tsx`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (`inv-` prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `inv-*` classes), no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every state.
