# Dashboard: Guidelines

Product and copy guidelines. These are requirements, not suggestions.

## Product
- Keep the template a finished, believable screen. It is a static layout: do not add fake behavior.
- Scope: App shell on a fixed 720x440 canvas: sidebar, header with team avatars, three stat cards and progress panels.
- Do not add pages, sections or features that the request did not ask for.
- Never add a Pricing page unless the user asks.

## Copy
- Use plain, specific placeholder copy. No lorem ipsum, no "Click here".
- Brand and data are fictional (Acme (placeholder)). No real company names, logos, people or product names.
- Sentence case for buttons and headings. No exclamation marks.

## Behavior
- Static layout: keep it free of timers and state.
- Anything simulated (replies, runs, uploads) must be cancelable and must clear its timers on unmount.
- Respect `prefers-reduced-motion`: animations stop or become instant.

## Layout
- The canvas is fixed at 720x440 and scaled by the library with CSS zoom. Do not use viewport units inside it.
- Text must not clip or overlap at the design size. Check long names and long numbers.

## Out of scope
- Backend calls, real authentication, analytics, third-party scripts, remote images or fonts.
