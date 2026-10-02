import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta = { title: 'UI Elements/Separator', component: Separator, tags: ['autodocs'] } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = { decorators: [(S) => <div style={{ width: 280 }}><S /></div>] };
export const Vertical: Story = { args: { orientation: 'vertical' } };
export const Labeled: Story = { args: { label: 'or continue with' }, decorators: [(S) => <div style={{ width: 280 }}><S /></div>] };
