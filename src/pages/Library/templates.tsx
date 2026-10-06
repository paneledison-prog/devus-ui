import type { LibraryItem } from './libraryItems';
import { CaseStudyTemplate } from '../../components/CaseStudy/CaseStudy';
import { WorkspaceDemo } from '../../components/Workspace/Workspace';
import { CrmDemo } from '../../components/Crm/Crm';
import { BeaconDemo } from '../../components/Agents/Beacon';
import { HarborDemo } from '../../components/Agents/Harbor';
import { PairwiseDemo } from '../../components/Agents/Pairwise';
import { BuildAgentDemo } from '../../components/BuildAgent/BuildAgent';
import { MoodboardDemo } from '../../components/Moodboard/Moodboard';
import { ChatStudioDemo } from '../../components/ChatStudio/ChatStudio';
import { slugify } from './slug';

type TemplateItem = Omit<LibraryItem, 'category' | 'prompt' | 'promptPath'>;

const templateBase: TemplateItem[] = [
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
    name: 'Moodboard canvas',
    sourceEntries: [{ path: 'src/components/Moodboard/Moodboard.tsx' }, { path: 'src/components/Moodboard/MoodboardArt.tsx' }, { path: 'src/components/Moodboard/Moodboard.css' }, { path: 'src/styles/tokens.css' }],
    variants: 2,
    tileZoom: 0.3,
    defaultZoom: 0.75,
    standalone: <MoodboardDemo />,
    preview: <div style={{ width: 1000, height: 720 }}><MoodboardDemo /></div>,
    code: `<MoodboardDemo />

// Open another space:
<MoodboardDemo initialSpace="Ideas" />`,
  },
  {
    name: 'AI chat studio',
    sourceEntries: [{ path: 'src/components/ChatStudio/ChatStudio.tsx' }, { path: 'src/components/ChatStudio/ChatStudioArt.tsx' }, { path: 'src/components/ChatStudio/ChatStudio.css' }, { path: 'src/styles/tokens.css' }],
    variants: 3,
    tileZoom: 0.3,
    defaultZoom: 0.75,
    standalone: <ChatStudioDemo />,
    preview: <div style={{ width: 1000, height: 625 }}><ChatStudioDemo /></div>,
    code: `<ChatStudioDemo />

// Open another view:
<ChatStudioDemo startView="calendar" />
<ChatStudioDemo startView="code" />`,
  },
];

/** Every template ships a real helper folder at `helper/<slug>/`. */
export const templateItems: TemplateItem[] = templateBase.map((item) => ({ ...item, helper: slugify(item.name) }));
