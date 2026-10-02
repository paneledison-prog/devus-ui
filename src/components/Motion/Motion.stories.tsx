import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, MagneticDock, DynamicIsland, MemberStack } from './Motion';
import { dockItems } from './dockItems';

const meta = { title: 'Components/Motion', parameters: { layout: 'centered' }, decorators: [(S) => <div style={{ padding: 60 }}><S /></div>] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const RichTooltip: Story = { render: () => <Tooltip title="Search" description="Find anything in your workspace" shortcut="Ctrl K"><button>Hover me</button></Tooltip> };
export const Dock: Story = { render: () => <MagneticDock items={dockItems} /> };
export const Island: Story = { render: () => <DynamicIsland /> };
export const IslandCall: Story = { render: () => <DynamicIsland defaultState="call" /> };
export const Members: Story = { render: () => <MemberStack members={[{ name: 'Mara Voss', role: 'Design' }, { name: 'Jonas Keel', role: 'Engineering' }, { name: 'Priya Raman', role: 'Product' }, { name: 'Theo Marsh', role: 'Support' }]} /> };
