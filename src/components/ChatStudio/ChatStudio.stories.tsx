import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatStudioDemo } from './ChatStudio';

const meta = {
  title: 'Templates/AI chat studio',
  component: ChatStudioDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof ChatStudioDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Chats: Story = { args: {} };
export const Schedule: Story = { args: { startView: 'calendar' } };
export const Prompts: Story = { args: { startView: 'code' } };
