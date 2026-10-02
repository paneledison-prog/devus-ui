import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkspaceDemo } from './Workspace';

const meta = {
  title: 'Templates/AI Workspace Demo',
  component: WorkspaceDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof WorkspaceDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { args: { defaultTheme: 'light' } };
export const Dark: Story = { args: { defaultTheme: 'dark' } };
