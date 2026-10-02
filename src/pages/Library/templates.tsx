import type { LibraryItem } from './libraryItems';
import { templatePrompt } from './prompt';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import { Switch } from '../../components/Switch/Switch';
import { Badge } from '../../components/Badge/Badge';
import { Card } from '../../components/Card/Card';
import { Progress } from '../../components/Progress/Progress';
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar';
import { Logo } from '../../components/Logo/Logo';
import { CaseStudyTemplate } from '../../components/CaseStudy/CaseStudy';
import { WorkspaceDemo } from '../../components/Workspace/Workspace';
import { CrmDemo } from '../../components/Crm/Crm';
import { BeaconDemo } from '../../components/Agents/Beacon';
import { HarborDemo } from '../../components/Agents/Harbor';
import { PairwiseDemo } from '../../components/Agents/Pairwise';
import { BuildAgentDemo } from '../../components/BuildAgent/BuildAgent';
import { LiquidChatDemo } from '../../components/LiquidChat/LiquidChat';
import './templates.css';

function LandingTemplate() {
  return (
    <div className="tpl">
      <header className="tpl-nav">
        <Logo size={22} /><b>Acme</b>
        <span>Features</span><span>Docs</span><span>Changelog</span>
        <Button size="sm">Get started</Button>
      </header>
      <div className="tpl-hero">
        <Badge tone="accent">New release</Badge>
        <h1>Ship polished interfaces in half the time</h1>
        <p>A focused toolkit for teams that care about the details. Start free, upgrade when you grow.</p>
        <div className="tpl-row"><Button size="lg">Start free</Button><Button size="lg" variant="secondary">Live demo</Button></div>
      </div>
    </div>
  );
}

function DashboardTemplate() {
  return (
    <div className="tpl">
      <div className="tpl-shell">
        <aside className="tpl-side">
          <div className="tpl-side__brand"><Logo size={20} />Acme</div>
          <a aria-current="page">Overview</a><a>Projects</a><a>Reports</a><a>Team</a>
        </aside>
        <div className="tpl-main">
          <div className="tpl-main__head"><h2>Overview</h2><AvatarGroup><Avatar size="sm" fallback="AB" /><Avatar size="sm" fallback="CD" /></AvatarGroup></div>
          <div className="tpl-stats">
            <div className="tpl-stat"><small>Revenue</small><strong>$48.2k</strong><Badge tone="success">+12%</Badge></div>
            <div className="tpl-stat"><small>Active users</small><strong>2,931</strong><Badge tone="accent">+4%</Badge></div>
            <div className="tpl-stat"><small>Errors</small><strong>18</strong><Badge tone="danger">-2%</Badge></div>
          </div>
          <div className="tpl-panel"><Progress value={72} label="Quarterly goal" /><Progress value={41} label="Onboarding" /></div>
        </div>
      </div>
    </div>
  );
}

function SignInTemplate() {
  return (
    <div className="tpl">
      <div className="tpl-split">
        <div className="tpl-split__art"><Logo size={28} /><h2>Welcome back</h2><p>Pick up right where you left off.</p></div>
        <div className="tpl-split__form">
          <Card title="Sign in" description="Use your work email.">
            <TextField label="Email" type="email" placeholder="you@example.com" />
            <TextField label="Password" type="password" placeholder="Password" />
            <Button>Continue</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SettingsTemplate() {
  return (
    <div className="tpl">
      <div className="tpl-shell">
        <aside className="tpl-side">
          <div className="tpl-side__brand"><Logo size={20} />Settings</div>
          <a aria-current="page">Profile</a><a>Notifications</a><a>Security</a><a>Billing</a>
        </aside>
        <div className="tpl-main">
          <div className="tpl-main__head"><h2>Profile</h2><Button size="sm">Save changes</Button></div>
          <div className="tpl-panel">
            <TextField label="Display name" placeholder="Ada Lovelace" />
            <TextField label="Email" type="email" placeholder="ada@example.com" />
          </div>
          <div className="tpl-panel"><Switch label="Email me product updates" defaultChecked /><Switch label="Show my profile publicly" /></div>
        </div>
      </div>
    </div>
  );
}

type TemplateItem = Omit<LibraryItem, 'category'>;

export const templateItems: TemplateItem[] = [
  {
    name: 'Landing page',
    canvas: [720, 440],
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <LandingTemplate />,
    code: `<div className="page">\n  <header className="nav">\n    <Logo size={22} /> <b>Acme</b>\n    <Button size="sm">Get started</Button>\n  </header>\n  <section className="hero">\n    <Badge tone="accent">New release</Badge>\n    <h1>Ship polished interfaces in half the time</h1>\n    <p>A focused toolkit for teams that care about the details.</p>\n    <Button size="lg">Start free</Button>\n    <Button size="lg" variant="secondary">Live demo</Button>\n  </section>\n</div>`,
    prompt: templatePrompt('Landing page', 'Marketing page with a top nav, a centered hero with badge, headline, supporting text and two calls to action over a soft accent glow.', 'Logo, Badge, Button'),
  },
  {
    name: 'Dashboard',
    canvas: [720, 440],
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <DashboardTemplate />,
    code: `<div className="shell">\n  <aside className="side">\n    <Logo size={20} /> Acme\n    <a aria-current="page">Overview</a> <a>Projects</a> <a>Reports</a>\n  </aside>\n  <main>\n    <div className="stats">\n      <Stat label="Revenue" value="$48.2k"><Badge tone="success">+12%</Badge></Stat>\n      <Stat label="Active users" value="2,931"><Badge tone="accent">+4%</Badge></Stat>\n    </div>\n    <Progress value={72} label="Quarterly goal" />\n  </main>\n</div>`,
    prompt: templatePrompt('Dashboard', 'App shell with a sidebar, a header with team avatars, three stat cards and progress panels.', 'Logo, Badge, Progress, AvatarGroup'),
  },
  {
    name: 'Split sign in',
    canvas: [720, 440],
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <SignInTemplate />,
    code: `<div className="split">\n  <section className="art bg-aurora">\n    <h2>Welcome back</h2>\n    <p>Pick up right where you left off.</p>\n  </section>\n  <Card title="Sign in" description="Use your work email.">\n    <TextField label="Email" type="email" />\n    <TextField label="Password" type="password" />\n    <Button>Continue</Button>\n  </Card>\n</div>`,
    prompt: templatePrompt('Split sign in', 'Two-column authentication page: an aurora art panel on the left and the form on the right.', 'Card, TextField, Button, the Aurora background'),
  },
  {
    name: 'Settings page',
    canvas: [720, 440],
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <SettingsTemplate />,
    code: `<div className="shell">\n  <aside className="side">\n    <a aria-current="page">Profile</a> <a>Notifications</a> <a>Security</a>\n  </aside>\n  <main>\n    <Button size="sm">Save changes</Button>\n    <TextField label="Display name" />\n    <TextField label="Email" type="email" />\n    <Switch label="Email me product updates" defaultChecked />\n  </main>\n</div>`,
    prompt: templatePrompt('Settings page', 'Sidebar navigation with a profile form and preference toggles, plus a primary save action.', 'TextField, Switch, Button'),
  },
  {
    name: 'Case study',
    standalone: <CaseStudyTemplate />,
    variants: 1,
    tileZoom: 0.21,
    defaultZoom: 0.7,
    preview: <div style={{ width: 1280, height: 800, overflow: 'hidden', borderRadius: 16 }}><CaseStudyTemplate /></div>,
    code: `<CaseStudyTemplate\n  name="Orbit AI"\n  overview="A workspace for teams building with open models. We rebuilt the product around discovery, setup and secure deployment."\n  scope="Visual system, design direction, product redesign"\n/>`,
    prompt: templatePrompt('Case study', 'Dark portfolio case-study page. A thin sticky header (logo, mono nav, two buttons). Below it, two columns: on the left a sticky details list (Name, Overview, Scope) in small monospace labels; on the right a vertical stack of light product screens: a sky-gradient banner with an asterisk mark, a Starter / Pro plan chooser, a welcome screen, the same screen dimmed under a connect-your-apps dialog, a new-chat screen and an artifacts grid. Each product screen is designed on a fixed 1140x662 canvas and scaled to the column width.', 'a ScaledShot wrapper (ResizeObserver + CSS transform), app shell with sidebar, plan cards, dialog, composer'),
  },
  {
    name: 'AI workspace demo',
    standalone: <WorkspaceDemo />,
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    preview: <div style={{ width: 1200, height: 740 }}><WorkspaceDemo /></div>,
    code: `<WorkspaceDemo />\n\n// Start in dark mode:\n<WorkspaceDemo defaultTheme="dark" />`,
    prompt: templatePrompt('AI workspace demo', 'A working AI-assistant app with its own light and dark theme. Top bar with Chat / Agent mode tabs, a search box (Ctrl+K) that jumps to pages, projects, chats and apps, a theme toggle, notifications and invite. Left sidebar with navigation, projects, recents and a connect-apps footer. Views: Welcome (copy-to-clipboard command boxes, a terminal card, and a connect-your-apps dialog), New chat (a working composer with a model menu that shows usage bars, suggestion cards, simulated replies), Projects, Artifacts (New artifact adds a card), Apps marketplace (search, connect and disconnect toggles), Plans (Starter and Pro), Agent views (Active runs with progress, Plugins with trigger and skill switches, Mobile pairing with a phone mock). Light surface is white on #f2f2f2, dark surface is #1b1b1b on #2a2a2a, with a blue accent. No real third-party logos.', 'Switch, native form controls, role=tablist, role=dialog, aria-live thread'),
  },
  {
    name: 'CRM workspace demo',
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <CrmDemo startAt="signup" />,
    preview: <div style={{ width: 1200, height: 740 }}><CrmDemo startAt="app" /></div>,
    code: `<CrmDemo startAt="signup" />\n\n// Jump straight to the companies table:\n<CrmDemo startAt="app" />\n\n// Dark theme:\n<CrmDemo startAt="app" defaultTheme="dark" />`,
    prompt: templatePrompt('CRM workspace demo', 'A working CRM app with its own light and dark theme, built around flexible records, connected context and faster go-to-market workflows. Journey: (1) sign-up with username, work email and password (validated) above a fading line-art city skyline; (2) company setup that analyzes the email domain with a step checklist and a company card; (3) the app: sidebar with a workspace switcher, a quick-actions command box, inboxes, a Coworker assistant, General (Agents, Schedule, Customers, Companies, Emails, Report, Apps), favorites, and a Getting Started checklist popover with progress. Companies table: view select, sort by revenue, filter, search, column settings, row selection, New Company dialog, colored category pills, linked domains, founders and a totals footer. Inbox: conversation list, activity timeline, chat bubbles, a status control (open, in progress, resolved) and a Coworker side panel that drafts an email with Dismiss and Send. Compose email dialog with recipient chips and an @ variable picker (core and company variables shown as colored tokens). Coworker page with a composer and a connect-your-tools bar. All data is fictional; no real company logos.', 'native form controls, role=dialog, aria-live, a textarea mirrored by a highlighted layer for variable tokens'),
  },
  {
    name: 'Company intelligence demo',
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <BeaconDemo />,
    preview: <div style={{ width: 1200, height: 740 }}><BeaconDemo startAt="list" /></div>,
    code: `<BeaconDemo />

// Dark theme:
<BeaconDemo defaultTheme="dark" />`,
    prompt: templatePrompt('Company intelligence demo', 'A private-market research platform for tracking companies, people, funding and growth signals, with its own light and dark theme. Home: a top bar with brand, a search button that opens a command palette (Ctrl or Cmd K) with Companies, People and Investors tabs and arrow-key navigation, and a workspace menu with an appearance switch, a weekly email toggle, export and sign out. Below it an animated ASCII-art sky banner (static for reduced motion) and tabs Featured, New this week and Watchlist, a filter box and a companies table with sector, stage pill, sortable funding column, growth bars and a watch star. Company page: hero with logo tile and pills, funding rounds bar chart, growth signals with a score bar, people and investors. All data is fictional; no real company logos.', 'tab roles, listbox with aria-selected, role=dialog palette, aria-pressed on watch stars, reduced-motion respected'),
  },
  {
    name: 'AI platform demo',
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <HarborDemo />,
    preview: <div style={{ width: 1200, height: 740 }}><HarborDemo  /></div>,
    code: `<HarborDemo />

// Dark theme:
<HarborDemo defaultTheme="dark" />`,
    prompt: templatePrompt('AI platform demo', 'A secure AI platform that brings chat, company knowledge, assistants, integrations and a developer console into one app, with its own light and dark theme. Chat: empty state with suggestion chips, a composer, a model picker whose options show a tooltip explaining each model, simulated replies with a typing indicator. Assistants cards, Knowledge sources with toggles, Integrations with connect and disconnect. Console: API keys table with per-key spend bars that turn red above 80 percent, revoke, and a three-step create-key wizard (name, access and monthly limit slider, one-time secret with copy). Sidebar Getting started popover with progress that updates as the user acts. All data is fictional.', 'role=listbox for the model picker, role=tooltip, role=dialog wizard, switches with aria-checked, aria-current on navigation'),
  },
  {
    name: 'Agent builder demo',
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <PairwiseDemo />,
    preview: <div style={{ width: 1200, height: 740 }}><PairwiseDemo startAt="app" /></div>,
    code: `<PairwiseDemo />

// Dark theme:
<PairwiseDemo defaultTheme="dark" />`,
    prompt: templatePrompt('Agent builder demo', 'A platform for building and running autonomous agents from a simple prompt, with its own light and dark theme. Sign-in: split layout with an email form (validated) and line-art on the right. App: a prompt box with example chips that builds a plan; the plan runs step by step, pauses for approval before posting, then shows a chat post with a code diff. Finished runs can be Published (name, show in Discover toggle) or Shared (copyable link). Discover: search and category pills with Add buttons. Credits: a slider that estimates monthly credits and price with the matching tier highlighted, plus a credits menu with top-up and a theme switch. All data is fictional.', 'validated form with aria-invalid, role=dialog, aria-pressed pills, switch with aria-checked, reduced-motion respected'),
  },
  {
    name: 'Build agent demo',
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <BuildAgentDemo />,
    preview: <div style={{ width: 1200, height: 740 }}><BuildAgentDemo /></div>,
    code: `<BuildAgentDemo />\n\n// Jump straight into a running thread with the simulator:\n<BuildAgentDemo startAt="thread" />\n\n// Dark theme:\n<BuildAgentDemo defaultTheme="dark" />`,
    prompt: templatePrompt('Build agent demo', 'A desktop-style coding-agent workspace for building and testing mobile apps, with its own light and dark theme. New-thread screen: a centered question, a composer with a removable plugin chip, a plus menu, approval-mode and model dropdowns, a dictation button and send, and project / where-to-work / branch pickers. Sending a prompt opens a thread: a Working-for-Ns divider, streamed agent messages and step lines, an optional permission request (Allow / Deny, depending on the approval mode), then an Environment card (changes, branch, Commit or push dialog, tasks, browser) and a live iPhone simulator browser pane. The simulator is interactive: favorite posts, open the overflow and share menus, rotate the device, reload. Annotation mode (cursor button) outlines every element in green; click one, type feedback, and the agent edits the code, the phone hot-reloads with a visible change (avatar alignment, text size or spacing), and an edit card offers Undo and a diff Review dialog. Follow-up commands such as open the share menu, rotate to landscape, switch to dark, or undo drive the simulator. A Stop button cancels a run. All content is fictional: made-up app, people and file names, no real logos.', 'role=dialog modals, role=listbox dropdowns, aria-pressed on toggles, role=toolbar for the device bar, role=status for toasts, reduced motion respected'),
  },
  {
    name: 'Liquid glass chat',
    variants: 2,
    tileZoom: 0.3,
    defaultZoom: 0.75,
    standalone: <LiquidChatDemo />,
    preview: <div style={{ width: 1000, height: 720 }}><LiquidChatDemo /></div>,
    code: `<LiquidChatDemo />

// Open straight into a conversation:
<LiquidChatDemo startAt="chat" />

// Dark theme:
<LiquidChatDemo defaultTheme="dark" />`,
    prompt: templatePrompt('Liquid glass chat', 'An iOS-style messaging app in the Liquid Glass look, shown inside a scaled phone, with its own light and dark theme. Glass material: translucent surfaces with backdrop blur and saturation, a bright specular top edge, a soft inner rim and a faint diagonal sheen; the shared photo has a refracted, wavy glass rim made with an SVG turbulence displacement filter. Inbox: large Messages title, a Your circle control that fans a ribbon of portraits down (tap or drag vertically; the content slides with it, and a collapsed stack of three portraits shows when closed), a glass plus button for a contact picker, a search pill that filters live, All / Unread / Groups chips, and conversation rows with portrait, online dot, preview, time and unread dot. Chat: glass back and more buttons, centered portrait header, Today label, rounded bubbles (incoming white with the avatar on the last bubble of a run, outgoing tinted), a photo bubble with a glass caption chip that opens a viewer with tap-to-zoom, double-tap hearts, a glass composer pill with plus menu and a separate send button that lights up when there is text, outgoing messages that settle in from 22px below at scale 1.02, a typing indicator and a simulated reply. More menu: mute, share a photo, clear chat. All people, messages and artwork are fictional and generated in SVG; no photos.', 'real buttons and inputs with labels, aria-expanded on the circle and menus, role=dialog sheets, inert on the hidden screen, reduced motion respected'),
  },
];
