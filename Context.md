# Devus UI: Project Context

> Living document. Updated after every change so a new session can pick up instantly.
> Last updated: 2026-10-02

## What this is
Devus UI is a React + TypeScript component library with a public homepage and a Storybook workshop. Visitors browse components, open a large preview, and copy each item as **code** or as a **master prompt**.

- Homepage: https://devus.space
- Storybook: https://storybook.devus.space
- Repo: https://github.com/paneledison-prog/devus-ui (branch `main`)
- Owner GitHub account: `paneledison-prog` (the `gh` CLI must be logged in as this account; `xnsteam-ai` is also saved on the machine and has no write access)

## Stack
React 19, TypeScript, Vite, Storybook 10 (react-vite), Shiki (code highlighting), plain CSS with design tokens (no Tailwind). No backend: everything is frontend and static.

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server for the homepage |
| `npm run storybook` | Storybook dev server on :6006 |
| `npm run build` | Builds the homepage into `dist/` and Storybook into `dist/storybook/` |
| `npm run preview` | Serves `dist/` locally (port 4173) |
| `npm run typecheck` | `tsc --noEmit` |

## Deployment (Vercel)
One Vercel project serves both sites. `vercel.json` sets build `npm run build`, output `dist`, and a `routes` rule that sends the host `storybook.devus.space` to `/storybook/$1` **before** the filesystem lookup (a `rewrites` rule did not work because `dist/index.html` won for `/`). Domains are registered at Vercel with Vercel nameservers, so no manual DNS records are needed; connect each domain under Project > Settings > Domains.

## Project structure
```
index.html, vite.config.ts, vercel.json
public/favicon.svg                  Devus UI logo mark
.storybook/                         main.ts, preview.tsx, manager.ts (branding), preview-head.html
src/
  main.tsx, app/App.tsx, App.css    Homepage: header, hero, category sections, search, theme toggle
  styles/tokens.css, index.css      Design tokens (light + dark) and base styles
  hooks/useCopy.ts                  Clipboard helper with "Copied" feedback
  components/                       One folder per component (tsx + css + stories)
  pages/Library/                    LibraryPage, libraryItems (all items + categories), prompt helpers, templates
```

## Design tokens
CSS variables in `src/styles/tokens.css`: colors (`--accent`, `--default`, `--danger`, `--surface`, `--foreground`, `--muted`, `--separator`, field and shadow tokens), radii, a 4px spacing scale, Inter type scale. Dark mode is `[data-theme="dark"]` on `<html>` (homepage toggle persists to localStorage key `devus-theme`; Storybook uses the themes addon). The dark values are approximations. Scrollbars are global in src/styles/index.css: thin, transparent track, thumb = foreground at 22% (38% on hover) via --scrollbar-thumb tokens, so they follow light/dark; standard scrollbar-width/scrollbar-color plus a WebKit rounded-pill fallback. Rule: never mention the upstream design system's name anywhere in the app, code, copy or prompts.

## Library content (67 items, 6 categories)
Defined in `src/pages/Library/libraryItems.tsx`. Each item has `name`, `category`, `variants`, `preview`, `code`, `prompt`, plus optional `lang`, `fill`, `landscape`, `tileZoom`, `defaultZoom`, `tall`.

- **Components (16):** Alert, Avatar, Button, Card, Checkbox, Spinner, Switch, TextField, Segmented control, OTP input, Dropzone, Context meter, Autonomy picker (the last two from the "edison" round 2, see AI patterns below), Rich tooltip, Magnetic dock, Dynamic island (edison round 3, see Motion patterns)
- **Blocks (14):** (includes Approval card, Thinking steps, Sourced answer from edison round 2) Sign in, Newsletter, Notification settings, Profile card, plus 7 dashboard blocks built from the user's reference screenshots (original implementations, real exported components in `src/components/Blocks/`): New chat (ChatCard), Milestone form, QR connect (placeholder pattern, not a scannable code), Payout threshold (live range slider), Sidebar nav cards, Controls showcase, Contribution history (CSS bar chart). They share a soft-card look: pill fields, high-contrast primary buttons (primary flips to --foreground inside `.blk-card`)
- **Templates (12):** Landing page, Dashboard, Split sign in, Settings page (720x440 canvases, scaled with CSS zoom), and AI workspace demo and CRM workspace demo (two WORKING app demos, see below), and three more working demos from the user's project-description screenshots (Scout Intelligence, Langdock, Twin; see below), and Case study (1280x800 scrolling canvas; real component `CaseStudyTemplate` in `src/components/CaseStudy/`): a dark portfolio case-study page recreated from the layout of acedesign.io/work/alpaca (viewed in the browser). Sticky header, sticky Name / Overview / Scope panel on the left, and a stack of scaled 1140x662 product screens on the right (sky banner, Starter/Pro plan chooser, connect-apps dialog, welcome, new chat, artifacts). Original build: fictional brand "Orbit AI", own copy, no images or text taken from the source site
- **Backgrounds (6):** Dot grid, Grid lines, Aurora, Soft gradient, Emerald glow, Lilac fade (pure CSS, `fill: true`). Aurora (cyan beams + icy-blue glow), Soft gradient (rose beam + peach glow), Emerald glow and Lilac fade are all clean saturated mesh-gradients on black (no translucent blobs on navy, which looked muddy) from the user's references; ORIGINAL NOTE: they are soft mesh-gradient looks from the user's references, shown in a 16:10 landscape frame (`landscape: true`, frame = 16:10, 24px radius, 1px white border; the dialog sizes it with container units (min(100cqw, 160cqh)) so the ratio holds at any window shape; backgrounds grid uses --tile-min 340px (3 per row); the old portrait 4:5 frame was replaced; the copy-code CSS and the prompts include the border and radius)
- **UI Elements (8):** (includes Member stack, edison round 3) Badge, Kbd, Separator, Progress, Slide to confirm, Inline confirm, Image compare
- **App (11):** mobile-app style, every item shown inside a phone viewport (status bar, rounded bezel, home indicator; portrait 3:5 tiles via `tall`, App grid uses a 380px minimum tile width (3 columns, tiles ~395x658 at 1280px content, phone ~306x632 = 96% of the tile height, hover actions stacked beside the phone) through the `--tile-min` CSS variable; App tiles have no gray container or drop shadow behind the phone (transparent `--tall` tile; other categories keep their gray tiles); LibraryCard measures the tile with a ResizeObserver and scales the phone to ~96% of the tile height; the phone frame is 320x660 px, the classic iPhone ratio 2.06 (147.6 x 71.6 mm), via CSS aspect-ratio): Home screen, Floating tab bar, App bar, Week strip, Task list, Balance card, Tracking steps, Grouped list, Bottom sheet, Floating action button, Story rings. Code lives in `src/components/AppUI/` (PhoneFrame, TabBar, AppBar, ListRow/ListGroup, BottomSheet, Fab, StoryRing, Cards: AppCard/WeekStrip/BalanceCard/TrackSteps, icons)

Also in the codebase: `Logo` (brand mark), `CodeBlock` (Shiki), `LibraryCard`, `PreviewDialog`, `SearchDialog`.

### AI workspace demo (`src/components/Workspace/`)
Interactive app built from the user's reference screenshots in C:UsersPlatform freeDownloadsimages-acedesign.ioImages (viewed 25 of them: plan chooser, chat, apps marketplace, artifacts, welcome + connect dialog, mobile pairing, triggers/skills panel; light and dark versions). Original build, fictional "Orbit" brand, generic app tiles (no real brand logos), own copy. Has its OWN light/dark toggle (`data-theme` on its root; initial value = site theme or the `defaultTheme` prop). Working features: Chat / Agent mode tabs, sidebar nav, search box (Ctrl+K inside the app) that jumps to pages/projects/chats/apps, connect-your-apps dialog (Explore goes to Apps), New chat composer with simulated replies and a model menu with usage bars, suggestion cards, Projects, Artifacts (New artifact adds a card), Apps marketplace (search, connect/disconnect), Plans (Starter / Pro buttons show toasts), Active runs, Plugins (trigger and skill switches), Mobile pairing. State persists while the preview dialog is closed because the dialog keeps its content mounted. Tested via script in the browser (light and dark).

### Open a template in a new tab
Every Templates item has an "Open in new tab" action (arrow button on the tile hover actions, and a button in the large-preview footer). It opens `/?template=<slug>` (slug = lowercase name with dashes, see `src/pages/Library/slug.ts`). `src/main.tsx` reads the `template` query param and renders `src/app/TemplatePage.tsx` instead of the homepage: a slim 44px bar (back to library, template name, light/dark toggle sharing the site theme key `devus-theme`) and the template full-window. Items with `standalone` (Case study, AI workspace demo) render their responsive component at full size; items with `canvas` (the four 720x440 templates) are scaled to fit the window. Unknown slugs show a "Template not found" page. Works with the current Vercel routing because it is a query string on `/`.

### CRM workspace demo (`src/components/Crm/`)
Working CRM app built from the user's 7 reference screens plus a project-description screenshot (modern CRM: flexible records, connected context, faster go-to-market workflows). Fictional "Meridian"-style brand, fictional companies, own line-art skyline (SVG made from rectangles); no real logos or copied artwork. `startAt` prop: `signup` (full journey, used for the new-tab page) or `app` (used for the library preview). Own light/dark toggle (sidebar). Journey and features: sign-up with validation, company setup (animated checklist, disabled Continue until done, respects reduced motion), sidebar with Quick Actions command box (compose, new company, theme, open pages), Getting Started checklist popover with progress ring and Finish All, Companies table (view/category select, sort by revenue, search, column settings, row select, New Company dialog, totals footer), Inbox (8 conversations, activity timeline, chat with a simulated reply, status control open/in progress/resolved, Coworker side panel with Dismiss/Send draft), Coworker page, Compose email dialog (recipient chips, @ variable picker with colored tokens, draft-saved indicator, Send). Pages without a demo (Agents, Schedule, Customers, Escalations, Report, Apps) show a placeholder. Known gap: the column-settings menu closes with Esc or its button, not on outside click.


### Agents folder demos (`src/components/Agents/`)
Three working demos built from the project cards (Name / Overview / Scope) the user sent as screenshots, with fictional brands, data and own art. Shared pieces in `shared.tsx` (icons, Modal, Toggle, ThemeSwitch, toast, outside-click hook) and `Agents.css` (root `.ag`, own light/dark tokens). Each has its own CSS file, a story and a library entry.
- **Company intelligence demo** (`Beacon.tsx`, brand "Beacon", from Scout Intelligence): animated ASCII-art sky banner (static for reduced motion), Featured / New this week / Watchlist tabs, filter, sortable funding column, growth bars, watch stars, command palette (Companies / People / Investors tabs, arrow keys, Enter; Ctrl/Cmd K works once focus is inside the demo), company page with funding chart, signals, people, investors, workspace menu with appearance switch.
- **AI platform demo** (`Harbor.tsx`, brand "Harbor", from Langdock): chat with suggestion chips, typing indicator and keyword-matched replies, model picker with hover tooltips, Assistants, Knowledge toggles, Integrations connect/disconnect, Console with API keys (spend bars, revoke), three-step create-key wizard, Getting started popover that reacts to user actions.
- **Agent builder demo** (`Pairwise.tsx`, brand "Pairwise", from Twin): validated sign-in split, prompt that becomes a plan that runs, pauses for approval, then shows a chat post with a code diff, Publish and Share dialogs, Discover with search and category pills, Credits page with slider and tier highlight, credits menu.
Not built from the original reference sets: only the three description cards were read; screens were designed from the descriptions and the earlier summary of the other references.

### AI patterns (`src/components/AiKit/`, edison round 2)
Inspired by the pattern list on ui.halaska.com (a UI kit for AI products; viewed in the browser, nothing copied: own code, own copy, Devus tokens). Components: `ApprovalCard` (agent paused, radio options, Confirm/Skip, locks after choice), `ThinkingSteps` (collapsible step rail with spinner/check/time), `ContextMeter` (custom listbox dropdown for the model, no native select, keyboard + outside-click close; usage bar, amber over 70%, red over 90%, role=meter), `AutonomyPicker` (3-segment radiogroup with arrow keys and a live hint), `SourcedAnswer` + `Cite` (inline numbered badges and source chips). One story file with 6 stories (Blocks/AI patterns). Sources mined so far: bencho.dev, obsidianui.dev, ui.halaska.com.

### Motion patterns (`src/components/Motion/`, edison round 3)
Inspired by the component names on skiper-ui.com (dynamic island, hover members, rich tooltip) and componentry.dev (magnetic dock). Only names and general ideas were taken; everything is original code. `Tooltip` (title, description, shortcut chip, arrow, delay, Escape), `MagneticDock` (Gaussian icon magnification from pointer distance, label on the largest icon, focus enlarges, off under reduced motion; sample icons in `dockItems.tsx`), `DynamicIsland` (idle / timer / call morph with springy transition, live clock, end-call), `MemberStack` (overlapping avatars that spread on hover/focus with name+role tooltip). Note: library tiles cover previews with the open button, so hover effects can only be tried in the large preview. Sources mined so far: bencho.dev, obsidianui.dev, ui.halaska.com, skiper-ui.com, componentry.dev.

### Build agent demo (`src/components/BuildAgent/`)
Working desktop-style coding-agent workspace for building and testing mobile apps, built from frames of a short product video the user linked (an X post showing a coding agent with an iOS simulator pane and annotation mode). The video was NOT downloaded (no yt-dlp/ffmpeg installed, and it is only 640x360); frames were read by seeking the playing video in the browser. Original build: fictional app "ChirpApp", fictional people and file names (PostRowView.swift), generic phone, no logos or product names copied. `startAt`: `home` or `thread`; `defaultTheme`. Features: new-thread screen (composer with removable plugin chip, plus menu, approval-mode and model dropdowns, dictation button that fills the box, project / where / branch pickers, idea chips); thread with a live Working-for-Ns divider, streamed messages and step lines, permission request (Allow/Deny when approval mode is Ask every time; Deny ends the run politely), Stop button; Environment card (changes counter, branch, Commit or push dialog that resets the counter, tasks, browser); live iPhone simulator pane scaled to fit (favorite posts, overflow and share menus, rotate, reload, dark); annotation mode (green outlines, click an element, type feedback, send) whose fix visibly changes the phone (avatar to top, bigger text or tighter rows) with an edit card (Undo, diff Review dialog); follow-up commands for share menu, rotate, dark, undo. All run logic is a timed script with cancel support; timers are cleared on unmount.

### Liquid glass chat (`src/components/LiquidChat/`)
iOS-style messaging demo in the Liquid Glass look, inspired by github.com/Appllama/liquid-glass-chat-ui (MIT, React Native + Skia + Apple's native glass; its README and MOTION_SPEC.md were read for the interaction model). NOT a port: original React/CSS code, own SVG portraits (generated faces) and own SVG coastal scene, fictional names and messages; none of the repo's photos, names or code were used. `startAt`: `inbox` or `chat`; `defaultTheme`. Glass = translucent fill + backdrop-filter blur/saturate + specular top edge + sheen pseudo-element; the photo bubble rim uses an SVG feTurbulence + feDisplacementMap lens via `backdrop-filter: url(#id)` (Chromium; other browsers get the plain rim). Features: Messages inbox, Your circle ribbon (tap or drag vertically; content slides, collapsed portrait stack), compose sheet that starts new chats, live search, All/Unread/Groups, unread dots; chat with glass header buttons, bubbles with avatar on the last of a run, photo bubble + glass caption chip + tap-to-zoom viewer, double-click hearts, glass composer + send button, enter animation (22px, scale 1.02), typing dots and a simulated reply, more menu (mute, share photo, clear chat), attach menu. Phone is a 390x844 design scaled to the window; screens use `inert` when hidden. Registered in templates.tsx (open in new tab works). Not built: the repo's second cookbook (story rail), voice and video.

## Homepage behavior
- Sticky header: logo, one nav link per category (Components, Blocks, Templates, Backgrounds, UI Elements, App), Storybook link, Search button (Ctrl/Cmd+K), theme toggle (contrast icon).
- Each tile: click opens the large preview dialog (compact ~45px header (15px title, slim tab pill) and ~52px footer; Preview / Code / Master prompt tabs, zoom 75/100/150/200%; phone items open taller (up to 860px) with a **Fit** zoom that auto-scales the iPhone to the stage, up to 1.2x, scaled to fit the stage at any window size, no gray box behind it); hover shows Prompt / Code copy buttons.
- Search overlay: recent searches (localStorage `devus-recent-searches`), live filter on name and prompt text, arrow keys + Enter; choosing a result scrolls to its category and opens its large preview.

## Working agreements
- Commit locally after each change; **push only when the user says "push"**.
- Do not add a Pricing page and do not touch it unless asked (none exists yet).
- Git identity for this repo: `paneledison-prog` / `paneledison@gmail.com` (repo-local config).
- Keep this file updated on every change.

## Standing triggers
- **"edison"**: browse the user's inspiration sources and build NEW original library items (never copy code, assets or branding). Sources: bencho.dev, on.design, inspomcp.dev, motionsites.ai, obsidianui.dev, ui.halaska.com, builtbydesigners.com, goatedui.dev, reelfolio.io, libraries.dev, uiarc.dev, spaceui.one, componentry.dev, skecher-ui.com, useplanes.com, skiper-ui.com. Already mined: bencho.dev, obsidianui.dev. Rotate through the rest.
- **Shaders**: build with three.js plus the library from @npm_i_shaders (npm package name still to be confirmed) as Backgrounds: lazy-loaded, reduced-motion fallback, pause off-screen, CSS gradient fallback.

## Status
- Latest work: dark-mode shadow tokens are now a valid zero shadow instead of `none` (a `none` inside a comma-separated box-shadow list made the whole declaration invalid, which hid the checkbox ring, Kbd inset line, dock and dropdown borders); checkbox ring is always visible; floating tab bar active pill lifted above the bar in dark mode (was darker than the bar and looked like a hole); Liquid glass chat template, Build agent demo template, edison rounds 2 and 3 (AI patterns, Motion patterns), dark-mode container fixes, landscape background frames.
- **Pushed:** everything is on `origin/main`, including the Liquid glass chat, Build agent demo, edison rounds 2 and 3, background frame changes and the Context meter / Autonomy picker / outline Button fixes. Check `git log origin/main` for the exact head. Live check after deploy: https://devus.space serves the new bundle and `/?template=<slug>` pages open (earlier verified for ai-workspace-demo).
- **Unpushed:** none after the latest push. Push only when the user says "push".
- (history) 24 commits were ahead of `origin/main` (header search, category sections, templates, edison round 1, Context.md, App category, App tile sizing, iPhone proportions, larger App tiles, transparent App tiles, no phone shadow, bigger phones, bigger phone dialog, borderless phone, radius and height, compact dialog header, tighter header and footer, wider phone with smaller radius, bottom sheet scrim, Image compare uses flat solid colors (Before #71717a gray, After the --accent brand blue), no gradients; purple remains in the story-ring gradient inside src/components/AppUI/AppUI.css). Live sites do not have them yet.
- `storybook.devus.space` verified working after the routing fix (title "storybook - Storybook").
- `devus.space` is connected and serving the homepage.

## Known gaps and ideas
- Segmented control track uses --default-hover (not --default) so it stays visible on the gray library tiles; inactive segments get a hover fill.
- Nav links are hidden under 640px wide (no mobile menu yet).
- Search ranking is a plain substring match (name and description weighted equally).
- Only Dropzone's rendering was checked, not an actual file drop.
- Blocks, Templates and Backgrounds exist on the homepage only (no Storybook stories).
- App previews use phone frames at fixed 270x540; the AppUI Storybook stories (App/Mobile) still show the elements without the frame styling for floating bars.
- Next: edison round 2 from untouched sources; shader backgrounds on request; Pricing page when asked.

## Changelog
- 2026-10-02: Scaffolded the library from Figma tokens; Library page; copy code/prompt and large preview; Shiki highlighting; renamed to Devus UI; Storybook branding; Vercel config; homepage app; host-based Storybook routing; logo; header search; Components/Blocks/Backgrounds/UI Elements sections; Templates; edison round 1 (6 new items); this Context.md; App tile sizing (phones fill ~86% of a 5:7 tile); phone frame set to the classic iPhone ratio (320x660); larger App tiles (3 columns, 3:5, phone ~306x632); phone is now borderless: flat rounded 30px screen (9.4% of the width), no bezel, outline or shadow; white screen (--surface) with soft gray cards via --app-card-bg; a bottom sheet inside a phone is white over a dimmed (32% black) scrim so the borderless phone stays visually whole (a gray sheet blended into the page background); the phone dialog uses the page background so the white phone stands out; App category (11 mobile items in phone viewports, floating tab bar, week strip, task list, balance card, tracking steps).
