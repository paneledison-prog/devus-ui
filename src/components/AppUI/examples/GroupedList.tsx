import { useState, type ReactElement } from 'react';
import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { ListGroup, ListRow } from '../ListRow';
import { Switch } from '../../Switch/Switch';
import { BellIcon, GearIcon, UserIcon } from '../icons';
import { Button } from '../../Button/Button';

/** Inset grouped list like a mobile settings screen. Swipe a row left to delete it. */
export function GroupedListExample() {
  const [gone, setGone] = useState<string[]>([]);
  const del = (id: string) => setGone((g) => [...g, id]);
  const rows: [string, ReactElement][] = [
    ['profile', <ListRow key="profile" icon={<UserIcon />} title="Profile" onDelete={() => del('profile')} onClick={() => {}} />],
    ['notifications', <ListRow key="notifications" icon={<BellIcon />} title="Notifications" value="On" onDelete={() => del('notifications')} onClick={() => {}} />],
    ['dark', <ListRow key="dark" icon={<GearIcon />} title="Dark mode" trailing={<Switch aria-label="Dark mode" />} onDelete={() => del('dark')} />],
  ];
  const shown = rows.filter(([id]) => !gone.includes(id)).map(([, el]) => el);
  return (
    <PhoneFrame>
      <AppBar title="Settings" onBack={() => {}} />
      {shown.length > 0 && <ListGroup label="Account">{shown}</ListGroup>}
      {gone.length > 0 && <Button variant="ghost" onClick={() => setGone([])}>Restore rows</Button>}
    </PhoneFrame>
  );
}
