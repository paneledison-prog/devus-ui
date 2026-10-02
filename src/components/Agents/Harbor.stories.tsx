import type { Meta, StoryObj } from '@storybook/react-vite';
import { HarborDemo } from './Harbor';

const meta = {
  title: 'Templates/AI Platform Demo',
  component: HarborDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof HarborDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Dark: Story = { args: { defaultTheme: 'dark' } };
