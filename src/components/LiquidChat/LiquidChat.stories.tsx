import type { Meta, StoryObj } from '@storybook/react-vite';
import { LiquidChatDemo } from './LiquidChat';

const meta = {
  title: 'Templates/Liquid Glass Chat',
  component: LiquidChatDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof LiquidChatDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Inbox: Story = { args: {} };
export const Conversation: Story = { args: { startAt: 'chat' } };
export const Dark: Story = { args: { defaultTheme: 'dark' } };
