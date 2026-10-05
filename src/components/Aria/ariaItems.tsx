import type { LibraryItem } from '../../pages/Library/libraryItems';
import {
  AriaAccordion, AriaBreadcrumbs, AriaCalendar, AriaComboBox, AriaDateField, AriaMenu, AriaMeter, AriaModal,
  AriaNumberField, AriaRadioGroup, AriaSearchField, AriaSelect, AriaSlider, AriaTabs, AriaTagGroup, AriaToggleGroup,
} from './Aria';

type Item = Omit<LibraryItem, 'category' | 'prompt' | 'promptPath'>;

const RAC = 'Built on react-aria-components (npm i react-aria-components): ';
const fruit = [{ id: 'apple', label: 'Apple' }, { id: 'banana', label: 'Banana' }, { id: 'cherry', label: 'Cherry' }, { id: 'grape', label: 'Grape' }, { id: 'mango', label: 'Mango' }];
const roles = [{ id: 'admin', label: 'Admin' }, { id: 'editor', label: 'Editor' }, { id: 'viewer', label: 'Viewer' }];

export const ariaItems: Item[] = [
  {
    name: 'Select',
    variants: 2,
    defaultZoom: 1.25,
    preview: <AriaSelect label="Role" options={roles} defaultValue="editor" />,
    code: `import { Select, Label, Button, SelectValue, Popover, ListBox, ListBoxItem } from 'react-aria-components';\n\n<Select defaultSelectedKey="editor">\n  <Label>Role</Label>\n  <Button><SelectValue /></Button>\n  <Popover>\n    <ListBox>\n      <ListBoxItem id="admin">Admin</ListBoxItem>\n      <ListBoxItem id="editor">Editor</ListBoxItem>\n      <ListBoxItem id="viewer">Viewer</ListBoxItem>\n    </ListBox>\n  </Popover>\n</Select>`,
  },
  {
    name: 'Combo box',
    variants: 1,
    defaultZoom: 1.25,
    preview: <AriaComboBox label="Favorite fruit" options={fruit} />,
    code: `import { ComboBox, Label, Input, Button, Popover, ListBox, ListBoxItem } from 'react-aria-components';\n\n<ComboBox defaultItems={fruit}>\n  <Label>Favorite fruit</Label>\n  <Input placeholder="Type to search" />\n  <Button aria-label="Show suggestions">▾</Button>\n  <Popover>\n    <ListBox>{(f) => <ListBoxItem>{f.label}</ListBoxItem>}</ListBox>\n  </Popover>\n</ComboBox>`,
  },
  {
    name: 'Slider',
    variants: 2,
    defaultZoom: 1.25,
    preview: <AriaSlider label="Volume" defaultValue={60} />,
    code: `import { Slider, Label, SliderOutput, SliderTrack, SliderThumb } from 'react-aria-components';\n\n<Slider defaultValue={60}>\n  <Label>Volume</Label>\n  <SliderOutput />\n  <SliderTrack>\n    {({ state }) => (\n      <>\n        <div className="bar" />\n        <div className="fill" style={{ width: state.getThumbPercent(0) * 100 + '%' }} />\n        <SliderThumb />\n      </>\n    )}\n  </SliderTrack>\n</Slider>`,
  },
  {
    name: 'Tabs',
    tileZoom: 0.8,
    variants: 1,
    defaultZoom: 1.25,
    preview: <AriaTabs tabs={[{ id: 'overview', label: 'Overview', content: 'A quick summary of the project.' }, { id: 'activity', label: 'Activity', content: 'Recent changes by your team.' }, { id: 'settings', label: 'Settings', content: 'Manage access and billing.' }]} />,
    code: `import { Tabs, TabList, Tab, TabPanel } from 'react-aria-components';\n\n<Tabs>\n  <TabList aria-label="Sections">\n    <Tab id="overview">Overview</Tab>\n    <Tab id="activity">Activity</Tab>\n    <Tab id="settings">Settings</Tab>\n  </TabList>\n  <TabPanel id="overview">A quick summary of the project.</TabPanel>\n  <TabPanel id="activity">Recent changes by your team.</TabPanel>\n  <TabPanel id="settings">Manage access and billing.</TabPanel>\n</Tabs>`,
  },
  {
    name: 'Accordion',
    tileZoom: 0.75,
    variants: 2,
    defaultZoom: 1.25,
    preview: <AriaAccordion defaultExpanded={['one']} items={[{ id: 'one', title: 'What is included?', body: 'Every component, with code and a master prompt.' }, { id: 'two', title: 'Can I customize it?', body: 'Yes, everything is driven by design tokens.' }, { id: 'three', title: 'Is it accessible?', body: 'Keyboard and screen reader support is built in.' }]} />,
    code: `import { DisclosureGroup, Disclosure, Heading, Button, DisclosurePanel } from 'react-aria-components';\n\n<DisclosureGroup defaultExpandedKeys={['one']}>\n  <Disclosure id="one">\n    <Heading level={3}>\n      <Button slot="trigger">What is included?</Button>\n    </Heading>\n    <DisclosurePanel>Every component, with code and a master prompt.</DisclosurePanel>\n  </Disclosure>\n</DisclosureGroup>`,
  },
  {
    name: 'Radio group',
    tileZoom: 0.7,
    variants: 2,
    defaultZoom: 1.25,
    preview: <AriaRadioGroup label="Plan" defaultValue="pro" options={[{ id: 'free', label: 'Free', description: 'For side projects' }, { id: 'pro', label: 'Pro', description: 'For growing teams' }, { id: 'team', label: 'Team', description: 'Advanced controls' }]} />,
    code: `import { RadioGroup, Radio, Label, Text } from 'react-aria-components';\n\n<RadioGroup defaultValue="pro">\n  <Label>Plan</Label>\n  <Radio value="free">Free <Text slot="description">For side projects</Text></Radio>\n  <Radio value="pro">Pro <Text slot="description">For growing teams</Text></Radio>\n</RadioGroup>`,
  },
  {
    name: 'Number field',
    variants: 1,
    defaultZoom: 1.25,
    preview: <AriaNumberField label="Guests" defaultValue={2} min={1} max={8} />,
    code: `import { NumberField, Label, Button, Input } from 'react-aria-components';\n\n<NumberField defaultValue={2} minValue={1} maxValue={8}>\n  <Label>Guests</Label>\n  <Button slot="decrement">−</Button>\n  <Input />\n  <Button slot="increment">+</Button>\n</NumberField>`,
  },
  {
    name: 'Menu',
    variants: 1,
    defaultZoom: 1.25,
    preview: <div style={{ minHeight: 190 }}><AriaMenu label="Actions" items={[{ id: 'edit', label: 'Edit', shortcut: 'E' }, { id: 'duplicate', label: 'Duplicate', shortcut: 'D' }, { id: 'archive', label: 'Archive' }, { id: 'delete', label: 'Delete', danger: true }]} /></div>,
    code: `import { MenuTrigger, Button, Popover, Menu, MenuItem } from 'react-aria-components';\n\n<MenuTrigger>\n  <Button>Actions</Button>\n  <Popover>\n    <Menu onAction={(key) => run(key)}>\n      <MenuItem id="edit">Edit</MenuItem>\n      <MenuItem id="duplicate">Duplicate</MenuItem>\n      <MenuItem id="delete">Delete</MenuItem>\n    </Menu>\n  </Popover>\n</MenuTrigger>`,
  },
  {
    name: 'Calendar',
    tileZoom: 0.75,
    variants: 1,
    defaultZoom: 1.25,
    preview: <AriaCalendar />,
    code: `import { Calendar, Heading, Button, CalendarGrid, CalendarCell } from 'react-aria-components';\nimport { parseDate } from '@internationalized/date';\n\n<Calendar aria-label="Appointment date" defaultValue={parseDate('2026-10-14')}>\n  <header>\n    <Button slot="previous">‹</Button>\n    <Heading />\n    <Button slot="next">›</Button>\n  </header>\n  <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>\n</Calendar>`,
  },
  {
    name: 'Date field',
    variants: 1,
    defaultZoom: 1.25,
    preview: <AriaDateField label="Birthday" />,
    code: `import { DateField, Label, DateInput, DateSegment } from 'react-aria-components';\nimport { parseDate } from '@internationalized/date';\n\n<DateField defaultValue={parseDate('2026-10-14')}>\n  <Label>Birthday</Label>\n  <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>\n</DateField>`,
  },
  {
    name: 'Tag group',
    variants: 2,
    defaultZoom: 1.25,
    preview: <AriaTagGroup label="Interests" tags={[{ id: 'design', label: 'Design' }, { id: 'code', label: 'Code' }, { id: 'music', label: 'Music' }, { id: 'travel', label: 'Travel' }]} />,
    code: `import { TagGroup, Label, TagList, Tag, Button } from 'react-aria-components';\n\n<TagGroup selectionMode="multiple" onRemove={(keys) => remove(keys)}>\n  <Label>Interests</Label>\n  <TagList items={tags}>\n    {(t) => (\n      <Tag id={t.id}>\n        {({ allowsRemoving }) => (<>{t.label}{allowsRemoving && <Button slot="remove">×</Button>}</>)}\n      </Tag>\n    )}\n  </TagList>\n</TagGroup>`,
  },
  {
    name: 'Search field',
    variants: 1,
    defaultZoom: 1.25,
    preview: <AriaSearchField />,
    code: `import { SearchField, Label, Input, Button } from 'react-aria-components';\n\n<SearchField onSubmit={(q) => search(q)}>\n  <Label>Search</Label>\n  <Input placeholder="Search components" />\n  <Button>×</Button>\n</SearchField>`,
  },
  {
    name: 'Breadcrumbs',
    variants: 1,
    defaultZoom: 1.5,
    preview: <AriaBreadcrumbs items={[{ id: 'home', label: 'Home', href: '#' }, { id: 'projects', label: 'Projects', href: '#' }, { id: 'design', label: 'Design system', href: '#' }]} />,
    code: `import { Breadcrumbs, Breadcrumb, Link } from 'react-aria-components';\n\n<Breadcrumbs>\n  <Breadcrumb><Link href="/">Home</Link></Breadcrumb>\n  <Breadcrumb><Link href="/projects">Projects</Link></Breadcrumb>\n  <Breadcrumb><Link>Design system</Link></Breadcrumb>\n</Breadcrumbs>`,
  },
  {
    name: 'Toggle button group',
    variants: 2,
    defaultZoom: 1.5,
    preview: <AriaToggleGroup label="Text alignment" defaultSelected={['center']} options={[{ id: 'left', label: 'Left' }, { id: 'center', label: 'Center' }, { id: 'right', label: 'Right' }]} />,
    code: `import { ToggleButtonGroup, ToggleButton } from 'react-aria-components';\n\n<ToggleButtonGroup aria-label="Text alignment" selectionMode="single" defaultSelectedKeys={['center']}>\n  <ToggleButton id="left">Left</ToggleButton>\n  <ToggleButton id="center">Center</ToggleButton>\n  <ToggleButton id="right">Right</ToggleButton>\n</ToggleButtonGroup>`,
  },
  {
    name: 'Meter',
    tileZoom: 0.9,
    variants: 3,
    defaultZoom: 1.25,
    preview: <div style={{ display: 'grid', gap: 14 }}><AriaMeter label="Storage used" value={42} /><AriaMeter label="Bandwidth" value={78} /><AriaMeter label="API quota" value={96} /></div>,
    code: `import { Meter, Label } from 'react-aria-components';\n\n<Meter value={78}>\n  {({ percentage, valueText }) => (\n    <>\n      <Label>Bandwidth</Label>\n      <span>{valueText}</span>\n      <div className="track">\n        <div className="fill" style={{ width: percentage + '%' }} />\n      </div>\n    </>\n  )}\n</Meter>`,
  },
  {
    name: 'Modal dialog',
    variants: 2,
    defaultZoom: 1.25,
    preview: <div style={{ display: 'flex', gap: 8 }}><AriaModal trigger="Invite teammate" title="Invite a teammate" description="They will get an email with a link to join your workspace." confirmLabel="Send invite" /><AriaModal trigger="Delete project" title="Delete this project?" description="This permanently removes the project and its files. This cannot be undone." confirmLabel="Delete" danger /></div>,
    code: `import { DialogTrigger, Button, ModalOverlay, Modal, Dialog, Heading } from 'react-aria-components';\n\n<DialogTrigger>\n  <Button>Delete project</Button>\n  <ModalOverlay isDismissable>\n    <Modal>\n      <Dialog>\n        {({ close }) => (\n          <>\n            <Heading slot="title">Delete this project?</Heading>\n            <p>This cannot be undone.</p>\n            <Button onPress={close}>Cancel</Button>\n            <Button onPress={close}>Delete</Button>\n          </>\n        )}\n      </Dialog>\n    </Modal>\n  </ModalOverlay>\n</DialogTrigger>`,
  },
];
