import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoodboardDemo } from './Moodboard';

const meta = {
  title: 'Templates/Moodboard canvas',
  component: MoodboardDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof MoodboardDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = { args: {} };
export const Ideas: Story = { args: { initialSpace: 'Ideas' } };
