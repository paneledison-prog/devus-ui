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
import { slugify } from './slug';
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
import { HomeScreenExample } from '../../components/AppUI/examples/HomeScreen';
import { FloatingTabBarExample } from '../../components/AppUI/examples/FloatingTabBar';
import { AppBarExample } from '../../components/AppUI/examples/AppBarExample';
import { WeekStripExample } from '../../components/AppUI/examples/WeekStripExample';
import { TaskListExample } from '../../components/AppUI/examples/TaskList';
import { BalanceCardExample } from '../../components/AppUI/examples/BalanceCardExample';
import { TrackingStepsExample } from '../../components/AppUI/examples/TrackingSteps';
import { GroupedListExample } from '../../components/AppUI/examples/GroupedList';
import { BottomSheetExample } from '../../components/AppUI/examples/BottomSheetExample';
import { FloatingActionButtonExample } from '../../components/AppUI/examples/FloatingActionButton';
import { StoryRingsExample } from '../../components/AppUI/examples/StoryRings';
import { FinanceDashboardExample } from '../../components/AppUI/examples/FinanceDashboard';
import { InvoiceDetailExample } from '../../components/AppUI/examples/InvoiceDetail';
import { PremiumPaywallExample } from '../../components/AppUI/examples/PremiumPaywall';
import { NexusHomeExample } from '../../components/AppUI/examples/NexusHome';
import { MusicWidget, NavigationWidget, CallWidget, HeartRateWidget, ProgressRingWidget, AlarmWidget } from '../../components/Widgets/Widgets';
import { FomoWelcomeExample } from '../../components/AppUI/examples/FomoWelcome';
import { WabiWelcomeExample } from '../../components/AppUI/examples/WabiWelcome';
import { StickerPickerExample } from '../../components/AppUI/examples/StickerPicker';
import { CircleEditorExample } from '../../components/AppUI/examples/CircleEditor';
import { OrbProfile } from '../../components/AppUI/examples/OrbProfile';
import { HousewarmingInviteExample } from '../../components/AppUI/examples/HousewarmingInvite';
import { NftSearchResultsExample } from '../../components/AppUI/examples/NftSearchResults';
import { CallFlowExample } from '../../components/AppUI/examples/CallFlow';
import { MusicProfileCompactExample } from '../../components/AppUI/examples/MusicProfileCompact';
import { MusicProfileTilesExample } from '../../components/AppUI/examples/MusicProfileTiles';
import { MusicControlCenterExample } from '../../components/AppUI/examples/MusicControlCenter';
import { MusicProfileBannersExample } from '../../components/AppUI/examples/MusicProfileBanners';
import { VoiceRoomsFlowExample } from '../../components/AppUI/examples/VoiceRoomsFlow';
import { NftAuctionFlowExample } from '../../components/AppUI/examples/NftAuctionFlow';
import { BookshelfFlowExample } from '../../components/AppUI/examples/BookshelfFlow';
import { BookOnboardingFlowExample } from '../../components/AppUI/examples/BookOnboardingFlow';
import { MoimoiSignInExample } from '../../components/AppUI/examples/MoimoiSignIn';
import { NexusTodayExample } from '../../components/AppUI/examples/NexusToday';
import { NexusDailyExample } from '../../components/AppUI/examples/NexusDaily';
import { NexusCoursesExample } from '../../components/AppUI/examples/NexusCourses';
import { RestoringPurchasesExample } from '../../components/AppUI/examples/RestoringPurchases';

export type LibraryCategory = 'components' | 'blocks' | 'templates' | 'backgrounds' | 'ui-elements' | 'app';

export interface LibraryItem {
  name: string;
  category: LibraryCategory;
  variants: number;
  preview: ReactNode;
  code: string;
  /** Language used to highlight the code tab. */
  lang?: 'tsx' | 'css';
  /** Master prompt: the real Markdown file `prompts/<category>/<slug>.md`, loaded at build time. */
  prompt: string;
  /** Repository path of the prompt file. */
  promptPath: string;
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
  /** Outer height of the phone in px when it is not the default 660 (used to fit the phone in tiles and previews). */
  phoneHeight?: number;
  /** Templates: design size of a fixed canvas, scaled to fit when opened in a new tab. */
  canvas?: [number, number];
  /** Templates: responsive version rendered full-window in a new tab (instead of the scaled canvas). */
  standalone?: ReactNode;
  /** Templates: real project files shown in the Code tab as a file tree (import graph is followed). */
  sourceEntries?: SourceEntry[];
  /** Templates: slug of the real `helper/<slug>/` folder (rules, agent, skills, guidelines, design, Context) shown in the file tree. */
  helper?: string;
}

type BaseItem = Omit<LibraryItem, 'category' | 'prompt' | 'promptPath'>;

const componentItems: BaseItem[] = [
  {
    name: 'Alert',
    variants: 4,
    preview: <Alert status="success" title="Saved">Your changes are live.</Alert>,
    code: `<Alert status="success" title="Saved">\n  Your changes are live.\n</Alert>`,
  },
  {
    name: 'Avatar',
    variants: 3,
    preview: <AvatarGroup><Avatar fallback="AB" /><Avatar fallback="CD" /><Avatar fallback="+3" /></AvatarGroup>,
    code: `<AvatarGroup>\n  <Avatar fallback="AB" />\n  <Avatar fallback="CD" />\n  <Avatar fallback="+3" />\n</AvatarGroup>`,
  },
  {
    name: 'Button',
    variants: 7,
    preview: <div style={{ display: 'flex', gap: 8 }}><Button>Primary</Button><Button variant="tertiary">Soft</Button></div>,
    code: `<Button variant="primary" size="md">Primary</Button>\n<Button variant="tertiary">Soft</Button>`,
  },
  {
    name: 'Card',
    variants: 1,
    preview: <Card title="Team plan" description="Unlimited members." />,
    code: `<Card\n  title="Team plan"\n  description="Unlimited members."\n  footer={<Button size="sm">Upgrade</Button>}\n/>`,
  },
  {
    name: 'Checkbox',
    variants: 4,
    preview: <Checkbox label="Accept terms" defaultChecked />,
    code: `<Checkbox label="Accept terms" defaultChecked />`,
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
  },
  {
    name: 'Switch',
    variants: 3,
    preview: <Switch label="Notifications" defaultChecked />,
    code: `<Switch label="Notifications" defaultChecked />`,
  },
  {
    name: 'TextField',
    variants: 4,
    preview: <TextField label="Email" placeholder="you@example.com" />,
    code: `<TextField\n  label="Email"\n  placeholder="you@example.com"\n  description="Never shared with third parties."\n/>`,
  },
  {
    name: 'Segmented control',
    variants: 1,
    preview: <SegmentedControl label="Range" defaultValue="4h" options={[{ value: '1h', label: '1H' }, { value: '4h', label: '4H' }, { value: '1d', label: '1D' }]} />,
    code: `<SegmentedControl\n  label="Range"\n  defaultValue="4h"\n  options={[\n    { value: '1h', label: '1H' },\n    { value: '4h', label: '4H' },\n    { value: '1d', label: '1D' },\n  ]}\n/>`,
  },
  {
    name: 'OTP input',
    variants: 2,
    preview: <OtpInput length={4} />,
    code: `<OtpInput length={4} onComplete={(code) => verify(code)} />`,
  },
  {
    name: 'Dropzone',
    variants: 2,
    preview: <Dropzone />,
    code: `<Dropzone accept="image/*" hint="PNG or JPG, up to 5 MB" onFiles={(files) => upload(files)} />`,
  },
  {
    name: 'Context meter',
    variants: 2,
    tileZoom: 0.8,
    defaultZoom: 1.5,
    preview: <div style={{ display: 'grid', gap: 12, width: 340 }}><ContextMeter used={132000} total={200000} /><ContextMeter used={188000} total={200000} model="model-deep" /></div>,
    code: `<ContextMeter used={132000} total={200000} onModelChange={setModel} />\n\n// Turns amber above 70% and red above 90%\n<ContextMeter used={188000} total={200000} />`,
  },
  {
    name: 'Autonomy picker',
    variants: 1,
    tileZoom: 0.8,
    defaultZoom: 1.5,
    preview: <div style={{ width: 340 }}><AutonomyPicker /></div>,
    code: `<AutonomyPicker defaultValue="plan" onChange={(level) => agent.setAutonomy(level)} />`,
  },
  {
    name: 'Rich tooltip',
    variants: 2,
    tileZoom: 1,
    defaultZoom: 1.5,
    preview: <div style={{ paddingTop: 56 }}><Tooltip title="Search" description="Find anything in your workspace" shortcut="Ctrl K"><Button variant="outline">Hover or focus me</Button></Tooltip></div>,
    code: `<Tooltip title="Search" description="Find anything in your workspace" shortcut="Ctrl K">\n  <Button variant="outline">Search</Button>\n</Tooltip>\n\n// Open below the trigger:\n<Tooltip title="Settings" side="bottom">...</Tooltip>`,
  },
  {
    name: 'Magnetic dock',
    variants: 1,
    tileZoom: 0.8,
    defaultZoom: 1.25,
    preview: <div style={{ paddingTop: 28 }}><MagneticDock items={dockItems} /></div>,
    code: `<MagneticDock\n  items={[\n    { id: 'home', label: 'Home', icon: <HomeIcon /> },\n    { id: 'mail', label: 'Mail', icon: <MailIcon /> },\n  ]}\n  onSelect={(id) => open(id)}\n/>`,
  },
  {
    name: 'Dynamic island',
    variants: 3,
    tileZoom: 0.9,
    defaultZoom: 1.25,
    preview: <DynamicIsland />,
    code: `<DynamicIsland />\n\n// Start on an active call:\n<DynamicIsland defaultState="call" />`,
  },
];

const uiElementItems: BaseItem[] = [
  {
    name: 'Badge',
    variants: 5,
    preview: <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}><Badge tone="accent">New</Badge><Badge tone="success">Live</Badge><Badge tone="warning">Beta</Badge><Badge tone="danger">Error</Badge></div>,
    code: `<Badge tone="accent">New</Badge>\n<Badge tone="success">Live</Badge>\n<Badge tone="warning">Beta</Badge>\n<Badge tone="danger">Error</Badge>`,
  },
  {
    name: 'Kbd',
    variants: 2,
    preview: <span style={{ display: 'inline-flex', gap: 4 }}><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>,
    code: `<Kbd>Ctrl</Kbd>\n<Kbd>K</Kbd>`,
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
  },
  {
    name: 'Progress',
    variants: 2,
    preview: <Progress value={64} label="Uploading" />,
    code: `<Progress value={64} label="Uploading" />`,
  },
  {
    name: 'Slide to confirm',
    variants: 1,
    preview: <SlideToConfirm />,
    code: `<SlideToConfirm label="Slide to pay" confirmedLabel="Paid" onConfirm={() => pay()} />`,
  },
  {
    name: 'Inline confirm',
    variants: 2,
    preview: <InlineConfirm />,
    code: `<InlineConfirm label="Delete" onConfirm={() => remove()} />`,
  },
  {
    name: 'Image compare',
    variants: 1,
    preview: <ImageCompare />,
    code: `<ImageCompare before={<img src="before.jpg" alt="" />} after={<img src="after.jpg" alt="" />} />`,
  },
  {
    name: 'Member stack',
    variants: 1,
    tileZoom: 1,
    defaultZoom: 1.5,
    preview: <div style={{ paddingTop: 44 }}><MemberStack members={[{ name: 'Mara Voss', role: 'Design', color: '#bcd4ff' }, { name: 'Jonas Keel', role: 'Engineering', color: '#ffd9b8' }, { name: 'Priya Raman', role: 'Product', color: '#c9f0d6' }, { name: 'Theo Marsh', role: 'Support', color: '#f6c9e0' }]} /></div>,
    code: `<MemberStack\n  members={[\n    { name: 'Mara Voss', role: 'Design' },\n    { name: 'Jonas Keel', role: 'Engineering' },\n  ]}\n/>`,
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
  },
  {
    name: 'New chat',
    variants: 1,
    tileZoom: 0.36,
    defaultZoom: 0.75,
    preview: <ChatCard />,
    code: `<ChatCard name="Ada" onSend={(text) => send(text)} />`,
  },
  {
    name: 'Milestone form',
    variants: 1,
    tileZoom: 0.55,
    defaultZoom: 1,
    preview: <MilestoneCard />,
    code: `<MilestoneCard\n  onSubmit={({ goal, amount, date }) => save(goal, amount, date)}\n  onCancel={() => close()}\n/>`,
  },
  {
    name: 'QR connect',
    variants: 1,
    tileZoom: 0.6,
    defaultZoom: 1,
    preview: <QrCard />,
    code: `<QrCard\n  title="Scan to connect your mobile device"\n  hint="Open the mobile app and scan this code to link your device."\n/>`,
  },
  {
    name: 'Payout threshold',
    variants: 1,
    tileZoom: 0.4,
    defaultZoom: 0.75,
    preview: <PayoutCard />,
    code: `<PayoutCard\n  min={50}\n  max={10000}\n  initial={2500}\n  onSave={(amount) => save(amount)}\n  onDismiss={() => close()}\n/>`,
  },
  {
    name: 'Sidebar nav cards',
    variants: 2,
    tileZoom: 0.5,
    defaultZoom: 1,
    preview: <NavCards />,
    code: `<NavCards />`,
  },
  {
    name: 'Controls showcase',
    variants: 1,
    tileZoom: 0.6,
    defaultZoom: 1,
    preview: <ShowcaseCard />,
    code: `<ShowcaseCard />`,
  },
  {
    name: 'Contribution history',
    variants: 1,
    tileZoom: 0.42,
    defaultZoom: 0.75,
    preview: <ContributionCard />,
    code: `<ContributionCard\n  data={[\n    { m: 'Dec', v: 62 },\n    { m: 'Jan', v: 85 },\n    { m: 'Feb', v: 68 },\n    { m: 'Mar', v: 92 },\n    { m: 'Apr', v: 64 },\n  ]}\n/>`,
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
  },
  {
    name: 'Sourced answer',
    variants: 1,
    tileZoom: 0.8,
    defaultZoom: 1.25,
    preview: <SourcedAnswer sources={[{ id: '1', name: 'Support thread', kind: 'Internal thread', excerpt: 'Errors started at 09:12 UTC, minutes after the 3.4 release went out.', updated: '2 hours ago' }, { id: '2', name: 'Changelog', kind: 'Release notes', excerpt: 'Sync fix merged and in review. Planned for Thursday.', updated: 'yesterday' }]}>The outage began after Tuesday's release.<Cite n={1} /> A fix is already in review and ships Thursday.<Cite n={2} /></SourcedAnswer>,
    code: `<SourcedAnswer\n  sources={[\n    { id: '1', name: 'Support thread', kind: 'Internal thread', excerpt: 'Errors started at 09:12 UTC...', updated: '2 hours ago' },\n    { id: '2', name: 'Changelog', kind: 'Release notes', excerpt: 'Sync fix merged and in review...', updated: 'yesterday' },\n  ]}\n>\n  The outage began after Tuesday's release.<Cite n={1} />\n  A fix is already in review and ships Thursday.<Cite n={2} />\n</SourcedAnswer>`,
  },
  {
    name: 'Music player widget',
    variants: 1,
    tileZoom: 0.62,
    defaultZoom: 1.2,
    preview: <div style={{ padding: 24 }}><MusicWidget title="What you need" artist="Don Toliver" /></div>,
    code: `<MusicWidget title="What you need" artist="Don Toliver" />`,
  },
  {
    name: 'Navigation widget',
    variants: 1,
    tileZoom: 0.62,
    defaultZoom: 1.2,
    preview: <div style={{ padding: 24 }}><NavigationWidget distance="416 m" street="Kottayam" /></div>,
    code: `<NavigationWidget distance="416 m" street="Kottayam" />`,
  },
  {
    name: 'Call widget',
    variants: 1,
    tileZoom: 0.62,
    defaultZoom: 1.2,
    preview: <div style={{ padding: 24 }}><CallWidget name="Jason Lambert" status="Incoming Call" /></div>,
    code: `<CallWidget name="Jason Lambert" status="Incoming Call" />`,
  },
  {
    name: 'Heart rate widget',
    variants: 1,
    tileZoom: 0.62,
    defaultZoom: 1.2,
    preview: <div style={{ padding: 24 }}><HeartRateWidget bpm={92} /></div>,
    code: `<HeartRateWidget bpm={92} />`,
  },
  {
    name: 'Progress ring widget',
    variants: 1,
    tileZoom: 0.62,
    defaultZoom: 1.2,
    preview: <div style={{ padding: 24 }}><ProgressRingWidget percent={60} date="JUL 26" caption="TRACK PROGRESS" /></div>,
    code: `<ProgressRingWidget percent={60} date="JUL 26" caption="TRACK PROGRESS" />`,
  },
  {
    name: 'Alarm widget',
    variants: 1,
    tileZoom: 0.62,
    defaultZoom: 1.2,
    preview: <div style={{ padding: 24 }}><AlarmWidget time="7:30 AM" /></div>,
    code: `<AlarmWidget time="7:30 AM" />`,
  },
];

const fillStyle = { width: '100%', height: '100%' } as const;

const backgroundItems: BaseItem[] = [
  {
    name: 'Soft gradient',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: '#000', backgroundImage: 'radial-gradient(60% 34% at 22% 100%, #fff4e6 0%, #ffb27a 38%, transparent 78%), radial-gradient(48% 30% at 78% 100%, #ffe8ee 0%, #ff8aa5 42%, transparent 78%), radial-gradient(16% 70% at 70% 0%, rgb(255 140 170 / .85), transparent 100%), linear-gradient(to top, #e0603f 0%, transparent 55%)' }} />,
    code: `.bg-soft {\n  background-color: #000;\n  background-image:\n    radial-gradient(60% 34% at 22% 100%, #fff4e6 0%, #ffb27a 38%, transparent 78%),\n    radial-gradient(48% 30% at 78% 100%, #ffe8ee 0%, #ff8aa5 42%, transparent 78%),\n    radial-gradient(16% 70% at 70% 0%, rgb(255 140 170 / .85), transparent 100%),\n    linear-gradient(to top, #e0603f 0%, transparent 55%);\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
  },
  {
    name: 'Emerald glow',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: '#000', backgroundImage: 'radial-gradient(60% 34% at 80% 100%, #f0fff7 0%, #6ff0b0 38%, transparent 78%), radial-gradient(48% 30% at 28% 100%, #dcffee 0%, #46d796 42%, transparent 78%), radial-gradient(15% 72% at 62% 0%, rgb(70 215 155 / .9), transparent 100%), radial-gradient(14% 62% at 8% 0%, rgb(70 215 155 / .75), transparent 100%), linear-gradient(to top, #25a874 0%, transparent 58%)' }} />,
    code: `.bg-emerald {\n  background-color: #000;\n  background-image:\n    radial-gradient(60% 34% at 80% 100%, #f0fff7 0%, #6ff0b0 38%, transparent 78%),\n    radial-gradient(48% 30% at 28% 100%, #dcffee 0%, #46d796 42%, transparent 78%),\n    radial-gradient(15% 72% at 62% 0%, rgb(70 215 155 / .9), transparent 100%),\n    radial-gradient(14% 62% at 8% 0%, rgb(70 215 155 / .75), transparent 100%),\n    linear-gradient(to top, #25a874 0%, transparent 58%);\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
  },
  {
    name: 'Lilac fade',
    variants: 1,
    fill: true,
    landscape: true,
    lang: 'css',
    preview: <div style={{ ...fillStyle, backgroundColor: '#000', backgroundRepeat: 'no-repeat', backgroundImage: 'radial-gradient(42% 46% at 0% 0%, rgb(186 156 200 / .75), transparent 100%), radial-gradient(70% 26% at 62% 52%, rgb(238 208 255 / .95), transparent 100%), linear-gradient(to bottom, #fbf7ff 0%, #fbf7ff 38%, #c9a2ee 52%, #5a2d82 66%, #120519 80%, #000 100%)' }} />,
    code: `.bg-lilac {\n  background-color: #000;\n  background-repeat: no-repeat;\n  background-image:\n    radial-gradient(42% 46% at 0% 0%, rgb(186 156 200 / .75), transparent 100%),\n    radial-gradient(70% 26% at 62% 52%, rgb(238 208 255 / .95), transparent 100%),\n    linear-gradient(to bottom, #fbf7ff 0%, #fbf7ff 38%, #c9a2ee 52%, #5a2d82 66%, #120519 80%, #000 100%);\n  border: 1px solid #fff;\n  border-radius: 24px;\n  aspect-ratio: 16 / 10;\n}`,
  },
];

const phoneProps = { tall: true, tileZoom: 0.55, defaultZoom: 0.75 } as const;

const appItems: BaseItem[] = [
  {
    name: 'Home screen',
    variants: 1,
    ...phoneProps,
    preview: <HomeScreenExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/HomeScreen.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'home-screen',
    code: `<PhoneFrame>\n  <AppBar title="Hey, Ada" subtitle="Let's make progress today!" large action={<SunIcon />} />\n  <WeekStrip days={days} defaultValue="wed" />\n  <AppCard>\n    <SegmentedControl label="Filter" defaultValue="todo" options={filters} />\n    <Checkbox label="Wake up on time" />\n    <Checkbox label="Gym / workout" />\n  </AppCard>\n  <TabBar floating items={tabs} action={<Fab tone="dark" />} />\n</PhoneFrame>`,
  },
  {
    name: 'Floating tab bar',
    variants: 2,
    ...phoneProps,
    preview: <FloatingTabBarExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/FloatingTabBar.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'floating-tab-bar',
    code: `<TabBar\n  floating\n  items={[\n    { id: 'home', label: 'Home', icon: <HomeIcon /> },\n    { id: 'insights', label: 'Insights', icon: <SearchIcon /> },\n    { id: 'profile', label: 'Profile', icon: <UserIcon /> },\n  ]}\n  action={<Fab tone="dark" />}\n/>`,
  },
  {
    name: 'App bar',
    variants: 2,
    ...phoneProps,
    preview: <AppBarExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/AppBarExample.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'app-bar',
    code: `<AppBar title="Details" onBack={() => history.back()} />\n<AppBar title="Hey, Ada" subtitle="Let's make progress today!" large action={<SunIcon />} />`,
  },
  {
    name: 'Week strip',
    variants: 1,
    ...phoneProps,
    preview: <WeekStripExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/WeekStripExample.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'week-strip',
    code: `<WeekStrip\n  days={[\n    { id: 'mon', day: 'Mon', date: 8 },\n    { id: 'wed', day: 'Wed', date: 10 },\n  ]}\n  defaultValue="wed"\n  onChange={(id) => setDay(id)}\n/>`,
  },
  {
    name: 'Task list',
    variants: 1,
    ...phoneProps,
    preview: <TaskListExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/TaskList.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'task-list',
    code: `<AppCard>\n  <SegmentedControl label="Filter" defaultValue="todo" options={filters} />\n  <h3 className="app-card__title">Morning</h3>\n  <Checkbox label="Wake up on time" />\n  <Checkbox label="Gym / workout" />\n</AppCard>`,
  },
  {
    name: 'Balance card',
    variants: 1,
    ...phoneProps,
    preview: <BalanceCardExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/BalanceCardExample.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'balance-card',
    code: `<BalanceCard\n  amount="$245.00"\n  primary="Top up"\n  actions={<><button>New shipping</button><button>Track shipping</button></>}\n/>`,
  },
  {
    name: 'Tracking steps',
    variants: 1,
    ...phoneProps,
    preview: <TrackingStepsExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/TrackingSteps.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'tracking-steps',
    code: `<TrackSteps\n  steps={[\n    { label: 'Received', time: '10:30am', state: 'done' },\n    { label: 'In transit', time: '12:30pm', state: 'active' },\n    { label: 'Delivered', time: 'Pending', state: 'todo' },\n  ]}\n/>`,
  },
  {
    name: 'Grouped list',
    variants: 3,
    ...phoneProps,
    preview: <GroupedListExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/GroupedList.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'grouped-list',
    code: `<ListGroup label="Account">\n  <ListRow icon={<UserIcon />} title="Profile" />\n  <ListRow icon={<BellIcon />} title="Notifications" value="On" />\n  <ListRow icon={<GearIcon />} title="Dark mode" trailing={<Switch aria-label="Dark mode" />} />\n</ListGroup>`,
  },
  {
    name: 'Bottom sheet',
    variants: 1,
    ...phoneProps,
    preview: <BottomSheetExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/BottomSheetExample.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'bottom-sheet',
    code: `<BottomSheet\n  title="Share project"\n  footer={<><Button>Copy link</Button><Button variant="ghost">Cancel</Button></>}\n>\n  <ListRow title="Message" />\n  <ListRow title="Email" />\n</BottomSheet>`,
  },
  {
    name: 'Floating action button',
    variants: 3,
    ...phoneProps,
    preview: <FloatingActionButtonExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/FloatingActionButton.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'floating-action-button',
    code: `<Fab />\n<Fab tone="dark" />\n<Fab label="New chat" />`,
  },
  {
    name: 'Story rings',
    variants: 2,
    ...phoneProps,
    preview: <StoryRingsExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/StoryRings.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'story-rings',
    code: `<StoryRow\n  stories={[\n    { name: 'You', initials: 'ME' },\n    { name: 'Ada', initials: 'AL' },\n    { name: 'Linus', initials: 'LT', seen: true },\n  ]}\n/>`,
  },
  {
    name: 'Finance dashboard',
    variants: 3,
    ...phoneProps,
    preview: <FinanceDashboardExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/FinanceDashboard.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'finance-dashboard',
    code: `// Home -> Confirm payment (sheet) -> Payment sent (modal) -> Home\n<PhoneFrame hero>\n  <FinanceFlow>\n    <div className="fin-flow__home" inert={step !== 'home'}>\n      <FinanceScroll>\n        <FinanceHeader name="Ethan Carter" initials="EC" />\n        <BalanceHero amount={usd(balance)} change="+8.42%" changeAmount="+$9,684.20" />\n        <QuickActions />\n        <BillList bills={bills} onOpen={open} paidIds={paid} />\n      </FinanceScroll>\n      <FinanceTabs items={tabs} />\n    </div>\n    {step === 'confirm' && <ConfirmPaymentSheet bill={bill} from="Nimbus checking …4821" busy={busy} onConfirm={confirm} onClose={backHome} />}\n    {step === 'sent' && <PaymentSentModal payee={bill.payee} onDone={backHome} />}\n  </FinanceFlow>\n</PhoneFrame>`,
  },
  {
    name: 'Invoice detail',
    variants: 1,
    ...phoneProps,
    preview: <InvoiceDetailExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/InvoiceDetail.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'invoice-detail',
    code: `<PhoneFrame>
  <AppBar title="Invoice detail" onBack={() => {}} action={<DotsIcon />} />
  <FinanceScroll>
    <InvoiceSummary number="INV-110450" status="Paid" amount="$4,950.00" dates={dates} />
    <InvoiceParty name="Acme Studio" email="acmestudio@example.com" initials="AS" />
    <InvoiceItems lines={lines} taxRate={0.1} />
  </FinanceScroll>
  <InvoiceActions />
</PhoneFrame>`,
  },
  {
    name: 'Premium paywall',
    variants: 1,
    ...phoneProps,
    phoneHeight: 696,
    preview: <PremiumPaywallExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/PremiumPaywall.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'premium-paywall',
    code: `<PayCanvas tone="paywall">\n  <div className="pw__hero">\n    <ClayCloud />\n    <button className="pw__close" aria-label="Close">...</button>\n    <h1 className="pw__title">Level Up<br />with Premium</h1>\n    <p className="pw__sub">Because basic just<br />isn't enough.</p>\n    <ClayRing />\n  </div>\n  <div className="pw__strip" />\n  <button className="pw__restore">Restore Purchases</button>\n  <section className="pw__sheet">\n    <PlanRow plan={annual} top={26} />\n    <PlanRow plan={monthly} top={93} />\n    <button className="pw__cta">Start Free Trial</button>\n    <button className="pw__terms">Terms of Service</button>\n  </section>\n</PayCanvas>`,
  },
  {
    name: 'Restoring purchases',
    variants: 1,
    ...phoneProps,
    phoneHeight: 696,
    preview: <RestoringPurchasesExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/RestoringPurchases.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'restoring-purchases',
    code: `<PayCanvas tone="restoring">\n  <button className="pw__back" aria-label="Back">...</button>\n  <PlanCard x={314} y={282} rotate={-8} text="$4.99/month" />\n  <PlanCard x={79} y={186} rotate={7.6} text="$5.99/month" />\n  <PlanCard plan={monthly} x={321} y={305} rotate={-15} />\n  <PlanCard plan={annual} x={225} y={261} rotate={1.5} />\n  <ClayFlower />\n  <h1 className="pw__title pw__title--restoring">Restoring Purchases</h1>\n  <p className="pw__sub pw__sub--restoring">Just a sec - restoring<br />what's yours</p>\n  <svg className="pw-spinner" ... />\n</PayCanvas>`,
  },
  {
    name: 'Nexus home',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <NexusHomeExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/NexusHome.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'nexus-home',
    code: `<NexusCanvas>
  <NexusHeader />
  <StatCard x={20} label="Enrollment" ... />
  <StatCard x={236} label="Lesson Done" ... />
  <WeekStrip days={days} selected={3} />
  <HeroCard />
  <NexusTabs active="home" />
</NexusCanvas>`,
  },
  {
    name: 'Nexus courses',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <NexusCoursesExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/NexusCourses.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'nexus-courses',
    code: `<NexusCanvas>
  <h2 className="nx-h2">Suggested for you</h2>
  <SuggestedCard />
  <h2 className="nx-h2">Learn by doing</h2>
  <CourseCard x={20} tone="peach" topic="Photography" title="Nature And Wildlife"><FeltCamera /></CourseCard>
  <CourseCard x={236} tone="mint" topic="Financial" title="Debt Management"><FeltBlob /></CourseCard>
  <NexusTabs active="courses" />
</NexusCanvas>`,
  },
  {
    name: 'Nexus today',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <NexusTodayExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/NexusToday.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'nexus-today',
    code: `<NexusCanvas dim>
  <TrophyHero />
  <NexusHeader />
  <WeekStrip days={days} selected={3} top={581} flat />
  <h2 className="nx-h2">100 day challenge</h2>
  <ChallengeCard top={767} tone="lavender" chip="110,732 People" art={<FeltX />} />
  <NexusTabs active="today" />
</NexusCanvas>`,
  },
  {
    name: 'Nexus daily activity',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <NexusDailyExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/NexusDaily.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'nexus-daily-activity',
    code: `<NexusCanvas dim>
  <h2 className="nx-h2">Daily activity</h2>
  <WeekStrip days={days} selected={3} top={132} flat dividers />
  <h2 className="nx-h2">100 Day Challenge</h2>
  <ChallengeCard top={319} tone="lavender" chip="110,732 People" art={<FeltX />} title="Applying 'Into Equations' in problem solving" arrow />
  <h2 className="nx-h2">Science & Engineering</h2>
  <ChallengeCard top={804} tone="green" chip="8,240 People" art={<FeltV />} />
</NexusCanvas>`,
  },
  {
    name: 'Moimoi sign in',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <MoimoiSignInExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/MoimoiSignIn.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'moimoi-sign-in',
    code: `<MoimoiCanvas>\n  <Cast />\n  <Wordmark />\n  <MoimoiStatusBar />\n  <SignInPanel />\n</MoimoiCanvas>`,
  },
  {
    name: 'Fomo welcome',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <FomoWelcomeExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/FomoWelcome.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'fomo-welcome',
    code: `<FomoCanvas>\n  ...\n</FomoCanvas>`,
  },
  {
    name: 'Wabi welcome',
    variants: 1,
    ...phoneProps,
    phoneHeight: 640,
    preview: <WabiWelcomeExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/WabiWelcome.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'wabi-welcome',
    code: `<WabiCanvas>\n  ...\n</WabiCanvas>`,
  },
  {
    name: 'Sticker picker',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <StickerPickerExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/StickerPicker.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'sticker-picker',
    code: `<StickersCanvas>\n  ...\n</StickersCanvas>`,
  },
  {
    name: 'Circle editor',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <CircleEditorExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/CircleEditor.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'circle-editor',
    code: `<StickersCanvas>\n  ...\n</StickersCanvas>`,
  },
  {
    name: 'Orb profile',
    variants: 1,
    ...phoneProps,
    phoneHeight: 694,
    preview: <OrbProfile />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/OrbProfile.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'orb-profile',
    code: `<OrbProfile />`,
  },
  {
    name: 'Housewarming invite',
    variants: 1,
    ...phoneProps,
    phoneHeight: 697,
    preview: <HousewarmingInviteExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/HousewarmingInvite.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'housewarming-invite',
    code: `<PartyInvite />`,
  },
  {
    name: 'NFT search results',
    variants: 1,
    ...phoneProps,
    phoneHeight: 697,
    preview: <NftSearchResultsExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/NftSearchResults.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'nft-search-results',
    code: `<NftResults />`,
  },
  {
    name: 'Call flow',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <CallFlowExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/CallFlow.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'call-flow',
    code: `// Call flow: In call -> Keypad / Call Ended -> In call\n<CallScreen />`,
  },
  {
    name: 'Music profile compact',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <MusicProfileCompactExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/MusicProfileCompact.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'music-profile-compact',
    code: `<MusicProfileCompact />`,
  },
  {
    name: 'Music profile tiles',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <MusicProfileTilesExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/MusicProfileTiles.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'music-profile-tiles',
    code: `<MusicProfileTiles />`,
  },
  {
    name: 'Music control center',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <MusicControlCenterExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/MusicControlCenter.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'music-control-center',
    code: `<MusicProfileCenter />`,
  },
  {
    name: 'Music profile banners',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <MusicProfileBannersExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/MusicProfileBanners.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'music-profile-banners',
    code: `<MusicProfileBanners />`,
  },
  {
    name: 'Voice rooms flow',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <VoiceRoomsFlowExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/VoiceRoomsFlow.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'voice-rooms-flow',
    code: `// Home -> Live room -> Participants / Chat; Home -> Teaser, Universe, Creator Card, Your voice\n<VoiceFlow initial="home" />`,
  },
  {
    name: 'NFT auction flow',
    variants: 1,
    ...phoneProps,
    phoneHeight: 688,
    preview: <NftAuctionFlowExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/NftAuctionFlow.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'nft-auction-flow',
    code: `// Live Bids -> item detail (Bids / Offers) -> Place a bid sheet\n<AuctionFlow initial="live" />`,
  },
  {
    name: 'Bookshelf flow',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <BookshelfFlowExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/BookshelfFlow.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'bookshelf-flow',
    code: `// Explore <-> Library through the tab bar\n<BookshelfFlow initial="explore" />`,
  },
  {
    name: 'Book onboarding flow',
    variants: 1,
    ...phoneProps,
    phoneHeight: 692,
    preview: <BookOnboardingFlowExample />,
    sourceEntries: [{ path: 'src/components/AppUI/examples/BookOnboardingFlow.tsx' }, { path: 'src/components/AppUI/AppUI.css' }, { path: 'src/styles/tokens.css' }],
    helper: 'book-onboarding-flow',
    code: `// Learn Smarter -> Topics -> Are you interested in this book? (Yes / No through three books) -> back to the start\n<OnboardingFlow />`,
  },
];

const withCategory = (category: LibraryCategory) => (item: BaseItem) => ({ ...item, category });

// Every master prompt is a real Markdown file in /prompts (one per item). It is the only source of the prompt text.
const promptFiles = import.meta.glob('/prompts/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function withPrompt(item: Omit<LibraryItem, 'prompt' | 'promptPath'>): LibraryItem {
  const promptPath = `prompts/${item.category}/${slugify(item.name)}.md`;
  const text = promptFiles[`/${promptPath}`];
  if (text === undefined) throw new Error(`Missing prompt file: ${promptPath}`);
  return { ...item, prompt: text, promptPath };
}

export const libraryItems: LibraryItem[] = [
  ...componentItems.map(withCategory('components')),
  ...ariaItems.map(withCategory('components')),
  ...blockItems.map(withCategory('blocks')),
  ...templateItems.map(withCategory('templates')),
  ...backgroundItems.map(withCategory('backgrounds')),
  ...uiElementItems.map(withCategory('ui-elements')),
  ...appItems.map(withCategory('app')),
].map(withPrompt);

export const libraryCategories: { id: LibraryCategory; label: string; subtitle: string }[] = [
  { id: 'components', label: 'Components', subtitle: 'Core building blocks. Click a tile for a large preview, or copy its code or master prompt.' },
  { id: 'blocks', label: 'Blocks', subtitle: 'Ready-made sections composed from the components above.' },
  { id: 'templates', label: 'Templates', subtitle: 'Full-page layouts: landing, dashboard, sign in and settings.' },
  { id: 'backgrounds', label: 'Backgrounds', subtitle: 'Pure-CSS backgrounds that follow the light and dark themes.' },
  { id: 'ui-elements', label: 'UI Elements', subtitle: 'Small primitives: badges, keys, dividers and progress.' },
  { id: 'app', label: 'App', subtitle: 'Mobile app style elements: tab bar, app bar, grouped lists, bottom sheet and more.' },
];
