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
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <LandingTemplate />,
    code: `<div className="page">\n  <header className="nav">\n    <Logo size={22} /> <b>Acme</b>\n    <Button size="sm">Get started</Button>\n  </header>\n  <section className="hero">\n    <Badge tone="accent">New release</Badge>\n    <h1>Ship polished interfaces in half the time</h1>\n    <p>A focused toolkit for teams that care about the details.</p>\n    <Button size="lg">Start free</Button>\n    <Button size="lg" variant="secondary">Live demo</Button>\n  </section>\n</div>`,
    prompt: templatePrompt('Landing page', 'Marketing page with a top nav, a centered hero with badge, headline, supporting text and two calls to action over a soft accent glow.', 'Logo, Badge, Button'),
  },
  {
    name: 'Dashboard',
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <DashboardTemplate />,
    code: `<div className="shell">\n  <aside className="side">\n    <Logo size={20} /> Acme\n    <a aria-current="page">Overview</a> <a>Projects</a> <a>Reports</a>\n  </aside>\n  <main>\n    <div className="stats">\n      <Stat label="Revenue" value="$48.2k"><Badge tone="success">+12%</Badge></Stat>\n      <Stat label="Active users" value="2,931"><Badge tone="accent">+4%</Badge></Stat>\n    </div>\n    <Progress value={72} label="Quarterly goal" />\n  </main>\n</div>`,
    prompt: templatePrompt('Dashboard', 'App shell with a sidebar, a header with team avatars, three stat cards and progress panels.', 'Logo, Badge, Progress, AvatarGroup'),
  },
  {
    name: 'Split sign in',
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <SignInTemplate />,
    code: `<div className="split">\n  <section className="art bg-aurora">\n    <h2>Welcome back</h2>\n    <p>Pick up right where you left off.</p>\n  </section>\n  <Card title="Sign in" description="Use your work email.">\n    <TextField label="Email" type="email" />\n    <TextField label="Password" type="password" />\n    <Button>Continue</Button>\n  </Card>\n</div>`,
    prompt: templatePrompt('Split sign in', 'Two-column authentication page: an aurora art panel on the left and the form on the right.', 'Card, TextField, Button, the Aurora background'),
  },
  {
    name: 'Settings page',
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 1,
    preview: <SettingsTemplate />,
    code: `<div className="shell">\n  <aside className="side">\n    <a aria-current="page">Profile</a> <a>Notifications</a> <a>Security</a>\n  </aside>\n  <main>\n    <Button size="sm">Save changes</Button>\n    <TextField label="Display name" />\n    <TextField label="Email" type="email" />\n    <Switch label="Email me product updates" defaultChecked />\n  </main>\n</div>`,
    prompt: templatePrompt('Settings page', 'Sidebar navigation with a profile form and preference toggles, plus a primary save action.', 'TextField, Switch, Button'),
  },
];
