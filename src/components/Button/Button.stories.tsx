import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const variants = ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'danger', 'dangerSoft'] as const;

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const IconOnly: Story = { args: { iconOnly: true, children: '★', 'aria-label': 'Favorite' } };

export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map((v) => <Button key={v} variant={v} size={size}>{v}</Button>)}
        </div>
      ))}
    </div>
  ),
};
