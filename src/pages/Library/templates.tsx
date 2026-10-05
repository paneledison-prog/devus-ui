import type { LibraryItem } from './libraryItems';
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
import { slugify } from './slug';
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

type TemplateItem = Omit<LibraryItem, 'category' | 'prompt' | 'promptPath'>;

const templateBase: TemplateItem[] = [
  {
    name: 'Landing page',
    sourceEntries: [{ path: 'src/pages/Library/templates.tsx', follow: false }, { path: 'src/pages/Library/templates.css' }, { path: 'src/components/Button/Button.tsx' }, { path: 'src/components/Badge/Badge.tsx' }, { path: 'src/components/Logo/Logo.tsx' }],
    canvas: [720, 440],
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <LandingTemplate />,
    code: `<div className="page">\n  <header className="nav">\n    <Logo size={22} /> <b>Acme</b>\n    <Button size="sm">Get started</Button>\n  </header>\n  <section className="hero">\n    <Badge tone="accent">New release</Badge>\n    <h1>Ship polished interfaces in half the time</h1>\n    <p>A focused toolkit for teams that care about the details.</p>\n    <Button size="lg">Start free</Button>\n    <Button size="lg" variant="secondary">Live demo</Button>\n  </section>\n</div>`,
  },
  {
    name: 'Dashboard',
    sourceEntries: [{ path: 'src/pages/Library/templates.tsx', follow: false }, { path: 'src/pages/Library/templates.css' }, { path: 'src/components/Logo/Logo.tsx' }, { path: 'src/components/Badge/Badge.tsx' }, { path: 'src/components/Progress/Progress.tsx' }, { path: 'src/components/Avatar/Avatar.tsx' }],
    canvas: [720, 440],
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <DashboardTemplate />,
    code: `<div className="shell">\n  <aside className="side">\n    <Logo size={20} /> Acme\n    <a aria-current="page">Overview</a> <a>Projects</a> <a>Reports</a>\n  </aside>\n  <main>\n    <div className="stats">\n      <Stat label="Revenue" value="$48.2k"><Badge tone="success">+12%</Badge></Stat>\n      <Stat label="Active users" value="2,931"><Badge tone="accent">+4%</Badge></Stat>\n    </div>\n    <Progress value={72} label="Quarterly goal" />\n  </main>\n</div>`,
  },
  {
    name: 'Split sign in',
    sourceEntries: [{ path: 'src/pages/Library/templates.tsx', follow: false }, { path: 'src/pages/Library/templates.css' }, { path: 'src/components/Card/Card.tsx' }, { path: 'src/components/TextField/TextField.tsx' }, { path: 'src/components/Button/Button.tsx' }, { path: 'src/components/Logo/Logo.tsx' }],
    canvas: [720, 440],
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <SignInTemplate />,
    code: `<div className="split">\n  <section className="art bg-aurora">\n    <h2>Welcome back</h2>\n    <p>Pick up right where you left off.</p>\n  </section>\n  <Card title="Sign in" description="Use your work email.">\n    <TextField label="Email" type="email" />\n    <TextField label="Password" type="password" />\n    <Button>Continue</Button>\n  </Card>\n</div>`,
  },
  {
    name: 'Settings page',
    sourceEntries: [{ path: 'src/pages/Library/templates.tsx', follow: false }, { path: 'src/pages/Library/templates.css' }, { path: 'src/components/TextField/TextField.tsx' }, { path: 'src/components/Switch/Switch.tsx' }, { path: 'src/components/Button/Button.tsx' }],
    canvas: [720, 440],
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <SettingsTemplate />,
    code: `<div className="shell">\n  <aside className="side">\n    <a aria-current="page">Profile</a> <a>Notifications</a> <a>Security</a>\n  </aside>\n  <main>\n    <Button size="sm">Save changes</Button>\n    <TextField label="Display name" />\n    <TextField label="Email" type="email" />\n    <Switch label="Email me product updates" defaultChecked />\n  </main>\n</div>`,
  },
  {
    name: 'Case study',
    sourceEntries: [{ path: 'src/components/CaseStudy/CaseStudy.tsx' }, { path: 'src/styles/tokens.css' }],
    standalone: <CaseStudyTemplate />,
    variants: 1,
    tileZoom: 0.21,
    defaultZoom: 0.7,
    preview: <div style={{ width: 1280, height: 800, overflow: 'hidden', borderRadius: 16 }}><CaseStudyTemplate /></div>,
    code: `<CaseStudyTemplate\n  name="Orbit AI"\n  overview="A workspace for teams building with open models. We rebuilt the product around discovery, setup and secure deployment."\n  scope="Visual system, design direction, product redesign"\n/>`,
  },
  {
    name: 'AI workspace demo',
    sourceEntries: [{ path: 'src/components/Workspace/Workspace.tsx' }, { path: 'src/styles/tokens.css' }],
    standalone: <WorkspaceDemo />,
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    preview: <div style={{ width: 1200, height: 740 }}><WorkspaceDemo /></div>,
    code: `<WorkspaceDemo />\n\n// Start in dark mode:\n<WorkspaceDemo defaultTheme="dark" />`,
  },
  {
    name: 'CRM workspace demo',
    sourceEntries: [{ path: 'src/components/Crm/Crm.tsx' }, { path: 'src/styles/tokens.css' }],
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <CrmDemo startAt="signup" />,
    preview: <div style={{ width: 1200, height: 740 }}><CrmDemo startAt="app" /></div>,
    code: `<CrmDemo startAt="signup" />\n\n// Jump straight to the companies table:\n<CrmDemo startAt="app" />\n\n// Dark theme:\n<CrmDemo startAt="app" defaultTheme="dark" />`,
  },
  {
    name: 'Company intelligence demo',
    sourceEntries: [{ path: 'src/components/Agents/Beacon.tsx' }, { path: 'src/styles/tokens.css' }],
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <BeaconDemo />,
    preview: <div style={{ width: 1200, height: 740 }}><BeaconDemo startAt="list" /></div>,
    code: `<BeaconDemo />

// Dark theme:
<BeaconDemo defaultTheme="dark" />`,
  },
  {
    name: 'AI platform demo',
    sourceEntries: [{ path: 'src/components/Agents/Harbor.tsx' }, { path: 'src/styles/tokens.css' }],
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <HarborDemo />,
    preview: <div style={{ width: 1200, height: 740 }}><HarborDemo  /></div>,
    code: `<HarborDemo />

// Dark theme:
<HarborDemo defaultTheme="dark" />`,
  },
  {
    name: 'Agent builder demo',
    sourceEntries: [{ path: 'src/components/Agents/Pairwise.tsx' }, { path: 'src/styles/tokens.css' }],
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <PairwiseDemo />,
    preview: <div style={{ width: 1200, height: 740 }}><PairwiseDemo startAt="app" /></div>,
    code: `<PairwiseDemo />

// Dark theme:
<PairwiseDemo defaultTheme="dark" />`,
  },
  {
    name: 'Build agent demo',
    sourceEntries: [{ path: 'src/components/BuildAgent/BuildAgent.tsx' }, { path: 'src/styles/tokens.css' }],
    variants: 2,
    tileZoom: 0.22,
    defaultZoom: 0.75,
    standalone: <BuildAgentDemo />,
    preview: <div style={{ width: 1200, height: 740 }}><BuildAgentDemo /></div>,
    code: `<BuildAgentDemo />\n\n// Jump straight into a running thread with the simulator:\n<BuildAgentDemo startAt="thread" />\n\n// Dark theme:\n<BuildAgentDemo defaultTheme="dark" />`,
  },
  {
    name: 'Liquid glass chat',
    sourceEntries: [{ path: 'src/components/LiquidChat/LiquidChat.tsx' }, { path: 'src/styles/tokens.css' }],
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
  },
];

/** Every template ships a real helper folder at `helper/<slug>/`. */
export const templateItems: TemplateItem[] = templateBase.map((item) => ({ ...item, helper: slugify(item.name) }));
