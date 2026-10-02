import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageCompare } from './ImageCompare';

const meta = { title: 'UI Elements/ImageCompare', component: ImageCompare, tags: ['autodocs'] } satisfies Meta<typeof ImageCompare>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
