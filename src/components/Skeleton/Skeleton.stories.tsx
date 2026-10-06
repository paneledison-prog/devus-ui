import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, SkeletonText } from './Skeleton';

const meta = { title: 'Feedback/Skeleton', component: Skeleton, tags: ['autodocs'] } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Rect: Story = { args: { width: 240, height: 120 } };
export const Circle: Story = { args: { variant: 'circle', width: 48, height: 48 } };
export const Text: Story = { args: { variant: 'text', width: 200 } };
export const Card: Story = {
  render: () => (
    <div aria-busy="true" style={{ display: 'grid', gap: 12, width: 280 }}>
      <Skeleton width="100%" height={150} />
      <SkeletonText lines={2} />
    </div>
  ),
};
