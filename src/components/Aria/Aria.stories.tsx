import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AriaAccordion, AriaBreadcrumbs, AriaCalendar, AriaComboBox, AriaDateField, AriaMenu, AriaMeter, AriaModal,
  AriaNumberField, AriaRadioGroup, AriaSearchField, AriaSelect, AriaSlider, AriaTabs, AriaTagGroup, AriaToggleGroup,
} from './Aria';

const meta = { title: 'Components/Accessible primitives', parameters: { layout: 'centered' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const fruit = [{ id: 'apple', label: 'Apple' }, { id: 'banana', label: 'Banana' }, { id: 'cherry', label: 'Cherry' }];

export const Select: Story = { render: () => <AriaSelect label="Role" options={[{ id: 'admin', label: 'Admin' }, { id: 'editor', label: 'Editor' }, { id: 'viewer', label: 'Viewer' }]} /> };
export const ComboBox: Story = { render: () => <AriaComboBox label="Favorite fruit" options={fruit} /> };
export const Slider: Story = { render: () => <AriaSlider label="Volume" /> };
export const Tabs: Story = { render: () => <AriaTabs tabs={[{ id: 'a', label: 'Overview', content: 'Summary' }, { id: 'b', label: 'Activity', content: 'Changes' }]} /> };
export const Accordion: Story = { render: () => <AriaAccordion defaultExpanded={['a']} items={[{ id: 'a', title: 'First', body: 'Open by default.' }, { id: 'b', title: 'Second', body: 'Hidden until opened.' }]} /> };
export const RadioGroup: Story = { render: () => <AriaRadioGroup label="Plan" defaultValue="pro" options={[{ id: 'free', label: 'Free', description: 'Side projects' }, { id: 'pro', label: 'Pro', description: 'Growing teams' }]} /> };
export const NumberField: Story = { render: () => <AriaNumberField label="Guests" min={1} max={8} /> };
export const Menu: Story = { render: () => <AriaMenu label="Actions" items={[{ id: 'edit', label: 'Edit' }, { id: 'delete', label: 'Delete', danger: true }]} /> };
export const Calendar: Story = { render: () => <AriaCalendar /> };
export const DateField: Story = { render: () => <AriaDateField label="Birthday" /> };
export const TagGroup: Story = { render: () => <AriaTagGroup label="Interests" tags={fruit} /> };
export const SearchField: Story = { render: () => <AriaSearchField /> };
export const Breadcrumbs: Story = { render: () => <AriaBreadcrumbs items={[{ id: 'h', label: 'Home', href: '#' }, { id: 'p', label: 'Projects', href: '#' }, { id: 'd', label: 'Design', href: '#' }]} /> };
export const ToggleButtonGroup: Story = { render: () => <AriaToggleGroup label="Alignment" defaultSelected={['left']} options={[{ id: 'left', label: 'Left' }, { id: 'right', label: 'Right' }]} /> };
export const Meter: Story = { render: () => <AriaMeter label="Storage" value={78} /> };
export const Modal: Story = { render: () => <AriaModal trigger="Delete project" title="Delete this project?" description="This cannot be undone." confirmLabel="Delete" danger /> };
