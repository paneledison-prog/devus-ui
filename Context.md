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
CSS variables in `src/styles/tokens.css`: colors (`--accent`, `--default`, `--danger`, `--surface`, `--foreground`, `--muted`, `--separator`, field and shadow tokens), radii, a 4px spacing scale, Inter type scale. Dark mode is `[data-theme="dark"]` on `<html>` (homepage toggle persists to localStorage key `devus-theme`; Storybook uses the themes addon). The dark values are approximations. Rule: never mention the upstream design system's name anywhere in the app, code, copy or prompts.

## Library content (41 items, 6 categories)
Defined in `src/pages/Library/libraryItems.tsx`. Each item has `name`, `category`, `variants`, `preview`, `code`, `prompt`, plus optional `lang`, `fill`, `tileZoom`, `defaultZoom`, `tall`.

- **Components (11):** Alert, Avatar, Button, Card, Checkbox, Spinner, Switch, TextField, Segmented control, OTP input, Dropzone
- **Blocks (4):** Sign in, Newsletter, Notification settings, Profile card
- **Templates (4):** Landing page, Dashboard, Split sign in, Settings page (720x440 canvases, scaled with CSS zoom)
- **Backgrounds (4):** Dot grid, Grid lines, Aurora, Soft gradient (pure CSS, `fill: true`)
- **UI Elements (7):** Badge, Kbd, Separator, Progress, Slide to confirm, Inline confirm, Image compare
- **App (11):** mobile-app style, every item shown inside a phone viewport (status bar, rounded bezel, home indicator; portrait 3:5 tiles via `tall`, App grid uses a 380px minimum tile width (3 columns, tiles ~395x658 at 1280px content, phone ~306x632 = 96% of the tile height, hover actions stacked beside the phone) through the `--tile-min` CSS variable; App tiles have no gray container or drop shadow behind the phone (transparent `--tall` tile; other categories keep their gray tiles); LibraryCard measures the tile with a ResizeObserver and scales the phone to ~96% of the tile height; the phone frame is 320x660 px, the classic iPhone ratio 2.06 (147.6 x 71.6 mm), via CSS aspect-ratio): Home screen, Floating tab bar, App bar, Week strip, Task list, Balance card, Tracking steps, Grouped list, Bottom sheet, Floating action button, Story rings. Code lives in `src/components/AppUI/` (PhoneFrame, TabBar, AppBar, ListRow/ListGroup, BottomSheet, Fab, StoryRing, Cards: AppCard/WeekStrip/BalanceCard/TrackSteps, icons)

Also in the codebase: `Logo` (brand mark), `CodeBlock` (Shiki), `LibraryCard`, `PreviewDialog`, `SearchDialog`.

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
- Latest local commit: "Phone: 320x660 classic proportions, 30px radius".
- **Unpushed:** 18 commits ahead of `origin/main` (header search, category sections, templates, edison round 1, Context.md, App category, App tile sizing, iPhone proportions, larger App tiles, transparent App tiles, no phone shadow, bigger phones, bigger phone dialog, borderless phone, radius and height, compact dialog header, tighter header and footer, wider phone with smaller radius). Live sites do not have them yet.
- `storybook.devus.space` verified working after the routing fix (title "storybook - Storybook").
- `devus.space` must be connected to the same Vercel project (Settings > Domains) to show the homepage.

## Known gaps and ideas
- Nav links are hidden under 640px wide (no mobile menu yet).
- Search ranking is a plain substring match (name and description weighted equally).
- Only Dropzone's rendering was checked, not an actual file drop.
- Blocks, Templates and Backgrounds exist on the homepage only (no Storybook stories).
- App previews use phone frames at fixed 270x540; the AppUI Storybook stories (App/Mobile) still show the elements without the frame styling for floating bars.
- Next: edison round 2 from untouched sources; shader backgrounds on request; Pricing page when asked.

## Changelog
- 2026-10-02: Scaffolded the library from Figma tokens; Library page; copy code/prompt and large preview; Shiki highlighting; renamed to Devus UI; Storybook branding; Vercel config; homepage app; host-based Storybook routing; logo; header search; Components/Blocks/Backgrounds/UI Elements sections; Templates; edison round 1 (6 new items); this Context.md; App tile sizing (phones fill ~86% of a 5:7 tile); phone frame set to the classic iPhone ratio (320x660); larger App tiles (3 columns, 3:5, phone ~306x632); phone is now borderless: flat rounded 30px screen (9.4% of the width), no bezel, outline or shadow; white screen (--surface) with soft gray cards via --app-card-bg; the phone dialog uses the page background so the white phone stands out; App category (11 mobile items in phone viewports, floating tab bar, week strip, task list, balance card, tracking steps).
