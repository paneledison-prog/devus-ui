"""
Generates the real `helper/<template-slug>/` folders that ship with every Template in the library.

Each helper folder is a set of plain Markdown files that a coding agent must read and follow before
changing that template:

  helper/<slug>/
    Context.md        what the template is, its real files, props, status and gaps
    guidelines.md     product and copy guidelines for this template
    design.md         visual spec: tokens, layout, type, states, motion
    agent/
      Agent.md        the operating contract (read order, hard rules, definition of done)
      rules/          one rule per file (tokens, accessibility, originality, code structure, workflow)
      skills/         task playbooks (edit this template, verify this template)

The files are committed. Re-run this script after the facts below change:  python scripts/generate-helper.py
"""
import json
import os
import shutil

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'helper')
TODAY = '2026-10-05'

TOKEN_LIST = """- Colors: `--background`, `--foreground`, `--muted`, `--surface`, `--overlay`, `--separator`, `--link`
- Accent and states: `--accent`, `--accent-foreground`, `--accent-soft`, `--accent-soft-foreground`, `--danger`, `--danger-soft`, `--warning`
- Neutrals: `--default`, `--default-hover`, `--default-foreground`
- Fields: `--field-background`, `--field-foreground`, `--field-placeholder`, `--field-border`, `--focus-ring`
- Shadows: `--shadow-field`, `--shadow-surface`, `--shadow-overlay`, `--shadow-switch`
- Space (4px scale): `--space-0-5` ... `--space-6`; radii `--radius-sm` ... `--radius-3xl`, `--radius-full`, `--radius-field`
- Type: Inter via `--font-sans`; sizes `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`; leading `--leading-sm`, `--leading-base`, `--leading-lg`"""

HERE = os.path.dirname(os.path.abspath(__file__))
BENCH = json.load(open(os.path.join(HERE, 'bench-reference.json'), encoding='utf8'))
BENCH_SNIPPET = open(os.path.join(HERE, 'bench-snippet.js'), encoding='utf8').read().strip()

T = {}


def add(slug, **kw):
    kw['slug'] = slug
    T[slug] = kw


add('landing-page', name='Landing page', brand='Acme (placeholder)', kind='canvas', root='.tpl', prefix='tpl-',
    files=['src/pages/Library/templates.tsx  (function LandingTemplate)', 'src/pages/Library/templates.css  (Landing section)',
           'src/components/Button/Button.tsx', 'src/components/Badge/Badge.tsx', 'src/components/Logo/Logo.tsx'],
    entry='src/pages/Library/templates.tsx', props='none (static layout)',
    summary='Marketing page on a fixed 720x440 canvas: top nav, centered hero with badge, headline, supporting text and two calls to action over a soft accent glow.',
    features=['Nav: logo, brand, three text links, small primary button', 'Hero: accent badge, 40px headline, muted paragraph, large primary and secondary buttons',
              'Soft radial accent glow behind the hero'],
    gaps=['Static: links and buttons are not wired', 'No responsive layout (fixed canvas scaled with CSS zoom by the library)'],
    design=['Canvas 720x440, radius `--radius-2xl`, background `--background`', 'Headline 40px/44px, weight 600, letter-spacing -0.02em, max width 480px',
            'Hero glow: `radial-gradient(60% 70% at 50% 0%, var(--accent-soft), transparent 70%)`'],
    edit=['Change copy and structure in `LandingTemplate` (templates.tsx)', 'Change layout in the Landing block of templates.css', 'Reuse Button, Badge, Logo; do not restyle them here'])

add('dashboard', name='Dashboard', brand='Acme (placeholder)', kind='canvas', root='.tpl', prefix='tpl-',
    files=['src/pages/Library/templates.tsx  (function DashboardTemplate)', 'src/pages/Library/templates.css  (Dashboard + shell section)',
           'src/components/Logo/Logo.tsx', 'src/components/Badge/Badge.tsx', 'src/components/Progress/Progress.tsx', 'src/components/Avatar/Avatar.tsx'],
    entry='src/pages/Library/templates.tsx', props='none (static layout)',
    summary='App shell on a fixed 720x440 canvas: sidebar, header with team avatars, three stat cards and progress panels.',
    features=['Sidebar 168px with brand and four links, current page marked with aria-current', 'Header with title and an AvatarGroup', 'Three stat cards (revenue, active users, errors) with delta badges',
              'Panel with two Progress bars'],
    gaps=['Numbers are placeholders', 'No charts', 'Static: navigation is not wired'],
    design=['Sidebar 168px, hairline right border; main padding `--space-6`', 'Stat cards: `--surface`, `--shadow-surface`, `--radius-2xl`, value 24px/32px weight 600',
            'Delta badges use tones success, accent and danger'],
    edit=['Add or change stat cards in the `tpl-stats` grid', 'Keep three columns at 720px', 'Use existing Badge tones; no new colors'])

add('split-sign-in', name='Split sign in', brand='Acme (placeholder)', kind='canvas', root='.tpl', prefix='tpl-',
    files=['src/pages/Library/templates.tsx  (function SignInTemplate)', 'src/pages/Library/templates.css  (Split section)',
           'src/components/Card/Card.tsx', 'src/components/TextField/TextField.tsx', 'src/components/Button/Button.tsx', 'src/components/Logo/Logo.tsx'],
    entry='src/pages/Library/templates.tsx', props='none (static layout)',
    summary='Two-column authentication page on a fixed 720x440 canvas: an aurora art panel on the left and the sign-in form on the right.',
    features=['Art panel with logo, "Welcome back" and a supporting line over the aurora background', 'Form card with email and password TextFields and a Continue button'],
    gaps=['No validation or submit handler', 'No social sign-in or forgot-password link'],
    design=['Left panel uses the aurora background look; text is white', 'Right panel centers a Card on `--background`', 'Inputs use `--field-*` tokens via TextField'],
    edit=['Add fields inside the Card, keep labels on every field', 'Wire `onSubmit` through props if the template becomes functional', 'Do not change the aurora colors'])

add('settings-page', name='Settings page', brand='Acme (placeholder)', kind='canvas', root='.tpl', prefix='tpl-',
    files=['src/pages/Library/templates.tsx  (function SettingsTemplate)', 'src/pages/Library/templates.css  (shell + panel section)',
           'src/components/TextField/TextField.tsx', 'src/components/Switch/Switch.tsx', 'src/components/Button/Button.tsx', 'src/components/Logo/Logo.tsx'],
    entry='src/pages/Library/templates.tsx', props='none (static layout)',
    summary='Settings screen on a fixed 720x440 canvas: sidebar navigation, a profile form and preference toggles, with a primary save action.',
    features=['Sidebar: Profile, Notifications, Security, Billing', 'Profile panel: display name and email fields', 'Preferences panel: two Switch toggles', 'Small primary Save changes button in the header'],
    gaps=['Save is not wired', 'Only the Profile page exists'],
    design=['Same shell as the Dashboard template', 'Panels are `--surface` cards with `--shadow-surface`', 'Toggles use the library Switch (40x20 track)'],
    edit=['Add settings as panels in `tpl-main`', 'Keep the Save button in the header', 'Group related toggles in one panel'])

add('case-study', name='Case study', brand='Orbit AI (fictional)', kind='app', root='.cs-page', prefix='cs-',
    files=['src/components/CaseStudy/CaseStudy.tsx', 'src/components/CaseStudy/CaseStudy.css', 'src/styles/tokens.css'],
    entry='src/components/CaseStudy/CaseStudy.tsx', props='`CaseStudyTemplate` accepts optional string props name, overview and scope (defaults provided)',
    summary='Dark portfolio case-study page on a 1280x800 scrolling canvas: sticky header, a sticky Name / Overview / Scope panel on the left and a stack of scaled product screens on the right.',
    features=['Sticky header with logo, mono nav and two buttons', 'Sticky details panel (Name, Overview, Scope)', 'Product screens designed on a 1140x662 canvas and scaled to the column width',
              'Screens: sky banner, Starter/Pro plan chooser, connect-apps dialog, welcome, new chat, artifacts'],
    gaps=['Screens are illustrations, not interactive', 'Single dark theme'],
    design=['Page background #000, text #fff, hairlines `rgb(255 255 255 / .14)`', 'Mono labels: uppercase, letter-spacing .08em', 'Product screens are light cards on the dark page'],
    edit=['Edit copy through the name, overview and scope props', 'Add a screen by adding a 1140x662 block to the screen stack', 'Keep the sticky behavior of the left panel'])

add('ai-workspace-demo', name='AI workspace demo', brand='Orbit (fictional)', kind='app', root='.ws-frame', prefix='ws-',
    files=['src/components/Workspace/Workspace.tsx', 'src/components/Workspace/Workspace.css', 'src/components/Switch/Switch.tsx', 'src/components/Switch/Switch.css', 'src/styles/tokens.css'],
    entry='src/components/Workspace/Workspace.tsx', props='`WorkspaceDemo({ defaultTheme?: "light" | "dark" })`',
    summary='A working AI-assistant app with its own light/dark theme: chat, agent mode, apps marketplace, artifacts, plans and mobile pairing.',
    features=['Chat / Agent mode tabs and sidebar navigation', 'Search box (Ctrl+K inside the app) that jumps to pages, projects, chats and apps', 'Connect-your-apps dialog',
              'New chat composer with simulated replies and a model menu with usage bars', 'Projects, Artifacts (New artifact adds a card), Apps marketplace (search, connect, disconnect)',
              'Plans (toasts), Active runs, Plugins (trigger and skill switches), Mobile pairing', 'State persists while the preview dialog is closed (the dialog keeps content mounted)'],
    gaps=['Replies are simulated', 'App tiles use generic icons, not real brand logos'],
    design=['Own theme tokens `--ws-*` on `.ws-frame`, switched by `data-theme` on that root', 'Outer frame padding 28px; sidebar and content are separate surfaces', 'Initial theme comes from the site theme or the `defaultTheme` prop'],
    edit=['Add a page: new nav entry + a page component + search index entry', 'Keep theme colors in the `--ws-*` variables', 'Simulated work must be cancelable and cleared on unmount'])

add('crm-workspace-demo', name='CRM workspace demo', brand='Meridian-style (fictional)', kind='app', root='.crm', prefix='crm-',
    files=['src/components/Crm/Crm.tsx', 'src/components/Crm/Crm.css', 'src/styles/tokens.css'],
    entry='src/components/Crm/Crm.tsx', props='`CrmDemo({ startAt?: "signup" | "app", defaultTheme? })`',
    summary='A working CRM app with its own light/dark theme: sign-up, company setup, companies table, inbox, Coworker, compose email.',
    features=['Sign-up with validation and an animated company-setup checklist (respects reduced motion)', 'Quick Actions command box (compose, new company, theme, open pages)',
              'Getting Started checklist popover with progress ring and Finish All', 'Companies table: view/category select, sort by revenue, search, column settings, row select, New Company dialog, totals footer',
              'Inbox with 8 conversations, activity timeline, simulated reply, status control and a Coworker side panel', 'Compose email dialog with recipient chips and an @ variable picker'],
    gaps=['Column-settings menu closes with Esc or its button, not on outside click', 'Agents, Schedule, Customers, Escalations, Report and Apps pages are placeholders'],
    design=['Own tokens `--c-*` on `.crm`, dark values on `.crm[data-theme="dark"]`', 'Fictional companies and own SVG skyline made from rectangles', '`startAt="signup"` is used for the new-tab page, `"app"` for the library preview'],
    edit=['Add a page: sidebar item + page component + Quick Actions entry', 'Keep `--c-*` variables for every color', 'Clear every timer on unmount'])

add('company-intelligence-demo', name='Company intelligence demo', brand='Beacon (fictional)', kind='app', root='.ag', prefix='bc- (page) and ag- (shared)',
    files=['src/components/Agents/Beacon.tsx', 'src/components/Agents/Beacon.css', 'src/components/Agents/shared.tsx', 'src/components/Agents/Agents.css', 'src/styles/tokens.css'],
    entry='src/components/Agents/Beacon.tsx', props='`BeaconDemo({ startAt?: "list" | "detail", defaultTheme? })`',
    summary='A private-market research app: animated ASCII sky banner, company lists, command palette and a company detail page.',
    features=['Animated ASCII-art sky banner (static under reduced motion)', 'Featured / New this week / Watchlist tabs, filter, sortable funding column, growth bars, watch stars',
              'Command palette with Companies / People / Investors tabs, arrow keys and Enter (Ctrl/Cmd K once focus is inside the demo)', 'Company page with funding chart, signals, people and investors',
              'Workspace menu with an appearance switch'],
    gaps=['Data is fictional and static', 'Built from a description card, not from the original screens'],
    design=['Shared tokens `--a-*` on `.ag`, dark values on `.ag[data-theme="dark"]`', 'Shared Modal, Toggle, ThemeSwitch and toast live in `shared.tsx`', 'Page-specific styles live in Beacon.css'],
    edit=['Put reusable pieces in shared.tsx, page styles in Beacon.css', 'Keep the palette keyboard-operable', 'Fictional company names only'])

add('ai-platform-demo', name='AI platform demo', brand='Harbor (fictional)', kind='app', root='.ag', prefix='hb- (page) and ag- (shared)',
    files=['src/components/Agents/Harbor.tsx', 'src/components/Agents/Harbor.css', 'src/components/Agents/shared.tsx', 'src/components/Agents/Agents.css', 'src/styles/tokens.css'],
    entry='src/components/Agents/Harbor.tsx', props='`HarborDemo({ startAt?: View, defaultTheme? })`',
    summary='A secure AI platform: chat, assistants, knowledge, integrations and a developer console in one app.',
    features=['Chat with suggestion chips, typing indicator and keyword-matched replies', 'Model picker with hover tooltips', 'Assistants and Knowledge toggles', 'Integrations connect/disconnect',
              'Console with API keys (spend bars, revoke) and a three-step create-key wizard', 'Getting started popover that reacts to user actions'],
    gaps=['Replies are keyword-matched, not real', 'Built from a description card'],
    design=['Shared tokens `--a-*` on `.ag`', 'Popovers close on outside click through the shared `useOutside` hook', 'Page styles in Harbor.css'],
    edit=['Add a view: nav item + view component + Getting started step if relevant', 'Reuse the shared Modal and Toggle', 'Keep copy generic, no real vendors'])

add('agent-builder-demo', name='Agent builder demo', brand='Pairwise (fictional)', kind='app', root='.ag', prefix='pw- (page) and ag- (shared)',
    files=['src/components/Agents/Pairwise.tsx', 'src/components/Agents/Pairwise.css', 'src/components/Agents/shared.tsx', 'src/components/Agents/Agents.css', 'src/styles/tokens.css'],
    entry='src/components/Agents/Pairwise.tsx', props='`PairwiseDemo({ startAt?: Stage, defaultTheme? })`',
    summary='A platform for building and running autonomous agents from a prompt: sign-in, plan, run, approval, publish and credits.',
    features=['Validated split sign-in', 'Prompt becomes a plan that runs, pauses for approval, then shows a chat post with a code diff', 'Publish and Share dialogs', 'Discover with search and category pills',
              'Credits page with slider and tier highlight, credits menu'],
    gaps=['The run is a timed script', 'Built from a description card'],
    design=['Shared tokens `--a-*` on `.ag`', 'Approval step must block until the user chooses', 'Page styles in Pairwise.css'],
    edit=['Add a stage by extending the Stage type and the run script', 'Keep every timer cancelable', 'Never auto-approve'])

add('build-agent-demo', name='Build agent demo', brand='ChirpApp (fictional)', kind='app', root='.ba', prefix='ba- (page) and ag- (shared)',
    files=['src/components/BuildAgent/BuildAgent.tsx', 'src/components/BuildAgent/BuildAgent.css', 'src/components/Agents/shared.tsx', 'src/components/Agents/Agents.css', 'src/styles/tokens.css'],
    entry='src/components/BuildAgent/BuildAgent.tsx', props='`BuildAgentDemo({ startAt?: "home" | "thread", defaultTheme? })`',
    summary='A desktop-style coding-agent workspace for building and testing mobile apps, with a live phone simulator and annotation mode.',
    features=['New-thread screen: composer, plugin chip, approval-mode and model dropdowns, dictation button, project/where/branch pickers, idea chips',
              'Thread with a live Working-for-Ns divider, streamed messages and step lines, permission request (Allow/Deny) and a Stop button',
              'Environment card: changes counter, branch, Commit or push dialog, tasks, browser', 'Live iPhone simulator pane: favorites, overflow and share menus, rotate, reload, dark',
              'Annotation mode: click an element, type feedback, send; the fix visibly changes the phone, with Undo and a diff Review dialog'],
    gaps=['All run logic is a timed script', 'Fictional app ChirpApp and fictional file names; no real product names'],
    design=['Uses the shared `--a-*` tokens plus `ba-` layout classes', 'Simulator is a generic phone, scaled to fit its pane', 'Annotation outlines are green'],
    edit=['Extend the run script, never add unbounded timers', 'Every script step must be cancelable', 'Keep the simulator generic (no brand marks)'])

add('liquid-glass-chat', name='Liquid glass chat', brand='fictional names and messages', kind='app', root='.lq', prefix='lq-',
    files=['src/components/LiquidChat/LiquidChat.tsx', 'src/components/LiquidChat/LiquidChat.css', 'src/styles/tokens.css'],
    entry='src/components/LiquidChat/LiquidChat.tsx', props='`LiquidChatDemo({ startAt?: "inbox" | "chat", defaultTheme? })`',
    summary='An iOS-style messaging demo in the Liquid Glass look, shown inside a scaled 390x844 phone with its own light/dark theme.',
    features=['Messages inbox, "Your circle" ribbon (tap or drag vertically), compose sheet, live search, All / Unread / Groups', 'Chat with glass header buttons, bubbles, photo bubble with caption chip and tap-to-zoom viewer',
              'Double-click hearts, glass composer and send button, enter animation, typing dots and a simulated reply', 'More menu (mute, share photo, clear chat) and attach menu'],
    gaps=['Lens rim uses SVG feTurbulence + feDisplacementMap via backdrop-filter (Chromium only; others get a plain rim)', 'No story rail, voice or video'],
    design=['Own tokens on `.lq`, dark values on `.lq[data-theme="dark"]`', 'Glass = translucent fill + backdrop blur/saturate + specular top edge + sheen', 'Hidden screens use `inert`'],
    edit=['Keep glass values in the `.lq` variables', 'Faces and the coastal scene are own SVG; never add photos', 'Respect reduced motion for the enter animation'])


# ---- App category (mobile elements shown in a phone frame) ----
add('home-screen', name='Home screen', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/HomeScreen.tsx  (the example shown in the preview)', 'src/components/AppUI/AppBar.tsx', 'src/components/AppUI/Cards.tsx', 'src/components/AppUI/TabBar.tsx', 'src/components/AppUI/Fab.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/HomeScreen.tsx', props='none (the example is self-contained)',
    summary='Mobile home: greeting app bar, week strip, a task card with a filter and a floating tab bar with a round action button.',
    features=['Large app bar with greeting, italic subtitle and a sun icon action', 'WeekStrip with Wednesday selected', 'Task card: segmented filter and two titled checkbox sections', 'Floating TabBar with a dark Fab'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`'],
    edit=['Compose changes in `examples/HomeScreen.tsx`', 'Change a part in its own file (AppBar, Cards, TabBar, Fab), not in the example', 'Keep the phone safe areas clear (status bar, home indicator)'])
add('floating-tab-bar', name='Floating tab bar', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/FloatingTabBar.tsx  (the example shown in the preview)', 'src/components/AppUI/TabBar.tsx', 'src/components/AppUI/Fab.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/FloatingTabBar.tsx', props='`TabBar({ items, label?, value?, defaultValue?, onChange?, floating?, action? })`',
    summary='Pill-shaped bottom navigation that floats above content; only the active tab shows its label inside a raised pill; an optional round action sits beside it.',
    features=['Items fill the bar width; the active item is wider and animated', 'Bar uses a light-gray fill in light mode; the active pill is lifted above the bar in dark mode', 'Optional action button (Fab)'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`', 'Every tab keeps an aria-label even when its text is hidden; `aria-current="page"` on the active tab'],
    edit=['Edit behavior in `TabBar.tsx`, look in the TabBar section of AppUI.css', 'Keep the dark-mode pill lighter than the bar', 'Keep items filling the bar so there is no empty stretch beside the action'])
add('app-bar', name='App bar', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/AppBarExample.tsx  (the example shown in the preview)', 'src/components/AppUI/AppBar.tsx', 'src/components/AppUI/icons.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/AppBarExample.tsx', props='`AppBar({ title, subtitle?, large?, onBack?, action? })`',
    summary='Top bar for mobile screens: a centered title with a back button, or a large greeting with a muted italic subtitle and a raised icon action.',
    features=['Compact variant with back button', 'Large variant with subtitle and action', 'An empty action slot is hidden (no empty circle)'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`'],
    edit=['Edit `AppBar.tsx` for behavior and the `.app-bar*` rules in AppUI.css for look', 'Keep the title an `<h2>` and the back button labelled "Back"'])
add('week-strip', name='Week strip', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/WeekStripExample.tsx  (the example shown in the preview)', 'src/components/AppUI/Cards.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/WeekStripExample.tsx', props='`WeekStrip({ days, defaultValue?, onChange? })` (`WeekDay = { id, day, date }`)',
    summary='Horizontal day picker; the selected day sits in a soft raised pill.',
    features=['Six days with a weekday and date each', 'Controlled by `defaultValue` and `onChange(id)`'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`', 'Each day is a toggle button with `aria-pressed`'],
    edit=['Edit `WeekStrip` in `Cards.tsx`', 'Keep the group labelled and each day a 44px target'])
add('task-list', name='Task list', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/TaskList.tsx  (the example shown in the preview)', 'src/components/AppUI/Cards.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/TaskList.tsx', props='`AppCard({ label?, children })`',
    summary='Checklist card with a To do / Completed / Pending filter and titled sections of real checkboxes.',
    features=['Segmented filter (radio group)', 'Two titled sections with checkboxes'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`'],
    edit=['Edit `TaskCard` in `examples/data.tsx` for content', 'Edit `AppCard` in `Cards.tsx` for the card'])
add('balance-card', name='Balance card', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/BalanceCardExample.tsx  (the example shown in the preview)', 'src/components/AppUI/Cards.tsx', 'src/components/AppUI/icons.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/BalanceCardExample.tsx', props='`BalanceCard({ label?, amount, primary?, actions? })`',
    summary='High-contrast dark card with a label, a large amount, a white primary pill and two secondary actions.',
    features=['White-on-black text that meets WCAG AA', 'Primary pill plus secondary actions as real buttons'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`'],
    edit=['Edit `BalanceCard` in `Cards.tsx`', 'Pass actions as buttons through the `actions` prop'])
add('tracking-steps', name='Tracking steps', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/TrackingSteps.tsx  (the example shown in the preview)', 'src/components/AppUI/Cards.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/TrackingSteps.tsx', props='`TrackSteps({ steps })` (`TrackStep = { label, time, state }`)',
    summary='Horizontal progress line with a dot per step: done steps are filled and connected, the active step is filled, the rest are muted.',
    features=['Ordered list with `aria-current="step"` on the active step', 'State is also shown with text and a check mark, not color alone'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`'],
    edit=['Edit `TrackSteps` in `Cards.tsx`', 'Never convey state by color alone'])
add('grouped-list', name='Grouped list', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/GroupedList.tsx  (the example shown in the preview)', 'src/components/AppUI/ListRow.tsx', 'src/components/AppUI/icons.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/GroupedList.tsx', props='`ListRow({ icon?, title, value?, trailing?, onClick? })`, `ListGroup({ label?, children })`',
    summary='Inset grouped list like a mobile settings screen: icon tile, title, optional value, then a chevron or a control.',
    features=['Rows with icon, title, value and a Switch', 'Rows are buttons only when clickable', 'Rows are at least 48px tall'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`'],
    edit=['Edit `ListRow.tsx`', 'Pass `trailing={false}` to hide the chevron'])
add('bottom-sheet', name='Bottom sheet', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/BottomSheetExample.tsx  (the example shown in the preview)', 'src/components/AppUI/BottomSheet.tsx', 'src/components/AppUI/ListRow.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/BottomSheetExample.tsx', props='`BottomSheet({ title, children, footer? })`',
    summary='Panel that slides up from the bottom of a mobile screen: drag handle, title, content rows and stacked full-width actions.',
    features=['White sheet over a dimmed (32% black) scrim so the borderless phone stays visually whole', 'Footer buttons are 48px tall'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`', 'When used as a modal it must trap focus, close on Escape and restore focus'],
    edit=['Edit `BottomSheet.tsx`', 'Mount it inside your own overlay or `<dialog>`; it is presentational'])
add('floating-action-button', name='Floating action button', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/FloatingActionButton.tsx  (the example shown in the preview)', 'src/components/AppUI/Fab.tsx', 'src/components/AppUI/icons.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/FloatingActionButton.tsx', props='`Fab({ icon?, label?, tone?: "accent" | "dark", ...button props })`',
    summary='Round primary action button that floats above content; accent or dark tone; an extended pill when it has a label.',
    features=['Default plus icon with `aria-label="Create"`', '52px target; press feedback scales to 94%'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`'],
    edit=['Edit `Fab.tsx`', 'Keep an accessible name when it is icon-only'])
add('story-rings', name='Story rings', brand='none (generic sample content)', kind='phone', root='.app-phone', prefix='app-',
    files=['src/components/AppUI/examples/StoryRings.tsx  (the example shown in the preview)', 'src/components/AppUI/StoryRing.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/StoryRings.tsx', props='`StoryRow({ stories })` (`Story = { name, initials, seen? }`)',
    summary='Horizontally scrolling row of avatars with a gradient ring for unseen stories and a muted ring once seen.',
    features=['Gradient ring is 4px with a 2px gap around the avatar', 'Seen stories use a muted gray ring', 'Each button names whether the story is new'],
    gaps=['Presentational only: no navigation or persistence'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 44px; pills and buttons use `--radius-full` or `--radius-3xl`'],
    edit=['Edit `StoryRing.tsx` and the `.app-story*` rules', 'The ring is decorative; keep the accessible name on the button'])


# ---- App items rebuilt from the user's Stitch screens (own code, own CSS; layout and content only) ----
add('finance-dashboard', name='Finance dashboard', brand='none (fictional sample data)', kind='phone', root='.app-phone', prefix='fin-',
    files=['src/components/AppUI/examples/FinanceDashboard.tsx  (the example shown in the preview)', 'src/components/AppUI/Finance.tsx', 'src/components/AppUI/Finance.css', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/FinanceDashboard.tsx', props='`FinanceHeader`, `BalanceHero`, `QuickActions`, `NegotiatorCard`, `BillList`, `FinanceTabs`, `FinanceScroll` (all in Finance.tsx); `PhoneFrame({ hero? })`',
    summary='Banking home screen: a blue gradient hero with greeting, total balance and quick actions, a savings suggestion card, a filterable bill list and a bottom tab bar.',
    features=["Eye button hides and shows the balance and today's amount", 'Bills filter: All bills / Needs action (only bills marked `urgent`)', '"Start negotiation" changes to a disabled "Request sent" state', 'Tab bar marks the pressed item with `aria-current="page"`', 'Content scrolls inside the phone; the tab bar stays pinned'],
    gaps=['Presentational: no real accounts, navigation or persistence', 'Built from the layout of a Stitch design; brand names and the photo avatar were replaced with fictional content and initials'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 40px; pills and buttons use `--radius-full` or 16 to 22px radii', 'Hero: accent gradient behind the status bar (white status text), fading into `--app-card-bg` by about 380px', 'Balance 30px bold with tabular figures; quick actions are white pills plus a dark square scan button', 'Cards are white (`--surface`) with a soft shadow on the gradient'],
    edit=['Compose in `examples/FinanceDashboard.tsx`', 'Change pieces in `Finance.tsx` and their look in `Finance.css` (`fin-` classes)', 'Pass `hero` to `PhoneFrame` for the gradient', 'Keep every sample name, amount and merchant fictional'])
add('invoice-detail', name='Invoice detail', brand='none (fictional sample data)', kind='phone', root='.app-phone', prefix='inv-',
    files=['src/components/AppUI/examples/InvoiceDetail.tsx  (the example shown in the preview)', 'src/components/AppUI/Finance.tsx', 'src/components/AppUI/Finance.css', 'src/components/AppUI/AppBar.tsx', 'src/components/AppUI/PhoneFrame.tsx', 'src/components/AppUI/AppUI.css', 'src/styles/tokens.css'], entry='src/components/AppUI/examples/InvoiceDetail.tsx', props='`InvoiceSummary`, `InvoiceParty`, `InvoiceItems`, `InvoiceActions` (in Finance.tsx); `AppBar`',
    summary='Mobile invoice screen: top bar, invoice number with a paid badge, total and two dates, a billed-to card, an item table with subtotal, tax and total, and Download and Share actions.',
    features=['Subtotal, tax and total are computed from the line items, and the header total matches the table total', 'Download PDF briefly shows "Saved"; Share briefly shows "Link copied" (about 1.6s, timer cleared on unmount)', 'Table has column headers with `scope="col"`; dates and totals are description lists', 'Content scrolls inside the phone; the actions stay pinned above the home indicator'],
    gaps=['Presentational: no real invoice data, PDF or share sheet', 'Built from the layout of a Stitch design; the second date label (a duplicate "Issued date" in the original) became "Due date", and the header total (it disagreed with the table) now equals the table total'],
    design=['Phone frame is 320x660 with a flat rounded screen, no bezel; the screen is `--surface` with soft gray cards via `--app-card-bg`', 'Touch targets are at least 40px; pills and buttons use `--radius-full` or 16 to 22px radii', 'Cards use `--app-card-bg` (gray on the white screen); the total is 30px bold with tabular figures', 'Dashed divider below the summary; the primary action uses `--accent`', 'Avatar is initials on a soft pink tile'],
    edit=['Compose in `examples/InvoiceDetail.tsx`', 'Change pieces in `Finance.tsx` and their look in `Finance.css` (`inv-` classes)', 'Money is formatted in `InvoiceItems`; keep totals derived, never typed twice'])


def bullets(items):
    return '\n'.join(f'- {i}' for i in items)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf8', newline='\n') as f:
        f.write(text.strip('\n') + '\n')


def gen(t):
    d = os.path.join(ROOT, t['slug'])
    if os.path.isdir(d):
        shutil.rmtree(d)
    n, slug = t['name'], t['slug']
    phone = t['kind'] == 'phone'
    canvas = t['kind'] in ('canvas', 'phone')
    where = 'Find it in the App section of the homepage and open its large preview (the Code tab shows the real files).' if phone else f"Open it full window at `/?template={slug}`."
    run_where = 'the App section of `http://localhost:5173` (open the tile large preview)' if phone else f'`http://localhost:5173/?template={slug}`'
    lib_file = 'src/pages/Library/libraryItems.tsx' if phone else 'src/pages/Library/templates.tsx'

    write(os.path.join(d, 'Context.md'), f"""
# {n}: Context

> Living document for the **{n}** template. Update it in the same commit as every change to this template.
> Last updated: {TODAY}

## What this is
{t['summary']}

Brand: {t['brand']}. {where}

## Real files
{bullets(f"`{f}`" for f in t['files'])}

Public API: {t['props']}.

## What it does
{bullets(t['features'])}

## Known gaps
{bullets(t['gaps'])}

## How it is wired into the library
- The library entry is `{n}` in `{lib_file}` (`sourceEntries` points at the entry file above).
- The Code tab of the preview reads these real files; this `helper/` folder ships next to them.
- Changing a file listed above changes what the Code tab shows.

## Design bench
- The real design is recorded as {len(BENCH[slug]['light'])} light probes and {len(BENCH[slug]['dark'])} dark probes in `design.md` ("Bench reference"), measured {BENCH['_meta']['measured']} from the running design.
- Bench URL: `/?template={slug}&bench=1&theme=light` (and `theme=dark`), viewport 1440x900, zoom 100%.
- Run it with the `verify-template` skill. A change is not done until both themes print `PASS`.
- Re-measure (only when the user asked for a design change): see step 9 of that skill, and update `scripts/bench-reference.json`.
""")

    write(os.path.join(d, 'guidelines.md'), f"""
# {n}: Guidelines

Product and copy guidelines. These are requirements, not suggestions.

## Product
- Keep the template a finished, believable screen. {'It is a presentational mobile component shown inside the phone frame: no behavior beyond its documented props.' if phone else 'It is a static layout: do not add fake behavior.' if canvas else 'It is a working demo: every control that looks clickable must do something visible.'}
- Scope: {t['summary']}
- Do not add pages, sections or features that the request did not ask for.
- Never add a Pricing page unless the user asks.

## Copy
- Use plain, specific placeholder copy. No lorem ipsum, no "Click here".
- Brand and data are fictional ({t['brand']}). No real company names, logos, people or product names.
- Sentence case for buttons and headings. No exclamation marks.

## Behavior
{'- Presentational: keep state local and minimal; callbacks come in as props.' if phone else '- Static layout: keep it free of timers and state.' if canvas else '- State survives closing the preview dialog (the dialog keeps content mounted); do not reset state on blur.'}
{'- ' if False else ''}- Anything simulated (replies, runs, uploads) must be cancelable and must clear its timers on unmount.
- Respect `prefers-reduced-motion`: animations stop or become instant.

## Layout
{'- The component is designed for the 320x660 phone frame (`PhoneFrame`). Do not use viewport units; it must also render in the library tile at reduced size.' if phone else '- The canvas is fixed at 720x440 and scaled by the library with CSS zoom. Do not use viewport units inside it.' if canvas else '- The root fills its container (width and height 100%). It must work at the 1200x740 library preview size and full window in a new tab.'}
- Text must not clip or overlap at the design size. Check long names and long numbers.

## Out of scope
- Backend calls, real authentication, analytics, third-party scripts, remote images or fonts.
""")

    tokens_line = ('Use the library tokens directly.' if canvas else f"This template defines its own scoped theme variables on `{t['root']}` (light) and `{t['root']}[data-theme=\"dark\"]`. Use those variables for colors; fall back to library tokens for spacing, radius and type.")
    write(os.path.join(d, 'design.md'), f"""
# {n}: Design

Visual specification. Match it exactly; do not restyle from memory.

## Tokens
{tokens_line}

Library tokens (`src/styles/tokens.css`):
{TOKEN_LIST}

## Specification
{bullets(t['design'])}

## Typography
- Inter (`--font-sans`). Body 14px/20px, small 12px, headings 16-18px weight 600 unless the specification above says otherwise.
- Numbers that update use tabular figures.

## States every interactive element must have
- Default, hover, focus-visible (2px ring, `--focus-ring` or the template's own ring variable), pressed, disabled (50% opacity, `not-allowed`).
- Selected / current state is shown with more than color (weight, outline or marker).

## Light and dark
- {'Follows the site theme through `[data-theme]` on `<html>`.' if canvas else 'Has its own light/dark switch on its root; the initial value is the site theme or the `defaultTheme` prop.'}
- Never hard-code a color that is not defined for both themes.

## Motion
- 150-250ms ease-out for state changes. No bounce except where the specification says so.
- Everything animated must stop under `prefers-reduced-motion: reduce`.

## Bench reference
This is the real design, measured from the running app. It is the only accepted definition of "the design is right". Do not edit it to make a failure pass.

- Measured: {BENCH['_meta']['measured']}, at `/?template={slug}&bench=1&theme=light` and `theme=dark`, viewport 1440x900, zoom 100%.
- Light: {len(BENCH[slug]['light'])} probes. Dark: {len(BENCH[slug]['dark'])} probes. A probe is kept only if it measured identically in two samples taken 1.5 s apart.
- Light row: `[key, x, y, width, height, font-size, font-weight, color, background, border-radius, text-x, text-y, text-width, text-height]`. Positions are in px relative to the top-left of `#bench-root`; the text box is the box of the element's own text (0s when it has none).
- Dark row: `[key, color, background]`.
- Tolerance: every position and size (element and text) +-1 px. Everything else must be identical, character for character.
- `key` is `tag[role]|text-or-label#n` (the n-th element with that prefix, in DOM order).

```json
{json.dumps({'light': BENCH[slug]['light'], 'dark': BENCH[slug]['dark']}, separators=(',', ':'), ensure_ascii=False)}
```
""")

    ag = os.path.join(d, 'agent')
    write(os.path.join(ag, 'Agent.md'), f"""
# Agent contract: {n}

You are changing the **{n}** {'component' if phone else 'template'} of Devus UI. This folder is the source of truth. Follow it exactly.

## Read protocol (strict)
1. Read every file in the order below, in full, top to bottom. Not skimmed. Not summarized from memory.
2. Before your first edit, post a **read receipt**: for each file its path and its line count (count them), plus one hard rule copied verbatim from this file. No receipt means you are not briefed; do not edit.
3. MUST, NEVER and "required" mean exactly that. "Prefer" and "should" are defaults; deviate only with a stated reason.
4. If two files disagree, this order wins: `Agent.md`, `rules/`, `design.md`, `guidelines.md`, `Context.md`. Report the conflict; do not pick silently.
5. If something is not written here, it is not allowed by default. Ask.

## Read in this order
1. `../Context.md` what exists, what is unfinished, and the bench coverage
2. `../guidelines.md` product and copy requirements
3. `../design.md` the visual specification and the **bench reference** (the real design, measured)
4. `rules/` every file, in numeric order
5. `skills/` `verify-template` (the bench) always; `edit-{slug}` for your task

## Hard rules (a change that breaks one is rejected)
1. Edit only the files listed under "Real files" in `../Context.md`, plus new files inside the same folder. The only other files you may touch are `../Context.md` (rule 6) and the bench reference (rule 8).
2. Colors, spacing, radii and type come from tokens. See `rules/01-tokens.md`.
3. Everything is original. See `rules/03-originality.md`. Never mention the upstream design system's name anywhere.
4. Keyboard and screen-reader support is required. See `rules/02-accessibility.md`.
5. Follow `rules/04-code-structure.md` for naming, props and cleanup.
6. Follow `rules/05-workflow.md`: commit locally, push only when the user says "push", update `../Context.md` in the same commit.
7. The design is correct only if the bench says so. Run the bench in `skills/verify-template/SKILL.md` against the real design in `../design.md` and report its output as printed. See "Reporting" in `rules/05-workflow.md`.
8. Do not edit the bench reference to turn a FAIL into a PASS. It changes only when the user asked for that exact design change (step 9 of the skill).

## Definition of done
- [ ] Read receipt posted before the first edit
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Bench, light: `PASS n/n probes` (output quoted)
- [ ] Bench, dark: `PASS n/n probes` (output quoted)
- [ ] The {'component' if phone else 'template'} was used by hand ({run_where}), light and dark, and the console has no new errors
- [ ] `../Context.md` is updated (files, features, gaps, date)
- [ ] The change is committed locally with a clear message
- [ ] The final report lists everything that was **not** checked

## When unsure
Ask one specific question instead of guessing. Do not widen scope.
""")

    write(os.path.join(ag, 'rules', '01-tokens.md'), f"""
# Rule 01: Design tokens only

- Use CSS variables for every color, spacing step, radius and font size.
- No new hex colors in this template unless they are added to its scoped variables for BOTH light and dark.
- Scope for this template: {'library tokens (`src/styles/tokens.css`)' if canvas else f"scoped variables on `{t['root']}` plus library tokens"}.
- Dark mode is `[data-theme="dark"]`. A shadow list must never contain the bare word `none` between commas (it invalidates the whole declaration); use a zero shadow such as `0 0 0 0 #0000`.

## Available tokens
{TOKEN_LIST}
""")

    write(os.path.join(ag, 'rules', '02-accessibility.md'), """
# Rule 02: Accessibility

- Use native elements first: `button`, `a`, `input`, `label`, `dialog`. Add ARIA only when no native element fits.
- Every input has a visible label or an `aria-label`. Icon-only buttons have `aria-label`.
- Everything reachable by mouse is reachable by keyboard, in a sensible tab order. Menus and palettes support arrow keys, Enter and Escape.
- Focus is always visible (2px ring). Never `outline: none` without a replacement.
- Dialogs and popovers: Escape closes, focus returns to the trigger.
- Color contrast meets WCAG AA (4.5:1 for body text).
- Status changes are announced (`role="status"` or `aria-live="polite"`).
- Respect `prefers-reduced-motion`.
- Hidden screens use `inert` or `hidden` so they leave the tab order.
""")

    write(os.path.join(ag, 'rules', '03-originality.md'), f"""
# Rule 03: Originality

- Every line of code, every asset and every word of copy is original.
- References (screenshots, sites, videos) inform layout and interaction only. Never copy their code, images, logos, icons, illustrations or text.
- Brand, people, companies and data are fictional ({t['brand']}). No real logos or product names.
- Art is own SVG or CSS. No remote images, no stock photos.
- Never mention the name of the upstream design system anywhere: not in the app, code, copy, comments or prompts.
- If a third-party library is used, it is named only in imports and package.json.
""")

    write(os.path.join(ag, 'rules', '04-code-structure.md'), f"""
# Rule 04: Code structure

## Files
{bullets(f"`{f}`" for f in t['files'])}

## Conventions
- Entry component: `{t['entry']}`. Public API: {t['props']}.
- CSS class prefix: `{t['prefix']}`. Root selector: `{t['root']}`. Do not use unprefixed class names.
- Plain CSS next to the component. No Tailwind, no CSS-in-JS, no new runtime dependency.
- TypeScript strict: no `any`, no non-null assertions on user data. `npm run typecheck` must pass.
- Function components and hooks only. Derived values are computed, not stored.
- Timers, intervals, observers and listeners are created in effects and cleaned up on unmount.
- Keep files focused. If a file grows past a clear boundary, split by feature inside the same folder.
- Comments explain why, not what. Keep the existing density.
""")

    write(os.path.join(ag, 'rules', '05-workflow.md'), """
# Rule 05: Workflow and reporting

## Workflow
1. Make one coherent change at a time.
2. Run `npm run typecheck`, then `npm run build`.
3. Run the bench (`../skills/verify-template/SKILL.md`). It is required, not optional.
4. Use it by hand in the browser (`npm run dev`), light and dark, and read the console.
5. Update `../../Context.md` (files, features, gaps, "Last updated").
6. Commit locally in the same commit as the change. Git identity for this repo: `paneledison-prog` / `paneledison@gmail.com`.
7. **Push only when the user says "push".** Never force-push. Never skip hooks.

## Reporting (no cap, no hype)
- Say what happened, with the evidence. Paste the bench `summary` line and any `failures` exactly as printed.
- If anything failed, the first line of your report says FAIL and names it.
- Never write "perfect", "pixel-perfect", "flawless", "exactly matches", "all good" or similar. A passing bench says `PASS n/n probes`; quote that, nothing stronger.
- Never round, estimate or paraphrase numbers. Copy them.
- A command or step you did not run is "not run". Do not imply it passed.
- List what the checks cannot see. The bench measures box, type, color and radius of the probes; it does not measure animation, hover or focus states, behavior, or copy outside the probes.
- Do not edit the bench reference, the tolerances or the snippet to get a pass.
- If the bench itself errors, it has not been run. Report that; do not substitute your own judgement.
""")

    write(os.path.join(ag, 'skills', f'edit-{slug}', 'SKILL.md'), f"""
---
name: edit-{slug}
description: Use when changing, extending or fixing the {n} template of Devus UI.
---

# Edit the {n} template

## Before you start
Read `../../../Context.md`, `../../../guidelines.md` and `../../../design.md`, then every file in `../../rules/`.

## Where things live
{bullets(f"`{f}`" for f in t['files'])}

## Steps
{chr(10).join(f"{i}. {s}" for i, s in enumerate(t['edit'], 1))}
{len(t['edit']) + 1}. Run the `verify-template` skill (the design bench). It must print PASS for light and dark.
{len(t['edit']) + 2}. Update `../../../Context.md` and commit locally.

## Do not
- Edit files outside the list above.
- Add dependencies, remote assets or real brand names.
- Push without the user saying "push".
""")

    write(os.path.join(ag, 'skills', 'verify-template', 'SKILL.md'), f"""
---
name: verify-template
description: Use after any change to the {n} {'component' if phone else 'template'} of Devus UI, and before saying it is done. Runs the design bench against the real design and reports pass or fail with the printed numbers.
---

# Verify {n}: the design bench

Read this whole file before running anything. Follow the steps in order. A step you did not run did not happen.

## What the bench is
The real design is recorded in `../../../design.md` under "Bench reference": {len(BENCH[slug]['light'])} light probes and {len(BENCH[slug]['dark'])} dark probes. Each probe is one element of the rendered design with its position and size (relative to `#bench-root`), the box of its own text, font size and weight, text color, background color and corner radius.

The bench measures the design you are running in exactly the same way and compares it probe by probe. Positions and sizes may differ by 1 px; everything else must be identical. A probe that is missing, moved, resized or recolored is a FAIL.

## What it cannot see
Animation, hover and focus states, behavior, and any copy or element that is not a probe. Those are checked by hand in step 10. Passing the bench does not mean the whole {'component' if phone else 'template'} is right; it means the probed design matches.

## Two modes
- **Change** (the usual case): you edited the {'component' if phone else 'template'}. The bench is a regression test. It must PASS unless the user asked for a design change (then see step 9).
- **Rebuild**: you rebuilt it from the master prompt. The bench is the fidelity test against the real design. It must PASS. Extra elements are allowed and are counted in the output.

## Steps
1. `npm run typecheck` must print no errors.
2. `npm run dev`.
3. Set the browser viewport to exactly **1440x900**, zoom 100%. Open `http://localhost:5173/?template={slug}&bench=1&theme=light`.
4. In that page, define `bench` by running the snippet below (browser console, devtools MCP, Playwright: anything that evaluates JavaScript in the page).
5. Copy the JSON object from the code block under "Bench reference" in `../../../design.md` and assign it: `const REF = ...`.
6. Run `await bench({{ ref: REF }})`.
7. Open the same URL with `theme=dark` (reload; the viewport stays 1440x900), define `bench` and `REF` again, run `await bench({{ ref: REF }})` again.
8. Read both results. Both `summary` values must be `PASS n/n probes`. Anything else is FAIL. A `viewport` failure means the bench was invalid: fix the viewport and rerun. If a result is FAIL: fix the code (never the reference), then restart from step 3.
9. **Only if the user asked for a design change:** after the bench shows the intended probes failing and nothing else, re-measure with `await bench({{ measure: true }})` in light and in dark, replace both arrays in `../../../design.md` and in `scripts/bench-reference.json` (dark rows are `[key, color, background]`), rerun steps 3 to 8, and list every probe that changed, with old and new values, in the commit message and in your report.
10. Use the {'component' if phone else 'template'} by hand ({run_where}): every control you touched, keyboard (Tab, Enter, Escape), light and dark, and read the browser console: no new errors or warnings.
11. Open the library tile and the large preview: it must still fit and not clip. Open the Code tab: the file tree must show the files listed in `../../../Context.md`.
12. `npm run build` must succeed.

## Report
Use this shape. Paste the printed lines; do not rewrite them.

```
Bench light: <summary line as printed>   extra elements not in reference: <number as printed>
Bench dark:  <summary line as printed>
failures: <none, or the failures array as printed>
typecheck: <pass | fail | not run>   build: <pass | fail | not run>   by hand: <what you did | not run>
Not checked: <everything the bench and your checks cannot see>
```

If anything is FAIL or "not run", the first line of the report says so. No other wording replaces these lines. See "Reporting" in `../../rules/05-workflow.md`.

## The snippet
Source of truth: `scripts/bench-snippet.js` in the repository. It is identical to this:

```js
{BENCH_SNIPPET}
```

Output of a compare run: `{{ theme, summary, pass, total, extraElementsNotInReference, failures, failureCount }}`. `failures` lists up to 80 entries such as `button|Get started#1 width: expected 96, got 104`.
""")


def main():
    os.makedirs(ROOT, exist_ok=True)
    for t in T.values():
        gen(t)
    write(os.path.join(ROOT, 'README.md'), """
# helper/

One folder per library template and per App item. Each is a real, committed set of instructions that an agent must follow when changing that template. They are shown as the `helper/` folder in the Code tab file tree of every template in the library.

Generated by `python scripts/generate-helper.py`; edit the facts in that script, then re-run it.

Every `design.md` carries a **bench reference**: the real design, measured from the running app (`scripts/bench-reference.json`). The `verify-template` skill runs the bench (`scripts/bench-snippet.js`) against it, and an agent must quote the printed result. To re-measure after an approved design change, see step 9 of that skill; then re-run the generator.

Layout of each `helper/<template>/`:

```
Context.md       what the template is, real files, status, gaps
guidelines.md    product and copy guidelines
design.md        visual specification
agent/
  Agent.md       operating contract (read order, hard rules, definition of done)
  rules/         tokens, accessibility, originality, code structure, workflow
  skills/        edit-<template>, verify-template
```
""")
    print('generated', len(T), 'helper folders')


main()
