import type { Meta, StoryObj } from '@storybook/react-vite';
import { SlideToConfirm } from './SlideToConfirm';

const meta = { title: 'UI Elements/SlideToConfirm', component: SlideToConfirm, tags: ['autodocs'] } satisfies Meta<typeof SlideToConfirm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomLabel: Story = { args: { label: 'Slide to pay', confirmedLabel: 'Paid' } };
