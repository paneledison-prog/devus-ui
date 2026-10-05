# Finance dashboard

Build a React + TypeScript `<FinanceDashboard>` screen for Devus UI, shown inside the 320x660 phone frame, by composing the Finance pieces from `src/components/AppUI/Finance.tsx`.

## Purpose

A banking home screen. A blue gradient hero holds a greeting row, the total balance with a show/hide toggle, and three quick actions. Below it: a savings suggestion card ("Bill negotiator"), a filterable list of bills, and a bottom tab bar.

## Layout

- Hero: accent gradient behind the status bar and the top ~380px, fading into the app card background; status bar text is white.
- Header: avatar with initials, "Good morning" and the name, plus two glass icon buttons (search, notifications with an amber unread dot).
- Balance: label, 30px bold amount with tabular figures, an eye button, and a "change today (amount)" line.
- Quick actions: two white pill buttons (Deposit, Transfer) and a dark square scan button.
- Negotiator card: crown icon, title, a gray message bubble with the saving in bold, and an outline "Start negotiation" button.
- Bills: heading, an All bills / Needs action filter, rows of icon tile + name + due text + amount.
- Tab bar: Home, Cards, Analytics, Settings; the active item has a dark pill behind its icon.
- The content scrolls inside the phone (scrollbar hidden); the tab bar stays at the bottom.

## Behavior

- The eye button hides and shows the balance and today's amount (`aria-pressed`, label changes).
- "Needs action" shows only bills marked `urgent`.
- "Start negotiation" changes to a disabled "Request sent" state.
- The tab bar marks the pressed item with `aria-current="page"`.

## API

- `FinanceHeader`: `{ name, initials, greeting? }`
- `BalanceHero`: `{ amount, change, changeAmount }`
- `QuickActions`: no props
- `NegotiatorCard`: `{ children }`
- `BillList`: `{ bills: { id, name, due, amount, icon, tone: 'blue' | 'amber' | 'sky', urgent? }[] }`
- `FinanceTabs`: `{ items: { id, label, icon }[] }`
- `PhoneFrame`: `{ hero? }` adds the gradient and white status text

## Accessibility

- Icon-only buttons have `aria-label`; the balance is announced politely when it changes.
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
