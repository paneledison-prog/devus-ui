import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const tones = ['default', 'accent', 'success', 'warning', 'danger'] as const;

const meta = {
  title: 'UI Elements/Badge', component: Badge, tags: ['autodocs'], args: { children: 'New' },
  argTypes: { tone: { control: 'select', options: tones } },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => <div style={{ display: 'flex', gap: 8 }}>{tones.map((t) => <Badge key={t} tone={t}>{t}</Badge>)}</div>,
};
