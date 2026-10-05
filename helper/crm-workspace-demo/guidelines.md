# CRM workspace demo: Guidelines

Product and copy guidelines. These are requirements, not suggestions.

## Product
- Keep the template a finished, believable screen. It is a working demo: every control that looks clickable must do something visible.
- Scope: A working CRM app with its own light/dark theme: sign-up, company setup, companies table, inbox, Coworker, compose email.
- Do not add pages, sections or features that the request did not ask for.
- Never add a Pricing page unless the user asks.

## Copy
- Use plain, specific placeholder copy. No lorem ipsum, no "Click here".
- Brand and data are fictional (Meridian-style (fictional)). No real company names, logos, people or product names.
- Sentence case for buttons and headings. No exclamation marks.

## Behavior
- State survives closing the preview dialog (the dialog keeps content mounted); do not reset state on blur.
- Anything simulated (replies, runs, uploads) must be cancelable and must clear its timers on unmount.
- Respect `prefers-reduced-motion`: animations stop or become instant.

## Layout
- The root fills its container (width and height 100%). It must work at the 1200x740 library preview size and full window in a new tab.
- Text must not clip or overlap at the design size. Check long names and long numbers.

## Out of scope
- Backend calls, real authentication, analytics, third-party scripts, remote images or fonts.
