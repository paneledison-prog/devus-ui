import type { Meta, StoryObj } from '@storybook/react-vite';
import { portraits } from './portraits';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Components/Avatar', component: Avatar, tags: ['autodocs'], args: { fallback: 'AB' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {};
export const Group: Story = {
  render: () => <AvatarGroup><Avatar src={portraits[0]} alt="Mara" /><Avatar src={portraits[2]} alt="Jonas" /><Avatar src={portraits[5]} alt="Iris" /><Avatar fallback="+3" /></AvatarGroup>,
};
