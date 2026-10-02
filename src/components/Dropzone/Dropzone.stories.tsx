import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropzone } from './Dropzone';

const meta = { title: 'Components/Dropzone', component: Dropzone, tags: ['autodocs'] } satisfies Meta<typeof Dropzone>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ImagesOnly: Story = { args: { accept: 'image/*', hint: 'PNG or JPG, up to 5 MB' } };
