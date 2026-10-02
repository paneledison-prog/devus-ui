import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneFrame } from './PhoneFrame';
import { TabBar } from './TabBar';
import { AppBar } from './AppBar';
import { ListGroup, ListRow } from './ListRow';
import { BottomSheet } from './BottomSheet';
import { Fab } from './Fab';
import { StoryRow } from './StoryRing';
import { Button } from '../Button/Button';
import { Switch } from '../Switch/Switch';
import { BellIcon, GearIcon, HeartIcon, HomeIcon, SearchIcon, UserIcon } from './icons';

const tabs = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'saved', label: 'Saved', icon: <HeartIcon /> },
  { id: 'me', label: 'Profile', icon: <UserIcon /> },
];

const meta = { title: 'App/Mobile', parameters: { layout: 'centered' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Tabs: Story = { render: () => <TabBar items={tabs} /> };
export const Bar: Story = { render: () => <AppBar title="Settings" onBack={() => {}} action="Edit" /> };
export const LargeBar: Story = { render: () => <AppBar title="Inbox" large action={<BellIcon />} /> };
export const Grouped: Story = {
  render: () => (
    <ListGroup label="Account">
      <ListRow icon={<UserIcon />} title="Profile" />
      <ListRow icon={<BellIcon />} title="Notifications" value="On" />
      <ListRow icon={<GearIcon />} title="Dark mode" trailing={<Switch aria-label="Dark mode" />} />
    </ListGroup>
  ),
};
export const Sheet: Story = {
  render: () => (
    <BottomSheet title="Share project" footer={<><Button>Copy link</Button><Button variant="ghost">Cancel</Button></>}>
      <ListRow title="Message" />
      <ListRow title="Email" />
    </BottomSheet>
  ),
};
export const FloatingAction: Story = { render: () => <div style={{ display: 'flex', gap: 16 }}><Fab /><Fab label="New chat" /></div> };
export const Stories: Story = {
  render: () => <StoryRow stories={[{ name: 'You', initials: 'ME' }, { name: 'Ada', initials: 'AL' }, { name: 'Linus', initials: 'LT', seen: true }]} />,
};
export const HomeScreen: Story = {
  render: () => (
    <PhoneFrame>
      <AppBar title="Inbox" large action={<BellIcon />} />
      <StoryRow stories={[{ name: 'You', initials: 'ME' }, { name: 'Ada', initials: 'AL' }, { name: 'Linus', initials: 'LT', seen: true }]} />
      <ListGroup label="Recent">
        <ListRow icon={<UserIcon />} title="Design review" value="9:12" />
        <ListRow icon={<HeartIcon />} title="Saved items" />
        <ListRow icon={<GearIcon />} title="Settings" />
      </ListGroup>
      <TabBar items={tabs} />
    </PhoneFrame>
  ),
};
