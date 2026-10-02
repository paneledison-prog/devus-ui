import type { Meta, StoryObj } from '@storybook/react-vite';
import { BeaconDemo } from './Beacon';

const meta = {
  title: 'Templates/Company Intelligence Demo',
  component: BeaconDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof BeaconDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const Dark: Story = { args: { defaultTheme: 'dark' } };
