import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseStudyTemplate } from './CaseStudy';

const meta = {
  title: 'Templates/CaseStudy',
  component: CaseStudyTemplate,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof CaseStudyTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomCopy: Story = { args: { name: 'Nimbus', overview: 'Your own project summary goes here.', scope: 'Brand, product design' } };
