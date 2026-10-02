import type { Meta, StoryObj } from '@storybook/react-vite';
import { BuildAgentDemo } from './BuildAgent';

const meta = {
  title: 'Templates/Build Agent Demo',
  component: BuildAgentDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof BuildAgentDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const RunningThread: Story = { args: { startAt: 'thread' } };
export const Dark: Story = { args: { defaultTheme: 'dark' } };
