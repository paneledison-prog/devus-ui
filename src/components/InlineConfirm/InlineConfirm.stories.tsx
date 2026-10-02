import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineConfirm } from './InlineConfirm';

const meta = { title: 'UI Elements/InlineConfirm', component: InlineConfirm, tags: ['autodocs'] } satisfies Meta<typeof InlineConfirm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomLabel: Story = { args: { label: 'Remove project' } };
