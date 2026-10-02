import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Email', placeholder: 'you@example.com' },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'Never shared with third parties.' } };
export const Invalid: Story = { args: { errorMessage: 'Enter a valid email address.', defaultValue: 'nope' } };
export const Disabled: Story = { args: { disabled: true } };
