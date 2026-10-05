# Sticker picker: Guidelines

Product and copy guidelines. These are requirements, not suggestions.

## Product
- Keep the template a finished, believable screen. It is a presentational mobile component shown inside the phone frame: no behavior beyond its documented props.
- Scope: A camera screen with a sticker sheet: the photo is blurred behind a white sheet that shows three sticker packs, four stickers, a "stickers" title and a close button.
- Do not add pages, sections or features that the request did not ask for.
- Never add a Pricing page unless the user asks.

## Copy
- Use plain, specific placeholder copy. No lorem ipsum, no "Click here".
- Brand and data are fictional (none (text and art taken from the reference image)). No real company names, logos, people or product names.
- Sentence case for buttons and headings. No exclamation marks.

## Behavior
- Presentational: keep state local and minimal; callbacks come in as props.
- Anything simulated (replies, runs, uploads) must be cancelable and must clear its timers on unmount.
- Respect `prefers-reduced-motion`: animations stop or become instant.

## Layout
- The component is designed for the 320x660 phone frame (`PhoneFrame`). Do not use viewport units; it must also render in the library tile at reduced size.
- Text must not clip or overlap at the design size. Check long names and long numbers.

## Out of scope
- Backend calls, real authentication, analytics, third-party scripts, remote images or fonts.
