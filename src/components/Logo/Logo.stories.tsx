import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: { size: { control: { type: 'range', min: 16, max: 256, step: 4 } } },
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: 96 } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      {[16, 24, 32, 48, 64, 96].map((s) => <Logo key={s} size={s} />)}
    </div>
  ),
};
