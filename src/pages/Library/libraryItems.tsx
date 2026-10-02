import type { ReactNode } from 'react';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Switch } from '../../components/Switch/Switch';
import { Alert } from '../../components/Alert/Alert';
import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar';
import { masterPrompt, blockPrompt, backgroundPrompt } from './prompt';
import { Badge } from '../../components/Badge/Badge';
import { Kbd } from '../../components/Kbd/Kbd';
import { Separator } from '../../components/Separator/Separator';
import { Progress } from '../../components/Progress/Progress';

export type LibraryCategory = 'components' | 'blocks' | 'backgrounds' | 'ui-elements';

export interface LibraryItem {
  name: string;
  category: LibraryCategory;
  variants: number;
  preview: ReactNode;
  code: string;
  /** Language used to highlight the code tab. */
  lang?: 'tsx' | 'css';
  prompt: string;
  /** Preview fills the whole tile / stage (used by backgrounds). */
  fill?: boolean;
  /** Shrinks large previews inside the small tile only. */
  tileZoom?: number;
}

type BaseItem = Omit<LibraryItem, 'category'>;

const componentItems: BaseItem[] = [
  {
    name: 'Alert',
    variants: 4,
    preview: <Alert status="success" title="Saved">Your changes are live.</Alert>,
    code: `<Alert status="success" title="Saved">\n  Your changes are live.\n</Alert>`,
    prompt: masterPrompt('Alert', 'Inline status message with a colored dot, title and description.',
      "status: 'default' | 'success' | 'warning' | 'danger'; title: ReactNode; children?: ReactNode.",
      "role='alert' for danger, role='status' otherwise; decorative dot is aria-hidden."),
  },
  {
    name: 'Avatar',
    variants: 3,
    preview: <AvatarGroup><Avatar fallback="AB" /><Avatar fallback="CD" /><Avatar fallback="+3" /></AvatarGroup>,
    code: `<AvatarGroup>\n  <Avatar fallback="AB" />\n  <Avatar fallback="CD" />\n  <Avatar fallback="+3" />\n</AvatarGroup>`,
    prompt: masterPrompt('Avatar', 'Circular user image with initials fallback, plus an overlapping AvatarGroup.',
      "src?, alt?, fallback?: string, size: 'sm' | 'md' | 'lg'. Falls back when the image errors.",
      'Images need alt text; fallback text is the accessible name when there is no image.'),
  },
  {
    name: 'Button',
    variants: 7,
    preview: <div style={{ display: 'flex', gap: 8 }}><Button>Primary</Button><Button variant="tertiary">Soft</Button></div>,
    code: `<Button variant="primary" size="md">Primary</Button>\n<Button variant="tertiary">Soft</Button>`,
    prompt: masterPrompt('Button', 'Clickable action with seven emphasis levels.',
      "variant: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'dangerSoft'; size: 'sm' (32px) | 'md' (36px) | 'lg' (40px); iconOnly (square); startContent / endContent slots. Pill radius, states: default, hover, focus, pressed, disabled.",
      'Native <button>, type defaults to "button", icon-only buttons require aria-label, visible focus ring.'),
  },
  {
    name: 'Card',
    variants: 1,
    preview: <Card title="Team plan" description="Unlimited members." />,
    code: `<Card\n  title="Team plan"\n  description="Unlimited members."\n  footer={<Button size="sm">Upgrade</Button>}\n/>`,
    prompt: masterPrompt('Card', 'Elevated surface grouping a title, description, content and footer actions.',
      'title?, description?, footer?, children. Uses --surface, --shadow-surface and --radius-3xl.',
      'Renders a <section> with an <h3> title.'),
  },
  {
    name: 'Checkbox',
    variants: 4,
    preview: <Checkbox label="Accept terms" defaultChecked />,
    code: `<Checkbox label="Accept terms" defaultChecked />`,
    prompt: masterPrompt('Checkbox', 'Boolean input with checked, indeterminate and disabled states.',
      'All native input props plus label?: string and indeterminate?: boolean (synced to the DOM property).',
      'Native checkbox wrapped in a <label>, so the label click toggles it; keyboard Space toggles.'),
  },
  {
    name: 'Spinner',
    variants: 3,
    preview: <Spinner size="lg" />,
    code: `<Spinner size="lg" label="Loading" />`,
    prompt: masterPrompt('Spinner', 'Indeterminate loading indicator.',
      "size: 'sm' (16px) | 'md' (24px) | 'lg' (32px); label?: string.",
      "role='status' with aria-label; slows the animation under prefers-reduced-motion."),
  },
  {
    name: 'Switch',
    variants: 3,
    preview: <Switch label="Notifications" defaultChecked />,
    code: `<Switch label="Notifications" defaultChecked />`,
    prompt: masterPrompt('Switch', 'On/off toggle, 40x20 track with a sliding thumb.',
      'All native input props plus label?: string.',
      "Native checkbox with role='switch'; keyboard Space toggles; disabled state at 50% opacity."),
  },
  {
    name: 'TextField',
    variants: 4,
    preview: <TextField label="Email" placeholder="you@example.com" />,
    code: `<TextField\n  label="Email"\n  placeholder="you@example.com"\n  description="Never shared with third parties."\n/>`,
    prompt: masterPrompt('TextField', 'Labelled text input with description and error message.',
      'All native input props plus label?, description?, errorMessage? (sets invalid state).',
      'Label linked via htmlFor, aria-invalid and aria-describedby point to the help/error text.'),
  },
];

const uiElementItems: BaseItem[] = [
  {
    name: 'Badge',
    variants: 5,
    preview: <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}><Badge tone="accent">New</Badge><Badge tone="success">Live</Badge><Badge tone="warning">Beta</Badge><Badge tone="danger">Error</Badge></div>,
    code: `<Badge tone="accent">New</Badge>\n<Badge tone="success">Live</Badge>\n<Badge tone="warning">Beta</Badge>\n<Badge tone="danger">Error</Badge>`,
    prompt: masterPrompt('Badge', 'Small pill label for status or counts.',
      "tone: 'default' | 'accent' | 'success' | 'warning' | 'danger'; children: ReactNode.",
      'Never rely on color alone: the text must convey the status.'),
  },
  {
    name: 'Kbd',
    variants: 2,
    preview: <span style={{ display: 'inline-flex', gap: 4 }}><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>,
    code: `<Kbd>Ctrl</Kbd>\n<Kbd>K</Kbd>`,
    prompt: masterPrompt('Kbd', 'Keycap used to show a keyboard shortcut.',
      'children: ReactNode. Renders a native <kbd>.', 'Use the native <kbd> element so assistive tech announces it as keyboard input.'),
  },
  {
    name: 'Separator',
    variants: 3,
    preview: <div style={{ width: 200 }}><Separator label="or continue with" /></div>,
    code: `<Separator />\n<Separator orientation="vertical" />\n<Separator label="or continue with" />`,
    prompt: masterPrompt('Separator', 'Thin divider, horizontal, vertical or with a centered label.',
      "orientation: 'horizontal' | 'vertical'; label?: string (horizontal only).",
      "role='separator' with aria-orientation."),
  },
  {
    name: 'Progress',
    variants: 2,
    preview: <Progress value={64} label="Uploading" />,
    code: `<Progress value={64} label="Uploading" />`,
    prompt: masterPrompt('Progress', 'Determinate progress bar with optional label and percentage.',
      'value: number (0-100, clamped); label?: string.',
      "role='progressbar' with aria-valuenow / aria-valuemin / aria-valuemax and an accessible name."),
  },
];

const blockItems: BaseItem[] = [
  {
    name: 'Sign in',
    variants: 1,
    tileZoom: 0.62,
    preview: (
      <Card title="Welcome back" description="Sign in to continue.">
        <TextField label="Email" type="email" placeholder="you@example.com" />
        <TextField label="Password" type="password" placeholder="Password" />
        <Button>Sign in</Button>
      </Card>
    ),
    code: `<Card title="Welcome back" description="Sign in to continue.">\n  <TextField label="Email" type="email" placeholder="you@example.com" />\n  <TextField label="Password" type="password" placeholder="Password" />\n  <Button>Sign in</Button>\n</Card>`,
    prompt: blockPrompt('Sign in', 'Email and password form inside a Card with a primary submit button.', 'Card, TextField, Button'),
  },
  {
    name: 'Newsletter',
    variants: 1,
    tileZoom: 0.8,
    preview: (
      <Card title="Stay in the loop" description="Product updates, once a month.">
        <TextField label="Email" type="email" placeholder="you@example.com" />
        <Button>Subscribe</Button>
      </Card>
    ),
    code: `<Card title="Stay in the loop" description="Product updates, once a month.">\n  <TextField label="Email" type="email" placeholder="you@example.com" />\n  <Button>Subscribe</Button>\n</Card>`,
    prompt: blockPrompt('Newsletter', 'Single-field email signup with a subscribe button.', 'Card, TextField, Button'),
  },
  {
    name: 'Notification settings',
    variants: 1,
    tileZoom: 0.8,
    preview: (
      <Card title="Notifications" description="Choose what you hear about.">
        <Switch label="Product updates" defaultChecked />
        <Switch label="Security alerts" defaultChecked />
        <Switch label="Marketing emails" />
      </Card>
    ),
    code: `<Card title="Notifications" description="Choose what you hear about.">\n  <Switch label="Product updates" defaultChecked />\n  <Switch label="Security alerts" defaultChecked />\n  <Switch label="Marketing emails" />\n</Card>`,
    prompt: blockPrompt('Notification settings', 'List of independent on/off preferences.', 'Card, Switch'),
  },
  {
    name: 'Profile card',
    variants: 1,
    tileZoom: 0.8,
    preview: (
      <Card title="Design team" description="Shipping the next release."
        footer={<><Button size="sm">Follow</Button><Button size="sm" variant="secondary">Message</Button></>}>
        <AvatarGroup><Avatar fallback="AB" /><Avatar fallback="CD" /><Avatar fallback="EF" /></AvatarGroup>
      </Card>
    ),
    code: `<Card\n  title="Design team"\n  description="Shipping the next release."\n  footer={<><Button size="sm">Follow</Button><Button size="sm" variant="secondary">Message</Button></>}\n>\n  <AvatarGroup>\n    <Avatar fallback="AB" />\n    <Avatar fallback="CD" />\n    <Avatar fallback="EF" />\n  </AvatarGroup>\n</Card>`,
    prompt: blockPrompt('Profile card', 'Team or person summary with overlapping avatars and two actions.', 'Card, AvatarGroup, Button'),
  },
];

const fillStyle = { width: '100%', height: '100%' } as const;

const backgroundItems: BaseItem[] = [
  {
    name: 'Dot grid',
    variants: 1,
    fill: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: 'var(--surface)', backgroundImage: 'radial-gradient(var(--muted) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />,
    code: `.bg-dots {\n  background-color: var(--surface);\n  background-image: radial-gradient(var(--muted) 1px, transparent 1px);\n  background-size: 16px 16px;\n}`,
    prompt: backgroundPrompt('Dot grid', 'evenly spaced 1px dots on the surface color, subtle and technical.'),
  },
  {
    name: 'Grid lines',
    variants: 1,
    fill: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: 'var(--surface)', backgroundImage: 'linear-gradient(var(--separator) 1px, transparent 1px), linear-gradient(90deg, var(--separator) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />,
    code: `.bg-grid {\n  background-color: var(--surface);\n  background-image:\n    linear-gradient(var(--separator) 1px, transparent 1px),\n    linear-gradient(90deg, var(--separator) 1px, transparent 1px);\n  background-size: 32px 32px;\n}`,
    prompt: backgroundPrompt('Grid lines', 'blueprint-style 32px grid drawn with the separator color.'),
  },
  {
    name: 'Aurora',
    variants: 1,
    fill: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: '#050816', backgroundImage: 'radial-gradient(60% 50% at 20% 20%, rgb(4 133 247 / .55), transparent 70%), radial-gradient(50% 50% at 80% 30%, rgb(139 92 246 / .45), transparent 70%), radial-gradient(60% 60% at 50% 100%, rgb(20 184 166 / .4), transparent 70%)' }} />,
    code: `.bg-aurora {\n  background-color: #050816;\n  background-image:\n    radial-gradient(60% 50% at 20% 20%, rgb(4 133 247 / .55), transparent 70%),\n    radial-gradient(50% 50% at 80% 30%, rgb(139 92 246 / .45), transparent 70%),\n    radial-gradient(60% 60% at 50% 100%, rgb(20 184 166 / .4), transparent 70%);\n}`,
    prompt: backgroundPrompt('Aurora', 'dark navy base with soft blue, violet and teal glows; use light text on top.'),
  },
  {
    name: 'Soft gradient',
    variants: 1,
    fill: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundImage: 'linear-gradient(135deg, var(--accent-soft), transparent 60%), linear-gradient(315deg, var(--danger-soft), transparent 60%)', backgroundColor: 'var(--surface)' }} />,
    code: `.bg-soft {\n  background-color: var(--surface);\n  background-image:\n    linear-gradient(135deg, var(--accent-soft), transparent 60%),\n    linear-gradient(315deg, var(--danger-soft), transparent 60%);\n}`,
    prompt: backgroundPrompt('Soft gradient', 'two-corner pastel wash from the accent and danger soft tokens over the surface.'),
  },
];

const withCategory = (category: LibraryCategory) => (item: BaseItem): LibraryItem => ({ ...item, category });

export const libraryItems: LibraryItem[] = [
  ...componentItems.map(withCategory('components')),
  ...blockItems.map(withCategory('blocks')),
  ...backgroundItems.map(withCategory('backgrounds')),
  ...uiElementItems.map(withCategory('ui-elements')),
];

export const libraryCategories: { id: LibraryCategory; label: string; subtitle: string }[] = [
  { id: 'components', label: 'Components', subtitle: 'Core building blocks. Click a tile for a large preview, or copy its code or master prompt.' },
  { id: 'blocks', label: 'Blocks', subtitle: 'Ready-made sections composed from the components above.' },
  { id: 'backgrounds', label: 'Backgrounds', subtitle: 'Pure-CSS backgrounds that follow the light and dark themes.' },
  { id: 'ui-elements', label: 'UI Elements', subtitle: 'Small primitives: badges, keys, dividers and progress.' },
];
