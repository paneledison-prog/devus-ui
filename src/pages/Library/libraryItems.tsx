import type { ReactNode } from 'react';
import { Button } from '../../components/Button/Button';
import { TextField } from '../../components/TextField/TextField';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Switch } from '../../components/Switch/Switch';
import { Alert } from '../../components/Alert/Alert';
import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';
import { SpinnerDemo } from '../../components/Spinner/SpinnerDemo';
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar';
import type { SourceEntry } from './sourceFiles';
import { masterPrompt, blockPrompt, backgroundPrompt } from './prompt';
import { templateItems } from './templates';
import { Badge } from '../../components/Badge/Badge';
import { Kbd } from '../../components/Kbd/Kbd';
import { Separator } from '../../components/Separator/Separator';
import { Progress } from '../../components/Progress/Progress';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { OtpInput } from '../../components/OtpInput/OtpInput';
import { Dropzone } from '../../components/Dropzone/Dropzone';
import { SlideToConfirm } from '../../components/SlideToConfirm/SlideToConfirm';
import { InlineConfirm } from '../../components/InlineConfirm/InlineConfirm';
import { ImageCompare } from '../../components/ImageCompare/ImageCompare';
import { ChatCard, MilestoneCard, QrCard, PayoutCard, NavCards, ShowcaseCard, ContributionCard } from '../../components/Blocks/Blocks';
import { ApprovalCard, ThinkingSteps, ContextMeter, AutonomyPicker, SourcedAnswer, Cite } from '../../components/AiKit/AiKit';
import { Tooltip, MagneticDock, DynamicIsland, MemberStack } from '../../components/Motion/Motion';
import { dockItems } from '../../components/Motion/dockItems';
import { ariaItems } from '../../components/Aria/ariaItems';
import { PhoneFrame } from '../../components/AppUI/PhoneFrame';
import { TabBar } from '../../components/AppUI/TabBar';
import { AppBar } from '../../components/AppUI/AppBar';
import { ListGroup, ListRow } from '../../components/AppUI/ListRow';
import { BottomSheet } from '../../components/AppUI/BottomSheet';
import { Fab } from '../../components/AppUI/Fab';
import { StoryRow } from '../../components/AppUI/StoryRing';
import { AppCard, WeekStrip, BalanceCard, TrackSteps } from '../../components/AppUI/Cards';
import { BellIcon, GearIcon, HomeIcon, SearchIcon, SunIcon, UserIcon } from '../../components/AppUI/icons';

export type LibraryCategory = 'components' | 'blocks' | 'templates' | 'backgrounds' | 'ui-elements' | 'app';

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
  /** 16:10 landscape frame with 24px radius and a white border (glow backgrounds). */
  landscape?: boolean;
  /** Shrinks large previews inside the small tile only. */
  tileZoom?: number;
  /** Initial zoom of the large preview (default 1.5). */
  defaultZoom?: number;
  /** Portrait tile (used for phone viewports). */
  tall?: boolean;
  /** Templates: design size of a fixed canvas, scaled to fit when opened in a new tab. */
  canvas?: [number, number];
  /** Templates: responsive version rendered full-window in a new tab (instead of the scaled canvas). */
  standalone?: ReactNode;
  /** Templates: real project files shown in the Code tab as a file tree (import graph is followed). */
  sourceEntries?: SourceEntry[];
  /** Templates: slug of the real `helper/<slug>/` folder (rules, agent, skills, guidelines, design, Context) shown in the file tree. */
  helper?: string;
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
      "variant: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'dangerSoft'; size: 'sm' (32px) | 'md' (24px) | 'lg' (40px); iconOnly (square); startContent / endContent slots. Pill radius, states: default, hover, focus, pressed, disabled.",
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
    preview: <SpinnerDemo />,
    code: `<Spinner size="lg" label="Loading" />

// Inside a button while saving
<Button aria-busy={saving} startContent={saving ? <Spinner size="sm" label="Saving" /> : undefined}>
  {saving ? 'Saving…' : 'Save changes'}
</Button>`,
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
  {
    name: 'Segmented control',
    variants: 1,
    preview: <SegmentedControl label="Range" defaultValue="4h" options={[{ value: '1h', label: '1H' }, { value: '4h', label: '4H' }, { value: '1d', label: '1D' }]} />,
    code: `<SegmentedControl\n  label="Range"\n  defaultValue="4h"\n  options={[\n    { value: '1h', label: '1H' },\n    { value: '4h', label: '4H' },\n    { value: '1d', label: '1D' },\n  ]}\n/>`,
    prompt: masterPrompt('SegmentedControl', 'Pill-shaped switcher for choosing one of a few options (time ranges, views).',
      'options: { value, label }[]; label: string (group name); value / defaultValue; onChange(value).',
      "Native radio inputs inside role='radiogroup', so arrow keys move the selection and a visible focus ring shows on the active segment."),
  },
  {
    name: 'OTP input',
    variants: 2,
    preview: <OtpInput length={4} />,
    code: `<OtpInput length={4} onComplete={(code) => verify(code)} />`,
    prompt: masterPrompt('OtpInput', 'One-time code entry with one numeric cell per digit.',
      'length?: number (default 4); label?: string; onComplete(code: string).',
      "Digits only, auto-advance on input, Backspace and arrow keys move between cells, paste fills all cells, autocomplete='one-time-code' on the first cell, each cell has an aria-label."),
  },
  {
    name: 'Dropzone',
    variants: 2,
    preview: <Dropzone />,
    code: `<Dropzone accept="image/*" hint="PNG or JPG, up to 5 MB" onFiles={(files) => upload(files)} />`,
    prompt: masterPrompt('Dropzone', 'File upload area that accepts drag-and-drop or click-to-browse and lists the chosen files with a remove button.',
      'accept?: string; hint?: string; onFiles(files: File[]).',
      'Built on a real <input type="file"> inside a <label>, so it is keyboard and screen-reader operable; drag-over state is also shown visually.'),
  },
  {
    name: 'Context meter',
    variants: 2,
    tileZoom: 0.8,
    defaultZoom: 1.5,
    preview: <div style={{ display: 'grid', gap: 12, width: 340 }}><ContextMeter used={132000} total={200000} /><ContextMeter used={188000} total={200000} model="model-deep" /></div>,
    code: `<ContextMeter used={132000} total={200000} onModelChange={setModel} />\n\n// Turns amber above 70% and red above 90%\n<ContextMeter used={188000} total={200000} />`,
    prompt: masterPrompt('ContextMeter', 'A pill with a model select on the left and a thin usage bar with a "132K / 200K" label on the right. The bar is foreground-colored, amber above 70% and red above 90%.', 'used: number; total: number; models?: string[]; model?: string; onModelChange(model)', 'a native select with a hidden label, role="meter" with aria-valuenow and aria-valuetext'),
  },
  {
    name: 'Autonomy picker',
    variants: 1,
    tileZoom: 0.8,
    defaultZoom: 1.5,
    preview: <div style={{ width: 340 }}><AutonomyPicker /></div>,
    code: `<AutonomyPicker defaultValue="plan" onChange={(level) => agent.setAutonomy(level)} />`,
    prompt: masterPrompt('AutonomyPicker', 'A three-segment control (Ask first, Plan then act, Autonomous) for how much freedom an AI agent has. The selected segment lifts onto a surface pill and a one-line hint below explains the current level.', 'defaultValue?: "ask" | "plan" | "auto"; onChange(level)', 'role="radiogroup" with role="radio" segments, roving tabindex, Left/Right arrow keys, hint in an aria-live region'),
  },
  {
    name: 'Rich tooltip',
    variants: 2,
    tileZoom: 1,
    defaultZoom: 1.5,
    preview: <div style={{ paddingTop: 56 }}><Tooltip title="Search" description="Find anything in your workspace" shortcut="Ctrl K"><Button variant="outline">Hover or focus me</Button></Tooltip></div>,
    code: `<Tooltip title="Search" description="Find anything in your workspace" shortcut="Ctrl K">\n  <Button variant="outline">Search</Button>\n</Tooltip>\n\n// Open below the trigger:\n<Tooltip title="Settings" side="bottom">...</Tooltip>`,
    prompt: masterPrompt('Tooltip', 'A tooltip with a bold title, an optional dimmer description and an optional keyboard shortcut chip, in a foreground-colored bubble with a small arrow. Opens after a short delay on hover or focus and closes on leave, blur or Escape.', 'title: string; description?: string; shortcut?: string; side?: "top" | "bottom"; delay?: number; children: ReactNode', 'role="tooltip", aria-describedby on the trigger only while open, works with keyboard focus'),
  },
  {
    name: 'Magnetic dock',
    variants: 1,
    tileZoom: 0.8,
    defaultZoom: 1.25,
    preview: <div style={{ paddingTop: 28 }}><MagneticDock items={dockItems} /></div>,
    code: `<MagneticDock\n  items={[\n    { id: 'home', label: 'Home', icon: <HomeIcon /> },\n    { id: 'mail', label: 'Mail', icon: <MailIcon /> },\n  ]}\n  onSelect={(id) => open(id)}\n/>`,
    prompt: masterPrompt('MagneticDock', 'A floating rounded dock of icon buttons. Icons grow smoothly (up to about 1.7x) as the pointer gets close, falling off with a Gaussian curve, and a label appears above the largest one. The selected item shows a dot below it. Keyboard focus enlarges the focused icon. No scaling when reduced motion is requested.', 'items: { id; label; icon }[]; onSelect?(id)', 'role="toolbar", each item is a real button with aria-label and aria-pressed'),
  },
  {
    name: 'Dynamic island',
    variants: 3,
    tileZoom: 0.9,
    defaultZoom: 1.25,
    preview: <DynamicIsland />,
    code: `<DynamicIsland />\n\n// Start on an active call:\n<DynamicIsland defaultState="call" />`,
    prompt: masterPrompt('DynamicIsland', 'A black pill that morphs between three states with a springy width/height transition: idle (a small dot), timer (progress ring, mm:ss and a Focus label) and call (avatar, name, live duration and a red end button that returns to idle). A segmented control below switches state for the demo.', 'defaultState?: "idle" | "timer" | "call"', 'role="status" with aria-live and a text label per state, end-call button has aria-label, transitions disabled for reduced motion'),
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
    preview: (
      <div style={{ width: 260, padding: '20px 20px 16px', borderRadius: 20, background: 'var(--surface)', boxShadow: 'var(--shadow-surface)', display: 'grid', gap: 14, font: '400 14px/20px var(--font-sans)' }}>
        <div style={{ fontWeight: 600 }}>Welcome back</div>
        <Separator />
        <Separator label="or continue with" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, color: 'var(--muted)', fontSize: 13 }}>
          <span>Terms</span><Separator orientation="vertical" /><span>Privacy</span><Separator orientation="vertical" /><span>Help</span>
        </div>
      </div>
    ),
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
  {
    name: 'Slide to confirm',
    variants: 1,
    preview: <SlideToConfirm />,
    code: `<SlideToConfirm label="Slide to pay" confirmedLabel="Paid" onConfirm={() => pay()} />`,
    prompt: masterPrompt('SlideToConfirm', 'Deliberate-action control: drag the thumb to the end to confirm, otherwise it snaps back.',
      'label?, confirmedLabel?, onConfirm().',
      'Built on a native range input so keyboard arrows work; resets on blur or pointer release before the end; exposes aria-valuetext.'),
  },
  {
    name: 'Inline confirm',
    variants: 2,
    preview: <InlineConfirm />,
    code: `<InlineConfirm label="Delete" onConfirm={() => remove()} />`,
    prompt: masterPrompt('InlineConfirm', 'Destructive button that turns into "Sure? / Cancel" in place instead of opening a dialog; reverts after 4 seconds.',
      'label?: string; onConfirm().',
      'Moves focus to the confirm button, wraps the pair in a labelled group, and Cancel is always reachable.'),
  },
  {
    name: 'Image compare',
    variants: 1,
    preview: <ImageCompare />,
    code: `<ImageCompare before={<img src="before.jpg" alt="" />} after={<img src="after.jpg" alt="" />} />`,
    prompt: masterPrompt('ImageCompare', 'Before/after slider that reveals the second layer as you drag.',
      'before?, after?: ReactNode (default to gradients); label?: string.',
      'A native range input overlays the layers, so it is keyboard operable and has an accessible name.'),
  },
  {
    name: 'Member stack',
    variants: 1,
    tileZoom: 1,
    defaultZoom: 1.5,
    preview: <div style={{ paddingTop: 44 }}><MemberStack members={[{ name: 'Mara Voss', role: 'Design', color: '#bcd4ff' }, { name: 'Jonas Keel', role: 'Engineering', color: '#ffd9b8' }, { name: 'Priya Raman', role: 'Product', color: '#c9f0d6' }, { name: 'Theo Marsh', role: 'Support', color: '#f6c9e0' }]} /></div>,
    code: `<MemberStack\n  members={[\n    { name: 'Mara Voss', role: 'Design' },\n    { name: 'Jonas Keel', role: 'Engineering' },\n  ]}\n/>`,
    prompt: masterPrompt('MemberStack', 'Overlapping round avatars that spread apart when the stack is hovered or focused. The hovered avatar lifts and shows a small tooltip with name and role.', 'members: { name: string; role?: string; color?: string }[]', 'a list of real buttons, aria-label "Name, role", tooltip is decorative (aria-hidden) because the label carries the text, visible focus ring'),
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
  {
    name: 'New chat',
    variants: 1,
    tileZoom: 0.36,
    defaultZoom: 0.75,
    preview: <ChatCard />,
    code: `<ChatCard name="Ada" onSend={(text) => send(text)} />`,
    prompt: blockPrompt('New chat', 'Empty-state AI chat card: header with a refresh button, centered greeting with an icon, and a composer with attach and send buttons. Fixed 560px height, scrollable message area above the composer.', 'Button-style icon buttons, textarea, send button'),
  },
  {
    name: 'Milestone form',
    variants: 1,
    tileZoom: 0.55,
    defaultZoom: 1,
    preview: <MilestoneCard />,
    code: `<MilestoneCard\n  onSubmit={({ goal, amount, date }) => save(goal, amount, date)}\n  onCancel={() => close()}\n/>`,
    prompt: blockPrompt('Milestone form', 'Card form to set a savings goal: goal name, target amount and date side by side, a dark Create Goal button and an outline Cancel button.', 'Button, pill inputs, real <label> elements'),
  },
  {
    name: 'QR connect',
    variants: 1,
    tileZoom: 0.6,
    defaultZoom: 1,
    preview: <QrCard />,
    code: `<QrCard\n  title="Scan to connect your mobile device"\n  hint="Open the mobile app and scan this code to link your device."\n/>`,
    prompt: blockPrompt('QR connect', 'Centered card with a QR code in a white rounded frame, a title and a hint. Swap the placeholder pattern for a real QR (for example generated from a pairing URL).', 'inline SVG, text'),
  },
  {
    name: 'Payout threshold',
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 0.75,
    preview: <PayoutCard />,
    code: `<PayoutCard\n  min={50}\n  max={10000}\n  initial={2500}\n  onSave={(amount) => save(amount)}\n  onDismiss={() => close()}\n/>`,
    prompt: blockPrompt('Payout threshold', 'Settings card with a dismiss button, a currency select, a large live amount with a slim range slider and MIN / MAX labels, a notes textarea and a Save button.', 'select, range input (value shown as text), textarea, Button'),
  },
  {
    name: 'Sidebar nav cards',
    variants: 2,
    tileZoom: 0.5,
    defaultZoom: 1,
    preview: <NavCards />,
    code: `<NavCards />`,
    prompt: blockPrompt('Sidebar nav cards', 'Two grouped navigation cards (Overview and Account), each with a small label and icon links; the current page gets a soft filled pill.', 'icons, links with aria-current="page"'),
  },
  {
    name: 'Controls showcase',
    variants: 1,
    tileZoom: 0.6,
    defaultZoom: 1,
    preview: <ShowcaseCard />,
    code: `<ShowcaseCard />`,
    prompt: blockPrompt('Controls showcase', 'One card that previews the whole control set: primary, secondary and outline buttons, a search field, a textarea, badges, radio, checkbox and switch, plus an outline button and a split button group.', 'Button, Checkbox, Switch, Badge-style pills, pill fields'),
  },
  {
    name: 'Contribution history',
    variants: 1,
    tileZoom: 0.42,
    defaultZoom: 0.75,
    preview: <ContributionCard />,
    code: `<ContributionCard\n  data={[\n    { m: 'Dec', v: 62 },\n    { m: 'Jan', v: 85 },\n    { m: 'Feb', v: 68 },\n    { m: 'Mar', v: 92 },\n    { m: 'Apr', v: 64 },\n  ]}\n/>`,
    prompt: blockPrompt('Contribution history', 'Bar chart card with six months of data in graduated gray bars, two stat tiles (Upcoming and Savings plan) and a full-width View Full Report button.', 'pure CSS bars (role="img" with a text summary), Button'),
  },
  {
    name: 'Approval card',
    variants: 1,
    tileZoom: 0.62,
    defaultZoom: 1,
    preview: <ApprovalCard title="How should I reply to the customer?" options={[
      { id: 'a', label: 'Reply now with a workaround', hint: 'Unblocks them today, the fix ships later' },
      { id: 'b', label: 'Wait for the fix to ship Thursday', hint: 'The patch is already in review' },
      { id: 'c', label: 'Escalate to engineering', hint: 'Loops the on-call engineer into the thread' },
    ]} />,
    code: `<ApprovalCard\n  title="How should I reply to the customer?"\n  options={[\n    { id: 'a', label: 'Reply now with a workaround', hint: 'Unblocks them today' },\n    { id: 'b', label: 'Wait for the fix', hint: 'The patch is in review' },\n  ]}\n  onConfirm={(id) => agent.resume(id)}\n  onSkip={() => agent.skip()}\n/>`,
    prompt: blockPrompt('Approval card', 'A card an AI agent shows when it pauses and needs a human decision: a Paused pill, a question, a radio list of options each with a one-line hint, and Confirm / Skip buttons. After choosing, the card locks, dims the other options and shows the result line.', 'Button, native radio inputs inside a fieldset with a legend'),
  },
  {
    name: 'Thinking steps',
    variants: 1,
    tileZoom: 0.8,
    defaultZoom: 1.25,
    preview: <ThinkingSteps steps={[
      { label: 'Reading the support thread', detail: 'Ticket #4821', seconds: 0.6, state: 'done' },
      { label: 'Checking the changelog', detail: 'Last 2 releases', seconds: 0.9, state: 'done' },
      { label: 'Pulling account status', state: 'running' },
      { label: 'Drafting a reply', state: 'todo' },
    ]} />,
    code: `<ThinkingSteps\n  steps={[\n    { label: 'Reading the thread', detail: 'Ticket #4821', seconds: 0.6, state: 'done' },\n    { label: 'Pulling account status', state: 'running' },\n    { label: 'Drafting a reply', state: 'todo' },\n  ]}\n/>`,
    prompt: blockPrompt('Thinking steps', 'Collapsible progress list for an AI answer. The header shows a spinner and Thinking... while a step is running, then a check and Worked for Ns. Open, it lists steps on a thin vertical rail: done steps are filled with a time, the running step spins, upcoming steps are dimmed.', 'a disclosure button with aria-expanded, an ordered list'),
  },
  {
    name: 'Sourced answer',
    variants: 1,
    tileZoom: 0.8,
    defaultZoom: 1.25,
    preview: <SourcedAnswer sources={[{ id: '1', name: 'Support thread' }, { id: '2', name: 'Changelog' }]}>The outage began after Tuesday's release.<Cite n={1} /> A fix is already in review and ships Thursday.<Cite n={2} /></SourcedAnswer>,
    code: `<SourcedAnswer sources={[{ id: '1', name: 'Support thread' }, { id: '2', name: 'Changelog' }]}>\n  The outage began after Tuesday's release.<Cite n={1} />\n  A fix is already in review and ships Thursday.<Cite n={2} />\n</SourcedAnswer>`,
    prompt: blockPrompt('Sourced answer', 'An AI answer with small numbered citation badges inline and a Sources row of pill chips below, each chip showing its number. Chips toggle a selected ring so the app can highlight the matching source.', 'toggle buttons with aria-pressed, sup for markers'),
  },
];

const fillStyle = { width: '100%', height: '100%' } as const;

const backgroundItems: BaseItem[] = [
  {
    name: 'Dot grid',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: 'var(--surface)', backgroundImage: 'radial-gradient(var(--muted) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />,
    code: `.bg-dots {\n  background-color: var(--surface);\n  background-image: radial-gradient(var(--muted) 1px, transparent 1px);\n  background-size: 16px 16px;\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
    prompt: backgroundPrompt('Dot grid', 'evenly spaced 1px dots on the surface color, subtle and technical. Frame: 16:10 landscape, 1px white border, 24px radius.'),
  },
  {
    name: 'Grid lines',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: 'var(--surface)', backgroundImage: 'linear-gradient(var(--separator) 1px, transparent 1px), linear-gradient(90deg, var(--separator) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />,
    code: `.bg-grid {\n  background-color: var(--surface);\n  background-image:\n    linear-gradient(var(--separator) 1px, transparent 1px),\n    linear-gradient(90deg, var(--separator) 1px, transparent 1px);\n  background-size: 32px 32px;\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
    prompt: backgroundPrompt('Grid lines', 'blueprint-style 32px grid drawn with the separator color. Frame: 16:10 landscape, 1px white border, 24px radius.'),
  },
  {
    name: 'Aurora',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: '#000', backgroundImage: 'radial-gradient(60% 34% at 78% 100%, #f2fbff 0%, #7fd0ff 36%, transparent 78%), radial-gradient(48% 30% at 24% 100%, #e6f7ff 0%, #4aa8ff 42%, transparent 78%), radial-gradient(15% 72% at 60% 0%, rgb(70 220 240 / .9), transparent 100%), radial-gradient(14% 62% at 10% 0%, rgb(70 220 240 / .75), transparent 100%), linear-gradient(to top, #2563d6 0%, transparent 58%)' }} />,
    code: `.bg-aurora {\n  background-color: #000;\n  background-image:\n    radial-gradient(60% 34% at 78% 100%, #f2fbff 0%, #7fd0ff 36%, transparent 78%),\n    radial-gradient(48% 30% at 24% 100%, #e6f7ff 0%, #4aa8ff 42%, transparent 78%),\n    radial-gradient(15% 72% at 60% 0%, rgb(70 220 240 / .9), transparent 100%),\n    radial-gradient(14% 62% at 10% 0%, rgb(70 220 240 / .75), transparent 100%),\n    linear-gradient(to top, #2563d6 0%, transparent 58%);\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
    prompt: backgroundPrompt('Aurora', 'soft blurred mesh gradient on black: two cyan light beams falling from the top and a bright icy-blue glow rising from the bottom edge. Clean saturated colors, no gray or muddy tones, no hard edges. Frame: 16:10 landscape, 1px white border, 24px radius.'),
  },
  {
    name: 'Soft gradient',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: '#000', backgroundImage: 'radial-gradient(60% 34% at 22% 100%, #fff4e6 0%, #ffb27a 38%, transparent 78%), radial-gradient(48% 30% at 78% 100%, #ffe8ee 0%, #ff8aa5 42%, transparent 78%), radial-gradient(16% 70% at 70% 0%, rgb(255 140 170 / .85), transparent 100%), linear-gradient(to top, #e0603f 0%, transparent 55%)' }} />,
    code: `.bg-soft {\n  background-color: #000;\n  background-image:\n    radial-gradient(60% 34% at 22% 100%, #fff4e6 0%, #ffb27a 38%, transparent 78%),\n    radial-gradient(48% 30% at 78% 100%, #ffe8ee 0%, #ff8aa5 42%, transparent 78%),\n    radial-gradient(16% 70% at 70% 0%, rgb(255 140 170 / .85), transparent 100%),\n    linear-gradient(to top, #e0603f 0%, transparent 55%);\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
    prompt: backgroundPrompt('Soft gradient', 'soft blurred mesh gradient on black: a rose light beam falling from the top and a warm peach-to-pink glow rising from the bottom edge. Clean saturated colors, no gray or muddy tones, no hard edges. Frame: 16:10 landscape, 1px white border, 24px radius.'),
  },
  {
    name: 'Emerald glow',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: '#000', backgroundImage: 'radial-gradient(60% 34% at 80% 100%, #f0fff7 0%, #6ff0b0 38%, transparent 78%), radial-gradient(48% 30% at 28% 100%, #dcffee 0%, #46d796 42%, transparent 78%), radial-gradient(15% 72% at 62% 0%, rgb(70 215 155 / .9), transparent 100%), radial-gradient(14% 62% at 8% 0%, rgb(70 215 155 / .75), transparent 100%), linear-gradient(to top, #25a874 0%, transparent 58%)' }} />,
    code: `.bg-emerald {\n  background-color: #000;\n  background-image:\n    radial-gradient(60% 34% at 80% 100%, #f0fff7 0%, #6ff0b0 38%, transparent 78%),\n    radial-gradient(48% 30% at 28% 100%, #dcffee 0%, #46d796 42%, transparent 78%),\n    radial-gradient(15% 72% at 62% 0%, rgb(70 215 155 / .9), transparent 100%),\n    radial-gradient(14% 62% at 8% 0%, rgb(70 215 155 / .75), transparent 100%),\n    linear-gradient(to top, #25a874 0%, transparent 58%);\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
    prompt: backgroundPrompt('Emerald glow', 'soft blurred mesh gradient on black: two emerald light beams falling from the top and a bright mint glow rising from the bottom edge. No hard edges; keep it smooth. Frame: 16:10 landscape, 1px white border, 24px radius.'),
  },
  {
    name: 'Lilac fade',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: '#000', backgroundRepeat: 'no-repeat', backgroundImage: 'radial-gradient(42% 46% at 0% 0%, rgb(186 156 200 / .75), transparent 100%), radial-gradient(70% 26% at 62% 52%, rgb(238 208 255 / .95), transparent 100%), linear-gradient(to bottom, #fbf7ff 0%, #fbf7ff 38%, #c9a2ee 52%, #5a2d82 66%, #120519 80%, #000 100%)' }} />,
    code: `.bg-lilac {\n  background-color: #000;\n  background-repeat: no-repeat;\n  background-image:\n    radial-gradient(42% 46% at 0% 0%, rgb(186 156 200 / .75), transparent 100%),\n    radial-gradient(70% 26% at 62% 52%, rgb(238 208 255 / .95), transparent 100%),\n    linear-gradient(to bottom, #fbf7ff 0%, #fbf7ff 38%, #c9a2ee 52%, #5a2d82 66%, #120519 80%, #000 100%);\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
    prompt: backgroundPrompt('Lilac fade', 'pale lavender-white light at the top that melts through a violet band into pure black at the bottom, with a soft glow on the right and a soft mauve glow in the top-left corner. No hard edges. Frame: 16:10 landscape, 1px white border, 24px radius.'),
  },
];

const appTabs = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'insights', label: 'Insights', icon: <SearchIcon /> },
  { id: 'profile', label: 'Profile', icon: <UserIcon /> },
];
const appStories = [{ name: 'You', initials: 'ME' }, { name: 'Ada', initials: 'AL' }, { name: 'Linus', initials: 'LT', seen: true }];
const appDays = [
  { id: 'mon', day: 'Mon', date: 8 }, { id: 'tue', day: 'Tue', date: 9 }, { id: 'wed', day: 'Wed', date: 10 },
  { id: 'thu', day: 'Thu', date: 11 }, { id: 'fri', day: 'Fri', date: 12 }, { id: 'sat', day: 'Sat', date: 13 },
];
const appFilter = [{ value: 'todo', label: 'To do' }, { value: 'done', label: 'Completed' }, { value: 'pending', label: 'Pending' }];
const appSteps: { label: string; time: string; state: 'done' | 'active' | 'todo' }[] = [
  { label: 'Received', time: '10:30am', state: 'done' },
  { label: 'In transit', time: '12:30pm', state: 'active' },
  { label: 'Delivered', time: 'Pending', state: 'todo' },
];
const sunIcon = <SunIcon />;
const phoneProps = { tall: true, tileZoom: 0.55, defaultZoom: 0.75 } as const;

const taskCard = (
  <AppCard label="Tasks">
    <SegmentedControl label="Filter" defaultValue="todo" options={appFilter} />
    <h3 className="app-card__title">Morning</h3>
    <Checkbox label="Wake up on time" />
    <Checkbox label="Gym / workout" />
    <h3 className="app-card__title">Workload</h3>
    <Checkbox label="Polish UI components" />
    <Checkbox label="Share updates with team" />
  </AppCard>
);

const appItems: BaseItem[] = [
  {
    name: 'Home screen',
    variants: 1,
    ...phoneProps,
    preview: (
      <PhoneFrame>
        <AppBar title="Hey, Ada" subtitle="Let's make progress today!" large action={sunIcon} />
        <WeekStrip days={appDays} defaultValue="wed" />
        {taskCard}
        <TabBar floating items={appTabs} action={<Fab tone="dark" />} />
      </PhoneFrame>
    ),
    code: `<PhoneFrame>\n  <AppBar title="Hey, Ada" subtitle="Let's make progress today!" large action={<SunIcon />} />\n  <WeekStrip days={days} defaultValue="wed" />\n  <AppCard>\n    <SegmentedControl label="Filter" defaultValue="todo" options={filters} />\n    <Checkbox label="Wake up on time" />\n    <Checkbox label="Gym / workout" />\n  </AppCard>\n  <TabBar floating items={tabs} action={<Fab tone="dark" />} />\n</PhoneFrame>`,
    prompt: masterPrompt('Home screen', 'Mobile home in a phone viewport: greeting app bar, week strip, a task card with a filter, and a floating tab bar with a round action button.',
      'Composes PhoneFrame, AppBar (large + subtitle), WeekStrip, AppCard, SegmentedControl, Checkbox, TabBar (floating) and Fab (dark).',
      'Landmarks: header, nav, lists; touch targets of at least 44px; works in light and dark themes; respects the phone safe areas (status bar and home indicator).'),
  },
  {
    name: 'Floating tab bar',
    variants: 2,
    ...phoneProps,
    preview: <PhoneFrame><TabBar floating items={appTabs} action={<Fab tone="dark" />} /></PhoneFrame>,
    code: `<TabBar\n  floating\n  items={[\n    { id: 'home', label: 'Home', icon: <HomeIcon /> },\n    { id: 'insights', label: 'Insights', icon: <SearchIcon /> },\n    { id: 'profile', label: 'Profile', icon: <UserIcon /> },\n  ]}\n  action={<Fab tone="dark" />}\n/>`,
    prompt: masterPrompt('TabBar (floating)', 'Pill-shaped bottom navigation that floats above content. Only the active tab shows its label inside a raised pill; an optional round action button sits beside it.',
      'items: { id, label, icon }[]; floating?: boolean; action?: ReactNode; value / defaultValue; onChange(id).',
      "<nav> with aria-label; every tab keeps an aria-label even when its text is hidden; aria-current='page' on the active tab; 44px targets."),
  },
  {
    name: 'App bar',
    variants: 2,
    ...phoneProps,
    preview: (
      <PhoneFrame>
        <AppBar title="Details" onBack={() => {}} />
        <AppBar title="Hey, Ada" subtitle="Let's make progress today!" large action={sunIcon} />
      </PhoneFrame>
    ),
    code: `<AppBar title="Details" onBack={() => history.back()} />\n<AppBar title="Hey, Ada" subtitle="Let's make progress today!" large action={<SunIcon />} />`,
    prompt: masterPrompt('AppBar', 'Top bar for mobile screens: either a centered title with a back button, or a large greeting with a muted italic subtitle and a raised icon action.',
      'title: string; subtitle?: string; large?: boolean; onBack?(); action?: ReactNode.',
      "Renders <header>; the back button has aria-label='Back' and a 44px target; the title is an <h2>."),
  },
  {
    name: 'Week strip',
    variants: 1,
    ...phoneProps,
    preview: <PhoneFrame><AppBar title="Schedule" large /><WeekStrip days={appDays} defaultValue="wed" /></PhoneFrame>,
    code: `<WeekStrip\n  days={[\n    { id: 'mon', day: 'Mon', date: 8 },\n    { id: 'wed', day: 'Wed', date: 10 },\n  ]}\n  defaultValue="wed"\n  onChange={(id) => setDay(id)}\n/>`,
    prompt: masterPrompt('WeekStrip', 'Horizontal day picker; the selected day sits in a soft raised pill.',
      'days: { id, day, date }[]; defaultValue?; onChange(id).',
      "role='group' with a label; each day is a toggle button with aria-pressed; 44px targets."),
  },
  {
    name: 'Task list',
    variants: 1,
    ...phoneProps,
    preview: <PhoneFrame><AppBar title="Today" large />{taskCard}</PhoneFrame>,
    code: `<AppCard>\n  <SegmentedControl label="Filter" defaultValue="todo" options={filters} />\n  <h3 className="app-card__title">Morning</h3>\n  <Checkbox label="Wake up on time" />\n  <Checkbox label="Gym / workout" />\n</AppCard>`,
    prompt: masterPrompt('Task list', 'Checklist card with a To do / Completed / Pending filter and titled sections of checkboxes.',
      'Composes AppCard, SegmentedControl and Checkbox; section titles are <h3>.',
      'Real checkboxes with visible labels; the filter is a radio group; whole rows are tappable.'),
  },
  {
    name: 'Balance card',
    variants: 1,
    ...phoneProps,
    preview: (
      <PhoneFrame>
        <AppBar title="Hello, Victor" subtitle="12 Palm Groove, Lagos" large action={<BellIcon />} />
        <BalanceCard amount="$245.00" actions={<><button type="button">New shipping</button><button type="button">Track shipping</button></>} />
      </PhoneFrame>
    ),
    code: `<BalanceCard\n  amount="$245.00"\n  primary="Top up"\n  actions={<><button>New shipping</button><button>Track shipping</button></>}\n/>`,
    prompt: masterPrompt('BalanceCard', 'High-contrast dark card with a label, a large amount, a white primary pill and two secondary actions.',
      'label?, amount: string, primary?: string, actions?: ReactNode.',
      "Labelled <section>; white-on-black text meets WCAG AA; pills are real buttons with 32px+ height, actions 40px."),
  },
  {
    name: 'Tracking steps',
    variants: 1,
    ...phoneProps,
    preview: (
      <PhoneFrame>
        <AppBar title="Details" onBack={() => {}} />
        <AppCard label="Shipment">
          <h3 className="app-card__title">PAQ-327-P21</h3>
          <TrackSteps steps={appSteps} />
        </AppCard>
        <Button size="lg">Track shipping</Button>
      </PhoneFrame>
    ),
    code: `<TrackSteps\n  steps={[\n    { label: 'Received', time: '10:30am', state: 'done' },\n    { label: 'In transit', time: '12:30pm', state: 'active' },\n    { label: 'Delivered', time: 'Pending', state: 'todo' },\n  ]}\n/>`,
    prompt: masterPrompt('TrackSteps', 'Horizontal progress line with a dot per step: done steps are filled and connected, the active step is filled, the rest are muted.',
      "steps: { label, time, state: 'done' | 'active' | 'todo' }[].",
      "Ordered list; aria-current='step' on the active step; progress is also conveyed by text and a check mark, not color alone."),
  },
  {
    name: 'Grouped list',
    variants: 3,
    ...phoneProps,
    preview: (
      <PhoneFrame>
        <AppBar title="Settings" onBack={() => {}} />
        <ListGroup label="Account">
          <ListRow icon={<UserIcon />} title="Profile" />
          <ListRow icon={<BellIcon />} title="Notifications" value="On" />
          <ListRow icon={<GearIcon />} title="Dark mode" trailing={<Switch aria-label="Dark mode" />} />
        </ListGroup>
      </PhoneFrame>
    ),
    code: `<ListGroup label="Account">\n  <ListRow icon={<UserIcon />} title="Profile" />\n  <ListRow icon={<BellIcon />} title="Notifications" value="On" />\n  <ListRow icon={<GearIcon />} title="Dark mode" trailing={<Switch aria-label="Dark mode" />} />\n</ListGroup>`,
    prompt: masterPrompt('ListGroup / ListRow', 'Inset grouped list like a mobile settings screen: icon tile, title, optional value, then a chevron or a control.',
      'ListRow: icon?, title, value?, trailing? (ReactNode, or false to hide the chevron), onClick?. ListGroup: label?, children.',
      "Rows are buttons only when clickable; rows are at least 48px tall; ListGroup has role='group' with a label."),
  },
  {
    name: 'Bottom sheet',
    variants: 1,
    ...phoneProps,
    preview: (
      <PhoneFrame>
        <AppBar title="Projects" large />
        <BottomSheet title="Share project" footer={<><Button>Copy link</Button><Button variant="ghost">Cancel</Button></>}>
          <ListRow title="Message" />
          <ListRow title="Email" />
        </BottomSheet>
      </PhoneFrame>
    ),
    code: `<BottomSheet\n  title="Share project"\n  footer={<><Button>Copy link</Button><Button variant="ghost">Cancel</Button></>}\n>\n  <ListRow title="Message" />\n  <ListRow title="Email" />\n</BottomSheet>`,
    prompt: masterPrompt('BottomSheet', 'Panel that slides up from the bottom of a mobile screen: drag handle, title, content rows and stacked full-width actions.',
      'title: string; children; footer?: ReactNode. Presentational: mount it inside your own overlay or <dialog>.',
      "Labelled region; when used as a modal it must trap focus, close on Escape and restore focus. Footer buttons are 48px tall."),
  },
  {
    name: 'Floating action button',
    variants: 3,
    ...phoneProps,
    preview: (
      <PhoneFrame>
        <AppBar title="Inbox" large />
        <div style={{ marginTop: 'auto', paddingBottom: 26, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
          <Fab label="New chat" />
          <Fab tone="dark" />
        </div>
      </PhoneFrame>
    ),
    code: `<Fab />\n<Fab tone="dark" />\n<Fab label="New chat" />`,
    prompt: masterPrompt('Fab', 'Round primary action button that floats above content; accent or dark tone; extended pill when it has a label.',
      "icon?: ReactNode (defaults to a plus); label?: string; tone?: 'accent' | 'dark'; all native button props.",
      "Icon-only FAB has aria-label='Create' by default; 52px target; press feedback scales to 94%."),
  },
  {
    name: 'Story rings',
    variants: 2,
    ...phoneProps,
    preview: (
      <PhoneFrame>
        <AppBar title="Friends" large />
        <StoryRow stories={appStories} />
      </PhoneFrame>
    ),
    code: `<StoryRow\n  stories={[\n    { name: 'You', initials: 'ME' },\n    { name: 'Ada', initials: 'AL' },\n    { name: 'Linus', initials: 'LT', seen: true },\n  ]}\n/>`,
    prompt: masterPrompt('StoryRow', 'Horizontally scrolling row of avatars with a gradient ring for unseen stories and a muted ring once seen.',
      'stories: { name, initials, seen? }[].',
      "A list of buttons; each has an accessible name that says whether the story is new; the ring is decorative."),
  },
];

const withCategory = (category: LibraryCategory) => (item: BaseItem): LibraryItem => ({ ...item, category });

export const libraryItems: LibraryItem[] = [
  ...componentItems.map(withCategory('components')),
  ...ariaItems.map(withCategory('components')),
  ...blockItems.map(withCategory('blocks')),
  ...templateItems.map(withCategory('templates')),
  ...backgroundItems.map(withCategory('backgrounds')),
  ...uiElementItems.map(withCategory('ui-elements')),
  ...appItems.map(withCategory('app')),
];

export const libraryCategories: { id: LibraryCategory; label: string; subtitle: string }[] = [
  { id: 'components', label: 'Components', subtitle: 'Core building blocks. Click a tile for a large preview, or copy its code or master prompt.' },
  { id: 'blocks', label: 'Blocks', subtitle: 'Ready-made sections composed from the components above.' },
  { id: 'templates', label: 'Templates', subtitle: 'Full-page layouts: landing, dashboard, sign in and settings.' },
  { id: 'backgrounds', label: 'Backgrounds', subtitle: 'Pure-CSS backgrounds that follow the light and dark themes.' },
  { id: 'ui-elements', label: 'UI Elements', subtitle: 'Small primitives: badges, keys, dividers and progress.' },
  { id: 'app', label: 'App', subtitle: 'Mobile app style elements: tab bar, app bar, grouped lists, bottom sheet and more.' },
];
