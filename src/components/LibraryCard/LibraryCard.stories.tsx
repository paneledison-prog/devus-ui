import type { Meta, StoryObj } from '@storybook/react-vite';
import { LibraryCard } from './LibraryCard';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/LibraryCard',
  component: LibraryCard,
  tags: ['autodocs'],
  args: {
    name: 'Button',
    variants: 7,
    preview: <Button>Primary</Button>,
    code: '<Button>Primary</Button>',
    prompt: 'Build a React <Button> component for Devus UI.',
  },
  decorators: [(Story) => <div style={{ width: 313 }}><Story /></div>],
} satisfies Meta<typeof LibraryCard>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
