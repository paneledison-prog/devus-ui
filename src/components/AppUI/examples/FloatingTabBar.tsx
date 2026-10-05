import { PhoneFrame } from '../PhoneFrame';
import { TabBar } from '../TabBar';
import { Fab } from '../Fab';
import { appTabs } from './data';

/** Pill-shaped bottom navigation with a round action button. */
export function FloatingTabBarExample() {
  return (
    <PhoneFrame>
      <TabBar floating items={appTabs} action={<Fab tone="dark" />} />
    </PhoneFrame>
  );
}
