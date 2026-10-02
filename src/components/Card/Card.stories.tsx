import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta = { title: 'Components/Card', component: Card, tags: ['autodocs'] } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Team plan',
    description: 'Collaborate with unlimited members and projects.',
    footer: <><Button size="sm">Upgrade</Button><Button size="sm" variant="ghost">Later</Button></>,
  },
};
