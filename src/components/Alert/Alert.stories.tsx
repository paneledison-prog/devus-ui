import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert', component: Alert, tags: ['autodocs'],
  args: { title: 'New update available', children: 'Restart the app to apply the latest changes.' },
  argTypes: { status: { control: 'select', options: ['default', 'success', 'warning', 'danger'] } },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { status: 'success' } };
export const Warning: Story = { args: { status: 'warning' } };
export const Danger: Story = { args: { status: 'danger', title: 'Something went wrong' } };
