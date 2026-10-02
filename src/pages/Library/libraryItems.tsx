import type { ReactNode } from 'react';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Switch } from '../../components/Switch/Switch';
import { Alert } from '../../components/Alert/Alert';
import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar';

export interface LibraryItem {
  name: string;
  variants: number;
  preview: ReactNode;
  code: string;
  prompt: string;
}

const TOKENS = [
  'Use the HeroUI Kit V3 design tokens exposed as CSS variables (src/styles/tokens.css):',
  'colors --accent, --default, --danger, --surface, --foreground, --muted, --separator;',
  'radii --radius-3xl (pills/cards), --radius-field; spacing on a 4px scale (--space-*);',
  'Inter font; focus ring --focus-ring. Support [data-theme="light"|"dark"].',
].join(' ');

function masterPrompt(name: string, summary: string, api: string, a11y: string): string {
  return [
    `Build a React + TypeScript <${name}> component for Devus UI (based on the HeroUI Kit V3 design system).`,
    '',
    `Purpose: ${summary}`,
    `API: ${api}`,
    `Accessibility: ${a11y}`,
    '',
    TOKENS,
    'Plain CSS (BEM-style .ui-* classes), forwardRef where it wraps a native element, no extra runtime dependencies.',
    'Also write a Storybook story (CSF3, autodocs) covering every variant and state.',
  ].join('\n');
}

export const libraryItems: LibraryItem[] = [
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
