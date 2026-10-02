import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Components/Avatar', component: Avatar, tags: ['autodocs'], args: { fallback: 'AB' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {};
export const Group: Story = {
  render: () => <AvatarGroup><Avatar fallback="AB" /><Avatar fallback="CD" /><Avatar fallback="EF" /><Avatar fallback="+3" /></AvatarGroup>,
};
