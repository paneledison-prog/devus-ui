# AI chat studio: Context

> Living document for the **AI chat studio** template. Update it in the same commit as every change to this template.
> Last updated: 2026-10-05

## What this is
A three-pane AI messenger on a fixed 1200x750 stage: a rail, a chat list with people, a conversation with generated pictures and an AI Assistant panel with a voice waveform.

Brand: ShuttleX / Silver (fictional). Open it full window at `/?template=ai-chat-studio`.

## Real files
- `src/components/ChatStudio/ChatStudio.tsx`
- `src/components/ChatStudio/ChatStudioArt.tsx`
- `src/components/ChatStudio/ChatStudio.css`
- `src/styles/tokens.css`

Public API: `ChatStudioDemo({ startView?: "chat" | "calendar" | "code" })`.

## What it does
- Rail: chats, schedule, prompts and a compact-list toggle; the schedule opens a chat, a prompt fills the composer
- People row opens a direct chat (created on first use); chat cards select a thread, clear unread badges and show a preview; the + button starts a new chat; search filters chats
- Conversation: type and press Enter; Silver (the AI) answers with text, a generated "video" card or a picture depending on the request; the sparkle button sends as a Silver command, the T button bolds, the paperclip attaches a photo or a file, the camera starts a video-call banner
- The stack of pictures: tap a side card to bring it to the middle; reaction chips toggle and count
- AI Assistant panel: a live waveform while listening, a red stop button, a mic button to start again, a sessions menu (Silver, Atlas, Nova) and a hide/show toggle; the composer mic toggles listening too

## Known gaps
- Replies are scripted (keyword-based), there is no real model
- Pictures and portraits are own SVG artwork, not photographs
- The calendar and prompts views are small additions to give the rail icons a destination

## How it is wired into the library
- The library entry is `AI chat studio` in `src/pages/Library/templates.tsx` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as 52 light probes and 52 dark probes in `design.md` ("Bench reference"), measured 2026-10-05 from the running design.
- Bench URL: `/?template=ai-chat-studio&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
