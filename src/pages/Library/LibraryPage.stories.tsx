import type { Meta, StoryObj } from '@storybook/react-vite';
import { LibraryPage } from './LibraryPage';

const meta = {
  title: 'Pages/Library',
  component: LibraryPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LibraryPage>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
