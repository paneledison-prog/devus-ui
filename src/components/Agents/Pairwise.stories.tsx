import type { Meta, StoryObj } from '@storybook/react-vite';
import { PairwiseDemo } from './Pairwise';

const meta = {
  title: 'Templates/Agent Builder Demo',
  component: PairwiseDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof PairwiseDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Dark: Story = { args: { defaultTheme: 'dark' } };
