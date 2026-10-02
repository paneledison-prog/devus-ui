import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Components/SegmentedControl', component: SegmentedControl, tags: ['autodocs'],
  args: { label: 'Range', options: [{ value: '1h', label: '1H' }, { value: '4h', label: '4H' }, { value: '1d', label: '1D' }], defaultValue: '4h' },
} satisfies Meta<typeof SegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
