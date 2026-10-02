import type { Meta, StoryObj } from '@storybook/react-vite';
import { CrmDemo } from './Crm';

const meta = {
  title: 'Templates/CRM Workspace Demo',
  component: CrmDemo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh' }}><Story /></div>],
} satisfies Meta<typeof CrmDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FullJourney: Story = { args: { startAt: 'signup' } };
export const CompaniesTable: Story = { args: { startAt: 'app' } };
export const Dark: Story = { args: { startAt: 'app', defaultTheme: 'dark' } };
