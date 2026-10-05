# Finance dashboard

Build a React + TypeScript `<FinanceDashboard>` screen for Devus UI, shown inside the 320x660 phone frame, by composing the Finance pieces from `src/components/AppUI/Finance.tsx`.

## Purpose

A banking home screen that is also a working three-step flow. A blue gradient hero holds a greeting row, the total balance with a show/hide toggle, and three quick actions. Below it: a savings suggestion card ("Bill negotiator"), a filterable list of bills, and a bottom tab bar. Pressing a bill starts a payment: Confirm payment sheet, then Payment sent modal, then back home with the bill marked paid.

## Layout

- Hero: accent gradient behind the status bar and the top ~380px, fading into the app card background; status bar text is white.
- Header: avatar with initials, "Good morning" and the name, plus two glass icon buttons (search, notifications with an amber unread dot).
- Balance: label, 30px bold amount with tabular figures, an eye button, and a "change today (amount)" line.
- Quick actions: two white pill buttons (Deposit, Transfer) and a dark square scan button.
- Negotiator card: crown icon, title, a gray message bubble with the saving in bold, and an outline "Start negotiation" button.
- Bills: heading, an All bills / Needs action filter, rows of icon tile + name + due text + amount.
- Tab bar: Home, Cards, Analytics, Settings; the active item has a dark pill behind its icon.
- The content scrolls inside the phone (scrollbar hidden); the tab bar stays at the bottom with an iOS-style faded top edge (content fades into the bar, a 1px hairline fades out toward both sides).

## Behavior

- The eye button hides and shows the balance and today's amount (`aria-pressed`, label changes).
- "Needs action" shows only bills marked `urgent`.
- "Start negotiation" changes to a disabled "Request sent" state.
- Pressing a bill runs the payment flow described above.
- The tab bar marks the pressed item with `aria-current="page"`.

## Flow

Home -> **Confirm payment** -> **Payment sent** -> Home. The steps live in the example file (`examples/FinanceDashboard.tsx`) as a small state machine (`'home' | 'confirm' | 'sent'`); the screens are `Finance.tsx` pieces.

1. **Home**: pressing a bill (not a paid one) opens its confirmation.
2. **Confirm payment**: a bottom sheet over the dimmed, blurred home screen (the scrim covers the whole phone, status bar included). Centered title and a close button; a pill with the bill icon and "<bill> bill pay"; a Summary card with Paying, From (`Nimbus checking …4821`), Fee (`$0.00`) and Total (`10.99 USD`); a dark full-width "Confirm payment" button. Pressing it shows a spinner and "Confirming…" for about 0.9s (the button is disabled and `aria-busy`), then moves on.
3. **Payment sent**: a centered card over the same scrim with a dark check circle, "Payment sent", "Your payment to <payee> has been sent successfully." and a dark "Go home" button.
4. **Home again**: the bill row shows "Paid just now" with a check, is disabled and drops out of "Needs action"; the balance is lower by the paid amount (`$124,892.65` becomes `$124,881.66` after the $10.99 bill).

Closing: the close button, a press on the scrim, or Escape closes the sheet without paying; Escape or "Go home" closes the success card. Escape calls `preventDefault` so a surrounding native dialog does not close too.

Focus: the primary button of an overlay is focused when it opens; the base screen is `inert` while an overlay is open; on return, focus goes back to the bill that opened the flow (or to the active filter if that bill is now paid). The timer is cleared on unmount.

## API

- `FinanceHeader`: `{ name, initials, greeting? }`
- `BalanceHero`: `{ amount, change, changeAmount }`
- `QuickActions`: no props
- `NegotiatorCard`: `{ children }`
- `BillList`: `{ bills: { id, name, due, amount, icon, tone: 'blue' | 'amber' | 'sky', urgent?, payee? }[], onOpen?(id), paidIds? }`
- `FinanceTabs`: `{ items: { id, label, icon }[] }`
- `ConfirmPaymentSheet`: `{ bill, from, busy, onConfirm, onClose }`
- `PaymentSentModal`: `{ payee, onDone }`
- `FinanceFlow`: `{ children, ref? }` wrapper for the base screen plus overlays
- `PhoneFrame`: `{ hero? }` adds the gradient and white status text

## Accessibility

- Icon-only buttons have `aria-label`; the balance is announced politely when it changes.
- The sheet is `role="dialog"` and the success card `role="alertdialog"`, both `aria-modal` and labelled by their headings.
- Filter buttons are a labelled group with `aria-pressed`.
- Touch targets are at least 40px; focus is always visible.
- Sections are labelled by their headings.

## Design tokens

Use the Devus UI tokens from `src/styles/tokens.css` (CSS variables).

| Group | Tokens |
| --- | --- |
| Colors | `--accent`, `--surface`, `--foreground`, `--muted`, `--separator`, `--default`, `--warning` |
| Radii | `--radius-full`, 16 to 22px for cards and buttons |
| Spacing | 4px scale, `--space-*` |
| Type | Inter |
| Focus | `--focus-ring` |
| Themes | `[data-theme="light"]` and `[data-theme="dark"]` |

## Content

All names, amounts and merchants are fictional placeholders. No real brands or logos; the avatar shows initials.

## Reference implementation (real files)

- `src/components/AppUI/examples/FinanceDashboard.tsx` (the example, with its data)
- `src/components/AppUI/Finance.tsx`
- `src/components/AppUI/Finance.css`
- `src/components/AppUI/PhoneFrame.tsx`
- `src/components/AppUI/AppUI.css`

Match their structure, class names (`fin-` prefix) and tokens.

## Implementation rules

- Plain CSS (BEM-style `fin-*` classes), no extra runtime dependencies.
- Also write a Storybook story (CSF3, autodocs) covering every state.
