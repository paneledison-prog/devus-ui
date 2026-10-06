import { SegmentedControl } from '../../SegmentedControl/SegmentedControl';
import { Checkbox } from '../../Checkbox/Checkbox';
import { AppCard } from '../Cards';
import { HomeIcon, SearchIcon, UserIcon } from '../icons';

/** Sample data shared by the App examples. */
export const appTabs = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'insights', label: 'Insights', icon: <SearchIcon /> },
  { id: 'profile', label: 'Profile', icon: <UserIcon /> },
];

export const appStories = [
  { name: 'You', initials: 'ME' },
  { name: 'Ada', initials: 'AL' },
  { name: 'Linus', initials: 'LT', seen: true },
  { name: 'Grace', initials: 'GH' },
  { name: 'Alan', initials: 'AT', seen: true },
  { name: 'Joan', initials: 'JC' },
  { name: 'Dennis', initials: 'DR' },
];

export const appDays = [
  { id: 'mon', day: 'Mon', date: 8 }, { id: 'tue', day: 'Tue', date: 9 }, { id: 'wed', day: 'Wed', date: 10 },
  { id: 'thu', day: 'Thu', date: 11 }, { id: 'fri', day: 'Fri', date: 12 }, { id: 'sat', day: 'Sat', date: 13 },
];

export const appFilter = [
  { value: 'todo', label: 'To do' },
  { value: 'done', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
];

export const appSteps: { label: string; time: string; state: 'done' | 'active' | 'todo' }[] = [
  { label: 'Received', time: '10:30am', state: 'done' },
  { label: 'In transit', time: '12:30pm', state: 'active' },
  { label: 'Delivered', time: 'Pending', state: 'todo' },
];

/** Checklist card used by the Home screen and Task list examples. */
export function TaskCard() {
  return (
    <AppCard label="Tasks">
      <SegmentedControl label="Filter" defaultValue="todo" options={appFilter} />
      <h3 className="app-card__title">Morning</h3>
      <Checkbox label="Wake up on time" />
      <Checkbox label="Gym / workout" />
      <h3 className="app-card__title">Workload</h3>
      <Checkbox label="Polish UI components" />
      <Checkbox label="Share updates with team" />
    </AppCard>
  );
}
