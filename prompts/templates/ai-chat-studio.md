# AI chat studio

Build a React + TypeScript `<ChatStudioDemo>` template for Devus UI from the reference screenshot of a desktop AI messenger. Everything works.

## Purpose

A warm-gray, three-pane messenger with an AI assistant: a slim rail, a list of chats with people, a conversation that contains generated pictures, and an AI Assistant panel with a voice waveform.

## Layout (stage 1200x750, scaled to fit)

- Rail (50px): black disc logo, a ringed workspace button, four tool icons (compact list, chats selected, calendar, prompts), your avatar at the bottom.
- Chat list (283px): "All Chats" (All in gray) with a search icon; four people (Margo, Dimitri, Kate, Wen) with unread badges and an "OK!" bubble; chat cards with faces, an unread badge, a "Working" label and a bold title ("How we made these animations" is selected: white, with a preview strip and stacked pictures; "Better at hard prompts"; "ShuttleX new App" with a lime icon; a fourth with an "OK!" bubble); a black + button.
- Conversation (567px): header "Many of you asked…" with a "Writing" status and a camera icon; messages: an AI bubble with a sparkle, a stack of five tilted pictures (the middle one large and white with an ink splatter) with reaction chips and a count, a black outgoing "Silver create video" bubble, a colorful gradient waveform card, "WOOOW" and "Do you see this?"; a composer with a paperclip, a "Text Massege" field, a black sparkle button, a T button and a mic.
- AI Assistant (300px): "AI Assistant" with "Silver" in gray, a dotted background, five tall black rounded waveform bars and a red pill stop button.

## Interaction

- People open a direct chat; chat cards select a thread and clear unread; + starts a new chat; search filters chats.
- Typing and Enter sends; Silver replies after a short typing state (text, a video card or a picture depending on the request); the sparkle button sends as a Silver command; T bolds; the paperclip attaches a photo or a file; the camera starts a video-call banner.
- Tap a side picture in the stack to bring it forward; reaction chips toggle and count.
- The waveform animates while listening; stop and mic buttons toggle it; the sessions menu switches Silver, Atlas and Nova; the panel can be hidden and shown.
- The rail switches between chats, a schedule (opens a chat) and prompts (fills the composer); the first icon toggles a compact list.

## Rules

- All artwork is own SVG; all names and messages are made up. No image files.
- Every control is a real `<button>` or `<input>` with a label, a focus ring and a pressed state. Animations respect `prefers-reduced-motion`.
- Plain CSS, no extra runtime dependencies. Also write a Storybook story (CSF3, autodocs).

## Reference implementation (real files)

- `src/components/ChatStudio/ChatStudio.tsx`
- `src/components/ChatStudio/ChatStudioArt.tsx`
- `src/components/ChatStudio/ChatStudio.css`

Match their structure and class names (`cs-` prefix).
