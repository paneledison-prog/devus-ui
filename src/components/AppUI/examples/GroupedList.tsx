import { PhoneFrame } from '../PhoneFrame';
import { AppBar } from '../AppBar';
import { ListGroup, ListRow } from '../ListRow';
import { Switch } from '../../Switch/Switch';
import { BellIcon, GearIcon, UserIcon } from '../icons';

/** Inset grouped list like a mobile settings screen. */
export function GroupedListExample() {
  return (
    <PhoneFrame>
      <AppBar title="Settings" onBack={() => {}} />
      <ListGroup label="Account">
        <ListRow icon={<UserIcon />} title="Profile" />
        <ListRow icon={<BellIcon />} title="Notifications" value="On" />
        <ListRow icon={<GearIcon />} title="Dark mode" trailing={<Switch aria-label="Dark mode" />} />
      </ListGroup>
    </PhoneFrame>
  );
}
