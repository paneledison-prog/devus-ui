import type { Meta, StoryObj } from '@storybook/react-vite';
import { OtpInput } from './OtpInput';

const meta = {
  title: 'Components/OtpInput', component: OtpInput, tags: ['autodocs'],
  argTypes: { length: { control: { type: 'range', min: 3, max: 8 } } },
} satisfies Meta<typeof OtpInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SixDigits: Story = { args: { length: 6 } };
