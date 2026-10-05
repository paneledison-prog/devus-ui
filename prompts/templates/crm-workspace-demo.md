# CRM workspace demo

Build a full-page "CRM workspace demo" template for Devus UI by composing existing components (native form controls, role=dialog, aria-live, a textarea mirrored by a highlighted layer for variable tokens).

## Layout

A working CRM app with its own light and dark theme, built around flexible records, connected context and faster go-to-market workflows. Journey: (1) sign-up with username, work email and password (validated) above a fading line-art city skyline; (2) company setup that analyzes the email domain with a step checklist and a company card; (3) the app: sidebar with a workspace switcher, a quick-actions command box, inboxes, a Coworker assistant, General (Agents, Schedule, Customers, Companies, Emails, Report, Apps), favorites, and a Getting Started checklist popover with progress. Companies table: view select, sort by revenue, filter, search, column settings, row selection, New Company dialog, colored category pills, linked domains, founders and a totals footer. Inbox: conversation list, activity timeline, chat bubbles, a status control (open, in progress, resolved) and a Coworker side panel that drafts an email with Dismiss and Send. Compose email dialog with recipient chips and an @ variable picker (core and company variables shown as colored tokens). Coworker page with a composer and a connect-your-tools bar. All data is fictional; no real company logos.

## Requirements

- Make it responsive (stack columns under 720px), use semantic landmarks (header, nav, main, aside) and keep all copy as placeholder text.

## Design tokens

Use the Devus UI tokens as CSS variables.

| Group | Tokens |
| --- | --- |
| Colors | `--background`, `--surface`, `--foreground`, `--muted`, `--separator`, `--accent` |
| Radii | `--radius-2xl` |
| Spacing | `--space-*` |
| Type | Inter |
| Themes | `[data-theme="light"]` and `[data-theme="dark"]` |
